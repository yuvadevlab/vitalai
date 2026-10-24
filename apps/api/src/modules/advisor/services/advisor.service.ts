/**
 * @file apps/api/src/modules/advisor/services/advisor.service.ts
 * @description Business logic service integrating @vitalai/ai-engine ReAct cognitive harness and dynamic database advisors.
 * @module @vitalai/api/advisor
 */

import { Injectable } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import { type Prisma, type MessageRole as PrismaMessageRole } from "@vitalai/database";
import { MessageRole, ConditionId, ExerciseId, FoodTag } from "@vitalai/shared-types";
import { VitalAdvisorEngine, AdvisorStreamCallbacks } from "@vitalai/ai-engine";
import { config, buildEngineConfig } from "../../../config";
import { AdvisorRepository } from "../repositories/advisor.repository";
import { HealthConditionService } from "../../health-condition/services/health-condition.service";
import { HealthConditionResponse } from "../../health-condition/dto/health-condition.dto";
import { encodeCursor, decodeCursor } from "../../../common/pagination/cursor.util";
import { AdvisorPersonaResponse, ChatMessageResponse, SendMessageInput } from "../dto";
import {
  mapAdvisorPersona,
  mapAdvisorMessage,
  mapTracePhasesToSteps,
  triageAdvisorQuery,
  toAdvisorProfile,
} from "../utils/advisor-triage.util";

@Injectable()
export class AdvisorService {
  private readonly logger = new Logger(AdvisorService.name);
  private readonly engine: VitalAdvisorEngine;

  constructor(
    private readonly repository: AdvisorRepository,
    private readonly healthService: HealthConditionService,
  ) {
    const engineConfig = buildEngineConfig(config);
    this.engine = new VitalAdvisorEngine(engineConfig);
  }

  async getPersonas(userId: string): Promise<AdvisorPersonaResponse[]> {
    const records = await this.repository.findAllPersonas(userId);
    return records.map(mapAdvisorPersona);
  }

  async getChatHistory(userId: string): Promise<ChatMessageResponse[]> {
    const messages = await this.repository.findChatHistory(userId);
    return messages.map((m) => mapAdvisorMessage(m));
  }

  async getChatHistoryPaginated(userId: string, first = 20, afterCursor?: string) {
    const afterId = afterCursor ? decodeCursor(afterCursor) : undefined;
    const rawMessages = await this.repository.findChatHistoryPaginated(userId, first, afterId);
    const hasNextPage = rawMessages.length > first;
    const nodes = (hasNextPage ? rawMessages.slice(0, first) : rawMessages).map((m) =>
      mapAdvisorMessage(m),
    );
    const edges = nodes.map((node) => ({ cursor: encodeCursor(node.id), node }));
    const totalCount = await this.repository.countChatMessages(userId);

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage: Boolean(afterCursor),
        startCursor: edges[0]?.cursor ?? null,
        endCursor: edges[edges.length - 1]?.cursor ?? null,
      },
      totalCount,
    };
  }

  private async buildUserContext(userId: string) {
    const conditions = await this.healthService.listConditions(userId, true);
    const activeConditionIds: ConditionId[] = conditions
      .filter((c: HealthConditionResponse) => c.active)
      .map((c: HealthConditionResponse) => c.id as unknown as ConditionId);
    const contraindications = await this.healthService.getActiveContraindications(userId);

    return {
      activeConditions: activeConditionIds,
      blacklistedMovements: contraindications.blacklistedMovements as unknown as ExerciseId[],
      blacklistedIngredients: contraindications.blacklistedIngredients as unknown as FoodTag[],
    };
  }

  private async resolveAdvisor(userId: string, advisorId?: string, query?: string) {
    if (advisorId) {
      const match = await this.repository.findPersonaById(advisorId);
      if (match) return match;
    }

    const personas = await this.repository.findAllPersonas(userId);
    if (personas.length === 0) {
      throw new Error(
        "No active AI advisors found in the database. Please populate the database via `pnpm --filter @vitalai/database db:seed`.",
      );
    }

    return query ? triageAdvisorQuery(query, personas) : personas[0]!;
  }

  async processUserMessage(userId: string, input: SendMessageInput): Promise<ChatMessageResponse> {
    this.logger.info(`[processUserMessage] Processing query for user: ${userId}`);

    await this.repository.createChatMessage({
      user: { connect: { id: userId } },
      role: MessageRole.USER as unknown as PrismaMessageRole,
      content: input.content,
      autoAssigned: !input.advisorId,
    });

    const context = await this.buildUserContext(userId);
    const matchedAdvisor = await this.resolveAdvisor(userId, input.advisorId, input.content);
    const advisorProfile = toAdvisorProfile(matchedAdvisor);

    const advisory = await this.engine.generateAdvisory({
      query: input.content,
      advisor: advisorProfile,
      context,
    });

    const traceSteps = mapTracePhasesToSteps(advisory.trace.phases);

    const assistantMessage = await this.repository.createChatMessage({
      user: { connect: { id: userId } },
      advisor: { connect: { id: matchedAdvisor.id } },
      role: MessageRole.ASSISTANT as unknown as PrismaMessageRole,
      content: advisory.answer,
      autoAssigned: !input.advisorId,
      reasoningTrace: traceSteps as unknown as Prisma.InputJsonValue,
      actionProposal: advisory.proposal as unknown as Prisma.InputJsonValue,
    });

    return mapAdvisorMessage(assistantMessage, traceSteps);
  }

  async streamUserMessage(
    userId: string,
    input: SendMessageInput,
    callbacks: AdvisorStreamCallbacks,
  ): Promise<ChatMessageResponse> {
    this.logger.info(`[streamUserMessage] Streaming advisory for user: ${userId}`);

    const context = await this.buildUserContext(userId);
    const matchedAdvisor = await this.resolveAdvisor(userId, input.advisorId, input.content);
    const advisorProfile = toAdvisorProfile(matchedAdvisor);

    const advisory = await this.engine.streamAdvisory({
      query: input.content,
      advisor: advisorProfile,
      context,
      callbacks,
    });

    const traceSteps = mapTracePhasesToSteps(advisory.trace.phases);

    const assistantMessage = await this.repository.createChatMessage({
      user: { connect: { id: userId } },
      advisor: { connect: { id: matchedAdvisor.id } },
      role: MessageRole.ASSISTANT as unknown as PrismaMessageRole,
      content: advisory.answer,
      autoAssigned: !input.advisorId,
      reasoningTrace: traceSteps as unknown as Prisma.InputJsonValue,
      actionProposal: advisory.proposal as unknown as Prisma.InputJsonValue,
    });

    return mapAdvisorMessage(assistantMessage, traceSteps);
  }
}
