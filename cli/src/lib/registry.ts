import type {
  ComponentEntry,
  PackageKind,
  ListComponentsFilters,
} from "./component-entry.js";
import { normalizeKind } from "./component-entry.js";
import {
  listServerAssets,
  fetchFreeAssetPayload,
  type ServerCatalogAsset,
} from "./premium-assets.js";
import { readSession, isSessionValid, requireLogin } from "./auth-store.js";
import { checkApiHealth, getApiBaseUrl } from "./api-client.js";
import { cliBinName } from "./cli-meta.js";

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
    latestVersion: asset.versions?.latest ?? asset.latestVersion,
    tags: asset.tags ?? [],
    stub: false,
  };
}

/** Live catalog from DevKit server (free + premium), versioned. */
export async function listComponents(filters: ListComponentsFilters = {}): Promise<ComponentEntry[]> {
  requireLogin();

  const assets = await listServerAssets({
    type: filters.kind,
    template: filters.template,
  });

  let entries = assets.map(serverAssetToEntry);
  if (filters.kind) entries = entries.filter((c) => c.kind === filters.kind);
  if (filters.category) entries = entries.filter((c) => c.category === filters.category);
  if (filters.group) entries = entries.filter((c) => c.group === filters.group);
  return entries;
}

export async function getComponentInfo(name: string): Promise<Record<string, unknown>> {
  requireLogin();
  const assets = await listServerAssets();
  const asset = assets.find((a) => a.id === name);
  if (!asset) throw new Error(`Package '${name}' not found on DevKit server.`);
  return {
    ...asset,
    name: asset.id,
    kind: normalizeKind(asset.type),
    latestVersion: asset.versions?.latest ?? asset.latestVersion,
  };
}

export async function getManifest(
  name: string,
  template: string,
  version = "latest",
  _variant?: string
): Promise<{
  name: string;
  template: string;
  version: string;
  variant: string | null;
  manifest: Record<string, unknown>;
}> {
  requireLogin();
  const payload = await fetchFreeAssetPayload(name, template, version);
  const resolvedVersion = String(payload.manifest.version ?? version);
  return {
    name,
    template,
    version: resolvedVersion,
    variant: null,
    manifest: payload.manifest,
  };
}

/** Server catalog reachable. */
export async function healthCheck(): Promise<boolean> {
  if (!(await checkApiHealth())) return false;
  const session = readSession();
  if (!isSessionValid(session)) return false;
  try {
    await listServerAssets();
    return true;
  } catch {
    return false;
  }
}

export function catalogUnavailableHint(): string {
  return `Catalog comes from the DevKit server (${getApiBaseUrl()}). Run '${cliBinName()} login' and ensure the API is up.`;
}
