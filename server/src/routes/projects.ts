import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { generateProjectId } from "../lib/crypto.js";
import { ApiError, assertFound } from "../lib/errors.js";
import { requireAuth, requireProjectAccess, type AuthedRequest } from "../middleware/auth.js";
import { auditLog } from "../middleware/audit.js";
import { param } from "../lib/params.js";

export const projectsRouter = Router();

projectsRouter.use(requireAuth);

projectsRouter.post("/", async (req: AuthedRequest, res, next) => {
  try {
    const body = z.object({
      name: z.string().min(1).max(128),
      slug: z.string().min(1).max(64).regex(/^[a-z0-9-]+$/),
      template: z.enum(["nextjs-compact", "vite-express-tauri"]),
      installationId: z.string().optional(),
    }).parse(req.body);

    const existing = await prisma.project.findUnique({
      where: { ownerId_slug: { ownerId: req.userId!, slug: body.slug } },
    });
    if (existing) throw new ApiError("A project with this slug already exists.", 409, "CONFLICT");

    const project = await prisma.project.create({
      data: {
        id: generateProjectId(),
        name: body.name,
        slug: body.slug,
        template: body.template,
        installationId: body.installationId ?? undefined,
        ownerId: req.userId!,
        license: { create: { status: "pending" } },
        members: { create: { userId: req.userId!, role: "owner" } },
      },
      include: { license: true },
    });

    await auditLog(req, "project.create", project.id, { slug: body.slug, template: body.template });
    res.status(201).json({ project });
  } catch (e) {
    next(e);
  }
});

projectsRouter.get("/", async (req: AuthedRequest, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { ownerId: req.userId! },
          { members: { some: { userId: req.userId! } } },
        ],
      },
      include: { license: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ projects });
  } catch (e) {
    next(e);
  }
});

projectsRouter.get("/:projectId", requireProjectAccess, async (req, res, next) => {
  try {
    const project = (req as AuthedRequest & { project: unknown }).project;
    res.json({ project });
  } catch (e) {
    next(e);
  }
});

projectsRouter.get("/:projectId/license", requireProjectAccess, async (req, res, next) => {
  try {
    const project = assertFound(
      await prisma.project.findUnique({
        where: { id: param(req.params.projectId) },
        include: { license: true },
      }),
      "Project not found."
    );
    res.json({
      projectId: project.id,
      license: project.license,
      active: project.license?.status === "active",
      priceUsd: 50,
      priceCents: 5000,
    });
  } catch (e) {
    next(e);
  }
});

projectsRouter.post("/:projectId/validate", requireProjectAccess, async (req: AuthedRequest, res, next) => {
  try {
    const project = assertFound(
      await prisma.project.findUnique({
        where: { id: param(req.params.projectId) },
        include: { license: true },
      }),
      "Project not found."
    );

    res.json({
      valid: true,
      projectId: project.id,
      installationId: project.installationId,
      template: project.template,
      license: {
        status: project.license?.status ?? "pending",
        active: project.license?.status === "active",
      },
    });
  } catch (e) {
    next(e);
  }
});
