/**
 * Mock Analytics Data Fixture
 */
export const MOCK_VOLUME_TREND = [
  { week: "W1", volume: 18400, target: 17500 },
  { week: "W2", volume: 19850, target: 18500 },
  { week: "W3", volume: 21200, target: 20000 },
  { week: "W4", volume: 22650, target: 21500 },
];

export const MOCK_PERSONAL_RECORDS = [
  { exercise: "Barbell Back Squat", weight: 145, reps: 5, date: "Yesterday", rpe: 9 },
  { exercise: "Incline Barbell Bench", weight: 100, reps: 6, date: "3 days ago", rpe: 9.5 },
  { exercise: "Romanian Deadlift", weight: 130, reps: 8, date: "5 days ago", rpe: 8.5 },
  { exercise: "Overhead Barbell Press", weight: 70, reps: 5, date: "1 week ago", rpe: 9 },
];

export const MOCK_MUSCLE_FATIGUE = [
  { muscle: "Chest", fatigue: 75, recoveryPercent: 45, status: "Fatigued" },
  { muscle: "Back", fatigue: 40, recoveryPercent: 78, status: "Ready" },
  { muscle: "Shoulders", fatigue: 65, recoveryPercent: 55, status: "Recovering" },
  { muscle: "Quads", fatigue: 20, recoveryPercent: 92, status: "Optimal" },
  { muscle: "Hamstrings", fatigue: 85, recoveryPercent: 30, status: "Overloaded" },
  { muscle: "Arms", fatigue: 50, recoveryPercent: 70, status: "Ready" },
];
