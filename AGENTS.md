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

0. **Zero Commits Without Explicit Confirmation (CRITICAL)**:
   - NEVER execute `git commit`, `git push`, or open pull requests in ANY repository unless the user explicitly commands it in the current turn (e.g. "commit these changes", "commit and push").
   - Directives like "start", "proceed", "fix this", "implement", "build", or "test" authorize implementation, building, and running tests ONLY.
   - Always leave changes staged or in the working tree, present verification results, and wait for confirmation.
1. **Organization Standards & `.github` Inheritance**:
   - Standardize all author and committer attribution to `yuva.devlab@gmail.com`.
   - Branch naming must strictly follow: `^(feat|fix|refactor|perf|chore|docs|test|ci|hotfix)/[a-z0-9-]+$`.
   - PR descriptions must adhere to the 5-section high-signal standard defined in `yuvadevlab/.github` (Summary, Changes, How to Test, Proof of Verification, Risks).
   - Commits must conform to Conventional Commits: `<type>(<optional-scope>): <imperative summary>`.
2. **Pure Platform CSS & Design Tokens**:
   - Utility-first CSS frameworks are prohibited. All styling is implemented using pure platform CSS, W3C Cascade Layers (`@layer dl-*`), and design tokens from `@yuva-devlab/tokens`.
3. **Strict Polyglot Package Boundaries & Single Source of Truth**:
   - Shared types, constants, enums, and schemas MUST live in `@vitalai/shared-types` (TypeScript) and mirror backend Pydantic v2 schemas.
   - Frontend styling and design system tokens MUST live in `@vitalai/ui` using the Muscle Monster OKLCH palette.
   - Backend logic MUST live in `apps/api` (Python FastAPI).
4. **Standardized Logging (`.info`, `.warn`, `.error` ONLY)**:
   - Use ONLY `.info`, `.warn`, and `.error` log levels across backend and frontend.
   - NEVER use `.debug`, `.log`, `.verbose`, or `.trace`.
5. **Hard 250-Line Maximum Rule**:
   - NO file across `apps/web`, `apps/api`, or `packages/` may exceed **250 lines of code**.
   - Whenever a file approaches or reaches **200 lines**, decompose it immediately into single-responsibility modules.
6. **Strict `UI_COPY` Centralization Invariant (Zero Exceptions)**:
   - ALL user-facing text (labels, headers, button text, placeholders, empty states, error messages, toast copy, and dialog descriptions) MUST be centralized in `@/lib/ui-copy/` dictionaries.
   - Direct raw hardcoded strings in JSX/TSX components are strictly prohibited.
7. **Database Seed Safeguards**:
   - **AGENTS MUST NEVER RUN SEED COMMANDS AUTOMATICALLY.**
8. **Pre-Commit Verification**:
   - Run typechecks (`pnpm typecheck` and `make typecheck`).
   - Run production build (`pnpm build`).
   - Ensure all files adhere strictly to their respective layer and line-count limits.
