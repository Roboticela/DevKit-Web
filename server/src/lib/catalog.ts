import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type { AssetTier, AssetType } from "@prisma/client";
import { signPayload, sha256 } from "../lib/crypto.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATALOG_DIR = join(__dirname, "..", "..", "catalog");

export interface CatalogAssetMeta {
  id: string;
  type: AssetType;
  tier: AssetTier;
  displayName: string;
  description: string;
  category: string;
  templates: string[];
  latestVersion: string;
  dependencies?: string[];
  tags?: string[];
}

interface CatalogFile {
  version: string;
  assets: CatalogAssetMeta[];
}

function readCatalog(): CatalogFile {
  const path = join(CATALOG_DIR, "catalog.json");
  if (!existsSync(path)) {
    return { version: "1.0.0", assets: [] };
  }
  return JSON.parse(readFileSync(path, "utf-8")) as CatalogFile;
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

export function loadAssetPayload(
  assetId: string,
  framework: string,
  version = "latest"
): { manifest: Record<string, unknown>; files: Record<string, string> } | null {
  let assetDir = join(CATALOG_DIR, assetId, framework);
  if (!existsSync(join(assetDir, "manifest.json"))) {
    assetDir = join(CATALOG_DIR, assetId, "nextjs-compact");
  }
  if (!existsSync(assetDir)) return null;

  const manifestPath = join(assetDir, "manifest.json");
  if (!existsSync(manifestPath)) return null;

  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as Record<string, unknown>;
  const filesPath = join(assetDir, "files.json");
  const files: Record<string, string> = existsSync(filesPath)
    ? JSON.parse(readFileSync(filesPath, "utf-8"))
    : {};

  // Reject legacy source delivery (TSX copies)
  for (const content of Object.values(files)) {
    if (content.includes(".tsx") && content.includes("export function")) {
      throw new Error(`Asset '${assetId}' uses deprecated source delivery. Rebuild as server-package.`);
    }
  }
  if (Object.keys(files).length > 0 && !files["index.js"]) {
    throw new Error(`Asset '${assetId}' must ship compiled index.js only.`);
  }

  return { manifest: { ...manifest, version: manifest.version ?? version, delivery: "server-package" }, files };
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
