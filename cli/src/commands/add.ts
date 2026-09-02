import ora from "ora";
import chalk from "chalk";
import { intro, outro, multiselect, select, isCancel } from "@clack/prompts";
import { readConfig, isComponentInstalled } from "../lib/config.js";
import { installComponent } from "../lib/installer.js";
import { installPremiumAsset } from "../lib/premium-installer.js";
import { listComponents, type ComponentEntry } from "../lib/registry.js";
import { isPremiumAssetId } from "../lib/premium-guard.js";
import { requireLogin } from "../lib/auth-store.js";
import { log } from "../lib/logger.js";
import { cliBinName } from "../lib/cli-meta.js";
import type { PackageKind } from "../lib/component-entry.js";

interface AddOptions {
  variant?: string;
  dryRun?: boolean;
  type?: string;
}

function inferKind(name: string, meta?: ComponentEntry): PackageKind {
  if (meta?.kind) return meta.kind;
  if (name.endsWith("-scaffold")) return "scaffold";
  if (name.endsWith("-section")) return "section";
  if (name.endsWith("-page") || isPremiumAssetId(name)) return "page";
  return "component";
}

async function pickVariantForComponent(
  meta: ComponentEntry,
  optsVariant: string | undefined
): Promise<string | undefined | "cancel"> {
  if (!meta.hasVariants || !meta.variants?.length) return undefined;
  if (meta.variants.length === 1) return meta.variants[0]!.id;
  if (optsVariant) {
    const match = meta.variants.find((v) => v.id === optsVariant);
    if (match) return match.id;
  }
  const v = await select({
    message: `Variant for ${meta.name}`,
    options: meta.variants.map((x) => ({
      value: x.id,
      label: x.label,
      hint: x.description,
    })),
  });
  if (isCancel(v)) return "cancel";
  return v as string;
}

async function interactiveAddSelections(
  config: ReturnType<typeof readConfig>,
  cwd: string
): Promise<{ name: string; version: string; variant?: string; kind: PackageKind }[] | null> {
  let all: ComponentEntry[];
  try {
    all = await listComponents({ template: config.template });
  } catch (e) {
    log.error(`Could not load registry: ${(e as Error).message}`);
    return null;
  }

  const installable = all.filter((c) => !isComponentInstalled(c.name, cwd));
  if (installable.length === 0) {
    log.info("Everything available for this template is already installed.");
    return [];
  }

  console.log();
  intro(chalk.cyan("Add packages"));

  const groups: { kind: PackageKind; label: string }[] = [
    { kind: "component", label: "free components" },
    { kind: "page", label: "premium pages" },
    { kind: "section", label: "premium sections" },
    { kind: "scaffold", label: "premium scaffolds" },
  ];

  const picked: string[] = [];
  for (const { kind, label } of groups) {
    const options = installable
      .filter((c) => c.kind === kind)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((c) => ({
        value: c.name,
        label: c.name,
        hint: c.description.length > 52 ? `${c.description.slice(0, 49)}…` : c.description,
      }));
    if (options.length === 0) continue;
    const selected = await multiselect({
      message: `Select ${label} (space to toggle, enter to confirm)`,
      options,
      required: false,
    });
    if (isCancel(selected)) {
      outro("Cancelled.");
      return [];
    }
    picked.push(...(selected as string[]));
  }

  const seen = new Set<string>();
  const unique = picked.filter((name) => {
    if (seen.has(name)) return false;
    seen.add(name);
    return true;
  });

  if (unique.length === 0) {
    outro("No packages selected.");
    return [];
  }

  const results: { name: string; version: string; variant?: string; kind: PackageKind }[] = [];
  for (const compName of unique) {
    const meta = installable.find((x) => x.name === compName)!;
    const variant = await pickVariantForComponent(meta, undefined);
    if (variant === "cancel") {
      outro("Cancelled.");
      return [];
    }
    results.push({ name: compName, version: "latest", variant, kind: meta.kind });
  }
  return results;
}

async function installOne(
  name: string,
  version: string,
  variant: string | undefined,
  kind: PackageKind,
  cwd: string,
  opts: AddOptions
) {
  const config = readConfig(cwd);
  if (opts.dryRun) {
    log.info(`[dry-run] Would add ${chalk.cyan(name)} (${kind})`);
    return;
  }

  if (kind === "component") {
    await installComponent(name, config.template, version, variant, cwd);
    return;
  }

  await installPremiumAsset(name, kind, cwd);
}

export async function addCommand(names: string[], opts: AddOptions, cwd = process.cwd()) {
  requireLogin(cwd);
  const bin = cliBinName();
  const usedInteractive = names.length === 0;
  let todo: { name: string; version: string; variant?: string; kind: PackageKind }[];

  if (usedInteractive) {
    const config = readConfig(cwd);
    const picked = await interactiveAddSelections(config, cwd);
    if (picked === null || picked.length === 0) return;
    todo = picked;
  } else {
    const config = readConfig(cwd);
    let catalog: ComponentEntry[] = [];
    try {
      catalog = await listComponents({ template: config.template });
    } catch {
      /* offline ok for known premium ids */
    }

  todo = names.map((nameAtVersion) => {
      const [name, version = "latest"] = nameAtVersion.split("@");
      const meta = catalog.find((c) => c.name === name);
      let kind = inferKind(name!, meta);
      // Prefer live server kind when available
      if (meta?.kind) kind = meta.kind;
      if (opts.type === "component" || opts.type === "page" || opts.type === "section" || opts.type === "scaffold") {
        kind = opts.type;
      }
      return { name: name!, version, variant: opts.variant, kind };
    });
  }

  let anyOk = false;
  for (const item of todo) {
    if (isComponentInstalled(item.name, cwd)) {
      log.info(`${item.name} is already installed — skipping.`);
      continue;
    }

    const spinner = ora({
      text: `Adding ${chalk.cyan(item.name)}…`,
      color: "cyan",
    }).start();

    try {
      await installOne(item.name, item.version, item.variant, item.kind, cwd, opts);
      spinner.succeed(chalk.green(`${item.name} added`));
      anyOk = true;
    } catch (e) {
      spinner.fail(chalk.red(`${item.name}: ${(e as Error).message}`));
      if ((e as Error).message.includes("LICENSE_REQUIRED")) {
        log.info(`Activate license: ${chalk.cyan(`${bin} activate`)}`);
      }
    }
  }

  if (usedInteractive) {
    outro(anyOk ? chalk.green("Done.") : chalk.yellow("Nothing was added."));
  }
}
