import chalk from "chalk";
import { listComponents } from "../lib/registry.js";
import { normalizeKind, type PackageKind } from "../lib/component-entry.js";
import { readConfig, readLock } from "../lib/config.js";
import { cliBinName } from "../lib/cli-meta.js";
import { log } from "../lib/logger.js";

interface ListOptions {
  template?: string;
  installed?: boolean;
  kind?: string;
  /** @deprecated ignored — use kind/type */
  premium?: boolean;
  category?: string;
  group?: string;
}

export async function listCommand(opts: ListOptions, cwd = process.cwd()) {
  const bin = cliBinName();
  let template = opts.template;
  if (!template) {
    try {
      template = readConfig(cwd).template;
    } catch {
      /* no config */
    }
  }

  let kindFilter: PackageKind | undefined;
  if (opts.kind) {
    const k = opts.kind.toLowerCase();
    if (k === "component" || k === "page" || k === "scaffold" || k === "section") kindFilter = k;
    else {
      log.error(`Invalid --type (use component, page, section, or scaffold)`);
      return;
    }
  }

  try {
    const components = await listComponents({
      template,
      kind: kindFilter,
      category: opts.category,
      group: opts.group,
    });
    const lock = (() => {
      try {
        return readLock(cwd);
      } catch {
        return { lockVersion: 1, template: "", components: {} } satisfies import("../lib/config.js").DevKitLock;
      }
    })();

    const filtered = opts.installed
      ? components.filter((c) => c.name in lock.components)
      : components;

    if (filtered.length === 0) {
      log.info("No packages found.");
      return;
    }

    log.blank();
    const col = (s: string, w: number) => s.padEnd(w).slice(0, w);

    const kindLabel = (k: string) => {
      if (k === "page") return chalk.yellow("page");
      if (k === "section") return chalk.blue("section");
      if (k === "scaffold") return chalk.cyan("scaffold");
      return chalk.magenta("component");
    };

    console.log(
      chalk.gray("  " + col("Package", 26) + col("Type", 12) + col("Latest", 10) + "Installed")
    );
    console.log(chalk.gray("  " + "─".repeat(68)));

    for (const comp of filtered) {
      const installed = lock.components[comp.name];
      const installedStr = installed ? chalk.green(`v${installed.version}`) : chalk.gray("-");
      const pk = normalizeKind(comp.kind);

      console.log(
        "  " +
          chalk.bold(col(comp.name, 26)) +
          kindLabel(pk) +
          " ".repeat(Math.max(1, 12 - pk.length)) +
          chalk.dim(col(`v${comp.latestVersion}`, 10)) +
          installedStr
      );
    }
    log.blank();
    log.info(`${filtered.length} package(s). ${chalk.cyan(`${bin} info <name>`)} for details.`);
    log.blank();
  } catch (e) {
    log.error(`Could not load registry: ${(e as Error).message}`);
  }
}
