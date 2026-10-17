/**
 * @file apps/api/src/common/dataloaders/dataloader.types.ts
 * @description Interface definitions for batch DataLoaders eliminating N+1 database queries.
 * @module @vitalai/api/common
 */

import type DataLoader from "dataloader";
import { type SetLog, type PrescribedExercise, type ExerciseSwap } from "@vitalai/database";

export interface VitalDataLoaders {
  readonly setsByExerciseIdLoader: DataLoader<string, SetLog[]>;
  readonly exercisesBySessionIdLoader: DataLoader<string, PrescribedExercise[]>;
  readonly swapsByExerciseIdLoader: DataLoader<string, ExerciseSwap[]>;
}

export interface VitalGraphQLContext {
  readonly req: unknown;
  readonly reply: unknown;
  readonly loaders: VitalDataLoaders;
}
