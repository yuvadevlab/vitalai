/**
 * @file apps/api/src/modules/nutrition/resolvers/nutrition.resolver.ts
 * @description GraphQL resolver for meal planning, meal items, hydration, and metabolic summaries.
 * @module @vitalai/api/nutrition
 */

import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Logger } from "@yuva-devlab/logger";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { CurrentUser, type RequestUser } from "../../../common/decorators/current-user.decorator";
import { NutritionService } from "../services/nutrition.service";
import {
  DailyMealPlanResponse,
  MealItemResponse,
  CreateDailyMealPlanInput,
  AddMealItemInput,
  LogWaterInput,
} from "../dto";

@Resolver()
@UseGuards(JwtAuthGuard)
export class NutritionResolver {
  private readonly logger = new Logger(NutritionResolver.name);

  constructor(private readonly service: NutritionService) {}

  @Query(() => DailyMealPlanResponse, {
    name: "todayMealPlan",
    description: "Fetches or lazily instantiates the meal plan for the current calendar day",
  })
  async getTodayMealPlan(@CurrentUser() user: RequestUser) {
    this.logger.info(`[getTodayMealPlan] Query called by user: ${user.id}`);
    return this.service.getOrCreateTodayPlan(user.id);
  }

  @Query(() => DailyMealPlanResponse, {
    name: "mealPlanByDate",
    nullable: true,
    description: "Fetches a specific meal plan by YYYY-MM-DD date string",
  })
  async getMealPlanByDate(
    @CurrentUser() user: RequestUser,
    @Args("date", { type: () => String }) date: string,
  ) {
    this.logger.info(`[getMealPlanByDate] Query for date ${date} called by user: ${user.id}`);
    return this.service.getMealPlanByDate(user.id, date);
  }

  @Mutation(() => DailyMealPlanResponse, {
    name: "createDailyMealPlan",
    description: "Generates a customized daily nutrition target plan based on vitals and trimester",
  })
  async createDailyMealPlan(
    @CurrentUser() user: RequestUser,
    @Args("input") input: CreateDailyMealPlanInput,
  ) {
    this.logger.info(`[createDailyMealPlan] Generating plan for user: ${user.id}`);
    return this.service.createDailyMealPlan(user.id, input);
  }

  @Mutation(() => MealItemResponse, {
    name: "addMealItem",
    description: "Logs a food item with automatic medical contraindication verification",
  })
  async addMealItem(@CurrentUser() user: RequestUser, @Args("input") input: AddMealItemInput) {
    this.logger.info(`[addMealItem] Adding meal item called by user: ${user.id}`);
    return this.service.addMealItem(user.id, input);
  }

  @Mutation(() => Boolean, {
    name: "removeMealItem",
    description: "Removes a meal item from the daily ledger",
  })
  async removeMealItem(
    @CurrentUser() user: RequestUser,
    @Args("mealItemId", { type: () => ID }) mealItemId: string,
  ) {
    this.logger.info(
      `[removeMealItem] Removing meal item ${mealItemId} called by user: ${user.id}`,
    );
    return this.service.removeMealItem(user.id, mealItemId);
  }

  @Mutation(() => DailyMealPlanResponse, {
    name: "logWater",
    description: "Records water intake towards daily hydration targets",
  })
  async logWater(@CurrentUser() user: RequestUser, @Args("input") input: LogWaterInput) {
    this.logger.info(`[logWater] Water logging called by user: ${user.id}`);
    return this.service.logWater(user.id, input);
  }
}
