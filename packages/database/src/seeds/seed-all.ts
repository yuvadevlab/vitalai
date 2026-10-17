/**
 * @file packages/database/src/seeds/seed-all.ts
 * @description Master database seed orchestrator running all seed modules idempotently.
 * Safe to execute at any time; never deletes, drops, or truncates existing user or platform data.
 * @module @vitalai/database/seeds
 */

import { prisma, type PrismaClient } from "../client";
import { seedAdvisors } from "./seed-advisors";
import { seedProvidersAndModels } from "./seed-providers-models";
import { seedNavItems } from "./seed-nav-items";
import { seedPlatformConfigs } from "./seed-platform-configs";
import { seedSystemPrompts } from "./seed-system-prompts";

/**
 * Executes all database seed modules in dependency order with complete idempotence.
 *
 * @param client - Optional PrismaClient instance
 */
export async function seedAllPlatformData(client?: PrismaClient): Promise<void> {
  const db = client ?? prisma;

  // 1. Prebuilt Clinical Advisor Staff
  await seedAdvisors(db);

  // 2. LLM Providers and Model Catalog
  await seedProvidersAndModels(db);

  // 3. Application Navigation and Menu Items
  await seedNavItems(db);

  // 4. Namespaced Platform Configurations & Domain Constants
  await seedPlatformConfigs(db);

  // 5. Living System Prompt Templates
  await seedSystemPrompts(db);
}
