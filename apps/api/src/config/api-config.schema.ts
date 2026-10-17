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
});

export type ApiConfig = z.infer<typeof apiConfigSchema>;
