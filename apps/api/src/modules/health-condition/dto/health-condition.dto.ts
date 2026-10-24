/**
 * @file apps/api/src/modules/health-condition/dto/health-condition.dto.ts
 * @description GraphQL ObjectType for medical conditions and clinical contraindication records.
 * @module @vitalai/api/health-condition
 */

import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ConditionCategory, ConditionSeverity } from "@vitalai/shared-types";

// Register domain enums with GraphQL Code-First schema generator
registerEnumType(ConditionCategory, {
  name: "ConditionCategory",
  description: "Physiological domain classification for medical conditions",
});

registerEnumType(ConditionSeverity, {
  name: "ConditionSeverity",
  description: "Clinical severity tier governing exercise and dietary contraindication enforcement",
});

/**
 * GraphQL presentation entity for a user health condition or clinical restriction.
 */
@ObjectType({
  description: "Clinical health condition, allergy, or injury in the user Health Vault",
})
export class HealthConditionResponse {
  @Field(() => ID, { description: "Unique condition record UUID" })
  id!: string;

  @Field(() => String, { description: "Diagnosed condition name or injury description" })
  name!: string;

  @Field(() => ConditionCategory, { description: "Clinical condition category" })
  category!: ConditionCategory;

  @Field(() => ConditionSeverity, { description: "Contraindication severity tier" })
  severity!: ConditionSeverity;

  @Field(() => String, { description: "Clinical or personal notes" })
  notes!: string;

  @Field(() => Boolean, { description: "Whether the restriction is currently active" })
  active!: boolean;

  @Field(() => [String], {
    description: "Movement patterns or exercise tags strictly contra-indicated",
  })
  blacklistedMovements!: string[];

  @Field(() => [String], { description: "Dietary food tags or ingredients strictly blacklisted" })
  blacklistedIngredients!: string[];

  @Field(() => String, { nullable: true, description: "ISO timestamp when first diagnosed" })
  diagnosedAt?: string | null;

  @Field(() => String, { description: "ISO timestamp when recorded" })
  createdAt!: string;

  @Field(() => String, { description: "ISO timestamp when last updated" })
  updatedAt!: string;
}
