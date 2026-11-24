# Requirement Specification & Source Code
## REQ_19: Hero Action Card: 8-Second Chat Screenshot Decoder

> **File Path:** `src/components/home/PrimaryDecodeAction.tsx`  
> **Layer:** `Dashboard Widget` · **Category:** `UI Component`  
> **Lines of Code:** 68 lines · **Size:** 3.75 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

High-visibility invitation to de-escalate tension immediately with zero cognitive load.

---

### 📋 2. Functional & Technical Requirements

1. **Prominent glowing hero button navigating directly to Decode tab.:** Prominent glowing hero button navigating directly to Decode tab.
2. **Highlights the core promise:**  "Stop guessing their tone. Reveal the hidden emotion in 8 seconds."

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* Playwright clicks hero card and asserts activeTab switches to decode.

---

### 💻 5. Complete Verbatim Source Code

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
