import type { Metadata } from "next";
import { WorkoutActiveHud } from "@/features/workout/components/WorkoutActiveHud";

export const metadata: Metadata = {
  title: "Workout HUD — VitalAI",
  description: "Distraction-free workout execution HUD with rest timer and set tracking.",
};

export default function WorkoutActivePage() {
  return <WorkoutActiveHud />;
}
