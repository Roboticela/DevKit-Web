import { existsSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import { log } from "./logger.js";
import { detectPackageManager, runCommand } from "./run-command.js";

export type InstallSpinner = {
  start: (msg?: string) => unknown;
  stop: (msg?: string) => unknown;
  message?: ((msg?: string) => unknown) | { value?: string };
};

const installEnv: NodeJS.ProcessEnv = {
  ...process.env,
  npm_config_fund: "false",
  npm_config_audit: "false",
  npm_config_progress: "true",
};

/**
 * Install with live terminal output (no silent hang).
 * Spinner is paused while the package manager owns the TTY.
 */
export async function npmInstallWithProgress(
  cwd: string,
  label: string,
  s?: InstallSpinner
): Promise<void> {
  const { cmd, args } = detectPackageManager(cwd);
  const started = Date.now();

  if (s) s.stop(chalk.dim(`${label}…`));
  console.log();
  log.info(`${label}`);
  log.step(`${cmd} ${args.join(" ")}`);
  log.step(chalk.dim(cwd));
  console.log();

  await runCommand(cmd, args, { cwd, env: installEnv, stdio: "inherit" });
  const secs = Math.max(1, Math.round((Date.now() - started) / 1000));
  log.success(`${label} done ${chalk.dim(`(${secs}s)`)}`);
}

export async function runCommandWithProgress(
  cwd: string,
  cmd: string,
  args: string[],
  label: string,
  s?: InstallSpinner
): Promise<void> {
  const started = Date.now();

  if (s) s.stop(chalk.dim(`${label}…`));
  console.log();
  log.info(label);
  log.step(`${cmd} ${args.join(" ")}`);
  console.log();

  await runCommand(cmd, args, { cwd, env: installEnv, stdio: "inherit" });
  const secs = Math.max(1, Math.round((Date.now() - started) / 1000));
  log.success(`${label} done ${chalk.dim(`(${secs}s)`)}`);
}

/**
 * Install all dependency trees for a scaffolded project.
 * Uses server-provided installTargets when available; otherwise detects server/package.json.
 */
export async function installProjectDependencies(
  projectRoot: string,
  _template: string,
  s?: InstallSpinner,
  installTargets?: Array<"root" | "server">
): Promise<{ ok: boolean; steps: string[] }> {
  const steps: string[] = [];
  const serverPkg = join(projectRoot, "server", "package.json");
  const targets: Array<"root" | "server"> =
    installTargets && installTargets.length > 0
      ? installTargets
      : existsSync(serverPkg)
        ? ["root", "server"]
        : ["root"];

  if (targets.includes("root")) {
    const rootLabel =
      targets.includes("server") ? "Installing app dependencies" : "Installing project dependencies";
    await npmInstallWithProgress(projectRoot, rootLabel, s);
    steps.push("app");
  }

  if (targets.includes("server") && existsSync(serverPkg)) {
    await npmInstallWithProgress(join(projectRoot, "server"), "Installing server dependencies", s);
    steps.push("server");
  }

  const prismaSchema = join(projectRoot, "prisma", "schema.prisma");
  if (existsSync(prismaSchema)) {
    try {
      await runCommandWithProgress(
        projectRoot,
        "npx",
        ["prisma", "generate"],
        "Generating Prisma client",
        s
      );
      steps.push("prisma");
    } catch (e) {
      log.warn(`Prisma generate skipped: ${(e as Error).message}`);
    }
  }

  return { ok: true, steps };
}
