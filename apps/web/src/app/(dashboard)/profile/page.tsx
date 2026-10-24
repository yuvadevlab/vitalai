import type { Metadata } from "next";
import { ProfileView } from "@/features/profile/components/ProfileView";

export const metadata: Metadata = {
  title: "Athlete Profile — VitalAI",
  description: "Biometrics, mechanical constraints and metabolic calibration.",
};

export default function ProfilePage() {
  return <ProfileView />;
}
