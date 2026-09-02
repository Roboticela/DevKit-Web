import { Router } from "express";
import { z } from "zod";
import type { AssetType } from "@prisma/client";
import {
  listCatalogAssets,
  getCatalogAsset,
  loadAssetPayload,
  buildSignedManifest,
  serializeCatalogAsset,
  getCatalogVersion,
  resolveAssetVersion,
} from "../lib/catalog.js";
import { getPublicVerificationKey } from "../lib/crypto.js";
import { ApiError } from "../lib/errors.js";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireProjectAccess, type AuthedRequest } from "../middleware/auth.js";
import { auditLog } from "../middleware/audit.js";
import { param } from "../lib/params.js";

export const assetsRouter = Router();

/** Public: verification key for CLI manifest checks */
assetsRouter.get("/verify-key", (_req, res) => {
  res.json({ publicKey: getPublicVerificationKey(), algorithm: "RSA-SHA256" });
});

/** Authenticated: list catalog metadata only (no bulk file download) */
assetsRouter.get("/", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const query = z.object({
      type: z.enum(["component", "section", "page", "scaffold"]).optional(),
      tier: z.enum(["free", "premium"]).optional(),
      template: z.string().optional(),
    }).parse(req.query);

    const assets = listCatalogAssets({
      type: query.type as AssetType | undefined,
      tier: query.tier,
      template: query.template,
    });

    res.json({
      catalogVersion: getCatalogVersion(),
      assets: assets.map(serializeCatalogAsset),
    });
  } catch (e) {
    next(e);
  }
});

/** Authenticated: install payload (free module metadata or premium package via access). */
assetsRouter.get("/:assetId/payload", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const assetId = param(req.params.assetId);
    const framework = String(req.query.framework ?? "nextjs-compact");
    const version = String(req.query.version ?? "latest");
    const asset = getCatalogAsset(assetId);
    if (!asset) throw new ApiError("Asset not found.", 404, "NOT_FOUND");

    if (asset.tier === "premium") {
      throw new ApiError(
        "Premium assets require licensed project access. Use the project access endpoint.",
        403,
        "LICENSE_REQUIRED"
      );
    }

    const payload = loadAssetPayload(assetId!, framework, version);
    if (!payload) {
      const resolved = asset ? resolveAssetVersion(asset, version) : null;
      if (!resolved) {
        throw new ApiError(
          `Version '${version}' is not published for '${assetId}'.`,
          404,
          "VERSION_NOT_FOUND"
        );
      }
      throw new ApiError(`No payload for '${assetId}'.`, 404, "PAYLOAD_NOT_FOUND");
    }

    res.json({
      assetId,
      framework,
      tier: asset.tier,
      version: payload.manifest.version,
      ...payload,
    });
  } catch (e) {
    next(e);
  }
});

/** Authenticated: single asset metadata */
assetsRouter.get("/:assetId", requireAuth, async (req, res, next) => {
  try {
    const asset = getCatalogAsset(param(req.params.assetId));
    if (!asset) throw new ApiError("Asset not found.", 404, "NOT_FOUND");
    res.json({ asset: serializeCatalogAsset(asset) });
  } catch (e) {
    next(e);
  }
});

/** Premium asset access — requires project license */
assetsRouter.post(
  "/projects/:projectId/assets/:assetId/access",
  requireAuth,
  requireProjectAccess,
  async (req: AuthedRequest, res, next) => {
    try {
      const { projectId: rawProjectId, assetId: rawAssetId } = req.params;
      const projectId = param(rawProjectId);
      const assetId = param(rawAssetId);
      const body = z.object({
        framework: z.string().min(1),
        version: z.string().default("latest"),
      }).parse(req.body);

      const asset = getCatalogAsset(assetId!);
      if (!asset) throw new ApiError("Asset not found.", 404, "NOT_FOUND");

      if (!asset.templates.includes(body.framework)) {
        throw new ApiError(
          `Asset '${assetId}' is not compatible with template '${body.framework}'.`,
          400,
          "INCOMPATIBLE"
        );
      }

      if (asset.tier === "premium") {
        const project = await prisma.project.findUnique({
          where: { id: projectId },
          include: { license: true },
        });
        if (!project?.license || project.license.status !== "active") {
          throw new ApiError(
            "Premium asset requires an active project license ($50 one-time).",
            403,
            "LICENSE_REQUIRED"
          );
        }
      }

      const payload = loadAssetPayload(assetId!, body.framework, body.version);
      if (!payload) {
        throw new ApiError(
          `No payload for '${assetId}' on framework '${body.framework}'.`,
          404,
          "PAYLOAD_NOT_FOUND"
        );
      }

      const signed = buildSignedManifest(assetId!, body.framework, payload.manifest, payload.files);

      await prisma.projectAsset.upsert({
        where: { projectId_assetId: { projectId: projectId!, assetId: assetId! } },
        create: {
          projectId: projectId!,
          assetId: assetId!,
          version: String(payload.manifest.version ?? body.version),
          framework: body.framework,
        },
        update: {
          version: String(payload.manifest.version ?? body.version),
          framework: body.framework,
          installedAt: new Date(),
        },
      });

      await auditLog(req, "asset.access", assetId, { projectId, framework: body.framework });

      res.json({ authorized: true, package: signed });
    } catch (e) {
      next(e);
    }
  }
);

assetsRouter.get(
  "/projects/:projectId/assets/:assetId/manifest",
  requireAuth,
  requireProjectAccess,
  async (req, res, next) => {
    try {
      const assetId = param(req.params.assetId);
      const framework = String(req.query.framework ?? "");
      const asset = getCatalogAsset(assetId);
      if (!asset) throw new ApiError("Asset not found.", 404, "NOT_FOUND");
      res.json({
        asset: {
          id: asset.id,
          type: asset.type,
          tier: asset.tier,
          latestVersion: asset.latestVersion,
          templates: asset.templates,
          dependencies: asset.dependencies ?? [],
        },
        framework,
      });
    } catch (e) {
      next(e);
    }
  }
);
