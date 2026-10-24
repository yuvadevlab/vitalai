"use client";

import { useQuery } from "@tanstack/react-query";
import { mockApiClient } from "@/mocks/mockApiClient";

export const dashboardQueryKeys = {
  all: ["dashboard"] as const,
  todayWorkout: () => [...dashboardQueryKeys.all, "todayWorkout"] as const,
  analyticsSummary: () => [...dashboardQueryKeys.all, "analyticsSummary"] as const,
};

export function useTodayWorkout() {
  return useQuery({
    queryKey: dashboardQueryKeys.todayWorkout(),
    queryFn: () => mockApiClient.getTodayWorkout(),
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardQueryKeys.analyticsSummary(),
    queryFn: () => mockApiClient.getAnalytics(),
  });
}
