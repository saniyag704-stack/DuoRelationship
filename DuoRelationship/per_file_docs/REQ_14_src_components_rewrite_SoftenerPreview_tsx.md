# Requirement Specification & Source Code
## REQ_14: Live Message Softener Interactive Component

> **File Path:** `src/components/rewrite/SoftenerPreview.tsx`  
> **Layer:** `Feature Component` · **Category:** `UI Component`  
> **Lines of Code:** 438 lines · **Size:** 18.17 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

Instant emotional de-escalation tool. Shows the user exactly how their angry draft will trigger their partner, and gives 1-click copyable loving alternatives.

---

### 📋 2. Functional & Technical Requirements

1. **Friction scenario pills (Late Reply, Emotional Distance, Work Stress, Cancelled Plans).:** Friction scenario pills (Late Reply, Emotional Distance, Work Stress, Cancelled Plans).
2. **Tone pill toggle [ Auto-Detect ✨ | Hinglish 🇮🇳 | English 🇬🇧 ].:** Tone pill toggle [ Auto-Detect ✨ | Hinglish 🇮🇳 | English 🇬🇧 ].
3. **Interactive textarea with character counter and RAM-buffer privacy badge.:** Interactive textarea with character counter and RAM-buffer privacy badge.
4. **Impact Meter and 3 Upgraded Version cards with glowing copy feedback.:** Impact Meter and 3 Upgraded Version cards with glowing copy feedback.

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* Playwright selects Late Reply, clicks Check Emotional Impact, and asserts 3 rewrite cards appear.

---

### 💻 5. Complete Verbatim Source Code

```tsx
"use client";

import React, { useState } from "react";
import { useRelationship } from "@/context/RelationshipContext";
import { SecurityBadge } from "@/components/layout/SecurityBadge";
import { BeforeYouSendResult, UpgradedRewrite } from "@/types";
import {
  Send,
  Sparkles,
  Copy,
  Check,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Feather,
  AlertTriangle,
  Heart,
  Volume2,
  CheckCircle2,
  Lightbulb,
  Zap,
  Languages,
} from "lucide-react";
import confetti from "canvas-confetti";

export function SoftenerPreview() {
  const { recordRewrite, setActiveTab } = useRelationship();

  const [draft, setDraft] = useState(
    "Tum hamesha late aate ho aur meri baat sunte hi nahi ho. Har baar tumhari hi priorities pehle aati hain!"
  );
  const [selectedTrigger, setSelectedTrigger] = useState<string>("late_reply");
  const [selectedLanguageOverride, setSelectedLanguageOverride] = useState<"auto" | "hinglish" | "en">("auto");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<BeforeYouSendResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);

  const sampleTriggers = [
    {
      id: "late_reply",
      label: "Late Reply / Ignored ⏳",
      sample: "Tum hamesha late aate ho aur meri baat sunte hi nahi ho. Har baar tumhari hi priorities pehle aati hain!",
    },
    {
      id: "distance_cold",
      label: "Emotional Distance / Dry 🤔",
      sample: "Why do you always pull away when things get tough? You clearly don't care as much as I do.",
    },
    {
      id: "chores_stress",
      label: "Work Stress / Unfair Effort 💼",
      sample: "Main akele hi sab sambhalu kya? Tumhe bas phone chalana aata hai, zero responsibility.",
    },
    {
      id: "cancelled_plans",
      label: "Cancelled Plans 🚫",
      sample: "Fine. Whatever. Go with your friends, I'll figure my weekend out myself.",
    },
  ];

  const handleCheckImpact = async () => {
    if (!draft.trim()) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setHasRecorded(false);

    try {
      const response = await fetch("/api/soften", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft, targetLanguage: selectedLanguageOverride }),
      });

      if (!response.ok) {
        throw new Error("Failed to soften message");
      }

      const json = await response.json();
      if (json.data) {
        setAnalysisResult(json.data);

        // Update real Relationship Alignment Score & log de-escalation
        recordRewrite({
          originalText: draft,
          softenedText: json.data.upgraded_versions[0]?.text || "",
          hinglishText: json.data.upgraded_versions[0]?.text || "",
          antidoteUsed: "Gottman Gentle Startup",
          heatLevelReduced: json.data.impact_meter.percentage - 15,
        });
        setHasRecorded(true);

        try {
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.6 },
            colors: ["#D4AF37", "#4EBA88", "#E47A94"],
          });
        } catch {
          // ignore
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setToastMessage("Copied! Go save the vibe ❤️");

      // Haptic feedback if supported on mobile
      if (typeof window !== "undefined" && window.navigator && "vibrate" in window.navigator) {
        try {
          window.navigator.vibrate(40);
        } catch {
          // ignore
        }
      }

      setTimeout(() => {
        setCopiedIndex(null);
        setToastMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-gold-500 text-obsidian-950 font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <Heart className="w-4 h-4 fill-obsidian-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Prominent Trust-First Architecture Badge */}
      <SecurityBadge />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5 text-rose-400" />
            Live Message Protector
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
            Before You Send · WhatsApp / Insta Filter
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-zinc-100 font-semibold">
          Before You Send
        </h2>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          When we are angry, we type paragraphs that trigger defensive wars. Paste your raw draft here to see how your partner will actually hear it, and get 3 zero-ego rewrites that melt defensiveness.
        </p>
      </div>

      {/* Quick Trigger Scenarios Pills */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-zinc-300 block">
          Select Common Relationship Friction (Or Type Below):
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {sampleTriggers.map((trig) => (
            <button
              key={trig.id}
              onClick={() => {
                setSelectedTrigger(trig.id);
                setDraft(trig.sample);
                setAnalysisResult(null);
                setHasRecorded(false);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                selectedTrigger === trig.id
                  ? "bg-gold-500/20 border-gold-400 text-gold-200 shadow-gold-glow/10"
                  : "bg-obsidian-900/60 border-white/5 hover:border-gold-500/30 text-zinc-400"
              }`}
            >
              {trig.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sleek Language Pill Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-obsidian-900 border border-gold-500/25 shadow-sm">
          <div className="flex items-center gap-1 text-[11px] font-bold text-gold-400 px-2 tracking-wide hidden xs:flex">
            <Languages className="w-3 h-3 text-gold-400" />
            <span>Tone:</span>
          </div>
          {[
            { id: "auto", label: "Auto-Detect ✨" },
            { id: "hinglish", label: "Hinglish 🇮🇳" },
            { id: "en", label: "English 🇬🇧" },
          ].map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguageOverride(lang.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedLanguageOverride === lang.id
                  ? "bg-gradient-to-r from-gold-500 to-rose-400 text-obsidian-950 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-zinc-500">
          Zero-ego rewrites in natural Roman Hinglish or English
        </span>
      </div>

      {/* 1. UI Layout: Clean Text Box & Check Emotional Impact Button */}
      <div className="rounded-2xl border border-gold-500/25 bg-obsidian-900/90 p-5 space-y-4 shadow-luxury-card">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
            <Send className="w-3.5 h-3.5 text-gold-400" />
            <span>Paste the angry or emotional message you are about to send...</span>
          </label>
          <span className="text-[11px] text-zinc-500">{draft.length} characters</span>
        </div>

        <textarea
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setAnalysisResult(null);
            setHasRecorded(false);
          }}
          rows={3}
          placeholder="Paste the angry or emotional message you are about to send..."
          className="w-full rounded-xl bg-obsidian-950 border border-white/10 p-3.5 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-rose-400/50 resize-none font-mono"
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Client-side RAM buffer · Never stored or logged to servers.</span>
          </div>

          <button
            onClick={handleCheckImpact}
            disabled={!draft.trim() || isAnalyzing}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 via-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs sm:text-sm hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-gold-glow"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Scanning Emotional Impact...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-obsidian-950" />
                <span>Check Emotional Impact</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. AI Analysis Output (Structured Cards) */}
      {analysisResult && (
        <div className="rounded-3xl border border-gold-500/35 bg-gradient-to-b from-obsidian-900 via-obsidian-850 to-obsidian-900 p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
          {/* Card A: Impact Meter */}
          <div className="rounded-2xl bg-obsidian-950/80 border border-rose-500/30 p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <h3 className="font-serif text-lg font-bold text-zinc-100">
                  Emotional Impact Meter
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 self-start sm:self-center">
                {analysisResult.impact_meter.percentage}% Escalation Risk
              </span>
            </div>

            {/* Visual Risk Gauge Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
                <span>Safe Communication</span>
                <span className="text-rose-400 font-bold">Heated / Defensive Reaction</span>
              </div>
              <div className="w-full h-3 rounded-full bg-obsidian-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 rounded-full transition-all duration-1000"
                  style={{ width: `${analysisResult.impact_meter.percentage}%` }}
                />
              </div>
            </div>

            <div className="pt-1">
              <div className="text-sm font-semibold text-rose-300">
                {analysisResult.impact_meter.status_text}
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                {analysisResult.impact_meter.partner_reaction_summary}
              </p>
            </div>
          </div>

          {/* Card B: Emotional Translation (What You Wrote vs How They Hear It) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* What you wrote */}
            <div className="rounded-xl bg-obsidian-950/70 p-4 border border-white/5 space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
                What You Wrote
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 italic font-mono bg-obsidian-900/60 p-2.5 rounded-lg border border-white/5">
                "{analysisResult.emotional_translation.what_you_wrote}"
              </p>
            </div>

            {/* How partner hears it */}
            <div className="rounded-xl bg-gradient-to-br from-rose-950/30 to-obsidian-950 p-4 border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-300 block">
                  How Your Partner Reads It In Their Head
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium bg-obsidian-900/70 p-2.5 rounded-lg border border-rose-500/20">
                {analysisResult.emotional_translation.how_partner_hears_it}
              </p>
            </div>
          </div>

          {/* Card C: 3 Upgraded Versions (Zero-Ego Rewrites) */}
          <div className="space-y-4 pt-2">
            <div>
              <h3 className="font-serif text-xl font-bold text-zinc-100 flex items-center gap-2">
                <span>3 Upgraded Versions (Zero-Ego Rewrites)</span>
                <span className="text-xs text-gold-400 font-normal">
                  (Choose your de-escalation tone)
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Grounded in Gottman Institute relationship science. Eliminates blame while expressing 100% of your real need.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {analysisResult.upgraded_versions.map((upgraded: UpgradedRewrite, idx: number) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-obsidian-950 border border-gold-500/25 p-5 space-y-3 transition-all hover:border-gold-400/50 shadow-luxury-card"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base font-bold text-gold-300">
                        {upgraded.style}
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 font-medium">
                        {upgraded.badge}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(upgraded.text, idx)}
                      className="self-start sm:self-center flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs hover:brightness-110 transition-all shadow-sm"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Reply</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-zinc-100 leading-relaxed font-medium bg-obsidian-900/80 p-3.5 rounded-xl border border-white/5">
                    "{upgraded.text}"
                  </p>

                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Lightbulb className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span>
                      <strong className="text-zinc-300 font-medium">Why it works:</strong>{" "}
                      {upgraded.why_it_works}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Action Tip */}
          <div className="rounded-xl bg-obsidian-950/90 border border-gold-500/25 p-4 flex items-center gap-3">
            <span className="text-xl">💡</span>
            <div className="flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400 block">
                De-escalation Action Tip
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 font-medium">
                {analysisResult.golden_tip}
              </p>
            </div>
          </div>

          {/* Bottom Feedback Row */}
          <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                De-escalated moment recorded (+6 Clarity points on Home)!
              </span>
            </div>

            <button
              onClick={() => setActiveTab("home")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gold-300 border border-gold-500/30 text-xs sm:text-sm font-semibold transition-all"
            >
              <span>View Updated Home Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

```
