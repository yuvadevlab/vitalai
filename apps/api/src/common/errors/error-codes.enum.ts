/**
 * @file apps/api/src/common/errors/error-codes.enum.ts
 * @description Standardized DevLab platform error codes for GraphQL error extensions.
 * @module @vitalai/api/common
 */

export enum DevLabErrorCode {
  UNAUTHENTICATED = "UNAUTHENTICATED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  BAD_USER_INPUT = "BAD_USER_INPUT",
  CONTRAINDICATION_VIOLATION = "CONTRAINDICATION_VIOLATION",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}
