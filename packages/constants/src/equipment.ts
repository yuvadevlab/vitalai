/**
 * @file packages/constants/src/equipment.ts
 * @description Curated gym and home equipment taxonomy for Muscle Monster-style user onboarding.
 * @module @vitalai/constants
 */

import { EquipmentId, EquipmentCategory } from "@vitalai/shared-types";

export interface EquipmentTaxonomyEntry {
  readonly id: EquipmentId;
  readonly name: string;
  readonly category: EquipmentCategory;
  readonly isHomeFriendly: boolean;
  readonly description: string;
}

export const EQUIPMENT_CATALOG: readonly EquipmentTaxonomyEntry[] = [
  // ── Bodyweight & Calisthenics ─────────────────────────────────────────
  {
    id: EquipmentId.BODYWEIGHT_ONLY,
    name: "Bodyweight (No Equipment)",
    category: EquipmentCategory.BODYWEIGHT,
    isHomeFriendly: true,
    description: "Floor exercises, calisthenics, and bodyweight movements.",
  },
  {
    id: EquipmentId.PULL_UP_BAR,
    name: "Pull-Up Bar",
    category: EquipmentCategory.BODYWEIGHT,
    isHomeFriendly: true,
    description: "Doorway or wall-mounted bar for pull-ups and chin-ups.",
  },
  {
    id: EquipmentId.DIP_STATION,
    name: "Dip Station / Parallel Bars",
    category: EquipmentCategory.BODYWEIGHT,
    isHomeFriendly: true,
    description: "Parallel handles for bodyweight chest and triceps dips.",
  },
  {
    id: EquipmentId.RESISTANCE_BANDS,
    name: "Resistance Bands",
    category: EquipmentCategory.RESISTANCE_BANDS,
    isHomeFriendly: true,
    description: "Loop and tube elastic bands for portable resistance.",
  },

  // ── Free Weights ──────────────────────────────────────────────────────
  {
    id: EquipmentId.DUMBBELLS,
    name: "Dumbbells",
    category: EquipmentCategory.FREE_WEIGHTS,
    isHomeFriendly: true,
    description: "Fixed or adjustable dumbbells for unilateral pressing and rowing.",
  },
  {
    id: EquipmentId.BARBELL_AND_PLATES,
    name: "Barbell & Weight Plates",
    category: EquipmentCategory.FREE_WEIGHTS,
    isHomeFriendly: false,
    description: "Standard or Olympic barbell with bumper or iron plates.",
  },
  {
    id: EquipmentId.KETTLEBELL,
    name: "Kettlebell",
    category: EquipmentCategory.FREE_WEIGHTS,
    isHomeFriendly: true,
    description: "Cast iron weights with top handle for ballistic & compound lifts.",
  },
  {
    id: EquipmentId.EZ_CURL_BAR,
    name: "EZ Curl Bar",
    category: EquipmentCategory.FREE_WEIGHTS,
    isHomeFriendly: true,
    description: "Angled cambered barbell for joint-friendly bicep and tricep loading.",
  },

  // ── Benches & Racks ───────────────────────────────────────────────────
  {
    id: EquipmentId.FLAT_BENCH,
    name: "Flat Workout Bench",
    category: EquipmentCategory.BENCHES_AND_RACKS,
    isHomeFriendly: true,
    description: "Sturdy flat padded utility bench.",
  },
  {
    id: EquipmentId.ADJUSTABLE_BENCH,
    name: "Adjustable Bench (Incline / Decline)",
    category: EquipmentCategory.BENCHES_AND_RACKS,
    isHomeFriendly: true,
    description: "Multi-angle bench for targeted upper chest and shoulder pressing.",
  },
  {
    id: EquipmentId.SQUAT_RACK,
    name: "Squat Rack / Power Cage",
    category: EquipmentCategory.BENCHES_AND_RACKS,
    isHomeFriendly: false,
    description: "Upright safety cage for squats, overhead presses, and benching.",
  },

  // ── Cables & Commercial Machines ──────────────────────────────────────
  {
    id: EquipmentId.CABLE_PULLEY_TOWER,
    name: "Cable Machine (Dual Adjustable Pulley)",
    category: EquipmentCategory.CABLES,
    isHomeFriendly: false,
    description: "Height-adjustable cable stack for continuous rotational tension.",
  },
  {
    id: EquipmentId.SMITH_MACHINE,
    name: "Smith Machine",
    category: EquipmentCategory.MACHINES,
    isHomeFriendly: false,
    description: "Barbell on fixed vertical guide rails for controlled movement paths.",
  },
  {
    id: EquipmentId.LEG_PRESS_MACHINE,
    name: "45-Degree Leg Press Machine",
    category: EquipmentCategory.MACHINES,
    isHomeFriendly: false,
    description: "Heavy lower body sled press with zero axial spinal compression.",
  },
  {
    id: EquipmentId.LEG_CURL_MACHINE,
    name: "Seated / Lying Leg Curl Machine",
    category: EquipmentCategory.MACHINES,
    isHomeFriendly: false,
    description: "Pin-selected knee flexion machine isolating the hamstrings.",
  },
  {
    id: EquipmentId.LAT_PULLDOWN_ROW,
    name: "Lat Pulldown & Low Cable Row",
    category: EquipmentCategory.MACHINES,
    isHomeFriendly: false,
    description: "Vertical pull and horizontal cable row station for back hypertrophy.",
  },
  {
    id: EquipmentId.CHEST_PRESS_MACHINE,
    name: "Seated Chest Press / Pec Deck Machine",
    category: EquipmentCategory.MACHINES,
    isHomeFriendly: false,
    description: "Guided seated chest press and machine fly for chest hypertrophy.",
  },
] as const;
