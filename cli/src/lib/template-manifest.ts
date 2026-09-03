import { createHash } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";

export interface TemplateManagedFile {
  path: string;
  /** sha256 of content as last applied by DevKit (after placeholders). */
  hash: string;
}

export interface TemplateManifest {
  version: 1;
  templateId: string;
  templateVersion: string;
  updatedAt: string;
  files: TemplateManagedFile[];
}

const MANIFEST_REL = join(".devkit", "template.manifest.json");

/** Paths DevKit never overwrites during a template-only update. */
export const TEMPLATE_UPDATE_PROTECTED = new Set([
  "devkit.config.json",
  "devkit.lock.json",
  ".env",
  ".env.local",
  ".env.development",
  ".env.production",
]);

export function hashText(content: string | Buffer): string {
  return createHash("sha256").update(content).digest("hex");
}

export function hashFileIfExists(absPath: string): string | null {
  if (!existsSync(absPath)) return null;
  return hashText(readFileSync(absPath));
}

export function templateManifestPath(cwd = process.cwd()): string {
  return join(cwd, MANIFEST_REL);
}

export function readTemplateManifest(cwd = process.cwd()): TemplateManifest | null {
  const path = templateManifestPath(cwd);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as TemplateManifest;
  } catch {
    return null;
  }
}

export function writeTemplateManifest(manifest: TemplateManifest, cwd = process.cwd()): void {
  const path = templateManifestPath(cwd);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(manifest, null, 2) + "\n");
}

export function buildTemplateManifest(
  templateId: string,
  templateVersion: string,
  files: Record<string, string>
): TemplateManifest {
  return {
    version: 1,
    templateId,
    templateVersion,
    updatedAt: new Date().toISOString(),
    files: Object.entries(files)
      .map(([path, content]) => ({ path, hash: hashText(content) }))
      .sort((a, b) => a.path.localeCompare(b.path)),
  };
}

export function isProtectedTemplatePath(relPath: string): boolean {
  const norm = relPath.replace(/\\/g, "/");
  if (TEMPLATE_UPDATE_PROTECTED.has(norm)) return true;
  if (norm.startsWith(".devkit/")) return true;
  if (norm === ".git" || norm.startsWith(".git/")) return true;
  return false;
}
