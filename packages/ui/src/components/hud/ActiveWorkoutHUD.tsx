"use client";

import React, { useState } from "react";
import { Dumbbell, Timer as TimerIcon, ChevronUp, ChevronDown, Check } from "lucide-react";
import { CountdownTimer } from "../timer/CountdownTimer";

export interface ActiveWorkoutHUDProps {
  readonly exerciseName: string;
  readonly currentSet: number;
  readonly totalSets: number;
  readonly targetWeightKg: number;
  readonly targetReps: number;
  readonly targetRir: number;
  readonly restSeconds?: number;
  readonly onLogSet: (setNumber: number, weightKg: number, reps: number) => void;
  readonly onFinishWorkout: () => void;
  readonly className?: string;
}

export const ActiveWorkoutHUD: React.FC<ActiveWorkoutHUDProps> = ({
  exerciseName,
  currentSet,
  totalSets,
  targetWeightKg,
  targetReps,
  targetRir,
  restSeconds = 90,
  onLogSet,
  onFinishWorkout,
  className = "",
}) => {
  const [showTimer, setShowTimer] = useState(false);
  const [weight, setWeight] = useState(targetWeightKg);
  const [reps, setReps] = useState(targetReps);

  const handleLog = () => {
    onLogSet(currentSet, weight, reps);
    setShowTimer(true);
  };

  return (
    <div
      className={`fixed bottom-5 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 px-4 ${className}`}
    >
      <div className="bg-card/90 border-primary/30 space-y-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary/20 text-primary rounded-xl p-2">
              <Dumbbell className="size-4" />
            </div>
            <div>
              <h4 className="text-foreground text-sm font-bold tracking-tight">{exerciseName}</h4>
              <p className="text-muted-foreground font-mono text-xs">
                Set {currentSet} of {totalSets} • Target: {targetReps} reps @ {targetRir} RIR
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowTimer(!showTimer)}
            className="bg-surface-2 text-muted-foreground hover:text-foreground border-border/30 flex items-center gap-1.5 rounded-xl border px-3 py-1 font-mono text-xs transition-colors"
          >
            <TimerIcon className="text-primary size-3.5" />
            <span>Rest: {restSeconds}s</span>
            {showTimer ? <ChevronDown className="size-3.5" /> : <ChevronUp className="size-3.5" />}
          </button>
        </div>

        {/* Set Log Input Controls */}
        <div className="border-border/30 flex items-center justify-between gap-3 border-t pt-1">
          <div className="flex items-center gap-3">
            <div className="bg-surface-2/60 border-border/30 flex items-center gap-1.5 rounded-xl border px-3 py-1.5">
              <span className="text-muted-foreground text-xs">kg:</span>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="text-foreground w-14 bg-transparent font-mono text-sm font-semibold focus:outline-none"
              />
            </div>

            <div className="bg-surface-2/60 border-border/30 flex items-center gap-1.5 rounded-xl border px-3 py-1.5">
              <span className="text-muted-foreground text-xs">reps:</span>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
                className="text-foreground w-12 bg-transparent font-mono text-sm font-semibold focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onFinishWorkout}
              className="text-muted-foreground hover:text-foreground rounded-xl px-3 py-1.5 text-xs font-medium transition-colors"
            >
              Finish
            </button>
            <button
              type="button"
              onClick={handleLog}
              className="bg-primary text-primary-foreground flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold shadow-md transition-all hover:brightness-110"
            >
              <Check className="size-4" />
              <span>Log Set {currentSet}</span>
            </button>
          </div>
        </div>

        {/* Expandable Rest Timer */}
        {showTimer && (
          <div className="border-border/20 flex justify-center border-t pt-2">
            <CountdownTimer
              initialSeconds={restSeconds}
              autoStart={true}
              onComplete={() => setShowTimer(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
