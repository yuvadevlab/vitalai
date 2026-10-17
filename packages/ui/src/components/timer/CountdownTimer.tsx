"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Plus } from "lucide-react";

export interface CountdownTimerProps {
  readonly initialSeconds: number;
  readonly onComplete?: () => void;
  readonly autoStart?: boolean;
  readonly size?: number;
  readonly className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds,
  onComplete,
  autoStart = false,
  size = 140,
  className = "",
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(autoStart);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(totalSeconds);
  };
  const addThirtySeconds = () => {
    setSecondsLeft((prev) => prev + 30);
    setTotalSeconds((prev) => prev + 30);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = totalSeconds > 0 ? secondsLeft / totalSeconds : 0;
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div
      className={`bg-card/60 border-border/40 flex flex-col items-center rounded-2xl border p-4 backdrop-blur-md ${className}`}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="-rotate-90 transform">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-surface-2 stroke-[6px]"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-primary stroke-[6px] transition-all duration-300 ease-linear"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-foreground font-mono text-2xl font-bold tracking-tight tabular-nums">
            {formattedTime}
          </span>
          <span className="text-muted-foreground mt-0.5 text-[10px] font-semibold tracking-widest uppercase">
            {isActive ? "Resting" : secondsLeft === 0 ? "Complete!" : "Rest Interval"}
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={resetTimer}
          className="text-muted-foreground hover:text-foreground hover:bg-surface-2 rounded-xl p-2 transition-colors"
          title="Reset Timer"
        >
          <RotateCcw className="size-4" />
        </button>

        <button
          type="button"
          onClick={toggleTimer}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            isActive
              ? "border border-amber-500/30 bg-amber-500/20 text-amber-300"
              : "bg-primary text-primary-foreground hover:brightness-110"
          }`}
        >
          {isActive ? (
            <>
              <Pause className="size-3.5" /> Pause
            </>
          ) : (
            <>
              <Play className="size-3.5" /> Start
            </>
          )}
        </button>

        <button
          type="button"
          onClick={addThirtySeconds}
          className="text-muted-foreground hover:text-foreground hover:bg-surface-2 flex items-center rounded-xl p-2 font-mono text-xs transition-colors"
          title="Add 30 Seconds"
        >
          <Plus className="size-3.5" />
          <span>30s</span>
        </button>
      </div>
    </div>
  );
};
