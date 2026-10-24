"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApiClient } from "@/mocks/mockApiClient";

export const workoutQueryKeys = {
  all: ["workouts"] as const,
  weeklySplit: () => [...workoutQueryKeys.all, "weeklySplit"] as const,
  today: () => [...workoutQueryKeys.all, "today"] as const,
};

export function useWeeklySplit() {
  return useQuery({
    queryKey: workoutQueryKeys.weeklySplit(),
    queryFn: () => mockApiClient.getWeeklySplit(),
  });
}

export function useLogWorkout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; volume: number; sets: number; prs: number }) =>
      mockApiClient.logWorkoutSession(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: workoutQueryKeys.all });
    },
  });
}
