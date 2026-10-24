/**
 * @file packages/database/src/seeds/seed-platform-configs.ts
 * @description Idempotent database seeder for namespaced platform configurations and domain constants.
 * @module @vitalai/database/seeds
 */

import { PrismaClient, Prisma } from "@prisma/client";

export const SEED_PLATFORM_CONFIGS = [
  {
    namespace: "branding",
    key: "brand_name",
    description: "Application display name",
    value: "VitalAI",
  },
  {
    namespace: "branding",
    key: "tagline",
    description: "Clinical positioning tagline",
    value: "Evidence-Based Clinical Nutrition, Biomechanics & Gestational Physiology",
  },
  {
    namespace: "branding",
    key: "version",
    description: "Platform edition and version badge",
    value: "v1.0.0 • clinical",
  },
  {
    namespace: "hypertrophy",
    key: "volume_limits",
    description: "Universal weekly direct set limits per muscle group",
    value: {
      minMev: 6,
      maxMrv: 24,
      defaultRir: 2,
      maxWeeklyOverloadSets: 2,
    },
  },
  {
    namespace: "nutrition",
    key: "macro_defaults",
    description: "Default macronutrient caloric distribution ratios",
    value: {
      proteinRatio: 0.3,
      carbRatio: 0.45,
      fatRatio: 0.25,
      purineSafeMaxDailyMg: 400,
      glycemicLoadTargetMaxDaily: 80,
    },
  },
  {
    namespace: "suggestions",
    key: "welcome_chips",
    description: "Hero welcome chip suggestion queries for the AI Advisor",
    value: [
      "Analyze knee discomfort on squats",
      "Calculate postpartum macro adjustment",
      "Review my mesocycle chest volume",
      "Recommend gout-safe protein sources",
    ],
  },
  {
    namespace: "execution",
    key: "hyperparameters",
    description: "Cognitive AI engine execution bounds and temperatures",
    value: {
      defaultMaxSteps: 5,
      defaultTimeoutMs: 30000,
      deterministicTemperature: 0.1,
      conversationalTemperature: 0.7,
    },
  },
];

/**
 * Seeds namespaced platform configurations idempotently.
 *
 * @param prisma - PrismaClient instance
 */
export async function seedPlatformConfigs(prisma: PrismaClient): Promise<void> {
  for (const cfg of SEED_PLATFORM_CONFIGS) {
    await prisma.platformConfig.upsert({
      where: {
        namespace_key: {
          namespace: cfg.namespace,
          key: cfg.key,
        },
      },
      update: {
        description: cfg.description,
        value: cfg.value as Prisma.InputJsonValue,
      },
      create: {
        namespace: cfg.namespace,
        key: cfg.key,
        description: cfg.description,
        value: cfg.value as Prisma.InputJsonValue,
      },
    });
  }
}
