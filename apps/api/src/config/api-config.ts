/**
 * @file apps/api/src/config/api-config.ts
 * @description Single source of truth for runtime configuration with automatic .env discovery and AI model mapping.
 * @module @vitalai/api/config
 */

import path from "node:path";
import dotenv from "dotenv";
import { AiProvider, ChatModelConfig, VitalAiEngineConfig } from "@vitalai/ai-engine";
import { apiConfigSchema, type ApiConfig } from "./api-config.schema";

let cachedConfig: ApiConfig | null = null;

/**
 * Discovers and loads environment files in candidate order,
 * validates against Zod schema, and freezes the runtime configuration singleton.
 *
 * @returns Validated ApiConfig object
 */
export function loadApiConfig(): ApiConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });
  dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
  dotenv.config({ path: path.resolve(process.cwd(), ".env"), override: true });

  const parsedConfig = apiConfigSchema.safeParse({
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    webUrl: process.env.WEB_URL,
    jwtSecret: process.env.JWT_SECRET || process.env.SECRET_KEY,
    gatewayUrl: process.env.GATEWAY_URL || process.env.DEVLAB_PORTAL_API_URL,
    logEnabled: process.env.LOG_ENABLED,
    logLevel: process.env.LOG_LEVEL,
    aiProvider: process.env.AI_PROVIDER,
    aiProviderAgent: process.env.AI_PROVIDER_AGENT,
    aiProviderChat: process.env.AI_PROVIDER_CHAT,
    ollamaBaseUrl: process.env.OLLAMA_BASE_URL,
    ollamaModel: process.env.OLLAMA_MODEL,
    ollamaAgentModel: process.env.OLLAMA_AGENT_MODEL,
    groqBaseUrl: process.env.GROQ_BASE_URL,
    groqApiKey: process.env.GROQ_API_KEY,
    groqModel: process.env.GROQ_MODEL,
    groqAgentModel: process.env.GROQ_AGENT_MODEL,
    googleAiStudioBaseUrl: process.env.GOOGLE_AI_STUDIO_BASE_URL,
    googleAiStudioApiKey: process.env.GOOGLE_AI_STUDIO_API_KEY,
    googleAiStudioModel: process.env.GOOGLE_AI_STUDIO_MODEL,
    openrouterBaseUrl: process.env.OPENROUTER_BASE_URL,
    openrouterApiKey: process.env.OPENROUTER_API_KEY,
    openrouterModel: process.env.OPENROUTER_MODEL,
    anthropicBaseUrl: process.env.ANTHROPIC_BASE_URL,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    anthropicModel: process.env.ANTHROPIC_MODEL,
  });

  if (!parsedConfig.success) {
    const issues = parsedConfig.error.format();
    process.stderr.write(
      `❌ Fatal Configuration Validation Failure:\n${JSON.stringify(issues, null, 2)}\n`,
    );
    process.exit(1);
  }

  cachedConfig = Object.freeze(parsedConfig.data);
  return cachedConfig;
}

/**
 * Resolves the appropriate ChatModelConfig based on the provider and role.
 *
 * @param provider The AI provider to use
 * @param cfg The loaded API configuration
 * @param isAgentRole Whether to use the agent model configuration
 * @returns ChatModelConfig with provider, model, base URL, and API key
 */
export function resolveModelConfigForProvider(
  provider: AiProvider,
  cfg: ApiConfig,
  isAgentRole: boolean,
): ChatModelConfig {
  switch (provider) {
    case AiProvider.OLLAMA:
      return {
        provider,
        model: isAgentRole ? cfg.ollamaAgentModel : cfg.ollamaModel,
        baseUrl: cfg.ollamaBaseUrl,
      };

    case AiProvider.GROQ:
      return {
        provider,
        model: isAgentRole ? (cfg.groqAgentModel ?? cfg.groqModel) : cfg.groqModel,
        baseUrl: cfg.groqBaseUrl,
        apiKey: cfg.groqApiKey,
      };

    case AiProvider.GOOGLE_AI_STUDIO:
      return {
        provider,
        model: cfg.googleAiStudioModel,
        baseUrl: cfg.googleAiStudioBaseUrl,
        apiKey: cfg.googleAiStudioApiKey,
      };

    case AiProvider.OPENROUTER:
      return {
        provider,
        model: cfg.openrouterModel ?? "qwen/qwen-2.5-72b-instruct",
        baseUrl: cfg.openrouterBaseUrl,
        apiKey: cfg.openrouterApiKey,
      };

    case AiProvider.ANTHROPIC:
      return {
        provider,
        model: cfg.anthropicModel,
        baseUrl: cfg.anthropicBaseUrl,
        apiKey: cfg.anthropicApiKey,
      };

    default:
      return {
        provider: AiProvider.OLLAMA,
        model: cfg.ollamaModel,
        baseUrl: cfg.ollamaBaseUrl,
      };
  }
}

export function buildEngineConfig(cfg: ApiConfig): VitalAiEngineConfig {
  const chatProvider = (cfg.aiProviderChat ?? cfg.aiProvider) as AiProvider;
  const agentProvider = (cfg.aiProviderAgent ?? cfg.aiProvider) as AiProvider;

  const defaultModelConfig = resolveModelConfigForProvider(chatProvider, cfg, false);
  const planningModelConfig = resolveModelConfigForProvider(agentProvider, cfg, true);

  return {
    defaultModelConfig,
    planningModelConfig,
  };
}

export const config: ApiConfig = loadApiConfig();
