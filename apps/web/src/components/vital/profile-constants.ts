import { type Equipment, type Goal } from "@/lib/store";

export const GOALS: Goal[] = [
  "Hypertrophy",
  "Shred & Cut",
  "Calisthenics Mastery",
  "Maximum Strength",
  "Athletic Stamina",
];
export const FOCUS = [
  "Chest & Arms",
  "Shredded Core",
  "Wide Back & Shoulders",
  "Quad & Glute Armor",
  "Full Body Beast",
];
export const LEVELS = ["Beginner", "Intermediate", "Advanced", "Elite"];
export const LEVEL_SUB: Record<string, string> = {
  Beginner: "< 1 yr",
  Intermediate: "1-3 yrs",
  Advanced: "3-5 yrs",
  Elite: "5+ yrs",
};
export const EQUIP: Equipment[] = [
  "Full Commercial Gym",
  "Dumbbells & Bench",
  "Resistance Bands Only",
  "Bodyweight Only",
];
