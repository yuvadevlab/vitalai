/**
 * Workout UI Copy Dictionary
 */
export const WORKOUT_COPY = {
  hud: {
    title: "Workout HUD",
    finishWarning: "Complete all targeted sets to register full hypertrophic volume.",
    set: "SET",
    prev: "PREV",
    load: "LOAD (KG)",
    reps: "REPS",
    done: "DONE",
    floatingTimer: "Rest Timer",
    addTime: "+30s",
    skipRest: "Skip Rest",
    exerciseSwapTitle: "AI Exercise Swap",
    exerciseSwapSubtitle: "Select an biomechanically equivalent movement for this target muscle.",
  },
  summary: {
    title: "WORKOUT CRUSHED!",
    subtitle: "All hypertrophy sets recorded to your neural training log.",
    volumeMetric: "Total Volume",
    setsMetric: "Sets Completed",
    prMetric: "PRs Achieved",
    backToDashboard: "Return to Command Center",
  },
  plan: {
    title: "Weekly Training Split",
    subtitle: "Adaptive periodization engineered around your recovery curves.",
    restDay: "Active Recovery & Mobility Day",
    regenerate: "Regenerate Neural Split",
  },
} as const;
