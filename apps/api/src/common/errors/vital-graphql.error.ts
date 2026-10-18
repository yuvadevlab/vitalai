/**
 * @file apps/api/src/common/errors/vital-graphql.error.ts
 * @description Custom GraphQL error class with typed DevLab error code extensions.
 * @module @vitalai/api/common
 */

import { GraphQLError } from "graphql";
import { DevLabErrorCode } from "./error-codes.enum";

export class VitalGraphQLError extends GraphQLError {
  constructor(
    message: string,
    code: DevLabErrorCode = DevLabErrorCode.INTERNAL_SERVER_ERROR,
    statusCode = 400,
    details?: Record<string, unknown>,
  ) {
    super(message, {
      extensions: {
        code,
        statusCode,
        timestamp: new Date().toISOString(),
        ...(details ? { details } : {}),
      },
    });
  }
}
