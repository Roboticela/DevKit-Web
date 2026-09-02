import ora from "ora";
import chalk from "chalk";
import { readConfig, readLock } from "../lib/config.js";
import { installComponent } from "../lib/installer.js";
import { installPremiumAsset } from "../lib/premium-installer.js";
import { log } from "../lib/logger.js";
import { cliBinName } from "../lib/cli-meta.js";
import { requireLogin } from "../lib/auth-store.js";
import type { PackageKind } from "../lib/component-entry.js";

/**
 * Reinstall everything declared in devkit.lock.json (CI / restore).
 * Does not upgrade the CLI itself — use `devkit update --cli` for that.
 */
export async function syncCommand(opts: { force?: boolean } = {}, cwd = process.cwd()) {
  requireLogin(cwd);
  const force = opts.force === true;
  const lock = readLock(cwd);
  const config = readConfig(cwd);
  const names = Object.keys(lock.components);

  if (names.length === 0) {
    log.info(`Nothing in lockfile. Add packages with ${chalk.cyan(`${cliBinName()} add`)}.`);
    return;
  }

  log.info(`Syncing ${names.length} package(s) from lockfile…`);

  for (const [name, entry] of Object.entries(lock.components)) {
    const s = ora(`Syncing ${name}…`).start();
    try {
      const resolved = entry.resolved ?? "";
      if (resolved.startsWith("server-package:") || resolved.startsWith("server:")) {
        const kind: PackageKind = name.endsWith("-scaffold")
          ? "scaffold"
          : name.endsWith("-section")
            ? "section"
            : "page";
        await installPremiumAsset(name, kind, cwd, { force: true });
      } else {
        await installComponent(
          name,
          config.template,
          entry.version,
          entry.variant ?? undefined,
          cwd,
          { force }
        );
      }
      s.succeed(`${name}@${entry.version}`);
    } catch (e) {
      s.fail(`${name}: ${(e as Error).message}`);
    }
  }

  log.success("Lockfile sync complete.");
}
