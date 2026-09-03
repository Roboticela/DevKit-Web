import { existsSync, readFileSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import { readConfig } from "../lib/config.js";
import { detectAdapter } from "../lib/adapters/index.js";
import { log } from "../lib/logger.js";
import { detectPackageManager, runCommand } from "../lib/run-command.js";

function getDevScript(cwd: string): string {
  const pkgPath = join(cwd, "package.json");
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as { scripts?: Record<string, string> };
    if (pkg.scripts?.dev) return "dev";
  }
  return "dev";
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

  const { cmd: pm } = detectPackageManager(cwd);
  log.info(`Package manager: ${chalk.cyan(pm)}`);

  const script = getDevScript(cwd);
  const args = pm === "yarn" ? [script] : ["run", script];
  log.step(`Starting ${chalk.cyan(`${pm} ${args.join(" ")}`)}…`);
  log.blank();

  try {
    await runCommand(pm, args, { cwd, stdio: "inherit" });
  } catch (e) {
    const msg = (e as Error).message;
    const codeMatch = msg.match(/exit (\d+)/);
    process.exit(codeMatch ? Number(codeMatch[1]) : 1);
  }
}
