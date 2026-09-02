import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type { AssetTier, AssetType } from "@prisma/client";
import { signPayload, sha256 } from "../lib/crypto.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATALOG_DIR = join(__dirname, "..", "..", "catalog");

export interface VersionHistoryEntry {
  version: string;
  releasedAt?: string;
  notes?: string;
}

export interface CatalogAssetMeta {
  id: string;
  type: AssetType;
  tier: AssetTier;
  displayName: string;
  description: string;
  category: string;
  templates: string[];
  latestVersion: string;
  /** Explicit version list — CLI/clients pin installs to these. */
  versions?: {
    latest: string;
    history: VersionHistoryEntry[];
  };
  dependencies?: string[];
  tags?: string[];
  delivery?: "module" | "server-package";
  exportName?: string;
  package?: string;
}

interface CatalogFile {
  version: string;
  updatedAt?: string;
  assets: CatalogAssetMeta[];
}

function readCatalog(): CatalogFile {
  const path = join(CATALOG_DIR, "catalog.json");
  if (!existsSync(path)) {
    return { version: "1.0.0", assets: [] };
  }
  return JSON.parse(readFileSync(path, "utf-8")) as CatalogFile;
}

export function getCatalogVersion(): string {
  return readCatalog().version;
}

export function listCatalogAssets(filters?: {
  type?: AssetType;
  tier?: AssetTier;
  template?: string;
}): CatalogAssetMeta[] {
  let assets = readCatalog().assets;
  if (filters?.type) assets = assets.filter((a) => a.type === filters.type);
  if (filters?.tier) assets = assets.filter((a) => a.tier === filters.tier);
  if (filters?.template) assets = assets.filter((a) => a.templates.includes(filters.template!));
  return assets;
}

export function getCatalogAsset(assetId: string): CatalogAssetMeta | null {
  return readCatalog().assets.find((a) => a.id === assetId) ?? null;
}

/** Resolve `latest` or a concrete semver against the asset's published versions. */
export function resolveAssetVersion(asset: CatalogAssetMeta, requested = "latest"): string | null {
  const latest = asset.versions?.latest ?? asset.latestVersion;
  const history = asset.versions?.history?.map((h) => h.version) ?? [];
  const known = new Set([latest, ...history].filter(Boolean));

  if (requested === "latest" || !requested) return latest;
  if (known.has(requested)) return requested;
  // Allow requesting a version that matches latest even if history is incomplete
  if (requested === asset.latestVersion) return requested;
  return null;
}

export function loadAssetPayload(
  assetId: string,
  framework: string,
  version = "latest"
): { manifest: Record<string, unknown>; files: Record<string, string> } | null {
  const asset = getCatalogAsset(assetId);
  if (!asset) return null;

  const resolved = resolveAssetVersion(asset, version);
  if (!resolved) return null;

  // Free module assets are fully described by catalog.json (versioned metadata)
  if (asset.tier === "free" || asset.delivery === "module") {
    const exportName = asset.exportName ?? toExportName(assetId);
    return {
      manifest: {
        delivery: "module",
        version: resolved,
        exportName,
        package: asset.package ?? "@roboticela/devkit",
        styles: true,
        usage: `import { ${exportName} } from '@roboticela/devkit';`,
        name: assetId,
        type: asset.type,
        tier: "free",
      },
      files: {},
    };
  }

  const candidates = [
    join(CATALOG_DIR, assetId, framework, `v${resolved}`),
    join(CATALOG_DIR, assetId, framework),
    join(CATALOG_DIR, assetId, "nextjs-compact"),
    join(CATALOG_DIR, assetId),
  ];

  let assetDir: string | null = null;
  for (const dir of candidates) {
    if (existsSync(join(dir, "manifest.json"))) {
      assetDir = dir;
      break;
    }
  }
  if (!assetDir) return null;

  const manifest = JSON.parse(readFileSync(join(assetDir, "manifest.json"), "utf-8")) as Record<
    string,
    unknown
  >;
  const delivery = String(manifest.delivery ?? "server-package");

  if (delivery === "module") {
    return {
      manifest: { ...manifest, version: resolved, delivery: "module" },
      files: {},
    };
  }

  const filesPath = join(assetDir, "files.json");
  const files: Record<string, string> = existsSync(filesPath)
    ? JSON.parse(readFileSync(filesPath, "utf-8"))
    : {};

  for (const content of Object.values(files)) {
    if (content.includes(".tsx") && content.includes("export function")) {
      throw new Error(`Asset '${assetId}' uses deprecated source delivery. Rebuild as server-package.`);
    }
  }
  if (!files["index.js"]) {
    throw new Error(`Asset '${assetId}' must ship compiled index.js only.`);
  }

  return {
    manifest: { ...manifest, version: resolved, delivery: "server-package" },
    files,
  };
}

function toExportName(assetId: string): string {
  return assetId
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

export function buildSignedManifest(
  assetId: string,
  framework: string,
  manifest: Record<string, unknown>,
  files: Record<string, string>
) {
  const payload = {
    id: assetId,
    framework,
    version: manifest.version,
    manifest,
    files,
    integrity: sha256(JSON.stringify({ manifest, files })),
    issuedAt: new Date().toISOString(),
  };
  const signature = signPayload(JSON.stringify(payload));
  return { ...payload, signature };
}

export function serializeCatalogAsset(a: CatalogAssetMeta) {
  const latest = a.versions?.latest ?? a.latestVersion;
  const history = a.versions?.history ?? [{ version: latest }];
  return {
    id: a.id,
    type: a.type,
    tier: a.tier,
    displayName: a.displayName,
    description: a.description,
    category: a.category,
    templates: a.templates,
    latestVersion: latest,
    versions: {
      latest,
      history,
    },
    dependencies: a.dependencies ?? [],
    tags: a.tags ?? [],
    delivery: a.delivery ?? (a.tier === "free" ? "module" : "server-package"),
    exportName: a.exportName,
    package: a.package,
  };
}
