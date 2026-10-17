/**
 * @file apps/api/src/modules/health-condition/dto/create-health-condition.input.ts
 * @description GraphQL InputType for registering a new health condition or medical contraindication.
 * @module @vitalai/api/health-condition
 */

import { Field, InputType } from "@nestjs/graphql";
import { ConditionCategory, ConditionSeverity } from "@vitalai/shared-types";

/**
 * Input payload for adding a medical condition to the user Health Vault.
 */
@InputType({ description: "Registration payload for medical condition or injury" })
export class CreateHealthConditionInput {
  @Field(() => String, {
    description: "Condition or injury name (e.g., Rotator Cuff Impingement, Gout)",
  })
  name!: string;

  @Field(() => ConditionCategory, { description: "Condition physiological category" })
  category!: ConditionCategory;

  @Field(() => ConditionSeverity, { description: "Clinical restriction severity tier" })
  severity!: ConditionSeverity;

  @Field(() => String, {
    defaultValue: "",
    description: "Additional clinical notes or rehabilitation notes",
  })
  notes!: string;

  @Field(() => [String], {
    defaultValue: [],
    description: "Specific exercise UUIDs or movement tags to blacklist from workout generation",
  })
  blacklistedMovements!: string[];

  @Field(() => [String], {
    defaultValue: [],
    description: "Food tags or ingredients to blacklist from meal planning",
  })
  blacklistedIngredients!: string[];

  @Field(() => String, { nullable: true, description: "Optional ISO date when diagnosis occurred" })
  diagnosedAt?: string;
}
