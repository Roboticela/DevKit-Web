import { Router } from "express";
import {
  getTemplateMeta,
  listTemplates,
  listTemplateVersions,
  loadTemplateFiles,
  resolveTemplateVersion,
} from "../lib/templates.js";
import { ApiError } from "../lib/errors.js";
import { param } from "../lib/params.js";

export const templatesRouter = Router();

function serializeTemplate(t: NonNullable<ReturnType<typeof getTemplateMeta>>) {
  const latest = t.versions?.latest ?? t.latestVersion ?? t.version;
  return {
    id: t.id,
    version: latest,
    latestVersion: latest,
    label: t.label,
    hint: t.hint,
    cssPath: t.cssPath ?? null,
    installTargets: t.installTargets ?? ["root"],
    versions: t.versions ?? { latest, history: [{ version: latest }] },
  };
}

/** Public — CLI loads names, versions, and descriptions live (no CLI republish). */
templatesRouter.get("/", (_req, res) => {
  const templates = listTemplates().map(serializeTemplate);
  res.json({ templates, updatedAt: new Date().toISOString() });
});

templatesRouter.get("/:templateId", (req, res, next) => {
  try {
    const id = param(req.params.templateId);
    const meta = getTemplateMeta(id);
    if (!meta) throw new ApiError("Template not found.", 404, "NOT_FOUND");
    res.json({
      template: serializeTemplate(meta),
      availableVersions: listTemplateVersions(id),
    });
  } catch (e) {
    next(e);
  }
});

templatesRouter.get("/:templateId/versions", (req, res, next) => {
  try {
    const id = param(req.params.templateId);
    if (!getTemplateMeta(id)) throw new ApiError("Template not found.", 404, "NOT_FOUND");
    res.json({ templateId: id, versions: listTemplateVersions(id) });
  } catch (e) {
    next(e);
  }
});

/** Public download of scaffold files (variable placeholders intact). ?version= like packages. */
templatesRouter.get("/:templateId/files", (req, res, next) => {
  try {
    const id = param(req.params.templateId);
    const version = req.query.version ? String(req.query.version) : undefined;
    const resolved = resolveTemplateVersion(id, version);
    if (!resolved) {
      const available = listTemplateVersions(id);
      throw new ApiError(
        available.length
          ? `Template '${id}' version '${version}' not found. Available: ${available.join(", ")}`
          : `Template '${id}' not found.`,
        404,
        "VERSION_NOT_FOUND"
      );
    }

    const loaded = loadTemplateFiles(id, resolved);
    if (!loaded) throw new ApiError("Template files not found on server.", 404, "NOT_FOUND");

    const { files, meta } = loaded;
    res.json({
      templateId: id,
      version: meta.version,
      label: meta.label,
      hint: meta.hint,
      cssPath: meta.cssPath ?? null,
      installTargets: meta.installTargets ?? ["root"],
      fileCount: Object.keys(files).length,
      files,
    });
  } catch (e) {
    next(e);
  }
});
