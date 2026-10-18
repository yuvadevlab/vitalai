import type { Metadata } from "next";
import { OnboardingWizard } from "@/features/onboarding/components/OnboardingWizard";

export const metadata: Metadata = {
  title: "Build Your Plan — VitalAI",
  description: "A kinetic onboarding that generates your AI training plan.",
};

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
