import type { Profile } from "@/lib/store";

export const MOCK_PROFILE: Profile = {
  name: "Athlete",
  goal: "Hypertrophy",
  focus: ["Chest & Arms", "Wide Back & Shoulders"],
  level: "Advanced",
  equipment: "Full Commercial Gym",
  days: 5,
  sessionLength: 55,
  age: 26,
  gender: "Male",
  height: 182,
  weight: 82,
  targetWeight: 86,
  injuries: ["None (Fully Clear)"],
};

export const MOCK_MACRO_TARGETS = {
  calories: 3150,
  protein: 195,
  carbs: 380,
  fats: 75,
  waterLiters: 4.2,
};
