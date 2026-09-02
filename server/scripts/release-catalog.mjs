#!/usr/bin/env node
/**
 * Bump + publish catalog assets into typed, versioned folders.
 *
 * Layout:
 *   catalog/components/<id>/<version>/manifest.json
 *   catalog/pages/<id>/<version>/<framework>/{manifest.json,files.json}
 *   catalog/sections/...
 *   catalog/scaffolds/...
 *
 * Usage:
 *   npm run catalog:release              # bump all types +0.0.1 (or init 1.0.0)
 *   npm run catalog:release -- --type page
 *   npm run catalog:release -- --ids button,dashboard-page
 *   npm run catalog:release -- --init    # force first publish at 1.0.0
 *   npm run catalog:release -- --dry-run
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
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATALOG_DIR = join(__dirname, "..", "catalog");
const CATALOG_JSON = join(CATALOG_DIR, "catalog.json");

const TYPE_DIR = {
  component: "components",
  page: "pages",
  section: "sections",
  scaffold: "scaffolds",
};

function parseArgs(argv) {
  const out = {
    types: null,
    ids: null,
    init: false,
    dryRun: false,
    notes: "",
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--init") out.init = true;
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--type" || a === "--types") {
      const v = argv[++i] ?? "";
      out.types = v.split(",").map((s) => s.trim()).filter(Boolean);
    } else if (a === "--ids" || a === "--id") {
      const v = argv[++i] ?? "";
      out.ids = new Set(v.split(",").map((s) => s.trim()).filter(Boolean));
    } else if (a === "--notes") {
      out.notes = argv[++i] ?? "";
    } else if (a === "--help" || a === "-h") {
      console.log(`Usage: catalog:release [--type component|page|section|scaffold|all]
                     [--ids id1,id2] [--init] [--notes "..."] [--dry-run]`);
      process.exit(0);
    }
  }
  return out;
}

function bumpPatch(version) {
  const parts = String(version).split(".").map((n) => parseInt(n, 10));
  while (parts.length < 3) parts.push(0);
  const [maj, min, pat] = parts;
  if ([maj, min, pat].some((n) => Number.isNaN(n))) {
    return "1.0.0";
  }
  return `${maj}.${min}.${pat + 1}`;
}

function nextVersion(current, init) {
  if (init || !current) return "1.0.0";
  // Fresh scheme: if still on npm-aligned 4.x free versions, reset to 1.0.0 once
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

function typeFolder(type) {
  return TYPE_DIR[type] ?? null;
}

function listFrameworkDirs(assetId) {
  const legacy = join(CATALOG_DIR, assetId);
  if (!existsSync(legacy)) return [];
  return readdirSync(legacy)
    .filter((e) => {
      const p = join(legacy, e);
      return statSync(p).isDirectory() && existsSync(join(p, "manifest.json"));
    });
}

function findPreviousVersionDir(type, assetId, frameworks) {
  const root = join(CATALOG_DIR, typeFolder(type), assetId);
  if (!existsSync(root)) return null;
  const versions = readdirSync(root)
    .filter((e) => /^\d+\.\d+\.\d+$/.test(e))
    .sort((a, b) => {
      const pa = a.split(".").map(Number);
      const pb = b.split(".").map(Number);
      for (let i = 0; i < 3; i++) {
        if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) - (pb[i] ?? 0);
      }
      return 0;
    });
  if (versions.length === 0) return null;
  const latest = versions[versions.length - 1];
  return { version: latest, path: join(root, latest) };
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
  };
}

function toExportName(assetId) {
  return assetId
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
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

function releaseAsset(asset, opts) {
  const folder = typeFolder(asset.type);
  if (!folder) {
    return { skipped: true, reason: `unknown type ${asset.type}` };
  }

  const current = asset.versions?.latest ?? asset.latestVersion ?? "0.0.0";
  const version = nextVersion(current, opts.init);
  const releasedAt = new Date().toISOString().slice(0, 10);
  const destRoot = join(CATALOG_DIR, folder, asset.id, version);

  if (existsSync(destRoot) && !opts.init) {
    return { skipped: true, reason: `${version} already exists` };
  }

  const isModule = asset.tier === "free" || asset.delivery === "module";

  if (opts.dryRun) {
    return { dryRun: true, version, destRoot, isModule };
  }

  mkdirSync(destRoot, { recursive: true });

  if (isModule) {
    writeJson(join(destRoot, "manifest.json"), buildModuleManifest(asset, version));
  } else {
    const prev = findPreviousVersionDir(asset.type, asset.id);
    const frameworks =
      asset.templates?.length
        ? asset.templates
        : listFrameworkDirs(asset.id);

    const fwList = frameworks.length ? frameworks : ["nextjs-compact"];

    for (const fw of fwList) {
      const fwDest = join(destRoot, fw);
      mkdirSync(fwDest, { recursive: true });

      let manifest = null;
      let files = null;

      // Prefer previous typed release
      if (prev) {
        const prevFw = join(prev.path, fw);
        if (existsSync(join(prevFw, "manifest.json"))) {
          manifest = readJson(join(prevFw, "manifest.json"));
          if (existsSync(join(prevFw, "files.json"))) {
            files = readJson(join(prevFw, "files.json"));
          }
        }
      }

      // Legacy flat path: catalog/<id>/<framework>/
      if (!manifest) {
        const legacy = join(CATALOG_DIR, asset.id, fw);
        if (existsSync(join(legacy, "manifest.json"))) {
          manifest = readJson(join(legacy, "manifest.json"));
          if (existsSync(join(legacy, "files.json"))) {
            files = readJson(join(legacy, "files.json"));
          }
        }
      }

      if (!manifest) {
        manifest = {
          name: asset.id,
          version,
          type: asset.type,
          framework: fw,
          delivery: "server-package",
          dependencies: { frontend: asset.dependencies ?? [] },
        };
      }

      manifest = { ...manifest, version, name: asset.id, type: asset.type, framework: fw };
      writeJson(join(fwDest, "manifest.json"), manifest);

      if (files) {
        writeJson(join(fwDest, "files.json"), patchFilesVersion(files, version, asset.id));
      } else if (existsSync(join(CATALOG_DIR, asset.id, fw, "files.json"))) {
        const legacyFiles = readJson(join(CATALOG_DIR, asset.id, fw, "files.json"));
        writeJson(join(fwDest, "files.json"), patchFilesVersion(legacyFiles, version, asset.id));
      }
    }
  }

  const history = [...(asset.versions?.history ?? [])];
  if (!history.some((h) => h.version === version)) {
    history.unshift({
      version,
      releasedAt,
      ...(opts.notes ? { notes: opts.notes } : {}),
    });
  }

  asset.latestVersion = version;
  asset.versions = { latest: version, history };

  return { version, destRoot, isModule };
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!existsSync(CATALOG_JSON)) {
    console.error("catalog.json not found:", CATALOG_JSON);
    process.exit(1);
  }

  const catalog = readJson(CATALOG_JSON);
  let assets = catalog.assets ?? [];

  if (opts.types && !opts.types.includes("all")) {
    const normalized = opts.types.map((t) => {
      if (t === "components") return "component";
      if (t === "pages") return "page";
      if (t === "sections") return "section";
      if (t === "scaffolds") return "scaffold";
      return t;
    });
    assets = assets.filter((a) => normalized.includes(a.type));
  }

  if (opts.ids) {
    assets = assets.filter((a) => opts.ids.has(a.id));
  }

  if (assets.length === 0) {
    console.error("No assets matched.");
    process.exit(1);
  }

  console.log();
  console.log(`Catalog release${opts.dryRun ? " (dry-run)" : ""}${opts.init ? " — init 1.0.0" : " — bump patch"}`);
  console.log(`Assets: ${assets.length}`);
  console.log();

  const results = [];
  for (const asset of assets) {
    const r = releaseAsset(asset, opts);
    results.push({ id: asset.id, type: asset.type, ...r });
    if (r.skipped) {
      console.log(`  · ${asset.id} (${asset.type}) — skipped: ${r.reason}`);
    } else if (r.dryRun) {
      console.log(`  · ${asset.id} (${asset.type}) → ${r.version}${r.isModule ? " [module]" : ""}`);
    } else {
      console.log(`  ✓ ${asset.id} (${asset.type}) → ${r.version}`);
    }
  }

  if (!opts.dryRun) {
    // Write updated catalog.json (asset objects were mutated)
    catalog.updatedAt = new Date().toISOString().slice(0, 10);
    const catVer = catalog.version ?? "1.0.0";
    catalog.version = opts.init ? "1.0.0" : bumpPatch(catVer.startsWith("4.") ? "1.0.0" : catVer);
    writeJson(CATALOG_JSON, catalog);
    console.log();
    console.log(`  Updated catalog.json → catalog v${catalog.version}`);
  }

  console.log();
  const published = results.filter((r) => !r.skipped && !r.dryRun).length;
  console.log(
    opts.dryRun
      ? `Dry-run complete (${results.filter((r) => !r.skipped).length} would publish).`
      : `Published ${published} asset version(s). Clients get latest on add; lockfiles keep pinned versions.`
  );
  console.log();
}

main();
