"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/vital/AppShell";
import { useVital } from "@/lib/store";
import { reply, type Msg } from "./advisor-utils";

const prompts = [
  "How should I warm up for 85kg incline bench?",
  "My lower back is fatigued, how should I modify tomorrow's leg day?",
  "Am I lifting enough volume for chest hypertrophy this week?",
  "Suggest a quick high-protein post-workout snack.",
];

function Rich({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      {text.split("\n").map((line, i) => {
        const bullet = line.startsWith("- ");
        const parts = (bullet ? line.slice(2) : line).split(/\*\*(.+?)\*\*/g);
        const content = parts.map((p, j) =>
          j % 2 ? (
            <strong key={j} className="vt-advisor-rich-strong">
              {p}
            </strong>
          ) : (
            p
          ),
        );
        return bullet ? (
          <div key={i} className="vt-advisor-rich-item">
            <span className="vt-advisor-rich-bullet">▸</span>
            <span>{content}</span>
          </div>
        ) : (
          <p key={i} style={{ margin: 0 }}>
            {content}
          </p>
        );
      })}
    </div>
  );
}

export function AdvisorChatView() {
  const { profile, coachContext, setCoachContext } = useVital();
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "coach",
      text: `Locked in, **${profile.name}**. I know your stats — ${profile.weight}kg, ${profile.goal}, ${profile.equipment}. What are we optimizing today?`,
    },
  ]);
  const [input, setInput] = useState(
    coachContext ? `About this insight: "${coachContext}" — what should I do?` : "",
  );
  const [prevContext, setPrevContext] = useState(coachContext);
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  if (coachContext && coachContext !== prevContext) {
    setPrevContext(coachContext);
    setInput(`About this insight: "${coachContext}" — what should I do?`);
  }

  useEffect(() => {
    if (coachContext) {
      setCoachContext(null);
    }
  }, [coachContext, setCoachContext]);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (q: string) => {
    if (!q.trim()) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, reply(q, profile)]);
    }, 900);
  };

  return (
    <AppShell insight="Ask anything about load, recovery or nutrition — I factor in your injuries and logged tonnage.">
      <div className="vt-advisor-header">
        <div className="vt-advisor-avatar vt-gradient-volt vt-glow-volt">
          <Bot className="vt-advisor-avatar__icon" />
        </div>
        <div>
          <h1 className="vt-font-display vt-advisor-title">AI Coach</h1>
          <p className="vt-advisor-subtitle">Scientifically rigorous. Zero fluff.</p>
        </div>
      </div>
      <div className="vt-glass vt-advisor-box">
        <div className="vt-advisor-messages">
          <AnimatePresence initial={false}>
            {msgs.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: m.role === "user" ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                className={`vt-advisor-turn ${m.role === "user" ? "vt-advisor-turn--user" : ""}`}
              >
                <div
                  className={`vt-advisor-bubble ${
                    m.role === "user" ? "vt-advisor-bubble--user" : "vt-advisor-bubble--coach"
                  }`}
                >
                  {m.role === "user" ? m.text : <Rich text={m.text} />}
                  {m.confidence && (
                    <span className="vt-tabular vt-advisor-confidence">{m.confidence}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {typing && (
            <div className="vt-advisor-typing">
              {[0, 1, 2].map((k) => (
                <motion.span
                  key={k}
                  className="vt-advisor-typing-dot"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: k * 0.2 }}
                />
              ))}
            </div>
          )}
          <div ref={end} />
        </div>
        <div className="vt-advisor-prompts">
          {prompts.map((p) => (
            <button key={p} onClick={() => send(p)} className="vt-advisor-prompt-chip">
              {p}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="vt-advisor-form"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your coach..."
            className="vt-advisor-input"
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="vt-advisor-send-btn"
            aria-label="Send message"
          >
            <Send style={{ width: "1.25rem", height: "1.25rem" }} />
          </motion.button>
        </form>
      </div>
    </AppShell>
  );
}
