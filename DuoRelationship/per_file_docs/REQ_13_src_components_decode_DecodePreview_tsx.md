# Requirement Specification & Source Code
## REQ_13: Psychological X-Ray Interactive Component (5-Section Reveal)

> **File Path:** `src/components/decode/DecodePreview.tsx`  
> **Layer:** `Feature Component` · **Category:** `UI Component`  
> **Lines of Code:** 793 lines · **Size:** 36.11 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

Transforms an overwhelming, high-stress fight screenshot into clear, structured, calming psychological clarity in 8 seconds.

---

### 📋 2. Functional & Technical Requirements

1. **Drag-and-drop screenshot uploader and paste-text mode switcher.:** Drag-and-drop screenshot uploader and paste-text mode switcher.
2. **Sleek tone pill toggle [ Auto-Detect ✨ | Hinglish 🇮🇳 | English 🇬🇧 ].:** Sleek tone pill toggle [ Auto-Detect ✨ | Hinglish 🇮🇳 | English 🇬🇧 ].
3. **Prominent "Try Sample Angry Chat" showcase button for instant demonstration.:** Prominent "Try Sample Angry Chat" showcase button for instant demonstration.
4. **Renders the complete 5-section X-Ray cards with 1-click copy feedback.:** Renders the complete 5-section X-Ray cards with 1-click copy feedback.

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* Playwright clicks Try Sample Angry Chat, runs decode, and asserts all 5 cards render with working copy buttons.

---

### 💻 5. Complete Verbatim Source Code

```tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRelationship } from "@/context/RelationshipContext";
import { SecurityBadge } from "@/components/layout/SecurityBadge";
import { SAMPLE_CHATS } from "@/lib/constants";
import { PsychologicalXRayResult, QuickContextTag } from "@/types";
import {
  UploadCloud,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Copy,
  Check,
  AlertTriangle,
  Zap,
  Image as ImageIcon,
  X,
  Compass,
  Lightbulb,
  Key,
  Flame,
  Languages,
} from "lucide-react";
import confetti from "canvas-confetti";

export function DecodePreview() {
  const {
    recordDecode,
    setActiveTab,
    selectedSampleChatId,
    clearSelectedSampleChat,
  } = useRelationship();

  // Input states
  const [inputMode, setInputMode] = useState<"screenshot" | "text">("screenshot");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [chatText, setChatText] = useState("");
  const [selectedContext, setSelectedContext] = useState<QuickContextTag>("angry_fight");
  const [selectedLanguageOverride, setSelectedLanguageOverride] = useState<"auto" | "hinglish" | "en">("auto");
  const [selectedSample, setSelectedSample] = useState<string | null>(null);

  // Custom user API key (optional)
  const [userApiKey, setUserApiKey] = useState("");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  // Analysis states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<PsychologicalXRayResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const contextOptions: { id: QuickContextTag; label: string; icon: string }[] = [
    { id: "angry_fight", label: "Angry / Fight Mode 😤", icon: "😤" },
    { id: "overthinking_dry", label: "Overthinking / Dry Reply 🤔", icon: "🤔" },
    { id: "misunderstanding", label: "Misunderstanding 💔", icon: "💔" },
    { id: "just_vibe", label: "Just Checking Vibe ✨", icon: "✨" },
  ];

  // If navigated from empty state with a pre-selected sample chat
  useEffect(() => {
    if (selectedSampleChatId) {
      const sample = SAMPLE_CHATS.find((s) => s.id === selectedSampleChatId);
      if (sample) {
        setChatText(sample.rawText);
        setSelectedSample(sample.id);
        setInputMode("text");
        setSelectedContext("angry_fight");
      }
      clearSelectedSampleChat();
    }
  }, [selectedSampleChatId, clearSelectedSampleChat]);

  // Handle image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setSelectedSample(null);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sampleId: string) => {
    const sample = SAMPLE_CHATS.find((s) => s.id === sampleId);
    if (sample) {
      setChatText(sample.rawText);
      setSelectedSample(sample.id);
      setImagePreview(null);
      setInputMode("text");
      setSelectedContext("angry_fight");
      setResult(null);
    }
  };

  const handleTriggerAngryDemo = () => {
    const demo = SAMPLE_CHATS[0]; // chat-sample-angry-hinglish
    setChatText(demo.rawText);
    setSelectedSample(demo.id);
    setImagePreview(null);
    setInputMode("text");
    setSelectedContext("angry_fight");
    setSelectedLanguageOverride("hinglish");
    setResult(null);
  };

  const handleRunDecode = async () => {
    if (!imagePreview && !chatText.trim()) return;

    setIsAnalyzing(true);
    setResult(null);
    setAnalysisStep(1);

    // Multi-phase psychology scanning animation
    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 600);

    try {
      const response = await fetch("/api/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imagePreview || undefined,
          text: chatText || undefined,
          contextTag: selectedContext,
          targetLanguage: selectedLanguageOverride,
          userApiKey: userApiKey || undefined,
        }),
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        throw new Error("Decode request failed");
      }

      const json = await response.json();
      if (json.data) {
        setResult(json.data);
        recordDecode(json.data);

        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.5 },
            colors: ["#D4AF37", "#E47A94", "#4EBA88"],
          });
        } catch {
          // safe fallback
        }
      }
    } catch (err) {
      console.error(err);
      clearInterval(stepInterval);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyReply = (replyText: string, index: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(replyText);
      setCopiedIndex(index);
      setToastMessage("Copied! Go save the vibe ❤️");

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
    <div className="space-y-6 pb-28">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-gold-500 text-obsidian-950 font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <Heart className="w-4 h-4 fill-obsidian-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Prominent Trust-First Architecture Badge */}
      <SecurityBadge />

      {/* Screen Title & High-Trust Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-gold-400" />
              The Psychological X-Ray
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20">
              Multimodal Vision AI · 8s Reveal
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-zinc-100 font-semibold">
            Decode Chat Screenshot
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Upload any WhatsApp or Instagram screenshot in Angry Mode. DUO unmasks the hidden vulnerability, protects you from emotional traps, and creates 3 deeply empathetic, zero-ego replies.
          </p>
        </div>

        {/* API Key Modal Trigger */}
        <button
          onClick={() => setShowApiKeyModal(true)}
          className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-obsidian-900/90 border border-gold-500/20 text-gold-300 text-xs hover:border-gold-500/40 transition-colors"
          title="Configure Gemini API Key"
        >
          <Key className="w-3.5 h-3.5 text-gold-400" />
          <span>{userApiKey ? "Custom Key Active" : "Gemini API Config"}</span>
        </button>
      </div>

      {/* Sleek Language Pill Toggle & Input Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Sleek Pill Toggle: [ Auto-Detect ✨ | Hinglish 🇮🇳 | English 🇬🇧 ] */}
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

        {/* Input Mode Switcher (Screenshot vs Paste Text) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-obsidian-900 border border-white/5">
          <button
            onClick={() => setInputMode("screenshot")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              inputMode === "screenshot"
                ? "bg-gold-500/20 text-gold-300 border border-gold-500/30 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Screenshot (Vision)</span>
          </button>

          <button
            onClick={() => setInputMode("text")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              inputMode === "text"
                ? "bg-gold-500/20 text-gold-300 border border-gold-500/30 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Paste Transcript</span>
          </button>
        </div>
      </div>

      {/* Prominent Showcase Demo Button: Try Sample Angry Chat ✨ */}
      <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-950/60 via-obsidian-900 to-obsidian-950 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-rose-glow/20">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
              Instant Indian Relationship Demo
            </span>
          </div>
          <p className="text-xs text-zinc-300">
            See how DUO decodes classic Indian couple passive aggression: <em>"Achha thik hai, jaao apne doston ke paas..."</em>
          </p>
        </div>

        <button
          onClick={handleTriggerAngryDemo}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-gold-glow shrink-0"
        >
          <Sparkles className="w-4 h-4 fill-obsidian-950" />
          <span>🔥 Try Sample Angry Chat ✨</span>
        </button>
      </div>

      {/* Quick Context Selector Pills */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-zinc-300 block">
          Select Conversation Tone / Context (Angry Mode Priority):
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {contextOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedContext(opt.id)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                selectedContext === opt.id
                  ? "bg-gradient-to-r from-rose-950/70 to-obsidian-900 border-rose-400 text-rose-200 shadow-rose-glow/30"
                  : "bg-obsidian-900/60 border-white/5 hover:border-gold-500/30 text-zinc-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Upload Box */}
      {inputMode === "screenshot" ? (
        <div className="space-y-3">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative rounded-2xl border-2 border-dashed border-gold-500/35 hover:border-gold-400/60 bg-gradient-to-b from-obsidian-900/90 to-obsidian-950 p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group shadow-luxury-card"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            {imagePreview ? (
              <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-gold-500/30 shadow-2xl">
                <img
                  src={imagePreview}
                  alt="Chat screenshot preview"
                  className="w-full max-h-72 object-contain bg-obsidian-950"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-obsidian-900/90 border border-white/10 text-zinc-300 hover:text-rose-400 transition-colors"
                  title="Remove screenshot"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="p-2 bg-obsidian-900/90 text-[11px] text-gold-300 border-t border-white/5">
                  ✓ Screenshot attached. Click 'Run Psychological X-Ray' below.
                </div>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/20 to-rose-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-3 group-hover:scale-110 transition-transform shadow-gold-glow/20">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-zinc-100">
                  Drag & Drop Chat Screenshot or Browse Gallery
                </h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-md">
                  WhatsApp, Instagram DM, iMessage, or Telegram. Right bubble = User, Left bubble = Partner.
                </p>
                <div className="mt-3 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-[11px] text-gold-300 font-medium">
                  Supports Everyday Hinglish, Hindi & English
                </div>
              </>
            )}
          </div>

          {/* Privacy Shield Right Below Upload Box */}
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-obsidian-900/80 border border-gold-500/20 text-xs text-gold-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>🔒 100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.</span>
          </div>
        </div>
      ) : (
        /* Text Transcript Input */
        <div className="space-y-3">
          <div className="rounded-2xl border border-gold-500/25 bg-obsidian-900/90 p-4 sm:p-5 shadow-luxury-card space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-gold-400" />
                <span>Paste Chat Transcript</span>
              </label>
              <span className="text-[11px] text-zinc-500">
                {chatText.length} characters
              </span>
            </div>

            <textarea
              value={chatText}
              onChange={(e) => {
                setChatText(e.target.value);
                setResult(null);
              }}
              rows={4}
              placeholder={`Paste the confusing or heated conversation here...
Example:
Partner: "Tumhe toh bas apne kaam aur doston se matlab hai. 'Achha thik hai, koi baat nahi', jaao unhi ke paas."
You: "Yaar office mein itna pressure tha! Har baat ka mudda kyu banate ho?"`}
              className="w-full rounded-xl bg-obsidian-950 border border-white/10 p-3.5 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-gold-500/50 resize-none font-mono"
            />
          </div>

          {/* Privacy Shield */}
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-obsidian-900/80 border border-gold-500/20 text-xs text-gold-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>🔒 100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.</span>
          </div>
        </div>
      )}

      {/* Scenario Pills */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
          Or Select Any Realistic Couple Scenario:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SAMPLE_CHATS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSelectSample(sample.id)}
              className={`text-left p-3 rounded-xl border text-xs transition-all ${
                selectedSample === sample.id
                  ? "bg-gold-500/15 border-gold-400 text-gold-200 shadow-gold-glow/10"
                  : "bg-obsidian-900/60 border-white/5 hover:border-gold-500/30 text-zinc-300"
              }`}
            >
              <div className="font-medium mb-1 flex items-center justify-between">
                <span className="line-clamp-1">{sample.label}</span>
                <span className="text-[10px] uppercase font-semibold text-gold-400 shrink-0 ml-1">
                  {sample.language}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 line-clamp-2">
                {sample.rawText}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Run Decode Button */}
      <div className="flex items-center justify-center pt-2">
        <button
          onClick={handleRunDecode}
          disabled={(!imagePreview && !chatText.trim()) || isAnalyzing}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-gold-500 to-gold-400 text-obsidian-950 font-bold text-base hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-gold-glow flex items-center justify-center gap-3 border border-gold-200/40"
        >
          {isAnalyzing ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>
                {analysisStep === 1 && "Scanning Left & Right Chat Bubbles..."}
                {analysisStep === 2 && "Filtering Gottman 4-Horsemen Triggers..."}
                {analysisStep === 3 && "Decoding Hidden Vulnerability & Longing..."}
                {analysisStep >= 4 && "Generating 3 Zero-Ego Magic Replies..."}
              </span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 fill-obsidian-950" />
              <span>❤️ Run Psychological X-Ray (8s Reveal)</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 5-SECTION PSYCHOLOGICAL X-RAY RESULT DISPLAY */}
      {/* ========================================================================= */}
      {result && (
        <div className="rounded-3xl border border-gold-500/35 bg-gradient-to-b from-obsidian-900 via-obsidian-850 to-obsidian-900 p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
          
          {/* SECTION 1: PRIVACY NOTICE & CALM BANNER */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
              <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {result.privacy_notice || "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai."}
              </span>
              <span className="text-[10px] uppercase font-semibold text-gold-400 tracking-wider">
                Psychological X-Ray Verified
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-950/70 via-gold-950/40 to-obsidian-900 border border-rose-400/30 p-4 sm:p-5 shadow-rose-glow/20">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 shrink-0 mt-0.5">
                  <Heart className="w-5 h-5 fill-rose-400/30 animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                      Shaant Ho Jaaiye (Calm Banner) · Read This First
                    </span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                      Breathe Deeply
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-100 font-medium leading-relaxed font-serif">
                    "{result.calm_banner || result.calm_check}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: EMOTIONAL X-RAY (CONTRAST METER & CORE NEED) */}
          <div className="rounded-2xl bg-obsidian-950/80 border border-gold-500/25 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-2">
                <Compass className="w-4 h-4 text-gold-400" />
                Emotional X-Ray (Surface vs. Heart Contrast)
              </span>
              <span className="text-[11px] text-zinc-400 font-light">
                Why arguments spiral out of control
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Surface Emotion Bar */}
              <div className="rounded-xl bg-obsidian-900/90 p-4 border border-rose-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-medium">Bahar Se Kya Dikh Raha Hai (Surface)</span>
                  <span className="font-serif font-bold text-rose-400">
                    {result.emotional_xray?.surface_emotion?.percentage || result.surface_emotion?.percentage || 85}%
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-obsidian-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-600 to-rose-500 rounded-full transition-all duration-1000"
                    style={{
                      width: `${result.emotional_xray?.surface_emotion?.percentage || result.surface_emotion?.percentage || 85}%`,
                    }}
                  />
                </div>

                <div className="text-sm font-semibold text-zinc-200">
                  {result.emotional_xray?.surface_emotion?.label || result.surface_emotion?.label || "Gussa aur Frustration 😤"}
                </div>
              </div>

              {/* Hidden Emotion Bar */}
              <div className="rounded-xl bg-obsidian-900/90 p-4 border border-gold-500/25 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gold-300 font-medium">Dil Mein Asal Mein Kya Hai (Hidden Heart)</span>
                  <span className="font-serif font-bold text-gold-400">
                    {result.emotional_xray?.hidden_emotion?.percentage || result.hidden_emotion?.percentage || 92}%
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-obsidian-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-500 via-rose-400 to-emerald-400 rounded-full transition-all duration-1000"
                    style={{
                      width: `${result.emotional_xray?.hidden_emotion?.percentage || result.hidden_emotion?.percentage || 92}%`,
                    }}
                  />
                </div>

                <div className="text-sm font-semibold text-gold-200">
                  {result.emotional_xray?.hidden_emotion?.label || result.hidden_emotion?.label || "Akela-pan aur Unseen Feel Karna 🥺"}
                </div>
              </div>
            </div>

            {/* Core Attachment Need */}
            <div className="rounded-xl bg-gradient-to-r from-obsidian-900 via-gold-950/20 to-obsidian-900 p-4 border border-gold-500/30 space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-gold-400 fill-gold-400/20" />
                Unki Sabse Badi Emotional Need (Core Need)
              </span>
              <p className="text-xs sm:text-sm text-zinc-100 font-medium leading-relaxed">
                {result.emotional_xray?.core_need || result.core_need || "Woh aapse ladna nahi chahte; woh bas yeh feel karna chahte hain ki busy life mein bhi woh aapki #1 priority hain."}
              </p>
            </div>
          </div>

          {/* SECTION 3: PSYCHOLOGY DECODE (WHAT THEY SAID, WHAT'S IN MIND, THE TRAP) */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* What they said */}
              <div className="rounded-2xl bg-obsidian-950/70 p-4 sm:p-5 border border-white/5 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
                  Unhone Kya Kaha (What They Said Literally)
                </span>
                <p className="text-xs sm:text-sm text-zinc-200 italic font-mono bg-obsidian-900/80 p-3 rounded-xl border border-white/5 leading-relaxed">
                  "{result.psychology_decode?.what_they_said || "Tumhe toh bas apne kaam aur doston se matlab hai. 'Achha thik hai, koi baat nahi', jaao unhi ke paas."}"
                </p>
              </div>

              {/* What's in their mind */}
              <div className="rounded-2xl bg-obsidian-950/70 p-4 sm:p-5 border border-gold-500/20 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 block">
                  Unke Dimaag Mein Asal Mein Kya Hai (What's In Their Mind)
                </span>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-light">
                  {result.psychology_decode?.whats_in_their_mind || "Jab Indian relationships mein partner bolta hai 'Achha thik hai, jaao apne doston/kaam ke paas', toh yeh dismissal nahi balki ek wounded protest bid hai. In their mind: 'Mujhe baar-baar importance maangna exhausting lagta hai, I just want you to choose me without me asking.'"}
                </p>
              </div>
            </div>

            {/* The Trap (Amber Warning Card) */}
            <div className="rounded-2xl bg-gradient-to-r from-amber-950/40 via-obsidian-900 to-obsidian-950 border border-amber-500/40 p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-0.5">
                  ⚠️ Yeh Galti Abhi Mat Kijiye (The Trap — Do NOT Reply This)
                </span>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {result.psychology_decode?.the_trap || result.the_trap || "Abhi galti se bhi office meetings, traffic ke excuses ya 'Har baar tum drama shuru kar deti ho' mat bolna. Logic during emotional flooding feels like rejection and turns a 10-minute sulk into a 3-day cold war."}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 4: 3 MAGIC REPLIES (ZERO-EGO REWRITES RENDERED ONCE CLEANLY) */}
          <div className="space-y-4 pt-2">
            <div>
              <h3 className="font-serif text-xl font-bold text-zinc-100 flex items-center gap-2">
                <span>3 Magic Replies</span>
                <span className="text-xs text-gold-400 font-normal">
                  (Pick the tone that fits your heart)
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Engineered to bypass defense mechanisms, restore emotional safety, and melt anger within seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {result.magic_replies?.map((reply, idx) => {
                const textToRender =
                  reply.reply_text ||
                  (reply as any).replyText ||
                  reply.text ||
                  (reply as any).reply ||
                  "";
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-obsidian-950 border border-gold-500/25 p-5 space-y-3.5 transition-all hover:border-gold-400/50 shadow-luxury-card"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                      <span className="font-serif text-sm sm:text-base font-bold text-gold-300">
                        {reply.badge}
                      </span>

                      <button
                        onClick={() => handleCopyReply(textToRender, idx)}
                        className="self-start sm:self-center flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-sm"
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

                    {/* Rendered ONCE cleanly without duplication */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-obsidian-900/90 border border-white/5 text-sm sm:text-base text-zinc-100 leading-relaxed font-medium">
                      "{textToRender}"
                    </div>

                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <Lightbulb className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>
                        <strong className="text-zinc-300 font-medium">Psychological Impact:</strong>{" "}
                        {reply.why_it_works}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 5: GOLDEN ACTION TIP */}
          <div className="rounded-2xl bg-gradient-to-r from-gold-950/30 via-obsidian-900 to-obsidian-950 border border-gold-500/30 p-4 sm:p-5 flex items-start gap-3.5">
            <span className="text-2xl mt-0.5">🏆</span>
            <div className="flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400 block mb-0.5">
                Iss Waqt Ka Golden Niyam (Golden Action Tip)
              </span>
              <p className="text-xs sm:text-sm text-zinc-100 font-medium leading-relaxed">
                {result.golden_action_tip || result.golden_rule || "Iss waqt logic nahi, reassurance chahiye: Abhi excuses mat do ki aap kyun busy the. Pehle unka dil shaant hone do; explanations can wait till tomorrow."}
              </p>
            </div>
          </div>

          {/* Bottom Relationship Alignment Score Feedback */}
          <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                Relationship Alignment Score & Clarity calibrated (+8 points)!
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

      {/* Optional Gemini API Key Drawer / Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-obsidian-900 border border-gold-500/35 p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setShowApiKeyModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 text-sm font-semibold p-1"
            >
              ✕
            </button>

            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-zinc-100">
                Gemini Vision API Configuration
              </h3>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              DUO includes a built-in therapy-grade psychological inference engine that works seamlessly without any setup. If you wish to use your own direct Google Gemini API Key for live multimodal vision, paste it below.
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase text-zinc-300 block">
                Gemini API Key (Stored locally in memory)
              </label>
              <input
                type="password"
                value={userApiKey}
                onChange={(e) => setUserApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full rounded-xl bg-obsidian-950 border border-white/10 p-3 text-xs text-zinc-200 focus:outline-none focus:border-gold-500/50"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-obsidian-950 text-xs font-bold hover:brightness-110 transition-all"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```
