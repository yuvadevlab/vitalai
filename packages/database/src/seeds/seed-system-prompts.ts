/**
 * @file packages/database/src/seeds/seed-system-prompts.ts
 * @description Idempotent database seeder for living system prompt templates.
 * @module @vitalai/database/seeds
 */

import { PrismaClient } from "@prisma/client";

export const SEED_SYSTEM_PROMPTS = [
  {
    slug: "safety-guidelines",
    name: "Tier-1 Medical Safety Guidelines",
    description: "Deterministic clinical safety guardrails and contraindication matrix directives",
    version: 1,
    content:
      "TIER-1 MEDICAL SAFETY DIRECTIVES (NON-NEGOTIABLE):\n" +
      "1. You are bound by the Hippocratic Oath of AI: Do No Harm.\n" +
      "2. Never recommend an exercise or movement pattern that is clinically contraindicated by the user's Health Vault.\n" +
      "3. Strict contraindications require immediate biomechanical substitution.\n" +
      "4. Deterministic science and physiology tool outputs always supersede intuitive model opinions.",
    isActive: true,
  },
  {
    slug: "react-format",
    name: "ReAct Reasoning & Action Format",
    description: "Thought-Action-Observation-Final Answer cognitive harness specification",
    version: 1,
    content:
      "COGNITIVE REASONING HARNESS:\n" +
      "You operate using an explicit ReAct (Reasoning + Acting) loop:\n" +
      "Thought: Explain your clinical rationale and what physiology tool needs to be invoked.\n" +
      "Action: The tool name to invoke (must be one of the permitted tools).\n" +
      "Action Input: A JSON object with the exact parameters.\n" +
      "Observation: The deterministic result returned by the tool.\n" +
      "Final Answer: Your synthesized, empathetic, and evidence-grounded recommendation.",
    isActive: true,
  },
  {
    slug: "supervisor-triage",
    name: "Supervisor Clinical Advisor Triage",
    description: "Autonomous routing guidelines for matching queries to clinical specialties",
    version: 1,
    content:
      "SUPERVISOR TRIAGE DIRECTIVES:\n" +
      "Analyze the user's query and assign it to the most qualified specialist:\n" +
      "- Nutrition, diet, calories, macros, gout, diabetes -> Dr. Elena Rostova\n" +
      "- Strength, hypertrophy, muscle growth, progressive overload -> Marcus Vance\n" +
      "- Joint pain, injury rehab, movement modifications -> Dr. Julian Mercer\n" +
      "- Pregnancy, postpartum, pelvic floor, obstetric safety -> Dr. Sarah Jenkins",
    isActive: true,
  },
];

/**
 * Seeds living system prompt templates idempotently.
 *
 * @param prisma - PrismaClient instance
 */
export async function seedSystemPrompts(prisma: PrismaClient): Promise<void> {
  for (const prompt of SEED_SYSTEM_PROMPTS) {
    await prisma.systemPromptTemplate.upsert({
      where: { slug: prompt.slug },
      update: {
        name: prompt.name,
        description: prompt.description,
        version: prompt.version,
        content: prompt.content,
        isActive: prompt.isActive,
      },
      create: {
        slug: prompt.slug,
        name: prompt.name,
        description: prompt.description,
        version: prompt.version,
        content: prompt.content,
        isActive: prompt.isActive,
      },
    });
  }
}
