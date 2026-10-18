/**
 * @file apps/api/src/common/dataloaders/dataloader.module.ts
 * @description NestJS module exporting DataLoaderService globally.
 * @module @vitalai/api/common
 */

import { Global, Module } from "@nestjs/common";
import { DataLoaderService } from "./dataloader.service";

@Global()
@Module({
  providers: [DataLoaderService],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}
