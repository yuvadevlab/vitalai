/**
 * @file src/mocks/mockApiClient.ts
 * @description Mock API Client simulating asynchronous backend responses for VitalAI.
 */

import { MOCK_PROFILE, MOCK_MACRO_TARGETS } from "./data/mockProfile";
import { MOCK_WEEKLY_SPLIT, type MockWorkoutSession } from "./data/mockWorkouts";
import {
  MOCK_VOLUME_TREND,
  MOCK_PERSONAL_RECORDS,
  MOCK_MUSCLE_FATIGUE,
} from "./data/mockAnalytics";
import { MOCK_INITIAL_ADVISOR_MESSAGES, MOCK_ADVISOR_KNOWLEDGE_BASE } from "./data/mockAdvisor";
import type { Profile } from "@/lib/store";

const delay = (ms = 120) => new Promise((res) => setTimeout(res, ms));

export const mockApiClient = {
  async getProfile(): Promise<Profile> {
    await delay();
    return { ...MOCK_PROFILE };
  },

  async updateProfile(updates: Partial<Profile>): Promise<Profile> {
    await delay(180);
    Object.assign(MOCK_PROFILE, updates);
    return { ...MOCK_PROFILE };
  },

  async getMacroTargets() {
    await delay();
    return { ...MOCK_MACRO_TARGETS };
  },

  async getWeeklySplit(): Promise<MockWorkoutSession[]> {
    await delay(150);
    return [...MOCK_WEEKLY_SPLIT];
  },

  async getTodayWorkout(): Promise<MockWorkoutSession> {
    await delay(100);
    return MOCK_WEEKLY_SPLIT[0]!;
  },

  async logWorkoutSession(sessionData: {
    title: string;
    volume: number;
    sets: number;
    prs: number;
  }) {
    await delay(200);
    return { success: true, loggedAt: new Date().toISOString(), ...sessionData };
  },

  async getAnalytics() {
    await delay(140);
    return {
      volumeTrends: MOCK_VOLUME_TREND,
      personalRecords: MOCK_PERSONAL_RECORDS,
      muscleFatigue: MOCK_MUSCLE_FATIGUE,
      weeklyVolumeTotal: 22650,
      streakWeeks: 6,
      systemicReadiness: 88,
    };
  },

  async getAdvisorMessages() {
    await delay(80);
    return [...MOCK_INITIAL_ADVISOR_MESSAGES];
  },

  async sendAdvisorMessage(prompt: string) {
    await delay(350);
    const lower = prompt.toLowerCase();
    let reply = MOCK_ADVISOR_KNOWLEDGE_BASE["default"];
    for (const [k, v] of Object.entries(MOCK_ADVISOR_KNOWLEDGE_BASE)) {
      if (lower.includes(k)) {
        reply = v;
        break;
      }
    }
    return {
      id: "msg-" + Date.now(),
      role: "assistant" as const,
      content: reply,
      timestamp: "Just now",
    };
  },
};
