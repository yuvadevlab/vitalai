/**
 * @file apps/api/src/modules/platform/dto/platform.dto.ts
 * @description GraphQL ObjectTypes for dynamic platform providers, models, navigation, and configs.
 * @module @vitalai/api/platform
 */

import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Application navigation and menu item" })
export class NavItemResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  label!: string;

  @Field(() => String, { nullable: true })
  icon?: string | null;

  @Field(() => String)
  href!: string;

  @Field(() => [String])
  roles!: string[];

  @Field(() => String)
  section!: string;

  @Field(() => Boolean)
  isVisible!: boolean;

  @Field(() => Boolean)
  isEnabled!: boolean;

  @Field(() => Int)
  sortOrder!: number;
}

@ObjectType({ description: "Registered LLM inference provider" })
export class LlmProviderResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  slug!: string;

  @Field(() => String)
  providerType!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  baseUrl?: string | null;

  @Field(() => Boolean)
  isEnabled!: boolean;

  @Field(() => Int)
  sortOrder!: number;

  @Field(() => Int)
  modelCount!: number;
}

@ObjectType({ description: "LLM model in platform catalog" })
export class LlmModelResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  providerId!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  modelIdentifier!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Int)
  contextWindow!: number;

  @Field(() => Boolean)
  isDefault!: boolean;

  @Field(() => Boolean)
  isEnabled!: boolean;

  @Field(() => Int)
  sortOrder!: number;
}

@ObjectType({ description: "Namespaced platform configuration or domain constant" })
export class PlatformConfigResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  namespace!: string;

  @Field(() => String)
  key!: string;

  @Field(() => String)
  value!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String)
  createdAt!: string;

  @Field(() => String)
  updatedAt!: string;
}
