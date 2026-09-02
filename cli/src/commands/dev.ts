import { execSync, spawn } from "child_process";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import { readConfig } from "../lib/config.js";
import { detectAdapter } from "../lib/adapters/index.js";
import { log } from "../lib/logger.js";

function detectPackageManager(cwd: string): "npm" | "pnpm" | "yarn" | "bun" {
  if (existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock"))) return "bun";
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

function getDevScript(cwd: string, template: string): string {
  const pkgPath = join(cwd, "package.json");
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as { scripts?: Record<string, string> };
    if (pkg.scripts?.dev) return "dev";
  }
  return template === "vite-express-tauri" ? "dev" : "dev";
}

export async function devCommand(cwd = process.cwd()) {
  log.header("DevKit Dev");

  const config = readConfig(cwd);
  const adapter = detectAdapter(cwd) ?? null;

  if (adapter) {
    log.success(`Template: ${adapter.label}`);
  } else {
    log.warn(`Template from config: ${config.template}`);
  }

  const pm = detectPackageManager(cwd);
  log.info(`Package manager: ${chalk.cyan(pm)}`);

  const script = getDevScript(cwd, config.template);
  log.step(`Starting ${chalk.cyan(`${pm} run ${script}`)}…`);
  log.blank();

  const cmd = pm === "yarn" ? "yarn" : pm;
  const args = pm === "yarn" ? [script] : ["run", script];

  const child = spawn(cmd, args, { cwd, stdio: "inherit", shell: process.platform === "win32" });

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}
