/**
 * @file packages/shared-types/src/enums/platform.enum.ts
 * @description Canonical enums for dynamic platform configuration, system prompts, and scopes.
 * @module @vitalai/shared-types
 */

export enum ConfigNamespace {
  BRANDING = "branding",
  HYPERTROPHY = "hypertrophy",
  NUTRITION = "nutrition",
  SUGGESTIONS = "suggestions",
  EXECUTION = "execution",
}

export enum PlatformScope {
  PLATFORM = "platform",
  USER = "user",
}

export enum SystemPromptSlug {
  SAFETY_GUIDELINES = "safety-guidelines",
  REACT_FORMAT = "react-format",
  SUPERVISOR_TRIAGE = "supervisor-triage",
}
