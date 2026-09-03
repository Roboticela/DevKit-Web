#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { createCommand } from "./commands/create.js";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { removeCommand } from "./commands/remove.js";
import { listCommand } from "./commands/list.js";
import { infoCommand } from "./commands/info.js";
import { syncCommand } from "./commands/sync.js";
import { selfUpdateCommand } from "./commands/self-update.js";
import { updatePackagesCommand } from "./commands/update-packages.js";
import { updateTemplateCommand } from "./commands/update-template.js";
import { doctorCommand } from "./commands/doctor.js";
import { statusCommand } from "./commands/status.js";
import { devCommand } from "./commands/dev.js";
import { authLoginCommand, authLogoutCommand } from "./commands/auth.js";
import { licenseStatusCommand, licensePurchaseCommand } from "./commands/license.js";
import { themeApplyCommand, themePresetCommand, themeListCommand, themePreviewCommand } from "./commands/theme.js";
import { CLI_VERSION } from "./version.js";
import { getApiBaseUrl } from "./lib/api-client.js";
import { cliBinName, isLocalTestMode } from "./lib/cli-meta.js";

const bin = cliBinName();
const isTest = isLocalTestMode();

const program = new Command();

program
  .name(bin)
  .description(isTest ? `Local test CLI (${getApiBaseUrl()})` : "Roboticela DevKit CLI")
  .version(CLI_VERSION, "-V, --version", "Print CLI version")
  .helpOption("-h, --help", "Show help")
  .configureHelp({
    sortSubcommands: false,
    showGlobalOptions: true,
  });

if (isTest) {
  console.log(
    chalk.dim(
      `${bin} · API ${getApiBaseUrl()} · package ${process.env.DEVKIT_LOCAL_PACKAGE ?? "local"}`
    )
  );
}

// ── Project ──────────────────────────────────────────────────────────────────

program
  .command("create [name]")
  .description("Scaffold a project from a live template (requires login)")
  .option("--template <id>", "Template id (supports id@version)")
  .option("--version <ver>", "Template version (overrides id@version)")
  .option("--preset <name>", "Theme id from the live catalog")
  .option("--primary <hex>", "Primary color (e.g. #0E7AFF)")
  .option("--git", "Initialize git (default)")
  .option("--no-git", "Skip git init")
  .option("--install", "Install dependencies (default)")
  .option("--no-install", "Skip dependency install")
  .option("--add <names>", "Comma-separated free components to add after create")
  .option("-y, --yes", "Non-interactive defaults")
  .action((name, opts) => createCommand(name, opts));

program
  .command("init")
  .description("Initialize DevKit in the current directory")
  .action(() => initCommand());

program
  .command("dev")
  .description("Run the project’s package.json dev script")
  .action(() => devCommand());

// ── Packages ─────────────────────────────────────────────────────────────────

program
  .command("add [names...]")
  .description("Install packages from the live catalog")
  .option("--type <kind>", "component | page | section | scaffold")
  .option("--variant <id>", "Variant id")
  .option("--version <ver>", "Install a specific catalog version (or use name@version)")
  .option("--dry-run", "Resolve only; do not install")
  .action((names, opts) => addCommand(names ?? [], opts));

program
  .command("remove <name>")
  .description("Remove an installed package from the lockfile")
  .option("--keep-files", "Unregister without deleting managed files")
  .action((name, opts) => removeCommand(name, opts));

program
  .command("list")
  .description("List catalog packages (or installed)")
  .option("--type <kind>", "component | page | section | scaffold")
  .option("--installed", "Installed in this project only")
  .option("--template <id>", "Filter by template id")
  .action((opts) =>
    listCommand({
      template: opts.template,
      installed: opts.installed,
      kind: opts.type,
      premium: opts.type && opts.type !== "component" ? true : undefined,
    })
  );

program
  .command("info <name>")
  .description("Show catalog metadata for a package")
  .action((name) => infoCommand(name));

program
  .command("sync")
  .description("Reinstall from devkit.lock.json")
  .option("-f, --force", "Overwrite managed files")
  .action((opts) => syncCommand({ force: opts.force === true }));

// ── Account & license ────────────────────────────────────────────────────────

program
  .command("login")
  .description("Authenticate (writes session to project config)")
  .action(() => authLoginCommand());

program
  .command("logout")
  .description("Clear the local session")
  .action(() => authLogoutCommand());

program
  .command("status")
  .description("Print CLI, session, license, and API status")
  .action(() => statusCommand());

program
  .command("activate")
  .description("Attach / purchase the project license")
  .action(() => licensePurchaseCommand());

program
  .command("license")
  .description("Print project license status")
  .action(() => licenseStatusCommand());

// ── Theme ────────────────────────────────────────────────────────────────────

const theme = program.command("theme").description("Theme tokens (list | preset | apply | preview)");
theme
  .command("list")
  .description("List themes from the catalog (+ current project)")
  .action(() => themeListCommand());
theme
  .command("preset <name>")
  .description("Apply a catalog theme id")
  .action((name) => themePresetCommand(name));
theme
  .command("apply")
  .description("Write managed theme CSS from config (uses catalog tokens)")
  .action(() => themeApplyCommand());
theme
  .command("preview [name]")
  .description("Open docs theme studio (devkit.roboticela.com/theme?theme=…)")
  .action((name) => themePreviewCommand(name));

// ── Diagnostics & updates ────────────────────────────────────────────────────

program
  .command("doctor")
  .description("Validate project, session, license, and API")
  .action(() => doctorCommand());

program
  .command("update [names...]")
  .description("Update packages, the CLI, or the project template only")
  .option("--all", "Update all installed packages")
  .option("--cli", "Update this CLI binary only")
  .option("--template", "Update scaffold/template files only (keeps packages & user edits)")
  .option("--check", "Report only (with --cli or --template); do not write")
  .option("-f, --force", "Overwrite managed / conflicted files")
  .option("--to <ver>", "Target version (packages or --template; default: latest)")
  .action(async (names: string[], opts) => {
    const wantCli = opts.cli === true;
    const wantTemplate = opts.template === true;
    const wantPackages = opts.all === true || (names?.length ?? 0) > 0;
    const modes = [wantCli, wantTemplate, wantPackages].filter(Boolean).length;

    if (modes > 1) {
      console.log(chalk.red("Use only one of: package names/--all, --cli, or --template."));
      process.exit(1);
    }

    if (wantTemplate) {
      return updateTemplateCommand({
        check: opts.check === true,
        force: opts.force === true,
        to: opts.to,
      });
    }

    if (wantCli || opts.check === true) {
      return selfUpdateCommand({ check: opts.check === true });
    }

    if (!wantPackages) {
      console.log(
        chalk.dim(
          `Tip: ${bin} update --all  ·  ${bin} update <name>  ·  ${bin} update --template  ·  ${bin} update --cli`
        )
      );
      return selfUpdateCommand({ check: false });
    }

    return updatePackagesCommand(names ?? [], {
      all: opts.all === true,
      force: opts.force === true,
      version: opts.to,
    });
  });

// Hidden aliases
program.command("auth", { hidden: true }).description("Alias").action(() => {
  console.log(chalk.dim(`Use: ${bin} login | ${bin} logout | ${bin} status`));
});
program
  .command("install", { hidden: true })
  .description("Alias for sync")
  .option("-f, --force", "Force")
  .action((opts) => syncCommand({ force: opts.force === true }));
program
  .command("upgrade [names...]", { hidden: true })
  .description("Alias of update")
  .option("--all", "Update all installed packages")
  .option("-f, --force", "Force")
  .option("--to <ver>", "Target version")
  .action((names: string[], opts) =>
    updatePackagesCommand(names ?? [], {
      all: opts.all === true || (names?.length ?? 0) === 0,
      force: opts.force === true,
      version: opts.to,
    })
  );

program.addHelpText(
  "after",
  `
${chalk.bold("Command options")}
  create [name]         Requires login (${bin} login)
    --template <id>     Template id (also id@version)
    --version <ver>     Template version (overrides id@version)
    --preset <name>     Theme id from the catalog
    --primary <hex>     Primary brand color (e.g. #0E7AFF)
    --git / --no-git    Initialize git (default: on)
    --install / --no-install
                        Install dependencies (default: on)
    --add <names>       Comma-separated free components after scaffold
    -y, --yes           Non-interactive defaults

  add [names...]
    --type <kind>       component | page | section | scaffold
    --variant <id>      Variant id when the package has variants
    --version <ver>     Catalog version (default: latest)
    --dry-run           Resolve only; do not install
                        Also: ${bin} add button@1.0.1

  remove <name>
    --keep-files        Unregister without deleting managed files

  list
    --type <kind>       component | page | section | scaffold
    --installed         Only packages in this project
    --template <id>     Filter catalog by template id

  sync
    -f, --force         Overwrite managed files (keeps lock versions)

  update [names...]
    --all               Update every installed package to latest (or --to)
    --template          Update scaffold files only (packages & user edits stay)
    --cli               Update this CLI binary only (not the project)
    --check             With --cli or --template: report only, do not write
    -f, --force         Overwrite managed / conflicted files
    --to <ver>          Target version (packages or --template; default: latest)

  theme
    list                Themes from the catalog + preview URLs
    preset <id>         Apply a catalog theme id
    apply               Write managed CSS (catalog tokens)
    preview [id]        Open docs theme studio (devkit.roboticela.com/theme)

${chalk.bold("Examples")}
  ${bin} login
  ${bin} create my-app --template nextjs-compact --preset bold -y --install
  ${bin} create my-app --template nextjs-compact@1.0.1 -y
  ${bin} create my-app --template nextjs-compact --version 1.0.1 -y
  ${bin} add button modal
  ${bin} add button@1.0.1
  ${bin} add dashboard-page --version 1.0.0 --type page
  ${bin} list --type component
  ${bin} list --installed
  ${bin} update button --to 1.0.1
  ${bin} update --all
  ${bin} update --template
  ${bin} update --template --to 1.0.1
  ${bin} update --template --check
  ${bin} update --cli --check
  ${bin} sync
  ${bin} theme list
  ${bin} theme preview bold
  ${bin} theme preset bold
  ${bin} status
  ${bin} doctor
`
);

program.parse();
