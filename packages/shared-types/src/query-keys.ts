/**
 * @file packages/shared-types/src/query-keys.ts
 * @description Centralized TanStack Query cache keys for VitalAI frontend applications.
 * Eliminates ad-hoc string keys and provides type-safe invalidate/prefetch contracts.
 * @module @vitalai/shared-types
 */

/**
 * Universal query keys catalog for caching and invalidation across TanStack Query.
 */
export const QUERY_KEYS = {
  ADVISORS: {
    ALL: ["advisors"] as const,
    DETAIL: (id: string) => ["advisors", id] as const,
    ACTIVE: ["advisors", "active"] as const,
  },
  CHAT: {
    MESSAGES: (conversationId?: string) =>
      ["chat", "messages", conversationId ?? "active"] as const,
    PROPOSALS: (conversationId?: string) =>
      ["chat", "proposals", conversationId ?? "active"] as const,
  },
  WORKOUTS: {
    MESOCYCLE: ["workouts", "mesocycle"] as const,
    TODAYS_SESSION: ["workouts", "session", "today"] as const,
    SESSION: (id: string) => ["workouts", "session", id] as const,
    VOLUME_LANDMARKS: ["workouts", "volume-landmarks"] as const,
    MUSCLE_HEATMAP: ["workouts", "muscle-heatmap"] as const,
  },
  NUTRITION: {
    DAILY: (date: string) => ["nutrition", "daily", date] as const,
    TODAY: ["nutrition", "daily", "today"] as const,
    PURINE_REPORT: (date: string) => ["nutrition", "purine-report", date] as const,
    GLYCEMIC_LOAD: (date: string) => ["nutrition", "glycemic-load", date] as const,
  },
  HEALTH_VAULT: {
    ALL: ["health-vault", "conditions"] as const,
    ACTIVE_GUARDRAILS: ["health-vault", "guardrails", "active"] as const,
    DETAIL: (id: string) => ["health-vault", "conditions", id] as const,
  },
} as const;

export type QueryKeysCatalog = typeof QUERY_KEYS;
