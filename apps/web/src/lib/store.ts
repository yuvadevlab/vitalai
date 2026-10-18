import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Goal =
  "Hypertrophy" | "Shred & Cut" | "Calisthenics Mastery" | "Maximum Strength" | "Athletic Stamina";
export type Equipment =
  "Full Commercial Gym" | "Dumbbells & Bench" | "Resistance Bands Only" | "Bodyweight Only";

export interface Profile {
  name: string;
  goal: Goal;
  focus: string[];
  level: string;
  equipment: Equipment;
  days: number;
  sessionLength: number;
  age: number;
  gender: string;
  height: number;
  weight: number;
  targetWeight: number;
  injuries: string[];
}

export interface HistoryEntry {
  date: string;
  title: string;
  volume: number;
  sets: number;
  prs: number;
}

export const defaultProfile: Profile = {
  name: "Athlete",
  goal: "Hypertrophy",
  focus: ["Chest & Arms"],
  level: "Intermediate",
  equipment: "Full Commercial Gym",
  days: 4,
  sessionLength: 60,
  age: 27,
  gender: "Male",
  height: 180,
  weight: 78,
  targetWeight: 81,
  injuries: ["None"],
};

interface State {
  onboarded: boolean;
  profile: Profile;
  history: HistoryEntry[];
  setProfile: (p: Partial<Profile>) => void;
  completeOnboarding: () => void;
  addHistory: (h: HistoryEntry) => void;
  coachContext: string | null;
  setCoachContext: (c: string | null) => void;
}

export const useVital = create<State>()(
  persist(
    (set) => ({
      onboarded: false,
      profile: defaultProfile,
      history: [
        { date: "2026-10-15", title: "Pull A", volume: 12840, sets: 18, prs: 1 },
        { date: "2026-10-14", title: "Legs A", volume: 16220, sets: 20, prs: 0 },
        { date: "2026-10-12", title: "Push B", volume: 11950, sets: 17, prs: 2 },
      ],
      coachContext: null,
      setProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
      completeOnboarding: () => set({ onboarded: true }),
      addHistory: (h) => set((s) => ({ history: [h, ...s.history] })),
      setCoachContext: (c) => set({ coachContext: c }),
    }),
    {
      name: "vitalai",
      partialize: (s) => ({ onboarded: s.onboarded, profile: s.profile, history: s.history }),
    },
  ),
);
