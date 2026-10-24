# VitalAI Core Invariants & Universal Rules

> **MANDATORY FOR ALL AI AGENTS & CODING ASSISTANTS:**
> These core rules apply to every package, language, and tool in the VitalAI monorepo. They must never be bypassed.

---

## 1. Monorepo Package Boundaries & Placement

VitalAI is organized into strict package boundaries. Never leak side-effects across package boundaries:

```text
vitalai/
├── apps/
│   ├── web/                     # Next.js 15 App Router Frontend (Port 3004)
│   └── api/                     # NestJS 11 GraphQL API & AI Engine Gateway (Port 4004)
└── packages/
    ├── ai-engine/               # LLM prompts, clinical personas, prompt builders, tool definitions & guards
    ├── vital-engine/            # Pure mathematical calculation engine (zero DB, zero HTTP, zero I/O)
    ├── shared-types/            # Shared TypeScript DTOs, interfaces, constants, and enums
    ├── validation/              # Centralized Zod validation schemas
    ├── ui/                      # Shared design system components, muscle heatmap & gauges
    ├── constants/               # Exercise taxonomy, food nutritional indices, contraindications
    └── database/                # Prisma ORM schema, client, and seed definitions
```

### Strict Placement Rules

- **Shared Constants & Types (`@vitalai/shared-types`)**: ANY constants, DTO shapes, Enums (`LifeStage`, `HealthCondition`, `NutritionalGoal`, `WorkoutSplit`), `QUERY_KEYS`, `API_ENDPOINTS`, `APP_ROUTES`, or TypeScript interfaces shared across apps or packages MUST reside in `@vitalai/shared-types`. **NEVER duplicate types or constants across apps or packages**.
- **Science Math (`@vitalai/vital-engine`)**: ALL exercise physiology and clinical nutrition calculation logic (Volume Landmarks, TDEE, Mifflin-St Jeor, Glycemic Load, Purine Risk Score, Trimester Nutrient Adjustments) MUST reside in `@vitalai/vital-engine`. **MUST contain zero side-effects, zero I/O, zero database access, and zero HTTP calls**.
- **AI Prompts & Guardrails (`@vitalai/ai-engine`)**: ALL system personas, prompt templates, prompt builder factory functions, follow-up parsers, and clinical contraindication rules MUST reside in `@vitalai/ai-engine`. API services must never define inline prompt strings.
- **Validation Schemas (`@vitalai/validation`)**: ALL Zod schemas for forms and API validation MUST reside in `@vitalai/validation`. Never define inline Zod schemas in web components or backend route handlers.
- **UI Design System (`@vitalai/ui`)**: Reusable presentation components, muscle heatmap, dialog primitives, gauges, and form fields MUST live in `@vitalai/ui`.

---

## 2. Git Branching Protocol (Zero Auto-Branch Creation)

1. **Zero Auto-Branch Creation**: AI agents are strictly forbidden from creating git branches (`git checkout -b <name>`) automatically. The agent must ask the user to create the branch themselves, provide the exact branch name and git command (`git checkout dev && git pull origin dev && git checkout -b feat/<name>`), and wait for user confirmation before proceeding.
2. **Always Branch from `dev`**: When confirmed, new branches (`feat/*`, `fix/*`, `chore/*`, `docs/*`) MUST ALWAYS originate from `dev`:
   ```bash
   git checkout dev && git pull origin dev
   git checkout -b feat/<feature-name>
   ```
3. **NEVER Checkout to `main`**: AI agents and developers must NEVER checkout to `main` locally. `main` is strictly reserved for production deployments and automated CI reverse-syncs.
4. **Direct Pushes Prohibited**: Direct pushes to `main` and `dev` are strictly blocked.
5. **Pull Request Target**: All feature and fix branches must target `dev` via Pull Request.
6. **Promotion to Main**: `main` is strictly updated via Pull Request originating from `dev` (enforced by `validate-main-pr.yml`).
7. **Reverse Synchronization**: Any merge into `main` automatically triggers `reverse-sync.yml` to create an automated synchronization PR back into `dev`.

---

## 3. Commit & Push Safeguards (Mandatory User Confirmation)

1. **Zero Auto-Commits / Zero Auto-Pushes**: AI agents are strictly forbidden from executing `git commit` or `git push` automatically without prior explicit confirmation.
2. **Standard Completion Workflow**:
   - Complete code modifications and test verifications on the active feature branch.
   - Stop calling tools and output a clear summary of all files changed.
   - Explicitly ask the user: _"Would you like me to commit these changes?"_.
   - Await explicit user approval before running `git commit` or `git push`.

---

## 4. Database Seed Safeguards (Zero Auto-Seeding)

### CRITICAL: AI AGENTS MUST NEVER RUN SEED COMMANDS WITHOUT EXPLICIT CONFIRMATION

> **Agents MUST NOT execute `db:seed`, `prisma db seed`, or any seed-related command without explicit user confirmation.**

1. If seed data is missing or stale, **inform the user** and ask before running:
   ```bash
   pnpm --filter @vitalai/database db:seed
   ```
2. Automatic or silent execution of seed scripts during initialization or test runs is strictly prohibited.

---

## 5. Zero-Hardcoding, Enums & Shared Types Invariants

1. **Mandatory Canonical Enums from `@vitalai/shared-types`**:
   - NEVER use bare string literals (e.g. `'T1'`, `'DIABETES'`, `'CHEST'`, `'active'`, `'pending'`).
   - ALWAYS import and use canonical TypeScript enums:
     - `LifeStage` (`LifeStage.PREGNANCY_T1`, `LifeStage.POSTPARTUM`)
     - `HealthCondition` (`HealthCondition.DIABETES_T2`, `HealthCondition.HYPERURICEMIA_GOUT`)
     - `MuscleGroup` (`MuscleGroup.CHEST`, `MuscleGroup.LATS`)
     - `WorkoutSplit` (`WorkoutSplit.UPPER_LOWER`, `WorkoutSplit.PPL`)
2. **Single Source of Truth for Types**:
   - Never duplicate cross-package interfaces or contracts. All shared DTOs, query contracts, mutation inputs, and entity shapes MUST live in `@vitalai/shared-types`.
3. **No Raw String Literals for Queries & Routes**:
   - **React Query Keys**: Use `QUERY_KEYS` from `@vitalai/shared-types`. Always use `as const` tuples (`readonly (readonly unknown[])[]`). Never use raw string arrays like `["healthVault"]`.
   - **API Endpoints**: Use `API_ENDPOINTS` from `@vitalai/shared-types`.
   - **Route Paths**: Use `APP_ROUTES` and `API_ROUTES` from `@/lib/routes.ts`. Never hardcode raw URLs like `"/advisor"` or `"/advisor/${id}"`.
4. **UI Copy Dictionaries**:
   - Zero hardcoded user-facing strings in UI components. All labels, headers, button copy, and error messages MUST be imported from `@/lib/ui-copy/`.

---

## 6. Hard Line-Count Rule — Maximum 250 Lines

1. **Strict 250-Line Maximum**: NO file in `apps/web`, `apps/api`, or packages may exceed **250 lines of code**.
2. **Proactive Decomposition**: Whenever a file approaches or exceeds **200 lines**, immediately break it down:
   - **Frontend**: Extract custom form hooks, subcomponents, item renderers, and table columns.
   - **Backend**: Extract repository queries, specialized domain workflows, and pure utility functions.
   - **Constants & Parsing**: Move domain tables, maps, regexes, and formatters into dedicated `*.constants.ts` or `*.utils.ts` files.

---

## 7. Standardized Backend Logging (`.info`, `.warn`, `.error` ONLY)

1. **Strict Levels**: Use ONLY `.info`, `.warn`, and `.error` via `@yuva-devlab/logger`. NEVER use `.debug`, `.log`, `.verbose`, or `.trace`.
2. **No Redundant Class Names**:
   - `new Logger(ClassName.name)` already prepends `[ClassName]`.
   - Log payloads must NOT repeat the class name.
   - Prefix only with the method/action tag: `[methodName] message`.
