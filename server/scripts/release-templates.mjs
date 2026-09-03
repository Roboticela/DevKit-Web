#!/usr/bin/env node
/**
 * One-shot template release (same model as catalog:release):
 *   1. Discover templates from <repo>/templates/<dir>/template.json
 *   2. Hash scaffold files; skip unchanged (content.sha)
 *   3. Publish to server/catalog/templates/<id>/<version>/
 *   4. Bump template.json version + write catalog/templates.json index
 *
 * Usage (from server/):
 *   npm run templates:release
 *   npm run templates:release -- --dry-run
 *   npm run templates:release -- --force
 *   npm run templates:release -- --ids nextjs-compact,vite-express-tauri
 *   npm run templates:release -- --init
 *   npm run templates:release -- --notes "…"
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
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SERVER_DIR = join(__dirname, "..");
const REPO_ROOT = join(SERVER_DIR, "..");
const SOURCE_ROOT = join(REPO_ROOT, "templates");
const CATALOG_TEMPLATES = join(SERVER_DIR, "catalog", "templates");
const INDEX_JSON = join(SERVER_DIR, "catalog", "templates.json");

const SKIP_DIRS = new Set(["node_modules", ".git", "dist", ".next", "src-tauri/target"]);
const SKIP_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".ico", ".woff", ".woff2", ".webp"]);

function parseArgs(argv) {
  const out = {
    ids: null,
    init: false,
    dryRun: false,
    force: false,
    notes: "",
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--init") out.init = true;
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--force") out.force = true;
    else if (a === "--ids" || a === "--id") {
      out.ids = new Set((argv[++i] ?? "").split(",").map((s) => s.trim()).filter(Boolean));
    } else if (a === "--notes") {
      out.notes = argv[++i] ?? "";
    } else if (a === "--help" || a === "-h") {
      console.log(`Usage: templates:release [--ids id1,id2] [--init] [--force] [--notes "..."] [--dry-run]

  Reads <repo>/templates/<dir>/template.json + scaffold files
  Publishes only templates whose content hash changed.
  Layout: server/catalog/templates/<id>/<version>/
    template.json  files.json  content.sha  manifest.json

  CLI consumers install with the same @version syntax as packages:
    devkit create my-app --template nextjs-compact@1.0.1`);
      process.exit(0);
    }
  }
  return out;
}

function bumpPatch(version) {
  const parts = String(version).split(".").map((n) => parseInt(n, 10));
  while (parts.length < 3) parts.push(0);
  const [maj, min, pat] = parts;
  if ([maj, min, pat].some((n) => Number.isNaN(n))) return "1.0.0";
  return `${maj}.${min}.${pat + 1}`;
}

function nextVersion(current, init) {
  if (init || !current || current === "0.0.0") return "1.0.0";
  return bumpPatch(current);
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf-8"));
}

function writeJson(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}

function shouldSkipFile(rel) {
  const base = rel.split("/").pop() ?? "";
  if (base === "template.json") return true;
  const lower = rel.toLowerCase();
  for (const ext of SKIP_EXT) {
    if (lower.endsWith(ext)) return true;
  }
  return false;
}

function walkTextFiles(dir, base = dir, out = {}) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    const rel = relative(base, full).replace(/\\/g, "/");
    if (st.isDirectory()) {
      if (rel.includes("node_modules") || rel.endsWith("/target")) continue;
      walkTextFiles(full, base, out);
    } else if (!shouldSkipFile(rel)) {
      out[rel] = readFileSync(full, "utf-8");
    }
  }
  return out;
}

function hashFiles(files) {
  const h = createHash("sha256");
  for (const key of Object.keys(files).sort()) {
    h.update(key);
    h.update("\0");
    h.update(files[key]);
    h.update("\0");
  }
  return h.digest("hex");
}

function discoverTemplates() {
  if (!existsSync(SOURCE_ROOT)) {
    throw new Error(`Templates source missing: ${SOURCE_ROOT}`);
  }
  /** @type {Array<{ id: string, dir: string, sourceDir: string, meta: Record<string, unknown> }>} */
  const list = [];
  for (const entry of readdirSync(SOURCE_ROOT)) {
    const sourceDir = join(SOURCE_ROOT, entry);
    if (!statSync(sourceDir).isDirectory()) continue;
    const metaPath = join(sourceDir, "template.json");
    if (!existsSync(metaPath)) continue;
    const meta = readJson(metaPath);
    if (!meta?.id || !meta.label) {
      console.warn(`  ⚠ skip ${entry}/ — template.json needs id + label`);
      continue;
    }
    list.push({
      id: meta.id,
      dir: meta.dir ?? entry,
      sourceDir,
      meta,
    });
  }
  return list.sort((a, b) => a.id.localeCompare(b.id));
}

function previousPublished(id) {
  const root = join(CATALOG_TEMPLATES, id);
  if (!existsSync(root)) return null;
  const versions = readdirSync(root)
    .filter((v) => existsSync(join(root, v, "content.sha")))
    .sort((a, b) => {
      const pa = a.split(".").map((n) => parseInt(n, 10));
      const pb = b.split(".").map((n) => parseInt(n, 10));
      for (let i = 0; i < 3; i++) {
        const d = (pa[i] || 0) - (pb[i] || 0);
        if (d) return d;
      }
      return 0;
    });
  if (!versions.length) return null;
  const version = versions[versions.length - 1];
  const sha = readFileSync(join(root, version, "content.sha"), "utf-8").trim();
  return { version, sha, path: join(root, version) };
}

function readIndex() {
  if (!existsSync(INDEX_JSON)) {
    return { version: "1.0.0", templates: [], updatedAt: null };
  }
  try {
    return readJson(INDEX_JSON);
  } catch {
    return { version: "1.0.0", templates: [], updatedAt: null };
  }
}

function publishOne(entry, version, files, contentSha, notes) {
  const dest = join(CATALOG_TEMPLATES, entry.id, version);
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });

  const releasedAt = new Date().toISOString().slice(0, 10);
  const templateMeta = {
    id: entry.id,
    version,
    label: entry.meta.label,
    hint: entry.meta.hint ?? "",
    cssPath: entry.meta.cssPath ?? null,
    installTargets: entry.meta.installTargets ?? ["root"],
    dir: entry.dir,
  };

  const history = [...(entry.meta.versions?.history ?? [])];
  if (!history.some((h) => h.version === version)) {
    history.unshift({
      version,
      releasedAt,
      contentSha,
      ...(notes ? { notes } : {}),
    });
  }

  writeJson(join(dest, "template.json"), templateMeta);
  writeJson(join(dest, "files.json"), files);
  writeFileSync(join(dest, "content.sha"), contentSha + "\n");
  writeJson(join(dest, "manifest.json"), {
    id: entry.id,
    version,
    label: templateMeta.label,
    hint: templateMeta.hint,
    cssPath: templateMeta.cssPath,
    installTargets: templateMeta.installTargets,
    fileCount: Object.keys(files).length,
    contentSha,
    releasedAt,
  });

  // Sync source template.json (developers see current version)
  const sourceMeta = {
    ...entry.meta,
    id: entry.id,
    version,
    label: templateMeta.label,
    hint: templateMeta.hint,
    cssPath: entry.meta.cssPath,
    installTargets: templateMeta.installTargets,
    latestVersion: version,
    versions: { latest: version, history },
  };
  writeJson(join(entry.sourceDir, "template.json"), sourceMeta);

  return { templateMeta, history, releasedAt };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  console.log();
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║   DevKit — templates:release                     ║");
  console.log("╚══════════════════════════════════════════════════╝");
  console.log();

  let work = discoverTemplates();
  if (opts.ids) work = work.filter((t) => opts.ids.has(t.id));

  console.log(
    `Release${opts.dryRun ? " (dry-run)" : ""}${opts.init ? " — init 1.0.0" : ""}${opts.force ? " — force" : " — skip unchanged"}`
  );
  console.log(`Candidates: ${work.length}`);
  console.log();

  const index = readIndex();
  const byId = new Map((index.templates ?? []).map((t) => [t.id, t]));
  let published = 0;
  let skipped = 0;

  for (const entry of work) {
    const files = walkTextFiles(entry.sourceDir);
    const contentSha = hashFiles(files);
    const prev = previousPublished(entry.id);

    if (!opts.force && !opts.init && prev && prev.sha === contentSha) {
      skipped++;
      console.log(`  · ${entry.id} — unchanged, skip`);
      // Keep index in sync even when skipping
      const existing = byId.get(entry.id);
      if (existing) {
        existing.label = entry.meta.label;
        existing.hint = entry.meta.hint ?? "";
      }
      continue;
    }

    const current =
      prev?.version ??
      entry.meta.versions?.latest ??
      entry.meta.latestVersion ??
      entry.meta.version ??
      "0.0.0";
    const version = opts.init || current === "0.0.0" ? "1.0.0" : nextVersion(current, false);

    if (opts.dryRun) {
      console.log(`  · ${entry.id} → ${version}${prev ? " [changed]" : " [new]"} (${Object.keys(files).length} files)`);
      continue;
    }

    const { templateMeta, history } = publishOne(entry, version, files, contentSha, opts.notes);
    byId.set(entry.id, {
      id: entry.id,
      version,
      latestVersion: version,
      label: templateMeta.label,
      hint: templateMeta.hint,
      cssPath: templateMeta.cssPath,
      installTargets: templateMeta.installTargets,
      dir: entry.dir,
      versions: { latest: version, history },
    });
    published++;
    console.log(`  ✓ ${entry.id} → ${version} (${Object.keys(files).length} files)`);
  }

  if (!opts.dryRun) {
    const templates = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
    // Drop index entries whose source folder disappeared
    const liveIds = new Set(discoverTemplates().map((t) => t.id));
    const pruned = templates.filter((t) => liveIds.has(t.id));
    writeJson(INDEX_JSON, {
      version: bumpPatch(index.version ?? "1.0.0"),
      updatedAt: new Date().toISOString(),
      templates: pruned,
    });
    console.log();
    console.log(`  Updated catalog/templates.json (${pruned.length} templates)`);
  }

  console.log();
  console.log(`Done. published=${published} skipped=${skipped}${opts.dryRun ? " (dry-run)" : ""}`);
  console.log();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
