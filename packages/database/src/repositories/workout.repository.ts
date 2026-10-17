/**
 * @file packages/database/src/repositories/workout.repository.ts
 * @description Mesocycle, session, set log, and exercise swap operations with strict userId scoping.
 * @module @vitalai/database
 */

import { prisma, type PrismaClient } from "../client";
import type { Prisma, Mesocycle, WorkoutSession, SetLog, ExerciseSwap } from "@prisma/client";

export class WorkoutRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async getActiveMesocycle(userId: string): Promise<Mesocycle | null> {
    return this.db.mesocycle.findFirst({
      where: { userId, active: true },
      include: {
        sessions: {
          orderBy: [{ weekNumber: "asc" }, { dayNumber: "asc" }],
          include: {
            exercises: {
              orderBy: { orderIndex: "asc" },
              include: {
                sets: { orderBy: { setNumber: "asc" } },
                swaps: true,
              },
            },
          },
        },
      },
    });
  }

  async createMesocycle(
    userId: string,
    data: Omit<Prisma.MesocycleCreateInput, "user">,
  ): Promise<Mesocycle> {
    // Deactivate previous active mesocycles
    await this.db.mesocycle.updateMany({
      where: { userId, active: true },
      data: { active: false },
    });

    return this.db.mesocycle.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  async getSessionWithExercises(userId: string, sessionId: string): Promise<WorkoutSession | null> {
    return this.db.workoutSession.findFirst({
      where: {
        id: sessionId,
        mesocycle: { userId },
      },
      include: {
        exercises: {
          orderBy: { orderIndex: "asc" },
          include: {
            sets: { orderBy: { setNumber: "asc" } },
            swaps: true,
          },
        },
      },
    });
  }

  async updateSetLog(
    userId: string,
    setId: string,
    data: Prisma.SetLogUpdateInput,
  ): Promise<SetLog> {
    const existing = await this.db.setLog.findFirst({
      where: {
        id: setId,
        exercise: { session: { mesocycle: { userId } } },
      },
    });

    if (!existing) {
      throw new Error("Workout set not found or unauthorized");
    }

    return this.db.setLog.update({
      where: { id: setId },
      data,
    });
  }

  async recordExerciseSwap(
    userId: string,
    prescribedExerciseId: string,
    data: Omit<Prisma.ExerciseSwapCreateInput, "exercise">,
  ): Promise<ExerciseSwap> {
    const exercise = await this.db.prescribedExercise.findFirst({
      where: {
        id: prescribedExerciseId,
        session: { mesocycle: { userId } },
      },
    });

    if (!exercise) {
      throw new Error("Prescribed exercise not found or unauthorized");
    }

    return this.db.exerciseSwap.create({
      data: {
        ...data,
        exercise: { connect: { id: prescribedExerciseId } },
      },
    });
  }
}
