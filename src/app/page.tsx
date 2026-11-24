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
