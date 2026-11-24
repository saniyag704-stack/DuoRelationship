# Requirement Specification & Source Code
## REQ_21: Weekly Vibe & Chemistry Archetype Report Component

> **File Path:** `src/components/home/WeeklyVibeReport.tsx`  
> **Layer:** `Dashboard Widget` · **Category:** `UI Component`  
> **Lines of Code:** 229 lines · **Size:** 10.07 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

Reframes relationship dynamics as complementary strengths (e.g. Calm Anchor & Passionate Storm) rather than toxic incompatibilities.

---

### 📋 2. Functional & Technical Requirements

1. **Displays active unlocked couple archetype with superpower and growth edge.:** Displays active unlocked couple archetype with superpower and growth edge.
2. **Provides archetype switcher to preview other resonance dynamics.:** Provides archetype switcher to preview other resonance dynamics.
3. **1-click export/share for social growth.:** 1-click export/share for social growth.

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* Playwright verifies archetype cards render with superpower and harmony score.

---

### 💻 5. Complete Verbatim Source Code

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
