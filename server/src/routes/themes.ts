import { Router } from "express";
import { getTheme, listThemes, serializeTheme, themePreviewUrl } from "../lib/themes.js";
import { ApiError } from "../lib/errors.js";
import { param } from "../lib/params.js";

export const themesRouter = Router();

/** Public — CLI loads theme presets live from the server. */
themesRouter.get("/", (_req, res) => {
  const themes = listThemes().map(serializeTheme);
  res.json({
    themes,
    previewBaseUrl: themes[0]
      ? themePreviewUrl(themes[0].id).replace(/\?.*$/, "")
      : "https://devkit.roboticela.com/theme",
    updatedAt: new Date().toISOString(),
  });
});

themesRouter.get("/:themeId", (req, res, next) => {
  try {
    const id = param(req.params.themeId);
    const theme = getTheme(id);
    if (!theme) throw new ApiError("Theme not found.", 404, "NOT_FOUND");
    res.json({ theme: serializeTheme(theme) });
  } catch (e) {
    next(e);
  }
});

/**
 * Redirect to the public theme studio on devkit.roboticela.com
 * so users can preview / try the selected theme in the browser.
 */
themesRouter.get("/:themeId/preview", (req, res, next) => {
  try {
    const id = param(req.params.themeId);
    const theme = getTheme(id);
    if (!theme) throw new ApiError("Theme not found.", 404, "NOT_FOUND");
    res.redirect(302, themePreviewUrl(id));
  } catch (e) {
    next(e);
  }
});
