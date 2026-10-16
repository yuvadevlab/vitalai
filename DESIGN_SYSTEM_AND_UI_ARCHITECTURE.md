# VitalAI — Master Design System & UI/UX Technical Dossier

> **Status: ARCHITECTURE & COMPONENT DIRECTORY COMPLETE**
> This document defines the exact visual design system, component hierarchy, package boundaries, page specifications, and API integration contracts for VitalAI.
> Any AI agent or engineer implementing UI must adhere strictly to the tokens, component boundaries, and 250-line rule defined herein.

---

## 1. Visual Language & Design Philosophy

VitalAI is an elite health and performance intelligence platform. Its visual language merges the glanceable telemetry of **Apple Health+ and Whoop** with the refined craft of **Linear** and the precision of a high-tech clinical diagnostic interface.

### 1.1 Core Design Foundations

- **Background & Surfaces**: Deep obsidian dark mode (`bg-background: #090A0F`, `bg-card: #11131F`, `bg-muted: #1A1D2E`).
- **Glassmorphism**: Subtle frosted glass for floating headers and overlay drawers (`backdrop-blur-md bg-white/[0.03] border border-white/[0.08]`).
- **Vitality Color Palettes**:
  - **Electric Cyan** (`#00F0FF`): Primary performance, active workout sets, targeted muscles.
  - **Neon Emerald** (`#10B981`): Health vitality, completed targets, safe metabolic zones.
  - **Violet / Purple** (`#8B5CF6`): Secondary muscle stabilizers, cognitive AI reasoning.
  - **Amber** (`#F59E0B`): Joint precautions, moderate severity warnings, rest timers.
  - **Coral Rose** (`#F43F5E`): Strict medical contraindications, blacklisted movements/foods.
- **Typography**: Clean geometric sans-serif (Inter / Plus Jakarta Sans) with tabular numerals (`font-mono` / `tabular-nums`) for timers, weights, and macro progress counts.

---

## 2. Package Boundaries: What Goes Where

To maintain clean monorepo architecture and maximize code reuse across DevLab products, components are split into three strict tiers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        COMPONENT TIER HIERARCHY                        │
├────────────────────────────────────────────────────────────────────────┤
│ Tier 1: Generic DevLab Primitives (@yuva-devlab/ui)                   │
│   • MultiRingGauge, AiReasoningAccordion, ActionProposalCard          │
│   • StatMetricCard, CountdownTimer, StatusPill                        │
├────────────────────────────────────────────────────────────────────────┤
│ Tier 2: Domain Vitality Primitives (@vitalai/ui)                       │
│   • MuscleHeatmap (SVG Body Map), HealthGuardrailBadge                │
│   • MesocycleTimeline, PurineRiskMeter, GlycemicTimeline               │
│   • ExerciseSetRow, AdvisorPersonaCard, AutoTriageBadge               │
├────────────────────────────────────────────────────────────────────────┤
│ Tier 3: Feature Views & Pages (apps/web)                              │
│   • DashboardView, HealthVaultView, WorkoutsView, NutritionView       │
│   • AdvisorStudioView, FloatingChatDrawer, ActiveWorkoutModal         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Tier 1: Additions to Shared Ecosystem Package (`@yuva-devlab/ui`)

These components contain **zero domain-specific health logic** and are fully reusable across DevLab products (`finai`, `orchestrai`, `vitalai`):

### 3.1 `<MultiRingGauge />`

- **Purpose**: Concentric circular progress rings for multi-metric tracking (macros in VitalAI, asset allocation in FinAI).
- **Props**:
  - `rings: Array<{ id: string; label: string; current: number; target: number; color: string; unit?: string }>`
  - `size?: number` (default: 220px)
  - `strokeWidth?: number` (default: 12px)
  - `centerContent?: React.ReactNode` (displays total calories or vitality score)
- **Visual States**: Glowing gradient stroke, smooth CSS stroke-dashoffset transition on value changes.

### 3.2 `<AiReasoningAccordion />` (ChatGPT-Style Thought Trace)

- **Purpose**: Collapsible reasoning drawer displaying the AI's internal phases, tools invoked, and execution duration before presenting final output.
- **Props**:
  - `phases: Array<{ id: string; label: string; status: 'pending' | 'active' | 'completed' | 'flagged'; details?: string; durationMs?: number }>`
  - `totalDurationMs: number`
  - `defaultExpanded?: boolean` (default: false)
  - `title?: string` (default: "AI Clinical Reasoning & Safety Check")
- **Interactions**: Animated chevron icon, expandable phase checkmarks with elapsed execution badges.

### 3.3 `<ActionProposalCard />` (Two-Phase Action Confirmation)

- **Purpose**: Embedded widget rendering a "Before vs After" proposed mutation (e.g. routine swap or calorie adjustment) requiring explicit user confirmation.
- **Props**:
  - `title: string`
  - `before: { label: string; value: string }`
  - `after: { label: string; value: string; badge?: string }`
  - `reason?: string`
  - `onAccept: () => void`
  - `onDecline: () => void`
  - `loading?: boolean`

### 3.4 `<CountdownTimer />`

- **Purpose**: Interval rest timer with visual circular sweep, play/pause, and sound/vibration alerts.
- **Props**:
  - `initialSeconds: number`
  - `onComplete?: () => void`
  - `autoStart?: boolean`

---

## 4. Tier 2: Domain UI Package (`@vitalai/ui`)

These components encapsulate **health, fitness, and biomechanical domain rules**:

### 4.1 `<MuscleHeatmap />` (Interactive Anatomy Visualizer)

- **Purpose**: Pure SVG Anterior (Front) and Posterior (Back) human body map.
- **Props**:
  - `primaryMuscles: MuscleGroup[]` (rendered in Electric Cyan `#00F0FF`)
  - `secondaryMuscles: MuscleGroup[]` (rendered in Violet `#8B5CF6`)
  - `highlightedMuscle?: MuscleGroup | null`
  - `onMuscleClick?: (muscle: MuscleGroup) => void`
  - `interactive?: boolean`
  - `size?: 'sm' | 'md' | 'lg'`

### 4.2 `<HealthGuardrailBadge />`

- **Purpose**: Pill badge displaying active health protections with a lock/shield icon.
- **Props**:
  - `condition: HealthCondition`
  - `severity: ConditionSeverity`
  - `label: string`
  - `excludedCount?: number`
  - `onClick?: () => void`

### 4.3 `<MesocycleTimeline />`

- **Purpose**: 6-week periodization timeline bar displaying current microcycle progression.
- **Props**:
  - `totalWeeks: number` (typically 6)
  - `activeWeek: number`
  - `targetRir: number`
  - `phaseName: 'Baseline' | 'Overload' | 'Peak' | 'Deload'`

### 4.4 `<PurineRiskMeter />`

- **Purpose**: Metabolic safety gauge visualizing daily purine accumulation for gout/uric acid management.
- **Props**:
  - `purineMg: number`
  - `safeThresholdMg?: number` (default: 300mg)
  - `status: 'safe' | 'caution' | 'danger'`

### 4.5 `<GlycemicTimeline />`

- **Purpose**: Visual 24-hour horizontal bar showing carbohydrate timing centered around workouts for insulin sensitivity.
- **Props**:
  - `workoutTime: string` (e.g. "17:00")
  - `meals: Array<{ time: string; carbGrams: number; glycemicLoad: 'low' | 'med' | 'high' }>`

### 4.6 `<AdvisorPersonaCard />`

- **Purpose**: Profile card in the Advisor Studio displaying an AI specialist's identity, avatar, specialty, and tone.
- **Props**:
  - `persona: AdvisorPersona`
  - `isDefault?: boolean`
  - `onSelect?: () => void`
  - `onEdit?: () => void`

### 4.7 `<AutoTriageBadge />`

- **Purpose**: Visual indicator stamped on AI responses indicating the dynamically assigned specialist.
- **Props**:
  - `personaName: string`
  - `personaTitle: string`
  - `avatar: string`
  - `reason?: string`

---

## 5. Tier 3: Feature Modules & Page Architecture (`apps/web`)

Adheres strictly to the **SSR Boundary Invariant**: all `page.tsx` and `layout.tsx` files are pure Server Components that render client feature views from `src/features/<feature>/components/`.

### 5.1 Route Directory Structure

```text
apps/web/src/app/
├── (auth)/
│   ├── login/page.tsx               # SSR wrapper -> DevLab Auth SignIn
│   └── register/page.tsx            # SSR wrapper -> DevLab Auth SignUp
├── (dashboard)/
│   ├── layout.tsx                   # SSR wrapper -> App Shell, Sidebar, Chat Drawer
│   ├── page.tsx                     # Route: / -> DashboardView
│   ├── health-vault/page.tsx        # Route: /health-vault -> HealthVaultView
│   ├── workouts/page.tsx            # Route: /workouts -> WorkoutsView
│   ├── nutrition/page.tsx           # Route: /nutrition -> NutritionView
│   └── advisors/page.tsx            # Route: /advisors -> AdvisorStudioView
```

### 5.2 Feature Module Directory Layout

Every feature under `apps/web/src/features/<feature>/` adheres to the standardized 5-folder pattern:

```text
src/features/<feature>/
├── api/                             # GraphQL queries, mutations, React Query hooks
│   ├── get<Resource>.graphql
│   ├── use<Resource>.ts
│   └── index.ts
├── components/                      # Client UI presentation components (< 250 lines)
│   ├── <Feature>View.tsx            # Main view rendered by SSR page
│   ├── <Feature>Dialog.tsx          # 2-file modal: validation & mutations
│   ├── <Feature>Form.tsx            # 2-file modal: pure presentation form
│   └── <Feature>Card.tsx
├── context/                         # Client state & feature providers
├── types/                           # Feature-specific client view types
└── utils/                           # Pure client helpers & formatters
```

---

## 6. End-to-End Screen Workflows

### 6.1 Dashboard Screen (`/`)

- **Hero Telemetry**: Renders `<MultiRingGauge />` (Calories & Macros) alongside Today's Scheduled Session card.
- **Guardrail Status Banner**: Renders active `<HealthGuardrailBadge />` components derived from the Health Vault.
- **Action CTAs**: Quick buttons triggering `<ActiveWorkoutModal />`, `<LogMealDialog />`, or opening `<FloatingChatDrawer />`.

### 6.2 Health Vault Screen (`/health-vault`)

- **Security Reassurance Header**: Encrypted local record banner.
- **Conditions Grid**: Displays orthopedic injuries and metabolic conditions with active toggle switches.
- **2-File Creation Dialog**: `<HealthMemoryDialog.tsx>` (Zod `.safeParse()` validation) + `<HealthMemoryForm.tsx>` (category select, severity pills, trigger notes).

### 6.3 Workouts Screen (`/workouts`)

- **Periodization Curve**: `<MesocycleTimeline />` highlighting the active microcycle (Week 3: Overload, 2 RIR).
- **Anatomy Map**: `<MuscleHeatmap />` highlighting today's primary movers in electric cyan and stabilizers in violet.
- **Session Schedule**: Cards for today's exercises with sets, reps, tempo, and rest intervals.
- **Swap Workout Modal**: `<SwapExerciseDialog.tsx>` allowing instant substitutions for pain or machine unavailability.
- **Active Workout HUD**: `<ActiveWorkoutModal.tsx>` overlay with set completion checkboxes and circular `<CountdownTimer />`.

### 6.4 Nutrition Screen (`/nutrition`)

- **Metabolic Meters**: Side-by-side `<PurineRiskMeter />` (Safe zone <300mg) and `<GlycemicTimeline />`.
- **Meal Schedule**: Breakfast, Lunch, Dinner, Post-Workout Fuel cards with macro badges and ingredient tags.
- **Swap Meal Modal**: AI-assisted macro-equivalent recipe substitutions.

### 6.5 Advisor Studio Screen (`/advisors`)

- **Persona Gallery**: Cards for pre-built specialists (Dr. Elena, Coach Marcus, Dr. Julian) + user custom personas.
- **Creation Workflow**: `<CreateAdvisorDialog.tsx>` + `<CreateAdvisorForm.tsx>` with avatar picker, specialty tags, and tone slider.

### 6.6 Floating AI Chat Drawer (Persistent Overlay)

- **Auto-Triage Dropdown**: Switcher defaulting to `✨ Auto-Dispatch (Smart Triage)` with manual override to any specialist.
- **Thought Trace Display**: Every AI message renders `<AiReasoningAccordion />` showing execution phases and verification logs before the clinical response.
- **Two-Phase Write Confirmation**: Proposing a routine swap renders an inline `<ActionProposalCard />` requiring explicit user approval.

---

## 7. Implementation Checklist & Phasing

- [ ] **Phase A**: Add generic primitives (`<MultiRingGauge />`, `<AiReasoningAccordion />`, `<ActionProposalCard />`, `<CountdownTimer />`) to `@yuva-devlab/ui`.
- [ ] **Phase B**: Implement domain primitives (`<MuscleHeatmap />`, `<HealthGuardrailBadge />`, `<MesocycleTimeline />`, `<PurineRiskMeter />`, `<AdvisorPersonaCard />`) in `@vitalai/ui`.
- [ ] **Phase C**: Construct the Web App Shell, App Layout, and Sidebar in `apps/web`.
- [ ] **Phase D**: Assemble the feature views (`DashboardView`, `HealthVaultView`, `WorkoutsView`, `NutritionView`, `AdvisorStudioView`).
- [ ] **Phase E**: Wire GraphQL queries, mutations, and SSE token streaming in `apps/api`.
