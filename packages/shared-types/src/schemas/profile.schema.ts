import { z } from "zod";
import { GOALS, EQUIPMENT_TYPES, EXPERIENCE_LEVELS, FOCUS_AREAS } from "../enums/fitness.enum";

export const ProfileSchema = z.object({
  name: z.string().min(1).default("Athlete"),
  goal: z.enum(GOALS).default("Hypertrophy"),
  focus: z.array(z.enum(FOCUS_AREAS)).default(["Chest & Arms"]),
  level: z.enum(EXPERIENCE_LEVELS).default("Intermediate"),
  equipment: z.enum(EQUIPMENT_TYPES).default("Full Commercial Gym"),
  days: z.number().int().min(2).max(7).default(4),
  sessionLength: z.number().int().min(20).max(120).default(60),
  age: z.number().int().min(14).max(100).default(26),
  gender: z.string().default("Male"),
  height: z.number().positive().default(180),
  weight: z.number().positive().default(78),
  targetWeight: z.number().positive().default(81),
  injuries: z.array(z.string()).default(["None"]),
});

export type ProfileDto = z.infer<typeof ProfileSchema>;
