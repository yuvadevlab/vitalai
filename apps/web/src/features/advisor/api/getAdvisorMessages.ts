"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApiClient } from "@/mocks/mockApiClient";

export const advisorQueryKeys = {
  all: ["advisor"] as const,
  messages: () => [...advisorQueryKeys.all, "messages"] as const,
};

export function useAdvisorMessages() {
  return useQuery({
    queryKey: advisorQueryKeys.messages(),
    queryFn: () => mockApiClient.getAdvisorMessages(),
  });
}

export function useSendAdvisorMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (prompt: string) => mockApiClient.sendAdvisorMessage(prompt),
    onSuccess: (newMsg) => {
      qc.setQueryData(
        advisorQueryKeys.messages(),
        (
          old: Array<{
            id: string;
            role: "user" | "assistant";
            content: string;
            timestamp: string;
          }> = [],
        ) => [...old, newMsg],
      );
    },
  });
}
