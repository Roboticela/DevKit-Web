import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync, rmSync } from "fs";
import { join, dirname } from "path";
import { execSync } from "child_process";
import { createHash } from "crypto";
import { fetchFreeAssetPayload, listServerAssets } from "./premium-assets.js";
import { isComponentInstalled, readLock, writeLock } from "./config.js";
import { log } from "./logger.js";
import { assertNotPremiumAsset } from "./premium-guard.js";
import {
  premiumPackagePath,
  readPremiumImportRegistry,
  writePremiumImportRegistry,
} from "./premium-package.js";

interface FileEntry {
  source: string;
  destination: string;
}
interface Injection {
  file: string;
  marker?: string;
  importLine?: string;
  routeLine?: string;
  componentLine?: string;
  wrap?: { open: string; close: string };
}
interface Manifest {
  version: string;
  delivery?: string;
  files?: FileEntry[];
  injections?: Injection[];
  dependencies?: { frontend?: string[]; devFrontend?: string[]; backend?: string[]; devBackend?: string[] };
  envVars?: string[];
}

function hashContent(content: string | Buffer): string {
  return createHash("sha256").update(content).digest("hex");
}

function hashFile(path: string): string {
  return hashContent(readFileSync(path));
}

let catalogIdCache: Set<string> | null = null;

async function isCatalogPackage(name: string): Promise<boolean> {
  const base = name.split("@")[0]!;
  if (!catalogIdCache) {
    const assets = await listServerAssets();
    catalogIdCache = new Set(assets.map((a) => a.id));
  }
  return catalogIdCache.has(base);
}

async function partitionDeps(names: string[]): Promise<{ catalog: string[]; npm: string[] }> {
  const catalog: string[] = [];
  const npm: string[] = [];
  for (const raw of names) {
    const base = raw.split("@")[0]!;
    if (await isCatalogPackage(base)) catalog.push(raw);
    else npm.push(raw);
  }
  return { catalog, npm };
}

function npmInstall(packages: string[], cwd: string, dev = false): void {
  if (packages.length === 0) return;
  const flag = dev ? "-D " : "";
  log.step(`npm install ${flag}${packages.join(" ")}`);
  execSync(`npm install ${flag}${packages.join(" ")}`, { cwd, stdio: "inherit" });
}

/** Options for installing or updating a component. */
export interface InstallOptions {
  force?: boolean;
  asDependency?: boolean;
}

/**
 * Install a free (or non-premium) asset using versioned payloads from the DevKit server.
 * Never reads a local/bundled registry — catalog + files come from the API only.
 */
export async function installComponent(
  name: string,
  template: string,
  version = "latest",
  variant: string | undefined,
  cwd = process.cwd(),
  options: InstallOptions = {},
  installing: Set<string> = new Set()
): Promise<void> {
  const force = options.force === true;
  const asDependency = options.asDependency === true;

  if (installing.has(name)) return;
  if (asDependency && isComponentInstalled(name, cwd) && !force) return;

  assertNotPremiumAsset(name);

  installing.add(name);

  try {
    const lockAtStart = readLock(cwd);
    const lockedComp = lockAtStart.components[name];

    const existingManifestPath = join(cwd, ".devkit", `${name}.manifest.json`);
    const previousByPath = new Map<string, { path: string; hash: string; userModified?: boolean }>();
    if (existsSync(existingManifestPath)) {
      try {
        const existing = JSON.parse(readFileSync(existingManifestPath, "utf-8"));
        for (const mf of existing.managedFiles ?? []) {
          previousByPath.set(mf.path, mf);
        }
      } catch {
        /* ignore */
      }
    }

    const payload = await fetchFreeAssetPayload(name, template, version);
    const manifest = payload.manifest as unknown as Manifest & {
      delivery?: string;
      exportName?: string;
      package?: string;
      usage?: string;
      styles?: boolean;
    };
    const resolvedVersion = String(manifest.version ?? version);

    // Module delivery — pin @roboticela/devkit to the server-declared version
    if (manifest.delivery === "module") {
      const { installModuleComponent } = await import("./module-installer.js");
      await installModuleComponent(
        name,
        template,
        manifest as unknown as import("./module-installer.js").ModuleManifest,
        resolvedVersion,
        cwd,
        { asDependency: options.asDependency }
      );
      return;
    }

    // Server-package free assets (compiled files from API)
    const deps = manifest.dependencies ?? {};
    const frontendParts = await partitionDeps(deps.frontend ?? []);
    const devFrontendParts = await partitionDeps(deps.devFrontend ?? []);
    const backendParts = await partitionDeps(deps.backend ?? []);
    const devBackendParts = await partitionDeps(deps.devBackend ?? []);

    const catalogDeps = [
      ...frontendParts.catalog,
      ...devFrontendParts.catalog,
      ...backendParts.catalog,
      ...devBackendParts.catalog,
    ];

    for (const dep of catalogDeps) {
      const [depName, depVersion = "latest"] = dep.split("@");
      if (!depName || depName === name) continue;
      log.step(`Adding dependency ${depName}@${depVersion}`);
      await installComponent(depName, template, depVersion, undefined, cwd, { ...options, asDependency: true }, installing);
    }

    const files = payload.files ?? {};
    if (Object.keys(files).length === 0 && !(manifest.files?.length)) {
      throw new Error(
        `Asset '${name}'@${resolvedVersion} has no installable payload from the server.`
      );
    }

    const managedFiles: Array<{ path: string; hash: string; userModified: boolean }> = [];
    const fileEntries: FileEntry[] =
      manifest.files?.length
        ? manifest.files
        : Object.keys(files).map((rel) => ({ source: rel, destination: rel }));

    for (const fileEntry of fileEntries) {
      const content = files[fileEntry.source];
      if (content == null) continue;
      const dest = join(cwd, fileEntry.destination);

      let userModified = false;
      if (!force && existsSync(dest) && lockedComp) {
        const tracked = previousByPath.get(fileEntry.destination);
        if (tracked && tracked.hash !== hashFile(dest)) userModified = true;
      }

      if (userModified) {
        log.warn(`Skipped (user-modified): ${fileEntry.destination}`);
        managedFiles.push({
          path: fileEntry.destination,
          hash: hashFile(dest),
          userModified: true,
        });
      } else {
        mkdirSync(dirname(dest), { recursive: true });
        writeFileSync(dest, content);
        managedFiles.push({
          path: fileEntry.destination,
          hash: hashContent(content),
          userModified: false,
        });
        log.step(`Created ${fileEntry.destination}`);
      }
    }

    for (const injection of manifest.injections ?? []) {
      applyInjection(injection, cwd);
    }

    npmInstall(frontendParts.npm, cwd, false);
    npmInstall(devFrontendParts.npm, cwd, true);
    if (existsSync(join(cwd, "server"))) {
      npmInstall(backendParts.npm, join(cwd, "server"), false);
      npmInstall(devBackendParts.npm, join(cwd, "server"), true);
    }

    const compManifest = {
      name,
      version: resolvedVersion,
      template,
      variant: variant ?? null,
      delivery: manifest.delivery ?? "server-package",
      installedAt: new Date().toISOString(),
      managedFiles,
      injections: manifest.injections ?? [],
      dependencies: manifest.dependencies ?? {},
      envVars: manifest.envVars ?? [],
    };
    mkdirSync(join(cwd, ".devkit"), { recursive: true });
    writeFileSync(join(cwd, ".devkit", `${name}.manifest.json`), JSON.stringify(compManifest, null, 2) + "\n");

    const lock = readLock(cwd);
    lock.components[name] = {
      version: resolvedVersion,
      variant: variant ?? null,
      resolved: `server:${name}@${resolvedVersion}/${template}`,
      installedAt: new Date().toISOString(),
    };
    writeLock(lock, cwd);

    if ((manifest.envVars?.length ?? 0) > 0) {
      log.blank();
      log.warn(`Required env vars for ${name}:`);
      for (const envVar of manifest.envVars!) {
        log.step(envVar);
      }
    }
  } finally {
    installing.delete(name);
  }
}

export function removeComponent(name: string, cwd = process.cwd()): void {
  const manifestPath = join(cwd, ".devkit", `${name}.manifest.json`);
  if (!existsSync(manifestPath)) throw new Error(`Component '${name}' is not installed.`);

  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  if (manifest.delivery === "server-package") {
    const pkgRoot = join(cwd, premiumPackagePath(name));
    if (existsSync(pkgRoot)) rmSync(pkgRoot, { recursive: true, force: true });
    const remaining = readPremiumImportRegistry(cwd).filter((e) => e.assetId !== name);
    writePremiumImportRegistry(remaining, cwd);
    log.info(`${name} premium package removed from node_modules.`);
  } else if (manifest.delivery === "module") {
    log.info(`${name} is a module export — remove import usage from your code. Package stays in node_modules.`);
  } else {
    for (const file of manifest.managedFiles ?? []) {
      if (!file.userModified && existsSync(join(cwd, file.path))) {
        unlinkSync(join(cwd, file.path));
        log.step(`Removed ${file.path}`);
      } else if (file.userModified) {
        log.warn(`Kept (user-modified): ${file.path}`);
      }
    }
  }

  unlinkSync(manifestPath);

  const lock = readLock(cwd);
  delete lock.components[name];
  writeLock(lock, cwd);
}

function applyInjection(injection: Injection, cwd: string): void {
  const filePath = join(cwd, injection.file);
  if (!existsSync(filePath)) {
    log.warn(`Injection target not found: ${injection.file} — add manually`);
    return;
  }
  let content = readFileSync(filePath, "utf-8");

  if (injection.importLine && !content.includes(injection.importLine)) {
    content = injection.importLine + "\n" + content;
  }

  if (injection.marker && injection.routeLine && content.includes(injection.marker)) {
    content = content.replace(injection.marker, `${injection.marker}\n      ${injection.routeLine}`);
  }
  if (injection.marker && injection.componentLine && content.includes(injection.marker)) {
    content = content.replace(injection.marker, `${injection.marker}\n      ${injection.componentLine}`);
  }

  writeFileSync(filePath, content);
  log.step(`Injected into ${injection.file}`);
}
