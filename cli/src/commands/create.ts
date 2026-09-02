import { intro, outro, text, select, multiselect, confirm, spinner } from "@clack/prompts";
import chalk from "chalk";
import { execSync } from "child_process";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { downloadTemplate, listTemplates } from "../lib/template.js";
import { writeConfig, writeLock, defaultConfig } from "../lib/config.js";
import { generateThemeCSS } from "../lib/theme.js";
import { installComponent } from "../lib/installer.js";
import { installProjectDependencies } from "../lib/project-install.js";
import { log } from "../lib/logger.js";
import { listComponents, type PackageKind } from "../lib/registry.js";
import { isPremiumAssetId } from "../lib/premium-guard.js";
import { cliBinName } from "../lib/cli-meta.js";
import { isSessionValid, readSession } from "../lib/auth-store.js";
import { getApiBaseUrl } from "../lib/api-client.js";
import { CLI_VERSION } from "../version.js";
import { listThemes } from "../lib/themes.js";

interface CreateOptions {
  template?: string;
  preset?: string;
  primary?: string;
  git?: boolean;
  install?: boolean;
  add?: string;
  yes?: boolean;
}

interface CreatePickerOption {
  value: string;
  label: string;
  hint?: string;
}

async function getCreatePickerOptions(template: string, kind?: PackageKind): Promise<CreatePickerOption[]> {
  const entries = await listComponents({ template, kind });
  return entries
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => ({
      value: entry.name,
      label: entry.name,
      hint: entry.description.length > 52 ? `${entry.description.slice(0, 49)}…` : entry.description,
    }));
}

export async function createCommand(projectName: string | undefined, opts: CreateOptions) {
  console.log();
  const inner = 53;
  const verCentered = (() => {
    const s = `v${CLI_VERSION}`;
    const pad = inner - s.length;
    const left = Math.floor(pad / 2);
    return " ".repeat(left) + s + " ".repeat(pad - left);
  })();
  console.log(chalk.bold.white("  ┌─────────────────────────────────────────────────────┐"));
  console.log(chalk.bold.white("  │      Roboticela DevKit — Create New Project         │"));
  console.log(chalk.bold.white(`  │${verCentered}│`));
  console.log(chalk.bold.white("  └─────────────────────────────────────────────────────┘"));
  console.log();

  intro(chalk.cyan("Let's scaffold your project"));

  // ── Collect answers ──────────────────────────────────────────────────────

  const name = projectName ?? (opts.yes ? "my-app" : await text({
    message: "Project name",
    placeholder: "my-app",
    validate: (v) => v.length < 1 ? "Name is required" : undefined,
  }) as string);

  if (!name || typeof name !== "string") { process.exit(0); }

  log.info(`API: ${chalk.dim(getApiBaseUrl())}`);

  let templateOptions: { value: string; label: string; hint?: string }[] = [];
  try {
    const remote = await listTemplates();
    templateOptions = remote.map((t) => ({
      value: t.id,
      label: t.label,
      hint: t.version ? `v${t.version}${t.hint ? ` · ${t.hint}` : ""}` : t.hint,
    }));
  } catch (e) {
    log.error(`Could not load templates from server: ${(e as Error).message}`);
    log.info("Start the DevKit API (npm run try) or set DEVKIT_API_URL if you use a custom endpoint.");
    process.exit(1);
  }
  if (templateOptions.length === 0) {
    log.error("Server returned no templates.");
    process.exit(1);
  }

  const template = (opts.template ?? (opts.yes ? templateOptions[0]!.value : await select({
    message: "Select a template (from server)",
    options: templateOptions,
  }))) as string;

  if (!templateOptions.some((t) => t.value === template)) {
    log.error(`Unknown template '${template}'. Available: ${templateOptions.map((t) => t.value).join(", ")}`);
    process.exit(1);
  }

  const siteName = opts.yes ? name : await text({
    message: "Site display name",
    initialValue: name,
  }) as string;

  const siteUrl = opts.yes ? `https://${name}.com` : await text({
    message: "Site URL",
    placeholder: "https://myapp.com",
  }) as string;

  let remoteThemes: Awaited<ReturnType<typeof listThemes>> = [];
  try {
    remoteThemes = await listThemes();
  } catch (e) {
    log.error(`Could not load themes from server: ${(e as Error).message}`);
    process.exit(1);
  }
  const themeOptions = remoteThemes.map((t) => ({
    value: t.id,
    label: t.label,
    hint: t.hint,
  }));
  const defaultThemeId = themeOptions[0]?.value ?? "default";

  const preset = (opts.preset ?? (opts.yes ? defaultThemeId : await select({
    message: "Theme preset (from server — preview on devkit.roboticela.com/theme)",
    options: themeOptions,
  }))) as string;

  if (!themeOptions.some((t) => t.value === preset)) {
    log.error(`Unknown theme '${preset}'. Available: ${themeOptions.map((t) => t.value).join(", ")}`);
    process.exit(1);
  }
  const selectedTheme = remoteThemes.find((t) => t.id === preset)!;
  log.info(`Theme preview: ${chalk.cyan(selectedTheme.previewUrl)}`);

  const primaryColor = opts.primary ?? (opts.yes ? undefined : await text({
    message: "Primary brand color (hex, leave blank to use preset)",
    placeholder: "(leave blank for preset default)",
    validate: (v) => v && !/^#[0-9a-fA-F]{6}$/.test(v) ? "Enter a valid hex like #0071e3 or leave blank" : undefined,
  }) as string | undefined);

  const doGit = opts.git ?? (opts.yes ? true : await confirm({ message: "Initialize a git repository?" }) as boolean);
  const doInstall = opts.install ?? (opts.yes ? true : await confirm({ message: "Install npm dependencies now?" }) as boolean);

  let selectedComponents: string[] = [];
  if (opts.add) {
    selectedComponents = opts.add.split(",").map((s) => s.trim()).filter(Boolean);
  } else if (!opts.yes) {
    if (!isSessionValid(readSession())) {
      log.info(`Sign in to pick packages now, or add later: ${cliBinName()} login && ${cliBinName()} add`);
    } else {
      try {
        const kinds: { kind: PackageKind; label: string }[] = [{ kind: "component", label: "components" }];

        const selected: string[] = [];
        for (const { kind, label } of kinds) {
          const options = await getCreatePickerOptions(template, kind);
          if (options.length === 0) {
            log.warn(`No ${label} available for this template.`);
            continue;
          }
          const picked = await multiselect({
            message: `Add ${label} now? (space to select, enter to confirm)`,
            options,
            required: false,
          }) as string[];
          selected.push(...picked);
        }

        const seen = new Set<string>();
        selectedComponents = selected.filter((n) => {
          if (seen.has(n)) return false;
          seen.add(n);
          return true;
        });
        if (selectedComponents.length === 0) {
          log.info("No packages selected — you can always run 'devkit add' later.");
        }
      } catch (e) {
        log.warn(`Could not load server catalog for picker: ${(e as Error).message}`);
      }
    }
  }

  // ── Build ────────────────────────────────────────────────────────────────

  console.log();
  log.header("Creating project…");

  const destDir = join(process.cwd(), name);
  if (existsSync(destDir)) {
    log.error(`Directory '${name}' already exists.`);
    process.exit(1);
  }
  mkdirSync(destDir, { recursive: true });

  // 1. Download template (name + files from server)
  const s = spinner();
  s.start(`Fetching template: ${chalk.cyan(template)}`);
  let downloaded: Awaited<ReturnType<typeof downloadTemplate>>;
  try {
    downloaded = await downloadTemplate(template, destDir, {
      projectName: name,
      siteName: siteName as string,
      siteUrl: siteUrl as string,
    });
    s.stop(chalk.green(`✓  Template fetched: ${downloaded.label} @${downloaded.version}`));
    if (downloaded.hint) log.step(downloaded.hint);
  } catch (e) {
    s.stop(chalk.red(`✗  Failed to fetch template`));
    log.error((e as Error).message);
    process.exit(1);
  }

  // Point @roboticela/devkit at local monorepo package when using devkit-test
  const { getLocalDevKitPackagePath } = await import("../lib/module-installer.js");
  const localPkg = getLocalDevKitPackagePath();
  if (localPkg) {
    const pkgPath = join(destDir, "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as {
      dependencies?: Record<string, string>;
    };
    pkg.dependencies = pkg.dependencies ?? {};
    pkg.dependencies["@roboticela/devkit"] = `file:${localPkg.replace(/\\/g, "/")}`;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    log.success("Linked @roboticela/devkit → local monorepo package");
  }

  // 2. Write devkit.config.json
  const config = defaultConfig(template, siteName as string, siteUrl as string, downloaded.version);
  config.theme!.preset = preset as string;
  config.theme!.radius = selectedTheme.radius;
  config.theme!.colors = {
    primary: primaryColor || selectedTheme.primary,
    secondary: selectedTheme.secondary,
  };
  if (primaryColor) config.theme!.colors.primary = primaryColor;
  writeConfig(config, destDir);
  log.success("Created devkit.config.json");

  // 3. Write devkit.lock.json
  writeLock({ lockVersion: 1, template, components: {} }, destDir);
  log.success("Created devkit.lock.json");

  // 4. Generate theme CSS
  const { resolveThemeCssPath } = await import("../lib/theme-path.js");
  const themeCss = generateThemeCSS(config, {
    primary: selectedTheme.primary,
    secondary: selectedTheme.secondary,
    radius: selectedTheme.radius,
  });
  const cssPath = resolveThemeCssPath(destDir, downloaded.cssPath);

  if (existsSync(cssPath)) {
    const existing = readFileSync(cssPath, "utf-8");
    const withoutOldBlock = existing.replace(
      /\/\* ── DevKit Managed Theme Block[\s\S]*?── End DevKit Managed Theme Block ── \*\//,
      ""
    ).trimStart();
    writeFileSync(cssPath, themeCss + withoutOldBlock);
  } else {
    mkdirSync(dirname(cssPath), { recursive: true });
    writeFileSync(cssPath, themeCss);
  }
  log.success(`Applied theme preset: ${preset}`);

  // 5. npm install (live npm output — never a silent spinner)
  const installTargets = downloaded.installTargets ?? ["root"];
  if (doInstall) {
    log.blank();
    log.info(
      installTargets.includes("server")
        ? "Next: install app + server dependencies (npm output appears below)…"
        : "Next: install dependencies (npm output appears below)…"
    );
    try {
      const result = await installProjectDependencies(destDir, template, s, installTargets);
      const parts = result.steps.join(" + ");
      log.success(`All dependency installs finished (${parts})`);
    } catch (e) {
      log.warn(`npm install failed — ${(e as Error).message}`);
      log.warn("You can finish manually:");
      log.step(`cd ${name} && npm install`);
      if (installTargets.includes("server")) {
        log.step(`cd ${name}/server && npm install`);
      }
    }
  } else {
    log.info("Skipped npm install (--no-install). Later run:");
    log.step(`cd ${name} && npm install`);
    if (installTargets.includes("server")) {
      log.step(`cd ${name}/server && npm install`);
    }
  }

  // 6. git init
  if (doGit) {
    s.start("Initializing git repository…");
    try {
      execSync("git init", { cwd: destDir, stdio: "pipe" });
      execSync('git add . && git commit -m "chore: init project with DevKit"', {
        cwd: destDir,
        stdio: "pipe",
      });
      s.stop(chalk.green("✓  Git repository ready"));
    } catch {
      s.stop(chalk.yellow("⚠  git init failed — git may not be installed"));
    }
  }

  // Register project identity + bind forever session if already logged in
  const { ensureProjectIdentity } = await import("../lib/project.js");
  const { bindSessionToProject } = await import("../lib/auth-store.js");
  ensureProjectIdentity(destDir);
  bindSessionToProject(destDir);

  // 7. Add selected components (login required)
  if (selectedComponents.length > 0) {
    if (!isSessionValid(readSession(destDir))) {
      log.warn(`Skipped package install — sign in first: ${cliBinName()} login`);
      log.info(`Then: ${cliBinName()} add ${selectedComponents.join(" ")}`);
    } else {
      for (const comp of selectedComponents) {
        s.start(`Adding component: ${chalk.cyan(comp)}`);
        try {
          if (isPremiumAssetId(comp)) {
            s.stop(chalk.yellow(`⚠  Skipped ${comp}: use ${cliBinName()} add after activate`));
            continue;
          }
          await installComponent(comp, template, "latest", undefined, destDir);
          s.stop(chalk.green(`✓  Added: ${comp}`));
        } catch (e) {
          s.stop(chalk.yellow(`⚠  Skipped ${comp}: ${(e as Error).message}`));
        }
      }
    }
  } else {
    // no packages selected at create time
  }

  // ── Done ─────────────────────────────────────────────────────────────────

  console.log();
  outro(chalk.green("Project ready!"));
  console.log();
  console.log(`  ${chalk.bold("Location")}    ${name}/`);
  console.log(`  ${chalk.bold("Template")}    ${template}`);
  console.log(`  ${chalk.bold("Theme")}       ${preset}`);
  if (selectedComponents.length > 0) {
    console.log(`  ${chalk.bold("Components")}  ${selectedComponents.join(", ")}`);
  }
  const cli = cliBinName();
  const loggedIn = isSessionValid(readSession(destDir));
  console.log();
  console.log(chalk.bold("  Next steps:"));
  console.log(`    ${chalk.cyan("cd")} ${name}`);
  console.log(`    ${chalk.cyan("cp")} .env.example .env    ${chalk.gray("# Fill in your secrets")}`);
  if (!loggedIn) {
    console.log(`    ${chalk.cyan(`${cli} login`)}             ${chalk.gray("# Required before add (session never expires)")}`);
  }
  console.log(`    ${chalk.cyan(`${cli} add button`)}         ${chalk.gray("# Free component (requires login)")}`);
  console.log(`    ${chalk.cyan(`${cli} activate`)}          ${chalk.gray("# Unlock premium")}`);
  console.log(`    ${chalk.cyan(`${cli} doctor`)}            ${chalk.gray("# Health check")}`);
  console.log(`    ${chalk.cyan(`${cli} dev`)}               ${chalk.gray("# Start the app")}`);
  console.log();
}
