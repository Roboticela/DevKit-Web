import { Router } from "express";
import { getTemplateMeta, listTemplates, loadTemplateFiles } from "../lib/templates.js";
import { ApiError } from "../lib/errors.js";
import { param } from "../lib/params.js";

export const templatesRouter = Router();

function serializeTemplate(t: NonNullable<ReturnType<typeof getTemplateMeta>>) {
  return {
    id: t.id,
    version: t.version,
    label: t.label,
    hint: t.hint,
    cssPath: t.cssPath ?? null,
    installTargets: t.installTargets ?? ["root"],
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
    res.json({ template: serializeTemplate(meta) });
  } catch (e) {
    next(e);
  }
});

/** Public download of scaffold files (variable placeholders intact). */
templatesRouter.get("/:templateId/files", (req, res, next) => {
  try {
    const id = param(req.params.templateId);
    const version = req.query.version ? String(req.query.version) : undefined;
    const meta = getTemplateMeta(id);
    const files = loadTemplateFiles(id);
    if (!meta || !files) throw new ApiError("Template files not found on server.", 404, "NOT_FOUND");
    if (version && version !== "latest" && version !== meta.version) {
      throw new ApiError(
        `Template '${id}' version '${version}' is not available (current: ${meta.version}).`,
        404,
        "VERSION_NOT_FOUND"
      );
    }
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
