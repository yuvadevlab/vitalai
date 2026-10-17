/**
 * @file apps/api/src/modules/advisor/dto/persona.dto.ts
 * @description GraphQL ObjectType for clinical advisor staff personas.
 * @module @vitalai/api/advisor
 */

import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { AdvisorSpecialty, AdvisorTone } from "@vitalai/shared-types";

registerEnumType(AdvisorSpecialty, {
  name: "AdvisorSpecialty",
  description: "Clinical specialty of the AI Advisor persona",
});

registerEnumType(AdvisorTone, {
  name: "AdvisorTone",
  description: "Conversational tone of the AI Advisor persona",
});

@ObjectType({ description: "Clinical or coaching staff advisor persona entity" })
export class AdvisorPersonaResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  avatar!: string;

  @Field(() => AdvisorSpecialty)
  specialty!: AdvisorSpecialty;

  @Field(() => AdvisorTone)
  tone!: AdvisorTone;

  @Field(() => [String])
  specialties!: string[];

  @Field(() => Boolean)
  isPrebuilt!: boolean;

  @Field(() => Boolean)
  isActive!: boolean;
}
