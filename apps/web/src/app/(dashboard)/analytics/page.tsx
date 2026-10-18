import type { Metadata } from "next";
import { AnalyticsView } from "@/features/analytics/components/AnalyticsView";

export const metadata: Metadata = {
  title: "Performance Analytics — VitalAI",
  description: "Longitudinal volume loading, 1RM progression and muscle fatigue distribution.",
};

export default function AnalyticsPage() {
  return <AnalyticsView />;
}
