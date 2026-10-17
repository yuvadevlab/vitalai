/**
 * @file apps/api/src/modules/advisor/resolvers/advisor.resolver.ts
 * @description GraphQL resolver for querying personas, chat history, and sending consultation messages.
 * @module @vitalai/api/advisor
 */

import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Logger } from "@yuva-devlab/logger";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { CurrentUser, type RequestUser } from "../../../common/decorators/current-user.decorator";
import { AdvisorService } from "../services/advisor.service";
import {
  AdvisorPersonaResponse,
  ChatMessageResponse,
  ChatMessageConnection,
  SendMessageInput,
} from "../dto";
import { PaginationArgs } from "../../../common/pagination/pagination.args";

@Resolver()
@UseGuards(JwtAuthGuard)
export class AdvisorResolver {
  private readonly logger = new Logger(AdvisorResolver.name);

  constructor(private readonly service: AdvisorService) {}

  @Query(() => [AdvisorPersonaResponse], {
    name: "advisorPersonas",
    description: "Lists all clinical and coaching personas available for consultation",
  })
  async getPersonas(@CurrentUser() user: RequestUser) {
    this.logger.info(`[getPersonas] Query called by user: ${user.id}`);
    return this.service.getPersonas(user.id);
  }

  @Query(() => [ChatMessageResponse], {
    name: "chatHistory",
    description: "Returns the consultation conversation history with transparent reasoning traces",
  })
  async getChatHistory(@CurrentUser() user: RequestUser) {
    this.logger.info(`[getChatHistory] Query called by user: ${user.id}`);
    return this.service.getChatHistory(user.id);
  }

  @Query(() => ChatMessageConnection, {
    name: "chatHistoryPaginated",
    description: "Fetches paginated consultation conversation history with Relay cursor connection",
  })
  async getChatHistoryPaginated(
    @CurrentUser() user: RequestUser,
    @Args() pagination: PaginationArgs,
  ) {
    this.logger.info(`[getChatHistoryPaginated] Paginated history called by user: ${user.id}`);
    return this.service.getChatHistoryPaginated(user.id, pagination.first, pagination.after);
  }

  @Mutation(() => ChatMessageResponse, {
    name: "sendMessage",
    description: "Submits a query to the AI Advisor with automatic specialty triage",
  })
  async sendMessage(@CurrentUser() user: RequestUser, @Args("input") input: SendMessageInput) {
    this.logger.info(`[sendMessage] Query called by user: ${user.id}`);
    return this.service.processUserMessage(user.id, input);
  }
}
