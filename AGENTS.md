# VitalAI Monorepo — AI Agent Guidelines & Architecture Index

> **FOR ALL AI ASSISTANTS (Antigravity, GitHub Copilot, Claude Code):**
> This repository uses a modular rules architecture. Master invariants are listed below, and domain-specific rulebooks are imported from `.agents/rules/`.

---

## 1. Modular Rulebook Index

All AI agents must inspect and adhere to the relevant topic rulebooks:

| Topic                         | Rulebook                                                   | Primary Scope                                                      |
| :---------------------------- | :--------------------------------------------------------- | :----------------------------------------------------------------- |
| **Universal Core Invariants** | [`00-core-invariants.md`](.agents/rules/00-core-invariants.md)   | Monorepo boundaries, 250-line rule, branch protection, seed safeguards |
| **Frontend & Web**            | [`01-frontend-web.md`](.agents/rules/01-frontend-web.md)         | GraphQL client, React Query v5, Tailwind tokens, `@vitalai/ui`     |
| **Backend API (GraphQL)**     | [`02-backend-api.md`](.agents/rules/02-backend-api.md)           | 5-layer NestJS, Code-First GraphQL, DataLoaders, SSE Streaming     |
| **AI Advisor & Health Engine**| [`03-ai-advisor.md`](.agents/rules/03-ai-advisor.md)             | `@vitalai/ai-engine`, clinical personas, safety guardrails        |
| **Testing Standards**         | [`04-testing-standards.md`](.agents/rules/04-testing-standards.md) | Vitest, mock contracts, zero test side-effects                     |

---

## 2. Universal Monorepo Invariants (Zero Exceptions)

1. **Strict Package Boundaries & Single Source of Truth**:
   - Shared types, constants, enums, `QUERY_KEYS`, `API_ENDPOINTS`, and `APP_ROUTES` MUST live in `@vitalai/shared-types`. Never duplicate cross-package contracts or inline raw string query keys.
   - Application route paths (`APP_ROUTES`, `API_ROUTES`) MUST live in `@/lib/routes.ts`. Never hardcode raw URLs.
   - User-facing text in the web app MUST live in `@/lib/ui-copy/` dictionaries. Zero hardcoded UI copy strings.
   - Exercise science, volume landmarks, TDEE, macronutrient math, and clinical nutrition thresholds MUST live in `@vitalai/vital-engine` as pure functions with zero DB, HTTP, or side-effects.
   - LLM prompts, clinical personas, and templates MUST live in `@vitalai/ai-engine`.
   - Zod validation schemas MUST live in `@vitalai/validation`. Never create inline Zod schemas in web or API.
2. **Git Branching & Branch Protection Protocol**:
   - **ALWAYS CREATE BRANCHES FROM `dev` (`git checkout -b <branch> dev`).**
   - **NEVER CHECKOUT TO `main` LOCALLY.** Agents and developers must leave `main` untouched.
   - **DIRECT PUSHES TO `main` AND `dev` ARE STRICTLY PROHIBITED.**
   - All AI agents and developers must work exclusively in dedicated `feat/<name>`, `fix/<name>`, or `chore/<name>` branches.
   - All pull requests must target `dev`. Direct PRs to `main` are automatically rejected by CI unless originating from `dev`.
   - Reverse sync from `main` to `dev` is automated via `reverse-sync.yml`.
3. **Advanced GraphQL Architecture**:
   - Use Code-First GraphQL (`@nestjs/graphql`) with strongly typed ObjectTypes, InputTypes, and Args.
   - Prevent N+1 query cascades using DataLoader patterns on nested entity resolvers.
   - Real-time token streaming from AI models uses a dedicated Server-Sent Events (SSE) gateway endpoint for low-latency delivery.
4. **Standardized Backend Logging (`.info`, `.warn`, `.error` ONLY)**:
   - Use ONLY `.info`, `.warn`, and `.error` log levels across `apps/api` and packages via `@yuva-devlab/logger`.
   - NEVER use `.debug`, `.log`, `.verbose`, or `.trace`.
   - `new Logger(ClassName.name)` already prepends `[ClassName]`. Do NOT repeat the class name in the message payload. Prefix with the method/action tag only: `[methodName] message`.
5. **Hard 250-Line Maximum Rule**:
   - NO file across `apps/web`, `apps/api`, or `packages/*` may exceed **250 lines of code**.
   - Whenever a file approaches or reaches **200 lines**, decompose it immediately.
6. **Database Seed Safeguards**:
   - **AGENTS MUST NEVER RUN SEED COMMANDS AUTOMATICALLY.**
   - If seed data is missing, instruct the user to run `pnpm --filter @vitalai/database db:seed` manually.
7. **Pre-Commit Verification**:
   - Run typechecks (`pnpm --filter @vitalai/api typecheck` and `pnpm --filter @vitalai/web typecheck`).
   - Run production build (`pnpm build` / `turbo build`).
   - Ensure all files adhere strictly to their respective layer and line-count limits.
8. **Next.js Page & Layout Invariant (Pure SSR Wrappers)**:
   - All `page.tsx` and `layout.tsx` files across Next.js apps MUST remain Server Components (`SSR`).
   - NEVER mark `page.tsx` or `layout.tsx` with `"use client"`.
   - Pages and layouts act strictly as server wrappers (handling metadata, SSR prefetching, server fetching, and rendering client view components).
   - All interactive client logic, state, and browser APIs must reside in dedicated client components under `src/features/<feature>/components/`.
