/**
 * @file src/lib/routes.ts
 * @description Centralized application routes for VitalAI Web.
 */

export const APP_ROUTES = {
  HOME: "/",
  ONBOARDING: "/onboarding",
  PLAN: "/plan",
  WORKOUT_ACTIVE: "/workout/active",
  ADVISOR: "/advisor",
  ANALYTICS: "/analytics",
  PROFILE: "/profile",
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
