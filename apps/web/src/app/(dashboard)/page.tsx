import type { Metadata } from "next";
import { DashboardView } from "@/features/dashboard/components/DashboardView";

export const metadata: Metadata = {
  title: "VitalAI — Command Center",
  description: "High-performance athletic conditioning dashboard and neural workout execution.",
};

export default function DashboardPage() {
  return <DashboardView />;
}
