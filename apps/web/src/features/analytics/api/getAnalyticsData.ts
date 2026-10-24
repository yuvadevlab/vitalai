"use client";

import { useQuery } from "@tanstack/react-query";
import { mockApiClient } from "@/mocks/mockApiClient";

export const analyticsQueryKeys = {
  all: ["analytics"] as const,
  details: () => [...analyticsQueryKeys.all, "details"] as const,
};

export function useAnalyticsData() {
  return useQuery({
    queryKey: analyticsQueryKeys.details(),
    queryFn: () => mockApiClient.getAnalytics(),
  });
}
