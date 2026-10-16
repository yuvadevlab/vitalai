# VitalAI Core Invariants & Universal Rules

> **MANDATORY FOR ALL AI AGENTS & CODING ASSISTANTS:**
> These core rules apply to every package, language, and tool in the VitalAI monorepo. They must never be bypassed.

---

## 1. Monorepo Package Boundaries & Placement

VitalAI is organized into strict package boundaries. Never leak side-effects across package boundaries:

```text
vitalai/
├── apps/
│   ├── web/                     # Next.js 15 App Router Frontend (Port 3000)
│   └── api/                     # NestJS 11 GraphQL API & AI Engine Gateway (Port 4000)
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

## 2. Git Branching & Protection Invariants (Zero Exceptions)

1. **Direct Pushes Prohibited**: NEVER push directly to `main` or `dev`. Direct pushes to protected branches are strictly forbidden.
2. **Feature Branch Mandate**: Always create and work in a dedicated branch:
   - Features: `feat/<feature-name>`
   - Bugfixes: `fix/<issue-name>`
   - Maintenance: `chore/<task-name>`
   - Documentation: `docs/<topic-name>`
3. **Pull Request Target**: All feature and fix branches must target `dev` via Pull Request.
4. **Promotion to Main**: `main` is strictly updated via Pull Request originating from `dev` (enforced by `validate-main-pr.yml`).
5. **Reverse Synchronization**: Any merge into `main` automatically triggers `reverse-sync.yml` to create an automated synchronization PR back into `dev`.

---

## 3. Hard Line-Count Rule — Maximum 250 Lines

1. **Strict 250-Line Maximum**: NO file in `apps/web`, `apps/api`, or packages may exceed **250 lines of code**.
2. **Proactive Decomposition**: Whenever a file approaches or exceeds **200 lines**, immediately break it down:
   - **Frontend**: Extract custom form hooks, subcomponents, item renderers, and table columns.
   - **Backend**: Extract repository queries, specialized domain workflows, and pure utility functions.
   - **Constants & Parsing**: Move domain tables, maps, regexes, and formatters into dedicated `*.constants.ts` or `*.utils.ts` files.

---

## 4. Zero-Hardcoding & Centralized Contract Catalogs

1. **No Raw String/Number Literals**:
   - **Route Paths**: Use `APP_ROUTES` and `API_ROUTES` from `@/lib/routes.ts`.
   - **API Endpoints**: Use `API_ENDPOINTS` from `@vitalai/shared-types`.
   - **React Query Keys**: Use `QUERY_KEYS` from `@vitalai/shared-types`. Always use `as const` tuples.
   - **UI Copy Dictionaries**: Use `UI_COPY` from `@/lib/ui-copy/`. Zero hardcoded user-facing strings in UI components.
   - **Enums**: Use canonical enums from `@vitalai/shared-types`.

---

## 5. Standardized Backend Logging (`.info`, `.warn`, `.error` ONLY)

1. **Strict Levels**: Use ONLY `.info`, `.warn`, and `.error` via `@yuva-devlab/logger`. NEVER use `.debug`, `.log`, `.verbose`, or `.trace`.
2. **No Redundant Class Names**:
   - `new Logger(ClassName.name)` already prepends `[ClassName]`.
   - Log payloads must NOT repeat the class name.
   - Prefix only with the method/action tag: `[methodName] message`.

---

## 6. Database & Seed Management Safeguards

### CRITICAL: AI AGENTS MUST NEVER RUN SEED COMMANDS AUTOMATICALLY

> **Agents MUST NOT execute `db:seed`, `prisma db seed`, or any seed-related command without explicit user instruction.**

1. If seed data is missing or stale, **inform the user** and provide the command for them to run manually:
   ```bash
   pnpm --filter @vitalai/database db:seed
   ```
