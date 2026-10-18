# VitalAI Monorepo — AI Agent Guidelines & Architecture Index

> **FOR ALL AI ASSISTANTS (Antigravity, GitHub Copilot, Claude Code):**  
> VitalAI uses a modular rules architecture. Master invariants are listed below, and domain-specific rulebooks are imported from `.agents/rules/`.

---

## 1. Modular Rulebook Index

All AI agents must inspect and adhere to the relevant topic rulebooks:

| Topic                         | Rulebook                                                                     | Primary Scope                                        |
| :---------------------------- | :--------------------------------------------------------------------------- | :--------------------------------------------------- |
| **Universal Core Invariants** | [`00-core-invariants.md`](file:///.agents/rules/00-core-invariants.md)       | Monorepo boundaries, 250-line rule, seed safeguards  |
| **Frontend Web & UI**         | [`01-frontend-web.md`](file:///.agents/rules/01-frontend-web.md)             | Muscle Monster design tokens, Framer Motion, Zustand |
| **Python Backend API**        | [`02-backend-python-api.md`](file:///.agents/rules/02-backend-python-api.md) | FastAPI, Pydantic v2, SQLModel (asyncpg), LiteLLM    |
| **AI Advisor & Agent Loop**   | [`03-ai-advisor.md`](file:///.agents/rules/03-ai-advisor.md)                 | Instructor schemas, ReAct loop, SSE streaming        |
| **Testing Standards**         | [`04-testing-standards.md`](file:///.agents/rules/04-testing-standards.md)   | Pytest, Vitest, mock contracts, zero side-effects    |

---

## 2. Universal Monorepo Invariants (Zero Exceptions)

1. **Strict Polyglot Package Boundaries & Single Source of Truth**:
   - Shared types, constants, enums, and schemas MUST live in `@vitalai/shared-types` (TypeScript) and mirror backend Pydantic v2 schemas.
   - Frontend styling and design system tokens MUST live in `@vitalai/ui` using the Muscle Monster OKLCH palette.
   - Backend logic MUST live in `apps/api` (Python FastAPI).
2. **Standardized Logging (`.info`, `.warn`, `.error` ONLY)**:
   - Use ONLY `.info`, `.warn`, and `.error` log levels across backend and frontend.
   - NEVER use `.debug`, `.log`, `.verbose`, or `.trace`.
3. **Hard 250-Line Maximum Rule**:
   - NO file across `apps/web`, `apps/api`, or `packages/` may exceed **250 lines of code**.
   - Whenever a file approaches or reaches **200 lines**, decompose it immediately into single-responsibility modules.
4. **Database Seed Safeguards**:
   - **AGENTS MUST NEVER RUN SEED COMMANDS AUTOMATICALLY.**
5. **Pre-Commit Verification**:
   - Run typechecks (`pnpm typecheck` and `make typecheck`).
   - Run production build (`pnpm build`).
   - Ensure all files adhere strictly to their respective layer and line-count limits.
