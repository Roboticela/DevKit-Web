import { writeFileSync, readFileSync, existsSync } from "fs";
import chalk from "chalk";
import { execSync } from "child_process";
import { readConfig, writeConfig } from "../lib/config.js";
import { generateThemeCSS } from "../lib/theme.js";
import { resolveThemeCssPath } from "../lib/theme-path.js";
import {
  getTheme,
  listThemes,
  themePreviewApiUrl,
  themeStudioUrl,
  type RemoteTheme,
} from "../lib/themes.js";
import { log } from "../lib/logger.js";

function getCssPath(cwd: string): string {
  return resolveThemeCssPath(cwd);
}

function patchCss(cssPath: string, newBlock: string): void {
  const existing = existsSync(cssPath) ? readFileSync(cssPath, "utf-8") : "";
  const userSection = existing
    .replace(/\/\* ── DevKit Managed Theme Block[\s\S]*?── End DevKit Managed Theme Block ── \*\//, "")
    .trimStart();
  writeFileSync(cssPath, newBlock + userSection);
}

async function loadPresetTokens(presetId: string): Promise<RemoteTheme | null> {
  try {
    return await getTheme(presetId);
  } catch {
    return null;
  }
}

export async function themeApplyCommand(cwd = process.cwd()) {
  const config = readConfig(cwd);
  const remote = config.theme?.preset ? await loadPresetTokens(config.theme.preset) : null;
  const css = generateThemeCSS(
    config,
    remote
      ? { primary: remote.primary, secondary: remote.secondary, radius: remote.radius }
      : null
  );
  patchCss(getCssPath(cwd), css);
  log.success("Theme applied to CSS.");
  if (config.theme?.preset) {
    log.info(`Preview: ${chalk.cyan(themeStudioUrl(config.theme.preset))}`);
  }
}

export async function themePreviewCommand(themeId?: string, cwd = process.cwd()) {
  const config = (() => {
    try {
      return readConfig(cwd);
    } catch {
      return null;
    }
  })();

  const id = themeId || config?.theme?.preset || "default";

  let previewUrl: string;
  try {
    const theme = await getTheme(id);
    previewUrl = theme.previewUrl || themeStudioUrl(id);
    log.blank();
    console.log(`  ${chalk.bold(theme.label)}  ${chalk.dim(theme.hint)}`);
    console.log(`  ${chalk.bold("Primary")}   ${chalk.hex(theme.primary)(theme.primary)}`);
    console.log(`  ${chalk.bold("Preview")}   ${chalk.cyan(previewUrl)}`);
    console.log(`  ${chalk.bold("Redirect")}  ${chalk.dim(themePreviewApiUrl(id))}`);
    log.blank();
  } catch (e) {
    previewUrl = themeStudioUrl(id);
    log.warn(`Could not load theme from server: ${(e as Error).message}`);
    log.info(`Opening studio: ${chalk.cyan(previewUrl)}`);
  }

  try {
    const cmd =
      process.platform === "win32"
        ? `start "" "${previewUrl}"`
        : process.platform === "darwin"
          ? `open "${previewUrl}"`
          : `xdg-open "${previewUrl}"`;
    execSync(cmd, { stdio: "ignore" });
    log.success("Opened theme studio in your browser.");
  } catch {
    log.info(`Open manually: ${chalk.cyan(previewUrl)}`);
  }
}

export async function themePresetCommand(preset: string, cwd = process.cwd()) {
  let remote: RemoteTheme;
  try {
    remote = await getTheme(preset);
  } catch (e) {
    log.error(`Unknown theme '${preset}' on server: ${(e as Error).message}`);
    try {
      const all = await listThemes();
      log.info(`Available: ${all.map((t) => t.id).join(", ")}`);
      log.info(`Browse: ${chalk.cyan(themeStudioUrl())}`);
    } catch {
      /* ignore */
    }
    process.exit(1);
  }

  const config = readConfig(cwd);
  config.theme = {
    ...config.theme,
    preset: remote.id,
    colors: {
      ...config.theme?.colors,
      primary: config.theme?.colors?.primary ?? remote.primary,
      secondary: config.theme?.colors?.secondary ?? remote.secondary,
    },
    radius: config.theme?.radius ?? remote.radius,
  };
  writeConfig(config, cwd);
  await themeApplyCommand(cwd);
  log.success(`Switched to preset: ${remote.id}`);
  log.info(`Try it: ${chalk.cyan(remote.previewUrl)}`);
}

export async function themeSetCommand(key: string, value: string, cwd = process.cwd()) {
  const config = readConfig(cwd);
  if (key === "colors.primary") config.theme!.colors = { ...config.theme!.colors, primary: value };
  else if (key === "colors.secondary")
    config.theme!.colors = { ...config.theme!.colors, secondary: value };
  else if (key === "fonts.sans") config.theme!.fonts = { ...config.theme!.fonts, sans: value };
  else if (key === "fonts.mono") config.theme!.fonts = { ...config.theme!.fonts, mono: value };
  else if (key === "radius") config.theme!.radius = value;
  else if (key === "darkMode") config.theme!.darkMode = value === "true";
  else {
    log.error(`Unknown theme key: ${key}`);
    process.exit(1);
  }

  writeConfig(config, cwd);
  await themeApplyCommand(cwd);
  log.success(`Set ${key} = ${chalk.cyan(value)}`);
}

export async function themeListCommand(cwd = process.cwd()) {
  const config = (() => {
    try {
      return readConfig(cwd);
    } catch {
      return null;
    }
  })();
  const current = config?.theme?.preset ?? "(none)";

  log.blank();
  log.info(`Theme studio: ${chalk.cyan(themeStudioUrl())}`);
  log.blank();

  try {
    const themes = await listThemes();
    console.log(
      chalk.gray("  " + "Id".padEnd(14) + "Label".padEnd(14) + "Hint")
    );
    console.log(chalk.gray("  " + "─".repeat(60)));
    for (const t of themes) {
      const mark = t.id === current ? chalk.green("● ") : "  ";
      console.log(
        mark +
          chalk.bold(t.id.padEnd(12)) +
          t.label.padEnd(14) +
          chalk.dim(t.hint)
      );
      console.log(chalk.dim(`     ${t.previewUrl}`));
    }
  } catch (e) {
    log.error(`Could not load themes from server: ${(e as Error).message}`);
    process.exit(1);
  }

  if (config?.theme) {
    const t = config.theme;
    const primary = t.colors?.primary ?? "#0071e3";
    log.blank();
    console.log(`  ${chalk.bold("Current project")}`);
    console.log(`  ${chalk.bold("Preset")}          ${t.preset ?? "default"}`);
    console.log(
      `  ${chalk.bold("Primary")}         ${chalk.hex(primary)(t.colors?.primary ?? "#0071e3 (preset)")}`
    );
    console.log(`  ${chalk.bold("Secondary")}       ${t.colors?.secondary ?? "(preset)"}`);
    console.log(`  ${chalk.bold("Radius")}          ${t.radius ?? "balanced"}`);
    console.log(`  ${chalk.bold("Dark mode")}       ${t.darkMode !== false ? "enabled" : "disabled"}`);
  }
  log.blank();
}

export function themeAuditCommand(_cwd = process.cwd()) {
  log.warn("Theme audit checks component files for hardcoded colors (not yet implemented in CLI).");
}
