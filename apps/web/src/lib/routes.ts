/**
 * @file apps/web/src/lib/routes.ts
 * @description Single source of truth for application and API routes across VitalAI Web.
 */

export const APP_ROUTES = {
  HOME: "/",
  DASHBOARD: "/",
  WORKOUTS: "/workouts",
  NUTRITION: "/nutrition",
  HEALTH_VAULT: "/health-vault",
  ADVISORS: "/advisors",
  SETTINGS: "/settings",
} as const;

export type AppRoutes = typeof APP_ROUTES;

export const API_ROUTES = {
  GRAPHQL: "/graphql",
  STREAM_CHAT: "/api/advisors/chat/stream",
  PLATFORM: {
    NAV: "/api/v1/platform/nav",
    PROVIDERS: "/api/v1/platform/providers",
    MODELS: "/api/v1/platform/models",
    CONFIGS: "/api/v1/platform/configs",
  },
} as const;

export type ApiRoutes = typeof API_ROUTES;
