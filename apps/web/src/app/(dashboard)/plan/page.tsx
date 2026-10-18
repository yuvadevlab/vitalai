import type { Metadata } from "next";
import { WorkoutPlanView } from "@/features/workout/components/WorkoutPlanView";

export const metadata: Metadata = {
  title: "Training Split Plan — VitalAI",
  description: "Adaptive weekly periodization split engineered around your recovery curves.",
};

export default function WorkoutPlanPage() {
  return <WorkoutPlanView />;
}
