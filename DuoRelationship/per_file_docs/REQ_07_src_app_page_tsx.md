# Requirement Specification & Source Code
## REQ_07: Main Application Shell & Tab Router

> **File Path:** `src/app/page.tsx`  
> **Layer:** `Controller Layer` · **Category:** `App Shell`  
> **Lines of Code:** 67 lines · **Size:** 2.15 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

Smoothly controls transition between the 4 mature relationship hubs (Home, Decode, Before You Send, Spark & Sync) without page reloads or cognitive friction.

---

### 📋 2. Functional & Technical Requirements

1. **Listens to activeTab state from RelationshipContext.:** Listens to activeTab state from RelationshipContext.
2. **Conditionally renders DecodePreview, SoftenerPreview, SyncPreview, or the HomeDashboard.:** Conditionally renders DecodePreview, SoftenerPreview, SyncPreview, or the HomeDashboard.
3. **Displays the prominent SecurityBadge on every main view.:** Displays the prominent SecurityBadge on every main view.

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* Playwright verifies clicking each bottom nav tab swaps the main view immediately.

---

### 💻 5. Complete Verbatim Source Code

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

import { SecurityBadge } from "@/components/layout/SecurityBadge";

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
      {/* Prominent Trust-First Architecture Security Badge */}
      <SecurityBadge />

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
