import ora from "ora";
import chalk from "chalk";
import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { readConfig, readLock, isComponentInstalled } from "../lib/config.js";
import { installComponent } from "../lib/installer.js";
import { installPremiumAsset } from "../lib/premium-installer.js";
import { getLocalDevKitPackagePath, ensureDevKitPackage } from "../lib/module-installer.js";
import { cliBinName, cliPackageName } from "../lib/cli-meta.js";
import { requireLogin } from "../lib/auth-store.js";
import { CLI_VERSION } from "../version.js";
import { log } from "../lib/logger.js";
import type { PackageKind } from "../lib/component-entry.js";

function inferKind(name: string, resolved?: string): PackageKind {
  if (resolved?.startsWith("server-package:") || resolved?.startsWith("server:")) {
    if (name.endsWith("-scaffold")) return "scaffold";
    if (name.endsWith("-section")) return "section";
    return "page";
  }
  if (name.endsWith("-scaffold")) return "scaffold";
  if (name.endsWith("-section")) return "section";
  if (name.endsWith("-page")) return "page";
  return "component";
}

/** Bump project dependency on @roboticela/devkit to latest (or local file:) without touching app source. */
function refreshDevKitDependency(cwd: string): void {
  const local = getLocalDevKitPackagePath();
  if (local) {
    ensureDevKitPackage(cwd, CLI_VERSION);
    return;
  }

  const pkgPath = join(cwd, "package.json");
  if (!existsSync(pkgPath)) return;
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as {
    dependencies?: Record<string, string>;
  };
  pkg.dependencies = pkg.dependencies ?? {};
  pkg.dependencies[cliPackageName()] = `^${CLI_VERSION}`;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  try {
    execSync(`npm install ${cliPackageName()}@${CLI_VERSION}`, { cwd, stdio: "inherit" });
  } catch {
    log.warn(`Could not npm install ${cliPackageName()}@${CLI_VERSION} — run npm install manually.`);
  }
}

export interface UpdatePackagesOptions {
  all?: boolean;
  force?: boolean;
  version?: string;
}

/**
 * Update installed free components and/or premium pages/sections/scaffolds.
 * Does not update the CLI binary — use `devkit update --cli` for that.
 */
export async function updatePackagesCommand(
  names: string[],
  opts: UpdatePackagesOptions = {},
  cwd = process.cwd()
) {
  requireLogin(cwd);
  const bin = cliBinName();
  const lock = readLock(cwd);
  const config = readConfig(cwd);
  const force = opts.force === true;
  const version = opts.version ?? "latest";

  let targets: string[];
  if (opts.all) {
    targets = Object.keys(lock.components);
    if (targets.length === 0) {
      log.info(`No packages installed. Add some with ${chalk.cyan(`${bin} add`)}.`);
      return;
    }
  } else {
    targets = names.map((n) => n.split("@")[0]!).filter(Boolean);
    if (targets.length === 0) {
      log.error(`Specify package names or use ${chalk.cyan("--all")}.`);
      log.info(`Examples: ${chalk.cyan(`${bin} update button`)}  ·  ${chalk.cyan(`${bin} update --all`)}`);
      log.info(`CLI only:  ${chalk.cyan(`${bin} update --cli`)}`);
      process.exit(1);
    }
  }

  const missing = targets.filter((n) => !isComponentInstalled(n, cwd));
  if (missing.length > 0) {
    log.error(`Not installed: ${missing.join(", ")}. Add first with ${chalk.cyan(`${bin} add`)}.`);
    process.exit(1);
  }

  const hasModule = targets.some((n) => {
    const r = lock.components[n]?.resolved ?? "";
    return r.startsWith("module:") || (!r.startsWith("server-package:") && !r.startsWith("server:"));
  });
  if (hasModule) {
    log.step("Refreshing @roboticela/devkit package…");
    refreshDevKitDependency(cwd);
  }

  log.info(`Updating ${targets.length} package(s)…`);

  let ok = 0;
  for (const name of targets) {
    const entry = lock.components[name]!;
    const kind = inferKind(name, entry.resolved);
    const s = ora(`Updating ${chalk.cyan(name)} (${kind})…`).start();
    try {
      if (kind === "component") {
        await installComponent(
          name,
          config.template,
          version === "latest" ? "latest" : version,
          entry.variant ?? undefined,
          cwd,
          { force }
        );
      } else {
        await installPremiumAsset(name, kind, cwd, {
          force: true,
          version: version === "latest" ? "latest" : version,
        });
      }
      s.succeed(chalk.green(`${name} updated`));
      ok++;
    } catch (e) {
      s.fail(chalk.red(`${name}: ${(e as Error).message}`));
    }
  }

  if (ok > 0) {
    log.success(`Updated ${ok}/${targets.length} package(s).`);
    log.info("Your app source was not rewritten — imports and premium routes stay the same.");
  }
}
