/**
 * @file apps/api/src/modules/nutrition/repositories/nutrition.repository.ts
 * @description Data access repository for DailyMealPlan and MealItem models in PostgreSQL.
 * @module @vitalai/api/nutrition
 */

import { Injectable } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import { type Prisma } from "@vitalai/database";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class NutritionRepository {
  private readonly logger = new Logger(NutritionRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findMealPlanByDate(userId: string, date: Date) {
    this.logger.info(
      `[findMealPlanByDate] Fetching meal plan for user: ${userId} on ${date.toISOString().split("T")[0]}`,
    );
    return this.prisma.client.dailyMealPlan.findFirst({
      where: {
        userId,
        date: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lte: new Date(date.setHours(23, 59, 59, 999)),
        },
      },
      include: {
        meals: { orderBy: { createdAt: "asc" } },
      },
    });
  }

  async findMealPlanById(id: string, userId: string) {
    this.logger.info(`[findMealPlanById] Fetching meal plan ${id} for user: ${userId}`);
    return this.prisma.client.dailyMealPlan.findFirst({
      where: { id, userId },
      include: {
        meals: { orderBy: { createdAt: "asc" } },
      },
    });
  }

  async createMealPlan(data: Prisma.DailyMealPlanCreateInput) {
    this.logger.info(`[createMealPlan] Creating daily meal plan`);
    return this.prisma.client.dailyMealPlan.create({
      data,
      include: { meals: true },
    });
  }

  async addMealItem(data: Prisma.MealItemCreateInput) {
    this.logger.info(`[addMealItem] Adding meal item '${data.name}'`);
    return this.prisma.client.mealItem.create({ data });
  }

  async removeMealItem(mealItemId: string, userId: string) {
    this.logger.info(`[removeMealItem] Removing meal item ${mealItemId} for user: ${userId}`);
    const item = await this.prisma.client.mealItem.findFirst({
      where: {
        id: mealItemId,
        plan: { userId },
      },
    });
    if (!item) return false;

    await this.prisma.client.mealItem.delete({ where: { id: mealItemId } });
    return true;
  }

  async incrementWater(dailyMealPlanId: string, waterMl: number) {
    this.logger.info(
      `[incrementWater] Incrementing water for plan ${dailyMealPlanId} by ${waterMl}ml`,
    );
    return this.prisma.client.dailyMealPlan.update({
      where: { id: dailyMealPlanId },
      data: { waterLoggedMl: { increment: waterMl } },
      include: { meals: true },
    });
  }
}
