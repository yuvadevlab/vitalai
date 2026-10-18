/**
 * @file packages/shared-types/src/utils/uuid.ts
 * @description RFC 4122 compliant UUID generation utilities using the official uuid package.
 * @module @vitalai/shared-types
 */

import { v4, v5 } from "uuid";

/**
 * VitalAI deterministic UUID namespace (RFC 4122 standard DNS namespace).
 * Ensures identical catalog items produce identical standard UUIDs across all packages.
 */
export const VITALAI_UUID_NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

/**
 * Generate a fresh random RFC 4122 v4 UUID (for user sessions, sets, logs, memories).
 */
export function generateUuid(): string {
  return v4();
}

/**
 * Generate a deterministic RFC 4122 v5 UUID for catalog seed items (exercises, equipment, conditions).
 *
 * @param domain - The catalog domain namespace (e.g. "exercise", "equipment", "condition")
 * @param name - The canonical identifier key (e.g. "barbell_bench_press")
 * @returns A guaranteed standard RFC 4122 UUID v5 string
 */
export function generateCatalogUuid(domain: string, name: string): string {
  return v5(`${domain}:${name}`, VITALAI_UUID_NAMESPACE);
}
