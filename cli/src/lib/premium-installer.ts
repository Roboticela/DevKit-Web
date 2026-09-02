import ora from "ora";
import chalk from "chalk";
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import { readConfig, readLock, writeLock, isComponentInstalled } from "../lib/config.js";
import { requestPremiumAsset } from "../lib/premium-assets.js";
import { registerProjectWithServer, ensureProjectIdentity } from "../lib/project.js";
import { ensureDevKitPackage } from "../lib/module-installer.js";
import {
  installPremiumPackageToNodeModules,
  readPremiumImportRegistry,
  writePremiumImportRegistry,
  premiumPackageName,
  type PremiumImportEntry,
} from "../lib/premium-package.js";
import { log } from "../lib/logger.js";
import { cliBinName } from "../lib/cli-meta.js";
import type { PackageKind } from "../lib/component-entry.js";

function routeSlug(assetId: string): string {
  return assetId.endsWith("-page") ? assetId.replace(/-page$/, "") : assetId;
}

export async function installPremiumAsset(
  assetId: string,
  kind: PackageKind,
  cwd = process.cwd(),
  options: { force?: boolean; version?: string } = {}
) {
  const config = readConfig(cwd);

  if (isComponentInstalled(assetId, cwd) && !options.force) {
    log.info(`${assetId} is already provisioned — skipping.`);
    return;
  }

  let projectId = config.project?.id;
  if (!projectId) {
    projectId = (await registerProjectWithServer(cwd)) ?? undefined;
  }
  if (!projectId) {
    log.error(`Project must be registered. Run '${cliBinName()} login' and '${cliBinName()} init'.`);
    process.exit(1);
  }

  const spinner = ora({ text: `Authorizing ${chalk.cyan(assetId)} from server…`, color: "cyan" }).start();

  try {
    const signed = await requestPremiumAsset(
      projectId,
      assetId,
      config.template,
      options.version ?? "latest"
    );
    const manifest = signed.manifest as {
      name?: string;
      version?: string;
      type?: string;
      route?: string;
      delivery?: string;
    };

    if (manifest.delivery && manifest.delivery !== "server-package") {
      throw new Error("Invalid premium delivery mode from server.");
    }

    const version = String(signed.version ?? manifest.version ?? "1.0.0");
    const files = signed.files;

    if (!files["index.js"]) {
      throw new Error(
        "Server did not return a compiled premium package. Source distribution is not allowed."
      );
    }

    spinner.text = `Installing ${assetId} to node_modules (compiled only)…`;

    ensureDevKitPackage(cwd);
    ensureProjectIdentity(cwd);

    const packageName = installPremiumPackageToNodeModules(
      assetId,
      files,
      {
        name: assetId,
        version,
        type: (manifest.type as "page" | "section" | "scaffold") ?? "page",
        route: manifest.route ?? routeSlug(assetId),
      },
      cwd
    );

    const existing = readPremiumImportRegistry(cwd).filter((e) => e.assetId !== assetId);
    const entry: PremiumImportEntry = {
      assetId,
      packageName,
      route: manifest.route ?? routeSlug(assetId),
      version,
    };
    writePremiumImportRegistry([...existing, entry], cwd);

    mkdirSync(join(cwd, ".devkit"), { recursive: true });
    writeFileSync(
      join(cwd, ".devkit", `${assetId}.manifest.json`),
      JSON.stringify(
        {
          name: assetId,
          kind,
          delivery: "server-package",
          tier: "premium",
          version,
          template: config.template,
          package: packageName,
          installedAt: new Date().toISOString(),
          managedFiles: [],
          usage: `Route: /devkit-premium/${entry.route ?? assetId}`,
          note: "Source is not copied. Asset runs from server-delivered compiled package in node_modules.",
        },
        null,
        2
      ) + "\n"
    );

    const lock = readLock(cwd);
    lock.components[assetId] = {
      version,
      variant: null,
      resolved: `server-package:${packageName}@${version}`,
      integrity: signed.integrity,
      installedAt: new Date().toISOString(),
    };
    writeLock(lock, cwd);

    ensurePremiumGitignore(cwd);

    spinner.succeed(chalk.green(`${assetId} provisioned from server`));
    log.blank();
    log.info("Premium asset — not copied to src/. Loaded at runtime from server package:");
    log.step(`Package: ${chalk.cyan(packageName)}`);
    log.step(`Route:   ${chalk.cyan(`/devkit-premium/${entry.route ?? assetId}`)}`);
    log.blank();
    log.warn("Do not copy files from node_modules — use the DevKit premium route or premiumImports loader.");
  } catch (e) {
    spinner.fail(chalk.red((e as Error).message));
    if ((e as Error).message.includes("LICENSE_REQUIRED")) {
      console.log();
      log.warn("Premium asset — project license required ($50 one-time).");
      log.info(`Run: ${cliBinName()} activate`);
    }
    process.exit(1);
  }
}

function ensurePremiumGitignore(cwd: string) {
  const gitignorePath = join(cwd, ".gitignore");
  const lines = [
    "",
    "# DevKit premium (server-delivered, do not commit)",
    ".devkit/premium-imports.ts",
    ".devkit/premium-registry.json",
    "node_modules/@roboticela/premium-*/",
  ];
  if (!existsSync(gitignorePath)) {
    writeFileSync(gitignorePath, lines.join("\n").trimStart() + "\n");
    return;
  }
  const gi = readFileSync(gitignorePath, "utf-8");
  if (!gi.includes("node_modules/@roboticela/premium-")) {
    writeFileSync(gitignorePath, gi.trimEnd() + lines.join("\n") + "\n");
  }
}

export async function premiumAddCommand(
  names: string[],
  kind: PackageKind,
  cwd = process.cwd()
) {
  if (names.length === 0) {
    log.error(`Provide an asset name. Example: devkit ${kind} add dashboard-page`);
    process.exit(1);
  }
  for (const name of names) {
    await installPremiumAsset(name.split("@")[0]!, kind, cwd);
  }
}
