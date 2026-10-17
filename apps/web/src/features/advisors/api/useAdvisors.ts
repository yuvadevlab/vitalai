"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@vitalai/shared-types";

export interface AdvisorRecord {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly title: string;
  readonly avatar?: string | null;
  readonly tone: string;
  readonly modelSlug: string;
  readonly toolCount: number;
  readonly isDefault?: boolean;
  readonly description: string;
  readonly specialty: string;
}

const MOCK_ADVISORS: readonly AdvisorRecord[] = [
  {
    id: "adv-elena",
    slug: "elena",
    name: "Dr. Elena Rostova",
    title: "Maternal-Fetal Nutrition & Clinical Dietetics",
    tone: "scientific_analytical",
    modelSlug: "qwen3:14b",
    toolCount: 5,
    isDefault: true,
    specialty: "Prenatal calorie scaling, purine management, and glycemic control",
    description:
      "Rigorous clinical dietitian specializing in ACOG gestational guidelines and metabolic safety.",
  },
  {
    id: "adv-marcus",
    slug: "marcus",
    name: "Coach Marcus Vance",
    title: "Head of Strength & Biomechanical Periodization",
    tone: "direct_tough_love",
    modelSlug: "qwen3:14b",
    toolCount: 6,
    isDefault: false,
    specialty: "Mesocycle volume landmarks, fatigue-regulated RIR, and axial spine protection",
    description:
      "Evidence-based strength coach balancing maximal hypertrophic stimulus with orthopedic joint longevity.",
  },
  {
    id: "adv-julian",
    slug: "julian",
    name: "Dr. Julian Thorne",
    title: "Metabolic Longevity & Preventative Cardiology",
    tone: "stoic_concise",
    modelSlug: "qwen3:14b",
    toolCount: 4,
    isDefault: false,
    specialty: "Uric acid kinetics, lipid partitioning, and mitochondrial biogenesis",
    description:
      "Preventative medicine specialist focusing on metabolic health markers and biomarker optimization.",
  },
  {
    id: "adv-sarah",
    slug: "sarah",
    name: "Sarah Jenkins, MS",
    title: "Behavioral Adherence & Athletic Psychology",
    tone: "empathetic_nurturing",
    modelSlug: "qwen3:8b",
    toolCount: 3,
    isDefault: false,
    specialty: "Habit stacking, CNS fatigue mitigation, and intuitive eating adherence",
    description:
      "Mindset and athletic psychology advisor ensuring sustainable consistency without burn-out.",
  },
];

export function useAdvisors() {
  return useQuery({
    queryKey: QUERY_KEYS.ADVISORS.ALL,
    queryFn: async (): Promise<readonly AdvisorRecord[]> => {
      return MOCK_ADVISORS;
    },
    initialData: MOCK_ADVISORS,
    staleTime: 60 * 1000,
  });
}
