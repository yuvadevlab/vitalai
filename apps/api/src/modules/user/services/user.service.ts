/**
 * @file apps/api/src/modules/user/services/user.service.ts
 * @description Domain business logic service managing user profiles and metabolic target calculations.
 * @module @vitalai/api/user
 */

import { Injectable, NotFoundException } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import { type User } from "@vitalai/database";
import { BiologicalSex, ActivityLevel, CaloricGoal, LifeStage } from "@vitalai/shared-types";
import { calculateBmrMifflinStJeor, calculateTdee } from "@vitalai/vital-engine";
import { UserRepository } from "../repositories/user.repository";
import { CompleteOnboardingInput } from "../dto/complete-onboarding.input";
import { UpdateProfileInput } from "../dto/update-profile.input";
import { CaloricTargetsResponse, UserProfileResponse } from "../dto/user.dto";

/**
 * Service managing user lifecycle and physiological energy computations.
 */
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Retrieves user profile by ID and calculates dynamic metabolic targets.
   *
   * @param userId - Authenticated user UUID
   * @returns UserProfileResponse with attached caloric targets
   */
  async getUserProfile(userId: string): Promise<UserProfileResponse> {
    this.logger.info(`[getUserProfile] Fetching profile for user: ${userId}`);
    const user = await this.userRepository.findById(userId);
    if (!user) {
      this.logger.warn(`[getUserProfile] User not found: ${userId}`);
      throw new NotFoundException(`User with ID ${userId} does not exist`);
    }

    return this.mapToProfileResponse(user);
  }

  /**
   * Finalizes onboarding questionnaire and recalculates nutrition goals.
   *
   * @param userId - Authenticated user UUID
   * @param input - Onboarding questionnaire answers
   * @returns Updated UserProfileResponse
   */
  async completeOnboarding(
    userId: string,
    input: CompleteOnboardingInput,
  ): Promise<UserProfileResponse> {
    this.logger.info(`[completeOnboarding] Processing onboarding submission for user: ${userId}`);
    const updatedUser = await this.userRepository.completeOnboarding(userId, input);
    return this.mapToProfileResponse(updatedUser);
  }

  /**
   * Modifies profile attributes and updates derived metrics.
   *
   * @param userId - Authenticated user UUID
   * @param input - Update payload
   * @returns Updated UserProfileResponse
   */
  async updateProfile(userId: string, input: UpdateProfileInput): Promise<UserProfileResponse> {
    this.logger.info(`[updateProfile] Processing profile update for user: ${userId}`);
    const updatedUser = await this.userRepository.updateProfile(userId, input);
    return this.mapToProfileResponse(updatedUser);
  }

  /**
   * Derives deterministic caloric and macronutrient targets based on user biometrics.
   *
   * @param user - User database model
   * @returns CaloricTargetsResponse or null if vitals are incomplete
   */
  calculateMetabolicTargets(user: User): CaloricTargetsResponse | null {
    if (
      !user.weightKg ||
      !user.heightCm ||
      !user.age ||
      !user.biologicalSex ||
      !user.activityLevel
    ) {
      return null;
    }

    const bmr = calculateBmrMifflinStJeor({
      weightKg: user.weightKg,
      heightCm: user.heightCm,
      ageYears: user.age,
      sex: user.biologicalSex as unknown as BiologicalSex,
    });

    const tdee = calculateTdee(bmr, user.activityLevel as unknown as ActivityLevel);

    // Apply caloric goal delta (-500 kcal deficit, +300 kcal surplus, 0 maintenance)
    let targetCalories = tdee;
    if (user.caloricGoal === "deficit") {
      targetCalories = Math.max(1200, tdee - 500);
    } else if (user.caloricGoal === "surplus") {
      targetCalories = tdee + 300;
    }

    // Macronutrient distribution: 2.0g protein/kg bodyweight, 25% fat, remainder carbs
    const targetProteinGrams = Math.round(user.weightKg * 2.0);
    const fatCalories = targetCalories * 0.25;
    const targetFatsGrams = Math.round(fatCalories / 9);
    const remainingCalories = targetCalories - targetProteinGrams * 4 - fatCalories;
    const targetCarbsGrams = Math.max(0, Math.round(remainingCalories / 4));

    return {
      bmrKcal: bmr,
      tdeeKcal: tdee,
      targetCalories,
      targetProteinGrams,
      targetCarbsGrams,
      targetFatsGrams,
    };
  }

  /**
   * Maps a Prisma User record into a typed GraphQL UserProfileResponse.
   */
  private mapToProfileResponse(user: User): UserProfileResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      onboardingCompleted: user.onboardingCompleted,
      biologicalSex: user.biologicalSex as BiologicalSex | null,
      activityLevel: user.activityLevel as ActivityLevel | null,
      caloricGoal: user.caloricGoal as CaloricGoal | null,
      lifeStage: user.lifeStage as LifeStage,
      weightKg: user.weightKg,
      heightCm: user.heightCm,
      age: user.age,
      availableEquipment: user.availableEquipment,
      isHomeGym: user.isHomeGym,
      caloricTargets: this.calculateMetabolicTargets(user),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
