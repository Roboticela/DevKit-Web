import { createVerify } from "crypto";
import { getApiBaseUrl, apiFetch } from "./api-client.js";
import { readSession, isSessionValid } from "./auth-store.js";
import { cliBinName } from "./cli-meta.js";

let cachedPublicKey: string | null = null;

export interface SignedAssetPackage {
  id: string;
  framework: string;
  version: unknown;
  manifest: Record<string, unknown>;
  files: Record<string, string>;
  integrity: string;
  signature: string;
  issuedAt: string;
}

export async function fetchVerificationKey(): Promise<string> {
  if (cachedPublicKey) return cachedPublicKey;
  const data = await apiFetch<{ publicKey: string }>("/assets/verify-key");
  cachedPublicKey = data.publicKey;
  return cachedPublicKey;
}

export function verifySignedPackage(pkg: SignedAssetPackage, publicKey: string): boolean {
  const { signature, ...rest } = pkg;
  const payload = JSON.stringify({
    id: rest.id,
    framework: rest.framework,
    version: rest.version,
    manifest: rest.manifest,
    files: rest.files,
    integrity: rest.integrity,
    issuedAt: rest.issuedAt,
  });
  try {
    const verify = createVerify("RSA-SHA256");
    verify.update(payload);
    verify.end();
    return verify.verify(publicKey, signature, "base64");
  } catch {
    return false;
  }
}

export async function requestPremiumAsset(
  projectId: string,
  assetId: string,
  framework: string,
  version = "latest"
): Promise<SignedAssetPackage> {
  const session = readSession();
  if (!isSessionValid(session)) {
    throw new Error(`Authentication required. Run '${cliBinName()} login'.`);
  }

  const res = await apiFetch<{ authorized: boolean; package: SignedAssetPackage }>(
    `/assets/projects/${projectId}/assets/${assetId}/access`,
    {
      method: "POST",
      token: session!.accessToken,
      apiUrl: session!.apiUrl ?? getApiBaseUrl(),
      body: { framework, version },
    }
  );

  const publicKey = await fetchVerificationKey();
  if (!verifySignedPackage(res.package, publicKey)) {
    throw new Error("Asset signature verification failed. Installation rejected.");
  }

  return res.package;
}

export interface ServerCatalogAsset {
  id: string;
  type: "component" | "section" | "page" | "scaffold";
  tier: "free" | "premium";
  displayName: string;
  description: string;
  category: string;
  templates: string[];
  latestVersion: string;
  versions?: {
    latest: string;
    history: Array<{ version: string; releasedAt?: string; notes?: string }>;
  };
  dependencies: string[];
  tags: string[];
  delivery?: "module" | "server-package";
  exportName?: string;
  package?: string;
}

export async function listServerAssets(filters?: {
  type?: string;
  tier?: string;
  template?: string;
}): Promise<ServerCatalogAsset[]> {
  const session = readSession();
  if (!isSessionValid(session)) {
    throw new Error(`Authentication required. Run '${cliBinName()} login'.`);
  }

  const params = new URLSearchParams();
  if (filters?.type) params.set("type", filters.type);
  if (filters?.tier) params.set("tier", filters.tier);
  if (filters?.template) params.set("template", filters.template);

  const qs = params.toString();
  const data = await apiFetch<{ assets: ServerCatalogAsset[] }>(
    `/assets${qs ? `?${qs}` : ""}`,
    { token: session!.accessToken, apiUrl: session!.apiUrl ?? getApiBaseUrl() }
  );
  return data.assets;
}

/** Free (module) asset install metadata from server — realtime, not CLI-bundled. */
export async function fetchFreeAssetPayload(
  assetId: string,
  framework: string,
  version = "latest"
): Promise<{ manifest: Record<string, unknown>; files: Record<string, string> }> {
  const session = readSession();
  if (!isSessionValid(session)) {
    throw new Error(`Authentication required. Run '${cliBinName()} login'.`);
  }

  const params = new URLSearchParams({ framework, version });
  return apiFetch<{ manifest: Record<string, unknown>; files: Record<string, string> }>(
    `/assets/${encodeURIComponent(assetId)}/payload?${params}`,
    { token: session!.accessToken, apiUrl: session!.apiUrl ?? getApiBaseUrl() }
  );
}
