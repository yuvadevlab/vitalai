/**
 * @file packages/database/src/repositories/nutrition.repository.ts
 * @description Daily meal plan, food logging, and hydration operations with strict userId scoping.
 * @module @vitalai/database
 */

import { prisma, type PrismaClient } from "../client";
import type { Prisma, DailyMealPlan, MealItem } from "@prisma/client";

export class NutritionRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async getDailyPlan(userId: string, date: Date): Promise<DailyMealPlan | null> {
    return this.db.dailyMealPlan.findUnique({
      where: {
        userId_date: { userId, date },
      },
      include: {
        meals: { orderBy: { createdAt: "asc" } },
      },
    });
  }

  async upsertDailyPlan(
    userId: string,
    date: Date,
    data: Omit<Prisma.DailyMealPlanCreateInput, "user" | "date">,
  ): Promise<DailyMealPlan> {
    return this.db.dailyMealPlan.upsert({
      where: {
        userId_date: { userId, date },
      },
      create: {
        ...data,
        date,
        user: { connect: { id: userId } },
      },
      update: {
        targetCalories: data.targetCalories,
        targetProtein: data.targetProtein,
        targetCarbs: data.targetCarbs,
        targetFats: data.targetFats,
        targetWaterMl: data.targetWaterMl,
      },
      include: { meals: true },
    });
  }

  async logMealItem(
    userId: string,
    dailyMealPlanId: string,
    item: Omit<Prisma.MealItemCreateInput, "plan">,
  ): Promise<MealItem> {
    const plan = await this.db.dailyMealPlan.findFirst({
      where: { id: dailyMealPlanId, userId },
    });

    if (!plan) {
      throw new Error("Daily meal plan not found or unauthorized");
    }

    return this.db.mealItem.create({
      data: {
        ...item,
        plan: { connect: { id: dailyMealPlanId } },
      },
    });
  }

  async addWater(userId: string, date: Date, amountMl: number): Promise<DailyMealPlan> {
    return this.db.dailyMealPlan.update({
      where: {
        userId_date: { userId, date },
      },
      data: {
        waterLoggedMl: { increment: amountMl },
      },
    });
  }
}
