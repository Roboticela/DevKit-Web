#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { createCommand } from "./commands/create.js";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { removeCommand } from "./commands/remove.js";
import { listCommand } from "./commands/list.js";
import { infoCommand } from "./commands/info.js";
import { updateCommand, upgradeAllCommand } from "./commands/update.js";
import { doctorCommand } from "./commands/doctor.js";
import { ejectCommand } from "./commands/eject.js";
import { devCommand } from "./commands/dev.js";
import { authLoginCommand, authLogoutCommand, authStatusCommand } from "./commands/auth.js";
import { licenseStatusCommand, licensePurchaseCommand } from "./commands/license.js";
import { premiumAddCommand } from "./lib/premium-installer.js";
import {
  themeApplyCommand, themePreviewCommand, themePresetCommand,
  themeSetCommand, themeListCommand, themeAuditCommand,
} from "./commands/theme.js";
import { CLI_VERSION } from "./version.js";
import { getApiBaseUrl } from "./lib/api-client.js";

const program = new Command();

program
  .name("devkit")
  .description("Roboticela DevKit — scaffold and extend full-stack projects")
  .version(CLI_VERSION);

program
  .command("create [name]")
  .description("Create a new project from a first-party DevKit template")
  .option("--template <id>", "Template ID (nextjs-compact | vite-express-tauri)")
  .option("--preset <name>", "Theme preset (default | minimal | bold | playful | corporate)")
  .option("--primary <hex>", "Primary brand color override (e.g. #e11d48)")
  .option("--git", "Initialize git repository")
  .option("--no-git", "Skip git initialization")
  .option("--install", "Run npm install after scaffolding")
  .option("--no-install", "Skip npm install")
  .option("--add <components>", "Comma-separated components to add immediately")
  .option("-y, --yes", "Accept all defaults, skip prompts")
  .action((name, opts) => createCommand(name, opts));

program.command("init").description("Initialize DevKit in an existing project").action(() => initCommand());

program
  .command("add [components...]")
  .description("Install components from @roboticela/devkit module (import only, no source copy)")
  .option("--variant <id>", "Variant for components with variants")
  .option("--dry-run", "Preview without writing files")
  .action((names, opts) => addCommand(names ?? [], opts));

program
  .command("remove <name>")
  .description("Uninstall a component and its managed files")
  .option("--keep-files", "Remove from DevKit tracking but keep the files")
  .action((name, opts) => removeCommand(name, opts));

program
  .command("list")
  .description("List available packages (bundled + server catalog)")
  .option("--template <id>", "Filter by template")
  .option("--kind <type>", "Filter by kind: component | page | section | scaffold")
  .option("--category <cat>", "Filter by category")
  .option("--group <id>", "Filter by group id")
  .option("--installed", "Show only installed packages")
  .option("--premium", "Show only premium (server) assets")
  .action((opts) => listCommand(opts));

program.command("info <name>").description("Show details about a package").action((name) => infoCommand(name));

program
  .command("update [component]")
  .description("Update a component (or all with --all)")
  .option("--all", "Update all installed components")
  .option("-f, --force", "Overwrite user-modified managed files")
  .action((comp, opts) => {
    const installOpts = { force: opts.force === true };
    if (opts.all || !comp) return upgradeAllCommand(installOpts);
    return updateCommand(comp, installOpts);
  });

program
  .command("upgrade")
  .description("Upgrade all installed components")
  .option("-f, --force", "Overwrite user-modified managed files")
  .action((opts) => upgradeAllCommand({ force: opts.force === true }));

program.command("doctor").description("Check project, auth, license, and API connectivity").action(() => doctorCommand());

program.command("dev").description("Start the project dev server").action(() => devCommand());

const auth = program.command("auth").description("Roboticela account authentication");
auth.command("login").description("Sign in via device authorization flow").action(() => authLoginCommand());
auth.command("logout").description("Sign out and clear local session").action(() => authLogoutCommand());
auth.command("status").description("Show authentication status").action(() => authStatusCommand());

const license = program.command("license").description("Project licensing ($50 one-time per project)");
license.command("status").description("Show license status for this project").action(() => licenseStatusCommand());
license.command("purchase").description("Purchase or activate project license").action(() => licensePurchaseCommand());

function premiumCmd(kind: "page" | "section" | "scaffold", label: string) {
  const cmd = program.command(kind).description(`Install premium ${label} from DevKit server`);
  cmd
    .command("add [names...]")
    .description(`Add premium ${label}(s) — requires active project license`)
    .action((names: string[]) => premiumAddCommand(names, kind));
  cmd.command("list").description(`List premium ${label}s from server catalog`).action(async () => {
    const { listServerAssets } = await import("./lib/premium-assets.js");
    const { readConfig } = await import("./lib/config.js");
    const { log } = await import("./lib/logger.js");
    try {
      const config = readConfig();
      const type = kind === "section" ? "section" : kind;
      const assets = await listServerAssets({ type, template: config.template, tier: "premium" });
      if (assets.length === 0) { log.info(`No premium ${label}s found. Sign in with 'devkit auth login'.`); return; }
      log.blank();
      for (const a of assets) {
        console.log(`  ${chalk.cyan(a.id)}  ${chalk.dim(a.description.slice(0, 60))}`);
      }
      log.blank();
    } catch (e) {
      log.error((e as Error).message);
    }
  });
}

premiumCmd("page", "page");
premiumCmd("section", "section");
premiumCmd("scaffold", "scaffold");

program.command("component").description("Alias for free component commands").action(() => {
  console.log(chalk.dim("Use devkit add <name> for free components."));
});

const theme = program.command("theme").description("Manage the global design token system");
theme.command("apply").description("Regenerate theme CSS from devkit.config.json").action(() => themeApplyCommand());
theme.command("preview").description("Preview generated CSS").action(() => themePreviewCommand());
theme.command("preset <name>").description("Switch theme preset").action((name) => themePresetCommand(name));
theme.command("set <key> <value>").description("Set a theme token").action((key, value) => themeSetCommand(key, value));
theme.command("list").description("List theme settings").action(() => themeListCommand());
theme.command("audit").description("Scan for hardcoded colors").action(() => themeAuditCommand());

program
  .command("install")
  .description("Install all components from devkit.lock.json (CI)")
  .option("-f, --force", "Overwrite user-modified files")
  .action(async (opts) => {
    const { readLock, readConfig } = await import("./lib/config.js");
    const { installComponent } = await import("./lib/installer.js");
    const { log } = await import("./lib/logger.js");
    const force = opts.force === true;
    const lock = readLock();
    const config = readConfig();
    for (const [name, entry] of Object.entries(lock.components)) {
      const s = (await import("ora")).default(`Installing ${name}…`).start();
      try {
        if (entry.resolved?.startsWith("server-package:")) {
          const { installPremiumAsset } = await import("./lib/premium-installer.js");
          await installPremiumAsset(name, "page", process.cwd(), { force });
        } else if (entry.resolved?.startsWith("module:")) {
          await installComponent(name, config.template, entry.version, entry.variant ?? undefined, process.cwd(), { force });
        } else {
          await installComponent(name, config.template, entry.version, entry.variant ?? undefined, process.cwd(), { force });
        }
        s.succeed(`${name}@${entry.version}`);
      } catch (e) {
        s.fail(`${name}: ${(e as Error).message}`);
      }
    }
    log.success("All packages installed.");
  });

program.command("eject [name]").description("Stop DevKit from tracking component(s)").action((name) => ejectCommand(name));

program.addHelpText("after", `
${chalk.bold("Examples:")}
  ${chalk.cyan("devkit create my-app")}                    Create project (first-party templates)
  ${chalk.cyan("devkit auth login")}                       Sign in to DevKit server
  ${chalk.cyan("devkit add button")}                       Free component (bundled)
  ${chalk.cyan("devkit page add dashboard-page")}          Premium page (requires license)
  ${chalk.cyan("devkit license purchase")}                 $50 one-time project license
  ${chalk.cyan("devkit dev")}                              Start dev server
  ${chalk.cyan("devkit doctor")}                           Check configuration

${chalk.dim("API:")} ${getApiBaseUrl()} ${chalk.dim("(set DEVKIT_API_URL to override)")}
${chalk.dim("Free components:")} bundled in @roboticela/devkit
${chalk.dim("Premium assets:")} served from DevKit API after authorization
`);

program.parse();
