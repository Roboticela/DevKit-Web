import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { authRouter } from "./routes/auth.js";
import { projectsRouter } from "./routes/projects.js";
import { licensesRouter } from "./routes/licenses.js";
import { assetsRouter } from "./routes/assets.js";
import { templatesRouter } from "./routes/templates.js";
import { themesRouter } from "./routes/themes.js";
import { healthRouter } from "./routes/health.js";
import { errorHandler } from "./middleware/auth.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "25mb" }));

  app.use(
    "/auth",
    rateLimit({ windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true }),
    authRouter
  );

  app.use(
    "/projects",
    rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true }),
    projectsRouter
  );

  app.use(
    "/licenses",
    rateLimit({ windowMs: 60 * 1000, max: 60, standardHeaders: true }),
    licensesRouter
  );

  app.use(
    "/assets",
    rateLimit({ windowMs: 60 * 1000, max: 200, standardHeaders: true }),
    assetsRouter
  );

  app.use(
    "/templates",
    rateLimit({ windowMs: 60 * 1000, max: 60, standardHeaders: true }),
    templatesRouter
  );

  app.use(
    "/themes",
    rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true }),
    themesRouter
  );

  app.use("/health", healthRouter);

  app.use(errorHandler);

  return app;
}
