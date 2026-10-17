/**
 * @file packages/shared-types/src/enums/life-stage.enum.ts
 * @description Life stage and physiological phase enums for clinical nutrition and training adjustments.
 * @module @vitalai/shared-types
 */

/**
 * Physiological life stages that govern energy expenditure (TDEE),
 * micronutrient demands, and biomechanical training contraindications.
 */
export enum LifeStage {
  /** General adult without stage-specific metabolic or obstetric adjustments */
  GENERAL_ADULT = "general_adult",

  /** Preconception preparation (folate, iron, and metabolic optimization) */
  PRECONCEPTION = "preconception",

  /** Pregnancy First Trimester (weeks 1-12, embryonic organogenesis, nausea management) */
  PREGNANCY_FIRST_TRIMESTER = "pregnancy_first_trimester",

  /** Pregnancy Second Trimester (weeks 13-26, +340 kcal/day, relaxin joint precautions) */
  PREGNANCY_SECOND_TRIMESTER = "pregnancy_second_trimester",

  /** Pregnancy Third Trimester (weeks 27-40, +450 kcal/day, avoid supine vena cava compression) */
  PREGNANCY_THIRD_TRIMESTER = "pregnancy_third_trimester",

  /** Early postpartum recovery (weeks 0-6, pelvic floor re-education, wound healing) */
  POSTPARTUM_EARLY = "postpartum_early",

  /** Postpartum progressive physical rehabilitation (weeks 6+) */
  POSTPARTUM_RECOVERY = "postpartum_recovery",

  /** Exclusive or partial lactation (+500 kcal/day, hydration surplus of 1000ml) */
  LACTATION = "lactation",

  /** Masters athlete (age 45+, higher leucine threshold, extended connective tissue deloads) */
  MASTERS_ATHLETE = "masters_athlete",
}
