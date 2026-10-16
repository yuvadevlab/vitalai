/**
 * @file packages/shared-types/src/enums/health-condition.enum.ts
 * @description Health Memory Vault classifications and clinical guardrail severities.
 * @module @vitalai/shared-types
 */

/**
 * High-level clinical categories for private health conditions stored in the Health Memory Vault.
 */
export enum ConditionCategory {
  /** Joint, tendon, spinal, or muscular injuries requiring movement pattern modifications */
  ORTHOPEDIC = "orthopedic",

  /** Glycemic dysregulation, purine/uric acid accumulation, or lipid abnormalities */
  METABOLIC = "metabolic",

  /** Blood pressure, heart rate, or arterial compliance constraints */
  CARDIOVASCULAR = "cardiovascular",

  /** Thyroid, adrenal, reproductive, or hypothalamic-pituitary-adrenal axis conditions */
  HORMONAL = "hormonal",

  /** Systemic inflammatory, rheumatoid, or autoimmune conditions */
  AUTOIMMUNE = "autoimmune",

  /** Gastrointestinal absorption, IBS, or micronutrient intolerance conditions */
  DIGESTIVE = "digestive",
}

/**
 * Enforcement rigor applied by the AI Advisor reasoning engine when cross-referencing health conditions.
 */
export enum ConditionSeverity {
  /** Informational note: monitored in reasoning traces but permits standard loading */
  OBSERVE = "observe",

  /** Moderate precaution: AI filters secondary exercises and reduces axial spinal loading */
  CAUTION = "caution",

  /** Hard clinical contraindication: blacklists contraindicated movements and ingredients automatically */
  STRICT_CONTRAINDICATION = "strict_contraindication",
}

/**
 * Operational guardrail rule types enforced by the clinical engine.
 */
export enum GuardrailType {
  EXERCISE_BLACKLIST = "exercise_blacklist",
  EXERCISE_WHITELIST = "exercise_whitelist",
  INGREDIENT_EXCLUDE = "ingredient_exclude",
  HYDRATION_SURPLUS = "hydration_surplus",
}
