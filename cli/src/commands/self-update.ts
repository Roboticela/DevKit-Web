import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import chalk from "chalk";
import ora from "ora";
import { intro, outro } from "@clack/prompts";
import { CLI_VERSION } from "../version.js";
import { cliBinName, cliPackageName, isLocalTestMode } from "../lib/cli-meta.js";
import { log } from "../lib/logger.js";

/**
 * Update the DevKit CLI tool only.
 * Never reads or writes the current project (no config, lock, src, or theme changes).
 */
export async function selfUpdateCommand(opts: { check?: boolean } = {}) {
  const bin = cliBinName();
  intro(chalk.cyan("Update DevKit CLI"));

  console.log();
  console.log(`  ${chalk.bold("Current")}  v${CLI_VERSION}`);
  console.log(`  ${chalk.bold("Scope")}    CLI tool only — your project files are not touched`);
  console.log();

  if (opts.check) {
    if (isLocalTestMode()) {
      log.info("Local test mode — run `npm run try` from the monorepo to rebuild.");
      outro(chalk.dim(`Still on v${CLI_VERSION}`));
      return;
    }
    try {
      const latest = execSync(`npm view ${cliPackageName()} version`, {
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      if (latest === CLI_VERSION) {
        outro(chalk.green(`Already up to date (v${CLI_VERSION})`));
      } else {
        log.info(`Latest is ${chalk.cyan(`v${latest}`)}. Run: ${chalk.cyan(`${bin} update --cli`)}`);
        outro(chalk.yellow("Update available"));
      }
    } catch {
      log.warn("Could not reach npm registry to check for updates.");
      outro(chalk.dim(`Still on v${CLI_VERSION}`));
    }
    return;
  }

  if (isLocalTestMode()) {
    const local = process.env.DEVKIT_LOCAL_PACKAGE;
    if (!local || !existsSync(join(local, "package.json"))) {
      log.error("Local package path missing. From monorepo root run: npm run try");
      process.exit(1);
    }
    const spinner = ora("Rebuilding + relinking local CLI…").start();
    try {
      execSync("npm run build", { cwd: local, stdio: "inherit" });
      execSync("npm link", { cwd: local, stdio: "inherit" });
      spinner.succeed(chalk.green("Local CLI rebuilt"));
      outro(chalk.green(`${bin} is ready (project files unchanged)`));
    } catch (e) {
      spinner.fail(chalk.red("Local rebuild failed"));
      log.error((e as Error).message);
      process.exit(1);
    }
    return;
  }

  const spinner = ora(`Updating ${cliPackageName()}…`).start();
  try {
    // Prefer updating the global install that provides this binary.
    // Falls back to npx cache refresh guidance if not global.
    const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
    const isLinked = existsSync(join(pkgRoot, "src", "index.ts"));

    if (isLinked) {
      spinner.info("This looks like a linked/dev install.");
      log.info(`From the monorepo: ${chalk.cyan("npm run try")}`);
      log.info(`Or publish path: ${chalk.cyan(`npm i -g ${cliPackageName()}@latest`)}`);
      outro(chalk.dim("No project files were changed"));
      return;
    }

    execSync(`npm install -g ${cliPackageName()}@latest`, { stdio: "inherit" });
    spinner.succeed(chalk.green("CLI updated"));
    console.log();
    log.success("Your apps, configs, and lockfiles were not modified.");
    log.info(`Run ${chalk.cyan(`${bin} --version`)} to confirm.`);
    outro(chalk.green("Done"));
  } catch (e) {
    spinner.fail(chalk.red("Update failed"));
    log.error((e as Error).message);
    log.info(`Try: ${chalk.cyan(`npm i -g ${cliPackageName()}@latest`)}`);
    process.exit(1);
  }
}
