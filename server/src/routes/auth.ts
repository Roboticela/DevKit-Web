import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { generateDeviceCode, generateToken, generateUserCode } from "../lib/crypto.js";
import { signAccessToken, signRefreshToken, parseExpiresInMs, verifyRefreshToken } from "../lib/jwt.js";
import { env } from "../config.js";
import { ApiError } from "../lib/errors.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";
import { auditLog } from "../middleware/audit.js";

export const authRouter = Router();

const DEVICE_EXPIRY_MS = 15 * 60 * 1000;

authRouter.post("/device", async (req, res, next) => {
  try {
    const deviceCode = generateDeviceCode();
    const userCode = generateUserCode();
    const expiresAt = new Date(Date.now() + DEVICE_EXPIRY_MS);

    await prisma.device.create({
      data: { deviceCode, userCode, expiresAt, status: "pending" },
    });

    res.json({
      deviceCode,
      userCode,
      verificationUri: `${env.DEVICE_AUTH_BASE_URL}/${userCode}`,
      expiresIn: DEVICE_EXPIRY_MS / 1000,
      interval: 5,
    });
  } catch (e) {
    next(e);
  }
});

authRouter.post("/device/approve", async (req, res, next) => {
  try {
    const body = z.object({
      userCode: z.string().min(1),
      email: z.string().email(),
      name: z.string().optional(),
    }).parse(req.body);

    const device = await prisma.device.findUnique({ where: { userCode: body.userCode } });
    if (!device || device.status !== "pending" || device.expiresAt < new Date()) {
      throw new ApiError("Device authorization expired or invalid.", 400, "DEVICE_EXPIRED");
    }

    let user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      user = await prisma.user.create({
        data: { email: body.email, name: body.name ?? body.email.split("@")[0] },
      });
    }

    await prisma.device.update({
      where: { id: device.id },
      data: { userId: user.id, status: "approved", approvedAt: new Date() },
    });

    res.json({ ok: true, message: "Device approved." });
  } catch (e) {
    next(e);
  }
});

authRouter.post("/token", async (req, res, next) => {
  try {
    const body = z.object({
      deviceCode: z.string().min(1),
      grantType: z.literal("device_code").default("device_code"),
    }).parse(req.body);

    const device = await prisma.device.findUnique({ where: { deviceCode: body.deviceCode } });
    if (!device) throw new ApiError("Invalid device code.", 400, "INVALID_DEVICE");
    if (device.expiresAt < new Date()) throw new ApiError("Device code expired.", 400, "DEVICE_EXPIRED");
    if (device.status !== "approved" || !device.userId) {
      throw new ApiError("Authorization pending.", 428, "AUTHORIZATION_PENDING");
    }

    const user = await prisma.user.findUnique({ where: { id: device.userId } });
    if (!user) throw new ApiError("User not found.", 404, "NOT_FOUND");

    const refreshJti = generateToken(16);
    const refreshExpires = new Date(Date.now() + parseExpiresInMs(env.JWT_REFRESH_EXPIRES));

    await prisma.refreshToken.create({
      data: { userId: user.id, token: refreshJti, expiresAt: refreshExpires },
    });

    await prisma.device.update({ where: { id: device.id }, data: { status: "consumed" } });

    res.json({
      accessToken: signAccessToken(user.id, user.email),
      refreshToken: signRefreshToken(user.id, refreshJti),
      expiresIn: parseExpiresInMs(env.JWT_ACCESS_EXPIRES) / 1000,
      tokenType: "Bearer",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (e) {
    next(e);
  }
});

authRouter.post("/refresh", async (req, res, next) => {
  try {
    const body = z.object({ refreshToken: z.string().min(1) }).parse(req.body);
    const payload = verifyRefreshToken(body.refreshToken);

    const stored = await prisma.refreshToken.findUnique({ where: { token: payload.jti } });
    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
      throw new ApiError("Refresh token invalid or expired.", 401, "UNAUTHORIZED");
    }

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) throw new ApiError("User not found.", 404, "NOT_FOUND");

    res.json({
      accessToken: signAccessToken(user.id, user.email),
      expiresIn: parseExpiresInMs(env.JWT_ACCESS_EXPIRES) / 1000,
      tokenType: "Bearer",
    });
  } catch (e) {
    next(e);
  }
});

authRouter.post("/logout", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const body = z.object({ refreshToken: z.string().optional() }).parse(req.body ?? {});
    if (body.refreshToken) {
      try {
        const payload = verifyRefreshToken(body.refreshToken);
        await prisma.refreshToken.updateMany({
          where: { token: payload.jti, userId: req.userId },
          data: { revoked: true },
        });
      } catch {
        /* ignore invalid refresh on logout */
      }
    }
    await auditLog(req, "auth.logout");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

authRouter.get("/me", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { id: true, email: true, name: true, createdAt: true },
    });
    res.json({ user });
  } catch (e) {
    next(e);
  }
});
