"use client";

import { Flame, Beef, Wheat, Droplets, GlassWater } from "lucide-react";
import { useMacroTargets } from "../api/getProfileData";

export function MacroTargetCard() {
  const { data: macros } = useMacroTargets();

  if (!macros) return null;

  return (
    <div className="glass p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display-x text-2xl">CALIBRATED MACRO TARGETS</h3>
        <span className="flex items-center gap-1 text-xs font-semibold text-volt">
          <Flame className="size-3.5" /> {macros.calories} kcal/day
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Metabolic calibration based on your training volume & lean mass.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-secondary/40 p-3 text-center">
          <Beef className="mx-auto size-4 text-cyan" />
          <div className="font-display-x mt-1 text-xl">{macros.protein}g</div>
          <p className="text-[10px] uppercase text-muted-foreground">Protein</p>
        </div>
        <div className="rounded-xl border border-border bg-secondary/40 p-3 text-center">
          <Wheat className="mx-auto size-4 text-amber-400" />
          <div className="font-display-x mt-1 text-xl">{macros.carbs}g</div>
          <p className="text-[10px] uppercase text-muted-foreground">Carbs</p>
        </div>
        <div className="rounded-xl border border-border bg-secondary/40 p-3 text-center">
          <Droplets className="mx-auto size-4 text-ember" />
          <div className="font-display-x mt-1 text-xl">{macros.fats}g</div>
          <p className="text-[10px] uppercase text-muted-foreground">Fats</p>
        </div>
        <div className="rounded-xl border border-border bg-secondary/40 p-3 text-center">
          <GlassWater className="mx-auto size-4 text-volt" />
          <div className="font-display-x mt-1 text-xl">{macros.waterLiters}L</div>
          <p className="text-[10px] uppercase text-muted-foreground">Hydration</p>
        </div>
      </div>
    </div>
  );
}
