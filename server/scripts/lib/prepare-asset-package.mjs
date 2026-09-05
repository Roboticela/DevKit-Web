/**
 * Prepare a catalog asset package from docs/src sources so installs work:
 *  - Free UI → import from '@roboticela/devkit'
 *  - Local helpers (AuthLayout, OtpBoxes, …) → copied beside the entry
 *  - @/lib/pages-catalog types → inlined into ./types.ts (no docs catalog)
 *  - @/icons → free icons from '@roboticela/devkit', else copied under ./icons/
 *  - @/lib/cn|styles → copied; @/lib/devkit|theme → '@roboticela/devkit'
 *  - next/link → local ./link.tsx shim (template-agnostic)
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  rmSync,
} from "node:fs";
import { basename, dirname, extname, join, relative } from "node:path";
import { createRequire } from "node:module";
import { parseModuleExportMap } from "./discover-assets.mjs";

const require = createRequire(import.meta.url);

const DEVKIT = "@roboticela/devkit";
const DEVKIT_RANGE = ">=4.5.0";
const REACT_RANGE = ">=18";

function toKebab(pascal) {
  return pascal
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function npmPackageName(from) {
  if (!from || from.startsWith(".") || from.startsWith("@/")) return null;
  if (from.startsWith("@")) {
    const parts = from.split("/");
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : parts[0];
  }
  return from.split("/")[0];
}

function defaultNpmRange(pkg) {
  if (pkg === "react" || pkg === "react-dom") return REACT_RANGE;
  if (pkg === DEVKIT) return DEVKIT_RANGE;
  if (pkg === "next") return ">=14";
  if (pkg === "three") return ">=0.160.0";
  if (pkg === "lucide-react") return ">=0.400.0";
  return "*";
}

const LINK_SHIM = `'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

/** Template-agnostic link (replaces next/link in published packages). */
export default function Link({
  href = '#',
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string; children?: ReactNode }) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}
`;

const NAVIGATION_SHIM = `'use client'

import { useCallback, useMemo, useSyncExternalStore } from 'react'

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('popstate', onStoreChange)
  return () => window.removeEventListener('popstate', onStoreChange)
}

function getPathname() {
  return typeof window === 'undefined' ? '/' : window.location.pathname
}

function getSearch() {
  return typeof window === 'undefined' ? '' : window.location.search
}

/** Template-agnostic navigation (replaces next/navigation in published packages). */
export function usePathname() {
  return useSyncExternalStore(subscribe, getPathname, () => '/')
}

export function useSearchParams() {
  const search = useSyncExternalStore(subscribe, getSearch, () => '')
  return useMemo(() => new URLSearchParams(search), [search])
}

export function useRouter() {
  const push = useCallback((href: string) => {
    window.location.assign(href)
  }, [])
  const replace = useCallback((href: string) => {
    window.location.replace(href)
  }, [])
  const back = useCallback(() => {
    window.history.back()
  }, [])
  return { push, replace, back, prefetch() {} }
}

export function notFound() {
  throw new Error('Not found')
}
`;

function read(path) {
  return readFileSync(path, "utf-8");
}

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

function freeIconNames(moduleIndexPath) {
  if (!existsSync(moduleIndexPath)) return new Set();
  const src = read(moduleIndexPath);
  const names = new Set();
  const re = /export\s+\{([^}]+)\}\s+from\s+['"][^'"]*\/icons['"]/g;
  let m;
  while ((m = re.exec(src))) {
    for (const spec of m[1].split(",")) {
      const id = spec.trim().split(/\s+as\s+/)[0].trim();
      if (id && !id.startsWith("type ")) names.add(id);
    }
  }
  // Also icons listed in multi-line block from '../icons'
  const block = src.match(/export\s+\{([\s\S]*?)\}\s+from\s+['"]\.\.\/icons['"]/);
  if (block) {
    for (const spec of block[1].split(",")) {
      const id = spec.trim().split(/\s+as\s+/)[0].trim();
      if (id && !id.startsWith("type ") && id.startsWith("Dk")) names.add(id);
    }
  }
  return names;
}

/** Resolve pages-catalog type → string-literal union. */
export function resolvePagesCatalogType(typeName, pagesCatalogPath) {
  if (!existsSync(pagesCatalogPath)) return `'default'`;
  const src = read(pagesCatalogPath);

  const direct = src.match(
    new RegExp(`export\\s+type\\s+${typeName}\\s*=\\s*([\\s\\S]*?)\\n(?=export\\s|$)`)
  );
  if (!direct) return `'default' | string`;

  let rhs = direct[1].trim().replace(/;$/, "");

  // 'a' | 'b' | 'c'
  if (/^'[^']+'(?:\s*\|\s*'[^']+')*$/.test(rhs.replace(/\s+/g, " ").trim())) {
    return rhs.replace(/\s+/g, " ").trim();
  }

  // (typeof FOO)[number]['id']
  const fromConst = rhs.match(/\(typeof\s+(\w+)\)\[number\]\['id'\]/);
  if (fromConst) {
    const constName = fromConst[1];
    const arr = src.match(
      new RegExp(`export\\s+const\\s+${constName}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s+as\\s+const`)
    );
    if (arr) {
      const ids = [...arr[1].matchAll(/id:\s*'([^']+)'/g)].map((x) => `'${x[1]}'`);
      if (ids.length) return ids.join(" | ");
    }
  }

  return `'default' | string`;
}

function parseImports(content) {
  const imports = [];
  // import … from 'x'  |  export { … } from 'x'  |  export type { … } from 'x'  |  export * from 'x'
  const re =
    /^([ \t]*)(import|export)\s+(type\s+)?([\s\S]*?)\s+from\s+['"]([^'"]+)['"]\s*;?[ \t]*$/gm;
  let m;
  while ((m = re.exec(content))) {
    imports.push({
      full: m[0],
      indent: m[1],
      kind: m[2], // import | export
      isType: Boolean(m[3]),
      clause: m[4].trim(),
      from: m[5],
      index: m.index,
    });
  }
  return imports;
}

function namedImports(clause) {
  const names = [];
  const brace = clause.match(/\{([^}]+)\}/);
  if (!brace) return names;
  for (const part of brace[1].split(",")) {
    const t = part.trim();
    if (!t) continue;
    const [imported, local] = t.split(/\s+as\s+/).map((s) => s.trim());
    names.push({ imported: imported.replace(/^type\s+/, ""), local: local || imported.replace(/^type\s+/, "") });
  }
  return names;
}

function resolveRelative(fromFile, spec) {
  const base = join(dirname(fromFile), spec);
  for (const ext of [".tsx", ".ts", ".jsx", ".js", ""]) {
    const p = base + ext;
    if (existsSync(p) && statSync(p).isFile()) return p;
  }
  if (existsSync(base) && statSync(base).isDirectory()) {
    for (const ext of ["index.tsx", "index.ts"]) {
      const p = join(base, ext);
      if (existsSync(p)) return p;
    }
  }
  return null;
}

function resolveAtAlias(repoRoot, spec) {
  // @/icons → src/icons
  // @/lib/foo → src/lib/foo
  const rest = spec.replace(/^@\//, "src/");
  const base = join(repoRoot, rest);
  for (const ext of [".tsx", ".ts", ".jsx", ".js", ""]) {
    const p = base + ext;
    if (existsSync(p) && statSync(p).isFile()) return p;
  }
  if (existsSync(base) && statSync(base).isDirectory()) {
    for (const index of ["index.tsx", "index.ts", "index.js"]) {
      const p = join(base, index);
      if (existsSync(p)) return p;
    }
  }
  return null;
}

/**
 * Build free component fileBase set from module index (Button.tsx → Button).
 */
function freeComponentBases(repoRoot) {
  const map = parseModuleExportMap(join(repoRoot, "src", "module", "index.ts"));
  return new Set([...map.keys()]);
}

function outNameForSource(absPath, repoRoot) {
  const rel = relative(join(repoRoot, "src"), absPath).replace(/\\/g, "/");
  if (rel.startsWith("components/")) return basename(absPath);
  if (rel.startsWith("lib/")) return basename(absPath);
  if (rel.startsWith("icons/")) return join("icons", basename(absPath)).replace(/\\/g, "/");
  return basename(absPath);
}

/**
 * Prepare installable sources for one asset.
 * @returns {{ files: Record<string,string>, entryFile: string, dependencies: string[] }}
 */
export function prepareAssetPackage(repoRoot, entryRelPath, opts = {}) {
  const entryAbs = join(repoRoot, entryRelPath);
  if (!existsSync(entryAbs)) {
    throw new Error(`Entry not found: ${entryRelPath}`);
  }

  const freeBases = freeComponentBases(repoRoot);
  const freeIcons = freeIconNames(join(repoRoot, "src", "module", "index.ts"));
  const pagesCatalog = join(repoRoot, "src", "lib", "pages-catalog.ts");

  /** @type {Map<string, string>} absPath → rewritten content */
  const rewritten = new Map();
  /** @type {Set<string>} */
  const queue = new Set([entryAbs]);
  /** @type {Set<string>} */
  const seen = new Set();
  /** @type {Map<string, string>} typeName → union */
  const neededTypes = new Map();
  /** @type {Set<string>} */
  const neededFreeIcons = new Set();
  /** @type {Set<string>} */
  const neededLocalIcons = new Set();
  let needsLinkShim = false;
  let needsNavShim = false;
  let needsCn = false;
  let needsStyles = false;
  /** @type {Set<string>} catalog dependency ids (kebab) */
  const catalogDeps = new Set();
  /** @type {Map<string, { id: string, exportNames: Set<string>, package: string, delivery: string }>} */
  const roboticelaDeps = new Map();
  /** @type {Map<string, string>} npm package → range */
  const npmPeers = new Map([
    ["react", REACT_RANGE],
    ["react-dom", REACT_RANGE],
  ]);
  /** @type {Map<string, Set<string>>} package → named imports used */
  const packageExports = new Map();
  /** @type {Set<string>} local helper basenames bundled into this package */
  const bundledHelpers = new Set();

  function notePackageExport(pkg, names) {
    if (!packageExports.has(pkg)) packageExports.set(pkg, new Set());
    for (const n of names) packageExports.get(pkg).add(n);
  }

  function noteRoboticela(id, exportNames, delivery = "module") {
    if (!roboticelaDeps.has(id)) {
      roboticelaDeps.set(id, {
        id,
        exportNames: new Set(),
        package: DEVKIT,
        delivery,
      });
    }
    const row = roboticelaDeps.get(id);
    for (const n of exportNames) row.exportNames.add(n);
    npmPeers.set(DEVKIT, DEVKIT_RANGE);
    notePackageExport(DEVKIT, exportNames);
  }

  function noteNpm(from) {
    const pkg = npmPackageName(from);
    if (!pkg) return;
    if (pkg === "react/jsx-runtime" || pkg === "react/jsx-dev-runtime") return;
    npmPeers.set(pkg, defaultNpmRange(pkg));
  }

  while (queue.size) {
    const abs = queue.values().next().value;
    queue.delete(abs);
    if (seen.has(abs)) continue;
    seen.add(abs);

    let content = read(abs);
    const imports = parseImports(content);
    const replacements = [];

    for (const imp of imports) {
      const { from, clause, isType, full, indent, kind } = imp;
      const kw = kind === "export" ? "export" : "import";
      let nextFrom = from;
      let drop = false;
      let extra = null;
      const names = namedImports(clause).map((n) => n.imported);

      // next/link + next/navigation → local shims (template-agnostic)
      if (from === "next/link" || from === "next/navigation") {
        if (from === "next/link") {
          needsLinkShim = true;
          nextFrom = "./link";
        } else {
          needsNavShim = true;
          nextFrom = "./navigation";
        }
      } else if (from === "react" || from.startsWith("react/")) {
        noteNpm(from === "react" ? "react" : from);
        if (from === "react") notePackageExport("react", names.length ? names : ["*"]);
      } else if (from === "react-dom" || from.startsWith("react-dom/")) {
        noteNpm("react-dom");
      } else if (from.startsWith("@/lib/pages-catalog")) {
        for (const n of namedImports(clause)) {
          neededTypes.set(n.imported, resolvePagesCatalogType(n.imported, pagesCatalog));
        }
        nextFrom = "./types";
      } else if (from === "@/lib/cn" || from.endsWith("/lib/cn")) {
        needsCn = true;
        nextFrom = "./cn";
      } else if (from === "@/lib/styles" || from.endsWith("/lib/styles")) {
        needsStyles = true;
        needsCn = true;
        nextFrom = "./styles";
      } else if (
        from === "@/lib/devkit" ||
        from === "@/lib/theme" ||
        from.endsWith("/lib/devkit") ||
        from.endsWith("/lib/theme")
      ) {
        nextFrom = DEVKIT;
        noteRoboticela("devkit-runtime", names.length ? names : ["brand", "ThemeProvider"], "module");
        // Prefer documenting as package export, not a fake catalog id
        roboticelaDeps.delete("devkit-runtime");
        npmPeers.set(DEVKIT, DEVKIT_RANGE);
        notePackageExport(DEVKIT, names.length ? names : ["brand"]);
      } else if (from === "@/icons" || from.startsWith("@/icons/")) {
        const named = namedImports(clause);
        const fromDevkit = [];
        const fromLocal = [];
        for (const n of named) {
          if (freeIcons.has(n.imported)) {
            fromDevkit.push(n);
            neededFreeIcons.add(n.imported);
          } else {
            fromLocal.push(n);
            neededLocalIcons.add(n.imported);
          }
        }
        if (fromDevkit.length) {
          npmPeers.set(DEVKIT, DEVKIT_RANGE);
          notePackageExport(DEVKIT, fromDevkit.map((n) => n.imported));
        }
        if (fromDevkit.length && fromLocal.length) {
          const fmt = (list) =>
            list
              .map((n) => (n.local === n.imported ? n.imported : `${n.imported} as ${n.local}`))
              .join(", ");
          const typeKw = isType ? "type " : "";
          extra = `${indent}${kw} ${typeKw}{ ${fmt(fromDevkit)} } from '${DEVKIT}'\n${indent}${kw} ${typeKw}{ ${fmt(fromLocal)} } from './icons'`;
          drop = true;
        } else if (fromDevkit.length) {
          nextFrom = DEVKIT;
        } else {
          nextFrom = "./icons";
        }
      } else if (from.startsWith("./") || from.startsWith("../")) {
        const resolved = resolveRelative(abs, from);
        if (resolved) {
          const base = basename(resolved).replace(/\.(tsx|ts|jsx|js)$/, "");
          if (freeBases.has(base)) {
            nextFrom = DEVKIT;
            const id = toKebab(base);
            catalogDeps.add(id);
            noteRoboticela(id, names.length ? names : [base], "module");
          } else {
            nextFrom = "./" + basename(resolved).replace(/\.(tsx|ts)$/, "");
            bundledHelpers.add(base);
            if (!seen.has(resolved)) queue.add(resolved);
          }
        }
      } else if (from.startsWith("@/")) {
        const resolved = resolveAtAlias(repoRoot, from);
        if (resolved) {
          const base = basename(resolved).replace(/\.(tsx|ts|jsx|js)$/, "");
          if (freeBases.has(base)) {
            nextFrom = DEVKIT;
            const id = toKebab(base);
            catalogDeps.add(id);
            noteRoboticela(id, names.length ? names : [base], "module");
          } else {
            nextFrom = "./" + basename(resolved).replace(/\.(tsx|ts)$/, "");
            bundledHelpers.add(base);
            if (!seen.has(resolved)) queue.add(resolved);
          }
        } else {
          console.warn(`  ⚠ unresolved alias ${from} in ${basename(abs)}`);
        }
      } else if (!from.startsWith(".") && !from.startsWith("@/")) {
        // external npm (qrcode, lucide-react, …)
        noteNpm(from);
        if (names.length) notePackageExport(npmPackageName(from) ?? from, names);
      }

      if (drop && extra) {
        replacements.push({ full, next: extra });
      } else if (drop) {
        replacements.push({ full, next: "" });
      } else if (nextFrom !== from) {
        const typeKw = isType ? "type " : "";
        replacements.push({
          full,
          next: `${indent}${kw} ${typeKw}${clause} from '${nextFrom}'`,
        });
      }
    }

    for (const { full, next } of replacements) {
      content = content.replace(full, next);
    }

    content = content.replace(/\n{3,}/g, "\n\n");
    rewritten.set(abs, content);
  }

  // Ensure cn/styles sources queued
  if (needsStyles) {
    const stylesPath = join(repoRoot, "src", "lib", "styles.ts");
    if (existsSync(stylesPath) && !rewritten.has(stylesPath)) {
      let c = read(stylesPath).replace(/from\s+['"]\.\/cn['"]/, "from './cn'");
      rewritten.set(stylesPath, c);
    }
  }
  if (needsCn) {
    const cnPath = join(repoRoot, "src", "lib", "cn.ts");
    if (existsSync(cnPath) && !rewritten.has(cnPath)) {
      rewritten.set(cnPath, read(cnPath));
    }
  }

  // Local icons barrel + files
  const iconFiles = new Map();
  if (neededLocalIcons.size) {
    const iconsDir = join(repoRoot, "src", "icons");
    const createIcon = join(iconsDir, "create-icon.tsx");
    const types = join(iconsDir, "types.ts");
    if (existsSync(createIcon)) iconFiles.set("icons/create-icon.tsx", rewriteIconInternal(read(createIcon)));
    if (existsSync(types)) iconFiles.set("icons/types.ts", read(types));

    const lines = [];
    for (const name of [...neededLocalIcons].sort()) {
      const candidates = [
        join(iconsDir, "icons", `${name}.tsx`),
        join(iconsDir, "icons", "brand", `${name}.tsx`),
        join(iconsDir, "icons", "provider", `${name}.tsx`),
      ];
      const found = candidates.find((p) => existsSync(p));
      if (!found) {
        console.warn(`  ⚠ icon not found: ${name}`);
        continue;
      }
      const relOut = `icons/${basename(found)}`;
      let src = read(found);
      // normalize create-icon import
      src = src.replace(/from\s+['"]\.\.\/\.\.\/create-icon['"]/, "from './create-icon'");
      src = src.replace(/from\s+['"]\.\.\/create-icon['"]/, "from './create-icon'");
      src = src.replace(/from\s+['"]\.\.\/\.\.\/types['"]/, "from './types'");
      src = src.replace(/from\s+['"]\.\.\/types['"]/, "from './types'");
      iconFiles.set(relOut, src);
      lines.push(
        `export { ${name} } from './icons/${basename(found).replace(/\.tsx$/, "")}'`
      );
    }
    iconFiles.set("icons.ts", lines.join("\n") + "\n");
  }

  /** @type {Record<string, string>} path relative to package src/ */
  const files = {};

  for (const [abs, content] of rewritten) {
    const name = outNameForSource(abs, repoRoot);
    files[name] = content;
  }

  for (const [rel, content] of iconFiles) {
    files[rel] = content;
  }

  if (neededTypes.size) {
    files["types.ts"] =
      [...neededTypes.entries()]
        .map(([name, union]) => `export type ${name} = ${union}`)
        .join("\n") + "\n";
  }

  if (needsLinkShim) {
    files["link.tsx"] = LINK_SHIM;
  }
  if (needsNavShim) {
    files["navigation.ts"] = NAVIGATION_SHIM;
  }

  // Ensure entry has a default export for premium loader (add if missing)
  const entryBase = basename(entryAbs);
  const entryContent = files[entryBase];
  if (entryContent && !/export\s+default\b/.test(entryContent)) {
    const fn = entryContent.match(/export\s+function\s+(\w+)/);
    if (fn) {
      files[entryBase] = entryContent.trimEnd() + `\n\nexport default ${fn[1]}\n`;
    }
  }

  return {
    files,
    entryFile: entryBase,
    dependencies: [...catalogDeps].sort(),
    freeIcons: [...neededFreeIcons].sort(),
    localIcons: [...neededLocalIcons].sort(),
    requirements: buildRequirements({
      catalogDeps,
      roboticelaDeps,
      npmPeers,
      packageExports,
      bundledHelpers,
      neededFreeIcons,
      neededLocalIcons,
      files: Object.keys(files),
      needsLinkShim,
      needsNavShim,
      needsCn,
      needsStyles,
    }),
  };
}

/**
 * Normalize everything this asset needs for install / runtime.
 */
export function buildRequirements(ctx) {
  const peerDependencies = Object.fromEntries(
    [...ctx.npmPeers.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  );

  // Host UI package is always required (tokens, ThemeProvider, free primitives)
  peerDependencies[DEVKIT] = peerDependencies[DEVKIT] ?? DEVKIT_RANGE;

  const roboticela = [...ctx.roboticelaDeps.values()]
    .map((r) => ({
      id: r.id,
      type: "component",
      package: r.package,
      delivery: r.delivery,
      exportNames: [...r.exportNames].sort(),
    }))
    .sort((a, b) => a.id.localeCompare(b.id));

  const bundled = [...ctx.bundledHelpers]
    .sort()
    .map((name) => ({
      id: toKebab(name),
      file: ctx.files.find((f) => f === `${name}.tsx` || f === `${name}.ts`) ?? `${name}.tsx`,
      role: "local-helper",
    }));

  const packageImports = {};
  for (const [pkg, names] of [...ctx.packageExports.entries()].sort((a, b) =>
    a[0].localeCompare(b[0])
  )) {
    packageImports[pkg] = [...names].sort();
  }

  return {
    peerDependencies,
    /** CLI install shape — catalog asset ids on the frontend */
    dependencies: {
      frontend: [...ctx.catalogDeps].sort(),
    },
    /** Other Roboticela catalog / module pieces this asset needs */
    roboticela,
    /** Local helpers / icons shipped inside this version folder */
    bundled: [
      ...bundled,
      ...(ctx.needsCn
        ? [{ id: "cn", file: "cn.ts", role: "utility" }]
        : []),
      ...(ctx.needsStyles
        ? [{ id: "styles", file: "styles.ts", role: "utility" }]
        : []),
      ...(ctx.needsLinkShim
        ? [{ id: "link", file: "link.tsx", role: "shim" }]
        : []),
      ...(ctx.needsNavShim
        ? [{ id: "navigation", file: "navigation.ts", role: "shim" }]
        : []),
    ],
    /** Helpers that ship inside the host npm package (free module components) */
    internal:
      ctx.internalHelpers instanceof Map
        ? [...ctx.internalHelpers.entries()]
            .map(([name, exports]) => ({
              id: toKebab(name),
              exportNames: [...exports].sort(),
              hostPackage: ctx.hostPackage ?? DEVKIT,
            }))
            .sort((a, b) => a.id.localeCompare(b.id))
        : [],
    icons: {
      fromDevkit: [...ctx.neededFreeIcons].sort(),
      bundled: [...ctx.neededLocalIcons].sort(),
    },
    packageImports,
  };
}

/** Analyze requirements for a free module component (no rewrite / no local bundle). */
export function analyzeModuleRequirements(repoRoot, entryRelPath) {
  // Full prepare still discovers catalog deps; strip bundled files from the result
  // and reclassify non-catalog helpers as internal (they ship in @roboticela/devkit).
  const prepared = prepareAssetPackage(repoRoot, entryRelPath);
  const freeBases = freeComponentBases(repoRoot);
  const internal = [];
  for (const b of prepared.requirements.bundled ?? []) {
    const pascal = b.file.replace(/\.(tsx|ts)$/, "");
    if (freeBases.has(pascal)) continue;
    if (["cn", "styles", "link", "types"].includes(b.id)) {
      internal.push({
        id: b.id,
        exportNames: [b.id === "cn" ? "cn" : pascal],
        hostPackage: DEVKIT,
      });
      continue;
    }
    internal.push({
      id: b.id,
      exportNames: [pascal],
      hostPackage: DEVKIT,
    });
  }

  const requirements = {
    ...prepared.requirements,
    bundled: [],
    internal: internal.sort((a, b) => a.id.localeCompare(b.id)),
    peerDependencies: {
      react: REACT_RANGE,
      "react-dom": REACT_RANGE,
      [DEVKIT]: DEVKIT_RANGE,
      ...prepared.requirements.peerDependencies,
    },
  };
  // Free module host always needs the package itself
  requirements.peerDependencies[DEVKIT] = DEVKIT_RANGE;

  return {
    requirements,
    dependencies: prepared.dependencies,
    entryFile: prepared.entryFile,
  };
}

function rewriteIconInternal(src) {
  return src
    .replace(/from\s+['"]\.\/types['"]/g, "from './types'")
    .replace(/from\s+['"]\.\/create-icon['"]/g, "from './create-icon'");
}

/**
 * Write prepared files into destSrcDir and optionally compile with esbuild → files.json payload.
 */
export async function writePreparedPackage(destRoot, prepared, meta) {
  const srcDir = join(destRoot, "src");
  if (existsSync(srcDir)) rmSync(srcDir, { recursive: true, force: true });
  mkdirSync(srcDir, { recursive: true });

  for (const [rel, content] of Object.entries(prepared.files)) {
    write(join(srcDir, rel), content);
  }

  let compiled = null;
  const peers = prepared.requirements?.peerDependencies ?? {
    react: REACT_RANGE,
    "react-dom": REACT_RANGE,
    [DEVKIT]: DEVKIT_RANGE,
  };

  try {
    const esbuild = require("esbuild");
    const external = [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      ...Object.keys(peers),
    ];
    const result = await esbuild.build({
      absWorkingDir: srcDir,
      entryPoints: [prepared.entryFile],
      bundle: true,
      write: false,
      format: "esm",
      platform: "neutral",
      jsx: "automatic",
      target: ["es2020"],
      external: [...new Set(external)],
      logLevel: "silent",
      plugins: [
        {
          name: "external-bare-imports",
          setup(build) {
            build.onResolve({ filter: /^[^./]/ }, (args) => ({
              path: args.path,
              external: true,
            }));
          },
        },
      ],
    });
    const js = result.outputFiles?.[0]?.text;
    if (js) {
      compiled = {
        "package.json": JSON.stringify(
          {
            name: `@roboticela/premium-${meta.id}`,
            version: meta.version,
            private: true,
            type: "module",
            main: "./index.js",
            exports: { ".": "./index.js" },
            peerDependencies: peers,
            // Mirror roboticela catalog deps for tooling
            roboticela: {
              dependencies: (prepared.requirements?.roboticela ?? []).map((r) => r.id),
            },
          },
          null,
          2
        ),
        "index.js": js,
      };
    }
  } catch (e) {
    console.warn(`  ⚠ esbuild failed for ${meta.id}: ${e.message}`);
  }

  return { srcDir, compiled, sources: Object.keys(prepared.files).map((f) => `src/${f}`) };
}
