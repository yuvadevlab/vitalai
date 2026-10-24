/**
 * @file apps/api/src/modules/nutrition/services/nutrition.service.ts
 * @description Business logic service for meal planning, purine calculation, and glycemic load analysis.
 * @module @vitalai/api/nutrition
 */

import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import {
  type DailyMealPlan,
  type MealItem as PrismaMealItem,
  type MealType as PrismaMealType,
} from "@vitalai/database";

type PlanWithMeals = DailyMealPlan & {
  readonly meals?: readonly PrismaMealItem[];
};
import { MealType, LifeStage } from "@vitalai/shared-types";
import {
  evaluateDailyPurineRisk,
  evaluateDailyGlycemicLoad,
  getLifeStageAdjustments,
} from "@vitalai/vital-engine";
import { NutritionRepository } from "../repositories/nutrition.repository";
import { UserService } from "../../user/services/user.service";
import { HealthConditionService } from "../../health-condition/services/health-condition.service";
import {
  CreateDailyMealPlanInput,
  AddMealItemInput,
  LogWaterInput,
  DailyMealPlanResponse,
  MealItemResponse,
} from "../dto";

@Injectable()
export class NutritionService {
  private readonly logger = new Logger(NutritionService.name);

  constructor(
    private readonly repository: NutritionRepository,
    private readonly userService: UserService,
    private readonly healthService: HealthConditionService,
  ) {}

  async getMealPlanByDate(userId: string, dateStr: string): Promise<DailyMealPlanResponse | null> {
    const targetDate = new Date(dateStr);
    const plan = await this.repository.findMealPlanByDate(userId, targetDate);
    if (!plan) return null;
    return this.mapToResponse(plan);
  }

  async getOrCreateTodayPlan(userId: string): Promise<DailyMealPlanResponse> {
    const today = new Date();
    const existing = await this.repository.findMealPlanByDate(userId, today);
    if (existing) {
      return this.mapToResponse(existing);
    }
    return this.createDailyMealPlan(userId, { date: today.toISOString().split("T")[0]! });
  }

  async createDailyMealPlan(
    userId: string,
    input: CreateDailyMealPlanInput,
  ): Promise<DailyMealPlanResponse> {
    this.logger.info(`[createDailyMealPlan] Generating plan for user: ${userId} on ${input.date}`);
    const userProfile = await this.userService.getUserProfile(userId);
    const dateObj = new Date(input.date);

    // Baseline targets from user biometrics
    let targetCalories = userProfile.caloricTargets?.targetCalories ?? 2200;
    const targetProtein = userProfile.caloricTargets?.targetProteinGrams ?? 150;
    const targetCarbs = userProfile.caloricTargets?.targetCarbsGrams ?? 250;
    const targetFats = userProfile.caloricTargets?.targetFatsGrams ?? 65;
    let targetWaterMl = 3000;

    // Apply obstetric trimester/postpartum surplus adjustments
    const lifeStage = userProfile.lifeStage ?? LifeStage.GENERAL_ADULT;
    const stageAdjustment = getLifeStageAdjustments(lifeStage);
    targetCalories += stageAdjustment.additionalKcal;
    targetWaterMl += stageAdjustment.hydrationSurplusMl;

    const created = await this.repository.createMealPlan({
      user: { connect: { id: userId } },
      date: dateObj,
      targetCalories,
      targetProtein,
      targetCarbs,
      targetFats,
      targetWaterMl,
      waterLoggedMl: 0,
    });

    return this.mapToResponse(created);
  }

  async addMealItem(userId: string, input: AddMealItemInput): Promise<MealItemResponse> {
    this.logger.info(`[addMealItem] Adding meal item '${input.name}' for user: ${userId}`);
    const plan = await this.repository.findMealPlanById(input.dailyMealPlanId, userId);
    if (!plan) {
      throw new NotFoundException(`Daily meal plan ${input.dailyMealPlanId} not found`);
    }

    // Guardrail Check: Verify food against active health conditions
    const contraindications = await this.healthService.getActiveContraindications(userId);
    const blacklisted = new Set(
      contraindications.blacklistedIngredients.map((i) => i.toLowerCase()),
    );

    for (const tag of input.tags) {
      if (blacklisted.has(tag.toLowerCase())) {
        this.logger.warn(
          `[addMealItem] Blocked blacklisted ingredient tag '${tag}' for user: ${userId}`,
        );
        throw new BadRequestException(
          `Cannot log '${input.name}': contains '${tag}' which is contraindicated by your active health records.`,
        );
      }
    }

    const item = await this.repository.addMealItem({
      plan: { connect: { id: input.dailyMealPlanId } },
      name: input.name,
      mealType: input.mealType as unknown as PrismaMealType,
      calories: input.calories,
      protein: input.protein,
      carbs: input.carbs,
      fats: input.fats,
      purineMg: input.purineMg,
      glycemicLoad: input.glycemicLoad,
      tags: input.tags,
    });

    return {
      id: item.id,
      name: item.name,
      mealType: item.mealType as unknown as MealType,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fats: item.fats,
      purineMg: item.purineMg,
      glycemicLoad: item.glycemicLoad,
      tags: item.tags,
      createdAt: item.createdAt.toISOString(),
    };
  }

  async removeMealItem(userId: string, mealItemId: string): Promise<boolean> {
    this.logger.info(`[removeMealItem] Removing meal item: ${mealItemId}`);
    return this.repository.removeMealItem(mealItemId, userId);
  }

  async logWater(userId: string, input: LogWaterInput): Promise<DailyMealPlanResponse> {
    this.logger.info(`[logWater] Logging ${input.waterMl}ml water for user: ${userId}`);
    const plan = await this.repository.findMealPlanById(input.dailyMealPlanId, userId);
    if (!plan) {
      throw new NotFoundException(`Daily meal plan ${input.dailyMealPlanId} not found`);
    }
    const updated = await this.repository.incrementWater(input.dailyMealPlanId, input.waterMl);
    return this.mapToResponse(updated);
  }

  private mapToResponse(plan: PlanWithMeals): DailyMealPlanResponse {
    const meals = (plan.meals ?? []).map((m) => ({
      id: m.id,
      name: m.name,
      mealType: m.mealType as unknown as MealType,
      calories: m.calories,
      protein: m.protein,
      carbs: m.carbs,
      fats: m.fats,
      purineMg: m.purineMg,
      glycemicLoad: m.glycemicLoad,
      tags: m.tags,
      createdAt: m.createdAt.toISOString(),
    }));

    const purineReport = evaluateDailyPurineRisk(meals);
    const glReport = evaluateDailyGlycemicLoad(meals);

    return {
      id: plan.id,
      date: plan.date.toISOString().split("T")[0]!,
      targetCalories: plan.targetCalories,
      targetProtein: plan.targetProtein,
      targetCarbs: plan.targetCarbs,
      targetFats: plan.targetFats,
      targetWaterMl: plan.targetWaterMl,
      waterLoggedMl: plan.waterLoggedMl,
      meals,
      purineRiskReport: {
        ...purineReport,
        offendingFoods: [...purineReport.offendingFoods],
      },
      glycemicLoadReport: glReport,
      createdAt: plan.createdAt.toISOString(),
      updatedAt: plan.updatedAt.toISOString(),
    };
  }
}
