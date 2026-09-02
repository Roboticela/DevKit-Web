import type {
  ComponentEntry,
  PackageKind,
  ListComponentsFilters,
} from "./component-entry.js";
import { normalizeKind } from "./component-entry.js";
import {
  getBundledComponentMeta,
  getBundledManifest,
  getRegistryRoot,
  listBundledComponents,
} from "./bundled-registry.js";
import { listServerAssets, type ServerCatalogAsset } from "./premium-assets.js";
import { readSession, isSessionValid } from "./auth-store.js";

export type { ComponentEntry, PackageKind, ListComponentsFilters };

function serverAssetToEntry(asset: ServerCatalogAsset): ComponentEntry {
  return {
    name: asset.id,
    displayName: asset.displayName,
    description: asset.description,
    category: asset.category,
    kind: asset.type === "section" ? "section" : (asset.type as PackageKind),
    templates: asset.templates,
    platforms: asset.templates.includes("vite-express-tauri") ? ["web", "desktop"] : ["web"],
    hasVariants: false,
    latestVersion: asset.latestVersion,
    tags: asset.tags ?? [],
    stub: false,
  };
}

function requireBundledRegistry(): void {
  if (!getRegistryRoot()) {
    throw new Error(
      "Bundled registry not found in the @roboticela/devkit package. Reinstall with: npm i -g @roboticela/devkit"
    );
  }
}

export async function listComponents(filters: ListComponentsFilters = {}): Promise<ComponentEntry[]> {
  let local: ComponentEntry[] = [];
  if (getRegistryRoot()) {
    local = listBundledComponents(filters) ?? [];
  }

  let server: ComponentEntry[] = [];
  if (isSessionValid(readSession())) {
    try {
      const assets = await listServerAssets({
        type: filters.kind,
        template: filters.template,
      });
      server = assets
        .filter((a) => a.tier === "premium")
        .map(serverAssetToEntry);
      if (filters.kind) server = server.filter((c) => c.kind === filters.kind);
      if (filters.category) server = server.filter((c) => c.category === filters.category);
    } catch {
      /* server unavailable */
    }
  }

  const seen = new Set(local.map((c) => c.name));
  const merged = [...local];
  for (const entry of server) {
    if (!seen.has(entry.name)) merged.push(entry);
  }
  return merged;
}

export async function getComponentInfo(name: string): Promise<Record<string, unknown>> {
  requireBundledRegistry();
  const local = getBundledComponentMeta(name);
  if (!local) throw new Error(`Package '${name}' not found in the bundled registry.`);
  return { ...local, kind: normalizeKind(local.kind) };
}

export async function getManifest(
  name: string,
  template: string,
  version = "latest",
  variant?: string
): Promise<{ name: string; template: string; version: string; variant: string | null; manifest: Record<string, unknown> }> {
  requireBundledRegistry();
  const local = getBundledManifest(name, template, version, variant);
  if (!local) {
    const hint = variant ? ` (variant=${variant})` : "";
    throw new Error(`No manifest for '${name}'@${version} template=${template}${hint} in the bundled registry.`);
  }
  return local;
}

/** True when the CLI package ships a usable on-disk registry (no network). */
export async function healthCheck(): Promise<boolean> {
  return getRegistryRoot() !== null && (listBundledComponents() ?? []).length > 0;
}
