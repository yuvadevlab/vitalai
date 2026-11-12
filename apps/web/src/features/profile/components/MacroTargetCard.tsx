"use client";

import { Flame, Beef, Wheat, Droplets, GlassWater } from "lucide-react";
import { useMacroTargets } from "../api/getProfileData";

export function MacroTargetCard() {
  const { data: macros } = useMacroTargets();

  if (!macros) return null;

  return (
    <div className="vt-glass vt-macro-card">
      <div className="vt-macro-card__header">
        <h3 className="vt-font-display vt-macro-card__title">CALIBRATED MACRO TARGETS</h3>
        <span className="vt-macro-card__cal">
          <Flame className="vt-macro-card__cal-icon" /> {macros.calories} kcal/day
        </span>
      </div>
      <p className="vt-macro-card__sub">
        Metabolic calibration based on your training volume & lean mass.
      </p>

      <div className="vt-macro-card__grid">
        <div className="vt-macro-box">
          <Beef className="vt-macro-box__icon" style={{ color: "var(--cyan)" }} />
          <div className="vt-tabular vt-macro-box__val">{macros.protein}g</div>
          <p className="vt-macro-box__label">Protein</p>
        </div>
        <div className="vt-macro-box">
          <Wheat className="vt-macro-box__icon" style={{ color: "#fbbf24" }} />
          <div className="vt-tabular vt-macro-box__val">{macros.carbs}g</div>
          <p className="vt-macro-box__label">Carbs</p>
        </div>
        <div className="vt-macro-box">
          <Droplets className="vt-macro-box__icon" style={{ color: "var(--ember, #f97316)" }} />
          <div className="vt-tabular vt-macro-box__val">{macros.fats}g</div>
          <p className="vt-macro-box__label">Fats</p>
        </div>
        <div className="vt-macro-box">
          <GlassWater className="vt-macro-box__icon" style={{ color: "var(--volt)" }} />
          <div className="vt-tabular vt-macro-box__val">{macros.waterLiters}L</div>
          <p className="vt-macro-box__label">Hydration</p>
        </div>
      </div>
    </div>
  );
}
