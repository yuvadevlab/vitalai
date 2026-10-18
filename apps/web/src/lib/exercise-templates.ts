export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  load: string;
  loadKg: number;
  cues: string[];
  alternatives: string[];
}

export const gymExercises: Exercise[] = [
  {
    name: "Incline Barbell Bench Press",
    sets: 3,
    reps: "8-10",
    load: "85 kg",
    loadKg: 85,
    cues: ["Retract scapula", "3s eccentric", "Drive feet into floor"],
    alternatives: ["Incline Dumbbell Press", "Smith Machine Incline Press", "Deficit Push-Ups"],
  },
  {
    name: "Standing Dumbbell Overhead Press",
    sets: 3,
    reps: "10-12",
    load: "26 kg",
    loadKg: 26,
    cues: ["Brace core hard", "Stack wrists over elbows"],
    alternatives: ["Seated Machine Press", "Landmine Press", "Pike Push-Ups"],
  },
  {
    name: "Weighted Chest Dips",
    sets: 3,
    reps: "8-10",
    load: "+15 kg",
    loadKg: 15,
    cues: ["Lean forward 20°", "Elbows track 45°"],
    alternatives: ["Decline Dumbbell Press", "Bench Dips", "Cable Fly"],
  },
  {
    name: "Cable Lateral Raises",
    sets: 4,
    reps: "12-15",
    load: "12 kg",
    loadKg: 12,
    cues: ["Lead with elbow", "Pause at top"],
    alternatives: ["Dumbbell Lateral Raise", "Band Lateral Raise"],
  },
  {
    name: "Overhead Tricep Rope Extension",
    sets: 3,
    reps: "12-15",
    load: "28 kg",
    loadKg: 28,
    cues: ["Full stretch overhead", "Lock elbows in"],
    alternatives: ["Skull Crushers", "Diamond Push-Ups"],
  },
];

export const homeExercises: Exercise[] = [
  {
    name: "Incline Dumbbell Press",
    sets: 4,
    reps: "8-12",
    load: "32 kg",
    loadKg: 32,
    cues: ["Neutral wrist", "Squeeze at top"],
    alternatives: ["Floor Press", "Deficit Push-Ups"],
  },
  {
    name: "Seated Dumbbell Shoulder Press",
    sets: 3,
    reps: "10-12",
    load: "22 kg",
    loadKg: 22,
    cues: ["Back against bench", "Controlled descent"],
    alternatives: ["Arnold Press", "Pike Push-Ups"],
  },
  {
    name: "Dumbbell Fly",
    sets: 3,
    reps: "12-15",
    load: "14 kg",
    loadKg: 14,
    cues: ["Soft elbows", "Deep stretch"],
    alternatives: ["Push-Up Plus"],
  },
  {
    name: "Dumbbell Lateral Raises",
    sets: 4,
    reps: "12-15",
    load: "10 kg",
    loadKg: 10,
    cues: ["Lead with elbow"],
    alternatives: ["Lean-Away Raise"],
  },
  {
    name: "Dumbbell Skull Crushers",
    sets: 3,
    reps: "12-15",
    load: "12 kg",
    loadKg: 12,
    cues: ["Elbows fixed"],
    alternatives: ["Bench Dips"],
  },
];

export const bodyweightExercises: Exercise[] = [
  {
    name: "Archer Push-Ups",
    sets: 4,
    reps: "6-8 / side",
    load: "BW",
    loadKg: 0,
    cues: ["Hollow body", "Slow lowering"],
    alternatives: ["Deficit Push-Ups"],
  },
  {
    name: "Pike Push-Ups",
    sets: 3,
    reps: "8-12",
    load: "BW",
    loadKg: 0,
    cues: ["Hips high", "Head forward of hands"],
    alternatives: ["Wall Handstand Hold"],
  },
  {
    name: "Parallel Bar Dips",
    sets: 3,
    reps: "10-12",
    load: "BW",
    loadKg: 0,
    cues: ["Lean forward"],
    alternatives: ["Bench Dips"],
  },
  {
    name: "Pseudo Planche Lean",
    sets: 4,
    reps: "20s hold",
    load: "BW",
    loadKg: 0,
    cues: ["Protract shoulders"],
    alternatives: ["Plank to Push-Up"],
  },
  {
    name: "Diamond Push-Ups",
    sets: 3,
    reps: "12-15",
    load: "BW",
    loadKg: 0,
    cues: ["Elbows tucked"],
    alternatives: ["Close-Grip Push-Ups"],
  },
];

export const bandExercises: Exercise[] = bodyweightExercises.map((e, i) =>
  i === 3 ? { ...e, name: "Band Lateral Raises", reps: "15-20", load: "Med band" } : e,
);
