/**
 * @file apps/api/src/modules/advisor/dto/send-message.input.ts
 * @description GraphQL InputType for submitting a user query to the AI Advisor harness.
 * @module @vitalai/api/advisor
 */

import { Field, ID, InputType } from "@nestjs/graphql";

@InputType({ description: "Query payload sent to the AI clinical advisor" })
export class SendMessageInput {
  @Field(() => String, { description: "User question, feedback, or coaching request" })
  content!: string;

  @Field(() => ID, {
    nullable: true,
    description: "Specific advisor ID (null for auto-dispatch triage)",
  })
  advisorId?: string;
}
