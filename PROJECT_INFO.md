# VitalAI — Master Product Specification, Technical Dossier & Operations Manual

---

## 1. Product File: Strategic Vision & Requirements

### 1.1 Executive Summary

**VitalAI** is an autonomous AI-powered personal health intelligence, clinical nutrition, maternal care, and fitness platform engineered to deliver scientifically rigorous, personalized health and performance guidance.

Unlike single-purpose gym trackers or generic chat assistants that hallucinate dangerous dietary advice or impossible progressive overload curves, VitalAI is built upon four fundamental architectural pillars:

1. **Deterministic, Zero-Hallucination Science Core**: All exercise volume landmarks (MEV/MAV/MRV), TDEE formulas, macro distributions, purine risk scores, and trimester micronutrient adjustments are calculated exclusively by `@vitalai/vital-engine`—a pure functional TypeScript library with **zero I/O, zero network dependencies, and 100% deterministic test coverage**.
2. **Advanced Code-First GraphQL Data Gateway**: Complete graph-based data querying with NestJS 11, `@nestjs/graphql`, and DataLoader batching to eliminate N+1 query cascades across complex entity trees.
3. **Multi-Persona Cognitive Advisory**: Powered by Ollama neural inference rails, switching seamlessly between Clinical Nutritionist, Maternal Care Specialist, and Periodization Master personas.
4. **Two-Tier Medical Safety Guardrails**: Immutable code-level contraindication filters ensure that active user health conditions (e.g. Type 2 diabetes, hyperuricemia/gout, rotator cuff impingement, or pregnancy trimesters) strictly filter out contraindicated exercises or high-purine foods before any recommendation reaches the user.

---

## 2. System Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                VITALAI ARCHITECTURE                                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
                 [Next.js 15 Web Dashboard (:3000) — apps/web]
                 (React 19, Tailwind v4, React Query v5, @vitalai/ui, @yuva-devlab/tokens)
                                          │
                                          ├───────────────┬────────────────┐
                            GraphQL POST  │               │ SSE Stream     │
                                          ▼               ▼                │
                   [NestJS 11 API Gateway (:4000) — apps/api]              │
                   (Fastify Engine, Prisma ORM, 5-Layer Architecture)      │
       ┌──────────────────────────────────┼────────────────────────────────┼─┐
       ▼                                  ▼                                  ▼
[Science Math Core]           [Cognitive Advisory Loop]              [Database & State]
 • @vitalai/vital-engine       • @vitalai/ai-engine                   • @vitalai/database
 • Zero I/O, Zero Network      • Ollama Provider (:11434)             • Prisma ORM
 • Volume Landmarks (MEV/MRV)  • qwen3:14b / qwen3:8b                 • Health Vault Records
 • TDEE & Macro Calculations   • ReAct Tool Execution                 • Workout & Nutrition Logs
 • Trimester Nutrients & Purine • Clinical Safety Guardrails           • Conversation State
```

---

## 3. Application Directory Breakdown

### 3.1. Web Application (`apps/web` — Port `3000`)

- **Technology Stack**: Next.js 15 (App Router), React 19, Tailwind CSS v4, React Query v5, `@vitalai/ui`, `@yuva-devlab/tokens`.
- **Feature Modules**:
  - **Health Vault**: Interactive management of medical conditions, orthopedic history, and pregnancy stages.
  - **Conversational Advisor**: Real-time SSE streaming dialogue with contextual clinical and training personas.
  - **Workout Command Center**: 6-week periodized mesocycle viewer, set/rep logger, and active training HUD.
  - **Nutrition Engine**: Daily caloric and macro progress rings, meal templates, and purine/glycemic indices.
  - **Maternal Care**: Trimester timeline, fetal development tracking, and safe movement screening.
  - **Anatomy Visualizer**: Interactive SVG muscle heatmap highlighting primary drivers and secondary stabilizers.

### 3.2. API Gateway (`apps/api` — Port `4000`)

- **Technology Stack**: NestJS 11, Fastify HTTP adapter, `@nestjs/graphql`, Prisma ORM.
- **Advanced GraphQL Architecture**:
  - Code-First Schema definition using decorators (`@ObjectType()`, `@InputType()`, `@Resolver()`, `@Query()`, `@Mutation()`).
  - Scoped DataLoader batching preventing N+1 queries when resolving related exercises, sets, and muscle tags.
  - Relay-style cursor-based pagination for high-volume collections.
  - Dedicated SSE Controller for streaming LLM tokens.

---

## 4. Package Directory Breakdown

| Package                     | Purpose & Core Invariants                                                                                                                                                                                                         |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`@vitalai/vital-engine`** | **Pure Functional Science Core**: Zero I/O, zero network calls. Computes TDEE, macro distributions, volume landmarks (MEV/MAV/MRV), purine indices, glycemic load values, and trimester-specific caloric and micronutrient needs. |
| **`@vitalai/ai-engine`**    | **Cognitive Advisory Harness**: Manages prompts, clinical personas, ReAct tool definitions, and immutable contraindication filters.                                                                                               |
| **`@vitalai/shared-types`** | **Canonical Types & Enums**: Houses `LifeStage`, `HealthCondition`, `NutritionalGoal`, `WorkoutSplit`, `MuscleGroup`, `API_ENDPOINTS`, and `QUERY_KEYS`.                                                                          |
| **`@vitalai/validation`**   | **Zod Schemas**: Centralized validation schemas for onboarding, health memories, workout set logging, and meal input.                                                                                                             |
| **`@vitalai/constants`**    | **Domain Taxonomies**: 1,300+ Exercise library, food purine and glycemic tables, and trimester safety rules.                                                                                                                      |
| **`@vitalai/database`**     | **Prisma Client**: SQLite database schema definitions, repository interfaces, and migration configurations.                                                                                                                       |
| **`@vitalai/ui`**           | **Domain UI Primitives**: `<MuscleHighlighter />`, `<MacroRingGauge />`, `<HealthBadge />`, and `<TrimesterTimeline />`.                                                                                                          |
