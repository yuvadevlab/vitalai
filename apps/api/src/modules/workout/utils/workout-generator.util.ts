/**
 * @file apps/api/src/modules/workout/utils/workout-generator.util.ts
 * @description Pure utility function constructing 6-week periodized workout session trees with zero any types.
 * @module @vitalai/api/workout
 */

import {
  type Prisma,
  type MesocyclePhase as PrismaMesocyclePhase,
  type MuscleGroup as PrismaMuscleGroup,
  type ExerciseCategory as PrismaExerciseCategory,
} from "@vitalai/database";
import { MesocyclePhase, ExerciseCategory, MuscleGroup } from "@vitalai/shared-types";
import { calculateTargetRir } from "@vitalai/vital-engine";
import { EXERCISE_TAXONOMY, type ExerciseTaxonomyEntry } from "@vitalai/constants";

/**
 * Generates typed Prisma session creation data for a 6-week hypertrophy mesocycle.
 */
export function generateMesocycleSessionsData(
  daysPerWeek: number,
  safeExercises: readonly ExerciseTaxonomyEntry[],
): Prisma.WorkoutSessionCreateWithoutMesocycleInput[] {
  const sessionsData: Prisma.WorkoutSessionCreateWithoutMesocycleInput[] = [];
  const phases: readonly MesocyclePhase[] = [
    MesocyclePhase.BASELINE,
    MesocyclePhase.OVERLOAD,
    MesocyclePhase.OVERLOAD,
    MesocyclePhase.OVERLOAD,
    MesocyclePhase.PEAK,
    MesocyclePhase.DELOAD,
  ];

  for (let week = 1; week <= 6; week++) {
    const phase = phases[week - 1];
    const targetRir = calculateTargetRir(week, phase);
    const isDeload = phase === MesocyclePhase.DELOAD;

    for (let day = 1; day <= daysPerWeek; day++) {
      const isUpper = day % 2 === 1;
      const sessionName = isUpper
        ? `Week ${week} - Upper Hypertrophy`
        : `Week ${week} - Lower & Core`;

      const targetMuscles: readonly MuscleGroup[] = isUpper
        ? [MuscleGroup.CHEST, MuscleGroup.BACK, MuscleGroup.SHOULDERS, MuscleGroup.TRICEPS]
        : [MuscleGroup.QUADS, MuscleGroup.HAMSTRINGS, MuscleGroup.CALVES, MuscleGroup.CORE];

      const exercisesCreate: Prisma.PrescribedExerciseCreateWithoutSessionInput[] = [];
      let order = 0;

      for (const muscle of targetMuscles) {
        const match =
          safeExercises.find((e) => e.primaryMuscle === muscle) ??
          EXERCISE_TAXONOMY.find((e) => e.primaryMuscle === muscle);

        if (match) {
          const setTotal = isDeload ? 2 : 3;
          const setsCreate: Prisma.SetLogCreateWithoutExerciseInput[] = [];
          for (let s = 1; s <= setTotal; s++) {
            setsCreate.push({
              setNumber: s,
              targetReps: match.category === ExerciseCategory.COMPOUND ? 8 : 12,
              targetRir,
              restSeconds: match.defaultRestSeconds,
            });
          }

          exercisesCreate.push({
            exerciseId: match.id,
            name: match.name,
            targetMuscle: match.primaryMuscle as unknown as PrismaMuscleGroup,
            category: match.category as unknown as PrismaExerciseCategory,
            orderIndex: order++,
            tempo: `${match.defaultTempo.eccentric}-${match.defaultTempo.pauseBottom}-${match.defaultTempo.concentric}-${match.defaultTempo.pauseTop}`,
            restSeconds: match.defaultRestSeconds,
            sets: { create: setsCreate },
          });
        }
      }

      sessionsData.push({
        name: sessionName,
        weekNumber: week,
        dayNumber: day,
        phase: phase as unknown as PrismaMesocyclePhase,
        estimatedDurationMins: isDeload ? 45 : 60,
        exercises: { create: exercisesCreate },
      });
    }
  }

  return sessionsData;
}
