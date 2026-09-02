import chalk from "chalk";
import { intro, outro } from "@clack/prompts";
import { readConfig } from "../lib/config.js";
import { readSession, isSessionValid } from "../lib/auth-store.js";
import { getProjectLicenseStatus } from "../lib/project.js";
import { checkApiHealth, getApiBaseUrl } from "../lib/api-client.js";
import { CLI_VERSION } from "../version.js";
import { cliBinName, isLocalTestMode } from "../lib/cli-meta.js";
import { log } from "../lib/logger.js";

/** Compact status: CLI + auth + license + API (no mutations). */
export async function statusCommand(cwd = process.cwd()) {
  const bin = cliBinName();
  intro(chalk.cyan("DevKit status"));

  const { bindSessionToProject } = await import("../lib/auth-store.js");
  bindSessionToProject(cwd);

  console.log();
  console.log(`  ${chalk.bold("CLI")}       v${CLI_VERSION}${isLocalTestMode() ? chalk.dim(" (local test)") : ""}`);
  console.log(`  ${chalk.bold("API")}       ${getApiBaseUrl()}`);

  const healthy = await checkApiHealth();
  console.log(`  ${chalk.bold("Reachable")} ${healthy ? chalk.green("yes") : chalk.red("no")}`);

  const session = readSession(cwd);
  if (isSessionValid(session)) {
    console.log(`  ${chalk.bold("Signed in")} ${chalk.green(session!.user.email)}`);
    console.log(
      `  ${chalk.bold("Session")}   ${session!.forever !== false ? chalk.green("never expires") : chalk.yellow("time-limited")}`
    );
    try {
      const config = readConfig(cwd);
      console.log(
        `  ${chalk.bold("Stored")}    ${config.account?.accessToken ? "devkit.config.json → account" : "machine only (~/.roboticela)"}`
      );
    } catch {
      console.log(`  ${chalk.bold("Stored")}    machine only (~/.roboticela)`);
    }
  } else {
    console.log(`  ${chalk.bold("Signed in")} ${chalk.yellow("no")}  ${chalk.dim(`→ ${bin} login`)}`);
  }

  try {
    const config = readConfig(cwd);
    console.log(`  ${chalk.bold("Project")}   ${config.site.name} (${config.template})`);
    if (config.project?.id) {
      const lic = await getProjectLicenseStatus(cwd);
      if (lic?.active) {
        console.log(`  ${chalk.bold("License")}   ${chalk.green("active")}`);
      } else {
        console.log(
          `  ${chalk.bold("License")}   ${chalk.yellow(lic?.status ?? "none")}  ${chalk.dim(`→ ${bin} activate`)}`
        );
      }
    } else {
      console.log(`  ${chalk.bold("License")}   ${chalk.dim("project not registered yet")}`);
    }
  } catch {
    console.log(`  ${chalk.bold("Project")}   ${chalk.dim("not a DevKit project (run init or create)")}`);
  }

  console.log();
  outro(chalk.dim(`${bin} doctor  ·  full diagnostics`));
}
