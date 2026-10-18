"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApiClient } from "@/mocks/mockApiClient";
import type { Profile } from "@/lib/store";

export const profileQueryKeys = {
  all: ["profile"] as const,
  current: () => [...profileQueryKeys.all, "current"] as const,
  macros: () => [...profileQueryKeys.all, "macros"] as const,
};

export function useProfileData() {
  return useQuery({
    queryKey: profileQueryKeys.current(),
    queryFn: () => mockApiClient.getProfile(),
  });
}

export function useMacroTargets() {
  return useQuery({
    queryKey: profileQueryKeys.macros(),
    queryFn: () => mockApiClient.getMacroTargets(),
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (updates: Partial<Profile>) => mockApiClient.updateProfile(updates),
    onSuccess: (updated) => {
      qc.setQueryData(profileQueryKeys.current(), updated);
    },
  });
}
