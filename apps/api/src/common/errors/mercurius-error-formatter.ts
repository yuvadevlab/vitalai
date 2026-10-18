/**
 * @file apps/api/src/common/errors/mercurius-error-formatter.ts
 * @description Formatter sanitizing and structuring Mercurius GraphQL errors to match DevLab platform standards.
 * @module @vitalai/api/common
 */

import {
  type ExecutionResult,
  type FormattedExecutionResult,
  type GraphQLFormattedError,
} from "graphql";
import { Logger } from "@yuva-devlab/logger";
import { DevLabErrorCode } from "./error-codes.enum";

const logger = new Logger("GraphQLErrorFormatter");

export function formatMercuriusErrors(execution: ExecutionResult): {
  statusCode: number;
  response: FormattedExecutionResult;
} {
  if (!execution.errors || execution.errors.length === 0) {
    return { statusCode: 200, response: execution };
  }

  const formattedErrors: GraphQLFormattedError[] = execution.errors.map((error) => {
    const original = error.originalError;
    const extensions = error.extensions ?? {};

    const code =
      (extensions.code as string) ??
      (original && "code" in original
        ? String((original as { code: unknown }).code)
        : DevLabErrorCode.INTERNAL_SERVER_ERROR);

    logger.warn(`[formatMercuriusErrors] GraphQL Error [${code}]: ${error.message}`);

    return {
      message: error.message,
      locations: error.locations,
      path: error.path,
      extensions: {
        code,
        timestamp: (extensions.timestamp as string) ?? new Date().toISOString(),
        ...(extensions.details ? { details: extensions.details as Record<string, unknown> } : {}),
      },
    };
  });

  return {
    statusCode: 200,
    response: {
      data: execution.data,
      errors: formattedErrors,
    },
  };
}
