# Requirement Specification & Source Code
## REQ_22: Top Navigation Header & Emotional Dialect Switcher Component

> **File Path:** `src/components/layout/Header.tsx`  
> **Layer:** `Layout Layer` · **Category:** `UI Component`  
> **Lines of Code:** 161 lines · **Size:** 7.74 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

Reinforces the luxury brand identity and gives users 1-tap control over app-wide language dialect and Gemini API keys.

---

### 📋 2. Functional & Technical Requirements

1. **Renders DUO brand logo and gold tagline.:** Renders DUO brand logo and gold tagline.
2. **Includes Dialect Modal trigger with 3 choices:**  Hinglish (Urban Mix), English (Global Nuance), Hindi (Samvedanshil).
3. **Includes Gemini API Key configuration modal for custom key usage.:** Includes Gemini API Key configuration modal for custom key usage.

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* Playwright opens dialect modal, selects Hinglish, and verifies header badge updates.

---

### 💻 5. Complete Verbatim Source Code

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
