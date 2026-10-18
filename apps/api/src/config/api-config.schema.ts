/**
 * @file apps/api/src/config/api-config.schema.ts
 * @description Zod schema for validating backend runtime environment variables.
 * Enforces fail-fast validation at server initialization.
 * @module @vitalai/api/config
 */

import { z } from "zod";

/**
 * Zod schema enforcing environment variable contracts for the API gateway.
 */
export const apiConfigSchema = z.object({
  // Database
  databaseUrl: z
    .string({ required_error: "DATABASE_URL is required" })
    .url("DATABASE_URL must be a valid PostgreSQL connection string"),

  // Server Networking
  port: z.coerce.number().int().positive().default(4004),
  nodeEnv: z.enum(["development", "production", "test"]).default("development"),
  webUrl: z.string().default("http://localhost:3004"),

  // Security & SSO Gateway
  jwtSecret: z
    .string({ required_error: "JWT_SECRET is required" })
    .min(32, "JWT_SECRET must be at least 32 characters for security"),
  gatewayUrl: z.string().url().default("http://localhost:3015"),

  // Logging Standards
  logEnabled: z
    .string()
    .transform((val) => val !== "false")
    .default("true"),
  logLevel: z.enum(["info", "warn", "error"]).default("info"),

  // Multi-LLM Provider & Model Configurations
  aiProvider: z
    .enum(["ollama", "groq", "google-ai-studio", "openrouter", "anthropic"])
    .default("ollama"),
  aiProviderAgent: z
    .enum(["ollama", "groq", "google-ai-studio", "openrouter", "anthropic"])
    .optional(),
  aiProviderChat: z
    .enum(["ollama", "groq", "google-ai-studio", "openrouter", "anthropic"])
    .optional(),

  // Ollama local AI configuration
  ollamaBaseUrl: z.string().default("http://localhost:11434"),
  ollamaModel: z.string().default("qwen3:8b"),
  ollamaAgentModel: z.string().default("qwen3:14b"),

  // Groq configuration
  groqBaseUrl: z.string().default("https://api.groq.com"),
  groqApiKey: z.string().optional(),
  groqModel: z.string().default("llama-3.3-70b-versatile"),
  groqAgentModel: z.string().optional(),

  // Google AI Studio configuration
  googleAiStudioBaseUrl: z.string().default("https://generativelanguage.googleapis.com"),
  googleAiStudioApiKey: z.string().optional(),
  googleAiStudioModel: z.string().default("gemini-2.0-flash"),

  // OpenRouter configuration
  openrouterBaseUrl: z.string().default("https://openrouter.ai/api"),
  openrouterApiKey: z.string().optional(),
  openrouterModel: z.string().optional(),

  // Anthropic configuration
  anthropicBaseUrl: z.string().optional(),
  anthropicApiKey: z.string().optional(),
  anthropicModel: z.string().default("claude-3-7-sonnet-latest"),
});

export type ApiConfig = z.infer<typeof apiConfigSchema>;
