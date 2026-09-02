import { randomBytes } from "crypto";
import { readConfig, writeConfig, type DevKitConfig } from "./config.js";
import { apiFetch } from "./api-client.js";
import { readSession, isSessionValid } from "./auth-store.js";
import { log } from "./logger.js";

export function generateInstallationId(): string {
  return `inst_${randomBytes(12).toString("hex")}`;
}

export function ensureProjectIdentity(cwd = process.cwd()): NonNullable<DevKitConfig["project"]> {
  const config = readConfig(cwd);
  if (!config.project) {
    config.project = { id: null, installationId: generateInstallationId() };
    writeConfig(config, cwd);
  } else if (!config.project.installationId) {
    config.project.installationId = generateInstallationId();
    writeConfig(config, cwd);
  }
  return config.project!;
}

export async function registerProjectWithServer(cwd = process.cwd()): Promise<string | null> {
  const session = readSession();
  if (!isSessionValid(session)) {
    log.warn("Not authenticated — run 'devkit auth login' to register project with DevKit server.");
    return null;
  }

  const config = readConfig(cwd);
  const project = ensureProjectIdentity(cwd);
  if (project.id) return project.id;

  const slug = config.site.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "my-app";

  const res = await apiFetch<{ project: { id: string; installationId: string } }>(
    "/projects",
    {
      method: "POST",
      token: session!.accessToken,
      apiUrl: session!.apiUrl,
      body: {
        name: config.site.name,
        slug,
        template: config.template,
        installationId: project.installationId,
      },
    }
  );

  config.project = {
    id: res.project.id,
    installationId: res.project.installationId ?? project.installationId ?? null,
    registeredAt: new Date().toISOString(),
  };
  writeConfig(config, cwd);
  return res.project.id;
}

export async function getProjectLicenseStatus(cwd = process.cwd()) {
  const session = readSession();
  if (!isSessionValid(session)) return null;

  const config = readConfig(cwd);
  if (!config.project?.id) return null;

  return apiFetch<{ active: boolean; status: string; priceUsd: number }>(
    `/licenses/${config.project.id}/status`,
    { token: session!.accessToken, apiUrl: session!.apiUrl }
  );
}
