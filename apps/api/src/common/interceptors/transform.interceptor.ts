/**
 * @file apps/api/src/common/interceptors/transform.interceptor.ts
 * @description Standard response envelope interceptor wrapping REST controller outputs.
 * @module @vitalai/api/common
 */

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface ApiResponse<T> {
  readonly data: T;
  readonly timestamp: string;
}

/**
 * Wraps REST responses in a standardized { data, timestamp } payload.
 * Passes through GraphQL executions and SSE event streams unchanged.
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T> | T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T> | T> {
    // Skip transformation for GraphQL requests or custom streaming responses
    if (context.getType<string>() === "graphql") {
      return next.handle();
    }

    return next.handle().pipe(
      map((data: T) => {
        // If data is already an envelope or null/undefined, return directly
        if (data && typeof data === "object" && "data" in (data as Record<string, unknown>)) {
          return data;
        }
        return {
          data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
