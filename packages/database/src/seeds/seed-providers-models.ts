/**
 * @file packages/database/src/seeds/seed-providers-models.ts
 * @description Idempotent database seeder for supported LLM providers and model catalog.
 * @module @vitalai/database/seeds
 */

import { PrismaClient, Prisma } from "@prisma/client";

export const SEED_PROVIDERS = [
  {
    name: "Ollama",
    slug: "ollama",
    providerType: "ollama",
    description: "Local high-performance inference engine for private clinical workloads",
    baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
    config: {},
    isEnabled: true,
    sortOrder: 1,
  },
  {
    name: "Groq",
    slug: "groq",
    providerType: "groq",
    description: "Ultra-low-latency LPU cloud inference for real-time conversational streaming",
    baseUrl: "https://api.groq.com",
    config: {},
    isEnabled: true,
    sortOrder: 2,
  },
  {
    name: "Google AI Studio",
    slug: "google-ai-studio",
    providerType: "google-ai-studio",
    description: "Google Gemini 2.0 Flash multimodal engine with vast clinical context windows",
    baseUrl: "https://generativelanguage.googleapis.com",
    config: {},
    isEnabled: true,
    sortOrder: 3,
  },
  {
    name: "OpenRouter",
    slug: "openrouter",
    providerType: "openrouter",
    description: "Multi-model gateway routing to leading open and proprietary frontier models",
    baseUrl: "https://openrouter.ai/api",
    config: {},
    isEnabled: true,
    sortOrder: 4,
  },
  {
    name: "Anthropic",
    slug: "anthropic",
    providerType: "anthropic",
    description: "Claude 3.7 Sonnet hybrid reasoning engine for complex biomechanical analysis",
    baseUrl: "https://api.anthropic.com",
    config: {},
    isEnabled: true,
    sortOrder: 5,
  },
];

export const SEED_MODELS = [
  {
    providerSlug: "ollama",
    name: "Qwen 3 8B (Chat)",
    modelIdentifier: "qwen3:8b",
    description: "Lightweight, rapid response conversational model for instant interactive advice",
    capabilities: { streaming: true, toolCalls: true },
    contextWindow: 32768,
    isDefault: true,
    isEnabled: true,
    sortOrder: 1,
  },
  {
    providerSlug: "ollama",
    name: "Qwen 3 14B (Planning & Agent)",
    modelIdentifier: "qwen3:14b",
    description: "Higher-capacity reasoning model for multi-step ReAct planning and nutrition math",
    capabilities: { streaming: true, toolCalls: true, jsonPlanning: true },
    contextWindow: 32768,
    isDefault: false,
    isEnabled: true,
    sortOrder: 2,
  },
  {
    providerSlug: "groq",
    name: "Llama 3.3 70B Versatile",
    modelIdentifier: "llama-3.3-70b-versatile",
    description: "Sub-second token latency model ideal for dynamic exercise swap recommendations",
    capabilities: { streaming: true, toolCalls: true },
    contextWindow: 131072,
    isDefault: false,
    isEnabled: true,
    sortOrder: 3,
  },
  {
    providerSlug: "google-ai-studio",
    name: "Gemini 2.0 Flash",
    modelIdentifier: "gemini-2.0-flash",
    description: "High-speed frontier model with extensive clinical reasoning capabilities",
    capabilities: { streaming: true, toolCalls: true },
    contextWindow: 1048576,
    isDefault: false,
    isEnabled: true,
    sortOrder: 4,
  },
  {
    providerSlug: "openrouter",
    name: "Qwen 2.5 72B Instruct",
    modelIdentifier: "qwen/qwen-2.5-72b-instruct",
    description: "High-parameter open-weights benchmark leader in math and instruction following",
    capabilities: { streaming: true, toolCalls: true },
    contextWindow: 32768,
    isDefault: false,
    isEnabled: true,
    sortOrder: 5,
  },
  {
    providerSlug: "anthropic",
    name: "Claude 3.7 Sonnet",
    modelIdentifier: "claude-3-7-sonnet-latest",
    description: "Frontier hybrid reasoning model with deep nuance and clinical precision",
    capabilities: { streaming: true, toolCalls: true, extendedThinking: true },
    contextWindow: 200000,
    isDefault: false,
    isEnabled: true,
    sortOrder: 6,
  },
];

/**
 * Seeds LLM providers and models catalog idempotently.
 *
 * @param prisma - PrismaClient instance
 */
export async function seedProvidersAndModels(prisma: PrismaClient): Promise<void> {
  const providerMap = new Map<string, string>();

  for (const prov of SEED_PROVIDERS) {
    const record = await prisma.llmProvider.upsert({
      where: { slug: prov.slug },
      update: {
        name: prov.name,
        providerType: prov.providerType,
        description: prov.description,
        baseUrl: prov.baseUrl,
        config: prov.config as Prisma.InputJsonValue,
        isEnabled: prov.isEnabled,
        sortOrder: prov.sortOrder,
      },
      create: {
        name: prov.name,
        slug: prov.slug,
        providerType: prov.providerType,
        description: prov.description,
        baseUrl: prov.baseUrl,
        config: prov.config as Prisma.InputJsonValue,
        isEnabled: prov.isEnabled,
        sortOrder: prov.sortOrder,
      },
    });
    providerMap.set(prov.slug, record.id);
  }

  for (const model of SEED_MODELS) {
    const providerId = providerMap.get(model.providerSlug);
    if (!providerId) continue;

    await prisma.llmModel.upsert({
      where: {
        providerId_modelIdentifier: {
          providerId,
          modelIdentifier: model.modelIdentifier,
        },
      },
      update: {
        name: model.name,
        description: model.description,
        capabilities: model.capabilities as Prisma.InputJsonValue,
        contextWindow: model.contextWindow,
        isDefault: model.isDefault,
        isEnabled: model.isEnabled,
        sortOrder: model.sortOrder,
      },
      create: {
        providerId,
        name: model.name,
        modelIdentifier: model.modelIdentifier,
        description: model.description,
        capabilities: model.capabilities as Prisma.InputJsonValue,
        contextWindow: model.contextWindow,
        isDefault: model.isDefault,
        isEnabled: model.isEnabled,
        sortOrder: model.sortOrder,
      },
    });
  }
}
