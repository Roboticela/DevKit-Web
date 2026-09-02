import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  let db = "unknown";
  try {
    await prisma.$queryRaw`SELECT 1`;
    db = "connected";
  } catch {
    db = "disconnected";
  }
  res.json({
    status: db === "connected" ? "ok" : "degraded",
    service: "roboticela-devkit-api",
    version: "1.0.0",
    database: db,
    timestamp: new Date().toISOString(),
  });
});
