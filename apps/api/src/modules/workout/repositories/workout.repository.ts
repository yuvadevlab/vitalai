/**
 * @file apps/api/src/modules/workout/repositories/workout.repository.ts
 * @description Repository managing Mesocycle, Session, Exercise, and SetLog persistence in PostgreSQL.
 * @module @vitalai/api/workout
 */

import { Injectable } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import { type Prisma } from "@vitalai/database";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class WorkoutRepository {
  private readonly logger = new Logger(WorkoutRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findActiveMesocycle(userId: string) {
    this.logger.info(`[findActiveMesocycle] Fetching active mesocycle for user: ${userId}`);
    return this.prisma.client.mesocycle.findFirst({
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

  async findSessionById(sessionId: string, userId: string) {
    this.logger.info(`[findSessionById] Fetching session ${sessionId} for user: ${userId}`);
    return this.prisma.client.workoutSession.findFirst({
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

  async deactivateActiveMesocycles(userId: string) {
    this.logger.info(
      `[deactivateActiveMesocycles] Deactivating previous mesocycles for user: ${userId}`,
    );
    return this.prisma.client.mesocycle.updateMany({
      where: { userId, active: true },
      data: { active: false },
    });
  }

  async createMesocycleTree(data: Prisma.MesocycleCreateInput) {
    this.logger.info(
      `[createMesocycleTree] Creating mesocycle '${data.name}' with nested sessions`,
    );
    return this.prisma.client.mesocycle.create({
      data,
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

  async updateSetLog(
    setId: string,
    data: { actualReps: number; actualRir: number; weightKg: number; completed: boolean },
  ) {
    this.logger.info(`[updateSetLog] Updating set ${setId}`);
    return this.prisma.client.setLog.update({
      where: { id: setId },
      data: {
        actualReps: data.actualReps,
        actualRir: data.actualRir,
        weightKg: data.weightKg,
        completed: data.completed,
        completedAt: data.completed ? new Date() : null,
      },
    });
  }

  async findPrescribedExercise(prescribedExerciseId: string, userId: string) {
    return this.prisma.client.prescribedExercise.findFirst({
      where: {
        id: prescribedExerciseId,
        session: { mesocycle: { userId } },
      },
      include: {
        session: true,
        swaps: true,
      },
    });
  }

  async createExerciseSwap(data: Prisma.ExerciseSwapCreateInput) {
    return this.prisma.client.exerciseSwap.create({ data });
  }

  async applyExerciseSwap(
    swapId: string,
    prescribedExerciseId: string,
    newExerciseId: string,
    newName: string,
  ) {
    return this.prisma.client.$transaction([
      this.prisma.client.exerciseSwap.update({
        where: { id: swapId },
        data: { accepted: true },
      }),
      this.prisma.client.prescribedExercise.update({
        where: { id: prescribedExerciseId },
        data: {
          exerciseId: newExerciseId,
          name: newName,
        },
      }),
    ]);
  }
}
