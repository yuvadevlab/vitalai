# VitalAI Backend API Architecture Rules (`apps/api`)

> **Scope**: Applies to `apps/api` (NestJS 11 GraphQL API Gateway & AI Engine).

---

## 1. 5-Layer Module Architecture with Advanced GraphQL

Every feature module under `apps/api/src/modules/<feature>/` must follow the standardized layout:

```text
apps/api/src/modules/<feature>/
├── <feature>.resolver.ts       # 1. RESOLVER: GraphQL Queries, Mutations, FieldResolvers
├── <feature>.controller.ts     # 1b. CONTROLLER: SSE endpoints for streaming AI tokens
├── <feature>.module.ts         # NestJS Module: Dependency injection wiring
├── dto/                        # 2. DTOs: @ObjectType, @InputType, @ArgsType definitions
│   ├── index.ts
│   ├── <entity>.type.ts
│   └── <entity>.input.ts
├── loaders/                    # 3. LOADERS: DataLoader batch functions preventing N+1 queries
│   ├── index.ts
│   └── <entity>.loader.ts
├── repositories/               # 4. REPOSITORIES: Direct Prisma queries, ownership scoping
│   ├── index.ts
│   └── <feature>.repository.ts
├── services/                   # 5. SERVICES: Domain workflows, atomic business mutations
│   ├── index.ts
│   └── <use-case>.service.ts
└── utils/                      # 6. UTILS: Pure transformations, delegating to @vitalai/vital-engine
    ├── index.ts
    └── <feature>.utils.ts
```

### Layer Responsibilities & Rules

| Layer | Allowed | Forbidden |
| :--- | :--- | :--- |
| **1. Resolvers** (`*.resolver.ts`) | `@Query()`, `@Mutation()`, `@ResolveField()`, `@UseGuards(GqlAuthGuard)` | Direct Prisma queries, business calculations |
| **2. DTOs** (`dto/`) | NestJS GraphQL decorators, re-exporting Zod types (`@vitalai/validation`) | Database queries, runtime business logic |
| **3. Loaders** (`loaders/`) | Batch fetching entities by ID arrays via DataLoader | Business logic, direct controller handling |
| **4. Repositories** (`repositories/`) | Prisma client queries, ordering, relations, cursor pagination | HTTP/GraphQL context, LLM API calls |
| **5. Services** (`services/`) | Co-ordinating repositories, business checks, atomic workflows | Raw SQL queries, presentation formatting |
| **6. Utils** (`utils/`) | Pure formulas, formatters (zero DB/IO) | Database access, HTTP calls |

---

## 2. Advanced GraphQL Invariants

1. **Mandatory DataLoader Usage**:
   - Any `@ResolveField()` method that fetches related records (e.g. resolving `exercises` on a `WorkoutSession` or `memories` on a `User`) MUST use a scoped DataLoader. Direct database calls in field resolvers are strictly forbidden.
2. **Cursor-Based Pagination**:
   - High-volume collections (workout history, chat messages, body weight logs) must implement Relay-style cursor pagination (`edges`, `node`, `pageInfo: { hasNextPage, endCursor }`).
3. **Structured GraphQL Error Extensions**:
   - Exceptions must throw `GraphQLError` with structured `extensions.code` (e.g. `HEALTH_CONTRAINDICATION_VIOLATION`, `UNAUTHORIZED_RESOURCE`, `INVALID_MACRO_TARGET`).
4. **Execution Context Conversion**:
   - All guards and decorators must use `GqlExecutionContext.create(context)` to retrieve GraphQL request metadata and authenticated user state.

---

## 3. Streaming AI Token Gateway (SSE)

1. **SSE for Real-Time LLM Tokens**: While GraphQL handles all structured data queries and mutations, real-time token streaming from Ollama models is handled via a dedicated Server-Sent Events controller (`/api/ai/chat/stream`).
2. **Stream Contract**: Transmits SSE events with typed chunks: `event: token`, `event: tool_call`, `event: done`.

---

## 4. Security & Ownership Scoping

1. **Mandatory Guard**: Every resolver query/mutation must be protected by `@UseGuards(GqlAuthGuard)` unless explicitly marked with `@Public()`.
2. **Ownership Scoping**: All Prisma repository queries MUST filter by `userId`. Never perform unscoped queries that could leak medical records or personal health memories.
