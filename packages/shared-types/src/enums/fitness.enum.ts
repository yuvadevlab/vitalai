export const GOALS = [
  "Hypertrophy",
  "Shred & Cut",
  "Calisthenics Mastery",
  "Maximum Strength",
  "Athletic Stamina",
] as const;
export type Goal = (typeof GOALS)[number];

export const EQUIPMENT_TYPES = [
  "Full Commercial Gym",
  "Dumbbells & Bench",
  "Resistance Bands Only",
  "Bodyweight Only",
] as const;
export type Equipment = (typeof EQUIPMENT_TYPES)[number];

export const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced", "Elite"] as const;
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export const FOCUS_AREAS = [
  "Chest & Arms",
  "Core & Six-Pack",
  "Back & Shoulders",
  "Quads & Glutes",
  "Full Body",
] as const;
export type FocusArea = (typeof FOCUS_AREAS)[number];

export const SPLIT_TYPES = ["Push/Pull/Legs", "Upper/Lower", "Full Body", "Arnold Split"] as const;
export type SplitType = (typeof SPLIT_TYPES)[number];
