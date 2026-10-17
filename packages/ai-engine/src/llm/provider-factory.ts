/**
 * @file packages/ai-engine/src/llm/provider-factory.ts
 * @description Provider-agnostic factory constructing ChatModel instances from client configuration.
 * @module @vitalai/ai-engine/llm
 */

import {
  OllamaAdapter,
  GroqAdapter,
  GoogleAdapter,
  OpenAIAdapter,
  AnthropicAdapter,
} from "@yuva-devlab/ai-client";
import { AiProvider, ChatModel, ChatModelConfig } from "./llm.types";
import { DevLabChatModel } from "./devlab-chat.model";

/**
 * Constructs a ChatModel strictly from client-supplied configuration.
 * Adheres strictly to the architectural invariant: Zero direct process.env access within engine packages.
 */
export function createChatModel(config: ChatModelConfig): ChatModel {
  if (!config.model) {
    throw new Error(
      `ChatModel configuration error: model name must be provided for provider "${config.provider}".`,
    );
  }

  switch (config.provider) {
    case AiProvider.OLLAMA:
      return new DevLabChatModel(
        config.provider,
        config.model,
        new OllamaAdapter({ baseUrl: config.baseUrl }),
        config.temperature,
        config.timeoutMs,
      );

    case AiProvider.GROQ:
      if (!config.apiKey) {
        throw new Error("ChatModel configuration error: Groq requires apiKey.");
      }
      return new DevLabChatModel(
        config.provider,
        config.model,
        new GroqAdapter({ apiKey: config.apiKey, baseUrl: config.baseUrl }),
        config.temperature,
        config.timeoutMs,
      );

    case AiProvider.GOOGLE_AI_STUDIO:
      if (!config.apiKey) {
        throw new Error("ChatModel configuration error: Google AI Studio requires apiKey.");
      }
      return new DevLabChatModel(
        config.provider,
        config.model,
        new GoogleAdapter({ apiKey: config.apiKey, baseUrl: config.baseUrl }),
        config.temperature,
        config.timeoutMs,
      );

    case AiProvider.OPENROUTER:
      if (!config.apiKey) {
        throw new Error("ChatModel configuration error: OpenRouter requires apiKey.");
      }
      return new DevLabChatModel(
        config.provider,
        config.model,
        new OpenAIAdapter({ apiKey: config.apiKey, baseUrl: config.baseUrl }),
        config.temperature,
        config.timeoutMs,
      );

    case AiProvider.ANTHROPIC:
      if (!config.apiKey) {
        throw new Error("ChatModel configuration error: Anthropic requires apiKey.");
      }
      return new DevLabChatModel(
        config.provider,
        config.model,
        new AnthropicAdapter({ apiKey: config.apiKey, baseUrl: config.baseUrl }),
        config.temperature,
        config.timeoutMs,
      );

    default:
      throw new Error(`Unsupported AI provider: ${config.provider}`);
  }
}
