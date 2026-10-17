/**
 * @file apps/api/src/config/api-config.ts
 * @description Single source of truth for runtime configuration with automatic .env discovery.
 * Parses and verifies environment variables against the Zod schema.
 * @module @vitalai/api/config
 */

import path from "node:path";
import dotenv from "dotenv";
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

  // Load root monorepo .env first, then local app-specific overrides
  dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });
  dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
  dotenv.config({ path: path.resolve(process.cwd(), ".env"), override: true });

  const parsedConfig = apiConfigSchema.safeParse({
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    webUrl: process.env.WEB_URL,
    jwtSecret: process.env.JWT_SECRET,
    gatewayUrl: process.env.GATEWAY_URL,
    logEnabled: process.env.LOG_ENABLED,
    logLevel: process.env.LOG_LEVEL,
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

export const config: ApiConfig = loadApiConfig();
