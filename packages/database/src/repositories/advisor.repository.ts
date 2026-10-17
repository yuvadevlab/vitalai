/**
 * @file packages/database/src/repositories/advisor.repository.ts
 * @description Advisor persona and chat history persistence with userId scoping.
 * @module @vitalai/database
 */

import { prisma, type PrismaClient } from "../client";
import type { Prisma, AdvisorPersona, ChatMessage } from "@prisma/client";

export class AdvisorRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async listAvailablePersonas(userId: string): Promise<AdvisorPersona[]> {
    return this.db.advisorPersona.findMany({
      where: {
        OR: [{ isPrebuilt: true }, { userId }],
        isActive: true,
      },
      orderBy: [{ isPrebuilt: "desc" }, { createdAt: "asc" }],
    });
  }

  async createCustomPersona(
    userId: string,
    data: Omit<Prisma.AdvisorPersonaCreateInput, "user">,
  ): Promise<AdvisorPersona> {
    return this.db.advisorPersona.create({
      data: {
        ...data,
        isPrebuilt: false,
        user: { connect: { id: userId } },
      },
    });
  }

  async listChatHistory(userId: string, limit = 50): Promise<ChatMessage[]> {
    return this.db.chatMessage.findMany({
      where: { userId },
      take: limit,
      orderBy: { createdAt: "asc" },
      include: { advisor: true },
    });
  }

  async appendMessage(
    userId: string,
    data: Omit<Prisma.ChatMessageCreateInput, "user">,
  ): Promise<ChatMessage> {
    return this.db.chatMessage.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
      include: { advisor: true },
    });
  }
}
