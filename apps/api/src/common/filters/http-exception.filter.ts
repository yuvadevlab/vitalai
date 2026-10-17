/**
 * @file apps/api/src/common/filters/http-exception.filter.ts
 * @description Global exception filter converting unhandled errors and HTTP exceptions
 * into standardized, sanitized JSON error responses with logging.
 * @module @vitalai/api/common
 */

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { Logger } from "@yuva-devlab/logger";

interface ErrorResponseBody {
  readonly statusCode: number;
  readonly message: string | string[];
  readonly error: string;
  readonly timestamp: string;
  readonly path: string;
}

/**
 * Intercepts all thrown exceptions across Fastify route handlers.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = "An unexpected internal server error occurred";
    let errorName = "Internal Server Error";

    if (isHttp) {
      const exceptionResponse = exception.getResponse();
      errorName = exception.name;

      if (typeof exceptionResponse === "string") {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === "object" && exceptionResponse !== null) {
        const body = exceptionResponse as Record<string, unknown>;
        message = (body.message as string | string[]) || exception.message;
        errorName = (body.error as string) || exception.name;
      }
    } else if (exception instanceof Error) {
      this.logger.error(
        `[catch] Unhandled application exception: ${exception.message}`,
        exception.stack,
      );
    }

    const payload: ErrorResponseBody = {
      statusCode: status,
      message,
      error: errorName,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`[catch] HTTP ${status} on ${request.method} ${request.url}`);
    } else {
      this.logger.warn(`[catch] HTTP ${status} on ${request.method} ${request.url}`);
    }

    response.status(status).send(payload);
  }
}
