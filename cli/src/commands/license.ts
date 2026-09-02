import chalk from "chalk";
import { intro, outro } from "@clack/prompts";
import { readConfig } from "../lib/config.js";
import { getProjectLicenseStatus, registerProjectWithServer } from "../lib/project.js";
import { apiFetch } from "../lib/api-client.js";
import { readSession, isSessionValid } from "../lib/auth-store.js";
import { log } from "../lib/logger.js";

export async function licenseStatusCommand(cwd = process.cwd()) {
  intro(chalk.cyan("Project license"));

  const session = readSession();
  if (!isSessionValid(session)) {
    log.error("Not signed in. Run 'devkit auth login'.");
    process.exit(1);
  }

  const config = readConfig(cwd);
  if (!config.project?.id) {
    log.info("Project not registered with DevKit server yet.");
    const id = await registerProjectWithServer(cwd);
    if (!id) process.exit(1);
  }

  const status = await getProjectLicenseStatus(cwd);
  if (!status) {
    log.error("Could not fetch license status.");
    process.exit(1);
  }

  console.log();
  console.log(`  ${chalk.bold("Project")}     ${config.site.name}`);
  console.log(`  ${chalk.bold("Project ID")}   ${config.project?.id}`);
  console.log(`  ${chalk.bold("Status")}       ${status.active ? chalk.green("Active") : chalk.yellow(status.status)}`);
  console.log(`  ${chalk.bold("Price")}        $50 one-time per project`);
  console.log();

  if (!status.active) {
    log.info("Purchase: devkit license purchase");
  }

  outro(status.active ? chalk.green("Premium access enabled.") : chalk.yellow("No active license."));
}

export async function licensePurchaseCommand(cwd = process.cwd()) {
  const session = readSession();
  if (!isSessionValid(session)) {
    log.error("Not signed in. Run 'devkit auth login'.");
    process.exit(1);
  }

  const config = readConfig(cwd);
  if (!config.project?.id) {
    await registerProjectWithServer(cwd);
  }

  const projectId = readConfig(cwd).project?.id;
  if (!projectId) {
    log.error("Project registration failed.");
    process.exit(1);
  }

  intro(chalk.cyan("Purchase project license"));

  const res = await apiFetch<{ checkoutUrl?: string; devMode?: boolean; message?: string }>(
    `/licenses/${projectId}/checkout`,
    {
      method: "POST",
      token: session!.accessToken,
      apiUrl: session!.apiUrl,
    }
  );

  if (res.devMode) {
    outro(chalk.green(res.message ?? "License activated (development mode)."));
    return;
  }

  if (res.checkoutUrl) {
    console.log();
    console.log(chalk.bold("  Complete payment:"));
    console.log(`  ${chalk.cyan(res.checkoutUrl)}`);
    console.log();
    outro("After payment, run 'devkit license status' to confirm.");
  }
}
