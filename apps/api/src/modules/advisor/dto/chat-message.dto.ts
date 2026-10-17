/**
 * @file apps/api/src/modules/advisor/dto/chat-message.dto.ts
 * @description GraphQL ObjectTypes for chat messages, reasoning traces, and two-phase proposals.
 * @module @vitalai/api/advisor
 */

import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { MessageRole, ProposalType, ProposalStatus } from "@vitalai/shared-types";
import { AdvisorPersonaResponse } from "./persona.dto";

registerEnumType(MessageRole, {
  name: "MessageRole",
  description: "Conversational role in the AI advisor consultation dialogue",
});

registerEnumType(ProposalType, {
  name: "ProposalType",
  description: "Category of proposed change (exercise swap, macro update, volume deload)",
});

registerEnumType(ProposalStatus, {
  name: "ProposalStatus",
  description: "Decision status of the proposed change",
});

@ObjectType({
  description: "Transparent clinical reasoning trace produced before generating proposals",
})
export class ReasoningTraceStep {
  @Field(() => String)
  phase!: string;

  @Field(() => String)
  observation!: string;

  @Field(() => String)
  evaluation!: string;

  @Field(() => String)
  timestamp!: string;
}

@ObjectType({ description: "Two-phase action confirmation proposal" })
export class ActionProposalResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => ProposalType)
  type!: ProposalType;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  description!: string;

  @Field(() => ProposalStatus)
  status!: ProposalStatus;
}

@ObjectType({ description: "Chat message in the advisor consultation stream" })
export class ChatMessageResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => MessageRole)
  role!: MessageRole;

  @Field(() => String)
  content!: string;

  @Field(() => Boolean)
  autoAssigned!: boolean;

  @Field(() => AdvisorPersonaResponse, { nullable: true })
  advisor?: AdvisorPersonaResponse | null;

  @Field(() => [ReasoningTraceStep], { nullable: true })
  reasoningTrace?: ReasoningTraceStep[] | null;

  @Field(() => ActionProposalResponse, { nullable: true })
  actionProposal?: ActionProposalResponse | null;

  @Field(() => String)
  createdAt!: string;
}
