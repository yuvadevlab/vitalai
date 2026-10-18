import type { Exercise } from "@/lib/plan";

export interface MockWorkoutSession {
  id: string;
  dayIndex: number;
  dayName: string;
  title: string;
  focusMuscles: string[];
  durationMinutes: number;
  exercises: Exercise[];
}

export const MOCK_WEEKLY_SPLIT: MockWorkoutSession[] = [
  {
    id: "session-push-1",
    dayIndex: 0,
    dayName: "Monday",
    title: "Push Power & Clavicular Hypertrophy",
    focusMuscles: ["Chest", "Shoulders", "Triceps"],
    durationMinutes: 55,
    exercises: [
      {
        name: "Incline Barbell Bench Press",
        sets: 4,
        reps: "6-8",
        load: "95 kg",
        loadKg: 95,
        cues: ["30-degree incline", "Retract scapulae", "Drive through upper pecs"],
        alternatives: ["Incline Dumbbell Press", "Hammer Strength Incline"],
      },
      {
        name: "Flat Dumbbell Press",
        sets: 4,
        reps: "8-10",
        load: "40 kg",
        loadKg: 40,
        cues: ["Full stretch at bottom", "Converge at top without clacking"],
        alternatives: ["Barbell Bench Press", "Machine Chest Press"],
      },
      {
        name: "Standing Cable Lateral Raise",
        sets: 4,
        reps: "12-15",
        load: "14 kg",
        loadKg: 14,
        cues: ["Wrist behind elbow", "Lead with lateral deltoid", "1-sec pause at apex"],
        alternatives: ["Dumbbell Lateral Raise", "Machine Lateral Raise"],
      },
      {
        name: "Overhead Rope Triceps Extension",
        sets: 3,
        reps: "10-12",
        load: "32 kg",
        loadKg: 32,
        cues: ["Full elbow flexion", "Flare rope at lockout", "Keep elbows tucked"],
        alternatives: ["Skull Crushers", "Dumbbell Overhead Extension"],
      },
    ],
  },
  {
    id: "session-pull-1",
    dayIndex: 1,
    dayName: "Tuesday",
    title: "Pull Width & Scapular Thickness",
    focusMuscles: ["Lats", "Back", "Biceps"],
    durationMinutes: 52,
    exercises: [
      {
        name: "Weighted Neutral-Grip Pull-ups",
        sets: 4,
        reps: "6-8",
        load: "15 kg",
        loadKg: 15,
        cues: ["Full dead-hang stretch", "Drive elbows into back pockets"],
        alternatives: ["Lat Pulldown", "Assisted Pull-up"],
      },
      {
        name: "Chest-Supported T-Bar Row",
        sets: 4,
        reps: "8-10",
        load: "65 kg",
        loadKg: 65,
        cues: ["Squeeze rhomboids at peak", "2-second eccentric phase"],
        alternatives: ["Barbell Bent-Over Row", "Seated Cable Row"],
      },
      {
        name: "Incline Dumbbell Biceps Curl",
        sets: 3,
        reps: "10-12",
        load: "16 kg",
        loadKg: 16,
        cues: ["Deep stretch on long head", "Supinate wrist at peak contraction"],
        alternatives: ["EZ-Bar Preacher Curl", "Cable Bayesian Curl"],
      },
    ],
  },
  {
    id: "session-legs-1",
    dayIndex: 2,
    dayName: "Wednesday",
    title: "Quad Dominance & Posterior Chain",
    focusMuscles: ["Quads", "Hamstrings", "Glutes", "Calves"],
    durationMinutes: 60,
    exercises: [
      {
        name: "Barbell Back Squat",
        sets: 4,
        reps: "6-8",
        load: "140 kg",
        loadKg: 140,
        cues: ["Hip crease below parallel", "Maintain rigid core pressure"],
        alternatives: ["Hack Squat", "Leg Press"],
      },
      {
        name: "Romanian Deadlift",
        sets: 4,
        reps: "8-10",
        load: "120 kg",
        loadKg: 120,
        cues: ["Hinge at hips", "Keep bar glued to shins", "Feel deep hamstring loading"],
        alternatives: ["Seated Leg Curl", "Dumbbell RDL"],
      },
      {
        name: "Bulgarian Split Squat",
        sets: 3,
        reps: "10-12",
        load: "24 kg",
        loadKg: 24,
        cues: ["Forward torso lean for glute bias", "Drive up through front heel"],
        alternatives: ["Walking Lunges", "Leg Extension"],
      },
    ],
  },
];
