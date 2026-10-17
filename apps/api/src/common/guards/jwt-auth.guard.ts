/**
 * @file apps/api/src/common/guards/jwt-auth.guard.ts
 * @description Route guard enforcing valid JWT credentials on endpoints and resolvers.
 * @module @vitalai/api/common
 */

import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";

/**
 * Guard that verifies bearer tokens across both HTTP and GraphQL contexts.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  getRequest(context: ExecutionContext): unknown {
    if (context.getType<string>() === "graphql") {
      const gqlContext = GqlExecutionContext.create(context).getContext<{ req: unknown }>();
      return gqlContext.req;
    }
    return context.switchToHttp().getRequest();
  }
}
