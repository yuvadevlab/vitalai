/**
 * @file packages/shared-types/src/enums/advisor.enum.ts
 * @description AI Advisor Studio, clinical personas, and auto-dispatch triage enums.
 * @module @vitalai/shared-types
 */

/**
 * Clinical and coaching specialties available for AI Advisor personas.
 */
export enum AdvisorSpecialty {
  /** Metabolic health, purine risk score, glycemic load, and macro periodization */
  CLINICAL_NUTRITION = "clinical_nutrition",

  /** Volume landmarks (MEV/MAV/MRV), mesocycle periodization, and progressive overload */
  HYPERTROPHY_PERIODIZATION = "hypertrophy_periodization",

  /** Joint kinematics, injury rehab, movement swaps, and prehab protocols */
  PHYSICAL_THERAPY_REHAB = "physical_therapy_rehab",

  /** Trimester nutritional timing, pelvic floor safety, and gestational health */
  OBSTETRIC_HEALTH = "obstetric_health",

  /** Sleep architecture, autonomic recovery, and preventative longevity */
  GENERAL_LONGEVITY = "general_longevity",
}

/**
 * Communication tone and conversational persona style for AI Advisors.
 */
export enum AdvisorTone {
  /** Highly quantitative, citing clinical literature and physiological biomarkers */
  SCIENTIFIC_ANALYTICAL = "scientific_analytical",

  /** High accountability, direct feedback, no excuses, laser-focused on adherence */
  DIRECT_TOUGH_LOVE = "direct_tough_love",

  /** Warm, encouraging, supportive, and trauma-informed health coaching */
  EMPATHETIC_NURTURING = "empathetic_nurturing",

  /** Concise, bulleted summaries, action-first with minimal conversational fluff */
  STOIC_CONCISE = "stoic_concise",
}

/**
 * Chat drawer dispatch routing modes.
 */
export enum AdvisorMode {
  /** AI classifies query intent automatically and routes to the best clinical specialist */
  AUTO_DISPATCH = "auto_dispatch",

  /** User explicitly locks the chat to a specific advisor persona */
  MANUAL_OVERRIDE = "manual_override",
}

/**
 * Domain category of an interactive two-phase action proposal.
 */
export enum ProposalType {
  EXERCISE_SWAP = "exercise_swap",
  MEAL_SWAP = "meal_swap",
  VOLUME_ADJUSTMENT = "volume_adjustment",
}

/**
 * User decision lifecycle state of an AI action proposal.
 */
export enum ProposalStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DISMISSED = "dismissed",
}

/**
 * Conversational message roles in the chat stream.
 */
export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
}
