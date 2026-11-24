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
