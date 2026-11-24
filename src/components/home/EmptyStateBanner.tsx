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
