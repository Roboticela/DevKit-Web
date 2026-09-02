import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { jsonMetadata } from "../lib/params.js";

export async function auditLog(
  req: Request & { userId?: string },
  action: string,
  resource?: string,
  metadata?: Record<string, unknown>
) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: req.userId,
        projectId: typeof req.params.projectId === "string" ? req.params.projectId : undefined,
        action,
        resource,
        metadata: metadata ? jsonMetadata(metadata) : undefined,
        ip: req.ip,
      },
    });
  } catch {
    /* non-blocking */
  }
}

export function withAudit(action: string, resource?: string) {
  return (req: Request & { userId?: string }, _res: Response, next: NextFunction) => {
    void auditLog(req, action, resource);
    next();
  };
}
