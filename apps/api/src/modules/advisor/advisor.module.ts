/**
 * @file apps/api/src/modules/advisor/advisor.module.ts
 * @description NestJS module configuring AI Advisor studio, personas, chat history, and Fastify SSE streaming.
 * @module @vitalai/api/advisor
 */

import { Module } from "@nestjs/common";
import { HealthConditionModule } from "../health-condition/health-condition.module";
import { AdvisorRepository } from "./repositories/advisor.repository";
import { AdvisorService } from "./services/advisor.service";
import { AdvisorResolver } from "./resolvers/advisor.resolver";
import { AdvisorStreamController } from "./controllers/advisor-stream.controller";

@Module({
  imports: [HealthConditionModule],
  controllers: [AdvisorStreamController],
  providers: [AdvisorRepository, AdvisorService, AdvisorResolver],
  exports: [AdvisorService, AdvisorRepository],
})
export class AdvisorModule {}
