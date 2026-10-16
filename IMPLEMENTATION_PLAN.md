# VitalAI — Master Implementation Plan, Phases & Progress Tracker

> **FOR ALL AI ASSISTANTS & DEVELOPERS:**
> This document is the living single source of truth for repository implementation progress.
> **BEFORE STARTING ANY TASK**: Read the **Agent Handoff & Quick Status Dashboard** below to know exactly what has been completed, what is in progress, and what must be executed next.
> **AFTER COMPLETING ANY SUBTASK**: Update this document with `[x]` checkmarks and advance the status badges.

---

## 1. Agent Handoff & Quick Status Dashboard

| Metric                    | Current State                                                                    |
| :------------------------ | :------------------------------------------------------------------------------- |
| **Current Active Phase**  | **Phase 1: Domain Core Packages (`@vitalai/*`)**                                 |
| **Next Immediate Task**   | **Task 1.1: `@vitalai/shared-types` (Enums, DTOs, and Contracts)**               |
| **Active Working Branch** | `feat/ci-reverse-sync-and-branching-rules` (or new `feat/*` branched from `dev`) |
| **Branching Rule**        | **ALWAYS branch from `dev`. NEVER checkout to `main`.**                          |
| **Commit Rule**           | **NEVER auto-commit or auto-push without explicit user confirmation.**           |
| **Overall Progress**      | **15% Complete (Phase 0 Complete, Phase 1 Ready)**                               |

---

## 2. Phase-by-Phase Roadmap Matrix

| Phase       | Description                                            | Status                | Target Package / App                                               |
| :---------- | :----------------------------------------------------- | :-------------------- | :----------------------------------------------------------------- |
| **Phase 0** | Workspace Foundation, Tooling, CI/CD, Agent Guidelines | **COMPLETED ✅**      | Monorepo Root                                                      |
| **Phase 1** | Deterministic Science & Domain Foundation Packages     | **READY TO START ⏳** | `packages/shared-types`, `vital-engine`, `constants`, `validation` |
| **Phase 2** | Database & Persistence Layer (Prisma SQLite)           | **PENDING ⏳**        | `packages/database`                                                |
| **Phase 3** | Backend API Gateway with Advanced Code-First GraphQL   | **PENDING ⏳**        | `apps/api`                                                         |
| **Phase 4** | Cognitive AI Advisory Harness (Ollama Multi-Persona)   | **PENDING ⏳**        | `packages/ai-engine`                                               |
| **Phase 5** | Domain UI Component System & Visual Heatmaps           | **PENDING ⏳**        | `packages/ui`                                                      |
| **Phase 6** | Next.js 15 Web Application & Feature Modules           | **PENDING ⏳**        | `apps/web`                                                         |
| **Phase 7** | End-to-End Verification, Performance & Hardening       | **PENDING ⏳**        | Full Monorepo                                                      |

---

## 3. Detailed Phase Specifications & Checklists

### Phase 0: Workspace Foundation & CI Tooling (`STATUS: COMPLETED ✅`)

- [x] Monorepo repository cloned from `https://github.com/yuvadevlab/vitalai.git`.
- [x] Root configuration: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, `tsconfig.json`.
- [x] ESLint 9 + TypeScript ESLint configured with the **hard 250-line rule** (`eslint.config.js`).
- [x] Prettier & lint-staged automation (`.prettierrc`, `.prettierignore`).
- [x] Husky git hooks: `commit-msg` (Conventional Commits) & `pre-commit` (`lint-staged`).
- [x] GitHub Actions Workflows:
  - [x] `ci.yml`: Automated lint, format check, typecheck, test, and build.
  - [x] `validate-main-pr.yml`: Enforces that PRs to `main` must originate from `dev`.
  - [x] `reverse-sync.yml`: Automatically reverse-syncs `main` into `dev` on push.
  - [x] `actions/setup-node-env`: Composite setup action for Node 24 and pnpm.
- [x] Agent rulebooks in `.agents/rules/` (`00-core-invariants.md`, `01-frontend-web.md`, `02-backend-api.md`, `03-ai-advisor.md`, `04-testing-standards.md`).
- [x] Master documentation: `AGENTS.md`, `CLAUDE.md`, `README.md`, `PROJECT_INFO.md`.
- [x] `pnpm-lock.yaml` generated and verified with 0 lint/format/typecheck errors.

---

### Phase 1: Deterministic Domain Foundations (`STATUS: READY TO START ⏳`)

_Goal_: Build the foundational TypeScript packages containing zero I/O and zero database dependencies.

#### Task 1.1: `@vitalai/shared-types`

- [ ] Create `packages/shared-types/package.json` and `tsconfig.json`.
- [ ] Define canonical Enums (Zero bare string literals):
  - [ ] `LifeStage`: `PREGNANCY_T1`, `PREGNANCY_T2`, `PREGNANCY_T3`, `POSTPARTUM`, `GENERAL_WELLNESS`.
  - [ ] `HealthCondition`: `DIABETES_T2`, `HYPERURICEMIA_GOUT`, `HYPERTENSION`, `ROTATOR_CUFF_IMPINGEMENT`, `LUMBAR_DISC_BULGE`, `MENISCUS_TEAR`.
  - [ ] `MuscleGroup`: `CHEST`, `BACK`, `LATS`, `TRICEPS`, `BICEPS`, `FRONT_DELTS`, `SIDE_DELTS`, `REAR_DELTS`, `QUADS`, `HAMSTRINGS`, `GLUTES`, `CALVES`, `ABS`.
  - [ ] `WorkoutSplit`: `FULL_BODY`, `UPPER_LOWER`, `PUSH_PULL_LEGS`, `ARNOLD_SPLIT`.
  - [ ] `VolumeLandmarkType`: `MEV`, `MAV`, `MRV`.
- [ ] Define shared DTO contracts for Health Memories, Mesocycles, Workout Days, and Nutrition Goals.
- [ ] Centralize `API_ENDPOINTS`, `QUERY_KEYS`, and `APP_ROUTES`.

#### Task 1.2: `@vitalai/vital-engine` (Pure Mathematical Core)

- [ ] Create `packages/vital-engine/package.json` and `tsconfig.json`.
- [ ] Implement exercise physiology calculations:
  - [ ] Volume landmarks per muscle group (MEV, MAV, MRV sets per week).
  - [ ] Progressive overload increments and RIR target progression (Weeks 1 to 6).
  - [ ] Fatigue index and recovery requirement heuristics.
- [ ] Implement clinical nutrition & metabolic formulas:
  - [ ] TDEE via Mifflin-St Jeor and Katch-McArdle with activity multipliers.
  - [ ] Macronutrient distribution (Protein, Carbohydrates, Fats) based on deficit/surplus goals.
  - [ ] Uric Acid & Purine risk score index for food items.
  - [ ] Glycemic load formulas for Type 2 diabetes / insulin resistance.
  - [ ] Pregnancy trimester caloric adjustments (+0 kcal T1, +340 kcal T2, +452 kcal T3) and micronutrient thresholds (Folate, Iron, Choline, DHA).
- [ ] 100% deterministic test coverage with Vitest (`packages/vital-engine/src/__tests__/*`).

#### Task 1.3: `@vitalai/constants`

- [ ] Curate 1,300+ Exercise library taxonomy with target muscles, equipment tags, and contraindication tags.
- [ ] Curate food purine levels, glycemic indices, and trimester nutritional benchmarks.
- [ ] Curate medical contraindication matrix (maps conditions $\rightarrow$ blacklisted exercise tags & foods).

#### Task 1.4: `@vitalai/validation`

- [ ] Centralized Zod validation schemas for:
  - [ ] User onboarding and profile updates.
  - [ ] Health memory creation (condition, severity, details).
  - [ ] Workout set logging (weight, reps, RPE).
  - [ ] Daily nutrition & meal entries.

---

### Phase 2: Database & Persistence Layer (`STATUS: PENDING ⏳`)

_Goal_: Create the single-file SQLite database schema and Prisma repository interfaces.

- [ ] Create `packages/database/package.json`, `tsconfig.json`, and `prisma/schema.prisma`.
- [ ] Define SQLite models:
  - `User`, `HealthMemory`, `Mesocycle`, `WorkoutSession`, `Exercise`, `SetLog`, `MealLog`, `ChatMessage`.
- [ ] Implement typed repository classes with mandatory `userId` scoping:
  - `UserRepository`, `HealthMemoryRepository`, `WorkoutRepository`, `NutritionRepository`, `ChatRepository`.
- [ ] Add Prisma migration scripts (`pnpm db:migrate`).
- [ ] Enforce the safeguard: Zero auto-seeding.

---

### Phase 3: Backend API Gateway with Advanced GraphQL (`STATUS: PENDING ⏳`)

_Goal_: Build the NestJS 11 Fastify GraphQL API with Code-First schema resolution.

- [ ] Create `apps/api` with NestJS 11, Fastify HTTP adapter, and `@nestjs/graphql`.
- [ ] Implement Code-First GraphQL Resolvers:
  - [ ] `HealthVaultResolver`: Queries & mutations for medical memories and conditions.
  - [ ] `WorkoutResolver`: Mesocycle generation, workout days, active set logging.
  - [ ] `NutritionResolver`: Daily macro progress, meal recommendations, purine/glycemic summaries.
  - [ ] `MaternalCareResolver`: Trimester milestone tracking and prenatal checks.
- [ ] Implement DataLoaders to prevent N+1 queries when resolving related exercises and sets.
- [ ] Implement Relay-style cursor-based pagination for workout history and chat logs.
- [ ] Implement custom GraphQL error extensions (`GraphQLError` with typed codes).
- [ ] Build dedicated SSE Streaming Controller (`/api/ai/chat/stream`) for real-time Ollama tokens.

---

### Phase 4: Cognitive AI Advisory Harness (`STATUS: PENDING ⏳`)

_Goal_: Build the multi-persona ReAct agent engine using local Ollama models.

- [ ] Create `packages/ai-engine/package.json` and `tsconfig.json`.
- [ ] Connect to local Ollama on port `11434` (`qwen3:14b` for planning, `qwen3:8b` for fast chat).
- [ ] Build system personas:
  - [ ] `ClinicalNutritionistPersona`: Purine management, diabetes carb timing, digestive health.
  - [ ] `MaternalCarePersona`: Pregnancy trimester guidance, fetal milestones, prenatal safety.
  - [ ] `PeriodizationMasterPersona`: Volume landmarks, exercise swaps, progressive overload.
- [ ] Implement Tier-1 Deterministic Medical Safety Guardrails:
  - Enforce hard exclusions on blacklisted exercise tags or high-purine foods before LLM output generation.
- [ ] Implement two-phase action confirmation protocol for plan generation and macro updates.

---

### Phase 5: Domain UI Component System (`STATUS: PENDING ⏳`)

_Goal_: Build presentation components and visual human anatomy maps in `@vitalai/ui`.

- [ ] Create `packages/ui` linked to `@yuva-devlab/tokens`.
- [ ] Build `<MuscleHighlighter />`: Pure SVG anterior and posterior human anatomy map with dynamic target highlights.
- [ ] Build `<MacroRingGauge />`: Multi-ring circular visualizer for Calories, Protein, Carbs, and Fats.
- [ ] Build `<HealthBadge />`: Medical condition and injury warning badges.
- [ ] Build `<TrimesterTimeline />`: Gestational progress bar with week-by-week milestones.
- [ ] Build `<RestTimer />`: Interactive interval timer for active gym sessions.

---

### Phase 6: Next.js 15 Web Application (`STATUS: PENDING ⏳`)

_Goal_: Assemble the responsive user interface adhering to SSR boundary invariants.

- [ ] Create `apps/web` with Next.js 15 (App Router), React 19, and Tailwind CSS v4.
- [ ] Configure GraphQL Code Generator to compile `.graphql` operations into typed React Query v5 hooks.
- [ ] Integrate `@yuva-devlab/auth-client` for universal authentication.
- [ ] Implement feature views under `src/features/<feature>/components/`:
  - [ ] `features/health-vault`: Private memory management and condition toggles.
  - [ ] `features/workouts`: Periodized mesocycle schedule, active workout session HUD.
  - [ ] `features/nutrition`: Daily macro rings, meal planner, purine/glycemic index lookup.
  - [ ] `features/maternal-care`: Trimester progress tracker and prenatal nutrition guidance.
  - [ ] `features/advisor`: Streaming chat sidebar with the multi-persona advisor.
- [ ] Centralize all UI copy in `@/lib/ui-copy/` dictionaries.

---

### Phase 7: Verification, Hardening & Pre-Release (`STATUS: PENDING ⏳`)

- [ ] Verify that zero files exceed the **hard 250-line maximum rule**.
- [ ] Run full CI pipeline locally (`pnpm check` and `pnpm build`).
- [ ] Playwright E2E testing for critical flows (onboarding $\rightarrow$ health vault $\rightarrow$ workout generation).
- [ ] Verify zero memory leaks or unhandled promise rejections.

---

## 4. Invariant Rules for Ongoing Development

1. **Always Branch from `dev`**: `git checkout dev && git pull origin dev && git checkout -b feat/<name>`.
2. **Never Checkout to `main` Locally**: Leave `main` untouched.
3. **No Auto-Commit / Auto-Push**: Always summarize changes and ask the user for confirmation before committing.
4. **No Auto-Seeding**: Always ask before running any database seed scripts.
5. **Deterministic Math Supremacy**: The LLM _never_ performs raw arithmetic; all calculations delegate to `@vitalai/vital-engine`.
6. **Zero Bare Strings**: Canonical enums from `@vitalai/shared-types` are mandatory.
