/**
 * @file apps/api/src/modules/advisor/dto/stream-chat.dto.ts
 * @description REST DTO validating incoming request payloads to the Fastify SSE streaming endpoint.
 * @module @vitalai/api/advisor
 */

export interface StreamChatPayload {
  readonly content: string;
  readonly advisorId?: string;
}
