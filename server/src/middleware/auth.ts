import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/jwt.js";
import { ApiError } from "../lib/errors.js";
import { param } from "../lib/params.js";
import { prisma } from "../lib/prisma.js";

export interface AuthedRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export async function requireAuth(req: AuthedRequest, _res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      throw new ApiError("Authentication required.", 401, "UNAUTHORIZED");
    }
    const token = header.slice(7);
    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) throw new ApiError("User not found.", 401, "UNAUTHORIZED");
    req.userId = user.id;
    req.userEmail = user.email;
    next();
  } catch (e) {
    if (e instanceof ApiError) return next(e);
    next(new ApiError("Invalid or expired token.", 401, "UNAUTHORIZED"));
  }
}

export async function requireProjectAccess(req: AuthedRequest, _res: Response, next: NextFunction) {
  try {
    const projectId = param(req.params.projectId ?? req.params.id);
    if (!projectId || !req.userId) {
      throw new ApiError("Project access denied.", 403, "FORBIDDEN");
    }
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        OR: [
          { ownerId: req.userId },
          { members: { some: { userId: req.userId } } },
        ],
      },
      include: { license: true },
    });
    if (!project) throw new ApiError("Project not found or access denied.", 404, "NOT_FOUND");
    (req as AuthedRequest & { project: typeof project }).project = project;
    next();
  } catch (e) {
    next(e);
  }
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message, code: err.code });
  }
  console.error(err);
  return res.status(500).json({ error: "Internal server error.", code: "INTERNAL" });
}
