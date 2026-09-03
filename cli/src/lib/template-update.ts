import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import chalk from "chalk";
import { readConfig, writeConfig } from "./config.js";
import { apiFetch, getApiBaseUrl } from "./api-client.js";
import { log } from "./logger.js";
import { parseIdAtVersion } from "./id-version.js";
import {
  buildTemplateManifest,
  hashFileIfExists,
  hashText,
  isProtectedTemplatePath,
  readTemplateManifest,
  writeTemplateManifest,
  type TemplateManifest,
} from "./template-manifest.js";

export interface FetchedTemplate {
  templateId: string;
  version: string;
  label: string;
  hint: string;
  cssPath?: string | null;
  installTargets?: Array<"root" | "server">;
  files: Record<string, string>;
}

export type TemplateFileStatus =
  | "unchanged"
  | "update"
  | "add"
  | "conflict"
  | "protected"
  | "removed-upstream";

export interface TemplateFilePlan {
  path: string;
  status: TemplateFileStatus;
  /** Human-readable reason for conflicts / protected. */
  reason?: string;
}

export interface TemplateUpdatePlan {
  templateId: string;
  fromVersion: string | null;
  toVersion: string;
  label: string;
  files: TemplateFilePlan[];
  /** Content after placeholder substitution (to write for update/add). */
  nextFiles: Record<string, string>;
  hasBaseline: boolean;
}

export interface TemplateUpdateResult {
  applied: string[];
  conflicts: TemplateFilePlan[];
  protected: TemplateFilePlan[];
  skippedUnchanged: number;
  version: string;
}

function placeholderVars(cwd: string, config: ReturnType<typeof readConfig>) {
  const projectName =
    (existsSync(join(cwd, "package.json"))
      ? (JSON.parse(readFileSync(join(cwd, "package.json"), "utf-8")) as { name?: string }).name
      : null) || config.site.name;
  const slug = String(projectName).toLowerCase().replace(/[^a-z0-9-]/g, "-");
  return {
    PROJECT_NAME: projectName,
    PROJECT_SLUG: slug,
    SITE_NAME: config.site.name,
    SITE_URL: config.site.url,
    SITE_DESCRIPTION:
      config.site.description ?? `${config.site.name} — built with Roboticela DevKit`,
  };
}

export function applyTemplatePlaceholders(
  files: Record<string, string>,
  vars: Record<string, string>
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [rel, raw] of Object.entries(files)) {
    let content = raw;
    for (const [key, val] of Object.entries(vars)) {
      content = content.replaceAll(`{{${key}}}`, val);
    }
    out[rel] = content;
  }
  return out;
}

/** Fetch template file map from the API (does not write to disk). Supports id@version. */
export async function fetchTemplateBundle(
  templateId: string,
  versionOverride?: string
): Promise<FetchedTemplate> {
  const { id, version: fromSpec } = parseIdAtVersion(templateId);
  const version = versionOverride ?? fromSpec;
  const qs = version && version !== "latest" ? `?version=${encodeURIComponent(version)}` : "";

  const data = await apiFetch<{
    templateId: string;
    version: string;
    label: string;
    hint: string;
    cssPath?: string | null;
    installTargets?: Array<"root" | "server">;
    files: Record<string, string>;
  }>(`/templates/${encodeURIComponent(id)}/files${qs}`, {
    apiUrl: getApiBaseUrl(),
  });

  if (!data.files || Object.keys(data.files).length === 0) {
    throw new Error(`Server returned an empty template for '${id}'.`);
  }

  return {
    templateId: data.templateId,
    version: data.version,
    label: data.label,
    hint: data.hint,
    cssPath: data.cssPath,
    installTargets: data.installTargets,
    files: data.files,
  };
}

/**
 * Build a plan to update only scaffold/template files.
 * Does not touch installed catalog packages, lock components, or user config.
 */
export function planTemplateUpdate(
  cwd: string,
  fetched: FetchedTemplate,
  opts: { force?: boolean } = {}
): TemplateUpdatePlan {
  const config = readConfig(cwd);
  const baseline = readTemplateManifest(cwd);
  const vars = placeholderVars(cwd, config);
  const nextFiles = applyTemplatePlaceholders(fetched.files, vars);

  const baselineByPath = new Map((baseline?.files ?? []).map((f) => [f.path, f.hash]));
  const plans: TemplateFilePlan[] = [];
  const seen = new Set<string>();

  for (const [rel, nextContent] of Object.entries(nextFiles)) {
    seen.add(rel);
    const norm = rel.replace(/\\/g, "/");

    if (isProtectedTemplatePath(norm)) {
      plans.push({
        path: norm,
        status: "protected",
        reason: "DevKit never overwrites project config / secrets / .devkit during template update",
      });
      continue;
    }

    const abs = join(cwd, norm);
    const diskHash = hashFileIfExists(abs);
    const nextHash = hashText(nextContent);
    const baseHash = baselineByPath.get(norm) ?? null;

    if (diskHash == null) {
      plans.push({ path: norm, status: "add" });
      continue;
    }

    if (diskHash === nextHash) {
      plans.push({ path: norm, status: "unchanged" });
      continue;
    }

    // Disk differs from what we want to write
    if (opts.force) {
      plans.push({
        path: norm,
        status: "update",
        reason: "forced overwrite",
      });
      continue;
    }

    if (baseHash && diskHash === baseHash) {
      // Clean — last applied by DevKit, safe to refresh
      plans.push({ path: norm, status: "update" });
      continue;
    }

    if (baseHash && diskHash !== baseHash) {
      plans.push({
        path: norm,
        status: "conflict",
        reason: "File was modified after the last template apply (hash ≠ baseline)",
      });
      continue;
    }

    // No baseline (legacy project) — cannot prove file is pristine
    plans.push({
      path: norm,
      status: "conflict",
      reason:
        "No template baseline (.devkit/template.manifest.json). File differs from the new template — resolve manually or re-run with --force",
    });
  }

  // Files that were in baseline but removed upstream
  for (const [rel] of baselineByPath) {
    if (seen.has(rel) || isProtectedTemplatePath(rel)) continue;
    plans.push({
      path: rel,
      status: "removed-upstream",
      reason: "Present in last applied template but no longer in the server template (left on disk)",
    });
  }

  plans.sort((a, b) => a.path.localeCompare(b.path));

  return {
    templateId: fetched.templateId,
    fromVersion: baseline?.templateVersion ?? config.templateVersion ?? null,
    toVersion: fetched.version,
    label: fetched.label,
    files: plans,
    nextFiles,
    hasBaseline: Boolean(baseline),
  };
}

export function printTemplateUpdatePlan(plan: TemplateUpdatePlan): void {
  const by = (s: TemplateFileStatus) => plan.files.filter((f) => f.status === s);

  log.blank();
  log.info(
    `Template ${chalk.cyan(plan.templateId)}  ${plan.fromVersion ?? "?"} → ${chalk.cyan(plan.toVersion)} (${plan.label})`
  );
  if (!plan.hasBaseline) {
    log.warn("No .devkit/template.manifest.json — conflict detection is stricter until a baseline exists.");
  }

  const updates = by("update");
  const adds = by("add");
  const conflicts = by("conflict");
  const protectedFiles = by("protected");
  const removed = by("removed-upstream");
  const unchanged = by("unchanged");

  if (updates.length) {
    console.log(chalk.bold(`\n  Will update (${updates.length})`));
    for (const f of updates) console.log(`    ${chalk.green("↑")} ${f.path}`);
  }
  if (adds.length) {
    console.log(chalk.bold(`\n  Will add (${adds.length})`));
    for (const f of adds) console.log(`    ${chalk.green("+")} ${f.path}`);
  }
  if (conflicts.length) {
    console.log(chalk.bold.yellow(`\n  Conflicts — left unchanged (${conflicts.length})`));
    for (const f of conflicts) {
      console.log(`    ${chalk.yellow("!")} ${f.path}`);
      if (f.reason) console.log(chalk.dim(`      ${f.reason}`));
    }
  }
  if (protectedFiles.length) {
    console.log(chalk.bold(`\n  Protected — skipped (${protectedFiles.length})`));
    for (const f of protectedFiles) console.log(`    ${chalk.dim("•")} ${f.path}`);
  }
  if (removed.length) {
    console.log(chalk.bold(`\n  Removed upstream — kept on disk (${removed.length})`));
    for (const f of removed) console.log(`    ${chalk.dim("○")} ${f.path}`);
  }
  if (unchanged.length) {
    console.log(chalk.dim(`\n  Unchanged: ${unchanged.length} file(s)`));
  }
  log.blank();
}

/**
 * Apply a template update plan. Never writes conflict/protected paths unless force was
 * already baked into the plan (status === update).
 * Does not modify lock.components or catalog packages.
 */
export function applyTemplateUpdatePlan(
  cwd: string,
  plan: TemplateUpdatePlan,
  opts: { dryRun?: boolean } = {}
): TemplateUpdateResult {
  const applied: string[] = [];
  const conflicts = plan.files.filter((f) => f.status === "conflict");
  const protectedFiles = plan.files.filter((f) => f.status === "protected");
  let skippedUnchanged = 0;

  const nextBaselineFiles: { path: string; hash: string }[] = [];
  const previous = readTemplateManifest(cwd);
  const previousByPath = new Map((previous?.files ?? []).map((f) => [f.path, f.hash]));

  for (const item of plan.files) {
    if (item.status === "unchanged") {
      skippedUnchanged++;
      const content = plan.nextFiles[item.path];
      if (content != null) {
        nextBaselineFiles.push({ path: item.path, hash: hashText(content) });
      } else if (previousByPath.has(item.path)) {
        nextBaselineFiles.push({ path: item.path, hash: previousByPath.get(item.path)! });
      }
      continue;
    }

    if (item.status === "conflict" || item.status === "protected" || item.status === "removed-upstream") {
      // Keep the last DevKit-applied hash so future runs still detect user edits as conflicts.
      // Do NOT adopt the on-disk hash for conflicts (that would treat edits as clean).
      if (previousByPath.has(item.path) && item.status !== "removed-upstream") {
        nextBaselineFiles.push({ path: item.path, hash: previousByPath.get(item.path)! });
      }
      continue;
    }

    if (item.status === "update" || item.status === "add") {
      const content = plan.nextFiles[item.path];
      if (content == null) continue;
      if (!opts.dryRun) {
        const dest = join(cwd, item.path);
        mkdirSync(dirname(dest), { recursive: true });
        writeFileSync(dest, content);
      }
      applied.push(item.path);
      nextBaselineFiles.push({ path: item.path, hash: hashText(content) });
    }
  }

  if (!opts.dryRun) {
    const manifest: TemplateManifest = {
      version: 1,
      templateId: plan.templateId,
      templateVersion: plan.toVersion,
      updatedAt: new Date().toISOString(),
      files: nextBaselineFiles.sort((a, b) => a.path.localeCompare(b.path)),
    };
    writeTemplateManifest(manifest, cwd);

    const config = readConfig(cwd);
    config.template = plan.templateId;
    config.templateVersion = plan.toVersion;
    writeConfig(config, cwd);
  }

  return {
    applied,
    conflicts,
    protected: protectedFiles,
    skippedUnchanged,
    version: plan.toVersion,
  };
}

/** Record baseline after create/download (call with the exact files written). */
export function recordTemplateBaseline(
  cwd: string,
  templateId: string,
  templateVersion: string,
  writtenFiles: Record<string, string>
): void {
  writeTemplateManifest(buildTemplateManifest(templateId, templateVersion, writtenFiles), cwd);
}
