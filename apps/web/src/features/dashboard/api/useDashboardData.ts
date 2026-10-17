"use client";

import { useQuery } from "@tanstack/react-query";

export interface DashboardData {
  readonly macros: {
    readonly calories: { current: number; target: number };
    readonly protein: { current: number; target: number };
    readonly carbs: { current: number; target: number };
    readonly fats: { current: number; target: number };
  };
  readonly workout: {
    readonly id: string;
    readonly name: string;
    readonly phase: string;
    readonly currentWeek: number;
    readonly targetRir: number;
    readonly primaryMuscles: readonly string[];
    readonly secondaryMuscles: readonly string[];
    readonly exerciseCount: number;
    readonly estimatedMinutes: number;
  };
  readonly purine: {
    readonly currentMg: number;
    readonly safeLimitMg: number;
  };
  readonly guardrails: readonly {
    readonly id: string;
    readonly name: string;
    readonly severity: "mild" | "moderate" | "severe";
    readonly excludedCount: number;
  }[];
}

const MOCK_DASHBOARD_DATA: DashboardData = {
  macros: {
    calories: { current: 1850, target: 2450 },
    protein: { current: 145, target: 180 },
    carbs: { current: 210, target: 275 },
    fats: { current: 52, target: 70 },
  },
  workout: {
    id: "session-today",
    name: "Hypertrophy Push & Anterior Chain Priming",
    phase: "Overload (Microcycle Wk 3)",
    currentWeek: 3,
    targetRir: 2,
    primaryMuscles: ["chest", "shoulders", "quadriceps"],
    secondaryMuscles: ["triceps", "calves"],
    exerciseCount: 5,
    estimatedMinutes: 52,
  },
  purine: {
    currentMg: 165,
    safeLimitMg: 300,
  },
  guardrails: [
    { id: "g-1", name: "Lumbar L4-L5 Disc Protection", severity: "moderate", excludedCount: 3 },
    { id: "g-2", name: "Purine Metabolism Safety (<300mg)", severity: "mild", excludedCount: 1 },
  ],
};

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: async (): Promise<DashboardData> => {
      // In full environment this hits GraphQL, here providing resilient client data
      return MOCK_DASHBOARD_DATA;
    },
    initialData: MOCK_DASHBOARD_DATA,
    staleTime: 60 * 1000,
  });
}
