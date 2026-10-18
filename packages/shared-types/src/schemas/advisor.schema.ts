import { z } from "zod";

export const AdvisorMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
  timestamp: z.string(),
  suggestedPrompts: z.array(z.string()).optional(),
});

export type AdvisorMessageDto = z.infer<typeof AdvisorMessageSchema>;

export const PageInsightSchema = z.object({
  page: z.string(),
  insightText: z.string(),
  keyMetric: z.string().optional(),
  confidencePercent: z.number().min(0).max(100).default(98),
});

export type PageInsightDto = z.infer<typeof PageInsightSchema>;
