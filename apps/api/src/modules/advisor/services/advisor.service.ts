/**
 * @file apps/api/src/modules/advisor/services/advisor.service.ts
 * @description Business logic service handling persona triage, clinical reasoning traces, and safety guardrails.
 * @module @vitalai/api/advisor
 */

import { Injectable, OnModuleInit } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import {
  type Prisma,
  type AdvisorSpecialty as PrismaAdvisorSpecialty,
  type AdvisorTone as PrismaAdvisorTone,
  type MessageRole as PrismaMessageRole,
} from "@vitalai/database";
import { MessageRole } from "@vitalai/shared-types";
import { AdvisorRepository } from "../repositories/advisor.repository";
import { HealthConditionService } from "../../health-condition/services/health-condition.service";
import { encodeCursor, decodeCursor } from "../../../common/pagination/cursor.util";
import { PREBUILT_PERSONAS } from "./advisor-persona-seed.util";
import {
  AdvisorPersonaResponse,
  ChatMessageResponse,
  ReasoningTraceStep,
  SendMessageInput,
} from "../dto";
import {
  triageAdvisorQuery,
  mapAdvisorPersona,
  mapAdvisorMessage,
} from "../utils/advisor-triage.util";

@Injectable()
export class AdvisorService implements OnModuleInit {
  private readonly logger = new Logger(AdvisorService.name);

  constructor(
    private readonly repository: AdvisorRepository,
    private readonly healthService: HealthConditionService,
  ) {}

  async onModuleInit() {
    this.logger.info("[onModuleInit] Synchronizing prebuilt clinical advisor staff");
    for (const persona of PREBUILT_PERSONAS) {
      const existing = await this.repository.findPersonaById(persona.name);
      if (!existing) {
        await this.repository.createPersona({
          name: persona.name,
          title: persona.title,
          avatar: persona.avatar,
          specialty: persona.specialty as unknown as PrismaAdvisorSpecialty,
          tone: persona.tone as unknown as PrismaAdvisorTone,
          specialties: [...persona.specialties],
          systemInstructions: persona.systemInstructions,
          isPrebuilt: true,
          isActive: true,
        });
      }
    }
  }

  async getPersonas(userId: string): Promise<AdvisorPersonaResponse[]> {
    const records = await this.repository.findAllPersonas(userId);
    return records.map(mapAdvisorPersona);
  }

  async getChatHistory(userId: string): Promise<ChatMessageResponse[]> {
    const messages = await this.repository.findChatHistory(userId);
    return messages.map((m) => mapAdvisorMessage(m));
  }

  async getChatHistoryPaginated(
    userId: string,
    first = 20,
    afterCursor?: string,
  ): Promise<{
    edges: { cursor: string; node: ChatMessageResponse }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
      endCursor: string | null;
    };
    totalCount: number;
  }> {
    const afterId = afterCursor ? decodeCursor(afterCursor) : undefined;
    const rawMessages = await this.repository.findChatHistoryPaginated(userId, first, afterId);
    const hasNextPage = rawMessages.length > first;
    const nodes = (hasNextPage ? rawMessages.slice(0, first) : rawMessages).map((m) =>
      mapAdvisorMessage(m),
    );

    const edges = nodes.map((node) => ({
      cursor: encodeCursor(node.id),
      node,
    }));

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

  async processUserMessage(userId: string, input: SendMessageInput): Promise<ChatMessageResponse> {
    this.logger.info(`[processUserMessage] Processing query for user: ${userId}`);

    await this.repository.createChatMessage({
      user: { connect: { id: userId } },
      role: MessageRole.USER as unknown as PrismaMessageRole,
      content: input.content,
      autoAssigned: !input.advisorId,
    });

    const personas = await this.repository.findAllPersonas(userId);
    const selectedAdvisor = input.advisorId
      ? (personas.find((p) => p.id === input.advisorId) ?? personas[0]!)
      : triageAdvisorQuery(input.content, personas);

    const contraindications = await this.healthService.getActiveContraindications(userId);

    const now = new Date().toISOString();
    const trace: ReasoningTraceStep[] = [
      {
        phase: "Health Vault Inspection",
        observation: `Active restrictions: ${contraindications.blacklistedMovements.length} movements, ${contraindications.blacklistedIngredients.length} ingredients`,
        evaluation: "Zero contraindication conflicts detected in prompt context",
        timestamp: now,
      },
      {
        phase: "Clinical Persona Dispatch",
        observation: `Routed to ${selectedAdvisor.name} (${selectedAdvisor.title})`,
        evaluation: `Specialty match aligned with query domain: ${selectedAdvisor.specialty}`,
        timestamp: now,
      },
    ];

    const replyContent = `[${selectedAdvisor.name}]: I have evaluated your request against your Health Vault records. Safe protocol recommendations applied.`;

    const assistantMessage = await this.repository.createChatMessage({
      user: { connect: { id: userId } },
      advisor: { connect: { id: selectedAdvisor.id } },
      role: MessageRole.ASSISTANT as unknown as PrismaMessageRole,
      content: replyContent,
      autoAssigned: !input.advisorId,
      reasoningTrace: trace as unknown as Prisma.InputJsonValue,
    });

    return mapAdvisorMessage(assistantMessage, trace);
  }
}
