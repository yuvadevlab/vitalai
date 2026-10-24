import type { Profile } from "./store";
import {
  type Exercise,
  gymExercises,
  homeExercises,
  bodyweightExercises,
  bandExercises,
} from "./exercise-templates";

export type { Exercise };

export function generateSession(p: Profile) {
  const base =
    p.equipment === "Full Commercial Gym"
      ? gymExercises
      : p.equipment === "Dumbbells & Bench"
        ? homeExercises
        : p.equipment === "Resistance Bands Only"
          ? bandExercises
          : bodyweightExercises;

  const count = p.sessionLength <= 30 ? 3 : p.sessionLength <= 45 ? 4 : 5;
  const exercises = base
    .slice(0, count)
    .map((e) =>
      p.injuries.includes("Shoulder") && e.name.includes("Overhead")
        ? { ...e, name: e.alternatives[0] ?? e.name }
        : e,
    );
  const split = p.days <= 3 ? "Full Body" : p.days === 4 ? "Upper/Lower" : "Push/Pull/Legs";
  const duration = Math.round(p.sessionLength * 0.87);

  return {
    title:
      split === "Full Body"
        ? "Full Body A (Push Emphasis)"
        : `${p.goal === "Maximum Strength" ? "Strength" : "Hypertrophy"} Push A (Chest, Shoulders & Triceps)`,
    split,
    duration,
    exercises,
    rir: p.goal === "Maximum Strength" ? 1 : 2,
  };
}

export function weeklySplit(p: Profile) {
  const pools: Record<number, string[]> = {
    3: ["Full Body A", "Rest", "Full Body B", "Rest", "Full Body C", "Rest", "Rest"],
    4: ["Upper A", "Lower A", "Rest", "Upper B", "Lower B", "Rest", "Rest"],
    5: ["Push", "Pull", "Legs", "Rest", "Upper", "Lower", "Rest"],
    6: ["Push A", "Pull A", "Legs A", "Push B", "Pull B", "Legs B", "Rest"],
  };
  return pools[p.days] ?? pools[4]!;
}
