/**
 * @file packages/shared-types/src/contracts/platform.contract.ts
 * @description Contracts for dynamic platform providers, models, navigation items, and configurations.
 * @module @vitalai/shared-types
 */

import { ConfigNamespace, SystemPromptSlug } from "../enums";

export interface LlmProviderDto {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly providerType: string;
  readonly description?: string | null;
  readonly baseUrl?: string | null;
  readonly config: Record<string, unknown>;
  readonly isEnabled: boolean;
  readonly sortOrder: number;
  readonly modelCount?: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface UpsertLlmProviderDto {
  readonly name: string;
  readonly slug: string;
  readonly providerType: string;
  readonly description?: string;
  readonly baseUrl?: string;
  readonly config?: Record<string, unknown>;
  readonly isEnabled?: boolean;
  readonly sortOrder?: number;
}

export interface LlmModelDto {
  readonly id: string;
  readonly providerId: string;
  readonly name: string;
  readonly modelIdentifier: string;
  readonly description?: string | null;
  readonly capabilities: Record<string, unknown>;
  readonly defaultConfig: Record<string, unknown>;
  readonly contextWindow: number;
  readonly isDefault: boolean;
  readonly isEnabled: boolean;
  readonly sortOrder: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface UpsertLlmModelDto {
  readonly providerId: string;
  readonly name: string;
  readonly modelIdentifier: string;
  readonly description?: string;
  readonly capabilities?: Record<string, unknown>;
  readonly defaultConfig?: Record<string, unknown>;
  readonly contextWindow?: number;
  readonly isDefault?: boolean;
  readonly isEnabled?: boolean;
  readonly sortOrder?: number;
}

export interface NavItemDto {
  readonly id: string;
  readonly label: string;
  readonly icon?: string | null;
  readonly href: string;
  readonly roles: readonly string[];
  readonly section: string;
  readonly isVisible: boolean;
  readonly isEnabled: boolean;
  readonly sortOrder: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface UpsertNavItemDto {
  readonly label: string;
  readonly icon?: string;
  readonly href: string;
  readonly roles?: readonly string[];
  readonly section?: string;
  readonly isVisible?: boolean;
  readonly isEnabled?: boolean;
  readonly sortOrder?: number;
}

export interface PlatformConfigDto {
  readonly id: string;
  readonly namespace: ConfigNamespace;
  readonly key: string;
  readonly value: unknown;
  readonly description?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface UpsertPlatformConfigDto {
  readonly namespace: ConfigNamespace;
  readonly key: string;
  readonly value: unknown;
  readonly description?: string;
}

export interface SystemPromptTemplateDto {
  readonly id: string;
  readonly slug: SystemPromptSlug;
  readonly name: string;
  readonly description?: string | null;
  readonly version: number;
  readonly content: string;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface UpsertSystemPromptTemplateDto {
  readonly slug: SystemPromptSlug;
  readonly name: string;
  readonly description?: string;
  readonly version?: number;
  readonly content: string;
  readonly isActive?: boolean;
}
