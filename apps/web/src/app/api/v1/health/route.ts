/**
 * @file apps/web/src/app/api/v1/health/route.ts
 * @description Health probe route handler for VitalAI Web frontend.
 * @module @vitalai/web/api/v1/health
 */

import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: "ok",
    service: "vitalai-web",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
}
