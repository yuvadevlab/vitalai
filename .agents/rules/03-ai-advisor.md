# VitalAI AI Advisor & Clinical Safety Rules (`packages/ai-engine`)

> **Scope**: Applies to `@vitalai/ai-engine` and AI orchestration in `apps/api`.

---

## 1. Multi-Persona Cognitive Architecture

The AI advisor dynamically mounts one of three clinical/performance personas based on active user context:

1. **The Clinical Nutritionist**: Specializes in metabolic conditions (Type 2 diabetes, hyperuricemia/gout, hypertension, gastrointestinal sensitivities) with macro/micronutrient timing.
2. **The Maternal & Prenatal Specialist**: Focuses on pregnancy trimester stages (T1, T2, T3, postpartum), fetal development milestones, prenatal vitamins (folate, choline, iron, DHA), and safe pelvic floor/joint stability movements.
3. **The Periodization & Hypertrophy Master**: Deep expertise in sports science, volume landmarks (MEV, MAV, MRV), RIR auto-regulation, progressive overload curves, and biomechanical exercise swaps.

---

## 2. Deterministic Science Priority (LLMs Never Do Math)

1. **Zero Hallucinated Numbers**: Neural models are strictly forbidden from calculating calorie totals, macro distributions, 1RM estimations, or purine indices directly.
2. **Delegation Protocol**: The AI advisor MUST call deterministic tool functions in `@vitalai/vital-engine` and incorporate the verified outputs into its conversational responses.

---

## 3. Two-Tier Medical Safety Guardrails

```
[User Context / Health Vault]
          │
          ▼
[Tier 1: Deterministic Filter (Code)] ──► Hard exclusion of contraindicated exercises / foods
          │
          ▼
[Tier 2: System Persona Guidance (LLM)] ──► Empathetic coaching, warm-up prehab & posture cues
```

1. **Tier 1 (Immutable Code Filter)**: If an active health memory exists (e.g. `L4-L5 Disc Herniation` or `High Uric Acid`), the code layer enforces hard exclusions on blacklisted tags (`axial_spinal_compression`, `high_purine_organ_meats`) before the LLM can recommend them.
2. **Tier 2 (Conversational Framing)**: The LLM reads active medical directives and frames guidance with care, emphasizing physician consultation for severe symptoms.

---

## 4. ReAct Tool Harness & Confirmation Protocol

1. **Read-Only Conversational Tools**: During freeform dialogue, the LLM is restricted to read tools:
   - `get_health_vault_memories`
   - `get_active_mesocycle`
   - `get_nutrition_summary`
   - `get_trimester_guidelines`
2. **Two-Phase Action Confirmation**: Any state mutation (activating a new 6-week plan, modifying calorie/macro targets, archiving an injury) requires displaying an explicit preview card to the user for interactive confirmation before writing to the database.
