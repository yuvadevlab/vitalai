/**
 * @file apps/api/src/modules/advisor/repositories/advisor.repository.ts
 * @description Data access repository for AdvisorPersona and ChatMessage models in PostgreSQL.
 * @module @vitalai/api/advisor
 */

import { Injectable } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import { type Prisma } from "@vitalai/database";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AdvisorRepository {
  private readonly logger = new Logger(AdvisorRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAllPersonas(userId: string) {
    this.logger.info(`[findAllPersonas] Fetching personas available to user: ${userId}`);
    return this.prisma.client.advisorPersona.findMany({
      where: {
        OR: [{ isPrebuilt: true }, { userId }],
        isActive: true,
      },
      orderBy: { createdAt: "asc" },
    });
  }

  async findPersonaById(id: string) {
    return this.prisma.client.advisorPersona.findUnique({
      where: { id },
    });
  }

  async createPersona(data: Prisma.AdvisorPersonaCreateInput) {
    return this.prisma.client.advisorPersona.create({ data });
  }

  async findChatHistory(userId: string, limit = 50) {
    this.logger.info(`[findChatHistory] Fetching recent ${limit} messages for user: ${userId}`);
    return this.prisma.client.chatMessage.findMany({
      where: { userId },
      include: { advisor: true },
      orderBy: { createdAt: "asc" },
      take: limit,
    });
  }

  async findChatHistoryPaginated(userId: string, first = 20, afterId?: string) {
    this.logger.info(
      `[findChatHistoryPaginated] Cursor lookup for user: ${userId} (first=${first})`,
    );
    return this.prisma.client.chatMessage.findMany({
      where: { userId },
      include: { advisor: true },
      orderBy: { createdAt: "asc" },
      take: first + 1,
      ...(afterId ? { cursor: { id: afterId }, skip: 1 } : {}),
    });
  }

  async countChatMessages(userId: string): Promise<number> {
    return this.prisma.client.chatMessage.count({ where: { userId } });
  }

  async createChatMessage(data: Prisma.ChatMessageCreateInput) {
    this.logger.info(`[createChatMessage] Recording message for user`);
    return this.prisma.client.chatMessage.create({
      data,
      include: { advisor: true },
    });
  }
}
