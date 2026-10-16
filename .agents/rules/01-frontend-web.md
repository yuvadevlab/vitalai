# VitalAI Frontend & Web Architecture Rules (`apps/web`)

> **Scope**: Applies to `apps/web` (Next.js 15 App Router Frontend).

---

## 1. Next.js App Router & SSR Boundaries

1. **Pure SSR Wrappers**: All `page.tsx` and `layout.tsx` files MUST remain Server Components (`SSR`).
   - NEVER add `"use client"` to `page.tsx` or `layout.tsx`.
   - Pages serve strictly as server wrappers: fetching initial server state, handling metadata, and rendering feature view components.
2. **Feature Placement**: Interactive logic, hooks, and browser state live under `src/features/<feature>/components/`.
3. **Line-1 Invariant**: All interactive components and custom hooks must declare `"use client";` at line 1.

---

## 2. Feature-Scoped GraphQL & TanStack Query Hook Encapsulation

1. **Zero Direct GraphQL Calls in Components**: Direct inline calls to `useQuery`, `useMutation`, or raw `fetch`/`graphql-request` inside UI presentation components are strictly forbidden.
2. **Dedicated API Modules**: All queries, mutations, query keys, and SSR prefetch helpers must live in `src/features/<feature>/api/`:
   ```text
   src/features/<feature>/api/
   ├── <resource>.graphql            # Raw GraphQL query or mutation definition
   ├── use<Resource>.ts              # Custom React Query hook wrapping codegen query
   └── index.ts
   ```
3. **Exports Required**: Each query module must export:
   - Canonical `get<Resource>QueryKey()` function.
   - Custom hook `use<Resource>()` or `use<Action>()`.
   - Optional `prefetch<Resource>()` for SSR dehydrations.

---

## 3. Two-File Modal Pattern

Every interactive creation/editing dialog follows the strict two-file pattern:
1. **`<Entity>Dialog.tsx`**: Manages modal visibility, mutation hook binding, Zod `safeParse()` validation, and toast notifications.
2. **`<Entity>Form.tsx`**: Pure presentation form using design system inputs (`<FormDialogField>`), receiving state and handlers via props.

---

## 4. Design System & Styling Tokens

1. **Semantic Tailwind Tokens**: Use semantic tokens exclusively from `@yuva-devlab/tokens`:
   - Surfaces: `bg-background`, `bg-card`, `bg-muted`
   - Borders: `border-border`, `border-input`
   - Accents: `text-primary`, `bg-primary`, `text-destructive`
2. **Icons**: Use `lucide-react` icons exclusively with standard sizing (`size={16}` or `size={20}`).

---

## 5. UI Copy & Route Catalogs

1. **Zero Hardcoded Strings**: All user-facing text must be imported from `@/lib/ui-copy/`.
2. **Zero Hardcoded Paths**: All route links must use `APP_ROUTES` from `@/lib/routes.ts`.
