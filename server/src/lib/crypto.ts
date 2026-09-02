import { createHash, createSign, createVerify, generateKeyPairSync, randomBytes } from "crypto";
import { env } from "../config.js";

let cachedKeyPair: { publicKey: string; privateKey: string } | null = null;

function getKeyPair(): { publicKey: string; privateKey: string } {
  if (env.ASSET_SIGNING_PRIVATE_KEY && env.ASSET_SIGNING_PUBLIC_KEY) {
    return {
      privateKey: env.ASSET_SIGNING_PRIVATE_KEY,
      publicKey: env.ASSET_SIGNING_PUBLIC_KEY,
    };
  }
  if (!cachedKeyPair) {
    cachedKeyPair = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });
  }
  return cachedKeyPair;
}

export function sha256(data: string | Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

export function signPayload(payload: string): string {
  const { privateKey } = getKeyPair();
  const sign = createSign("RSA-SHA256");
  sign.update(payload);
  sign.end();
  return sign.sign(privateKey, "base64");
}

export function verifySignature(payload: string, signature: string): boolean {
  try {
    const { publicKey } = getKeyPair();
    const verify = createVerify("RSA-SHA256");
    verify.update(payload);
    verify.end();
    return verify.verify(publicKey, signature, "base64");
  } catch {
    return false;
  }
}

export function getPublicVerificationKey(): string {
  return getKeyPair().publicKey;
}

export function generateProjectId(): string {
  return `proj_${randomBytes(12).toString("hex")}`;
}

export function generateDeviceCode(): string {
  return randomBytes(32).toString("base64url");
}

export function generateUserCode(): string {
  const chars = "BCDFGHJKLMNPQRSTVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function generateToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}
