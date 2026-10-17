"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@vitalai/shared-types";

export interface PrescribedExercise {
  readonly id: string;
  readonly name: string;
  readonly targetSets: number;
  readonly targetReps: string;
  readonly targetWeightKg: number;
  readonly targetRir: number;
  readonly tempo: string;
  readonly restSeconds: number;
  readonly primaryMuscles: readonly string[];
  readonly secondaryMuscles: readonly string[];
  readonly notes?: string;
}

export interface WorkoutSessionDetail {
  readonly id: string;
  readonly name: string;
  readonly phaseName: string;
  readonly currentWeek: number;
  readonly targetRir: number;
  readonly exercises: readonly PrescribedExercise[];
}

const MOCK_WORKOUT_SESSION: WorkoutSessionDetail = {
  id: "session-push-a",
  name: "Push Hypertrophy & Anterior Kinetic Chain",
  phaseName: "Overload (Microcycle Wk 3)",
  currentWeek: 3,
  targetRir: 2,
  exercises: [
    {
      id: "ex-1",
      name: "Barbell Incline Bench Press",
      targetSets: 4,
      targetReps: "8-10",
      targetWeightKg: 80,
      targetRir: 2,
      tempo: "3-1-1-0",
      restSeconds: 120,
      primaryMuscles: ["chest", "shoulders"],
      secondaryMuscles: ["triceps"],
      notes: "Clavicular head emphasis; 30° incline angle",
    },
    {
      id: "ex-2",
      name: "Dumbbell Lateral Raise",
      targetSets: 3,
      targetReps: "12-15",
      targetWeightKg: 14,
      targetRir: 1,
      tempo: "2-0-1-1",
      restSeconds: 90,
      primaryMuscles: ["shoulders"],
      secondaryMuscles: ["traps"],
      notes: "Scapular plane path; peak contraction pause",
    },
    {
      id: "ex-3",
      name: "Leg Press with Hip Wedge",
      targetSets: 4,
      targetReps: "10-12",
      targetWeightKg: 140,
      targetRir: 2,
      tempo: "3-1-1-0",
      restSeconds: 120,
      primaryMuscles: ["quadriceps"],
      secondaryMuscles: ["glutes", "calves"],
      notes: "Decompressed lumbar substitute for back squats",
    },
    {
      id: "ex-4",
      name: "Overhead Rope Triceps Extension",
      targetSets: 3,
      targetReps: "12-15",
      targetWeightKg: 28,
      targetRir: 1,
      tempo: "2-1-1-0",
      restSeconds: 75,
      primaryMuscles: ["triceps"],
      secondaryMuscles: ["forearms"],
      notes: "Long head stretch in shoulder flexion",
    },
  ],
};

export function useWorkouts() {
  return useQuery({
    queryKey: QUERY_KEYS.WORKOUTS.TODAYS_SESSION,
    queryFn: async (): Promise<WorkoutSessionDetail> => {
      return MOCK_WORKOUT_SESSION;
    },
    initialData: MOCK_WORKOUT_SESSION,
    staleTime: 60 * 1000,
  });
}
