# VitalAI Testing Standards & Quality Assurance

> **Scope**: Applies to all packages and applications across the monorepo.

---

## 1. Testing Frameworks & Tooling

- **Unit & Integration Testing**: Vitest (`pnpm test` / `turbo test`).
- **End-to-End Testing**: Playwright (`pnpm --filter @vitalai/web test:e2e`).
- **Assertion Libraries**: Vitest native assertions (`expect`) with `@testing-library/react` for UI components.

---

## 2. Package-Specific Testing Mandates

1. **`@vitalai/vital-engine` (100% Deterministic Coverage)**:
   - Every formula (Mifflin-St Jeor, Katch-McArdle, volume landmark calculations, purine score calculations, trimester nutrient additions) MUST have comprehensive unit tests with boundary condition edge cases.
   - Tests must verify zero floating-point drift and correct rounding.
2. **`@vitalai/ai-engine` (Prompt & Safety Invariant Tests)**:
   - Verify that all prompt builders produce valid system prompts without undefined variables.
   - Test that clinical safety guardrails throw or flag contraindications when an unsafe exercise/food is tested against an active condition.
3. **`apps/api` (Resolver & DataLoader Unit Tests)**:
   - Mock Prisma repositories using Vitest mock objects (`vi.fn()`).
   - Verify that DataLoaders batch database calls correctly into single SQL queries.
   - Test that unauthenticated GraphQL queries are rejected by `GqlAuthGuard`.

---

## 3. Zero Test Side-Effects

1. **Isolated Environments**: Tests must never connect to live production or remote services.
2. **Mocking External APIs**: The Ollama HTTP connector must be mocked in all CI test suites to ensure deterministic, fast test runs without requiring local model execution in GitHub Actions.
