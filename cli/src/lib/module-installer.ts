import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import { readLock, writeLock, isComponentInstalled } from "./config.js";
import { log } from "./logger.js";
import { CLI_VERSION } from "../version.js";

const DEVKIT_PACKAGE = "@roboticela/devkit";

export interface ModuleManifest {
  delivery: "module";
  version: string;
  exportName: string;
  package?: string;
  importPath?: string;
  styles?: boolean;
  dependencies?: { frontend?: string[] };
  peerDependencies?: string[];
  usage?: string;
}

function readPackageJson(cwd: string): Record<string, unknown> {
  return JSON.parse(readFileSync(join(cwd, "package.json"), "utf-8"));
}

function writePackageJson(cwd: string, pkg: Record<string, unknown>) {
  writeFileSync(join(cwd, "package.json"), JSON.stringify(pkg, null, 2) + "\n");
}

function detectPackageManager(cwd: string): string {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  if (existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock"))) return "bun";
  return "npm";
}

function installPackage(cwd: string, spec: string, dev = false) {
  const pm = detectPackageManager(cwd);
  log.step(`Installing ${spec}`);
  if (pm === "yarn") {
    execSync(`yarn add ${dev ? "-D " : ""}${spec}`, { cwd, stdio: "inherit" });
  } else if (pm === "pnpm") {
    execSync(`pnpm add ${dev ? "-D " : ""}${spec}`, { cwd, stdio: "inherit" });
  } else if (pm === "bun") {
    execSync(`bun add ${dev ? "-d " : ""}${spec}`, { cwd, stdio: "inherit" });
  } else {
    execSync(`npm install ${dev ? "--save-dev " : "--save "}${spec}`, { cwd, stdio: "inherit" });
  }
}

export function ensureDevKitPackage(cwd: string, version = CLI_VERSION): void {
  const pkg = readPackageJson(cwd);
  const deps = (pkg.dependencies ?? {}) as Record<string, string>;
  const spec = `${DEVKIT_PACKAGE}@${version}`;
  if (deps[DEVKIT_PACKAGE]) return;
  deps[DEVKIT_PACKAGE] = `^${version}`;
  pkg.dependencies = deps;
  writePackageJson(cwd, pkg);
  installPackage(cwd, spec);
}

export function buildImportStatement(manifest: ModuleManifest): string {
  const pkg = manifest.package ?? DEVKIT_PACKAGE;
  const path = manifest.importPath ?? pkg;
  if (manifest.exportName === "default") {
    return `import Component from '${path}';`;
  }
  return `import { ${manifest.exportName} } from '${path}';`;
}

export async function installModuleComponent(
  name: string,
  template: string,
  manifest: ModuleManifest,
  resolvedVersion: string,
  cwd = process.cwd(),
  options: { asDependency?: boolean } = {}
): Promise<void> {
  if (options.asDependency && isComponentInstalled(name, cwd)) return;

  ensureDevKitPackage(cwd, resolvedVersion.split(".")[0] ? resolvedVersion : CLI_VERSION);

  for (const dep of manifest.dependencies?.frontend ?? []) {
    const depName = dep.split("@")[0]!;
    if (depName && depName !== name && !isComponentInstalled(depName, cwd)) {
      log.step(`Resolving dependency ${depName}`);
      // Dependencies are also module exports — resolved by registry add flow
    }
  }

  const importLine = manifest.usage ?? buildImportStatement(manifest);

  const compManifest = {
    name,
    version: resolvedVersion,
    template,
    delivery: "module" as const,
    exportName: manifest.exportName,
    package: manifest.package ?? DEVKIT_PACKAGE,
    importPath: manifest.importPath ?? DEVKIT_PACKAGE,
    installedAt: new Date().toISOString(),
    managedFiles: [] as { path: string; hash: string; userModified: boolean }[],
    usage: importLine,
    styles: manifest.styles !== false,
    envVars: [] as string[],
  };

  mkdirSync(join(cwd, ".devkit"), { recursive: true });
  writeFileSync(join(cwd, ".devkit", `${name}.manifest.json`), JSON.stringify(compManifest, null, 2) + "\n");

  const lock = readLock(cwd);
  lock.components[name] = {
    version: resolvedVersion,
    variant: null,
    resolved: `module:${manifest.package ?? DEVKIT_PACKAGE}#${manifest.exportName}`,
    installedAt: new Date().toISOString(),
  };
  writeLock(lock, cwd);

  log.success(`${name} available from ${manifest.package ?? DEVKIT_PACKAGE}`);
  log.blank();
  log.info("Import in your code (source lives in node_modules — do not copy):");
  log.step(importLine);
  if (manifest.styles !== false) {
    log.step(`import '${manifest.package ?? DEVKIT_PACKAGE}/styles.css';`);
  }
}
