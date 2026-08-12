import { PrismaClient } from "./generated/client";

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

export const db = globalThis.cachedPrisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.cachedPrisma = db;
}

export * from "./generated/client";
