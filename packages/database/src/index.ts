import { PrismaClient } from "./generated/client";

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

// Force a new instance if cachedPrisma is missing or doesn't have newer models (like account)
if (!globalThis.cachedPrisma || !(globalThis.cachedPrisma as any).account) {
  globalThis.cachedPrisma = new PrismaClient();
}

export const db = globalThis.cachedPrisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.cachedPrisma = db;
}

export * from "./generated/client";
