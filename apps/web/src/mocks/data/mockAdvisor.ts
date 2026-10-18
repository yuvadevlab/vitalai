/**
 * Mock Advisor Responses Fixture
 */
export const MOCK_INITIAL_ADVISOR_MESSAGES = [
  {
    id: "msg-welcome",
    role: "assistant" as const,
    content:
      "Greetings Athlete! I am VitalAI, your biometric athletic intelligence coach. I have calibrated your 5-day Hypertrophy split, volume progression curves, and recovery windows. How can I optimize your conditioning today?",
    timestamp: "Just now",
  },
];

export const MOCK_ADVISOR_KNOWLEDGE_BASE: Record<string, string> = {
  bench:
    "For your Incline Bench Press, your volume loading is progressing at +2.5% week-over-week. To break through clavicular plateaus, implement a 2-second pause at chest level on set 1 and 2, followed by a mechanical drop set.",
  recovery:
    "Your systemic readiness is at 88%. Heart rate recovery and volume density indicate your CNS is prime for high-load compound work today. Prioritize 40g whey isolate + 60g dextrose post-session.",
  hamstrings:
    "Hamstring soreness post-RDL is a classic stretch-mediated hypertrophy response. Maintain pelvic anterior tilt to avoid lumbar shear, and keep active recovery via 10 minutes of low-incline walking.",
  hypertrophy:
    "Hypertrophy sweet spot for your advanced status is 14-18 sets per muscle group per week taken within 1-3 RIR (Reps in Reserve). Your current split delivers 16 sets for pecs and 15 sets for lats.",
  default:
    "Analyzing your athletic profile and biometric telemetry... I recommend progressive overload via load or eccentric tempo manipulation rather than adding excessive junk volume.",
};
