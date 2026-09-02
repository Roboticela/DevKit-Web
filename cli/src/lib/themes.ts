import { apiFetch, getApiBaseUrl, DOCS_BASE_URL } from "./api-client.js";

export interface RemoteTheme {
  id: string;
  label: string;
  hint: string;
  primary: string;
  secondary: string;
  radius: string;
  previewUrl: string;
}

/** Live theme presets from the DevKit API. */
export async function listThemes(): Promise<RemoteTheme[]> {
  const data = await apiFetch<{ themes: RemoteTheme[]; previewBaseUrl?: string }>("/themes", {
    apiUrl: getApiBaseUrl(),
  });
  if (!data.themes?.length) {
    throw new Error("Server returned no themes. Add entries to server/catalog/themes.json.");
  }
  return data.themes;
}

export async function getTheme(themeId: string): Promise<RemoteTheme> {
  const data = await apiFetch<{ theme: RemoteTheme }>(
    `/themes/${encodeURIComponent(themeId)}`,
    { apiUrl: getApiBaseUrl() }
  );
  return data.theme;
}

/** Browser studio on the docs site (devkit.roboticela.com/theme?theme=…). */
export function themeStudioUrl(themeId?: string): string {
  const base = `${DOCS_BASE_URL}/theme`;
  if (!themeId) return base;
  return `${base}?theme=${encodeURIComponent(themeId)}`;
}

/** API redirect that lands on the public theme studio. */
export function themePreviewApiUrl(themeId: string): string {
  return `${getApiBaseUrl().replace(/\/$/, "")}/themes/${encodeURIComponent(themeId)}/preview`;
}
