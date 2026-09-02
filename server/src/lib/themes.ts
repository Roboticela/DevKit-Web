import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATALOG_DIR = join(__dirname, "..", "..", "catalog");

export interface ThemePreset {
  id: string;
  label: string;
  hint: string;
  primary: string;
  secondary: string;
  radius: "sharp" | "balanced" | "soft" | string;
}

interface ThemesFile {
  version: string;
  updatedAt?: string;
  previewBaseUrl?: string;
  themes: ThemePreset[];
}

const DEFAULT_PREVIEW_BASE = "https://devkit.roboticela.com/theme";

function readThemesFile(): ThemesFile {
  const path = join(CATALOG_DIR, "themes.json");
  if (!existsSync(path)) {
    return { version: "0.0.0", themes: [], previewBaseUrl: DEFAULT_PREVIEW_BASE };
  }
  return JSON.parse(readFileSync(path, "utf-8")) as ThemesFile;
}

export function getPreviewBaseUrl(): string {
  return (
    process.env.THEME_PREVIEW_BASE_URL?.replace(/\/$/, "") ||
    readThemesFile().previewBaseUrl ||
    DEFAULT_PREVIEW_BASE
  );
}

/** Public URL where users browse / try themes in the browser. */
export function themePreviewUrl(themeId: string): string {
  const base = getPreviewBaseUrl();
  const url = new URL(base.includes("://") ? base : `https://${base}`);
  url.searchParams.set("theme", themeId);
  return url.toString();
}

export function listThemes(): ThemePreset[] {
  return readThemesFile().themes.slice().sort((a, b) => a.label.localeCompare(b.label));
}

export function getTheme(id: string): ThemePreset | null {
  return listThemes().find((t) => t.id === id) ?? null;
}

export function serializeTheme(t: ThemePreset) {
  return {
    id: t.id,
    label: t.label,
    hint: t.hint,
    primary: t.primary,
    secondary: t.secondary,
    radius: t.radius,
    previewUrl: themePreviewUrl(t.id),
  };
}
