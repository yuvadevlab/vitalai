/**
 * @file packages/database/src/client.ts
 * @description Singleton PrismaClient with PostgreSQL driver adapter and connection pooling.
 * @module @vitalai/database
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString =
  process.env.DATABASE_URL || "postgresql://localhost:5432/vitalai_dev?schema=public";

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

declare global {
  var __vitalai_prisma__: PrismaClient | undefined;
}

export const prisma = globalThis.__vitalai_prisma__ || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalThis.__vitalai_prisma__ = prisma;
}

export * from "@prisma/client";
export { PrismaClient };
