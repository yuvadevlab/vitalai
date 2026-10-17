"use client";

import React from "react";
import { Baby, HeartPulse, AlertCircle, Sparkles } from "lucide-react";

export interface TrimesterTimelineProps {
  readonly currentWeek: number;
  readonly className?: string;
}

export const TrimesterTimeline: React.FC<TrimesterTimelineProps> = ({
  currentWeek,
  className = "",
}) => {
  let trimesterLabel = "1st Trimester (Weeks 1-12)";
  let calorieAdjustment = "+0 kcal (Baseline)";
  let clinicalFocus = "Neural tube organogenesis & folate absorption (400-800mcg)";
  let exerciseGuideline = "Maintain baseline aerobic conditioning; monitor hydration";

  if (currentWeek >= 28) {
    trimesterLabel = "3rd Trimester (Weeks 28-40)";
    calorieAdjustment = "+452 kcal/day";
    clinicalFocus = "Rapid fetal pulmonary development, calcium accretion & iron store repletion";
    exerciseGuideline =
      "Strict contraindication: supine exercises (vena cava compression risk); prioritize pelvic floor stability";
  } else if (currentWeek >= 13) {
    trimesterLabel = "2nd Trimester (Weeks 13-27)";
    calorieAdjustment = "+340 kcal/day";
    clinicalFocus = "Skeletal mineralization, maternal blood volume expansion (+45%)";
    exerciseGuideline =
      "ACOG: Avoid high-impact valsalva maneuvers; incline bench replaces flat press";
  }

  const progressPercent = Math.min(100, Math.max(0, (currentWeek / 40) * 100));

  return (
    <div
      className={`bg-card/60 border-border/40 space-y-4 rounded-2xl border p-5 backdrop-blur-md ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-pink-500/15 p-2 text-pink-400">
            <Baby className="size-4" />
          </div>
          <div>
            <h4 className="text-foreground text-sm font-bold tracking-tight">
              Gestational Progress & ACOG Protocol
            </h4>
            <p className="text-muted-foreground text-xs">{trimesterLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-1 font-mono text-xs font-semibold text-pink-300">
          <HeartPulse className="size-3.5" />
          <span>Week {currentWeek} of 40</span>
        </div>
      </div>

      {/* Progress Bar with Trimester Divisions */}
      <div className="space-y-1.5">
        <div className="bg-surface-2 border-border/30 relative h-3 w-full overflow-hidden rounded-full border">
          <div
            className="to-primary h-full rounded-full bg-linear-to-r from-pink-400 via-rose-400 transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
          {/* Trimester markers */}
          <div
            className="absolute inset-y-0 left-[30%] w-0.5 bg-white/40"
            title="End of T1 (Wk 12)"
          />
          <div
            className="absolute inset-y-0 left-[67.5%] w-0.5 bg-white/40"
            title="End of T2 (Wk 27)"
          />
        </div>
        <div className="text-muted-foreground flex justify-between px-1 font-mono text-[10px]">
          <span>T1 (W1-12)</span>
          <span>T2 (W13-27)</span>
          <span>T3 (W28-40)</span>
        </div>
      </div>

      {/* Clinical Guidance Grid */}
      <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
        <div className="bg-surface-2/40 border-border/20 rounded-xl border p-3">
          <div className="text-foreground mb-1 flex items-center gap-1.5 text-xs font-semibold">
            <Sparkles className="size-3.5 text-pink-400" />
            <span>Energy & Micronutrient Target</span>
          </div>
          <p className="text-primary font-mono text-xs font-medium">{calorieAdjustment}</p>
          <p className="text-muted-foreground mt-1 text-[11px] leading-relaxed">{clinicalFocus}</p>
        </div>

        <div className="bg-surface-2/40 border-border/20 rounded-xl border p-3">
          <div className="text-foreground mb-1 flex items-center gap-1.5 text-xs font-semibold">
            <AlertCircle className="size-3.5 text-amber-400" />
            <span>ACOG Safety Guardrail</span>
          </div>
          <p className="text-muted-foreground text-[11px] leading-relaxed">{exerciseGuideline}</p>
        </div>
      </div>
    </div>
  );
};
