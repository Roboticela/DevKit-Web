import chalk from "chalk";
import { configExists, readConfig, readLock } from "../lib/config.js";
import { cliBinName } from "../lib/cli-meta.js";
import { log } from "../lib/logger.js";
import {
  applyTemplateUpdatePlan,
  fetchTemplateBundle,
  planTemplateUpdate,
  printTemplateUpdatePlan,
} from "../lib/template-update.js";

export interface UpdateTemplateOptions {
  /** Report plan only — do not write files. */
  check?: boolean;
  /** Overwrite conflicted files (user-modified). */
  force?: boolean;
  /** Target catalog version (same as packages: --to / id@version). */
  to?: string;
}

/**
 * Update only the project scaffold/template files from the live catalog.
 * Keeps installed packages, lock entries, config, and user edits intact.
 * User-modified template files are reported as conflicts (unless --force).
 */
export async function updateTemplateCommand(
  opts: UpdateTemplateOptions = {},
  cwd = process.cwd()
) {
  const bin = cliBinName();

  if (!configExists(cwd)) {
    log.error(`No devkit.config.json. Run ${chalk.cyan(`${bin} init`)} or ${chalk.cyan(`${bin} create`)} first.`);
    process.exit(1);
  }

  const config = readConfig(cwd);
  const lock = readLock(cwd);
  const packageCount = Object.keys(lock.components ?? {}).length;

  log.info("Template-only update — catalog packages and lockfile entries are left alone.");
  if (packageCount > 0) {
    log.step(`Installed packages unchanged: ${packageCount}`);
  }

  let fetched;
  try {
    fetched = await fetchTemplateBundle(config.template, opts.to);
  } catch (e) {
    log.error(`Could not fetch template '${config.template}': ${(e as Error).message}`);
    process.exit(1);
  }

  if (
    config.templateVersion &&
    config.templateVersion === fetched.version &&
    !opts.force &&
    !opts.check
  ) {
    // Still run the plan — file-level drift may exist even on same version
  }

  const plan = planTemplateUpdate(cwd, fetched, { force: opts.force === true });
  printTemplateUpdatePlan(plan);

  const conflictCount = plan.files.filter((f) => f.status === "conflict").length;
  const changeCount = plan.files.filter((f) => f.status === "update" || f.status === "add").length;

  if (opts.check) {
    if (conflictCount > 0) {
      log.warn(`${conflictCount} conflict(s). Resolve manually or re-run with ${chalk.cyan("--force")} to overwrite.`);
      process.exitCode = 2;
    } else if (changeCount === 0) {
      log.success("Template is up to date — no file changes needed.");
    } else {
      log.info(`Dry run: ${changeCount} file(s) would be written. Run without --check to apply.`);
    }
    return;
  }

  if (changeCount === 0 && conflictCount === 0) {
    log.success(`Already on ${plan.templateId}@${plan.toVersion} — nothing to write.`);
    // Still refresh baseline / version stamp via apply with empty writes
    applyTemplateUpdatePlan(cwd, plan);
    return;
  }

  const result = applyTemplateUpdatePlan(cwd, plan);

  if (result.applied.length > 0) {
    log.success(
      `Updated template → ${chalk.cyan(`${plan.templateId}@${result.version}`)} · wrote ${result.applied.length} file(s)`
    );
  }

  if (result.conflicts.length > 0) {
    log.warn(`${result.conflicts.length} conflict(s) were left unchanged:`);
    for (const c of result.conflicts) {
      console.log(`  ${chalk.yellow("!")} ${c.path}`);
      if (c.reason) console.log(chalk.dim(`    ${c.reason}`));
    }
    log.blank();
    log.info(`Edit those files by hand, or overwrite with ${chalk.cyan(`${bin} update --template --force`)}`);
    process.exitCode = 2;
  }

  if (result.applied.some((p) => p === "package.json" || p.endsWith("/package.json"))) {
    log.info("package.json changed — run npm install if dependency ranges moved.");
  }

  log.info("Installed catalog packages were not updated. Use update <name> / update --all for those.");
}
