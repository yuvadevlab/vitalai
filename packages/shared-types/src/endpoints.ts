/**
 * @file packages/shared-types/src/endpoints.ts
 * @description Single source of truth for GraphQL gateway and SSE streaming endpoints across VitalAI.
 * @module @vitalai/shared-types
 */

export const API_ENDPOINTS = {
  /** The primary Code-First GraphQL gateway handling all queries and mutations */
  GRAPHQL: "/graphql",

  /** Real-time Server-Sent Events (SSE) streaming endpoints for LLM token generation */
  STREAM: {
    ADVISOR_CHAT: "/api/advisors/chat/stream",
  },

  /** Infrastructure health check probe */
  HEALTH: "/health",
} as const;

export type ApiEndpointsCatalog = typeof API_ENDPOINTS;
