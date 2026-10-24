/**
 * @file apps/api/src/main.ts
 * @description Bootstrap entrypoint for the VitalAI API Gateway using NestJS with Fastify HTTP adapter,
 * Mercurius GraphQL engine, Swagger OpenAPI docs, and DevLab platform standards.
 * @module @vitalai/api
 */

import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "@yuva-devlab/logger";
import { config } from "./config";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";

/**
 * Bootstraps the high-performance Fastify API gateway.
 */
async function bootstrap(): Promise<void> {
  const logger = new Logger("Bootstrap");

  logger.info("[bootstrap] Initializing Fastify HTTP adapter");
  const fastifyAdapter = new FastifyAdapter({
    logger: false, // DevLab unified logger handles logging
  });

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);

  // Global REST API prefix with exclusions for health and GraphQL routes
  app.setGlobalPrefix("api/v1", {
    exclude: ["health", "graphql", "graphiql"],
  });

  // Cross-Origin Resource Sharing (CORS)
  app.enableCors({
    origin: [config.webUrl, config.portalApiUrl],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  });

  // Global Exception Filter & Response Interceptor
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger OpenAPI Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle("VitalAI API Gateway")
    .setDescription("Enterprise AI-Powered Health, Fitness & Medical Nutrition Platform")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document);

  // Enable graceful shutdown hooks for clean database pool disconnection
  app.enableShutdownHooks();

  // Bind to 0.0.0.0 for container/daemon compatibility
  await app.listen(config.port, "0.0.0.0");

  logger.info(`🚀 VitalAI API running on http://localhost:${config.port}`);
  logger.info(`📊 Health check: http://localhost:${config.port}/health`);
  logger.info(`📖 Swagger docs: http://localhost:${config.port}/api/docs`);
  logger.info(`⚡ Mercurius GraphQL: http://localhost:${config.port}/graphql`);
  logger.info(`🎮 GraphiQL IDE: http://localhost:${config.port}/graphiql`);
}

bootstrap().catch((error) => {
  const logger = new Logger("Bootstrap");
  logger.error("[bootstrap] Fatal server startup error", error);
  process.exit(1);
});
