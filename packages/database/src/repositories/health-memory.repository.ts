/**
 * @file packages/database/src/repositories/health-memory.repository.ts
 * @description Health Memory Vault queries and mutations with mandatory userId scoping.
 * @module @vitalai/database
 */

import { prisma, type PrismaClient } from "../client";
import type { Prisma, HealthCondition } from "@prisma/client";

export class HealthMemoryRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async listByUserId(userId: string, activeOnly = false): Promise<HealthCondition[]> {
    return this.db.healthCondition.findMany({
      where: {
        userId,
        ...(activeOnly ? { active: true } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(userId: string, id: string): Promise<HealthCondition | null> {
    return this.db.healthCondition.findFirst({
      where: { id, userId },
    });
  }

  async create(
    userId: string,
    data: Omit<Prisma.HealthConditionCreateInput, "user">,
  ): Promise<HealthCondition> {
    return this.db.healthCondition.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  async update(
    userId: string,
    id: string,
    data: Prisma.HealthConditionUpdateInput,
  ): Promise<HealthCondition> {
    const existing = await this.findById(userId, id);
    if (!existing) {
      throw new Error("Health condition not found or unauthorized");
    }

    return this.db.healthCondition.update({
      where: { id },
      data,
    });
  }

  async toggleActive(userId: string, id: string, active: boolean): Promise<HealthCondition> {
    return this.update(userId, id, { active });
  }

  async delete(userId: string, id: string): Promise<HealthCondition> {
    const existing = await this.findById(userId, id);
    if (!existing) {
      throw new Error("Health condition not found or unauthorized");
    }

    return this.db.healthCondition.delete({
      where: { id },
    });
  }
}
