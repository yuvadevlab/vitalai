/**
 * @file apps/api/src/modules/user/resolvers/user.resolver.ts
 * @description GraphQL resolver exposing user profile queries and onboarding mutations.
 * @module @vitalai/api/user
 */

import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Logger } from "@yuva-devlab/logger";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { CurrentUser, type RequestUser } from "../../../common/decorators/current-user.decorator";
import { UserService } from "../services/user.service";
import { UserProfileResponse } from "../dto/user.dto";
import { CompleteOnboardingInput } from "../dto/complete-onboarding.input";
import { UpdateProfileInput } from "../dto/update-profile.input";

/**
 * Resolver for authenticated user profile operations.
 */
@Resolver(() => UserProfileResponse)
@UseGuards(JwtAuthGuard)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UserService) {}

  /**
   * Fetches the profile and dynamic vitals of the currently authenticated caller.
   */
  @Query(() => UserProfileResponse, {
    name: "me",
    description: "Returns the authenticated user profile with calculated caloric targets",
  })
  async me(@CurrentUser() user: RequestUser): Promise<UserProfileResponse> {
    this.logger.info(`[me] Query requested by user: ${user.id}`);
    return this.userService.getUserProfile(user.id);
  }

  /**
   * Completes the onboarding questionnaire and unlocks full application features.
   */
  @Mutation(() => UserProfileResponse, {
    name: "completeOnboarding",
    description: "Submits onboarding questionnaire and calculates baseline nutrition targets",
  })
  async completeOnboarding(
    @CurrentUser() user: RequestUser,
    @Args("input") input: CompleteOnboardingInput,
  ): Promise<UserProfileResponse> {
    this.logger.info(`[completeOnboarding] Mutation called by user: ${user.id}`);
    return this.userService.completeOnboarding(user.id, input);
  }

  /**
   * Updates select user attributes or vitals.
   */
  @Mutation(() => UserProfileResponse, {
    name: "updateProfile",
    description: "Updates profile settings, equipment, or physical measurements",
  })
  async updateProfile(
    @CurrentUser() user: RequestUser,
    @Args("input") input: UpdateProfileInput,
  ): Promise<UserProfileResponse> {
    this.logger.info(`[updateProfile] Mutation called by user: ${user.id}`);
    return this.userService.updateProfile(user.id, input);
  }
}
