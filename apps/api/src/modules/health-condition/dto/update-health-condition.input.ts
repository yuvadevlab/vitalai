/**
 * @file apps/api/src/modules/health-condition/dto/update-health-condition.input.ts
 * @description GraphQL InputType for modifying an existing health condition or toggling active status.
 * @module @vitalai/api/health-condition
 */

import { Field, ID, InputType } from "@nestjs/graphql";
import { ConditionSeverity } from "@vitalai/shared-types";

/**
 * Input payload for updating a Health Vault condition.
 */
@InputType({ description: "Modification payload for an existing health condition" })
export class UpdateHealthConditionInput {
  @Field(() => ID, { description: "Target condition record UUID" })
  id!: string;

  @Field(() => ConditionSeverity, { nullable: true, description: "Updated severity tier" })
  severity?: ConditionSeverity;

  @Field(() => String, { nullable: true, description: "Updated clinical notes" })
  notes?: string;

  @Field(() => Boolean, {
    nullable: true,
    description: "Toggle whether condition is currently active",
  })
  active?: boolean;

  @Field(() => [String], { nullable: true, description: "Updated blacklisted movement patterns" })
  blacklistedMovements?: string[];

  @Field(() => [String], { nullable: true, description: "Updated blacklisted ingredients" })
  blacklistedIngredients?: string[];
}
