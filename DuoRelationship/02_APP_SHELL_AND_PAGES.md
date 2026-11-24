# DUO — App Shell, Layout & Global Styles

This file contains the complete source code for **App Shell, Layout & Global Styles** in DUO.

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

