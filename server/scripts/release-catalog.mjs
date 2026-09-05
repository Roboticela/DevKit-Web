#!/usr/bin/env node
/**
 * One-shot catalog release:
 *   1. Discover assets from src/module + src/components (+ root asset.json)
 *   2. Write/refresh root asset.json folders
 *   3. Sync server/catalog/catalog.json
 *   4. Publish only changed assets → catalog/{type}/<id>/<version>/
 *
 * Scaffolds are skipped (template-specific).
 *
 * Usage (from server/):
 *   npm run catalog:release
 *   npm run catalog:release -- --dry-run
 *   npm run catalog:release -- --force
 *   npm run catalog:release -- --type page
 *   npm run catalog:release -- --ids button,dashboard-page
 *   npm run catalog:release -- --delete-orphans | --keep-orphans
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
import { createHash } from "node:crypto";
import { createInterface } from "node:readline";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { discoverAllAssets } from "./lib/discover-assets.mjs";
import {
  prepareAssetPackage,
  writePreparedPackage,
  analyzeModuleRequirements,
} from "./lib/prepare-asset-package.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SERVER_DIR = join(__dirname, "..");
const REPO_ROOT = join(SERVER_DIR, "..");
const CATALOG_DIR = join(SERVER_DIR, "catalog");
const CATALOG_JSON = join(CATALOG_DIR, "catalog.json");

const TYPE_DIR = {
  component: "components",
  page: "pages",
  section: "sections",
};

/** Still used when deleting orphaned scaffold catalog entries. */
const DELETE_TYPE_DIR = {
  ...TYPE_DIR,
  scaffold: "scaffolds",
};

const ROOT_FOLDERS = ["components", "pages", "sections"];
const SKIP_TYPES = new Set(["scaffold"]);

function parseArgs(argv) {
  const out = {
    types: null,
    ids: null,
    init: false,
    dryRun: false,
    force: false,
    notes: "",
    /** Non-interactive orphan policy: null = prompt, "delete" | "keep" */
    orphans: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--init") out.init = true;
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--force") out.force = true;
    else if (a === "--delete-orphans") out.orphans = "delete";
    else if (a === "--keep-orphans") out.orphans = "keep";
    else if (a === "--type" || a === "--types") {
      out.types = (argv[++i] ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    } else if (a === "--ids" || a === "--id") {
      out.ids = new Set((argv[++i] ?? "").split(",").map((s) => s.trim()).filter(Boolean));
    } else if (a === "--notes") {
      out.notes = argv[++i] ?? "";
    } else if (a === "--help" || a === "-h") {
      console.log(`Usage: catalog:release [--type component|page|section|all]
                     [--ids id1,id2] [--init] [--force] [--notes "..."] [--dry-run]
                     [--delete-orphans | --keep-orphans]

  Reads <repo>/{components,pages,sections}/<id>/asset.json (+ src discovery)
  Syncs catalog.json, then publishes only assets whose content hash changed.
  Layout: catalog/{type}/<id>/<version>/ (theme-universal; scaffolds skipped).

  If a catalog asset is missing from those folders, you are asked to
  delete it completely or keep old published versions (unless --delete-orphans
  / --keep-orphans is set).`);
      process.exit(0);
    }
  }
  return out;
}

function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(String(answer ?? "").trim().toLowerCase());
    });
  });
}

async function promptOrphanAction(asset, policy) {
  if (policy === "delete") return "delete";
  if (policy === "keep") return "keep";

  if (!process.stdin.isTTY) {
    console.warn(
      `  ⚠ '${asset.id}' missing from project folders and stdin is not a TTY — keeping old versions.`
    );
    console.warn(`     Use --delete-orphans or --keep-orphans in CI.`);
    return "keep";
  }

  console.log();
  console.log(`  Asset missing from project folders:`);
  console.log(`    id:      ${asset.id}`);
  console.log(`    type:    ${asset.type}`);
  console.log(`    latest:  ${asset.latestVersion ?? asset.versions?.latest ?? "?"}`);
  console.log(`    folder:  <repo>/${TYPE_DIR[asset.type] ?? asset.type}/${asset.id}/`);
  console.log();
  console.log(`  [d] Delete completely (catalog entry + all published versions)`);
  console.log(`  [k] Keep old versions (leave catalog + published files as-is)`);
  console.log();

  for (;;) {
    const answer = await ask(`  ${asset.id} — delete or keep? [d/k]: `);
    if (answer === "d" || answer === "delete" || answer === "y" || answer === "yes") {
      return "delete";
    }
    if (answer === "k" || answer === "keep" || answer === "n" || answer === "no") {
      return "keep";
    }
    console.log(`  Please answer d (delete) or k (keep).`);
  }
}

function deletePublishedAsset(asset) {
  const folder = DELETE_TYPE_DIR[asset.type];
  if (folder) {
    const typed = join(CATALOG_DIR, folder, asset.id);
    if (existsSync(typed)) {
      rmSync(typed, { recursive: true, force: true });
      console.log(`     removed ${folder}/${asset.id}/`);
    }
  }
  // Legacy flat path catalog/<id>/
  const legacy = join(CATALOG_DIR, asset.id);
  if (existsSync(legacy) && statSync(legacy).isDirectory()) {
    // Don't delete if it looks like a type folder name collision
    if (!ROOT_FOLDERS.includes(asset.id) && asset.id !== "catalog.json" && asset.id !== "scaffolds") {
      rmSync(legacy, { recursive: true, force: true });
      console.log(`     removed legacy catalog/${asset.id}/`);
    }
  }
}

function bumpPatch(version) {
  const parts = String(version).split(".").map((n) => parseInt(n, 10));
  while (parts.length < 3) parts.push(0);
  const [maj, min, pat] = parts;
  if ([maj, min, pat].some((n) => Number.isNaN(n))) return "1.0.0";
  return `${maj}.${min}.${pat + 1}`;
}

function nextVersion(current, init) {
  if (init || !current) return "1.0.0";
  if (/^4\./.test(current)) return "1.0.0";
  return bumpPatch(current);
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf-8"));
}

function writeJson(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}

function toExportName(assetId) {
  return assetId
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

function walkFiles(dir, base = dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".git" || entry === "dist") continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walkFiles(full, base, out);
    else out.push(full);
  }
  return out;
}

/** Stable content hash for an asset folder (+ linked sources). */
function hashAssetContent(assetDir, meta) {
  const hash = createHash("sha256");
  const parts = [];

  // Meta fields that affect published payload (not display-only drift)
  const metaKey = JSON.stringify({
    id: meta.id,
    type: meta.type,
    tier: meta.tier,
    delivery: meta.delivery,
    exportName: meta.exportName,
    package: meta.package,
    templates: meta.templates,
    dependencies: meta.dependencies,
    category: meta.category,
    sources: meta.sources ?? [],
  });
  parts.push(["__meta__", metaKey]);

  // Files inside the asset directory (except asset.json — already hashed via metaKey)
  for (const file of walkFiles(assetDir).sort()) {
    const rel = relative(assetDir, file).replace(/\\/g, "/");
    if (rel === "asset.json") continue;
    if (rel === "content.sha") continue;
    parts.push([rel, readFileSync(file)]);
  }

  // Linked project sources (free modules)
  for (const src of meta.sources ?? []) {
    const full = join(REPO_ROOT, src);
    if (!existsSync(full)) {
      parts.push([`missing:${src}`, ""]);
      continue;
    }
    parts.push([`src:${src}`, readFileSync(full)]);
  }

  for (const [key, body] of parts.sort((a, b) => a[0].localeCompare(b[0]))) {
    hash.update(key);
    hash.update("\0");
    hash.update(body);
    hash.update("\0");
  }
  return hash.digest("hex");
}

function findPreviousVersionDir(type, assetId) {
  const root = join(CATALOG_DIR, TYPE_DIR[type], assetId);
  if (!existsSync(root)) return null;
  const versions = readdirSync(root)
    .filter((e) => /^\d+\.\d+\.\d+$/.test(e) && statSync(join(root, e)).isDirectory())
    .sort((a, b) => {
      const pa = a.split(".").map(Number);
      const pb = b.split(".").map(Number);
      for (let i = 0; i < 3; i++) {
        if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) - (pb[i] ?? 0);
      }
      return 0;
    });
  if (!versions.length) return null;
  const latest = versions[versions.length - 1];
  return { version: latest, path: join(root, latest) };
}

function previousContentSha(type, assetId) {
  const prev = findPreviousVersionDir(type, assetId);
  if (!prev) return null;
  const shaPath = join(prev.path, "content.sha");
  if (existsSync(shaPath)) return readFileSync(shaPath, "utf-8").trim();
  return null;
}

/** True when sources exist but the last published version has no frozen src/ snapshot. */
function missingSourceSnapshot(type, assetId, sources) {
  const list = Array.isArray(sources) ? sources : [];
  if (!list.length) return false;
  const prev = findPreviousVersionDir(type, assetId);
  if (!prev) return false;
  const srcDir = join(prev.path, "src");
  if (!existsSync(srcDir)) return true;
  for (const rel of list) {
    if (!existsSync(join(srcDir, basename(rel)))) return true;
  }
  return false;
}

/** True when last published version is missing requirements.json. */
function missingRequirements(type, assetId) {
  const prev = findPreviousVersionDir(type, assetId);
  if (!prev) return false;
  return !existsSync(join(prev.path, "requirements.json"));
}

/** Discover assets from src/components + src/module + root typed folders. */
function discoverProjectAssets() {
  return discoverAllAssets(REPO_ROOT, { writeAssetJson: true });
}

function catalogEntryFromMeta(meta) {
  return {
    id: meta.id,
    type: meta.type,
    tier: meta.tier,
    displayName: meta.displayName ?? meta.id,
    description: meta.description ?? "",
    category: meta.category ?? meta.type,
    templates: meta.templates ?? ["nextjs-compact", "vite-express-tauri"],
    latestVersion: meta.latestVersion ?? "0.0.0",
    dependencies: meta.dependencies ?? [],
    tags: meta.tags ?? [],
    delivery: meta.delivery,
    ...(meta.exportName ? { exportName: meta.exportName } : {}),
    ...(meta.package ? { package: meta.package } : {}),
    ...(meta.route ? { route: meta.route } : {}),
    versions: meta.versions,
  };
}

async function syncCatalogJson(discovered, existingCatalog, opts) {
  const byId = new Map((existingCatalog.assets ?? []).map((a) => [a.id, a]));
  const nextAssets = [];

  for (const { meta } of discovered) {
    const prev = byId.get(meta.id);
    const entry = catalogEntryFromMeta(meta);
    if (prev) {
      entry.latestVersion = prev.latestVersion;
      entry.versions = prev.versions;
    } else {
      entry.latestVersion = "0.0.0";
      entry.versions = { latest: "0.0.0", history: [] };
    }
    nextAssets.push(entry);
  }

  const orphans = (existingCatalog.assets ?? []).filter(
    (old) => !nextAssets.some((a) => a.id === old.id)
  );

  let deleted = 0;
  let kept = 0;

  for (const orphan of orphans) {
    if (opts.dryRun) {
      console.log(
        `  · orphan ${orphan.id} (${orphan.type}) — would ask: delete completely or keep old versions`
      );
      // Dry-run: keep so catalog stays intact
      nextAssets.push(orphan);
      kept++;
      continue;
    }

    const action = await promptOrphanAction(orphan, opts.orphans);
    if (action === "delete") {
      console.log(`  ✕ ${orphan.id} — deleting completely`);
      deletePublishedAsset(orphan);
      deleted++;
    } else {
      console.log(`  ✓ ${orphan.id} — keeping old versions in catalog`);
      nextAssets.push(orphan);
      kept++;
    }
  }

  return {
    catalog: {
      ...existingCatalog,
      assets: nextAssets.sort((a, b) => a.id.localeCompare(b.id)),
    },
    orphans: { deleted, kept, total: orphans.length },
  };
}

function buildModuleManifest(asset, version) {
  return {
    name: asset.id,
    version,
    type: asset.type,
    tier: asset.tier,
    delivery: "module",
    exportName: asset.exportName ?? toExportName(asset.id),
    package: asset.package ?? "@roboticela/devkit",
    styles: true,
    usage: `import { ${asset.exportName ?? toExportName(asset.id)} } from '@roboticela/devkit';`,
    templates: asset.templates,
    dependencies: asset.dependencies ?? [],
    peerDependencies: asset.peerDependencies ?? {
      react: ">=18",
      "react-dom": ">=18",
      "@roboticela/devkit": ">=4.5.0",
    },
  };
}

function patchFilesVersion(files, version, assetId) {
  const out = { ...files };
  if (out["package.json"]) {
    try {
      const pkg = JSON.parse(out["package.json"]);
      pkg.version = version;
      if (!pkg.name) pkg.name = `@roboticela/premium-${assetId}`;
      out["package.json"] = JSON.stringify(pkg, null, 2);
    } catch {
      /* keep */
    }
  }
  return out;
}

/** Prefer flat asset-root payload; fall back to legacy nextjs-compact/ (or first fw dir). */
function resolvePayloadSources(assetDir, asset) {
  const flatManifest = join(assetDir, "manifest.json");
  const flatFiles = join(assetDir, "files.json");
  if (existsSync(flatManifest) || existsSync(flatFiles)) {
    return {
      manifest: existsSync(flatManifest) ? readJson(flatManifest) : null,
      files: existsSync(flatFiles) ? readJson(flatFiles) : null,
    };
  }

  const preferred = [
    ...(asset.templates ?? []),
    "nextjs-compact",
    "vite-express-tauri",
  ];
  const dirs = readdirSync(assetDir).filter(
    (e) =>
      e !== "asset.json" &&
      existsSync(join(assetDir, e)) &&
      statSync(join(assetDir, e)).isDirectory()
  );
  const ordered = [
    ...preferred.filter((d) => dirs.includes(d)),
    ...dirs.filter((d) => !preferred.includes(d)),
  ];

  for (const fw of ordered) {
    const fwDir = join(assetDir, fw);
    const m = join(fwDir, "manifest.json");
    const f = join(fwDir, "files.json");
    if (existsSync(m) || existsSync(f)) {
      return {
        manifest: existsSync(m) ? readJson(m) : null,
        files: existsSync(f) ? readJson(f) : null,
      };
    }
  }

  // Reuse previous published flat (or legacy fw) payload
  const prev = findPreviousVersionDir(asset.type, asset.id);
  if (prev) {
    const m = join(prev.path, "manifest.json");
    const f = join(prev.path, "files.json");
    if (existsSync(m) || existsSync(f)) {
      return {
        manifest: existsSync(m) ? readJson(m) : null,
        files: existsSync(f) ? readJson(f) : null,
      };
    }
    for (const entry of readdirSync(prev.path)) {
      const fwDir = join(prev.path, entry);
      if (!statSync(fwDir).isDirectory()) continue;
      const pm = join(fwDir, "manifest.json");
      const pf = join(fwDir, "files.json");
      if (existsSync(pm) || existsSync(pf)) {
        return {
          manifest: existsSync(pm) ? readJson(pm) : null,
          files: existsSync(pf) ? readJson(pf) : null,
        };
      }
    }
  }

  return { manifest: null, files: null };
}

function copySourceSnapshot(destRoot, sources) {
  const list = Array.isArray(sources) ? sources : [];
  if (!list.length) return [];
  const srcOut = join(destRoot, "src");
  mkdirSync(srcOut, { recursive: true });
  const copied = [];
  for (const rel of list) {
    const full = join(REPO_ROOT, rel);
    if (!existsSync(full) || !statSync(full).isFile()) {
      console.warn(`     ⚠ missing source ${rel}`);
      continue;
    }
    const name = basename(full);
    writeFileSync(join(srcOut, name), readFileSync(full));
    copied.push(`src/${name}`);
  }
  return copied;
}

function writeRequirements(destRoot, requirements) {
  writeJson(join(destRoot, "requirements.json"), requirements);
}

function enrichManifest(base, requirements, sources) {
  return {
    ...base,
    // Flat catalog ids (CLI + catalog.json)
    dependencies: requirements?.dependencies?.frontend ?? base.dependencies ?? [],
    // Structured install deps (CLI partitionDeps / peer install)
    peerDependencies: requirements?.peerDependencies ?? {
      react: ">=18",
      "react-dom": ">=18",
    },
    requires: requirements ?? null,
    sources: sources ?? base.sources ?? [],
  };
}

/**
 * Freeze + rewrite live source into an installable package snapshot.
 * Free module components: copy primary source as-is (consumed via @roboticela/devkit).
 * Pages/sections/local comps: rewrite imports, include deps, compile index.js when possible.
 */
async function publishPayload(asset, assetDir, version, contentSha) {
  const folder = TYPE_DIR[asset.type];
  if (!folder) {
    throw new Error(`${asset.id}: unsupported type '${asset.type}' (scaffolds are skipped)`);
  }
  const destRoot = join(CATALOG_DIR, folder, asset.id, version);
  mkdirSync(destRoot, { recursive: true });
  writeFileSync(join(destRoot, "content.sha"), contentSha + "\n");

  const entrySource = (asset.sources ?? []).find((s) => /\.tsx?$/.test(s));
  const isPublicModule = asset.delivery === "module" && asset.tier === "free" && asset.package === "@roboticela/devkit";

  // Public free module exports — snapshot source + full requirements
  if (isPublicModule && entrySource) {
    const snapshot = copySourceSnapshot(destRoot, [entrySource]);
    const analyzed = analyzeModuleRequirements(REPO_ROOT, entrySource);
    writeRequirements(destRoot, analyzed.requirements);
    const manifest = enrichManifest(
      {
        ...buildModuleManifest(asset, version),
        dependencies: analyzed.dependencies,
      },
      analyzed.requirements,
      snapshot
    );
    writeJson(join(destRoot, "manifest.json"), manifest);
    return {
      destRoot,
      isModule: true,
      requirements: analyzed.requirements,
      catalogDependencies: analyzed.dependencies,
    };
  }

  // Pages / sections / non-exported components — prepare installable package
  if (entrySource) {
    const prepared = prepareAssetPackage(REPO_ROOT, entrySource);
    const { compiled, sources } = await writePreparedPackage(destRoot, prepared, {
      id: asset.id,
      version,
    });

    writeRequirements(destRoot, prepared.requirements);

    const deps = prepared.requirements?.dependencies?.frontend ?? prepared.dependencies;

    if (!compiled) {
      throw new Error(
        `${asset.id}: esbuild compile failed — fix unresolved imports (see warning above). Not publishing broken package.`
      );
    }

    writeJson(join(destRoot, "files.json"), patchFilesVersion(compiled, version, asset.id));
    writeJson(
      join(destRoot, "manifest.json"),
      enrichManifest(
        {
          name: asset.id,
          version,
          type: asset.type,
          tier: asset.tier,
          delivery: "server-package",
          exportName: asset.exportName ?? toExportName(asset.id),
          ...(asset.route ? { route: asset.route } : {}),
          templates: asset.templates ?? ["nextjs-compact", "vite-express-tauri"],
          dependencies: deps,
        },
        prepared.requirements,
        sources
      )
    );
    return {
      destRoot,
      isModule: false,
      requirements: prepared.requirements,
      catalogDependencies: deps,
    };
  }

  // Legacy: no sources — reuse prior compiled payload if any
  const { manifest: srcManifest, files: srcFiles } = resolvePayloadSources(assetDir, asset);
  if (srcFiles || srcManifest) {
    const manifest = {
      ...(srcManifest ?? {}),
      name: asset.id,
      version,
      type: asset.type,
      delivery: "server-package",
      templates: asset.templates ?? ["nextjs-compact", "vite-express-tauri"],
      dependencies: Array.isArray(srcManifest?.dependencies)
        ? srcManifest.dependencies
        : srcManifest?.dependencies?.frontend ?? asset.dependencies ?? [],
    };
    delete manifest.framework;
    writeJson(join(destRoot, "manifest.json"), manifest);
    if (srcFiles) {
      writeJson(join(destRoot, "files.json"), patchFilesVersion(srcFiles, version, asset.id));
    }
    return { destRoot, isModule: false, requirements: null, catalogDependencies: manifest.dependencies };
  }

  throw new Error(`${asset.id}: needs sources[] pointing at src/components (or files.json)`);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  console.log();
  console.log("DevKit catalog release");
  console.log(`  Project: ${REPO_ROOT}`);
  console.log(`  Catalog: ${CATALOG_DIR}`);
  console.log();
  console.log("Discovering assets from src/module + src/components…");

  const discovered = discoverProjectAssets().filter(
    ({ meta }) => !SKIP_TYPES.has(meta.type)
  );
  console.log(`  Found ${discovered.length} assets (scaffolds skipped)`);
  console.log();

  if (discovered.length === 0) {
    console.error(
      "No assets found under src/module, src/components, or root components/pages/sections."
    );
    process.exit(1);
  }

  let catalog = existsSync(CATALOG_JSON)
    ? readJson(CATALOG_JSON)
    : { version: "1.0.0", assets: [] };

  const synced = await syncCatalogJson(discovered, catalog, opts);
  catalog = synced.catalog;
  if (synced.orphans.total > 0) {
    console.log(
      `  Orphans: ${synced.orphans.total} missing from project folders` +
        (opts.dryRun
          ? " (dry-run: kept for now)"
          : ` · deleted ${synced.orphans.deleted} · kept ${synced.orphans.kept}`)
    );
    console.log();
  }

  let work = discovered.map(({ meta, assetDir }) => {
    const asset = catalog.assets.find((a) => a.id === meta.id);
    return { meta, assetDir, asset };
  });

  if (opts.types && !opts.types.includes("all")) {
    const normalized = opts.types.map((t) => {
      if (t === "components") return "component";
      if (t === "pages") return "page";
      if (t === "sections") return "section";
      return t;
    });
    work = work.filter((w) => normalized.includes(w.asset.type) && !SKIP_TYPES.has(w.asset.type));
  } else {
    work = work.filter((w) => !SKIP_TYPES.has(w.asset.type));
  }
  if (opts.ids) {
    work = work.filter((w) => opts.ids.has(w.asset.id));
  }

  console.log(
    `Release${opts.dryRun ? " (dry-run)" : ""}${opts.init ? " — init 1.0.0" : ""}${opts.force ? " — force" : " — skip unchanged"}`
  );
  console.log(`Candidates: ${work.length}`);
  console.log();

  const results = [];
  let published = 0;
  let skipped = 0;

  for (const { meta, assetDir, asset } of work) {
    const contentSha = hashAssetContent(assetDir, meta);
    const prevSha = previousContentSha(asset.type, asset.id);
    const needsSnapshot = missingSourceSnapshot(asset.type, asset.id, meta.sources);
    const needsReqs = missingRequirements(asset.type, asset.id);

    if (!opts.force && !opts.init && prevSha && prevSha === contentSha && !needsSnapshot && !needsReqs) {
      skipped++;
      results.push({ id: asset.id, skipped: true, reason: "unchanged" });
      console.log(`  · ${asset.id} (${asset.type}) — unchanged, skip`);
      continue;
    }

    const current = asset.versions?.latest ?? asset.latestVersion ?? "0.0.0";
    // Treat 0.0.0 as unpublished
    const version =
      opts.init || current === "0.0.0" ? "1.0.0" : nextVersion(current, false);

    if (opts.dryRun) {
      const why =
        needsReqs && prevSha === contentSha
          ? " [add requirements]"
          : needsSnapshot && prevSha === contentSha
            ? " [add src snapshot]"
            : prevSha
              ? " [changed]"
              : " [new]";
      console.log(`  · ${asset.id} (${asset.type}) → ${version}${why}`);
      results.push({ id: asset.id, dryRun: true, version });
      continue;
    }

    let publishedMeta = null;
    try {
      publishedMeta = await publishPayload(
        {
          ...asset,
          sources: meta.sources ?? asset.sources,
          exportName: meta.exportName ?? asset.exportName,
          package: meta.package ?? asset.package,
          delivery: meta.delivery ?? asset.delivery,
          tier: meta.tier ?? asset.tier,
          templates: meta.templates ?? asset.templates,
          dependencies: meta.dependencies ?? asset.dependencies,
          route: meta.route ?? asset.route,
        },
        assetDir,
        version,
        contentSha
      );
    } catch (e) {
      console.log(`  ✗ ${asset.id}: ${(e).message}`);
      results.push({ id: asset.id, error: true, reason: (e).message });
      continue;
    }

    const releasedAt = new Date().toISOString().slice(0, 10);
    const history = [...(asset.versions?.history ?? [])];
    if (!history.some((h) => h.version === version)) {
      history.unshift({
        version,
        releasedAt,
        contentSha,
        ...(opts.notes ? { notes: opts.notes } : {}),
      });
    }
    asset.latestVersion = version;
    asset.versions = { latest: version, history };
    asset.displayName = meta.displayName ?? asset.displayName;
    asset.description = meta.description ?? asset.description;
    asset.category = meta.category ?? asset.category;
    asset.templates = meta.templates ?? asset.templates;
    asset.dependencies =
      publishedMeta?.catalogDependencies ?? meta.dependencies ?? asset.dependencies;
    if (publishedMeta?.requirements) {
      asset.peerDependencies = publishedMeta.requirements.peerDependencies;
      asset.requires = {
        roboticela: publishedMeta.requirements.roboticela,
        bundled: publishedMeta.requirements.bundled,
        internal: publishedMeta.requirements.internal,
        icons: publishedMeta.requirements.icons,
      };
    }
    asset.tags = meta.tags ?? asset.tags;
    asset.delivery = meta.delivery ?? asset.delivery;
    if (meta.exportName) asset.exportName = meta.exportName;
    if (meta.package) asset.package = meta.package;
    if (meta.sources) asset.sources = meta.sources;
    if (meta.route) asset.route = meta.route;

    // Keep root asset.json dependencies in sync
    try {
      const assetJsonPath = join(assetDir, "asset.json");
      if (existsSync(assetJsonPath)) {
        const aj = readJson(assetJsonPath);
        aj.dependencies = asset.dependencies;
        if (publishedMeta?.requirements?.peerDependencies) {
          aj.peerDependencies = publishedMeta.requirements.peerDependencies;
        }
        writeJson(assetJsonPath, aj);
      }
    } catch {
      /* ignore */
    }

    published++;
    console.log(`  ✓ ${asset.id} (${asset.type}) → ${version}`);
    results.push({ id: asset.id, version });
  }

  if (!opts.dryRun) {
    catalog.updatedAt = new Date().toISOString().slice(0, 10);
    if (published > 0) {
      const catVer = catalog.version ?? "1.0.0";
      catalog.version =
        opts.init || catVer === "0.0.0" ? "1.0.0" : bumpPatch(catVer.startsWith("4.") ? "1.0.0" : catVer);
    }
    writeJson(CATALOG_JSON, catalog);
    console.log();
    console.log(`  Updated catalog.json (v${catalog.version})`);
  }

  console.log();
  console.log(
    opts.dryRun
      ? `Dry-run: ${results.filter((r) => r.dryRun).length} would publish, ${skipped} unchanged.`
      : `Published ${published} · skipped unchanged ${skipped} · errors ${results.filter((r) => r.error).length}`
  );
  console.log();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
