import type { Prisma } from "@prisma/client";

export function param(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function jsonMetadata(data: Record<string, unknown>): Prisma.InputJsonValue {
  return data as Prisma.InputJsonValue;
}
