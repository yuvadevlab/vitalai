/**
 * @file packages/vital-engine/src/physiology/volume-landmarks.ts
 * @description Scientific volume landmarks per muscle group based on Dr. Mike Israetel's hypertrophy literature.
 * Pure deterministic functions with zero side-effects.
 * @module @vitalai/vital-engine
 */

import { MuscleGroup, VolumeStatus, type VolumeLandmarks } from "@vitalai/shared-types";

/**
 * Baseline scientific volume landmark table (weekly direct working sets).
 * MEV: Minimum Effective Volume
 * MAV: Maximum Adaptive Volume
 * MRV: Maximum Recoverable Volume
 */
const BASELINE_LANDMARKS: Record<
  MuscleGroup,
  Omit<VolumeLandmarks, "muscle" | "currentWeeklySets">
> = {
  [MuscleGroup.CHEST]: { mev: 8, mav: 16, mrv: 22 },
  [MuscleGroup.BACK]: { mev: 10, mav: 18, mrv: 25 },
  [MuscleGroup.SHOULDERS]: { mev: 8, mav: 16, mrv: 26 },
  [MuscleGroup.BICEPS]: { mev: 6, mav: 14, mrv: 20 },
  [MuscleGroup.TRICEPS]: { mev: 6, mav: 12, mrv: 18 },
  [MuscleGroup.QUADS]: { mev: 8, mav: 16, mrv: 22 },
  [MuscleGroup.HAMSTRINGS]: { mev: 6, mav: 13, mrv: 18 },
  [MuscleGroup.GLUTES]: { mev: 4, mav: 12, mrv: 16 },
  [MuscleGroup.CALVES]: { mev: 8, mav: 14, mrv: 20 },
  [MuscleGroup.CORE]: { mev: 4, mav: 10, mrv: 16 },
};

/**
 * Returns baseline volume landmarks for a given anatomical muscle group.
 */
export function getVolumeLandmarks(muscle: MuscleGroup, currentWeeklySets = 0): VolumeLandmarks {
  const baseline = BASELINE_LANDMARKS[muscle];
  return {
    muscle,
    mev: baseline.mev,
    mav: baseline.mav,
    mrv: baseline.mrv,
    currentWeeklySets,
  };
}

/**
 * Evaluates whether current training volume is below MEV, in the optimal MAV hypertrophy zone,
 * approaching MRV, or overreaching into systemic fatigue.
 */
export function evaluateVolumeStatus(
  currentWeeklySets: number,
  landmarks: VolumeLandmarks,
): VolumeStatus {
  if (currentWeeklySets < landmarks.mev) {
    return VolumeStatus.BELOW_MEV;
  }
  if (currentWeeklySets <= landmarks.mav) {
    return VolumeStatus.OPTIMAL_MAV;
  }
  if (currentWeeklySets <= landmarks.mrv) {
    return VolumeStatus.APPROACHING_MRV;
  }
  return VolumeStatus.OVERREACHING;
}
