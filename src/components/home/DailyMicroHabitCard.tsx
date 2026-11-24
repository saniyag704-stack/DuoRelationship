"use client";

import React, { useState } from "react";
import { useRelationship } from "@/context/RelationshipContext";
import { CheckCircle2, Circle, Clock, Sparkles, RefreshCw, BrainCircuit, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export function DailyMicroHabitCard() {
  const { state, toggleDailyHabit, rotateDailyHabit } = useRelationship();
  const habit = state.dailyHabit;
  const [showWhy, setShowWhy] = useState(false);

  const handleToggle = () => {
    if (!habit.completed) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#D4AF37", "#E47A94", "#F9EEC6"],
        });
      } catch {
        // Safe fallback if canvas-confetti is not loaded
      }
    }
    toggleDailyHabit();
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-obsidian-900/90 border border-gold-500/20 p-5 sm:p-6 shadow-luxury-card backdrop-blur-md">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-gold-400">
            <Heart className="w-4 h-4 fill-gold-400/20" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400">
                Daily Micro-Habit · Relationship Vitamin
              </span>
              <span className="text-[10px] text-zinc-400 font-light hidden sm:inline">
                (Today)
              </span>
            </div>
            <h4 className="font-serif text-lg sm:text-xl text-zinc-100 font-medium">
              {habit.title}
            </h4>
          </div>
        </div>

        {/* Shuffle / Next habit button */}
        <button
          onClick={rotateDailyHabit}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-gold-300 hover:bg-white/5 transition-colors"
          title="Try another connection vitamin"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Action Prompt Box */}
      <div
        onClick={handleToggle}
        className={`cursor-pointer rounded-xl p-4 sm:p-5 border transition-all duration-300 ${
          habit.completed
            ? "bg-emerald-950/20 border-emerald-500/40 text-zinc-200"
            : "bg-obsidian-850/80 border-white/5 hover:border-gold-500/30 text-zinc-200"
        }`}
      >
        <div className="flex items-start gap-3.5">
          <button
            type="button"
            className="mt-0.5 text-gold-400 hover:scale-110 transition-transform shrink-0"
            aria-label={habit.completed ? "Mark incomplete" : "Mark completed"}
          >
            {habit.completed ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-950" />
            ) : (
              <Circle className="w-6 h-6 text-gold-400/60" />
            )}
          </button>

          <div className="flex-1">
            <p className={`text-sm sm:text-base leading-relaxed ${habit.completed ? "line-through text-zinc-400" : "font-normal"}`}>
              {habit.actionPrompt}
            </p>

            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                  <Clock className="w-3 h-3" />
                  {habit.estimatedMinutes} min connection
                </span>
                <span className="capitalize text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-gold-300 border border-white/5">
                  {habit.category}
                </span>
              </div>

              {habit.completed && (
                <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Completed today
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Psychological rationale toggle */}
      <div className="mt-3.5 pt-3 border-t border-white/5">
        <button
          onClick={() => setShowWhy((prev) => !prev)}
          className="flex items-center gap-1.5 text-xs text-gold-400/90 hover:text-gold-300 transition-colors font-medium"
        >
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>{showWhy ? "Hide Behavioral Science" : "Why this works (Behavioral Psychology)"}</span>
        </button>

        {showWhy && (
          <div className="mt-2 text-xs text-zinc-300 bg-obsidian-950/70 rounded-xl p-3 border border-gold-500/15 leading-relaxed animate-in fade-in duration-200">
            <p>{habit.psychologicalWhy}</p>
          </div>
        )}
      </div>
    </div>
  );
}
