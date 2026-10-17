# VitalAI — Master Implementation Plan, Phases & Progress Tracker

> **FOR ALL AI ASSISTANTS & DEVELOPERS:**
> This document is the living single source of truth for repository implementation progress.
> **BEFORE STARTING ANY TASK**: Read the **Agent Handoff & Quick Status Dashboard** below to know exactly what has been completed, what is in progress, and what must be executed next.
> **AFTER COMPLETING ANY SUBTASK**: Update this document with `[x]` checkmarks and advance the status badges.

---

## 1. Agent Handoff & Quick Status Dashboard

| Metric                    | Current State                                                                       |
| :------------------------ | :---------------------------------------------------------------------------------- |
| **Current Active Phase**  | **Phase 3: Backend API Gateway with Fastify & Mercurius GraphQL**                   |
| **Next Immediate Task**   | **Task 3.3: 5-Layer Feature Modules (User, Health, Workout, Nutrition, Advisor)**   |
| **Active Working Branch** | `feat/phase3-backend-api` (branched from `dev`)                                     |
| **Branching Rule**        | **ALWAYS branch from `dev`. NEVER checkout to `main`.**                             |
| **Commit Rule**           | **NEVER auto-commit or auto-push without explicit user confirmation.**              |
| **Port Blueprint**        | **Dev: Web `:3004` / API `:4004` ➔ Prod (`devlab-ops`): Web `:3014` / API `:4014`** |
| **Overall Progress**      | **42% Complete (Phase 0, 1, 2 Done; API Core & Bootstrap Live)**                    |

---

## 2. Phase-by-Phase Roadmap Matrix

| Phase       | Description                                            | Status           | Target Package / App                                               |
| :---------- | :----------------------------------------------------- | :--------------- | :----------------------------------------------------------------- |
| **Phase 0** | Workspace Foundation, Tooling, CI/CD, Agent Guidelines | **COMPLETED ✅** | Monorepo Root                                                      |
| **Phase 1** | Deterministic Science & Domain Foundation Packages     | **COMPLETED ✅** | `packages/shared-types`, `vital-engine`, `constants`, `validation` |
| **Phase 2** | Database & Persistence Layer (Prisma PostgreSQL)       | **COMPLETED ✅** | `packages/database`                                                |
| **Phase 3** | Backend API Gateway with Fastify & Mercurius GraphQL   | **COMPLETED ✅** | `apps/api`                                                         |
| **Phase 4** | Cognitive AI Advisory Harness (Ollama Multi-Persona)   | **PENDING ⏳**   | `packages/ai-engine`                                               |
| **Phase 5** | Domain UI Component System & Visual Heatmaps           | **PENDING ⏳**   | `packages/ui`                                                      |
| **Phase 6** | Next.js 15 Web Application & Feature Modules           | **PENDING ⏳**   | `apps/web`                                                         |
| **Phase 7** | End-to-End Verification, Performance & Hardening       | **PENDING ⏳**   | Full Monorepo                                                      |

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

### Phase 1: Deterministic Domain Foundations (`STATUS: COMPLETED ✅`)

_Goal_: Build the foundational TypeScript packages containing zero I/O and zero database dependencies.

#### Task 1.1: `@vitalai/shared-types`

- [x] Create `packages/shared-types/package.json` and `tsconfig.json`.
- [x] Define canonical Enums (Zero bare string literals):
  - [x] `LifeStage`: `PREGNANCY_T1`, `PREGNANCY_T2`, `PREGNANCY_T3`, `POSTPARTUM`, `GENERAL_WELLNESS`.
  - [x] `HealthCondition`: `DIABETES_T2`, `HYPERURICEMIA_GOUT`, `HYPERTENSION`, `ROTATOR_CUFF_IMPINGEMENT`, `LUMBAR_DISC_BULGE`, `MENISCUS_TEAR`.
  - [x] `MuscleGroup`: `CHEST`, `BACK`, `LATS`, `TRICEPS`, `BICEPS`, `FRONT_DELTS`, `SIDE_DELTS`, `REAR_DELTS`, `QUADS`, `HAMSTRINGS`, `GLUTES`, `CALVES`, `ABS`.
  - [x] `WorkoutSplit`: `FULL_BODY`, `UPPER_LOWER`, `PUSH_PULL_LEGS`, `ARNOLD_SPLIT`.
  - [x] `VolumeLandmarkType`: `MEV`, `MAV`, `MRV`.
- [x] Define shared DTO contracts for Health Memories, Mesocycles, Workout Days, and Nutrition Goals.
- [x] Centralize `API_ENDPOINTS`, `QUERY_KEYS`, and `APP_ROUTES`.

#### Task 1.2: `@vitalai/vital-engine` (Pure Mathematical Core)

- [x] Create `packages/vital-engine/package.json` and `tsconfig.json`.
- [x] Implement exercise physiology calculations:
  - [x] Volume landmarks per muscle group (MEV, MAV, MRV sets per week).
  - [x] Progressive overload increments and RIR target progression (Weeks 1 to 6).
  - [x] Fatigue index and recovery requirement heuristics.
- [x] Implement clinical nutrition & metabolic formulas:
  - [x] TDEE via Mifflin-St Jeor and Katch-McArdle with activity multipliers.
  - [x] Macronutrient distribution (Protein, Carbohydrates, Fats) based on deficit/surplus goals.
  - [x] Uric Acid & Purine risk score index for food items.
  - [x] Glycemic load formulas for Type 2 diabetes / insulin resistance.
  - [x] Pregnancy trimester caloric adjustments (+0 kcal T1, +340 kcal T2, +452 kcal T3) and micronutrient thresholds (Folate, Iron, Choline, DHA).
- [x] 100% deterministic test coverage with Vitest (`packages/vital-engine/src/__tests__/*`).

#### Task 1.3: `@vitalai/constants`

- [x] Curate 1,300+ Exercise library taxonomy with target muscles, equipment tags, and contraindication tags.
- [x] Curate food purine levels, glycemic indices, and trimester nutritional benchmarks.
- [x] Curate medical contraindication matrix (maps conditions $\rightarrow$ blacklisted exercise tags & foods).

#### Task 1.4: `@vitalai/validation`

- [x] Centralized Zod validation schemas for:
  - [x] User onboarding and profile updates.
  - [x] Health memory creation (condition, severity, details).
  - [x] Workout set logging (weight, reps, RPE).
  - [x] Daily nutrition & meal entries.

---

### Phase 2: Database & Persistence Layer (`STATUS: COMPLETED ✅`)

_Goal_: Create the PostgreSQL (`vitalai_dev`) database schema and Prisma repository interfaces supporting the complete UI architecture extracted from `friendly-error-pages-99f72791`.

- [x] Create `packages/database/package.json`, `tsconfig.json`, `prisma.config.ts`, and `prisma/schema.prisma`.
- [x] Configure PostgreSQL datasource with `DATABASE_URL=postgresql://localhost:5432/vitalai_dev?schema=public` (matching `finai_dev` & `orchestrai_dev`).
- [x] Define PostgreSQL models with native UUIDs, Enums, and arrays:
  - `User`: Onboarding traits, caloric goals, activity level, available equipment (`availableEquipmentIds String[]`), SSO JIT provisioning support.
  - `HealthMemory`: Category, severity, active flag, blacklisted movements, blacklisted ingredients, diagnosedAt.
  - `Mesocycle`: 6-week periodization cycles, current week, phase (`baseline`, `overload`, `peak`, `deload`).
  - `WorkoutSession`: Session name, day of week, completed status, estimated duration.
  - `Exercise`: Muscle target, required equipment, default tempo, target sets/reps/RIR, notes.
  - `SetLog`: Set number, target reps/RIR, actual reps/RIR, weightKg, completed, restSeconds.
  - `ExerciseSwap`: Original exercise, proposed substitute, biomechanical rationale, trigger reason.
  - `DailyMealPlan`: Date, macro targets, total water logged, daily purine total, glycemic summary.
  - `MealItem`: Meal type, calories, protein, carbs, fats, purineMg, glycemicLoad, food tags.
  - `AdvisorPersona`: Clinical/coaching personas (Elena, Marcus, Julian), avatar, tone, specialties, custom flag.
  - `ChatMessage`: Role, content, advisorId, autoAssigned flag, reasoning trace JSON, action proposal JSON.
- [x] Lean package architecture: direct PrismaClient exports (`client.ts`), repositories located in `apps/api/src/modules/*/repositories/`.
- [x] Add Prisma migration scripts (`pnpm db:migrate` and `pnpm db:generate`).
- [x] Enforce the safeguard: Zero auto-seeding.

---

### Phase 3: Backend API Gateway with Advanced GraphQL (`STATUS: COMPLETED ✅`)

_Goal_: Build the NestJS 11 Fastify GraphQL API with Code-First schema resolution and DevLab SSO integration.

#### DevLab Ecosystem Port Allocation Blueprint

| Environment     | Service                   | Port   | Endpoint                |
| :-------------- | :------------------------ | :----- | :---------------------- |
| **Development** | API Gateway (`apps/api`)  | `4004` | `http://localhost:4004` |
| **Development** | Web Frontend (`apps/web`) | `3004` | `http://localhost:3004` |
| **Production**  | API Gateway (`apps/api`)  | `4014` | `http://localhost:4014` |
| **Production**  | Web Frontend (`apps/web`) | `3014` | `http://localhost:3014` |

> Guaranteed non-conflicting across DevLab platform daemons (`finai`: 3010/4010, `orchestrai`: 3011/4011/4012/4013, `devlab-portal`: 3015, `devlab-logs`: 3020, `devlab-guard`: 8000, `incidentai`: 8085). Production ops blueprint registered in `production/devlab-ops/config/apps/vitalai.env`.

#### Task 3.1: Core Infrastructure & SSO Authentication (`apps/api`)

- [x] Configure `apps/api` package, TypeScript NodeNext, and dependencies (NestJS 11, Fastify adapter, Mercurius GraphQL).
- [x] Implement robust Zod configuration validation (`api-config.schema.ts`, `api-config.ts`).
- [x] Implement Global `PrismaModule` & `PrismaService` with connection lifecycle hooks.
- [x] Implement Enterprise Common Utilities:
  - [x] `HttpExceptionFilter` with Fastify reply support and DevLab error payload format.
  - [x] `TransformInterceptor` mapping outgoing responses to `{ success, data, timestamp }`.
  - [x] `@CurrentUser()` parameter decorator extracting validated user context from REST and GraphQL contexts.
- [x] Implement DevLab SSO Authentication (`AuthModule`, `JwtStrategy`, `JwtAuthGuard`):
  - [x] Dual RS256 / HS256 JWT decoding supporting DevLab SSO and local development.
  - [x] Just-In-Time (JIT) shadow user provisioning in PostgreSQL on first login.
  - [x] Dual REST / GraphQL execution context switching.

#### Task 3.2: Gateway Bootstrap & Root Endpoints

- [x] Implement `AppController` (`GET /health` with database query probe).
- [x] Implement `AppResolver` (root GraphQL `healthPing` query).
- [x] Implement `AppModule` configuring Mercurius GraphQL, Fastify, PrismaModule, and AuthModule.
- [x] Implement `main.ts` bootstrapping Fastify adapter, Swagger OpenAPI (`/api/docs`), CORS, and port 4004.

#### Task 3.3: 5-Layer Feature Modules

- [x] `modules/user`: User profile resolver, onboarding questionnaire mutation, dynamic BMR/TDEE calculation via `@vitalai/vital-engine`, `@CurrentUser()` queries.
- [x] `modules/health-condition`: Medical conditions vault, clinical contraindication auto-matching from `CONTRAINDICATION_MATRIX`, movement/food blacklists.
- [x] `modules/workout`: 6-week periodized mesocycle generator, active gym session HUD, set logging mutation, biomechanical exercise swap proposals.
- [x] `modules/nutrition`: Daily meal planner, purine risk score evaluation (<300mg/day), glycemic load curves, obstetric trimester surplus adjustments.
- [x] `modules/advisor`: Multi-persona clinical staff (Dr. Elena, Marcus Vance, Dr. Julian Mercer), transparent clinical reasoning traces, Fastify SSE streaming (`/api/v1/advisor/stream`).

#### Task 3.4: DataLoaders, Cursor Pagination & Error Handling

- [x] Implement batch DataLoaders (`DataLoaderService`, `VitalDataLoaders`) eliminating N+1 queries on nested sets and exercises.
- [x] Implement Relay-style cursor-based pagination (`PageInfo`, `PaginationArgs`, `createConnection`, `ChatMessageConnection`).
- [x] Implement custom GraphQL error extensions (`VitalGraphQLError`, `formatMercuriusErrors` mapping to DevLab platform error codes).

---

### Phase 4: Cognitive AI Advisory Harness (`STATUS: READY TO START 🚀`)

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

_Goal_: Build presentation components and visual human anatomy maps in `@vitalai/ui`, elevating the prototypes from `friendly-error-pages-99f72791` into a high-craft, state-of-the-art design system using `@yuva-devlab/tokens`.

- [ ] Create `packages/ui` linked to `@yuva-devlab/tokens`.
- [ ] Build `<ReasoningTrace />`: Collapsible multi-phase AI clinical evaluation HUD with animated step indicators and timing.
- [ ] Build `<SwapActionCard />`: Two-phase proposal card (original vs. proposed substitute) with Accept/Reject mutation triggers.
- [ ] Build `<MultiRingGauge />`: Precision SVG multi-ring circular visualizer for Calories, Protein, Carbs, and Fats.
- [ ] Build `<MuscleHighlighter />`: Interactive SVG anterior and posterior anatomy heatmap with dynamic primary/secondary muscle highlights.
- [ ] Build `<ActiveWorkoutHUD />`: Live gym session interval rest timer with sound/vibration cues and set completion toggles.
- [ ] Build `<EquipmentChecklist />`: Muscle Monster-style multi-select equipment selector for home and gym onboarding.
- [ ] Build `<PurineSafetyGauge />`: Clinical purine meter highlighting Safe (<300mg), Caution (300-500mg), and High Risk zones.
- [ ] Build `<GlycemicTimeline />`: Visual curve of postprandial glycemic load relative to peri-workout windows.
- [ ] Build `<TrimesterTimeline />`: Gestational progress bar with week-by-week fetal milestones and safe movement guidance.

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
