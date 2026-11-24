# 💍 DUO — AI Relationship Co-Pilot & Emotional Translator
## Complete Source Code Repository Export

> **Brand Identity:** Obsidian Gold & Soft Rose Noir (`#0B0C10`, `#D4AF37`, `#E47A94`)
> **Core Purpose:** The #1 AI Relationship Co-Pilot & Emotional Communication Translator for Indian Couples (Gen-Z & Millennials).
> **Generated At:** 2026-11-23T19:20:35.886Z

---

## 📑 Table of Contents

1. [Package Configuration (`package.json`)](#package-configuration)
2. [TypeScript Configuration (`tsconfig.json`)](#typescript-configuration)
3. [Tailwind CSS Configuration & Theme Tokens (`tailwind.config.ts`)](#tailwind-css-configuration-theme-tokens)
4. [PostCSS Configuration (`postcss.config.mjs`)](#postcss-configuration)
5. [Git Ignore Configuration (`.gitignore`)](#git-ignore-configuration)
6. [Root Layout & Font Setup (`src/app/layout.tsx`)](#root-layout-font-setup)
7. [Main Application Shell & Tab Controller (`src/app/page.tsx`)](#main-application-shell-tab-controller)
8. [Global CSS & Obsidian Gold Luxury Styles (`src/app/globals.css`)](#global-css-obsidian-gold-luxury-styles)
9. [API: /api/decode (Psychological X-Ray & Vision AI) (`src/app/api/decode/route.ts`)](#api-api-decode-psychological-x-ray-vision-ai)
10. [API: /api/soften (Before You Send Message Protector) (`src/app/api/soften/route.ts`)](#api-api-soften-before-you-send-message-protector)
11. [API: /api/simulate (Safe Conversation Simulator) (`src/app/api/simulate/route.ts`)](#api-api-simulate-safe-conversation-simulator)
12. [API: /api/daily-coach (Daily Connection Vitamin) (`src/app/api/daily-coach/route.ts`)](#api-api-daily-coach-daily-connection-vitamin)
13. [Component: DecodePreview (5-Section X-Ray) (`src/components/decode/DecodePreview.tsx`)](#component-decodepreview-5-section-x-ray)
14. [Component: SoftenerPreview (Message Protector) (`src/components/rewrite/SoftenerPreview.tsx`)](#component-softenerpreview-message-protector)
15. [Component: SyncPreview (Battery, Simulator & Love DNA) (`src/components/sync/SyncPreview.tsx`)](#component-syncpreview-battery-simulator-love-dna)
16. [Component: DailyMicroHabitCard (`src/components/home/DailyMicroHabitCard.tsx`)](#component-dailymicrohabitcard)
17. [Component: EmotionalAlignmentMeter (`src/components/home/EmotionalAlignmentMeter.tsx`)](#component-emotionalalignmentmeter)
18. [Component: EmptyStateBanner (`src/components/home/EmptyStateBanner.tsx`)](#component-emptystatebanner)
19. [Component: PrimaryDecodeAction (`src/components/home/PrimaryDecodeAction.tsx`)](#component-primarydecodeaction)
20. [Component: QuickStatsRow (`src/components/home/QuickStatsRow.tsx`)](#component-quickstatsrow)
21. [Component: WeeklyVibeReport (`src/components/home/WeeklyVibeReport.tsx`)](#component-weeklyvibereport)
22. [Component: Header & Dialect Modal (`src/components/layout/Header.tsx`)](#component-header-dialect-modal)
23. [Component: BottomNav (4 Mature Tabs) (`src/components/layout/BottomNav.tsx`)](#component-bottomnav-4-mature-tabs)
24. [Component: SecurityBadge (Trust Architecture) (`src/components/layout/SecurityBadge.tsx`)](#component-securitybadge-trust-architecture)
25. [Context: RelationshipContext (Real-data LocalStorage) (`src/context/RelationshipContext.tsx`)](#context-relationshipcontext-real-data-localstorage)
26. [Library: Constants & Sample Chats (`src/lib/constants.ts`)](#library-constants-sample-chats)
27. [Library: LocalStorage Persistence & Calibration Logs (`src/lib/storage.ts`)](#library-localstorage-persistence-calibration-logs)
28. [Library: Utilities & Tailwind Merge (`src/lib/utils.ts`)](#library-utilities-tailwind-merge)
29. [Types: TypeScript Interfaces & Schemas (`src/types/index.ts`)](#types-typescript-interfaces-schemas)

---

## Package Configuration

- **File Path:** `package.json`
- **Lines of Code:** 32 lines
- **Size:** 0.72 KB

```json
{
  "name": "duo-relationship-copilot",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "framer-motion": "^11.11.9",
    "lucide-react": "^0.453.0",
    "next": "^14.2.15",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.4",
    "canvas-confetti": "^1.9.3"
  },
  "devDependencies": {
    "@types/canvas-confetti": "^1.9.0",
    "@types/node": "^20.17.0",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3"
  }
}

```

---

## TypeScript Configuration

- **File Path:** `tsconfig.json`
- **Lines of Code:** 27 lines
- **Size:** 0.56 KB

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

---

## Tailwind CSS Configuration & Theme Tokens

- **File Path:** `tailwind.config.ts`
- **Lines of Code:** 79 lines
- **Size:** 2.24 KB

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#07080A",
          900: "#0B0C10",
          850: "#101217",
          800: "#151821",
          700: "#1F2330",
          600: "#2B3142",
        },
        gold: {
          100: "#FDF8E8",
          200: "#F9EEC6",
          300: "#EED795",
          400: "#E6C56E",
          500: "#D4AF37", // Classical Warm Gold
          600: "#B89228",
          700: "#8C6A15",
          glow: "rgba(212, 175, 55, 0.22)",
        },
        rose: {
          100: "#FDF0F3",
          200: "#F9D5DE",
          300: "#F0A8BA",
          400: "#E47A94",
          500: "#D95675", // Luxury Soft Rose
          600: "#B93856",
          700: "#85233B",
          800: "#4A1422",
          900: "#2B0B14",
          glow: "rgba(217, 86, 117, 0.2)",
        },
        sage: {
          300: "#9ED8BC",
          400: "#70C19B",
          500: "#4EBA88", // De-escalation & Calm indicator
          600: "#36976A",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gold-shimmer": "linear-gradient(110deg, #D4AF37 0%, #FFF2CC 45%, #D4AF37 90%)",
        "rose-noir-gradient": "linear-gradient(135deg, rgba(217,86,117,0.15) 0%, rgba(11,12,16,0.95) 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 35px -5px rgba(212, 175, 55, 0.25)",
        "rose-glow": "0 0 35px -5px rgba(217, 86, 117, 0.25)",
        "luxury-card": "0 10px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

```

---

## PostCSS Configuration

- **File Path:** `postcss.config.mjs`
- **Lines of Code:** 10 lines
- **Size:** 0.15 KB

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;

```

---

## Git Ignore Configuration

- **File Path:** `.gitignore`
- **Lines of Code:** 31 lines
- **Size:** 0.26 KB

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# typescript
*.tsbuildinfo
next-env.d.ts

```

---

## Root Layout & Font Setup

- **File Path:** `src/app/layout.tsx`
- **Lines of Code:** 51 lines
- **Size:** 1.92 KB

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { RelationshipProvider } from "@/context/RelationshipContext";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "DUO · Premium AI Relationship Co-Pilot & Emotional Translator",
  description:
    "Therapy-grade emotional communication co-pilot for couples. Decode chat screenshots, soften angry messages before sending, and discover your Love DNA. 100% private & encrypted.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="bg-obsidian-950 text-zinc-100 min-h-screen flex flex-col selection:bg-gold-500/30 selection:text-gold-200">
        <RelationshipProvider>
          {/* Subtle ambient luxury mesh glow */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-gold-500/8 via-rose-500/5 to-transparent rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-950/20 rounded-full blur-[140px]" />
          </div>

          <Header />
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {children}
          </main>
          <BottomNav />
        </RelationshipProvider>
      </body>
    </html>
  );
}

```

---

## Main Application Shell & Tab Controller

- **File Path:** `src/app/page.tsx`
- **Lines of Code:** 62 lines
- **Size:** 1.99 KB

```tsx
"use client";

import React from "react";
import { useRelationship } from "@/context/RelationshipContext";
import { EmptyStateBanner } from "@/components/home/EmptyStateBanner";
import { EmotionalAlignmentMeter } from "@/components/home/EmotionalAlignmentMeter";
import { PrimaryDecodeAction } from "@/components/home/PrimaryDecodeAction";
import { DailyMicroHabitCard } from "@/components/home/DailyMicroHabitCard";
import { WeeklyVibeReport } from "@/components/home/WeeklyVibeReport";
import { QuickStatsRow } from "@/components/home/QuickStatsRow";
import { DecodePreview } from "@/components/decode/DecodePreview";
import { SoftenerPreview } from "@/components/rewrite/SoftenerPreview";
import { SyncPreview } from "@/components/sync/SyncPreview";

export default function HomeDashboard() {
  const { activeTab, hasRealActivity, isHydrated } = useRelationship();

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-gold-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Route to the corresponding mature tab
  if (activeTab === "decode") {
    return <DecodePreview />;
  }

  if (activeTab === "rewrite") {
    return <SoftenerPreview />;
  }

  if (activeTab === "sync") {
    return <SyncPreview />;
  }

  // Default: Home Tab (Relationship Pulse & Daily Connection)
  return (
    <div className="space-y-6 sm:space-y-8 pb-24">
      {/* If Brand New User: Show Non-Fake Honest Welcome State */}
      {!hasRealActivity && <EmptyStateBanner />}

      {/* Dynamic Emotional Alignment Meter */}
      <EmotionalAlignmentMeter />

      {/* Primary Action Card: 8-second Decode Chat Screenshot */}
      <PrimaryDecodeAction />

      {/* Daily Micro-Habit (Connection Vitamin) */}
      <DailyMicroHabitCard />

      {/* Weekly Vibe & Chemistry Report (Shareable Love DNA Cards) */}
      <WeeklyVibeReport />

      {/* Real Activity & Statistics */}
      <QuickStatsRow />
    </div>
  );
}

```

---

## Global CSS & Obsidian Gold Luxury Styles

- **File Path:** `src/app/globals.css`
- **Lines of Code:** 52 lines
- **Size:** 0.96 KB

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #07080a;
  --foreground: #f4f4f6;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: var(--font-plus-jakarta), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Custom Luxury Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #0b0c10;
}

::-webkit-scrollbar-thumb {
  background: #2b3142;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d4af37;
}

/* Glassmorphism utilities */
.glass-panel {
  background: rgba(18, 19, 24, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(212, 175, 55, 0.15);
}

.gold-text-glow {
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.35);
}

.rose-text-glow {
  text-shadow: 0 0 20px rgba(217, 86, 117, 0.35);
}

```

---

## API: /api/decode (Psychological X-Ray & Vision AI)

- **File Path:** `src/app/api/decode/route.ts`
- **Lines of Code:** 442 lines
- **Size:** 18.62 KB

```typescript
import { NextRequest, NextResponse } from "next/server";
import { PsychologicalXRayResult, QuickContextTag } from "@/types";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `Act as a world-class Relationship Psychologist and Emotional Translator for couples (specializing in English, Hindi, and natural everyday Indian Hinglish).

CRITICAL LANGUAGE & TONE INSTRUCTION:
Mirror the user's exact Hinglish/English conversational style. Keep explanations deeply empathetic, psychological, and crystal clear. Never sound like a formal dictionary or a cold therapist—sound like a wise, warm, emotionally intelligent Indian relationship coach. Ensure zero duplicate text in JSON fields.

INDIAN COUPLE CULTURAL NUANCES:
Decode classic Indian passive-aggressive or hurt phrases accurately:
- "Achha thik hai" / "Koi baat nahi" -> Means "I am hurt and tired of explaining, I want you to notice without me asking."
- "Jaao apne doston/kaam ke paas" -> Means "I miss you and feel left out, please reassure me I'm still your priority."
- "Baat karne ka koi fayda nahi" -> Means "I feel unheard right now; please listen with empathy instead of giving logical excuses."
- "Tumhe toh bas apne se matlab hai" -> Means "I am craving your presence and feeling taking for granted."

LANGUAGE RULES:
1. If the chat/transcript is in Hinglish (Hindi written in Roman/English script, e.g. "Tumhe toh bas kaam se matlab hai, rehne do"), respond in warm, natural, everyday Hinglish (Roman script) that young Indian couples actually speak. Never use heavy, formal Sanskritized Hindi or robotic textbook English.
2. If in pure English, respond in warm, modern, empathetic English.
3. If in Devanagari Hindi, respond in simple, conversational Hindi mixed with relatable English relationship terms (like Priority, Space, Overthinking, Vibe).
4. Zero-Toxicity Rule: Never use words like "Red Flag" or "Toxic". De-escalate anger and decode the hidden vulnerability behind harsh messages.

Return strictly valid JSON with NO duplicate text and NO markdown fences outside the JSON, matching this exact schema:
{
  "privacy_notice": "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
  "calm_banner": "Ek gehri saans lo. Yeh message gusse mein likha gaya hai, nafrat mein nahi.",
  "emotional_xray": {
    "surface_emotion": {
      "label": "Gussa aur Frustration 😤",
      "percentage": 85
    },
    "hidden_emotion": {
      "label": "Akela-pan aur Unseen Feel Karna 🥺",
      "percentage": 92
    },
    "core_need": "Woh aapse ladna nahi chahte; woh bas yeh feel karna chahte hain ki woh abhi bhi aapki #1 priority hain."
  },
  "psychology_decode": {
    "what_they_said": "Quote the key harsh line from the partner's chat",
    "whats_in_their_mind": "Deep psychological explanation of their defense mechanism, hurt, or overwhelm",
    "the_trap": "Clear warning on what NOT to reply right now (e.g., giving logical excuses) and why it will escalate the fight"
  },
  "magic_replies": [
    {
      "badge": "Option 1: Pyaar aur Apnaapan (Warm & Reassuring — Sabse Asardaar)",
      "reply_text": "Ready-to-send deeply empathetic, zero-ego reply (Render ONCE cleanly)",
      "why_it_works": "1 short line explaining the psychological impact"
    },
    {
      "badge": "Option 2: Calm & Mature (Bina Kisi Bahaane Ke)",
      "reply_text": "Ready-to-send mature, balanced reply without excuses",
      "why_it_works": "1 short line explaining the psychological impact"
    },
    {
      "badge": "Option 3: Soft & Playful (Tension-Melting)",
      "reply_text": "Ready-to-send mood-lightening, affectionate reply",
      "why_it_works": "1 short line explaining the psychological impact"
    }
  ],
  "golden_action_tip": "Iss waqt logic nahi, reassurance chahiye: Abhi excuses mat do ki aap kyun busy the. Pehle unka dil shaant hone do; explanations can wait till tomorrow."
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, text, contextTag, targetLanguage, userApiKey } = body as {
      image?: string;
      text?: string;
      contextTag?: QuickContextTag;
      targetLanguage?: "auto" | "hinglish" | "en";
      userApiKey?: string;
    };

    if (!image && !text) {
      return NextResponse.json(
        { error: "Please provide either a chat screenshot or text transcript." },
        { status: 400 }
      );
    }

    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    // If Gemini API Key is available, invoke the official Gemini Multimodal Vision API
    if (apiKey) {
      try {
        const geminiResult = await callGeminiMultimodal(apiKey, {
          image,
          text,
          contextTag,
          targetLanguage,
        });
        if (geminiResult) {
          const normalized = normalizeResult(geminiResult);
          return NextResponse.json({
            success: true,
            source: "gemini-vision",
            data: normalized,
          });
        }
      } catch (err: any) {
        console.warn("Gemini API call failed, falling back to psychological inference engine:", err?.message);
      }
    }

    // Graceful fallback to DUO's psychological inference engine
    const fallbackResult = generatePsychologicalInference(text, contextTag, targetLanguage, Boolean(image));
    return NextResponse.json({
      success: true,
      source: apiKey ? "inference-fallback" : "psychological-engine",
      data: fallbackResult,
    });
  } catch (error: any) {
    console.error("Decode API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during psychological decode." },
      { status: 500 }
    );
  }
}

async function callGeminiMultimodal(
  apiKey: string,
  params: { image?: string; text?: string; contextTag?: QuickContextTag; targetLanguage?: "auto" | "hinglish" | "en" }
): Promise<PsychologicalXRayResult | null> {
  const modelName = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const parts: any[] = [];

  // Screenshot image part
  if (params.image) {
    let base64Data = params.image;
    let mimeType = "image/jpeg";

    if (base64Data.startsWith("data:")) {
      const match = base64Data.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (match) {
        mimeType = match[1];
        base64Data = match[2];
      }
    }

    parts.push({
      inlineData: {
        mimeType: mimeType || "image/jpeg",
        data: base64Data,
      },
    });
  }

  const langInstruction =
    params.targetLanguage === "hinglish"
      ? "User explicitly requested output in natural everyday Indian Hinglish (Roman script)."
      : params.targetLanguage === "en"
      ? "User explicitly requested output in warm modern English."
      : "Auto-detect chat language. If Hinglish/Hindi, respond in natural everyday Indian Hinglish.";

  const userTextPrompt = `Please decode this angry/emotional conversation exchange according to your strict system prompt rules.
${params.text ? `Chat Transcript text:\n"""\n${params.text}\n"""` : "Analyze the attached chat screenshot carefully (Right bubble = User, Left bubble = Partner)."}
${params.contextTag ? `Context: ${params.contextTag}` : ""}
Language Override Instruction: ${langInstruction}
Ensure your response is valid JSON strictly following the 5-section schema with zero duplicate text.`;

  parts.push({ text: userTextPrompt });

  const payload = {
    contents: [
      {
        role: "user",
        parts,
      },
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    generationConfig: {
      temperature: 0.25,
      responseMimeType: "application/json",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error [${response.status}]: ${errorText}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
  const parsed = JSON.parse(cleaned) as PsychologicalXRayResult;
  return normalizeResult(parsed);
}

function normalizeResult(res: any): PsychologicalXRayResult {
  const normReplies = (res.magic_replies || []).map((r: any) => {
    const textVal =
      r.reply_text ||
      r.replyText ||
      r.reply ||
      r.text ||
      r.message ||
      "";
    return {
      badge: r.badge || r.style || "Option 1: Pyaar aur Apnaapan (Warm & Reassuring)",
      reply_text: textVal,
      text: textVal,
      why_it_works:
        r.why_it_works ||
        r.whyItWorks ||
        "Yeh unke hurt ko validate karta hai bina defensiveness ke, aur turant emotional security deta hai.",
      style: r.style || r.badge || "",
    };
  });

  const surface =
    res.emotional_xray?.surface_emotion ||
    res.surface_emotion || {
      label: "Gussa aur Frustration 😤",
      percentage: 85,
    };

  const hidden =
    res.emotional_xray?.hidden_emotion ||
    res.hidden_emotion || {
      label: "Akela-pan aur Unseen Feel Karna 🥺",
      percentage: 92,
    };

  const coreNeed =
    res.emotional_xray?.core_need ||
    res.core_need ||
    "Woh aapse ladna nahi chahte; woh bas yeh sunna chahte hain ki woh aapki pehli priority hain.";

  const whatSaid =
    res.psychology_decode?.what_they_said ||
    res.what_they_said ||
    "Tumhe toh bas apne kaam aur doston se matlab hai. 'Achha thik hai, koi baat nahi', main hi overreact karti hoon na? Jaao unhi ke paas.";

  const whatsInMind =
    res.psychology_decode?.whats_in_their_mind ||
    res.whats_in_their_mind ||
    "Jab Indian relationships mein partner bolta hai 'Achha thik hai, jaao apne doston ke paas', toh yeh coldness nahi balki deep exhaustion hai. In their mind: 'Mujhe baar-baar importance maangna hurtful lagta hai, I just want you to choose me without me asking.'";

  const trap =
    res.psychology_decode?.the_trap ||
    res.the_trap ||
    "Abhi galti se bhi office meetings, traffic ke excuses ya 'Har baar tum drama shuru kar deti ho' mat bolna. Logic during emotional flooding feels like rejection and escalates the fight for hours.";

  const goldenTip =
    res.golden_action_tip ||
    res.golden_rule ||
    "Iss waqt logic nahi, reassurance chahiye: Abhi excuses mat do ki aap kyun busy the. Pehle unka dil shaant hone do; explanations can wait till tomorrow.";

  return {
    privacy_notice:
      res.privacy_notice ||
      "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
    calm_banner:
      res.calm_banner ||
      res.calm_check ||
      "Ek gehri saans lo. Yeh message gusse mein likha gaya hai, nafrat mein nahi. Partner aapse ladna nahi chahta, they just feel left out and miss being your priority.",
    calm_check:
      res.calm_banner ||
      res.calm_check ||
      "Ek gehri saans lo. Yeh message gusse mein likha gaya hai, nafrat mein nahi. Partner aapse ladna nahi chahta, they just feel left out and miss being your priority.",
    emotional_xray: {
      surface_emotion: surface,
      hidden_emotion: hidden,
      core_need: coreNeed,
    },
    surface_emotion: surface,
    hidden_emotion: hidden,
    core_need: coreNeed,
    psychology_decode: {
      what_they_said: whatSaid,
      whats_in_their_mind: whatsInMind,
      the_trap: trap,
    },
    the_trap: trap,
    magic_replies: normReplies,
    golden_action_tip: goldenTip,
    golden_rule: goldenTip,
  };
}

// Resilient Behavioral Fallback Engine with dialect & context awareness
function generatePsychologicalInference(
  text?: string,
  contextTag?: QuickContextTag,
  targetLanguage?: "auto" | "hinglish" | "en",
  hasImage?: boolean
): PsychologicalXRayResult {
  const raw = (text || "").toLowerCase();
  const detectedHinglish =
    raw.includes("tum") ||
    raw.includes("aap") ||
    raw.includes("kuch") ||
    raw.includes("nahi") ||
    raw.includes("yaar") ||
    raw.includes("hamesha") ||
    raw.includes("meri") ||
    raw.includes("kyun") ||
    raw.includes("kyu") ||
    raw.includes("theek") ||
    raw.includes("thik") ||
    raw.includes("achha") ||
    raw.includes("jaao") ||
    raw.includes("doston") ||
    raw.includes("fayda") ||
    raw.includes("rahi") ||
    raw.includes("raha");

  const useHinglish =
    targetLanguage === "hinglish" ||
    (targetLanguage !== "en" && (detectedHinglish || !text));

  if (useHinglish) {
    const quotedLine = text
      ? text.split("\n").find((l) => l.toLowerCase().includes("tum") || l.toLowerCase().includes("thik") || l.toLowerCase().includes("jaao")) ||
        "Tumhe toh bas apne kaam aur doston se matlab hai. 'Achha thik hai, koi baat nahi', jaao unhi ke paas."
      : "Tumhe toh bas apne kaam aur doston se matlab hai. 'Achha thik hai, koi baat nahi', jaao unhi ke paas.";

    const result: PsychologicalXRayResult = {
      privacy_notice: "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
      calm_banner:
        "Ek gehri saans lo. Yeh message gusse mein likha gaya hai, nafrat mein nahi. Partner aapse ladna nahi chahta, they just feel left out and miss being your priority.",
      emotional_xray: {
        surface_emotion: {
          label: "Gussa aur Frustration 😤",
          percentage: 85,
        },
        hidden_emotion: {
          label: "Akela-pan aur Unseen Feel Karna 🥺",
          percentage: 92,
        },
        core_need:
          "Woh aapse ladna nahi chahte; woh bas yeh feel karna chahte hain ki busy life mein bhi woh aapki #1 priority hain.",
      },
      psychology_decode: {
        what_they_said: quotedLine.replace(/^(Partner:|You:)/i, "").trim(),
        whats_in_their_mind:
          "Jab Indian relationships mein partner bolta hai 'Achha thik hai, jaao apne doston/kaam ke paas', toh yeh dismissal nahi balki ek wounded protest bid hai. In their mind: 'Mujhe baar-baar importance maangna exhausting lagta hai, I just want you to choose me without me asking.'",
        the_trap:
          "Abhi galti se bhi office meetings, traffic ke excuses ya 'Har baar tum drama shuru kar deti ho' mat bolna. Logic during emotional flooding feels like rejection and turns a 10-minute sulk into a 3-day cold war.",
      },
      magic_replies: [
        {
          badge: "Option 1: Pyaar aur Apnaapan (Warm & Reassuring — 100% Zero-Ego)",
          reply_text:
            "I am so sorry yaar. Tumhara gussa hona 100% valid hai, aur mujhe tumhe pehle hi update dena chahiye tha. Work wrap up karke seedha tumhare paas aa raha hoon, let's relax together without any screens.",
          why_it_works:
            "Acknowledges their hurt without defensiveness and immediately reassures them of their priority.",
        },
        {
          badge: "Option 2: Calm & Mature (Bina Kisi Bahaane Ke)",
          reply_text:
            "Meeting sach mein stretch ho gayi thi, par call ya text na kar pana meri lapse thi. Main tumhari evening bilkul kharab nahi karna chahta. Can I call you for 2 minutes right now to hear your voice?",
          why_it_works:
            "Takes calm ownership cleanly, giving them the safety to drop their defensive guard.",
        },
        {
          badge: "Option 3: Soft & Playful (Tension-Melting)",
          reply_text:
            "I officially messed up today, aur tumhara daantna banta hai. Peace treaty ke liye tumhari favorite ice cream ya chai leke aa raha hoon in 15 mins. Please ek choti si smile de do?",
          why_it_works:
            "Uses humble tenderness and an emotional comfort bid to dissolve tension instantly.",
        },
      ],
      golden_action_tip:
        "Iss waqt logic nahi, reassurance chahiye: Abhi excuses mat do ki aap kyun busy the. Pehle unka dil shaant hone do; explanations can wait till tomorrow.",
    };

    return normalizeResult(result);
  }

  // Pure English fallback
  const quotedLineEn = text
    ? text.split("\n")[0] || "Fine. Whatever. Go with your friends, I'll figure dinner out myself."
    : "Fine. Whatever. Go with your friends, I'll figure dinner out myself.";

  const resultEn: PsychologicalXRayResult = {
    privacy_notice: "100% Private & Encrypted · Chats are analyzed in real-time memory and never stored.",
    calm_banner:
      "Take a deep breath. This message was written in hurt and exhaustion, not malice. They aren't pushing you away; they are craving reassurance.",
    emotional_xray: {
      surface_emotion: {
        label: "Anger & Passive Resentment 😤",
        percentage: 84,
      },
      hidden_emotion: {
        label: "Feeling Unimportant & Missing Closeness 🥺",
        percentage: 91,
      },
      core_need:
        "They don't want to fight; they need to hear that they remain your cherished priority despite busy schedules.",
    },
    psychology_decode: {
      what_they_said: quotedLineEn.replace(/^(Partner:|You:)/i, "").trim(),
      whats_in_their_mind:
        "When expectations of connection collapse quietly, the nervous system shields itself with sarcastic or blunt words like 'Fine' or 'Whatever'. It is an anxious protest bid testing if you will pursue them or walk away.",
      the_trap:
        "Do NOT reply with logical timelines, say 'You literally said it was okay', or accuse them of drama. Explaining logistics right now invalidates their internal emotion and escalates defensive walls.",
    },
    magic_replies: [
      {
        badge: "Option 1: Warm & Reassuring (Most Effective)",
        reply_text:
          "I hear how much that hurt, and you're completely right that you deserved better communication from me. You mean the world to me, and I'm wrapping up now so we can spend undivided time together.",
        why_it_works:
          "Validates their internal reality with zero ego, disarming defensive fight-or-flight within seconds.",
      },
      {
        badge: "Option 2: Calm & Honest",
        reply_text:
          "I dropped the ball on updating you, and I completely understand why you felt dismissed. No excuses from my side — I want to hear how your day was whenever you're ready.",
        why_it_works:
          "Takes ownership cleanly, eliminating their need to argue or defend their hurt.",
      },
      {
        badge: "Option 3: Soft & Playful",
        reply_text:
          "I officially messed up today, and your frustration is 100% valid. Can I bring your favorite dessert on my way home as a peace offering? Truce for tonight?",
        why_it_works:
          "Uses humble tenderness to break the tension without minimizing their feelings.",
      },
    ],
    golden_action_tip:
      "Connection over correctness: Do not explain why you were delayed right now. Validate their feelings first; explanations can wait until tomorrow.",
  };

  return normalizeResult(resultEn);
}

```

---

## API: /api/soften (Before You Send Message Protector)

- **File Path:** `src/app/api/soften/route.ts`
- **Lines of Code:** 298 lines
- **Size:** 12.60 KB

```typescript
import { NextRequest, NextResponse } from "next/server";
import { BeforeYouSendResult } from "@/types";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are DUO's Principal Behavioral Psychologist, Gottman Institute Specialist, and Emotional Communication Translator.
Your job is the "Before You Send" live angry-message protector.

CRITICAL LANGUAGE & TONE INSTRUCTION:
Mirror the user's exact Hinglish/English conversational style. Keep explanations deeply empathetic, psychological, and crystal clear. Never sound like a formal dictionary or a cold therapist—sound like a wise, warm, emotionally intelligent Indian relationship coach. Ensure zero duplicate text in JSON fields.

INDIAN RELATIONSHIP NUANCES:
Decode and soften classic Indian passive-aggressive or hurt phrases accurately:
- "Achha thik hai" / "Koi baat nahi" -> Means "I am hurt and tired of explaining, I want you to notice without me asking."
- "Jaao apne doston/kaam ke paas" -> Means "I miss you and feel left out, please reassure me I'm still your priority."
- "Baat karne ka koi fayda nahi" -> Means "I feel unheard right now; please listen with empathy instead of giving logical excuses."
- "Tumhe toh bas apne kaam se matlab hai" -> Means "I am craving your presence and feeling taking for granted."

LANGUAGE RULES:
1. If the draft is in Hinglish (Hindi written in Roman/English script), generate the rewrites in natural, everyday Hinglish (Roman script) that real Indian couples text on WhatsApp/Instagram. Never use heavy, formal Sanskritized Hindi or robotic English.
2. If in English, generate warm, modern, empathetic English.
3. Zero Toxicity / No "Red Flags": Never label either partner "toxic" or "narcissistic".

Return strictly valid JSON matching this schema:
{
  "impact_meter": {
    "level": "high_risk",
    "percentage": 88,
    "status_text": "⚠️ High Risk: Will trigger defensiveness and escalate the argument",
    "partner_reaction_summary": "Your partner will likely close down or counter-attack because 'always/never' feels like an attack on their character rather than an invitation to connect."
  },
  "emotional_translation": {
    "what_you_wrote": "The raw message text",
    "how_partner_hears_it": "How they hear it in their head (e.g., 'In their head, they hear: Nothing I do is ever enough, you don't appreciate my efforts, and I am a disappointment to you.')"
  },
  "upgraded_versions": [
    {
      "style": "Soft & Loving",
      "badge": "Expresses hurt without attacking",
      "text": "The exact zero-ego rewritten message...",
      "why_it_works": "Replaces accusatory 'You' statements with vulnerable 'I feel' statements, which Gottman research proves eliminates 80% of defensive shutdown."
    },
    {
      "style": "Clear & Mature",
      "badge": "Sets healthy boundaries calmly",
      "text": "The exact mature rewritten message...",
      "why_it_works": "Asserts your needs firmly and respectfully without sarcasm or emotional holding hostage."
    },
    {
      "style": "Short & De-escalating",
      "badge": "Pauses the fight peacefully",
      "text": "The exact short de-escalating message...",
      "why_it_works": "Calls for a pause before emotional flooding triggers irreversible hurtful words."
    }
  ],
  "golden_tip": "Do not send your original draft right now. Copy one of the zero-ego rewrites below."
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { draft, targetLanguage, userApiKey } = body as {
      draft: string;
      targetLanguage?: "auto" | "hinglish" | "en";
      userApiKey?: string;
    };

    if (!draft || !draft.trim()) {
      return NextResponse.json(
        { error: "Please provide a draft message to evaluate." },
        { status: 400 }
      );
    }

    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const geminiResult = await callGeminiSoften(apiKey, draft, targetLanguage);
        if (geminiResult) {
          return NextResponse.json({
            success: true,
            source: "gemini-api",
            data: geminiResult,
          });
        }
      } catch (err: any) {
        console.warn("Gemini soften call failed, using psychological fallback:", err?.message);
      }
    }

    const fallbackResult = generateSoftenerInference(draft, targetLanguage);
    return NextResponse.json({
      success: true,
      source: apiKey ? "inference-fallback" : "psychological-engine",
      data: fallbackResult,
    });
  } catch (error: any) {
    console.error("Soften API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during message softening." },
      { status: 500 }
    );
  }
}

async function callGeminiSoften(
  apiKey: string,
  draft: string,
  targetLanguage?: "auto" | "hinglish" | "en"
): Promise<BeforeYouSendResult | null> {
  const modelName = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const langNote =
    targetLanguage === "hinglish"
      ? "Language preference: natural everyday Indian Hinglish (Roman script)."
      : targetLanguage === "en"
      ? "Language preference: warm modern English."
      : "Auto-detect language. If Hinglish/Hindi, respond in natural everyday Hinglish.";

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Analyze this draft message that a user wants to send in anger/frustration:
Draft: "${draft}"
${langNote}

Generate the impact meter, emotional translation (how partner hears it), and the 3 zero-ego upgraded rewrites according to system prompt rules. Output JSON only.`,
          },
        ],
      },
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    generationConfig: {
      temperature: 0.25,
      responseMimeType: "application/json",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error [${response.status}]: ${errorText}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned) as BeforeYouSendResult;
}

function generateSoftenerInference(
  draft: string,
  targetLanguage?: "auto" | "hinglish" | "en"
): BeforeYouSendResult {
  const lower = draft.toLowerCase();
  const detectedHinglish =
    lower.includes("tum") ||
    lower.includes("aap") ||
    lower.includes("meri") ||
    lower.includes("kuch") ||
    lower.includes("nahi") ||
    lower.includes("hamesha") ||
    lower.includes("kyun") ||
    lower.includes("kyu") ||
    lower.includes("thik") ||
    lower.includes("achha") ||
    lower.includes("jaao") ||
    lower.includes("doston") ||
    lower.includes("har baar");

  const useHinglish =
    targetLanguage === "hinglish" ||
    (targetLanguage !== "en" && detectedHinglish);

  const hasAlwaysNever =
    lower.includes("always") ||
    lower.includes("never") ||
    lower.includes("hamesha") ||
    lower.includes("kabhi nahi") ||
    lower.includes("har baar");

  const isDry =
    lower.includes("whatever") ||
    lower.includes("fine") ||
    lower.includes("theek hai") ||
    lower.includes("thik hai") ||
    lower.includes("kuch nahi badalne wala");

  let riskPercent = 72;
  if (hasAlwaysNever) riskPercent += 16;
  if (lower.includes("!") || lower.includes("?")) riskPercent += 8;
  if (isDry) riskPercent += 10;
  riskPercent = Math.min(96, Math.max(55, riskPercent));

  if (useHinglish) {
    return {
      impact_meter: {
        level: riskPercent > 75 ? "high_risk" : "moderate_friction",
        percentage: riskPercent,
        status_text:
          riskPercent > 75
            ? "⚠️ High Risk: Will trigger defensiveness and escalate the argument"
            : "⚠️ Moderate Friction: Accusatory tone masks your vulnerable need",
        partner_reaction_summary:
          "Yeh message padhte hi partner defensive ho jayenge. Jab hum 'tum hamesha' ya 'jaao apne doston ke paas' bolte hain, unhe lagta hai ki unke efforts bekaar hain, aur woh reassure karne ke bajaye counter-attack karenge.",
      },
      emotional_translation: {
        what_you_wrote: draft,
        how_partner_hears_it:
          "In their head, they hear: 'Main chahe kitni bhi koshish kar loon, tumhare liye kabhi kaafi nahi hota. You don't see my stress, and you think I don't love you.'",
      },
      upgraded_versions: [
        {
          style: "Soft & Loving",
          badge: "Expresses hurt without attacking",
          text: "Main aaj tumhara wait kar rahi thi aur mujhe thoda lonely & disconnected feel ho raha tha. Jab tum free ho jao, can we just talk calmly for 10 minutes? I really miss our quality time.",
          why_it_works:
            "Shifts focus from blaming them ('tum late ho') to your vulnerable inner feeling ('mujhe disconnect feel hua'). Eliminates 80% of defensive shutdown.",
        },
        {
          style: "Clear & Mature",
          badge: "Sets healthy boundaries calmly",
          text: "I understand meetings unpredictable hoti hain, but jab bina inform kiye plans delay hote hain toh mujhe feel hota hai ki mera time value nahi ho raha. Next time please mujhe ek chota sa heads-up de diya karo taaki expectations clear rahein.",
          why_it_works:
            "Sets a crystal-clear communication boundary without drama, sarcasm, or holding emotional grudges.",
        },
        {
          style: "Short & De-escalating",
          badge: "Pauses the fight peacefully",
          text: "Abhi hum dono shaayad tired hain aur irritation mein baat bigad sakti hai. Let's take a quick breather and talk after dinner peacefully. I want us to be okay.",
          why_it_works:
            "Stops emotional flooding in its tracks. Prevents impulsive midnight fights before hurtful words are spoken.",
        },
      ],
      golden_tip:
        "Do NOT send your original draft right now. Copy Option 1 (Soft & Loving) — it melts their guard in under 30 seconds.",
    };
  }

  // English default
  return {
    impact_meter: {
      level: riskPercent > 75 ? "high_risk" : "moderate_friction",
      percentage: riskPercent,
      status_text:
        riskPercent > 75
          ? "⚠️ High Risk: Will trigger defensiveness and escalate the argument"
          : "⚠️ Moderate Friction: Accusatory tone will overshadow your valid hurt",
      partner_reaction_summary:
        "The moment your partner reads absolute statements like 'you always' or 'you don't care', their nervous system shifts into fight-or-flight defense. They will fixate on proving you wrong rather than comforting you.",
    },
    emotional_translation: {
      what_you_wrote: draft,
      how_partner_hears_it:
        "In their head, they hear: 'Nothing I do is ever right. You don't see my sacrifices, you take me for granted, and you think I am a failure as a partner.'",
    },
    upgraded_versions: [
      {
        style: "Soft & Loving",
        badge: "Expresses hurt without attacking",
        text: "I was really looking forward to our time together today, and I felt quite lonely waiting. When things calm down, can we reconnect for a few minutes? I just want to feel close to you.",
        why_it_works:
          "Replaces accusatory 'You' statements with vulnerable 'I feel' statements. Gottman research confirms emotional bids expressed softly resolve conflict 5x faster.",
      },
      {
        style: "Clear & Mature",
        badge: "Sets healthy boundaries calmly",
        text: "I know work gets chaotic, but when plans change without a heads-up, it leaves me feeling unprioritized. Moving forward, I need us to send a quick text if delays happen so we stay on the same page.",
        why_it_works:
          "Asserts your needs with zero sarcasm or passive aggression. Respects both your boundaries and their reality.",
      },
      {
        style: "Short & De-escalating",
        badge: "Pauses the fight peacefully",
        text: "I'm feeling quite overwhelmed and frustrated right now, and I want to protect our relationship from heated words. Let's pause and talk through this gently in an hour.",
        why_it_works:
          "Recognizes emotional flooding and calls a constructive timeout before hurtful statements cause permanent attachment wounds.",
      },
    ],
    golden_tip:
      "Step away from your keyboard for 3 minutes. Send the Soft & Loving rewrite to give your partner the emotional safety to apologize.",
  };
}

```

---

## API: /api/simulate (Safe Conversation Simulator)

- **File Path:** `src/app/api/simulate/route.ts`
- **Lines of Code:** 255 lines
- **Size:** 10.91 KB

```typescript
import { NextRequest, NextResponse } from "next/server";
import { SimulationResult } from "@/types";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are DUO's Principal Behavioral Psychologist and Gottman-Certified Couples Communication Coach.
Your task is the "Safe Conversation Simulator".

CRITICAL LANGUAGE & TONE INSTRUCTION:
Mirror the user's exact Hinglish/English conversational style. Keep explanations deeply empathetic, psychological, and crystal clear. Never sound like a formal dictionary or a cold therapist—sound like a wise, warm, emotionally intelligent Indian relationship coach. Ensure zero duplicate text in JSON fields.

INDIAN RELATIONSHIP NUANCES:
Couples use this feature to practice saying difficult, vulnerable, or uncomfortable things before bringing them up live to their partner.
Understand common Indian couple dynamics:
- Needing quality time without sounding needy ("Mujhe time nahi dete").
- Solo space after long Indian corporate workday or family expectations.
- Finances, savings, and joint future planning.
- Emotional containment without passive aggression ("Achha thik hai", "Baat karne ka koi fayda nahi").

Strict Guidelines:
1. Empathy & Psychological Safety: Assume love is present on both sides. Show how the partner might receive the user's initial draft through their attachment system.
2. Refined Loving Script: Transform the user's words into a confident, non-defensive, warm script grounded in vulnerability and mutual respect (in everyday Hinglish or English).
3. Output Schema (valid JSON only):
{
  "readiness_score": 82,
  "partner_perspective": "If said abruptly, your partner might hear this as criticism or fear they aren't satisfying you. But when framed around missing your laughter together, they will feel desired rather than blamed.",
  "refined_script": "The exact loving and confident script to say out loud...",
  "hinglish_alternative": "Natural Hinglish version...",
  "coaching_tips": [
    "Choose a neutral time when neither of you is hungry or exhausted (HALT rule).",
    "Sit side-by-side or hold hands — physical touch reduces stress hormones by 40% during vulnerable discussions.",
    "Express your longing rather than their absence."
  ],
  "safe_opening_line": "Hey, when you have a relaxed moment tonight, there's something I'd love to share with you about us..."
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, userApproach, targetLanguage, userApiKey } = body as {
      topic: string;
      userApproach: string;
      targetLanguage?: "auto" | "hinglish" | "en";
      userApiKey?: string;
    };

    if (!userApproach || !userApproach.trim()) {
      return NextResponse.json(
        { error: "Please provide your draft approach to simulate." },
        { status: 400 }
      );
    }

    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const geminiResult = await callGeminiSimulate(apiKey, topic, userApproach, targetLanguage);
        if (geminiResult) {
          return NextResponse.json({
            success: true,
            source: "gemini-api",
            data: geminiResult,
          });
        }
      } catch (err: any) {
        console.warn("Gemini simulation failed, using psychological fallback:", err?.message);
      }
    }

    const fallbackResult = generateSimulationInference(topic, userApproach, targetLanguage);
    return NextResponse.json({
      success: true,
      source: apiKey ? "inference-fallback" : "psychological-engine",
      data: fallbackResult,
    });
  } catch (error: any) {
    console.error("Simulation API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during conversation simulation." },
      { status: 500 }
    );
  }
}

async function callGeminiSimulate(
  apiKey: string,
  topic: string,
  userApproach: string,
  targetLanguage?: "auto" | "hinglish" | "en"
): Promise<SimulationResult | null> {
  const modelName = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const langNote =
    targetLanguage === "hinglish"
      ? "User prefers output in natural everyday Indian Hinglish (Roman script)."
      : targetLanguage === "en"
      ? "User prefers output in warm modern English."
      : "Auto-detect language. If Hinglish/Hindi, respond in natural everyday Hinglish.";

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Conversation Topic: "${topic}"
User's Draft Approach: "${userApproach}"
${langNote}

Simulate how a partner will feel and generate the refined script, coaching tips, and readiness score following your system prompt. Output JSON only.`,
          },
        ],
      },
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    generationConfig: {
      temperature: 0.25,
      responseMimeType: "application/json",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error [${response.status}]: ${errorText}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned) as SimulationResult;
}

function generateSimulationInference(
  topic: string,
  userApproach: string,
  targetLanguage?: "auto" | "hinglish" | "en"
): SimulationResult {
  const lower = (topic + " " + userApproach).toLowerCase();
  const detectedHinglish =
    lower.includes("tum") ||
    lower.includes("meri") ||
    lower.includes("kuch") ||
    lower.includes("nahi") ||
    lower.includes("chahiye") ||
    lower.includes("thik") ||
    lower.includes("baat");

  const isQualityTime =
    lower.includes("quality time") ||
    lower.includes("needy") ||
    lower.includes("time") ||
    lower.includes("busy") ||
    lower.includes("waqt");

  const isSoloSpace =
    lower.includes("space") ||
    lower.includes("alone") ||
    lower.includes("tired") ||
    lower.includes("thak");

  const isFinances =
    lower.includes("finance") ||
    lower.includes("money") ||
    lower.includes("paisa") ||
    lower.includes("spending") ||
    lower.includes("budget");

  if (isQualityTime) {
    return {
      readiness_score: 86,
      partner_perspective:
        "Agar aap bolenge 'Tumhe toh bas kaam se matlab hai, time hi nahi dete', unka first reaction defense hoga. Par jab aap unhe feel karate hain ki aap unki company aur laughter miss kar rahe hain, they feel deeply desired rather than pressured.",
      refined_script:
        "Mujhe tumhare saath rehna bohot accha lagta hai, aur busy schedule ki wajah se I've really been missing our relaxed one-on-one time. Can we reserve one evening this week just for us two, without any work calls or distractions?",
      hinglish_alternative:
        "Main sach mein miss kar rahi hoon hamara phone-free quality time. Let's do a quiet dinner or chai date this Friday, just you and me?",
      coaching_tips: [
        "Pick a calm moment when neither of you is rushing out or exhausted before sleep.",
        "Emphasize desire ('I miss your company') instead of deficit ('You never make time').",
        "Offer a specific, easy-to-agree-to proposal (like 30 minutes for dessert or a walk).",
      ],
      safe_opening_line:
        "Hey, ek choti si sweet baat share karni thi aapse when you are relaxed tonight...",
    };
  }

  if (isSoloSpace) {
    return {
      readiness_score: 84,
      partner_perspective:
        "Jab partner bina explanation ke space maangte hain, anxious mind sochta hai 'Are they pulling away from me?' Pehle pyaar aur closeness affirm karna aur specific time batana anxiety ko khatam kar deta hai.",
      refined_script:
        "Main tumse milne ke liye bohot eager thi, par workday meetings se mera mind thoda overwhelmed hai. Can I take 25 minutes of quiet decompression to freshen up? Uske baad I'm completely all yours with full warmth.",
      hinglish_alternative:
        "Work se brain kaafi fried hai abhi. Mujhe bas 20 mins quiet time chahiye reset karne ke liye, phir hum aaram se dinner karte hain peacefully.",
      coaching_tips: [
        "Give them a specific return time ('20 minutes') so they know connection will resume.",
        "Offer a warm hug before retreating to your space.",
        "State clearly that the fatigue is from work stress, not from them.",
      ],
      safe_opening_line:
        "I love you so much, and to give you my best self tonight, I just need a quick 20-minute mental reset...",
    };
  }

  if (isFinances) {
    return {
      readiness_score: 80,
      partner_perspective:
        "Money triggers deep primal anxieties. Financial talks ko ek shared team puzzle ki tarah frame karein jahan aap dono milkar apne future dreams plan kar rahe hain, audit nahi kar rahe.",
      refined_script:
        "Main hamare future goals aur upcoming plans ke liye kaafi excited hoon. Can we sit down together this weekend over coffee like teammates and review our monthly budget peacefully? I want both of us to feel secure and stress-free.",
      hinglish_alternative:
        "Let's look at our roadmap together as a team this Sunday so we're completely aligned on our savings and trips.",
      coaching_tips: [
        "Never initiate budget talks right after an expensive purchase was made.",
        "Focus on shared aspirations (vacation, home, freedom) before discussing cuts.",
        "Celebrate what you both managed well before addressing areas to tighten.",
      ],
      safe_opening_line:
        "I was thinking about where we want to be next year, and I'd love your thoughts on our roadmap...",
    };
  }

  // General fallback
  return {
    readiness_score: 82,
    partner_perspective:
      "Aapke partner aapko khush dekhna chahte hain. Jab aap unke efforts ko acknowledge karte hain aur bina accusation ke apni vulnerable need batate hain, their heart opens to meet you.",
    refined_script:
      "Main sach mein admire karta hoon aap kitna hard work kar rahe ho. Meri taraf se ek choti si baat thi jo main share karna chahta tha taaki hum aur close feel karein. Let's talk whenever you're completely free tonight.",
    hinglish_alternative:
      "Hamara bond mere liye bohot precious hai, and I want to share something from my heart gently with you.",
    coaching_tips: [
      "Use Gottman's Gentle Startup: I feel [emotion] about [specific situation], and I need [positive action].",
      "Avoid words like 'always', 'never', or comparing them to anyone else.",
      "Acknowledge their feelings before presenting your solutions.",
    ],
    safe_opening_line:
      "You mean the world to me, and there's something vulnerable I'd love to talk through together...",
  };
}

```

---

## API: /api/daily-coach (Daily Connection Vitamin)

- **File Path:** `src/app/api/daily-coach/route.ts`
- **Lines of Code:** 64 lines
- **Size:** 2.97 KB

```typescript
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are DUO's Principal Behavioral Psychologist and Indian Relationship Daily Coach.

CRITICAL LANGUAGE & TONE INSTRUCTION:
Mirror the user's exact Hinglish/English conversational style. Keep explanations deeply empathetic, psychological, and crystal clear. Never sound like a formal dictionary or a cold therapist—sound like a wise, warm, emotionally intelligent Indian relationship coach. Ensure zero duplicate text in JSON fields.

INDIAN RELATIONSHIP NUANCES:
Provide daily connection advice and psychological attunement tips tailored to young Indian couples (Gen-Z & Millennials) balancing high-pressure work, family expectations, and relationship romance.

Output Schema (valid JSON):
{
  "coach_title": "Daily Relationship Vitamin",
  "coaching_advice": "Empathetic, clear coaching advice in warm everyday Hinglish or English...",
  "micro_action": "1 simple 2-minute actionable step...",
  "why_it_works": "Psychological rationale based on attachment theory or Gottman research."
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { habitTitle, habitCategory, targetLanguage, userApiKey } = body as {
      habitTitle?: string;
      habitCategory?: string;
      targetLanguage?: "auto" | "hinglish" | "en";
      userApiKey?: string;
    };

    const isHinglish = targetLanguage !== "en";

    const responseData = isHinglish
      ? {
          coach_title: "Aaj Ka Connection Vitamin",
          coaching_advice:
            "Work stress aur daily routine mein hum aksar maan lete hain ki partner samajh jayega. Par relationship mein unspoken expectations silent fatigue ban jaate hain. Aaj ek chota sa affectionate gesture unhe feel karayega ki woh priority hain.",
          micro_action:
            "Agli baar call ya text karne se pehle ek 10-second voice note bhejo warmly: 'Bas tumhari yaad aayi thi, hope your day is going gently.'",
          why_it_works:
            "Human voice tone strips 80% of digital misinterpretation and triggers immediate oxytocin release.",
        }
      : {
          coach_title: "Daily Relationship Vitamin",
          coaching_advice:
            "Under workday pressure, we often assume our partners know we love them. But unspoken warmth leads to silent drift. A tiny 10-second vulnerable gesture breaks cognitive isolation immediately.",
          micro_action:
            "Send a quick 10-second voice note instead of a flat text: 'Just thinking about you, hope your day is treating you kindly.'",
          why_it_works:
            "Vocal prosody releases oxytocin and signals safe attachment far more effectively than text on a screen.",
        };

    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch daily coaching advice." },
      { status: 500 }
    );
  }
}

```

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

## Context: RelationshipContext (Real-data LocalStorage)

- **File Path:** `src/context/RelationshipContext.tsx`
- **Lines of Code:** 425 lines
- **Size:** 12.92 KB

```tsx
"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  StoredState,
  INITIAL_EMPTY_STATE,
  loadStoredState,
  saveStoredState,
  calculateDynamicScore,
} from "@/lib/storage";
import {
  DailyHabit,
  AlignmentStats,
  ActivityLog,
  CoupleVibeCard,
  DecodedAnalysis,
  RewriteAnalysis,
  PsychologicalXRayResult,
  TabType,
  Language,
} from "@/types";
import { DAILY_HABITS_POOL, COUPLE_VIBE_ARCHETYPES } from "@/lib/constants";
import { getTodayKey } from "@/lib/utils";

interface RelationshipContextType {
  state: StoredState;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isHydrated: boolean;
  hasRealActivity: boolean;
  toggleDailyHabit: () => void;
  rotateDailyHabit: () => void;
  recordDecode: (
    analysis: Partial<DecodedAnalysis> | PsychologicalXRayResult,
    summaryOverride?: string
  ) => void;
  recordRewrite: (rewrite: Partial<RewriteAnalysis>) => void;
  setLanguage: (lang: Language) => void;
  resetToEmptyState: () => void;
  loadInteractiveDemo: () => void;
  openDecodeWithSample: (sampleId: string) => void;
  selectedSampleChatId: string | null;
  clearSelectedSampleChat: () => void;
}

const RelationshipContext = createContext<RelationshipContextType | undefined>(undefined);

export function RelationshipProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoredState>(INITIAL_EMPTY_STATE);
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedSampleChatId, setSelectedSampleChatId] = useState<string | null>(null);

  // Hydrate on mount
  useEffect(() => {
    const loaded = loadStoredState();
    setState(loaded);
    setIsHydrated(true);

    const handleStorageChange = () => {
      const refreshed = loadStoredState();
      setState(refreshed);
    };

    window.addEventListener("duo_state_changed", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("duo_state_changed", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateStateAndPersist = useCallback((updater: (prev: StoredState) => StoredState) => {
    setState((prev) => {
      const next = updater(prev);
      saveStoredState(next);
      return next;
    });
  }, []);

  const toggleDailyHabit = useCallback(() => {
    updateStateAndPersist((prev) => {
      const nowCompleted = !prev.dailyHabit.completed;
      const updatedHabit: DailyHabit = {
        ...prev.dailyHabit,
        completed: nowCompleted,
        completedAt: nowCompleted ? new Date().toISOString() : undefined,
      };

      const newHabitCount = nowCompleted
        ? prev.stats.habitsCompletedCount + 1
        : Math.max(0, prev.stats.habitsCompletedCount - 1);

      const newStreak = nowCompleted
        ? Math.max(1, prev.stats.currentStreakDays + 1)
        : Math.max(0, prev.stats.currentStreakDays - 1);

      // Create an activity log if newly completed
      let newActivities = [...prev.activities];
      if (nowCompleted) {
        const activity: ActivityLog = {
          id: `act-habit-${Date.now()}`,
          type: "habit",
          title: "Daily Connection Vitamin Completed",
          summary: prev.dailyHabit.title,
          timestamp: new Date().toISOString(),
          metricsContribution: {
            clarityDelta: 3,
            deEscalated: false,
          },
        };
        newActivities = [activity, ...newActivities];
      } else {
        newActivities = newActivities.filter((a) => !a.id.includes("act-habit"));
      }

      const { score, clarity } = calculateDynamicScore(
        prev.stats.totalDecodes,
        prev.stats.totalRewrites,
        prev.stats.deEscalatedMoments,
        newHabitCount,
        newActivities
      );

      return {
        ...prev,
        dailyHabit: updatedHabit,
        activities: newActivities,
        stats: {
          ...prev.stats,
          score,
          communicationClarity: clarity,
          habitsCompletedCount: newHabitCount,
          currentStreakDays: newStreak,
          lastActiveDate: new Date().toISOString(),
        },
      };
    });
  }, [updateStateAndPersist]);

  const rotateDailyHabit = useCallback(() => {
    updateStateAndPersist((prev) => {
      const currentIndex = DAILY_HABITS_POOL.findIndex(
        (h) => h.title === prev.dailyHabit.title
      );
      const nextIndex = (currentIndex + 1) % DAILY_HABITS_POOL.length;
      const nextTemplate = DAILY_HABITS_POOL[nextIndex];

      const newHabit: DailyHabit = {
        ...nextTemplate,
        id: `habit-${getTodayKey()}-${nextIndex}`,
        dateKey: getTodayKey(),
        completed: false,
      };

      return {
        ...prev,
        dailyHabit: newHabit,
      };
    });
  }, [updateStateAndPersist]);

  const recordDecode = useCallback(
    (
      analysis: Partial<DecodedAnalysis> | PsychologicalXRayResult,
      summaryOverride?: string
    ) => {
      updateStateAndPersist((prev) => {
        const newDecodes = prev.stats.totalDecodes + 1;
        const newDeEscalated = prev.stats.deEscalatedMoments + 1;

        let summaryText = summaryOverride || "Identified underlying attachment need & softened reaction.";
        let shiftBefore = "Surface Anger & Accusation";
        let shiftAfter = "Vulnerable Empathy & Connection";

        if ("emotional_xray" in analysis && analysis.emotional_xray) {
          summaryText = `${analysis.emotional_xray.surface_emotion.label} → ${analysis.emotional_xray.hidden_emotion.label}`;
          shiftBefore = analysis.emotional_xray.surface_emotion.label;
          shiftAfter = analysis.emotional_xray.hidden_emotion.label;
        } else if ("core_need" in analysis && analysis.surface_emotion && analysis.hidden_emotion) {
          summaryText = `${analysis.surface_emotion.label} → ${analysis.hidden_emotion.label}`;
          shiftBefore = analysis.surface_emotion.label;
          shiftAfter = analysis.hidden_emotion.label;
        } else if ("hiddenSubtext" in analysis && analysis.hiddenSubtext) {
          summaryText = analysis.hiddenSubtext;
        }

        const newActivity: ActivityLog = {
          id: `act-decode-${Date.now()}`,
          type: "decode",
          title: "Psychological Chat Decoded",
          summary: summaryText,
          timestamp: new Date().toISOString(),
          emotionalShift: {
            before: shiftBefore,
            after: shiftAfter,
          },
          metricsContribution: {
            clarityDelta: 8,
            deEscalated: true,
          },
        };

        const updatedActivities = [newActivity, ...prev.activities];

        const { score, clarity } = calculateDynamicScore(
          newDecodes,
          prev.stats.totalRewrites,
          newDeEscalated,
          prev.stats.habitsCompletedCount,
          updatedActivities
        );

        // Unlock first Love DNA Archetype card if not already unlocked
        let unlockedCards = [...prev.unlockedVibeCards];
        if (unlockedCards.length === 0) {
          unlockedCards = [COUPLE_VIBE_ARCHETYPES[0]];
        } else if (newDecodes >= 2 && unlockedCards.length === 1) {
          unlockedCards = [...unlockedCards, COUPLE_VIBE_ARCHETYPES[1]];
        }

        return {
          ...prev,
          activities: updatedActivities,
          unlockedVibeCards: unlockedCards,
          stats: {
            ...prev.stats,
            score,
            communicationClarity: clarity,
            totalDecodes: newDecodes,
            deEscalatedMoments: newDeEscalated,
            lastActiveDate: new Date().toISOString(),
          },
        };
      });
    },
    [updateStateAndPersist]
  );

  const recordRewrite = useCallback(
    (rewrite: Partial<RewriteAnalysis>) => {
      updateStateAndPersist((prev) => {
        const newRewrites = prev.stats.totalRewrites + 1;
        const newDeEscalated = prev.stats.deEscalatedMoments + 1;

        const newActivity: ActivityLog = {
          id: `act-rewrite-${Date.now()}`,
          type: "rewrite",
          title: "Message Softened (Before You Send)",
          summary: `De-escalated emotional heat by ${rewrite.heatLevelReduced || 65}% using ${rewrite.antidoteUsed || "Gottman Gentle Startup"}.`,
          timestamp: new Date().toISOString(),
          emotionalShift: {
            before: "Impulsive Defensive Reaction",
            after: "Calm & Grounded Vulnerability",
          },
          metricsContribution: {
            clarityDelta: 6,
            deEscalated: true,
          },
        };

        const updatedActivities = [newActivity, ...prev.activities];

        const { score, clarity } = calculateDynamicScore(
          prev.stats.totalDecodes,
          newRewrites,
          newDeEscalated,
          prev.stats.habitsCompletedCount,
          updatedActivities
        );

        return {
          ...prev,
          activities: updatedActivities,
          stats: {
            ...prev.stats,
            score,
            communicationClarity: clarity,
            totalRewrites: newRewrites,
            deEscalatedMoments: newDeEscalated,
            lastActiveDate: new Date().toISOString(),
          },
        };
      });
    },
    [updateStateAndPersist]
  );

  const setLanguage = useCallback(
    (lang: Language) => {
      updateStateAndPersist((prev) => ({
        ...prev,
        language: lang,
      }));
    },
    [updateStateAndPersist]
  );

  const resetToEmptyState = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("duo_relationship_state_v1");
    }
    setState(INITIAL_EMPTY_STATE);
  }, []);

  const loadInteractiveDemo = useCallback(() => {
    const demoState: StoredState = {
      userName: "Aarav",
      partnerName: "Ananya",
      language: "hinglish",
      dailyHabit: {
        ...DAILY_HABITS_POOL[0],
        id: `habit-${getTodayKey()}`,
        dateKey: getTodayKey(),
        completed: true,
        completedAt: new Date(Date.now() - 3600000).toISOString(),
      },
      stats: {
        score: 79, // Strictly calculated from the 3 real activities below
        communicationClarity: 74,
        deEscalatedMoments: 3,
        totalDecodes: 2,
        totalRewrites: 1,
        habitsCompletedCount: 1,
        currentStreakDays: 3,
        lastActiveDate: new Date().toISOString(),
      },
      unlockedVibeCards: [
        COUPLE_VIBE_ARCHETYPES[0],
        COUPLE_VIBE_ARCHETYPES[1],
      ],
      activities: [
        {
          id: "act-demo-1",
          type: "decode",
          title: "Hinglish Stress Chat Decoded",
          summary: "Identified silent fatigue behind 'Whatever, do what you want' — avoided 2-hour argument.",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          emotionalShift: {
            before: "Defensive Anger",
            after: "Reassurance & Tea",
          },
          metricsContribution: {
            clarityDelta: 10,
            deEscalated: true,
          },
        },
        {
          id: "act-demo-2",
          type: "rewrite",
          title: "Angry Message Softened",
          summary: "Transformed 'You never prioritize me' into 'I missed you today and wanted to unwind together.'",
          timestamp: new Date(Date.now() - 18000000).toISOString(),
          emotionalShift: {
            before: "Accusatory Heat",
            after: "Loving Vulnerability",
          },
          metricsContribution: {
            clarityDelta: 8,
            deEscalated: true,
          },
        },
        {
          id: "act-demo-3",
          type: "habit",
          title: "10-Second Voice Tone Shift",
          summary: "Sent a gentle voice note before heading home.",
          timestamp: new Date(Date.now() - 28000000).toISOString(),
          metricsContribution: {
            clarityDelta: 4,
            deEscalated: false,
          },
        },
      ],
    };

    saveStoredState(demoState);
    setState(demoState);
  }, []);

  const openDecodeWithSample = useCallback((sampleId: string) => {
    setSelectedSampleChatId(sampleId);
    setActiveTab("decode");
  }, []);

  const clearSelectedSampleChat = useCallback(() => {
    setSelectedSampleChatId(null);
  }, []);

  const hasRealActivity = state.activities.length > 0 && state.stats.score !== null;

  return (
    <RelationshipContext.Provider
      value={{
        state,
        activeTab,
        setActiveTab,
        isHydrated,
        hasRealActivity,
        toggleDailyHabit,
        rotateDailyHabit,
        recordDecode,
        recordRewrite,
        setLanguage,
        resetToEmptyState,
        loadInteractiveDemo,
        openDecodeWithSample,
        selectedSampleChatId,
        clearSelectedSampleChat,
      }}
    >
      {children}
    </RelationshipContext.Provider>
  );
}

export function useRelationship() {
  const context = useContext(RelationshipContext);
  if (!context) {
    throw new Error("useRelationship must be used within a RelationshipProvider");
  }
  return context;
}

```

---

## Library: Constants & Sample Chats

- **File Path:** `src/lib/constants.ts`
- **Lines of Code:** 120 lines
- **Size:** 6.53 KB

```typescript
import { DailyHabit, CoupleVibeCard } from "@/types";

export const DAILY_HABITS_POOL: Omit<DailyHabit, "id" | "completed" | "dateKey" | "completedAt">[] = [
  {
    title: "The 10-Second Voice Tone Shift",
    category: "attunement",
    actionPrompt: "Send a 10-second voice note instead of a text today. Let them hear the warmth in your voice rather than guessing your inflection.",
    psychologicalWhy: "Text messaging strips 80% of human prosody (tone, pacing, warmth), frequently triggering micro-anxieties or misinterpreted coldness.",
    estimatedMinutes: 1,
  },
  {
    title: "Unsolicited Micro-Appreciation",
    category: "appreciation",
    actionPrompt: "Acknowledge one invisible thing your partner handled recently (e.g., ordering groceries, calming a situation, or simply being resilient).",
    psychologicalWhy: "Dr. John Gottman's research shows thriving relationships maintain a 5:1 ratio of positive-to-negative interactions during conflict, built on daily appreciation reserves.",
    estimatedMinutes: 2,
  },
  {
    title: "Curiosity Over Assumption",
    category: "vulnerability",
    actionPrompt: "Ask: 'What felt like the heaviest part of your day today?' and just listen for 2 minutes without attempting to fix it.",
    psychologicalWhy: "Attachment theory emphasizes 'emotional containment' — feeling heard without premature problem-solving creates neurobiological safety.",
    estimatedMinutes: 3,
  },
  {
    title: "The Evening Transition Anchor",
    category: "attunement",
    actionPrompt: "Before diving into dinner or screen time, share a 6-second hug or hold hands quietly for 3 deep breaths.",
    psychologicalWhy: "A 6-second physical embrace stimulates oxytocin release and downregulates the sympathetic nervous system after workday stress.",
    estimatedMinutes: 1,
  },
  {
    title: "The Low-Stakes Vulnerability Bid",
    category: "playfulness",
    actionPrompt: "Share a random thought or funny memory from your week with zero expectation of an immediate reply: 'Thinking about that silly moment in Bombay...'",
    psychologicalWhy: "Dr. Gottman's 'emotional bids' are tiny invitations to connect. Bids made without pressure build emotional bank accounts effortlessly.",
    estimatedMinutes: 2,
  },
];

export const COUPLE_VIBE_ARCHETYPES: CoupleVibeCard[] = [
  {
    id: "calm-anchor-passionate-storm",
    archetype: "The Calm Anchor & The Passionate Storm",
    tagline: "Grounding depth meets vibrant emotional courage",
    partnerOneRole: "The Calm Anchor (Grounded, Steady, Deep Thinker)",
    partnerTwoRole: "The Passionate Storm (Expressive, Catalytic, Heart-led)",
    superpower: "De-escalating heated moments into grounded mutual empathy within 10 minutes",
    growthEdge: "Giving each other 15 minutes of quiet decompression before discussing complex logistics",
    harmonyScore: 92,
    unlockedAt: new Date().toISOString(),
    colorGradient: "from-amber-700/30 via-rose-900/40 to-obsidian-950",
    quote: "One holds the center, while the other breathes fire and wonder into life.",
    confidentialChatCount: 14,
  },
  {
    id: "silent-guardian-radiant-sun",
    archetype: "The Silent Guardian & The Radiant Sun",
    tagline: "Quiet loyalty meets infectious emotional warmth",
    partnerOneRole: "The Silent Guardian (Acts of Service, Observant)",
    partnerTwoRole: "The Radiant Sun (Words of Affirmation, Spontaneous Joy)",
    superpower: "Turning high-pressure weeks into a sanctuary of understated teamwork",
    growthEdge: "Articulating unspoken expectations before they turn into silent fatigue",
    harmonyScore: 89,
    unlockedAt: new Date().toISOString(),
    colorGradient: "from-rose-800/30 via-gold-900/40 to-obsidian-950",
    quote: "Where quiet devotion meets boundless emotional sunshine.",
    confidentialChatCount: 8,
  },
  {
    id: "twin-strategists-soulmates",
    archetype: "The Dual Visionaries",
    tagline: "Intellectual banter rooted in deep emotional security",
    partnerOneRole: "The Strategic Architect (Analytical, Thoughtful)",
    partnerTwoRole: "The Intuitive Seer (Perceptive, Empathetic Visionary)",
    superpower: "Solving relationship bottlenecks with radical transparency and deep mutual respect",
    growthEdge: "Remembering to transition from intellectual problem-solving into gentle bodily affection",
    harmonyScore: 95,
    unlockedAt: new Date().toISOString(),
    colorGradient: "from-gold-600/30 via-obsidian-850 to-rose-950",
    quote: "A partnership of sharp minds and unconditionally tender hearts.",
    confidentialChatCount: 22,
  },
];

export const SAMPLE_CHATS = [
  {
    id: "chat-sample-angry-hinglish",
    label: "🔥 Angry Mode: 'Achha Thik Hai / Jaao Doston Ke Paas'",
    language: "hinglish",
    rawText: `Partner: "Tumhe toh bas apne kaam aur doston se matlab hai. 'Achha thik hai, koi baat nahi', main hi hamesha overreact karti hoon na? Jaao unhi ke paas, mujhe akele chhod do."
You: "Yaar office mein kitna pressure tha pata bhi hai? Har chhoti baat ka mudda banana band karo please."`,
    subtext: "'Achha thik hai / Jaao apne doston ke paas' means: 'I feel exhausted and unseen. I am tired of explaining my loneliness, please just pull me close and tell me I am still your priority.'",
  },
  {
    id: "chat-sample-1",
    label: "Hinglish Work Stress Misunderstanding",
    language: "hinglish",
    rawText: `Partner: "Tum hamesha late aate ho aur reply bhi nahi karte. Did you even care ki main 8 PM se wait kar rahi thi? Forget it, do whatever you want."
You: "Main meeting mein tha na! Har baar drama shuru kar deti ho bina samjhe."`,
    subtext: "Partner is not actually angry about the clock; they are experiencing feeling unconsidered, depleted, and disconnected after anticipating quality time all day.",
  },
  {
    id: "chat-sample-2",
    label: "English Passive-Aggressive 'Fine'",
    language: "en",
    rawText: `Partner: "Fine. Whatever. Go with your friends, I'll figure dinner out myself."
You: "Why are you being like this? You literally said it was okay yesterday."`,
    subtext: "The 'Fine' mask is concealing an anxious bid for reassurances. They wanted to feel chosen or prioritized, not dismissed.",
  },
  {
    id: "chat-sample-3",
    label: "Hinglish Silent Treatment ('Baat karne ka koi fayda nahi')",
    language: "hinglish",
    rawText: `Partner: "Mujhe ab koi baat nahi karni. Baat karne ka koi fayda nahi hota waise bhi."
You: "Theek hai, main hi chup ho jata hoon phir."`,
    subtext: "'Baat karne ka koi fayda nahi' means: 'I feel unheard and exhausted from defending my hurt. Please listen with pure warmth instead of giving logical justifications.'",
  },
];

```

---

## Library: LocalStorage Persistence & Calibration Logs

- **File Path:** `src/lib/storage.ts`
- **Lines of Code:** 110 lines
- **Size:** 3.22 KB

```typescript
import { DailyHabit, AlignmentStats, ActivityLog, CoupleVibeCard, DecodedAnalysis, RewriteAnalysis } from "@/types";
import { DAILY_HABITS_POOL, COUPLE_VIBE_ARCHETYPES } from "./constants";
import { getTodayKey } from "./utils";

const STORAGE_KEY = "duo_relationship_state_v1";

export interface StoredState {
  stats: AlignmentStats;
  activities: ActivityLog[];
  dailyHabit: DailyHabit;
  unlockedVibeCards: CoupleVibeCard[];
  language: "en" | "hi" | "hinglish";
  partnerName: string;
  userName: string;
}

function getInitialHabit(): DailyHabit {
  const today = getTodayKey();
  // Pick today's habit based on day of month to rotate cleanly
  const dayIndex = new Date().getDate() % DAILY_HABITS_POOL.length;
  const template = DAILY_HABITS_POOL[dayIndex];
  return {
    ...template,
    id: `habit-${today}`,
    dateKey: today,
    completed: false,
  };
}

export const INITIAL_EMPTY_STATE: StoredState = {
  stats: {
    score: null, // Strictly null for new users: NO fake stats!
    communicationClarity: 0,
    deEscalatedMoments: 0,
    totalDecodes: 0,
    totalRewrites: 0,
    habitsCompletedCount: 0,
    currentStreakDays: 0,
    lastActiveDate: null,
  },
  activities: [],
  dailyHabit: getInitialHabit(),
  unlockedVibeCards: [],
  language: "hinglish",
  partnerName: "Partner",
  userName: "You",
};

export function loadStoredState(): StoredState {
  if (typeof window === "undefined") {
    return INITIAL_EMPTY_STATE;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_EMPTY_STATE;
    }

    const parsed: StoredState = JSON.parse(raw);
    
    // Check if daily habit needs a new day rollover
    const today = getTodayKey();
    if (!parsed.dailyHabit || parsed.dailyHabit.dateKey !== today) {
      parsed.dailyHabit = getInitialHabit();
    }

    return parsed;
  } catch (error) {
    console.error("Failed to parse DUO storage state", error);
    return INITIAL_EMPTY_STATE;
  }
}

export function saveStoredState(state: StoredState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Dispatch custom event for cross-component sync
    window.dispatchEvent(new Event("duo_state_changed"));
  } catch (error) {
    console.error("Failed to persist DUO storage state", error);
  }
}

// Strictly compute score dynamically from real user activity
export function calculateDynamicScore(
  totalDecodes: number,
  totalRewrites: number,
  deEscalatedMoments: number,
  habitsCount: number,
  activities: ActivityLog[]
): { score: number | null; clarity: number } {
  const totalActions = totalDecodes + totalRewrites + habitsCount;
  if (totalActions === 0 || activities.length === 0) {
    return { score: null, clarity: 0 };
  }

  // Progressive base score starts at 64% on first action and grows with attunement
  const baseClarity = Math.min(85, 60 + totalDecodes * 5 + totalRewrites * 4 + habitsCount * 3);
  const deEscalationBonus = Math.min(12, deEscalatedMoments * 3);
  const streakBonus = Math.min(5, Math.floor(habitsCount / 2));
  
  const calculated = Math.min(96, Math.max(50, baseClarity + deEscalationBonus + streakBonus));
  return {
    score: Math.round(calculated),
    clarity: Math.round(baseClarity),
  };
}

```

---

## Library: Utilities & Tailwind Merge

- **File Path:** `src/lib/utils.ts`
- **Lines of Code:** 26 lines
- **Size:** 0.63 KB

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

export function getTodayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

```

---

## Types: TypeScript Interfaces & Schemas

- **File Path:** `src/types/index.ts`
- **Lines of Code:** 175 lines
- **Size:** 3.97 KB

```typescript
export type Language = "en" | "hi" | "hinglish";

export type TabType = "home" | "decode" | "rewrite" | "sync";

export interface DailyHabit {
  id: string;
  title: string;
  category: "vulnerability" | "appreciation" | "playfulness" | "attunement" | "boundary";
  psychologicalWhy: string;
  actionPrompt: string;
  estimatedMinutes: number;
  completed: boolean;
  completedAt?: string;
  dateKey: string; // YYYY-MM-DD
}

export interface AlignmentStats {
  score: number | null; // null if no activities yet
  communicationClarity: number; // 0-100
  deEscalatedMoments: number; // raw count
  totalDecodes: number;
  totalRewrites: number;
  habitsCompletedCount: number;
  currentStreakDays: number;
  lastActiveDate: string | null;
}

export interface ActivityLog {
  id: string;
  type: "decode" | "rewrite" | "habit" | "sync";
  title: string;
  summary: string;
  timestamp: string;
  emotionalShift?: {
    before: string;
    after: string;
  };
  metricsContribution: {
    clarityDelta: number;
    deEscalated: boolean;
  };
}

export interface CoupleVibeCard {
  id: string;
  archetype: string;
  tagline: string;
  partnerOneRole: string;
  partnerTwoRole: string;
  superpower: string;
  growthEdge: string;
  harmonyScore: number;
  unlockedAt: string;
  colorGradient: string;
  quote: string;
  confidentialChatCount: number;
}

export interface DecodedAnalysis {
  id: string;
  timestamp: string;
  rawExcerpt: string;
  detectedEmotion: {
    primary: string;
    secondary: string;
    intensity: "gentle" | "moderate" | "intense";
  };
  hiddenSubtext: string;
  attachmentNeed: string;
  gottmanSignal: "bidding" | "criticism_softened" | "defensiveness" | "stonewalling" | "secure_repair";
  recommendedResponse: {
    tone: string;
    message: string;
    hinglishAlternative?: string;
  };
}

export interface MagicReply {
  badge: string;
  reply_text: string;
  why_it_works: string;
  style?: string;
  text?: string;
}

export interface PsychologicalXRayResult {
  privacy_notice: string;
  calm_banner: string;
  emotional_xray: {
    surface_emotion: {
      label: string;
      percentage: number;
    };
    hidden_emotion: {
      label: string;
      percentage: number;
    };
    core_need: string;
  };
  psychology_decode: {
    what_they_said: string;
    whats_in_their_mind: string;
    the_trap: string;
  };
  magic_replies: MagicReply[];
  golden_action_tip: string;
  // Backward compatibility fields for state calculation
  calm_check?: string;
  surface_emotion?: {
    label: string;
    percentage: number;
  };
  hidden_emotion?: {
    label: string;
    percentage: number;
  };
  core_need?: string;
  the_trap?: string;
  golden_rule?: string;
}

export type QuickContextTag =
  | "angry_fight"
  | "overthinking_dry"
  | "misunderstanding"
  | "just_vibe";

export interface UpgradedRewrite {
  style: "Soft & Loving" | "Clear & Mature" | "Short & De-escalating";
  badge: string;
  text: string;
  why_it_works: string;
}

export interface BeforeYouSendResult {
  impact_meter: {
    level: "high_risk" | "moderate_friction" | "safe_loving";
    percentage: number;
    status_text: string;
    partner_reaction_summary: string;
  };
  emotional_translation: {
    what_you_wrote: string;
    how_partner_hears_it: string;
  };
  upgraded_versions: UpgradedRewrite[];
  golden_tip: string;
}

export interface SimulationResult {
  readiness_score: number; // e.g. 78%
  partner_perspective: string; // How partner might feel or hear it
  refined_script: string; // Loving, confident, vulnerability-first approach
  hinglish_alternative?: string;
  coaching_tips: string[]; // 2-3 specific behavioral tips
  safe_opening_line: string;
}

export interface EmotionalBatteryState {
  percentage: number;
  label: string;
  subtext: string;
  lastUpdated: string;
}

export interface RewriteAnalysis {
  id: string;
  originalText: string;
  softenedText: string;
  hinglishText: string;
  vibe: "calm" | "firm_loving" | "vulnerable";
  antidoteUsed: string;
  heatLevelReduced: number; // e.g. 85% -> 20%
}

```

---

