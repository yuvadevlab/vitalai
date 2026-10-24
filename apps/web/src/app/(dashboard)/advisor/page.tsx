import type { Metadata } from "next";
import { AdvisorChatView } from "@/features/advisor/components/AdvisorChatView";

export const metadata: Metadata = {
  title: "AI Athletic Advisor — VitalAI",
  description: "Real-time athletic coach analyzing volume, biomechanics & fatigue.",
};

export default function AdvisorPage() {
  return <AdvisorChatView />;
}
