# DUO — Core Features: Decode, Message Softener & Sync Studio

This file contains the complete source code for **Core Features: Decode, Message Softener & Sync Studio** in DUO.

---

## Component: DecodePreview (5-Section X-Ray)

- **File Path:** `src/components/decode/DecodePreview.tsx`
- **Lines of Code:** 793 lines
- **Size:** 36.11 KB

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

---

## Component: SoftenerPreview (Message Protector)

- **File Path:** `src/components/rewrite/SoftenerPreview.tsx`
- **Lines of Code:** 438 lines
- **Size:** 18.17 KB

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

---

## Component: SyncPreview (Battery, Simulator & Love DNA)

- **File Path:** `src/components/sync/SyncPreview.tsx`
- **Lines of Code:** 878 lines
- **Size:** 37.56 KB

```tsx
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

```

---

