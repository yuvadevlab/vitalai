/**
 * @file apps/api/src/common/dataloaders/dataloader.service.ts
 * @description Factory service generating per-request batch DataLoaders for PostgreSQL relations.
 * @module @vitalai/api/common
 */

import { Injectable } from "@nestjs/common";
import DataLoader from "dataloader";
import { type SetLog, type PrescribedExercise, type ExerciseSwap } from "@vitalai/database";
import { PrismaService } from "../../modules/prisma/prisma.service";
import { VitalDataLoaders } from "./dataloader.types";

@Injectable()
export class DataLoaderService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Instantiates a fresh, per-request bundle of batch loaders.
   */
  createLoaders(): VitalDataLoaders {
    return {
      setsByExerciseIdLoader: new DataLoader<string, SetLog[]>(async (exerciseIds) => {
        const sets = await this.prisma.client.setLog.findMany({
          where: { prescribedExerciseId: { in: [...exerciseIds] } },
          orderBy: { setNumber: "asc" },
        });

        const map = new Map<string, SetLog[]>();
        for (const id of exerciseIds) map.set(id, []);
        for (const set of sets) {
          map.get(set.prescribedExerciseId)?.push(set);
        }
        return exerciseIds.map((id) => map.get(id) ?? []);
      }),

      exercisesBySessionIdLoader: new DataLoader<string, PrescribedExercise[]>(
        async (sessionIds) => {
          const exercises = await this.prisma.client.prescribedExercise.findMany({
            where: { sessionId: { in: [...sessionIds] } },
            orderBy: { orderIndex: "asc" },
          });

          const map = new Map<string, PrescribedExercise[]>();
          for (const id of sessionIds) map.set(id, []);
          for (const ex of exercises) {
            map.get(ex.sessionId)?.push(ex);
          }
          return sessionIds.map((id) => map.get(id) ?? []);
        },
      ),

      swapsByExerciseIdLoader: new DataLoader<string, ExerciseSwap[]>(async (exerciseIds) => {
        const swaps = await this.prisma.client.exerciseSwap.findMany({
          where: { prescribedExerciseId: { in: [...exerciseIds] } },
        });

        const map = new Map<string, ExerciseSwap[]>();
        for (const id of exerciseIds) map.set(id, []);
        for (const swap of swaps) {
          map.get(swap.prescribedExerciseId)?.push(swap);
        }
        return exerciseIds.map((id) => map.get(id) ?? []);
      }),
    };
  }
}
