import type { UserConfig } from "@commitlint/types";

/**
 * Commitlint Configuration — Yuva DevLab - VitalAI
 *
 * Enforces the Conventional Commits specification:
 * https://www.conventionalcommits.org
 *
 * Format:
 *   <type>(<scope>): <subject>
 *
 * Examples:
 *   feat(vital-engine): add trimester micronutrient calculations
 *   feat(api): implement code-first graphql resolvers for health vault
 *   feat(ui): add interactive muscle highlighter component
 *   fix(api): resolve dataloader n+1 query issue for workout sets
 *   refactor(database): update prisma schema for medical conditions
 *   docs(workspace): update graphql schema specifications
 */

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    // ─── Type ────────────────────────────────────────────────────────────────
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "perf",
        "refactor",
        "style",
        "test",
        "docs",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],

    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],

    // ─── Scope ────────────────────────────────────────────────────────────────
    "scope-empty": [2, "never"],
    "scope-case": [2, "always", "kebab-case"],

    "scope-enum": [
      1,
      "always",
      [
        // Applications
        "web",
        "api",
        "docs",
        "workspace",

        // Packages
        "ai-engine",
        "database",
        "vital-engine",
        "logger",
        "shared-types",
        "ui",
        "validation",
        "constants",

        // Tooling
        "eslint",
        "prettier",
        "husky",
        "commitlint",
        "graphql",
        "codegen",
        "storybook",
        "tsconfig",

        // Dependencies
        "deps",

        // Infra
        "infra",
        "docker",
        "nginx",
      ],
    ],

    // ─── Subject ────────────────────────────────────────────────────────────────
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "subject-min-length": [2, "always", 8],
    "subject-max-length": [2, "always", 100],

    // ─── Header ────────────────────────────────────────────────────────────────
    "header-max-length": [2, "always", 100],

    // ─── Body ────────────────────────────────────────────────────────────────
    "body-leading-blank": [2, "always"],
    "body-max-line-length": [2, "always", 100],

    // ─── Footer ────────────────────────────────────────────────────────────────
    "footer-leading-blank": [2, "always"],
    "footer-max-line-length": [2, "always", 100],
  },
};

export default config;
