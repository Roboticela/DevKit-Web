import { intro, outro } from "@clack/prompts";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { detectTemplate } from "../lib/detector.js";
import { writeConfig, writeLock, defaultConfig, configExists } from "../lib/config.js";
import { generateThemeCSS } from "../lib/theme.js";
import { ensureProjectIdentity } from "../lib/project.js";
import { bindSessionToProject } from "../lib/auth-store.js";
import { listTemplates, getTemplate } from "../lib/template.js";
import { listThemes } from "../lib/themes.js";
import { resolveThemeCssPath } from "../lib/theme-path.js";
import { log } from "../lib/logger.js";
import { cliBinName } from "../lib/cli-meta.js";
import { getApiBaseUrl } from "../lib/api-client.js";
import chalk from "chalk";

export async function initCommand(cwd = process.cwd()) {
  if (configExists(cwd)) {
    log.warn("DevKit is already initialized in this project.");
    log.info(`Run '${cliBinName()} doctor' to check configuration.`);
    return;
  }

  intro("DevKit Init");
  log.info(`Templates from ${getApiBaseUrl()}`);

  let remoteTemplates: Awaited<ReturnType<typeof listTemplates>> = [];
  try {
    remoteTemplates = await listTemplates();
  } catch (e) {
    log.error(`Could not load templates from server: ${(e as Error).message}`);
    process.exit(1);
  }

  const detected = detectTemplate(cwd);
  let template: string;
  let cssPathHint: string | null | undefined;

  if (detected !== "unknown" && remoteTemplates.some((t) => t.id === detected)) {
    template = detected;
    const meta = remoteTemplates.find((t) => t.id === detected);
    cssPathHint = meta?.cssPath;
    log.success(`Detected template: ${meta?.label ?? template}`);
  } else {
    const { select } = await import("@clack/prompts");
    template = (await select({
      message: "Select a template (from server)",
      options: remoteTemplates.map((t) => ({
        value: t.id,
        label: t.label,
        hint: t.version ? `v${t.version}${t.hint ? ` · ${t.hint}` : ""}` : t.hint,
      })),
    })) as string;
    cssPathHint = remoteTemplates.find((t) => t.id === template)?.cssPath;
  }

  try {
    const meta = await getTemplate(template);
    cssPathHint = meta.cssPath ?? cssPathHint;
  } catch {
    /* list meta is enough */
  }

  const { text, select } = await import("@clack/prompts");
  const siteName = (await text({ message: "Site name", placeholder: "My App" })) as string;
  const siteUrl = (await text({ message: "Site URL", placeholder: "https://myapp.com" })) as string;

  let remoteThemes: Awaited<ReturnType<typeof listThemes>> = [];
  try {
    remoteThemes = await listThemes();
  } catch (e) {
    log.error(`Could not load themes from server: ${(e as Error).message}`);
    process.exit(1);
  }

  const preset = (await select({
    message: "Theme preset (from server)",
    options: remoteThemes.map((t) => ({
      value: t.id,
      label: t.label,
      hint: t.hint,
    })),
  })) as string;
  const selectedTheme = remoteThemes.find((t) => t.id === preset)!;
  log.info(`Preview: ${chalk.cyan(selectedTheme.previewUrl)}`);

  const selectedMeta = remoteTemplates.find((t) => t.id === template);
  const config = defaultConfig(template, siteName, siteUrl, selectedMeta?.version);
  config.theme!.preset = preset;
  config.theme!.radius = selectedTheme.radius;
  config.theme!.colors = {
    primary: selectedTheme.primary,
    secondary: selectedTheme.secondary,
  };
  writeConfig(config, cwd);
  log.success("Created devkit.config.json");

  writeLock({ lockVersion: 1, template, components: {} }, cwd);
  log.success("Created devkit.lock.json");

  ensureProjectIdentity(cwd);
  bindSessionToProject(cwd);

  const themeCss = generateThemeCSS(config, {
    primary: selectedTheme.primary,
    secondary: selectedTheme.secondary,
    radius: selectedTheme.radius,
  });
  const cssPath = resolveThemeCssPath(cwd, cssPathHint);
  if (existsSync(cssPath)) {
    const old = readFileSync(cssPath, "utf-8");
    const clean = old
      .replace(/\/\* ── DevKit Managed Theme Block[\s\S]*?── End DevKit Managed Theme Block ── \*\//, "")
      .trimStart();
    writeFileSync(cssPath, themeCss + clean);
  } else {
    mkdirSync(dirname(cssPath), { recursive: true });
    writeFileSync(cssPath, themeCss);
  }
  log.success(`Applied theme to ${cssPath.replace(cwd + "\\", "").replace(cwd + "/", "")}`);

  mkdirSync(join(cwd, ".devkit"), { recursive: true });

  const gitignorePath = join(cwd, ".gitignore");
  if (existsSync(gitignorePath)) {
    const gi = readFileSync(gitignorePath, "utf-8");
    const extra = [
      ".devkit/cache/",
      ".devkit/premium-imports.ts",
      ".devkit/premium-registry.json",
      "node_modules/@roboticela/premium-*/",
    ];
    let updated = gi;
    for (const line of extra) {
      if (!gi.includes(line.replace(/\/$/, ""))) {
        updated += `\n${line}`;
      }
    }
    if (updated !== gi) writeFileSync(gitignorePath, updated.trimEnd() + "\n");
  }

  outro(`DevKit initialized! Run '${cliBinName()} login' then '${cliBinName()} add'.`);
}
