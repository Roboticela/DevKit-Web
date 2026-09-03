/**
 * Discover catalog assets dynamically from the monorepo.
 *
 * Scan rules (no fixed component allowlist):
 *   - Every src/components/*.tsx file is a candidate
 *   - Skip docs/preview helpers by filename pattern only
 *   - *Page → page, *Section → section, else → component
 *   - *Scaffold skipped (template-specific)
 *   - Free tier when the file is re-exported from src/module/index.ts
 *   - Root components|pages|sections/<id>/asset.json merges as overrides
 *
 * Published layout: catalog/{type}/<id>/<version>/ (+ src/ snapshot of code)
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { dirname, join } from "node:path";

/** Filename patterns that are docs/preview tooling — not catalog assets. */
function shouldSkipFile(base) {
  if (/^index$/i.test(base)) return true;
  if (/Docs$/i.test(base)) return true;
  if (/^Docs/i.test(base)) return true;
  if (/PreviewRoute$/i.test(base)) return true;
  if (/PreviewPage$/i.test(base)) return true;
  if (/Preview$/i.test(base)) return true;
  if (/Gallery$/i.test(base)) return true;
  if (/Scaffold$/i.test(base)) return true;
  if (/^KitDoc/i.test(base)) return true;
  if (/^kit-/i.test(base)) return true;
  return false;
}

export function pascalToKebab(name) {
  return name
    .replace(/\.tsx?$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

export function displayNameFromPascal(name) {
  const base = name.replace(/\.tsx?$/, "");
  return base
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf-8"));
}

function writeJson(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}

function typeFolder(type) {
  return (
    {
      component: "components",
      page: "pages",
      section: "sections",
    }[type] ?? null
  );
}

function defaultTemplates() {
  return ["nextjs-compact", "vite-express-tauri"];
}

function classifyType(base) {
  if (/Page$/.test(base)) return "page";
  if (/Section$/.test(base)) return "section";
  if (/Scaffold$/.test(base)) return null; // skipped
  return "component";
}

/** Parse module index → Map<fileBase, { exportName, sourcePath }> */
export function parseModuleExportMap(moduleIndexPath) {
  const map = new Map();
  if (!existsSync(moduleIndexPath)) return map;
  const src = readFileSync(moduleIndexPath, "utf-8");
  const re = /export\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(src))) {
    const from = m[2];
    if (from.includes("/icons") || from.includes("/lib/") || from.includes("/theme")) continue;
    const specs = m[1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const fileBase = from.split("/").pop().replace(/\.tsx?$/, "");
    const resolvedSource = from.replace(/^\.\.\//, "src/").replace(/\\/g, "/");
    const sourcePath = resolvedSource.endsWith(".tsx")
      ? resolvedSource
      : `${resolvedSource}.tsx`;

    for (const spec of specs) {
      if (spec.startsWith("type ")) continue;
      const exportName = spec.split(/\s+as\s+/)[0].trim();
      if (!exportName || exportName === "default") continue;
      if (!map.has(fileBase)) {
        map.set(fileBase, { exportName, sourcePath });
      }
      break; // primary export = first non-type name
    }
  }
  return map;
}

/** Detect primary export name from source when not in module index. */
export function detectExportName(filePath, fileBase) {
  if (!existsSync(filePath)) return fileBase;
  const src = readFileSync(filePath, "utf-8");
  const preferred = [
    new RegExp(`export\\s+(?:async\\s+)?function\\s+(${fileBase})\\b`),
    new RegExp(`export\\s+const\\s+(${fileBase})\\b`),
    new RegExp(`export\\s+class\\s+(${fileBase})\\b`),
    new RegExp(`export\\s+\\{\\s*(${fileBase})\\b`),
  ];
  for (const re of preferred) {
    const m = src.match(re);
    if (m) return m[1];
  }
  const any = src.match(/export\s+(?:async\s+)?function\s+(\w+)/);
  if (any) return any[1];
  const anyConst = src.match(/export\s+const\s+(\w+)\s*=/);
  if (anyConst) return anyConst[1];
  return fileBase;
}

/**
 * Ensure root typed folder has asset.json; merge with existing overrides.
 */
function ensureAssetRecord(repoRoot, meta, write) {
  const folder = typeFolder(meta.type);
  if (!folder) return null;
  const assetDir = join(repoRoot, folder, meta.id);
  const assetPath = join(assetDir, "asset.json");
  let existing = null;
  if (existsSync(assetPath)) {
    try {
      existing = readJson(assetPath);
    } catch {
      existing = null;
    }
  }

  const merged = {
    ...meta,
    ...(existing ?? {}),
    id: meta.id,
    type: meta.type,
    // Discovery always refreshes sources / export from the live tree
    sources: meta.sources ?? existing?.sources,
    exportName: meta.exportName ?? existing?.exportName,
    delivery: existing?.delivery ?? meta.delivery,
    tier: existing?.tier ?? meta.tier,
    package: existing?.package ?? meta.package,
    displayName: existing?.displayName ?? meta.displayName,
    description: existing?.description ?? meta.description,
    category: existing?.category ?? meta.category,
    templates: existing?.templates ?? meta.templates,
    dependencies: existing?.dependencies ?? meta.dependencies ?? [],
    tags: existing?.tags ?? meta.tags ?? [],
  };

  if (write) {
    mkdirSync(assetDir, { recursive: true });
    writeJson(assetPath, merged);
  }

  return { meta: merged, assetDir };
}

/**
 * @param {string} repoRoot
 * @param {{ writeAssetJson?: boolean }} opts
 */
export function discoverAllAssets(repoRoot, opts = {}) {
  const write = opts.writeAssetJson !== false;
  const byId = new Map();

  const moduleIndex = join(repoRoot, "src", "module", "index.ts");
  const componentsDir = join(repoRoot, "src", "components");
  const freeMap = parseModuleExportMap(moduleIndex);

  // 1) Dynamic scan of every component file
  if (existsSync(componentsDir)) {
    for (const file of readdirSync(componentsDir)) {
      if (!file.endsWith(".tsx") && !file.endsWith(".ts")) continue;
      if (file.endsWith(".d.ts")) continue;
      const base = file.replace(/\.tsx?$/, "");
      if (shouldSkipFile(base)) continue;

      const type = classifyType(base);
      if (!type) continue;

      const id = pascalToKebab(base);
      const sourcePath = `src/components/${file}`;
      const fullPath = join(repoRoot, sourcePath);
      const free = freeMap.get(base);
      const exportName =
        free?.exportName ?? detectExportName(fullPath, base);

      const isPublicModule = Boolean(free) && type === "component";

      const meta = {
        id,
        type,
        tier: type === "component" ? "free" : "premium",
        delivery: isPublicModule
          ? "module"
          : type === "component"
            ? "server-package"
            : "server-package",
        exportName,
        ...(isPublicModule ? { package: "@roboticela/devkit" } : {}),
        displayName: displayNameFromPascal(base),
        description: `${displayNameFromPascal(base)} from src/components`,
        category:
          type === "page" ? "app-shell" : type === "section" ? "section" : "ui",
        templates: defaultTemplates(),
        dependencies: [],
        tags: [type, "src-components", ...(isPublicModule ? ["module"] : ["source"])],
        sources: [sourcePath],
      };

      if (isPublicModule) {
        meta.tier = "free";
        meta.delivery = "module";
        meta.package = "@roboticela/devkit";
        meta.description = `${displayNameFromPascal(base)} — free module export`;
        meta.tags = ["ui", "module", "component"];
      }

      const record = ensureAssetRecord(repoRoot, meta, write);
      if (record) byId.set(id, record);
    }
  }

  // 2) Also register free exports whose path is outside the flat scan (future-proof)
  for (const [fileBase, info] of freeMap) {
    const id = pascalToKebab(fileBase);
    if (byId.has(id)) continue;
    if (shouldSkipFile(fileBase)) continue;
    const meta = {
      id,
      type: "component",
      tier: "free",
      delivery: "module",
      exportName: info.exportName,
      package: "@roboticela/devkit",
      displayName: displayNameFromPascal(fileBase),
      description: `${displayNameFromPascal(fileBase)} — free module export`,
      category: "ui",
      templates: defaultTemplates(),
      dependencies: [],
      tags: ["ui", "module", "component"],
      sources: [info.sourcePath],
    };
    const record = ensureAssetRecord(repoRoot, meta, write);
    if (record) byId.set(id, record);
  }

  // 3) Root folder overrides / extras (e.g. sections without a *Section.tsx yet)
  const ROOT_FOLDERS = ["components", "pages", "sections"];
  for (const folder of ROOT_FOLDERS) {
    const root = join(repoRoot, folder);
    if (!existsSync(root)) continue;
    const type =
      folder === "components" ? "component" : folder === "pages" ? "page" : "section";
    for (const id of readdirSync(root)) {
      const dir = join(root, id);
      if (!statSync(dir).isDirectory()) continue;
      const metaPath = join(dir, "asset.json");
      if (!existsSync(metaPath)) continue;

      if (byId.has(id)) {
        // Merge any extra source files sitting beside asset.json
        const record = byId.get(id);
        const localSources = readdirSync(dir)
          .filter((f) => /\.(tsx?|jsx?|css)$/.test(f))
          .map((f) => join(folder, id, f).replace(/\\/g, "/"));
        if (localSources.length) {
          const sources = new Set([...(record.meta.sources ?? []), ...localSources]);
          record.meta.sources = [...sources];
          if (write) writeJson(join(record.assetDir, "asset.json"), record.meta);
        }
        continue;
      }

      const meta = readJson(metaPath);
      meta.id = id;
      meta.type = type;
      meta.delivery =
        meta.delivery ??
        (meta.tier === "free" || type === "component" ? "module" : "server-package");
      if (meta.tier == null) meta.tier = meta.delivery === "module" ? "free" : "premium";
      if (!meta.templates) meta.templates = defaultTemplates();
      if (!meta.sources) {
        // Prefer a co-located source file if present
        const local = readdirSync(dir).find((f) => /\.(tsx?|jsx?)$/.test(f));
        if (local) meta.sources = [join(folder, id, local).replace(/\\/g, "/")];
      }
      byId.set(id, { meta, assetDir: dir });
    }
  }

  return [...byId.values()].sort((a, b) => a.meta.id.localeCompare(b.meta.id));
}

/** @deprecated use parseModuleExportMap — kept for callers */
export function parseModuleExports(moduleIndexPath) {
  return [...parseModuleExportMap(moduleIndexPath).entries()].map(
    ([fileBase, info]) => ({
      exportName: info.exportName,
      fileBase,
      from: info.sourcePath,
    })
  );
}

export { shouldSkipFile, classifyType };
