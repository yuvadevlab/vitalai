import type { Profile } from "@/lib/store";

export type Msg = { role: "user" | "coach"; text: string; confidence?: string };

export function reply(q: string, p: Profile): Msg {
  const l = q.toLowerCase();
  if (l.includes("warm")) {
    return {
      role: "coach",
      confidence: "High confidence",
      text: `**Ramp-up protocol for 85kg:**\n- Empty bar × 15, slow tempo\n- 40kg × 8\n- 60kg × 5\n- 75kg × 2\n- Then **working sets @ 85kg**, 3s eccentric on set 1.`,
    };
  }
  if (l.includes("back")) {
    return {
      role: "coach",
      confidence: "High confidence",
      text: `**Protect the spine, keep the stimulus.**\n- Swap back squats → **Hack squat or leg press**\n- Replace RDLs with **lying leg curls**\n- Cap RPE at 7 and add 5 min of 90/90 breathing.`,
    };
  }
  if (l.includes("volume") || l.includes("chest")) {
    return {
      role: "coach",
      confidence: "Medium confidence",
      text: `You're at **14 hard chest sets** this week — inside the 10–20 hypertrophy range.\n- Add **2 sets of cable fly** on Push B if recovery stays >85%\n- Keep 1–2 RIR.`,
    };
  }
  if (l.includes("snack") || l.includes("protein")) {
    return {
      role: "coach",
      confidence: "High confidence",
      text: `At **${p.weight}kg**, aim for ~${Math.round(p.weight * 0.4)}g protein post-session:\n- Greek yogurt + whey + berries\n- Or 3 eggs on rye + a banana for glycogen.`,
    };
  }
  return {
    role: "coach",
    confidence: "Medium confidence",
    text: `Based on your **${p.goal}** goal with **${p.equipment}**, ${p.days}×/week:\n- Prioritize progressive overload on compounds\n- Sleep 7.5h+ and hit ${Math.round(p.weight * 2)}g protein daily.`,
  };
}
