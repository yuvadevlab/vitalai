/**
 * @file apps/api/src/modules/user/repositories/user.repository.ts
 * @description Data access repository managing User entity persistence via Prisma ORM.
 * @module @vitalai/api/user
 */

import { Injectable } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import { type User } from "@vitalai/database";
import { PrismaService } from "../../prisma/prisma.service";
import { CompleteOnboardingInput } from "../dto/complete-onboarding.input";
import { UpdateProfileInput } from "../dto/update-profile.input";

/**
 * Repository isolating SQL operations on the users table.
 */
@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Finds a user by their unique primary key ID.
   *
   * @param id - User UUID
   * @returns User entity or null if not found
   */
  async findById(id: string): Promise<User | null> {
    this.logger.info(`[findById] Looking up user: ${id}`);
    return this.prisma.client.user.findUnique({
      where: { id },
    });
  }

  /**
   * Finds a user by unique email address.
   *
   * @param email - User email
   * @returns User entity or null if not found
   */
  async findByEmail(email: string): Promise<User | null> {
    this.logger.info(`[findByEmail] Looking up user by email: ${email}`);
    return this.prisma.client.user.findUnique({
      where: { email },
    });
  }

  /**
   * Updates physical metrics and marks onboarding as completed.
   *
   * @param userId - Authenticated user UUID
   * @param data - Onboarding vitals payload
   * @returns Updated User entity
   */
  async completeOnboarding(userId: string, data: CompleteOnboardingInput): Promise<User> {
    this.logger.info(`[completeOnboarding] Completing onboarding for user: ${userId}`);
    return this.prisma.client.user.update({
      where: { id: userId },
      data: {
        biologicalSex: data.biologicalSex,
        activityLevel: data.activityLevel,
        caloricGoal: data.caloricGoal,
        lifeStage: data.lifeStage,
        weightKg: data.weightKg,
        heightCm: data.heightCm,
        age: data.age,
        availableEquipment: data.availableEquipment,
        isHomeGym: data.isHomeGym,
        onboardingCompleted: true,
      },
    });
  }

  /**
   * Applies partial updates to an existing user record.
   *
   * @param userId - Authenticated user UUID
   * @param data - Partial fields to update
   * @returns Updated User entity
   */
  async updateProfile(userId: string, data: UpdateProfileInput): Promise<User> {
    this.logger.info(`[updateProfile] Updating profile for user: ${userId}`);
    return this.prisma.client.user.update({
      where: { id: userId },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl }),
        ...(data.activityLevel !== undefined && { activityLevel: data.activityLevel }),
        ...(data.caloricGoal !== undefined && { caloricGoal: data.caloricGoal }),
        ...(data.lifeStage !== undefined && { lifeStage: data.lifeStage }),
        ...(data.weightKg !== undefined && { weightKg: data.weightKg }),
        ...(data.heightCm !== undefined && { heightCm: data.heightCm }),
        ...(data.age !== undefined && { age: data.age }),
        ...(data.availableEquipment !== undefined && {
          availableEquipment: data.availableEquipment,
        }),
        ...(data.isHomeGym !== undefined && { isHomeGym: data.isHomeGym }),
      },
    });
  }
}
