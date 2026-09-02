import { existsSync } from "fs";
import { join } from "path";

/** Resolve theme CSS path from server meta or common conventions. */
export function resolveThemeCssPath(
  cwd: string,
  cssPathFromServer?: string | null
): string {
  if (cssPathFromServer) return join(cwd, cssPathFromServer);
  const candidates = ["app/globals.css", "src/index.css", "src/globals.css", "styles/globals.css"];
  for (const rel of candidates) {
    if (existsSync(join(cwd, rel))) return join(cwd, rel);
  }
  return join(cwd, "app/globals.css");
}

export function resolveThemeCssDir(cwd: string, cssPathFromServer?: string | null): string {
  const full = resolveThemeCssPath(cwd, cssPathFromServer);
  if (full.includes(`${join("app", "")}`) || full.replace(/\\/g, "/").includes("/app/")) return "app";
  return "src";
}
