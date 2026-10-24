/**
 * @file apps/api/src/app.module.ts
 * @description Master NestJS root module assembling GraphQL (Mercurius Fastify),
 * PostgreSQL persistence (PrismaModule), DevLab SSO authentication (AuthModule),
 * batch DataLoaders, and system health probes.
 * @module @vitalai/api
 */

import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MercuriusDriver, type MercuriusDriverConfig } from "@nestjs/mercurius";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { DataLoaderModule } from "./common/dataloaders/dataloader.module";
import { DataLoaderService } from "./common/dataloaders/dataloader.service";
import { formatMercuriusErrors } from "./common/errors/mercurius-error-formatter";
import { UserModule } from "./modules/user/user.module";
import { HealthConditionModule } from "./modules/health-condition/health-condition.module";
import { WorkoutModule } from "./modules/workout/workout.module";
import { NutritionModule } from "./modules/nutrition/nutrition.module";
import { AdvisorModule } from "./modules/advisor/advisor.module";
import { PlatformModule } from "./modules/platform/platform.module";
import { AppController } from "./app.controller";
import { AppResolver } from "./app.resolver";

/**
 * Root application module coordinating the core gateway infrastructure.
 */
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    DataLoaderModule,
    UserModule,
    HealthConditionModule,
    WorkoutModule,
    NutritionModule,
    AdvisorModule,
    PlatformModule,
    GraphQLModule.forRootAsync<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      imports: [DataLoaderModule],
      inject: [DataLoaderService],
      useFactory: (dataLoaderService: DataLoaderService) => ({
        autoSchemaFile: true,
        graphiql: true,
        path: "/graphql",
        routes: true,
        errorFormatter: formatMercuriusErrors,
        context: (request: unknown, reply: unknown) => ({
          req: request,
          reply,
          loaders: dataLoaderService.createLoaders(),
        }),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppResolver],
})
export class AppModule {}
