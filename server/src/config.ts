import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().default("postgresql://postgres:postgres@localhost:5432/devkit"),
  AUTH_SECRET: z.string().default("devkit-dev-secret-change-in-production"),
  JWT_ACCESS_EXPIRES: z.string().default("15m"),
  JWT_REFRESH_EXPIRES: z.string().default("30d"),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PRICE_ID: z.string().optional(),
  LICENSE_PRICE_CENTS: z.coerce.number().default(5000),
  ASSET_SIGNING_PRIVATE_KEY: z.string().optional(),
  ASSET_SIGNING_PUBLIC_KEY: z.string().optional(),
  DEVICE_AUTH_BASE_URL: z.string().default("http://localhost:4000/auth/device"),
});

export const env = envSchema.parse(process.env);

export const LICENSE_PRICE_USD = env.LICENSE_PRICE_CENTS / 100;
