/**
 * @file apps/api/src/modules/advisor/controllers/advisor-stream.controller.ts
 * @description Fastify SSE Streaming Controller providing real-time AI tokens and reasoning traces.
 * @module @vitalai/api/advisor
 */

import { Controller, Post, Body, Res, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { Logger } from "@yuva-devlab/logger";
import { type FastifyReply } from "fastify";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { CurrentUser, type RequestUser } from "../../../common/decorators/current-user.decorator";
import { AdvisorService } from "../services/advisor.service";

@ApiTags("Advisor")
@Controller("advisor")
@UseGuards(JwtAuthGuard)
export class AdvisorStreamController {
  private readonly logger = new Logger(AdvisorStreamController.name);

  constructor(private readonly service: AdvisorService) {}

  @Post("stream")
  @ApiBearerAuth()
  @ApiOperation({ summary: "SSE Streaming AI Advisor token endpoint" })
  async streamChat(
    @CurrentUser() user: RequestUser,
    @Body() body: { content: string; advisorId?: string },
    @Res() reply: FastifyReply,
  ): Promise<void> {
    this.logger.info(`[streamChat] Starting SSE stream for user: ${user.id}`);

    reply.raw.setHeader("Content-Type", "text/event-stream");
    reply.raw.setHeader("Cache-Control", "no-cache");
    reply.raw.setHeader("Connection", "keep-alive");
    reply.raw.setHeader("Access-Control-Allow-Origin", "*");

    // 1. Emit Initial Reasoning Phase
    const step1 = JSON.stringify({
      type: "reasoning",
      phase: "Health Vault Cross-Reference",
      detail: "Scanning clinical contraindications and active injury records...",
    });
    reply.raw.write(`data: ${step1}\n\n`);

    // 2. Process query via service
    const response = await this.service.processUserMessage(user.id, body);

    // 3. Emit tokens
    const step2 = JSON.stringify({
      type: "token",
      content: response.content,
      advisor: response.advisor,
    });
    reply.raw.write(`data: ${step2}\n\n`);

    // 4. Emit Completed Event
    reply.raw.write(`data: ${JSON.stringify({ type: "done", messageId: response.id })}\n\n`);
    reply.raw.end();
  }
}
