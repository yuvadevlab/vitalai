/**
 * @file packages/ai-engine/src/tools/physiology-tools.ts
 * @description Deterministic exercise physiology and volume landmark tools.
 * @module @vitalai/ai-engine/tools
 */

import {
  getVolumeLandmarks,
  evaluateVolumeStatus,
  calculateTargetRir,
} from "@vitalai/vital-engine";
import { MuscleGroup, MesocyclePhase } from "@vitalai/shared-types";
import { AiToolDefinition, AiToolName, ToolParameterType } from "./tool.types";

export const evaluateVolumeTool: AiToolDefinition = {
  name: AiToolName.EVALUATE_VOLUME_LANDMARKS,
  description:
    "Evaluates weekly training volume sets for a muscle group against scientific volume landmarks (MEV, MAV, MRV).",
  parameters: {
    muscleGroup: {
      type: ToolParameterType.STRING,
      description: "Muscle group from MuscleGroup enum",
      required: true,
    },
    currentWeeklySets: {
      type: ToolParameterType.NUMBER,
      description: "Current number of hard working sets completed per week",
      required: true,
    },
  },
  execute: (args: Record<string, unknown>) => {
    const muscle = (args["muscleGroup"] as MuscleGroup) || MuscleGroup.CHEST;
    const weeklySets = Number(args["currentWeeklySets"] || 0);

    const landmarks = getVolumeLandmarks(muscle, weeklySets);
    const status = evaluateVolumeStatus(weeklySets, landmarks);

    return {
      muscleGroup: muscle,
      currentSets: weeklySets,
      status,
      landmarks: {
        mev: landmarks.mev,
        mav: landmarks.mav,
        mrv: landmarks.mrv,
      },
    };
  },
};

export const targetRirTool: AiToolDefinition = {
  name: AiToolName.CALCULATE_TARGET_RIR,
  description:
    "Calculates the recommended Reps in Reserve (RIR) target for a given week of a 6-week hypertrophy mesocycle.",
  parameters: {
    weekNumber: {
      type: ToolParameterType.NUMBER,
      description: "Week number within the mesocycle (1-6)",
      required: true,
    },
  },
  execute: (args: Record<string, unknown>) => {
    const week = Number(args["weekNumber"] || 1);
    const phase =
      week === 1
        ? MesocyclePhase.BASELINE
        : week === 6
          ? MesocyclePhase.DELOAD
          : week === 5
            ? MesocyclePhase.PEAK
            : MesocyclePhase.OVERLOAD;
    const targetRir = calculateTargetRir(week, phase);
    return { weekNumber: week, targetRir, phase };
  },
};
