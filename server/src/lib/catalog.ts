import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type { AssetTier, AssetType } from "@prisma/client";
import { signPayload, sha256 } from "../lib/crypto.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const CATALOG_DIR = join(__dirname, "..", "..", "catalog");

const TYPE_DIR: Record<string, string> = {
  component: "components",
  page: "pages",
  section: "sections",
  scaffold: "scaffolds",
};

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
  versions?: {
    latest: string;
    history: VersionHistoryEntry[];
  };
  dependencies?: string[];
  tags?: string[];
  delivery?: "module" | "server-package";
  exportName?: string;
  package?: string;
  route?: string;
  peerDependencies?: Record<string, string>;
  requires?: {
    roboticela?: Array<Record<string, unknown>>;
    bundled?: Array<Record<string, unknown>>;
    internal?: Array<Record<string, unknown>>;
    icons?: Record<string, unknown>;
  };
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
  if (requested === asset.latestVersion) return requested;
  // Allow installing any on-disk version even if history entry was trimmed
  if (versionDirExists(asset, requested)) return requested;
  return null;
}

function typeRoot(asset: CatalogAssetMeta): string | null {
  const folder = TYPE_DIR[asset.type];
  if (!folder) return null;
  return join(CATALOG_DIR, folder, asset.id);
}

function versionDirExists(asset: CatalogAssetMeta, version: string): boolean {
  const root = typeRoot(asset);
  if (!root) return false;
  return existsSync(join(root, version));
}

function listOnDiskVersions(asset: CatalogAssetMeta): string[] {
  const root = typeRoot(asset);
  if (!root || !existsSync(root)) return [];
  return readdirSync(root)
    .filter((e) => /^\d+\.\d+\.\d+$/.test(e) && statSync(join(root, e)).isDirectory())
    .sort((a, b) => {
      const pa = a.split(".").map(Number);
      const pb = b.split(".").map(Number);
      for (let i = 0; i < 3; i++) {
        if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) - (pb[i] ?? 0);
      }
      return 0;
    });
}

function resolveVersionDir(asset: CatalogAssetMeta, version: string): string | null {
  const root = typeRoot(asset);
  if (!root) return null;
  const exact = join(root, version);
  if (existsSync(exact)) return exact;
  return null;
}

function loadFromVersionDir(
  asset: CatalogAssetMeta,
  version: string,
  framework: string
): { manifest: Record<string, unknown>; files: Record<string, string> } | null {
  const versionDir = resolveVersionDir(asset, version);
  if (!versionDir) return null;

  // Theme-universal: catalog/{type}/<id>/<ver>/manifest.json (+ files.json)
  const moduleManifest = join(versionDir, "manifest.json");
  if (existsSync(moduleManifest)) {
    const manifest = JSON.parse(readFileSync(moduleManifest, "utf-8")) as Record<string, unknown>;
    const delivery = String(manifest.delivery ?? "module");
    if (delivery === "module") {
      return {
        manifest: { ...manifest, version, delivery: "module" },
        files: {},
      };
    }
    // Flat server-package (all themes / templates)
    const filesPath = join(versionDir, "files.json");
    const files: Record<string, string> = existsSync(filesPath)
      ? JSON.parse(readFileSync(filesPath, "utf-8"))
      : {};
    if (Object.keys(files).length > 0 && !files["index.js"]) {
      throw new Error(`Asset '${asset.id}@${version}' must ship compiled index.js only.`);
    }
    return {
      manifest: { ...manifest, version, delivery: "server-package" },
      files,
    };
  }

  // Legacy: catalog/{type}/<id>/<ver>/<framework>/{manifest,files}.json
  const fwCandidates = [
    join(versionDir, framework),
    join(versionDir, "nextjs-compact"),
    ...((asset.templates ?? []).map((t) => join(versionDir, t))),
  ];

  for (const fwDir of fwCandidates) {
    if (!existsSync(join(fwDir, "manifest.json"))) continue;
    const manifest = JSON.parse(readFileSync(join(fwDir, "manifest.json"), "utf-8")) as Record<
      string,
      unknown
    >;
    const delivery = String(manifest.delivery ?? "server-package");
    if (delivery === "module") {
      return { manifest: { ...manifest, version, delivery: "module" }, files: {} };
    }
    const filesPath = join(fwDir, "files.json");
    const files: Record<string, string> = existsSync(filesPath)
      ? JSON.parse(readFileSync(filesPath, "utf-8"))
      : {};
    if (!files["index.js"]) {
      throw new Error(`Asset '${asset.id}@${version}' must ship compiled index.js only.`);
    }
    return {
      manifest: { ...manifest, version, delivery: "server-package" },
      files,
    };
  }

  return null;
}

/** Legacy flat layout: catalog/<id>/<framework>/ */
function loadLegacyPayload(
  assetId: string,
  framework: string,
  version: string
): { manifest: Record<string, unknown>; files: Record<string, string> } | null {
  const candidates = [
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
      manifest: { ...manifest, version, delivery: "module" },
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
    manifest: { ...manifest, version, delivery: "server-package" },
    files,
  };
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

  // Prefer typed versioned layout from catalog:release
  const fromTyped = loadFromVersionDir(asset, resolved, framework);
  if (fromTyped) return fromTyped;

  // Free module fallback from catalog.json metadata (no on-disk snapshot yet)
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

  return loadLegacyPayload(assetId, framework, resolved);
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
  const onDisk = listOnDiskVersions(a);
  const mergedHistory = [...history];
  for (const v of onDisk) {
    if (!mergedHistory.some((h) => h.version === v)) {
      mergedHistory.push({ version: v });
    }
  }
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
      history: mergedHistory,
    },
    dependencies: a.dependencies ?? [],
    peerDependencies: a.peerDependencies,
    requires: a.requires,
    tags: a.tags ?? [],
    delivery: a.delivery ?? (a.tier === "free" ? "module" : "server-package"),
    exportName: a.exportName,
    package: a.package,
    route: a.route,
  };
}
