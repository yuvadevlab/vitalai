/**
 * @file apps/api/src/common/decorators/current-user.decorator.ts
 * @description Custom parameter decorator extracting authenticated user context from requests.
 * Compatible with both Fastify REST endpoints and Mercurius GraphQL resolvers.
 * @module @vitalai/api/common
 */

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export interface RequestUser {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly avatarUrl?: string | null;
  readonly onboardingCompleted: boolean;
}

/**
 * Extracts the authenticated user object attached by JwtAuthGuard.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): RequestUser | undefined => {
    // Check if context is GraphQL
    if (context.getType<string>() === "graphql") {
      const gqlContext = GqlExecutionContext.create(context).getContext<{
        req?: { user?: RequestUser };
      }>();
      return gqlContext.req?.user;
    }

    // Default to Fastify HTTP context
    const request = context.switchToHttp().getRequest<{ user?: RequestUser }>();
    return request.user;
  },
);
