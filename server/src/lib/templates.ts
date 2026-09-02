import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, relative, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface TemplateMeta {
  id: string;
  /** Semver for this scaffold — bump when template files change. */
  version: string;
  label: string;
  hint: string;
  /** Folder name under the templates root */
  dir: string;
  cssPath?: string;
  /** Where npm install should run: root and/or server */
  installTargets?: Array<"root" | "server">;
}

function templatesRoots(): string[] {
  // Deployed: server/templates — Monorepo: repo/templates
  return [
    join(__dirname, "..", "..", "templates"),
    join(__dirname, "..", "..", "..", "templates"),
  ];
}

export function resolveTemplatesRoot(): string | null {
  for (const root of templatesRoots()) {
    if (!existsSync(root)) continue;
    // Any directory (or a central registry) counts
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

/**
 * Discover templates from the server filesystem.
 * Add a new template tomorrow by dropping a folder with `template.json` — no CLI republish.
 */
export function listTemplates(): TemplateMeta[] {
  const root = resolveTemplatesRoot();
  if (!root) return [];

  const out: TemplateMeta[] = [];

  // Optional central registry (overrides / supplements discovery)
  const central = readJson<{ templates?: TemplateMeta[] }>(join(root, "templates.json"));
  if (central?.templates?.length) {
    for (const t of central.templates) {
      const dir = t.dir || t.id;
      if (!existsSync(join(root, dir))) continue;
      out.push({ ...t, version: t.version ?? "1.0.0", dir });
    }
  }

  // Auto-discover: each child folder with template.json
  for (const entry of readdirSync(root)) {
    const dirPath = join(root, entry);
    if (!statSync(dirPath).isDirectory()) continue;
    const metaPath = join(dirPath, "template.json");
    if (!existsSync(metaPath)) continue;
    const meta = readJson<Omit<TemplateMeta, "dir"> & { dir?: string }>(metaPath);
    if (!meta?.id || !meta.label) continue;
    if (out.some((t) => t.id === meta.id)) continue;
    out.push({
      id: meta.id,
      version: meta.version ?? "1.0.0",
      label: meta.label,
      hint: meta.hint ?? "",
      dir: meta.dir ?? entry,
      cssPath: meta.cssPath,
      installTargets: meta.installTargets ?? ["root"],
    });
  }

  return out.sort((a, b) => a.label.localeCompare(b.label));
}

export function getTemplateMeta(id: string): TemplateMeta | null {
  return listTemplates().find((t) => t.id === id) ?? null;
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
      if (rel === "template.json") continue; // meta only — not part of scaffold
      if (rel.endsWith(".png") || rel.endsWith(".jpg") || rel.endsWith(".ico") || rel.endsWith(".woff2")) {
        continue;
      }
      out[rel] = readFileSync(full, "utf-8");
    }
  }
  return out;
}

/** Load template source files for scaffolding (text files only). */
export function loadTemplateFiles(templateId: string): Record<string, string> | null {
  const meta = getTemplateMeta(templateId);
  const root = resolveTemplatesRoot();
  if (!meta || !root) return null;
  const dir = join(root, meta.dir);
  if (!existsSync(dir)) return null;
  return walkFiles(dir);
}
