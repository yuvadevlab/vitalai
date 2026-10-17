/**
 * @file packages/database/src/index.ts
 * @description Master barrel export for @vitalai/database package.
 * Single source of truth for Prisma client, database models, enums, and repositories.
 * @module @vitalai/database
 */

export * from "./client";
export * from "./repositories";
export * from "@prisma/client";
