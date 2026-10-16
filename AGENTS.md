# VitalAI Monorepo — AI Agent Guidelines & Architecture Index

> **FOR ALL AI ASSISTANTS (Antigravity, GitHub Copilot, Claude Code):**
> This repository uses a modular rules architecture. Master invariants are listed below, and domain-specific rulebooks are imported from `.agents/rules/`.
>
> 📋 **MASTER IMPLEMENTATION PLAN & PROGRESS TRACKER**:
> Before starting any task, read [**`IMPLEMENTATION_PLAN.md`**](IMPLEMENTATION_PLAN.md) to know the current phase, completed tasks, and next immediate implementation steps.

---

## 1. Modular Rulebook Index

All AI agents must inspect and adhere to the relevant topic rulebooks:

| Topic                          | Rulebook                                                           | Primary Scope                                                                   |
| :----------------------------- | :----------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **Universal Core Invariants**  | [`00-core-invariants.md`](.agents/rules/00-core-invariants.md)     | Monorepo boundaries, 250-line rule, branch protection, seed & string invariants |
| **Frontend & Web**             | [`01-frontend-web.md`](.agents/rules/01-frontend-web.md)           | GraphQL client, React Query v5, Tailwind tokens, `@vitalai/ui`                  |
| **Backend API (GraphQL)**      | [`02-backend-api.md`](.agents/rules/02-backend-api.md)             | 5-layer NestJS, Code-First GraphQL, DataLoaders, SSE Streaming                  |
| **AI Advisor & Health Engine** | [`03-ai-advisor.md`](.agents/rules/03-ai-advisor.md)               | `@vitalai/ai-engine`, clinical personas, safety guardrails                      |
| **Testing Standards**          | [`04-testing-standards.md`](.agents/rules/04-testing-standards.md) | Vitest, mock contracts, zero test side-effects                                  |

---

## 2. Universal Monorepo Invariants (Zero Exceptions)

1. **Strict Package Boundaries & Single Source of Truth**:
   - Shared types, constants, enums, `QUERY_KEYS`, `API_ENDPOINTS`, and `APP_ROUTES` MUST live in `@vitalai/shared-types`. Never duplicate cross-package contracts.
   - Application route paths (`APP_ROUTES`, `API_ROUTES`) MUST live in `@/lib/routes.ts`. Never hardcode raw URLs.
   - Exercise science, volume landmarks, TDEE, macronutrient math, and clinical nutrition thresholds MUST live in `@vitalai/vital-engine` as pure functions with zero DB, HTTP, or side-effects.
   - LLM prompts, clinical personas, and templates MUST live in `@vitalai/ai-engine`.
   - Zod validation schemas MUST live in `@vitalai/validation`. Never create inline Zod schemas in web or API.
2. **Zero-Hardcoding, Enums & Shared Types Invariant**:
   - **ZERO BARE STRING LITERALS**: Never use raw strings for domain states (e.g. `'T1'`, `'DIABETES'`, `'CHEST'`). Always import canonical TypeScript enums from `@vitalai/shared-types` (`LifeStage`, `HealthCondition`, `MuscleGroup`, `WorkoutSplit`).
   - **ZERO RAW QUERY KEYS**: React Query keys must use canonical tuple factories from `QUERY_KEYS` in `@vitalai/shared-types`.
   - **ZERO RAW UI STRINGS**: User-facing text in the web app MUST live in `@/lib/ui-copy/` dictionaries.
3. **Database Seed Safeguards (Zero Auto-Seeding)**:
   - **AGENTS MUST NEVER RUN SEED COMMANDS WITHOUT EXPLICIT USER CONFIRMATION.**
   - Never run `db:seed`, `prisma db seed`, or automatic migrations containing seed data without asking the user first.
4. **Git Branching & Branch Protection Protocol**:
   - **ALWAYS CREATE BRANCHES FROM `dev` (`git checkout -b <branch> dev`).**
   - **NEVER CHECKOUT TO `main` LOCALLY.** Agents and developers must leave `main` untouched.
   - **DIRECT PUSHES TO `main` AND `dev` ARE STRICTLY PROHIBITED.**
   - All AI agents and developers must work exclusively in dedicated `feat/<name>`, `fix/<name>`, or `chore/<name>` branches.
   - All pull requests must target `dev`. Direct PRs to `main` are automatically rejected by CI unless originating from `dev`.
   - Reverse sync from `main` to `dev` is automated via `reverse-sync.yml`.
5. **No Auto-Commit / Auto-Push Protocol (Mandatory User Approval)**:
   - **AGENTS MUST NEVER RUN `git commit` OR `git push` WITHOUT EXPLICIT USER CONSENT.**
   - When an implementation is complete, the agent must STOP, provide a concise summary of the changes, and explicitly ask: _"Would you like me to commit these changes?"_.
   - Only execute commit and push commands after the user grants explicit permission.
6. **Advanced GraphQL Architecture**:
   - Use Code-First GraphQL (`@nestjs/graphql`) with strongly typed ObjectTypes, InputTypes, and Args.
   - Prevent N+1 query cascades using DataLoader patterns on nested entity resolvers.
   - Real-time token streaming from AI models uses a dedicated Server-Sent Events (SSE) gateway endpoint for low-latency delivery.
7. **Standardized Backend Logging (`.info`, `.warn`, `.error` ONLY)**:
   - Use ONLY `.info`, `.warn`, and `.error` log levels across `apps/api` and packages via `@yuva-devlab/logger`.
   - NEVER use `.debug`, `.log`, `.verbose`, or `.trace`.
   - `new Logger(ClassName.name)` already prepends `[ClassName]`. Do NOT repeat the class name in the message payload. Prefix with the method/action tag only: `[methodName] message`.
8. **Hard 250-Line Maximum Rule**:
   - NO file across `apps/web`, `apps/api`, or `packages/*` may exceed **250 lines of code**.
   - Whenever a file approaches or reaches **200 lines**, decompose it immediately.
9. **Pre-Commit Verification**:
   - Run typechecks (`pnpm --filter @vitalai/api typecheck` and `pnpm --filter @vitalai/web typecheck`).
   - Run production build (`pnpm build` / `turbo build`).
   - Ensure all files adhere strictly to their respective layer and line-count limits.
10. **Next.js Page & Layout Invariant (Pure SSR Wrappers)**:
    - All `page.tsx` and `layout.tsx` files across Next.js apps MUST remain Server Components (`SSR`).
    - NEVER mark `page.tsx` or `layout.tsx` with `"use client"`.
    - Pages and layouts act strictly as server wrappers (handling metadata, SSR prefetching, server fetching, and rendering client view components).
    - All interactive client logic, state, and browser APIs must reside in dedicated client components under `src/features/<feature>/components/`.
