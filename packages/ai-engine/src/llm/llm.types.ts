/**
 * @file packages/ai-engine/src/llm/llm.types.ts
 * @description Provider-agnostic LLM chat contracts supporting multi-provider switching.
 * @module @vitalai/ai-engine/llm
 */

export enum AiProvider {
  OLLAMA = "ollama",
  GROQ = "groq",
  GOOGLE_AI_STUDIO = "google-ai-studio",
  OPENROUTER = "openrouter",
  ANTHROPIC = "anthropic",
}

export type LlmRole = "system" | "user" | "assistant" | "tool";

export interface LlmMessage {
  readonly role: LlmRole;
  readonly content: string;
  readonly toolName?: string;
}

export type LlmStreamEvent =
  | { readonly type: "text-delta"; readonly text: string }
  | { readonly type: "usage"; readonly tokensIn?: number; readonly tokensOut?: number }
  | { readonly type: "done" };

export interface LlmChatRequest {
  readonly messages: readonly LlmMessage[];
  readonly temperature?: number;
  readonly stop?: readonly string[];
}

export interface LlmCompleteResult {
  readonly content: string;
  readonly tokensIn?: number;
  readonly tokensOut?: number;
}

export interface ChatModelConfig {
  readonly provider: AiProvider;
  readonly model: string;
  readonly baseUrl?: string;
  readonly apiKey?: string;
  readonly temperature?: number;
  readonly timeoutMs?: number;
}

export interface ChatModel {
  readonly provider: AiProvider;
  readonly model: string;
  stream(request: LlmChatRequest): AsyncIterable<LlmStreamEvent>;
  complete(request: LlmChatRequest): Promise<LlmCompleteResult>;
}

export interface VitalAiEngineConfig {
  readonly defaultModelConfig: ChatModelConfig;
  readonly planningModelConfig?: ChatModelConfig;
  readonly featureModelConfigs?: Partial<Record<string, ChatModelConfig>>;
}
