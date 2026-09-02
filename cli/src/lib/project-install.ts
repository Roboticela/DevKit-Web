import { spawn } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import { log } from "./logger.js";

export type InstallSpinner = {
  start: (msg?: string) => unknown;
  stop: (msg?: string) => unknown;
  message?: ((msg?: string) => unknown) | { value?: string };
};

/** Windows needs *.cmd; never combine shell:true with an args array (DEP0190). */
function resolveBin(name: string): string {
  if (process.platform !== "win32") return name;
  if (name === "npm" || name === "npx" || name === "pnpm" || name === "yarn" || name === "bun") {
    return `${name}.cmd`;
  }
  return name;
}

function detectPm(cwd: string): { cmd: string; args: string[] } {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return { cmd: resolveBin("pnpm"), args: ["install"] };
  if (existsSync(join(cwd, "yarn.lock"))) return { cmd: resolveBin("yarn"), args: ["install"] };
  if (existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock"))) {
    return { cmd: resolveBin("bun"), args: ["install"] };
  }
  return { cmd: resolveBin("npm"), args: ["install", "--no-fund", "--no-audit"] };
}

function runSpawn(cwd: string, cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd,
      shell: false,
      stdio: "inherit",
      env: {
        ...process.env,
        // Keep npm quieter on warnings that look like failures
        npm_config_fund: "false",
        npm_config_audit: "false",
        npm_config_progress: "true",
      },
    });

    child.on("error", (err) => reject(err));
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} failed (exit ${code ?? 1})`));
    });
  });
}

/**
 * Install with live terminal output (no silent hang).
 * Spinner is paused while npm owns the TTY so progress is visible.
 */
export async function npmInstallWithProgress(
  cwd: string,
  label: string,
  s?: InstallSpinner
): Promise<void> {
  const { cmd, args } = detectPm(cwd);
  const started = Date.now();

  if (s) s.stop(chalk.dim(`${label}…`));
  console.log();
  log.info(`${label}`);
  log.step(`${cmd} ${args.join(" ")}`);
  log.step(chalk.dim(cwd));
  console.log();

  try {
    await runSpawn(cwd, cmd, args);
  } finally {
    const secs = Math.max(1, Math.round((Date.now() - started) / 1000));
    log.success(`${label} done ${chalk.dim(`(${secs}s)`)}`);
    if (s) s.start("Continuing…");
  }
}

export async function runCommandWithProgress(
  cwd: string,
  cmd: string,
  args: string[],
  label: string,
  s?: InstallSpinner
): Promise<void> {
  const started = Date.now();
  const bin = resolveBin(cmd);

  if (s) s.stop(chalk.dim(`${label}…`));
  console.log();
  log.info(label);
  log.step(`${bin} ${args.join(" ")}`);
  console.log();

  try {
    await runSpawn(cwd, bin, args);
  } finally {
    const secs = Math.max(1, Math.round((Date.now() - started) / 1000));
    log.success(`${label} done ${chalk.dim(`(${secs}s)`)}`);
    if (s) s.start("Continuing…");
  }
}

/**
 * Install all dependency trees for a scaffolded project.
 * Uses server-provided installTargets when available; otherwise detects server/package.json.
 */
export async function installProjectDependencies(
  projectRoot: string,
  template: string,
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
