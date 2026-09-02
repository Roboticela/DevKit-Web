import jwt from "jsonwebtoken";
import { env } from "../config.js";

export interface AccessTokenPayload {
  sub: string;
  email: string;
  type: "access";
}

export interface RefreshTokenPayload {
  sub: string;
  type: "refresh";
  jti: string;
}

export function signAccessToken(userId: string, email: string): string {
  return jwt.sign({ sub: userId, email, type: "access" } satisfies AccessTokenPayload, env.AUTH_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES as jwt.SignOptions["expiresIn"],
  });
}

export function signRefreshToken(userId: string, jti: string): string {
  return jwt.sign({ sub: userId, type: "refresh", jti } satisfies RefreshTokenPayload, env.AUTH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES as jwt.SignOptions["expiresIn"],
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const payload = jwt.verify(token, env.AUTH_SECRET) as AccessTokenPayload;
  if (payload.type !== "access") throw new Error("Invalid token type");
  return payload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  const payload = jwt.verify(token, env.AUTH_SECRET) as RefreshTokenPayload;
  if (payload.type !== "refresh") throw new Error("Invalid token type");
  return payload;
}

export function parseExpiresInMs(value: string): number {
  const match = value.match(/^(\d+)([smhdy])$/i);
  if (!match) return 100 * 365.25 * 24 * 60 * 60 * 1000; // forever default
  const n = parseInt(match[1]!, 10);
  const unit = match[2]!.toLowerCase();
  if (unit === "s") return n * 1000;
  if (unit === "m") return n * 60 * 1000;
  if (unit === "h") return n * 60 * 60 * 1000;
  if (unit === "d") return n * 24 * 60 * 60 * 1000;
  // years
  return n * 365.25 * 24 * 60 * 60 * 1000;
}
