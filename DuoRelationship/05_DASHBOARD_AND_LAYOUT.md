# DUO — Dashboard Widgets, Micro-Habits & Navigation Layout

This file contains the complete source code for **Dashboard Widgets, Micro-Habits & Navigation Layout** in DUO.

---

## Component: DailyMicroHabitCard

- **File Path:** `src/components/home/DailyMicroHabitCard.tsx`
- **Lines of Code:** 128 lines
- **Size:** 4.87 KB

```tsx
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

```

---

## Component: EmotionalAlignmentMeter

- **File Path:** `src/components/home/EmotionalAlignmentMeter.tsx`
- **Lines of Code:** 182 lines
- **Size:** 7.96 KB

```tsx
"use client";

import React from "react";
import { useRelationship } from "@/context/RelationshipContext";
import { Lock, HeartHandshake, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

export function EmotionalAlignmentMeter() {
  const { state, hasRealActivity, setActiveTab } = useRelationship();
  const { score, communicationClarity, deEscalatedMoments, currentStreakDays } = state.stats;

  // Arc calculation for dynamic gauge
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = score !== null ? circumference - (score / 100) * circumference : circumference;

  const getVibeStatus = (scoreVal: number) => {
    if (scoreVal >= 88) return { label: "Deep Resonance & High Attunement", color: "text-gold-300" };
    if (scoreVal >= 75) return { label: "Grounded & Mindfully De-escalating", color: "text-gold-400" };
    if (scoreVal >= 60) return { label: "Active Repair & Growth In Progress", color: "text-rose-300" };
    return { label: "Calibrating Communication Dynamics", color: "text-zinc-300" };
  };

  const status = score !== null ? getVibeStatus(score) : null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-obsidian-900/95 via-obsidian-850 to-obsidian-900/90 border border-gold-500/20 p-5 sm:p-6 shadow-luxury-card backdrop-blur-md">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left: Gauge Display */}
        <div className="flex items-center gap-6">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center shrink-0">
            {/* SVG Ring */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              <defs>
                <linearGradient id="goldRoseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#E47A94" />
                  <stop offset="100%" stopColor="#4EBA88" />
                </linearGradient>
              </defs>

              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-obsidian-700/60"
                strokeWidth="10"
                fill="transparent"
              />

              {/* Progress Track */}
              {hasRealActivity && score !== null ? (
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="url(#goldRoseGradient)"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              ) : (
                /* Uncalibrated dashed circle */
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-gold-500/30 animate-pulse-slow"
                  strokeWidth="8"
                  strokeDasharray="6 8"
                  fill="transparent"
                />
              )}
            </svg>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
              {hasRealActivity && score !== null ? (
                <>
                  <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-rose-200 to-gold-400">
                    {score}%
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider mt-0.5">
                    Alignment
                  </span>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-1">
                    <Lock className="w-4 h-4 text-gold-400" />
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-gold-400 tracking-wider">
                    Uncalibrated
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description & Status */}
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
                Emotional Alignment Meter
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                Real-Time
              </span>
            </div>

            {hasRealActivity && score !== null ? (
              <>
                <h4 className="font-serif text-lg sm:text-xl text-zinc-100 font-medium">
                  {status?.label}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                  Derived from {state.stats.totalDecodes} decoded chats and {state.stats.totalRewrites} softened messages. Zero arbitrary vanity metrics.
                </p>
              </>
            ) : (
              <>
                <h4 className="font-serif text-base sm:text-lg text-zinc-200 font-medium">
                  Awaiting First Emotional Interaction
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                  Decode your first chat or check a message to unlock your Relationship Alignment Score.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right: Sub-Metrics Pill / Progress Details */}
        <div className="w-full md:w-auto flex flex-row md:flex-col justify-around gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/5 md:pl-6 shrink-0">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
              Clarity Index
            </span>
            <span className="text-base sm:text-lg font-serif font-semibold text-zinc-100">
              {hasRealActivity ? `${communicationClarity}%` : "—"}
            </span>
            <span className="text-[10px] text-zinc-400">
              {hasRealActivity ? "Gottman calibrated" : "Pending activity"}
            </span>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
              De-escalated
            </span>
            <span className="text-base sm:text-lg font-serif font-semibold text-gold-300">
              {hasRealActivity ? `${deEscalatedMoments} moments` : "0 moments"}
            </span>
            <span className="text-[10px] text-zinc-400">
              Heated friction softened
            </span>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
              Daily Streak
            </span>
            <span className="text-base sm:text-lg font-serif font-semibold text-rose-300">
              {currentStreakDays > 0 ? `${currentStreakDays} days` : "Day 1"}
            </span>
            <span className="text-[10px] text-zinc-400">
              Micro-habits logged
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

## Component: EmptyStateBanner

- **File Path:** `src/components/home/EmptyStateBanner.tsx`
- **Lines of Code:** 66 lines
- **Size:** 3.19 KB

```tsx
"use client";

import React from "react";
import { useRelationship } from "@/context/RelationshipContext";
import { Sparkles, Shield, ArrowRight, MessageSquareQuote } from "lucide-react";

export function EmptyStateBanner() {
  const { setActiveTab, openDecodeWithSample } = useRelationship();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-obsidian-900/90 via-obsidian-850 to-rose-950/20 border border-gold-500/20 p-5 sm:p-7 shadow-luxury-card backdrop-blur-md">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="px-2.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Honest Behavioral Science</span>
          </div>
          <span className="text-zinc-400 text-xs hidden sm:inline">
            Zero vanity scores. Zero gamified red flags.
          </span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-zinc-100 font-semibold tracking-wide mb-2">
          Unlock Your Real Relationship Alignment Score
        </h3>

        <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl mb-5">
          Instead of generating arbitrary dummy statistics, DUO calibrates strictly to your authentic dynamic.{" "}
          <strong className="text-gold-300 font-medium">
            Decode your first chat screenshot or run a message through Before You Send
          </strong>{" "}
          to measure real communication clarity, de-escalation habits, and your couple attachment archetype.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab("decode")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-obsidian-950 font-semibold text-xs sm:text-sm hover:brightness-110 transition-all shadow-gold-glow/30"
          >
            <span>Decode Real Chat Screenshot</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => openDecodeWithSample("chat-sample-1")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-obsidian-800/80 border border-gold-500/30 text-gold-200 text-xs sm:text-sm hover:bg-gold-500/10 transition-all"
          >
            <MessageSquareQuote className="w-4 h-4 text-gold-400" />
            <span>Try with Hinglish Sample Chat</span>
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-zinc-400">
          <Shield className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span>
            100% ephemeral analysis in RAM · No chat logs saved to databases · Safe for vulnerable couple discussions
          </span>
        </div>
      </div>
    </div>
  );
}

```

---

## Component: PrimaryDecodeAction

- **File Path:** `src/components/home/PrimaryDecodeAction.tsx`
- **Lines of Code:** 68 lines
- **Size:** 3.75 KB

```tsx
"use client";

import React from "react";
import { useRelationship } from "@/context/RelationshipContext";
import { Heart, Sparkles, ArrowRight, ShieldCheck, Zap, ScanEye } from "lucide-react";

export function PrimaryDecodeAction() {
  const { setActiveTab } = useRelationship();

  return (
    <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-rose-950/30 border border-gold-500/30 p-6 sm:p-8 shadow-luxury-card transition-all duration-300 hover:border-gold-400/50">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-500/15 transition-all duration-500" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-gold-500/15 transition-all duration-500" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-wide">
            <Zap className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>The Psychological X-Ray</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-zinc-100 font-semibold tracking-wide leading-tight">
            Stop guessing their tone. Understand what they really mean.
          </h3>

          <p className="text-sm text-zinc-300 leading-relaxed font-light">
            Behind every cold <em>"Fine"</em> or angry text lies an unexpressed emotional bid. Upload any screenshot or paste a confusing message to uncover the hidden attachment need and a gentle response that heals.
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-zinc-400 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span>Gottman 4-Horsemen Filter</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>Hinglish & Hindi Nuances</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Zero-Storage Encryption</span>
            </div>
          </div>
        </div>

        {/* Big Glowing Action Button */}
        <div className="w-full md:w-auto shrink-0 flex flex-col items-center sm:items-end">
          <button
            onClick={() => setActiveTab("decode")}
            className="w-full sm:w-auto relative group/btn overflow-hidden px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-gold-500 to-gold-400 text-obsidian-950 font-bold text-sm sm:text-base tracking-wide shadow-gold-glow hover:shadow-rose-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 border border-gold-200/40"
          >
            <Heart className="w-5 h-5 text-obsidian-950 fill-obsidian-950 group-hover/btn:scale-110 transition-transform" />
            <span className="whitespace-nowrap">
              Decode Chat Screenshot
            </span>
            <ArrowRight className="w-5 h-5 text-obsidian-950 group-hover/btn:translate-x-1 transition-transform" />
          </button>
          
          <span className="text-[11px] text-zinc-400 mt-2 text-center sm:text-right font-light">
            ⚡ Understand the hidden emotion in 8 seconds
          </span>
        </div>
      </div>
    </div>
  );
}

```

---

## Component: QuickStatsRow

- **File Path:** `src/components/home/QuickStatsRow.tsx`
- **Lines of Code:** 116 lines
- **Size:** 4.11 KB

```tsx
"use client";

import React from "react";
import { useRelationship } from "@/context/RelationshipContext";
import { ScanEye, Send, ShieldCheck, Flame, History } from "lucide-react";
import { formatDate } from "@/lib/utils";

export function QuickStatsRow() {
  const { state, hasRealActivity, setActiveTab } = useRelationship();
  const { totalDecodes, totalRewrites, deEscalatedMoments, currentStreakDays } = state.stats;

  const statItems = [
    {
      label: "Chats Decoded",
      value: totalDecodes,
      sub: "Psych X-Ray insights",
      icon: ScanEye,
      color: "text-gold-400",
      tab: "decode" as const,
    },
    {
      label: "Messages Softened",
      value: totalRewrites,
      sub: "Before You Send",
      icon: Send,
      color: "text-rose-400",
      tab: "rewrite" as const,
    },
    {
      label: "Moments De-escalated",
      value: deEscalatedMoments,
      sub: "Defensiveness averted",
      icon: ShieldCheck,
      color: "text-emerald-400",
      tab: "decode" as const,
    },
    {
      label: "Mindful Streak",
      value: currentStreakDays > 0 ? `${currentStreakDays}d` : "0d",
      sub: "Daily attunement",
      icon: Flame,
      color: "text-amber-400",
      tab: "home" as const,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(item.tab)}
              className="cursor-pointer group rounded-xl bg-obsidian-900/80 border border-gold-500/15 p-3.5 hover:border-gold-500/35 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {item.label}
                </span>
                <Icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform`} />
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-zinc-100">
                {item.value}
              </div>
              <p className="text-[10px] text-zinc-400 mt-0.5">{item.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Log (Only shows when real activity has occurred) */}
      {hasRealActivity && state.activities.length > 0 && (
        <div className="rounded-xl bg-obsidian-900/60 border border-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-gold-400" />
              Recent Emotional Calibrations
            </span>
            <span className="text-[11px] text-zinc-400">
              {state.activities.length} total logged
            </span>
          </div>

          <div className="space-y-2">
            {state.activities.slice(0, 3).map((act) => (
              <div
                key={act.id}
                className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-obsidian-850/60 border border-white/5 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-zinc-200">{act.title}</span>
                    {act.metricsContribution.deEscalated && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                        De-escalated
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-[11px] mt-0.5 line-clamp-1">
                    {act.summary}
                  </p>
                </div>
                <span className="text-[10px] text-zinc-400 shrink-0">
                  {formatDate(act.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

```

---

## Component: WeeklyVibeReport

- **File Path:** `src/components/home/WeeklyVibeReport.tsx`
- **Lines of Code:** 229 lines
- **Size:** 10.07 KB

```tsx
"use client";

import React, { useState } from "react";
import { useRelationship } from "@/context/RelationshipContext";
import { CoupleVibeCard } from "@/types";
import { Sparkles, Share2, ShieldCheck, Lock, Heart, Check, Download, Eye } from "lucide-react";
import { COUPLE_VIBE_ARCHETYPES } from "@/lib/constants";

export function WeeklyVibeReport() {
  const { state, hasRealActivity, setActiveTab } = useRelationship();
  const [selectedCard, setSelectedCard] = useState<CoupleVibeCard | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Use unlocked cards or fallback archetype if user has activity
  const activeCard: CoupleVibeCard | null =
    state.unlockedVibeCards.length > 0
      ? state.unlockedVibeCards[0]
      : hasRealActivity
      ? COUPLE_VIBE_ARCHETYPES[0]
      : null;

  const handleShareClick = (card: CoupleVibeCard) => {
    setSelectedCard(card);
  };

  const handleCopyCard = () => {
    if (!selectedCard) return;
    const textToCopy = `✨ DUO Love DNA Archetype: ${selectedCard.archetype}
"${selectedCard.quote}"
Relationship Superpower: ${selectedCard.superpower}
Harmony Score: ${selectedCard.harmonyScore}%
Calibrated via DUO Emotional Co-Pilot (100% Private)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-obsidian-900/90 border border-gold-500/20 p-5 sm:p-6 shadow-luxury-card backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              Weekly Vibe & Chemistry Report
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
              Shareable Love DNA
            </span>
          </div>
          <h4 className="font-serif text-lg sm:text-xl text-zinc-100 font-medium mt-0.5">
            Couple Resonance Archetype
          </h4>
        </div>

        {activeCard && (
          <button
            onClick={() => handleShareClick(activeCard)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-medium hover:bg-gold-500/25 transition-all shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Card</span>
          </button>
        )}
      </div>

      {/* Card Content or Locked State */}
      {activeCard ? (
        <div className="relative rounded-xl overflow-hidden border border-gold-500/30 bg-gradient-to-br from-obsidian-850 via-obsidian-900 to-rose-950/40 p-5 sm:p-6">
          <div className="absolute top-0 right-0 w-44 h-44 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-400">
                  Archetype Identified
                </span>
                <h5 className="font-serif text-xl sm:text-2xl font-bold text-zinc-100">
                  {activeCard.archetype}
                </h5>
                <p className="text-xs text-zinc-400 italic">"{activeCard.tagline}"</p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <div className="px-3 py-1.5 rounded-xl bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs font-semibold">
                  {activeCard.harmonyScore}% Harmony
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-obsidian-950/60 rounded-xl p-3 border border-white/5">
                <span className="text-gold-400 font-medium block mb-1">
                  ⚡ Relationship Superpower
                </span>
                <p className="text-zinc-300 leading-relaxed">{activeCard.superpower}</p>
              </div>

              <div className="bg-obsidian-950/60 rounded-xl p-3 border border-white/5">
                <span className="text-rose-300 font-medium block mb-1">
                  🌱 Gentle Growth Edge
                </span>
                <p className="text-zinc-300 leading-relaxed">{activeCard.growthEdge}</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-zinc-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero private chats exposed · Psychological profile only</span>
              </div>

              <button
                onClick={() => handleShareClick(activeCard)}
                className="text-gold-400 hover:text-gold-300 font-medium flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Instagram-Ready Card</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Locked Preview State for Brand New Users */
        <div className="rounded-xl border border-dashed border-gold-500/25 bg-obsidian-850/40 p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/25 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-5 h-5 text-gold-400" />
          </div>

          <h5 className="font-serif text-base sm:text-lg text-zinc-200 font-medium mb-1">
            Couple Vibe & Love DNA Cards Locked
          </h5>
          <p className="text-xs text-zinc-400 max-w-md mx-auto mb-4">
            Unlock your couple archetype (like <em>The Calm Anchor & The Passionate Storm</em>) by analyzing your first chat or running a message through Before You Send.
          </p>

          <button
            onClick={() => setActiveTab("decode")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold hover:bg-gold-500/25 transition-all"
          >
            <span>Decode First Chat to Unlock</span>
          </button>
        </div>
      )}

      {/* Share Modal Dialog */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-obsidian-900 border border-gold-500/35 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 text-sm font-semibold p-1"
            >
              ✕
            </button>

            {/* Instagram Story / Share Card Preview */}
            <div className="rounded-2xl bg-gradient-to-br from-obsidian-950 via-obsidian-900 to-rose-950/50 border border-gold-400/40 p-6 text-center space-y-4 shadow-luxury-card">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-300 text-[11px] font-semibold uppercase tracking-widest">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                DUO Love DNA
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-zinc-100">
                  {selectedCard.archetype}
                </h3>
                <p className="text-xs text-gold-300/90 mt-1 italic">
                  "{selectedCard.quote}"
                </p>
              </div>

              <div className="bg-obsidian-900/90 rounded-xl p-3 border border-white/5 text-left text-xs space-y-2">
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase font-semibold block">
                    Relationship Dynamic
                  </span>
                  <p className="text-zinc-200">{selectedCard.tagline}</p>
                </div>
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase font-semibold block">
                    Signature Superpower
                  </span>
                  <p className="text-zinc-200">{selectedCard.superpower}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/5">
                <span>🔒 100% Private Analysis</span>
                <span className="text-gold-400 font-semibold">{selectedCard.harmonyScore}% Harmony</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={handleCopyCard}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-obsidian-950 font-semibold text-xs hover:brightness-110 transition-all"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied Summary!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Copy Share Text</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedCard(null)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```

---

## Component: Header & Dialect Modal

- **File Path:** `src/components/layout/Header.tsx`
- **Lines of Code:** 161 lines
- **Size:** 7.74 KB

```tsx
"use client";

import React, { useState } from "react";
import { useRelationship } from "@/context/RelationshipContext";
import { ShieldCheck, HeartHandshake, Sparkles, RefreshCw, Languages, Info } from "lucide-react";
import { Language } from "@/types";

export function Header() {
  const { state, setLanguage, hasRealActivity, resetToEmptyState, loadInteractiveDemo } = useRelationship();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showStateSwitchModal, setShowStateSwitchModal] = useState(false);

  const languages: { code: Language; label: string; sub: string }[] = [
    { code: "hinglish", label: "Hinglish", sub: "Urban Mix (Samajh & Emotion)" },
    { code: "en", label: "English", sub: "Global Nuance" },
    { code: "hi", label: "हिंदी", sub: "गहरी संवेदनशीलता" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gold-500/15 bg-obsidian-950/85 backdrop-blur-xl transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-3">
        {/* DUO Brand Title */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-gold-500/20 via-rose-500/20 to-obsidian-900 border border-gold-500/30 shadow-gold-glow/20">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-gold-300">
              D
            </span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-400 ring-2 ring-obsidian-950 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-zinc-100">
                DUO
              </span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 tracking-wider">
                CO-PILOT
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-zinc-400 font-light tracking-wide hidden xs:block">
              Emotional Communication Translator
            </p>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Security & Partner Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian-900/90 border border-white/5 text-xs text-zinc-300">
            <div className="flex items-center gap-1.5 text-gold-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">Zero-Retention</span>
            </div>
            <span className="text-zinc-600">|</span>
            <div className="flex items-center gap-1 text-zinc-300">
              <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[11px]">{state.partnerName ? `${state.userName} & ${state.partnerName}` : "Private Vault"}</span>
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-obsidian-900/80 border border-gold-500/20 hover:border-gold-500/40 text-xs text-gold-300 font-medium transition-colors"
              title="Change communication dialect"
            >
              <Languages className="w-3.5 h-3.5 text-gold-400" />
              <span className="uppercase text-[11px] font-semibold tracking-wider">
                {state.language}
              </span>
            </button>

            {showLanguageDropdown && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-obsidian-900 border border-gold-500/25 shadow-2xl p-1.5 z-50 backdrop-blur-xl">
                <div className="px-2.5 py-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Emotional Dialect
                </div>
                {languages.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLanguage(item.code);
                      setShowLanguageDropdown(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex flex-col transition-all ${
                      state.language === item.code
                        ? "bg-gold-500/15 text-gold-300 border border-gold-500/30"
                        : "text-zinc-300 hover:bg-white/5"
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="text-[10px] text-zinc-400">{item.sub}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Interactive State Mode Switcher (Empty State vs Dynamic Demo) */}
          <button
            onClick={() => setShowStateSwitchModal((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-950/60 to-obsidian-900 border border-rose-500/25 hover:border-rose-400/50 text-[11px] font-medium text-rose-200 transition-all shadow-sm"
            title="Inspect Empty vs Active Dynamic State"
          >
            <Sparkles className="w-3 h-3 text-rose-400 animate-pulse" />
            <span className="hidden sm:inline">
              {hasRealActivity ? "Active Mode" : "New User Mode"}
            </span>
            <span className="sm:hidden text-[10px]">
              {hasRealActivity ? "Live" : "Empty"}
            </span>
          </button>
        </div>
      </div>

      {/* State Switcher Drawer / Dropdown */}
      {showStateSwitchModal && (
        <div className="border-t border-gold-500/15 bg-obsidian-900/95 px-4 py-3 sm:px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <Info className="w-4 h-4 text-gold-400 shrink-0" />
              <span>
                <strong>Behavioral Verification:</strong> Test DUO in both <em>Pristine Empty State</em> (no fake scores) and <em>Progressive Active State</em>.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  resetToEmptyState();
                  setShowStateSwitchModal(false);
                }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  !hasRealActivity
                    ? "bg-gold-500/20 border-gold-400 text-gold-300"
                    : "bg-obsidian-800/80 border-white/10 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Pristine Empty State
              </button>
              <button
                onClick={() => {
                  loadInteractiveDemo();
                  setShowStateSwitchModal(false);
                }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  hasRealActivity
                    ? "bg-rose-500/20 border-rose-400 text-rose-200 shadow-rose-glow/20"
                    : "bg-obsidian-800/80 border-white/10 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Load Real Couple Journey
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

```

---

## Component: BottomNav (4 Mature Tabs)

- **File Path:** `src/components/layout/BottomNav.tsx`
- **Lines of Code:** 107 lines
- **Size:** 3.32 KB

```tsx
"use client";

import React from "react";
import { useRelationship } from "@/context/RelationshipContext";
import { TabType } from "@/types";
import { Compass, ScanEye, Send, Sparkles } from "lucide-react";

interface NavItem {
  id: TabType;
  label: string;
  sub: string;
  icon: React.ElementType;
  badge?: string;
}

export function BottomNav() {
  const { activeTab, setActiveTab, state } = useRelationship();

  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      sub: "Pulse & Habit",
      icon: Compass,
      badge: !state.dailyHabit.completed ? "Today" : undefined,
    },
    {
      id: "decode",
      label: "Decode",
      sub: "Psych X-Ray",
      icon: ScanEye,
    },
    {
      id: "rewrite",
      label: "Before You Send",
      sub: "De-escalate",
      icon: Send,
    },
    {
      id: "sync",
      label: "Spark & Sync",
      sub: "Love DNA",
      icon: Sparkles,
      badge: state.unlockedVibeCards.length > 0 ? `${state.unlockedVibeCards.length}` : undefined,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-obsidian-950/90 backdrop-blur-2xl border-t border-gold-500/15 py-2 px-3 sm:px-6">
      <div className="max-w-xl mx-auto flex items-center justify-around gap-1 sm:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 sm:px-4 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "text-gold-300"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
              }`}
            >
              {/* Active glow background pill */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-b from-gold-500/15 via-rose-500/10 to-transparent rounded-2xl border border-gold-500/25 shadow-gold-glow/10 -z-10" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isActive ? "scale-110 text-gold-400" : "group-hover:scale-105"
                  }`}
                />
                {item.badge && (
                  <span
                    className={`absolute -top-1 -right-2 text-[9px] font-semibold px-1 py-0.2 rounded-full leading-tight border ${
                      item.badge === "Today"
                        ? "bg-rose-500/25 border-rose-400/40 text-rose-300"
                        : "bg-gold-500/20 border-gold-400/40 text-gold-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] sm:text-xs font-medium tracking-tight mt-1 transition-colors ${
                  isActive ? "text-gold-200 font-semibold" : "text-zinc-400"
                }`}
              >
                {item.label}
              </span>

              <span className="text-[9px] text-zinc-400 hidden xs:block font-light">
                {item.sub}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

```

---

## Component: SecurityBadge (Trust Architecture)

- **File Path:** `src/components/layout/SecurityBadge.tsx`
- **Lines of Code:** 45 lines
- **Size:** 1.81 KB

```tsx
"use client";

import React from "react";
import { ShieldCheck, Lock } from "lucide-react";

interface SecurityBadgeProps {
  className?: string;
  variant?: "full" | "compact";
}

export function SecurityBadge({ className = "", variant = "full" }: SecurityBadgeProps) {
  if (variant === "compact") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-obsidian-900/80 border border-gold-500/20 text-[11px] text-gold-300 font-medium tracking-wide shadow-sm backdrop-blur-md ${className}`}
      >
        <Lock className="w-3 h-3 text-gold-400 shrink-0" />
        <span>100% Private & Ephemeral</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-r from-obsidian-900/90 via-obsidian-850/95 to-obsidian-900/90 border border-gold-500/25 p-3 sm:p-3.5 shadow-luxury-card backdrop-blur-md ${className}`}
    >
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-[13px] text-zinc-200 font-medium leading-relaxed">
            <span className="text-gold-400 font-semibold">🔒 100% Private & Encrypted</span>{" "}
            · Chats are analyzed in real-time and never stored.
          </p>
          <p className="text-[11px] text-zinc-400 font-normal mt-0.5">
            Client-side memory buffer · Zero server training · Complete relationship confidentiality
          </p>
        </div>
      </div>
    </div>
  );
}

```

---

