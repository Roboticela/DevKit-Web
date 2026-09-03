import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { apiFetch, getApiBaseUrl } from "./api-client.js";
import { log } from "./logger.js";
import { parseIdAtVersion } from "./id-version.js";

export interface RemoteTemplate {
  id: string;
  version: string;
  latestVersion?: string;
  label: string;
  hint: string;
  cssPath?: string | null;
  installTargets?: Array<"root" | "server">;
  versions?: {
    latest: string;
    history?: Array<{ version: string; releasedAt?: string; notes?: string }>;
  };
}

/** Live template names + descriptions from DevKit server. */
export async function listTemplates(): Promise<RemoteTemplate[]> {
  const data = await apiFetch<{ templates: RemoteTemplate[] }>("/templates", {
    apiUrl: getApiBaseUrl(),
  });
  if (!data.templates?.length) {
    throw new Error(
      "Server returned no templates. Add folders with template.json under the server templates root."
    );
  }
  return data.templates;
}

export async function getTemplate(templateId: string): Promise<RemoteTemplate> {
  const { id } = parseIdAtVersion(templateId);
  const data = await apiFetch<{ template: RemoteTemplate; availableVersions?: string[] }>(
    `/templates/${encodeURIComponent(id)}`,
    { apiUrl: getApiBaseUrl() }
  );
  return data.template;
}

/**
 * Download a first-party template from the server and write it to destDir,
 * applying {{PLACEHOLDER}} substitutions.
 * `templateId` may be `id` or `id@version` (same as `devkit add button@1.0.1`).
 */
export async function downloadTemplate(
  templateId: string,
  destDir: string,
  vars: {
    projectName: string;
    siteName: string;
    siteUrl: string;
    siteDescription?: string;
  },
  versionOverride?: string
): Promise<RemoteTemplate & { writtenFiles: Record<string, string> }> {
  const { id, version: fromSpec } = parseIdAtVersion(templateId);
  const version = versionOverride ?? fromSpec;
  const qs = version && version !== "latest" ? `?version=${encodeURIComponent(version)}` : "";

  log.step(
    `Fetching template '${id}'${version && version !== "latest" ? `@${version}` : ""} from ${getApiBaseUrl()}…`
  );

  const data = await apiFetch<{
    templateId: string;
    version: string;
    label: string;
    hint: string;
    cssPath?: string | null;
    installTargets?: Array<"root" | "server">;
    fileCount: number;
    files: Record<string, string>;
  }>(`/templates/${encodeURIComponent(id)}/files${qs}`, {
    apiUrl: getApiBaseUrl(),
  });

  if (!data.files || Object.keys(data.files).length === 0) {
    throw new Error(`Server returned an empty template for '${id}'.`);
  }

  const slug = vars.projectName.toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const replacements: Record<string, string> = {
    PROJECT_NAME: vars.projectName,
    PROJECT_SLUG: slug,
    SITE_NAME: vars.siteName,
    SITE_URL: vars.siteUrl,
    SITE_DESCRIPTION: vars.siteDescription ?? `${vars.siteName} — built with Roboticela DevKit`,
  };

  mkdirSync(destDir, { recursive: true });

  const writtenFiles: Record<string, string> = {};
  for (const [relPath, raw] of Object.entries(data.files)) {
    let content = raw;
    for (const [key, val] of Object.entries(replacements)) {
      content = content.replaceAll(`{{${key}}}`, val);
    }
    const dest = join(destDir, relPath);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, content);
    writtenFiles[relPath.replace(/\\/g, "/")] = content;
  }

  log.step(`Wrote ${Object.keys(data.files).length} files · ${data.label} @${data.version}`);

  return {
    id: data.templateId,
    version: data.version,
    label: data.label,
    hint: data.hint,
    cssPath: data.cssPath,
    installTargets: data.installTargets,
    writtenFiles,
  };
}
