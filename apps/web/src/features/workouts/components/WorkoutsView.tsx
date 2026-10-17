"use client";

import React, { useState } from "react";
import { RefreshCw, Play, Info } from "lucide-react";
import { MesocycleTimeline, MuscleHeatmap, ActiveWorkoutHUD } from "@vitalai/ui";
import { useWorkouts, PrescribedExercise } from "../api";
import { SwapExerciseDialog } from "./SwapExerciseDialog";
import { WORKOUTS_COPY } from "@/lib/ui-copy";

export const WorkoutsView: React.FC = () => {
  const { data: session } = useWorkouts();
  const [selectedExerciseForSwap, setSelectedExerciseForSwap] = useState<PrescribedExercise | null>(
    null,
  );
  const [isHudActive, setIsHudActive] = useState(false);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);

  if (!session) return null;

  const currentExercise = session.exercises[activeExerciseIndex] || session.exercises[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-foreground font-display text-2xl font-bold tracking-tight">
            {WORKOUTS_COPY.title}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {WORKOUTS_COPY.subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsHudActive(!isHudActive)}
          className="bg-primary text-primary-foreground inline-flex items-center gap-2 self-start rounded-xl px-4 py-2 text-xs font-semibold shadow-md transition-all hover:brightness-110 sm:self-auto"
        >
          <Play className="size-3.5 fill-current" />
          <span>{isHudActive ? "Exit Workout HUD" : WORKOUTS_COPY.startSession}</span>
        </button>
      </div>

      {/* Mesocycle Periodization Stepper */}
      <MesocycleTimeline currentWeek={session.currentWeek} mesocycleName={session.name} />

      {/* Anatomical Heatmap & Prescribed Exercise Cards Split */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Anatomical Heatmap */}
        <div className="lg:col-span-5">
          <MuscleHeatmap
            primaryMuscles={currentExercise.primaryMuscles}
            secondaryMuscles={currentExercise.secondaryMuscles}
          />
        </div>

        {/* Prescribed Exercise Stack */}
        <div className="space-y-3.5 lg:col-span-7">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground font-display text-sm font-bold tracking-tight">
              {WORKOUTS_COPY.sessionHeader}
            </h3>
            <span className="text-muted-foreground font-mono text-xs">
              {session.exercises.length} Movements Prescribed
            </span>
          </div>

          {session.exercises.map((ex, index) => {
            const isSelected = activeExerciseIndex === index;

            return (
              <div
                key={ex.id}
                onClick={() => setActiveExerciseIndex(index)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                  isSelected
                    ? "bg-card border-primary/50 ring-primary/30 shadow-md ring-1"
                    : "bg-card/60 border-border/40 hover:border-border backdrop-blur-md"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-surface-2 text-muted-foreground flex size-6 items-center justify-center rounded-lg font-mono text-xs font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-foreground text-sm font-bold">{ex.name}</h4>
                      <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                        {ex.targetSets} sets × {ex.targetReps} reps • @ {ex.targetRir} RIR • Tempo{" "}
                        {ex.tempo}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedExerciseForSwap(ex);
                    }}
                    className="bg-surface-2 hover:bg-surface text-muted-foreground hover:text-foreground border-border/30 flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
                  >
                    <RefreshCw className="text-primary size-3" />
                    <span className="hidden sm:inline">Swap</span>
                  </button>
                </div>

                {ex.notes && (
                  <div className="border-border/20 text-muted-foreground mt-2.5 flex items-center gap-1.5 border-t pt-2 text-[11px]">
                    <Info className="size-3 shrink-0 text-cyan-400" />
                    <span>{ex.notes}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-File Exercise Swap Modal */}
      {selectedExerciseForSwap && (
        <SwapExerciseDialog
          isOpen={true}
          currentExerciseName={selectedExerciseForSwap.name}
          onClose={() => setSelectedExerciseForSwap(null)}
          onConfirmSwap={(sub, rsn) => {
            alert(`Swapped ${selectedExerciseForSwap.name} with ${sub}: ${rsn}`);
            setSelectedExerciseForSwap(null);
          }}
        />
      )}

      {/* Floating Active Workout HUD */}
      {isHudActive && (
        <ActiveWorkoutHUD
          exerciseName={currentExercise.name}
          currentSet={1}
          totalSets={currentExercise.targetSets}
          targetWeightKg={currentExercise.targetWeightKg}
          targetReps={8}
          targetRir={currentExercise.targetRir}
          restSeconds={currentExercise.restSeconds}
          onLogSet={(setNum, wt, rps) => alert(`Logged set ${setNum}: ${wt}kg x ${rps} reps`)}
          onFinishWorkout={() => setIsHudActive(false)}
        />
      )}
    </div>
  );
};
