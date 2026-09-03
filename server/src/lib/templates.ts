import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, relative, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface TemplateVersionHistoryEntry {
  version: string;
  releasedAt?: string;
  contentSha?: string;
  notes?: string;
}

export interface TemplateMeta {
  id: string;
  /** Semver for this scaffold — bump via templates:release when files change. */
  version: string;
  label: string;
  hint: string;
  /** Folder name under the templates root */
  dir: string;
  cssPath?: string;
  /** Where npm install should run: root and/or server */
  installTargets?: Array<"root" | "server">;
  latestVersion?: string;
  versions?: {
    latest: string;
    history?: TemplateVersionHistoryEntry[];
  };
}

function catalogRoots(): string[] {
  return [
    join(__dirname, "..", "..", "catalog", "templates"),
    join(__dirname, "..", "..", "..", "server", "catalog", "templates"),
  ];
}

function templatesRoots(): string[] {
  // Deployed: server/templates — Monorepo: repo/templates
  return [
    join(__dirname, "..", "..", "templates"),
    join(__dirname, "..", "..", "..", "templates"),
  ];
}

function indexPaths(): string[] {
  return [
    join(__dirname, "..", "..", "catalog", "templates.json"),
    join(__dirname, "..", "..", "..", "server", "catalog", "templates.json"),
  ];
}

export function resolveCatalogTemplatesRoot(): string | null {
  for (const root of catalogRoots()) {
    if (existsSync(root)) return root;
  }
  return null;
}

export function resolveTemplatesRoot(): string | null {
  for (const root of templatesRoots()) {
    if (!existsSync(root)) continue;
    try {
      const entries = readdirSync(root);
      if (entries.some((e) => existsSync(join(root, e, "template.json")) || e === "templates.json")) {
        return root;
      }
      if (entries.length > 0) return root;
    } catch {
      /* try next */
    }
  }
  return null;
}

function readJson<T>(path: string): T | null {
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as T;
  } catch {
    return null;
  }
}

function compareSemver(a: string, b: string): number {
  const pa = a.split(".").map((n) => parseInt(n, 10) || 0);
  const pb = b.split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < 3; i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d) return d;
  }
  return 0;
}

function listPublishedVersions(id: string): string[] {
  const root = resolveCatalogTemplatesRoot();
  if (!root) return [];
  const dir = join(root, id);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((v) => existsSync(join(dir, v, "files.json")) || existsSync(join(dir, v, "template.json")))
    .sort(compareSemver);
}

function readPublishedMeta(id: string, version: string): TemplateMeta | null {
  const root = resolveCatalogTemplatesRoot();
  if (!root) return null;
  const metaPath = join(root, id, version, "template.json");
  const manifestPath = join(root, id, version, "manifest.json");
  const meta = readJson<TemplateMeta>(metaPath) ?? readJson<TemplateMeta>(manifestPath);
  if (!meta?.id) return null;
  return {
    ...meta,
    version,
    latestVersion: meta.latestVersion ?? version,
    dir: meta.dir ?? id,
    installTargets: meta.installTargets ?? ["root"],
  };
}

function loadIndexTemplates(): TemplateMeta[] {
  for (const path of indexPaths()) {
    if (!existsSync(path)) continue;
    const data = readJson<{ templates?: TemplateMeta[] }>(path);
    if (!data?.templates?.length) continue;
    return data.templates.map((t) => {
      const latest = t.versions?.latest ?? t.latestVersion ?? t.version ?? "1.0.0";
      return {
        ...t,
        version: latest,
        latestVersion: latest,
        dir: t.dir || t.id,
        installTargets: t.installTargets ?? ["root"],
      };
    });
  }
  return [];
}

function loadLiveTemplates(): TemplateMeta[] {
  const root = resolveTemplatesRoot();
  if (!root) return [];

  const out: TemplateMeta[] = [];

  const central = readJson<{ templates?: TemplateMeta[] }>(join(root, "templates.json"));
  if (central?.templates?.length) {
    for (const t of central.templates) {
      const dir = t.dir || t.id;
      if (!existsSync(join(root, dir))) continue;
      const latest = t.versions?.latest ?? t.latestVersion ?? t.version ?? "1.0.0";
      out.push({ ...t, version: latest, latestVersion: latest, dir });
    }
  }

  for (const entry of readdirSync(root)) {
    const dirPath = join(root, entry);
    if (!statSync(dirPath).isDirectory()) continue;
    const metaPath = join(dirPath, "template.json");
    if (!existsSync(metaPath)) continue;
    const meta = readJson<Omit<TemplateMeta, "dir"> & { dir?: string }>(metaPath);
    if (!meta?.id || !meta.label) continue;
    if (out.some((t) => t.id === meta.id)) continue;
    const latest = meta.versions?.latest ?? meta.latestVersion ?? meta.version ?? "1.0.0";
    out.push({
      id: meta.id,
      version: latest,
      latestVersion: latest,
      label: meta.label,
      hint: meta.hint ?? "",
      dir: meta.dir ?? entry,
      cssPath: meta.cssPath,
      installTargets: meta.installTargets ?? ["root"],
      versions: meta.versions,
    });
  }

  return out;
}

/**
 * Discover templates — prefer published catalog index, fall back to live folders.
 * Add a new template by dropping a folder with `template.json`, then run templates:release.
 */
export function listTemplates(): TemplateMeta[] {
  const indexed = loadIndexTemplates();
  if (indexed.length) {
    return indexed.sort((a, b) => a.label.localeCompare(b.label));
  }
  return loadLiveTemplates().sort((a, b) => a.label.localeCompare(b.label));
}

export function getTemplateMeta(id: string): TemplateMeta | null {
  return listTemplates().find((t) => t.id === id) ?? null;
}

/** Resolve a concrete version string (latest | semver). */
export function resolveTemplateVersion(id: string, requested?: string): string | null {
  const meta = getTemplateMeta(id);
  if (!meta) return null;
  const latest = meta.versions?.latest ?? meta.latestVersion ?? meta.version;
  if (!requested || requested === "latest") return latest;

  const published = listPublishedVersions(id);
  if (published.includes(requested)) return requested;
  if (requested === latest) return latest;
  // Live-only fallback (not yet released to catalog)
  if (!published.length && requested === meta.version) return meta.version;
  return null;
}

export function listTemplateVersions(id: string): string[] {
  const published = listPublishedVersions(id);
  if (published.length) return published;
  const meta = getTemplateMeta(id);
  return meta ? [meta.version] : [];
}

function walkFiles(dir: string, base = dir, out: Record<string, string> = {}): Record<string, string> {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".git" || entry === "dist") continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walkFiles(full, base, out);
    } else {
      const rel = relative(base, full).replace(/\\/g, "/");
      if (rel === "template.json") continue;
      if (rel.endsWith(".png") || rel.endsWith(".jpg") || rel.endsWith(".ico") || rel.endsWith(".woff2")) {
        continue;
      }
      out[rel] = readFileSync(full, "utf-8");
    }
  }
  return out;
}

function loadPublishedFiles(id: string, version: string): Record<string, string> | null {
  const root = resolveCatalogTemplatesRoot();
  if (!root) return null;
  const filesPath = join(root, id, version, "files.json");
  if (!existsSync(filesPath)) return null;
  return readJson<Record<string, string>>(filesPath);
}

/** Load template source files for scaffolding (text files only). */
export function loadTemplateFiles(
  templateId: string,
  version?: string
): { files: Record<string, string>; meta: TemplateMeta } | null {
  const resolved = resolveTemplateVersion(templateId, version);
  if (!resolved) return null;

  const published = loadPublishedFiles(templateId, resolved);
  if (published) {
    const meta =
      readPublishedMeta(templateId, resolved) ??
      ({
        ...(getTemplateMeta(templateId) as TemplateMeta),
        version: resolved,
      } as TemplateMeta);
    return { files: published, meta };
  }

  // Live folder fallback (local monorepo before first templates:release)
  const meta = getTemplateMeta(templateId);
  const root = resolveTemplatesRoot();
  if (!meta || !root) return null;
  if (version && version !== "latest" && version !== meta.version) {
    return null;
  }
  const dir = join(root, meta.dir);
  if (!existsSync(dir)) return null;
  return { files: walkFiles(dir), meta: { ...meta, version: meta.version } };
}
