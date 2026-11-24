"use client";

import React, { useState } from "react";
import { useRelationship } from "@/context/RelationshipContext";
import { SecurityBadge } from "@/components/layout/SecurityBadge";
import { COUPLE_VIBE_ARCHETYPES } from "@/lib/constants";
import { SimulationResult, CoupleVibeCard } from "@/types";
import {
  Sparkles,
  Heart,
  Battery,
  BatteryCharging,
  BatteryLow,
  BatteryMedium,
  Share2,
  Users,
  Compass,
  Copy,
  Check,
  Send,
  MessageCircle,
  Lightbulb,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Download,
  Flame,
  Volume2,
  Key,
  Languages,
} from "lucide-react";
import confetti from "canvas-confetti";

export function SyncPreview() {
  const { state, recordRewrite, setActiveTab } = useRelationship();

  // MODULE 1: Emotional Battery State
  const [batteryLevel, setBatteryLevel] = useState<number>(65);
  const [hugSent, setHugSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // MODULE 2: Safe Conversation Simulator State
  const [simTopic, setSimTopic] = useState("Need Quality Time (Without Sounding Needy)");
  const [simDraft, setSimDraft] = useState(
    "You're always working or on your phone lately. Can we actually spend time together without distractions?"
  );
  const [simLanguageOverride, setSimLanguageOverride] = useState<"auto" | "hinglish" | "en">("auto");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [hasLoggedPractice, setHasLoggedPractice] = useState(false);

  // MODULE 3: Love DNA Card Generator State
  const [selectedTheme, setSelectedTheme] = useState<"obsidian" | "rose" | "emerald">("obsidian");
  const [cardAspectRatio, setCardAspectRatio] = useState<"story" | "square">("story");
  const [activeArchetype, setActiveArchetype] = useState<CoupleVibeCard>(
    state.unlockedVibeCards.length > 0 ? state.unlockedVibeCards[0] : COUPLE_VIBE_ARCHETYPES[0]
  );
  const [copiedCardText, setCopiedCardText] = useState(false);

  const getBatteryStatus = (level: number) => {
    if (level <= 25) {
      return {
        label: "Low Battery · Emotional Fatigue",
        subtext: "Stressed, depleted from external pressure. In need of quiet comfort and zero demands.",
        color: "text-rose-400",
        border: "border-rose-500/40",
        bg: "from-rose-950/40 to-obsidian-900",
        barColor: "bg-rose-500",
        icon: BatteryLow,
      };
    }
    if (level <= 50) {
      return {
        label: "Decompressing · Gentle Energy",
        subtext: "Processing workday thoughts. Slow pacing, warmth, and low-friction communication appreciated.",
        color: "text-amber-400",
        border: "border-amber-500/40",
        bg: "from-amber-950/40 to-obsidian-900",
        barColor: "bg-amber-500",
        icon: BatteryMedium,
      };
    }
    if (level <= 75) {
      return {
        label: "Balanced & Attuned · Present",
        subtext: "Grounded and ready for meaningful check-ins, relaxed banter, and attentive listening.",
        color: "text-gold-300",
        border: "border-gold-500/40",
        bg: "from-gold-950/30 to-obsidian-900",
        barColor: "bg-gradient-to-r from-gold-500 to-amber-400",
        icon: Battery,
      };
    }
    return {
      label: "Full Battery · Joyful & Energized",
      subtext: "Feeling radiant, playful, and emotionally expansive. Ready for spontaneous quality time or deep talks.",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "from-emerald-950/40 to-obsidian-900",
      barColor: "bg-gradient-to-r from-emerald-500 to-gold-400",
      icon: BatteryCharging,
    };
  };

  const batteryStatus = getBatteryStatus(batteryLevel);
  const BatteryIcon = batteryStatus.icon;

  // Send Digital Hug Handler
  const handleSendDigitalHug = () => {
    setHugSent(true);
    setToastMessage("Digital Hug sent! WhatsApp link ready 🤍");

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#FFFFFF", "#D4AF37", "#E47A94"],
      });
    } catch {
      // ignore
    }

    const shareText = `🤍 Sending you a warm digital hug from DUO! My emotional battery is at ${batteryLevel}% (${batteryStatus.label}). Thinking of you! Let's sync up tonight: https://duo.app/sync/pair?code=DUO-7842-AURUM`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

    // Try native share or open WhatsApp, fallback to clipboard
    if (typeof window !== "undefined") {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText);
      }
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 400);
    }

    setTimeout(() => {
      setHugSent(false);
      setToastMessage(null);
    }, 4000);
  };

  // Safe Conversation Simulator Handler
  const handleSimulate = async () => {
    if (!simDraft.trim()) return;
    setIsSimulating(true);
    setSimResult(null);
    setHasLoggedPractice(false);

    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: simTopic,
          userApproach: simDraft,
          targetLanguage: simLanguageOverride,
        }),
      });

      if (!response.ok) {
        throw new Error("Simulation request failed");
      }

      const json = await response.json();
      if (json.data) {
        setSimResult(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleCopySimScript = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedScript(true);
      setToastMessage("Refined loving script copied! Safe to speak ❤️");
      setTimeout(() => {
        setCopiedScript(false);
        setToastMessage(null);
      }, 3000);
    }
  };

  const handleLogPracticeToScore = () => {
    if (!simResult || hasLoggedPractice) return;
    recordRewrite({
      originalText: simDraft,
      softenedText: simResult.refined_script,
      hinglishText: simResult.hinglish_alternative || simResult.refined_script,
      antidoteUsed: "Conversation Simulation & Practice",
      heatLevelReduced: 60,
    });
    setHasLoggedPractice(true);

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.5 },
        colors: ["#D4AF37", "#4EBA88", "#E47A94"],
      });
    } catch {
      // ignore
    }
  };

  // Love DNA Card Share Handler
  const handleShareLoveDnaCard = () => {
    const cardText = `✨ DUO Love DNA Archetype: ${activeArchetype.archetype}
"${activeArchetype.quote}"
Relationship Superpower: ${activeArchetype.superpower}
Weekly Connection: ${state.stats.deEscalatedMoments || 5} Moments Softened · Alignment: ${state.stats.score || 92}%
🔒 100% Private Emotional Co-Pilot: https://duo.app`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(cardText);
      setCopiedCardText(true);
      setToastMessage("Instagram Love DNA Card copied to clipboard! ✨");

      try {
        confetti({
          particleCount: 55,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#E47A94", "#4EBA88"],
        });
      } catch {
        // ignore
      }

      setTimeout(() => {
        setCopiedCardText(false);
        setToastMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="space-y-8 pb-28">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-gold-500 text-obsidian-950 font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <Heart className="w-4 h-4 fill-obsidian-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Prominent Trust Badge */}
      <SecurityBadge />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Spark & Sync · Connection Studio
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20">
            Emotional Battery · Simulator · Love DNA
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-zinc-100 font-semibold">
          Spark & Sync Studio
        </h2>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Sync your daily emotional battery with your partner, rehearse hard conversations in a safe psychological sandbox, and unlock shareable Instagram-ready Love DNA cards.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* MODULE 1: COUPLE EMOTIONAL BATTERY & DIGITAL HUG (SYNC MODE) */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-gold-400">
              <Battery className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-100">
              Module 1: Emotional Battery & Digital Hug
            </h3>
          </div>
          <span className="text-xs text-gold-400 font-medium hidden sm:inline">
            Sync Mode Active
          </span>
        </div>

        <div className={`rounded-3xl border ${batteryStatus.border} bg-gradient-to-br ${batteryStatus.bg} p-6 sm:p-7 shadow-luxury-card space-y-6 transition-all duration-300`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
                Your Current Emotional Capacity
              </span>
              <div className="flex items-center gap-2.5 mt-0.5">
                <BatteryIcon className={`w-5 h-5 ${batteryStatus.color}`} />
                <h4 className={`font-serif text-xl sm:text-2xl font-bold ${batteryStatus.color}`}>
                  {batteryLevel}% — {batteryStatus.label}
                </h4>
              </div>
              <p className="text-xs text-zinc-300 mt-1 max-w-lg leading-relaxed">
                {batteryStatus.subtext}
              </p>
            </div>

            {/* Partner's Sync Status Indicator */}
            <div className="rounded-2xl bg-obsidian-950/80 border border-white/10 p-3.5 flex items-center gap-3 self-start sm:self-center shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-xs">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold">
                  Partner's Battery
                </span>
                <span className="font-medium text-zinc-200">
                  {state.partnerName}: <strong>60% Balanced</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Emotional Battery Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
              <span>0% (Empty / Need Care)</span>
              <span>50% (Decompressing)</span>
              <span>100% (High Energy / Playful)</span>
            </div>

            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={batteryLevel}
                onChange={(e) => setBatteryLevel(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none bg-obsidian-950 border border-white/10 cursor-pointer accent-gold-400 focus:outline-none"
              />
            </div>

            {/* Quick Battery Preset Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                { label: "25% (Low / Work Stress)", val: 25 },
                { label: "45% (Decompressing)", val: 45 },
                { label: "65% (Balanced)", val: 65 },
                { label: "90% (Happy & Energized)", val: 90 },
              ].map((preset) => (
                <button
                  key={preset.val}
                  onClick={() => setBatteryLevel(preset.val)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                    batteryLevel === preset.val
                      ? "bg-gold-500/20 border-gold-400 text-gold-200"
                      : "bg-obsidian-900/60 border-white/5 hover:border-gold-500/20 text-zinc-400"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Digital Hug Action Row */}
          <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs text-zinc-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Let your partner know your capacity so expectations stay gentle.
              </span>
            </div>

            <button
              onClick={handleSendDigitalHug}
              className={`w-full sm:w-auto relative group overflow-hidden px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5 shadow-gold-glow ${
                hugSent ? "animate-pulse" : ""
              }`}
            >
              <Heart className="w-4 h-4 text-obsidian-950 fill-obsidian-950 group-hover:scale-125 transition-transform" />
              <span>Send Digital Hug / Thinking of You 🤍</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODULE 2: SAFE CONVERSATION SIMULATOR (PRACTICE DIFFICULT TALKS) */}
      {/* ========================================================================= */}
      <section className="space-y-4 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400">
              <MessageCircle className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-100">
              Module 2: Safe Conversation Simulator
            </h3>
          </div>
          <span className="text-xs text-rose-300 font-medium">
            Practice Difficult Talks
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
          Rehearse sensitive requests before saying them out loud. DUO simulates how your partner will feel and refines your draft into a loving, zero-blame script.
        </p>

        {/* Practice Topic Pills */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-zinc-300 block">
            Select a Vulnerable Scenario to Practice:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              {
                topic: "Need Quality Time (Hinglish) ⏳",
                draft: "Tumhe toh bas apne kaam aur phone se matlab hai. Kabhi hamare liye bhi thoda time nikal liya karo na bina distraction ke?",
              },
              {
                topic: "Need Quality Time (English) ⏳",
                draft: "You're always working or on your phone lately. Can we actually spend time together without distractions?",
              },
              {
                topic: "Work Exhaustion / Space (Hinglish) 🧘",
                draft: "Office ke baad main bohot tired hoon, please mujhe aadhe ghante shaanti se akele rehne do.",
              },
              {
                topic: "Need Solo Space After Work 🧘",
                draft: "I just need you to not talk to me for 30 minutes when I get home. I'm exhausted.",
              },
              {
                topic: "Finances & Shared Budget 💳",
                draft: "We're spending way too much money lately and it stresses me out. You need to curb impulse buys.",
              },
              {
                topic: "Unequal Mental Load / Chores 🧹",
                draft: "Why do I have to ask you five times to do basic stuff around here? I'm not your manager.",
              },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSimTopic(item.topic);
                  setSimDraft(item.draft);
                  setSimResult(null);
                  setHasLoggedPractice(false);
                }}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                  simTopic === item.topic
                    ? "bg-rose-500/20 border-rose-400 text-rose-200 shadow-rose-glow/10"
                    : "bg-obsidian-900/70 border-white/5 hover:border-gold-500/25 text-zinc-400"
                }`}
              >
                {item.topic}
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
                onClick={() => setSimLanguageOverride(lang.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  simLanguageOverride === lang.id
                    ? "bg-gradient-to-r from-gold-500 to-rose-400 text-obsidian-950 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-zinc-500">
            Simulates attachment reactions & generates tender startup scripts
          </span>
        </div>

        {/* Draft Area */}
        <div className="rounded-2xl border border-gold-500/25 bg-obsidian-900/90 p-5 space-y-4 shadow-luxury-card">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-zinc-300">
              Your Draft Words (How you initially feel like saying it):
            </label>
            <span className="text-[11px] text-zinc-500">{simDraft.length} characters</span>
          </div>

          <textarea
            value={simDraft}
            onChange={(e) => {
              setSimDraft(e.target.value);
              setSimResult(null);
              setHasLoggedPractice(false);
            }}
            rows={3}
            placeholder="Type your draft approach here..."
            className="w-full rounded-xl bg-obsidian-950 border border-white/10 p-3.5 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-rose-400/50 resize-none font-mono"
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
            <span className="text-[11px] text-zinc-400">
              DUO's behavioral coach will simulate partner receptivity and craft a gentle startup.
            </span>

            <button
              onClick={handleSimulate}
              disabled={!simDraft.trim() || isSimulating}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-rose-400 text-obsidian-950 font-bold text-xs sm:text-sm hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-gold-glow"
            >
              {isSimulating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Simulating Partner Reaction...</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4" />
                  <span>Practice & Refine Approach</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Simulator Results Output */}
        {simResult && (
          <div className="rounded-3xl border border-gold-500/35 bg-gradient-to-b from-obsidian-900 via-obsidian-850 to-obsidian-900 p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in duration-300">
            {/* Readiness & Partner Perspective */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-300 block">
                  Simulated Conversation Readiness
                </span>
                <h4 className="font-serif text-xl font-bold text-zinc-100">
                  {simResult.readiness_score}% Connection Safety
                </h4>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold self-start sm:self-center">
                Vulnerability Filter Applied
              </div>
            </div>

            {/* How partner feels */}
            <div className="rounded-xl bg-obsidian-950/70 p-4 border border-rose-500/20 space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-300 block">
                🧠 How Your Partner Might Hear It Initially
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {simResult.partner_perspective}
              </p>
            </div>

            {/* Refined Loving Script */}
            <div className="rounded-2xl bg-obsidian-950 border border-gold-500/30 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-gold-300 uppercase tracking-wider block">
                    ✨ Refined Loving Script (Zero-Blame Approach)
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Engineered to trigger curiosity and affection rather than defense.
                  </span>
                </div>

                <button
                  onClick={() => handleCopySimScript(simResult.refined_script)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs hover:brightness-110 transition-all shrink-0"
                >
                  {copiedScript ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-sm sm:text-base text-zinc-100 font-medium leading-relaxed bg-obsidian-900/90 p-4 rounded-xl border border-white/5">
                "{simResult.refined_script}"
              </p>

              {simResult.hinglish_alternative && (
                <div className="p-3.5 rounded-xl bg-obsidian-900/60 border border-rose-500/20 text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  <span className="text-[10px] uppercase font-semibold text-rose-300 block mb-1">
                    Hinglish Natural Conversation
                  </span>
                  "{simResult.hinglish_alternative}"
                </div>
              )}
            </div>

            {/* Coaching Tips */}
            <div className="rounded-xl bg-obsidian-950/80 p-4 border border-white/5 space-y-2">
              <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-gold-400" />
                Coach's Behavioral Tips for Delivery:
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {simResult.coaching_tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Row */}
            <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-zinc-400">
                Practicing before speaking protects your bond from accidental wounds.
              </span>

              {!hasLoggedPractice ? (
                <button
                  onClick={handleLogPracticeToScore}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gold-500/20 border border-gold-400 text-gold-300 font-semibold text-xs sm:text-sm hover:bg-gold-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Log Practice (+6 Clarity on Home)</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Logged to your Relationship Alignment Score!</span>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* MODULE 3: VIRAL "COUPLE LOVE DNA" CARD GENERATOR */}
      {/* ========================================================================= */}
      <section className="space-y-4 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-gold-400">
              <Share2 className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-100">
              Module 3: Viral Couple Love DNA Card Generator
            </h3>
          </div>
          <span className="text-xs text-gold-400 font-medium">
            Instagram-Story Ready
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
          Celebrate your communication milestones with an aesthetic, shareable story card. Highlights your couple superpower and harmony — with strictly <strong>zero private chats exposed</strong>.
        </p>

        {/* Card Customization Controls (Theme & Aspect Ratio) */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-obsidian-900/80 border border-white/5">
          {/* Theme Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium">Card Theme:</span>
            <div className="flex items-center gap-1.5">
              {[
                { id: "obsidian", label: "Obsidian Gold", border: "border-gold-400" },
                { id: "rose", label: "Velvet Rose", border: "border-rose-400" },
                { id: "emerald", label: "Emerald Sanctuary", border: "border-emerald-400" },
              ].map((thm) => (
                <button
                  key={thm.id}
                  onClick={() => setSelectedTheme(thm.id as any)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    selectedTheme === thm.id
                      ? `${thm.border} bg-white/10 text-zinc-100 font-semibold shadow-sm`
                      : "border-white/5 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {thm.label}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium">Format:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCardAspectRatio("story")}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  cardAspectRatio === "story"
                    ? "border-gold-400 bg-gold-500/20 text-gold-300 font-semibold"
                    : "border-white/5 text-zinc-400"
                }`}
              >
                Story (9:16)
              </button>
              <button
                onClick={() => setCardAspectRatio("square")}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  cardAspectRatio === "square"
                    ? "border-gold-400 bg-gold-500/20 text-gold-300 font-semibold"
                    : "border-white/5 text-zinc-400"
                }`}
              >
                Square (1:1)
              </button>
            </div>
          </div>
        </div>

        {/* Archetype Quick Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {COUPLE_VIBE_ARCHETYPES.map((arch) => (
            <button
              key={arch.id}
              onClick={() => setActiveArchetype(arch)}
              className={`text-left p-3 rounded-xl border text-xs transition-all ${
                activeArchetype.id === arch.id
                  ? "bg-gold-500/15 border-gold-400 text-zinc-100 shadow-gold-glow/20"
                  : "bg-obsidian-900/60 border-white/5 hover:border-gold-500/20 text-zinc-400"
              }`}
            >
              <span className="text-[10px] text-gold-400 font-semibold uppercase block mb-0.5">
                Archetype
              </span>
              <span className="font-serif font-bold text-zinc-100 block">
                {arch.archetype}
              </span>
              <span className="text-[11px] text-gold-300 mt-1 block">
                {arch.harmonyScore}% Harmony
              </span>
            </button>
          ))}
        </div>

        {/* The Viral Love DNA Card Visual Canvas */}
        <div className="flex justify-center pt-2">
          <div
            className={`relative overflow-hidden rounded-3xl border shadow-2xl transition-all duration-300 ${
              cardAspectRatio === "story"
                ? "w-full max-w-sm min-h-[580px] p-7 flex flex-col justify-between"
                : "w-full max-w-md min-h-[440px] p-6 flex flex-col justify-between"
            } ${
              selectedTheme === "obsidian"
                ? "bg-gradient-to-br from-obsidian-950 via-obsidian-900 to-amber-950/40 border-gold-400/40"
                : selectedTheme === "rose"
                ? "bg-gradient-to-br from-obsidian-950 via-rose-950 to-obsidian-900 border-rose-400/40"
                : "bg-gradient-to-br from-obsidian-950 via-emerald-950/50 to-obsidian-900 border-emerald-400/40"
            }`}
          >
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-gold-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-44 h-44 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Card Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center font-serif text-sm font-bold text-gold-300">
                  D
                </div>
                <div>
                  <div className="font-serif text-base font-bold tracking-widest text-zinc-100">
                    DUO
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-gold-400 block -mt-0.5">
                    LOVE DNA INSIGHT
                  </span>
                </div>
              </div>

              <div className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-zinc-200 text-xs font-semibold backdrop-blur-md">
                {state.stats.score || activeArchetype.harmonyScore}% Alignment
              </div>
            </div>

            {/* Card Body / Central Content */}
            <div className="relative z-10 my-6 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 block mb-1">
                  Verified Couple Archetype
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100 leading-tight">
                  {activeArchetype.archetype}
                </h3>
                <p className="text-xs sm:text-sm text-gold-200/90 italic mt-1 font-serif">
                  "{activeArchetype.quote}"
                </p>
              </div>

              {/* Dynamic Communication Insight */}
              <div className="rounded-2xl bg-obsidian-900/80 border border-white/10 p-4 space-y-2 backdrop-blur-md">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                  Weekly Communication Metric
                </span>
                <div className="text-xs sm:text-sm font-semibold text-zinc-100 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>
                    {state.stats.deEscalatedMoments || 5} Misunderstandings Turned Into Connection
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Superpower: {activeArchetype.superpower}
                </p>
              </div>

              {/* Partner Roles */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="rounded-xl bg-obsidian-950/60 p-2.5 border border-white/5">
                  <span className="text-gold-400 font-semibold block text-[10px]">YOU</span>
                  <span className="text-zinc-200">{activeArchetype.partnerOneRole.split("(")[0]}</span>
                </div>
                <div className="rounded-xl bg-obsidian-950/60 p-2.5 border border-white/5">
                  <span className="text-rose-400 font-semibold block text-[10px]">PARTNER</span>
                  <span className="text-zinc-200">{activeArchetype.partnerTwoRole.split("(")[0]}</span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Private · Zero Chat Text Exposed
              </span>
              <span className="font-mono text-zinc-400">duo.app</span>
            </div>
          </div>
        </div>

        {/* Card Action Controls (Share / Copy) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleShareLoveDnaCard}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 via-rose-500 to-gold-400 text-obsidian-950 font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5 shadow-gold-glow"
          >
            {copiedCardText ? (
              <>
                <Check className="w-4 h-4" />
                <span>Card Summary Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Download / Share Card (Instagram Story Ready)</span>
              </>
            )}
          </button>

          <button
            onClick={() => setActiveTab("home")}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-obsidian-900 border border-white/10 hover:border-gold-500/30 text-zinc-300 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <span>Back to Home Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
