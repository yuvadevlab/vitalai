import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import path from "node:path";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const rootDir = import.meta.dirname;

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/dist/**",
      "**/coverage/**",
      "**/build/**",
      "**/.output/**",
      "**/.vinxi/**",
      "**/.vercel/**",
      "**/out/**",
      "**/tsup.config.bundled*",
      "**/next-env.d.ts",
      "**/.storybook/**",
      "**/storybook-static/**",
      "**/__generated__/**",
      "**/schema.gql",
      "**/tsup.config.*",
      "**/vite.config.*",
      "**/vitest.config.*",
      "**/next.config.*",
      "**/postcss.config.*",
      "**/commitlint.config.*",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: rootDir,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "@typescript-eslint/no-deprecated": "warn",
      ...reactHooks.configs.recommended.rules,
      "no-console": "warn",
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "max-lines": [
        "error",
        {
          max: 250,
          skipComments: true,
          skipBlankLines: true,
        },
      ],
      "max-len": [
        "warn",
        {
          code: 100,
          tabWidth: 2,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
    },
  },
  {
    files: [
      "**/app/**/page.tsx",
      "**/app/**/layout.tsx",
      "**/app/**/loading.tsx",
      "**/app/**/error.tsx",
      "**/app/**/not-found.tsx",
    ],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  eslintPluginPrettier,
);
