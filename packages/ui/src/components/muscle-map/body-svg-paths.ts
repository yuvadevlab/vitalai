/**
 * @file packages/ui/src/components/muscle-map/body-svg-paths.ts
 * @description SVG path definitions for Anterior and Posterior human anatomy visualizer.
 */

export interface MusclePath {
  readonly id: string;
  readonly name: string;
  readonly path: string;
  readonly view: "anterior" | "posterior";
}

export const ANTERIOR_MUSCLES: MusclePath[] = [
  {
    id: "chest",
    name: "Pectorals",
    view: "anterior",
    path: "M 40 45 Q 50 42 60 45 Q 70 42 80 45 Q 85 58 60 62 Q 35 58 40 45 Z",
  },
  {
    id: "shoulders",
    name: "Deltoids",
    view: "anterior",
    path: "M 32 40 Q 40 38 43 45 Q 38 58 28 55 Q 26 46 32 40 Z M 88 40 Q 80 38 77 45 Q 82 58 92 55 Q 94 46 88 40 Z",
  },
  {
    id: "biceps",
    name: "Biceps",
    view: "anterior",
    path: "M 26 58 Q 32 58 30 74 Q 24 74 24 62 Z M 94 58 Q 88 58 90 74 Q 96 74 96 62 Z",
  },
  {
    id: "forearms",
    name: "Forearms",
    view: "anterior",
    path: "M 23 76 Q 29 76 26 96 Q 20 96 21 80 Z M 97 76 Q 91 76 94 96 Q 100 96 99 80 Z",
  },
  {
    id: "abdominals",
    name: "Core / Abs",
    view: "anterior",
    path: "M 48 65 Q 60 64 72 65 Q 70 95 60 97 Q 50 95 48 65 Z",
  },
  {
    id: "quadriceps",
    name: "Quadriceps",
    view: "anterior",
    path: "M 44 100 Q 58 100 58 140 Q 48 142 42 120 Z M 76 100 Q 62 100 62 140 Q 72 142 78 120 Z",
  },
  {
    id: "calves",
    name: "Calves (Anterior)",
    view: "anterior",
    path: "M 43 148 Q 53 148 51 185 Q 43 185 41 160 Z M 77 148 Q 67 148 69 185 Q 77 185 79 160 Z",
  },
];

export const POSTERIOR_MUSCLES: MusclePath[] = [
  {
    id: "traps",
    name: "Trapezius",
    view: "posterior",
    path: "M 46 35 Q 60 40 74 35 Q 68 52 60 55 Q 52 52 46 35 Z",
  },
  {
    id: "lats",
    name: "Latissimus Dorsi",
    view: "posterior",
    path: "M 40 50 Q 60 58 80 50 Q 74 80 60 84 Q 46 80 40 50 Z",
  },
  {
    id: "triceps",
    name: "Triceps",
    view: "posterior",
    path: "M 27 54 Q 33 54 31 72 Q 25 72 25 58 Z M 93 54 Q 87 54 89 72 Q 95 72 95 58 Z",
  },
  {
    id: "lower_back",
    name: "Lower Back",
    view: "posterior",
    path: "M 48 84 Q 60 86 72 84 Q 68 98 60 100 Q 52 98 48 84 Z",
  },
  {
    id: "glutes",
    name: "Gluteals",
    view: "posterior",
    path: "M 44 100 Q 60 102 76 100 Q 76 118 60 120 Q 44 118 44 100 Z",
  },
  {
    id: "hamstrings",
    name: "Hamstrings",
    view: "posterior",
    path: "M 43 122 Q 58 122 56 150 Q 44 150 42 130 Z M 77 122 Q 62 122 64 150 Q 76 150 78 130 Z",
  },
  {
    id: "calves",
    name: "Calves (Posterior)",
    view: "posterior",
    path: "M 43 154 Q 54 154 52 188 Q 42 188 41 165 Z M 77 154 Q 66 154 68 188 Q 78 188 79 165 Z",
  },
];
