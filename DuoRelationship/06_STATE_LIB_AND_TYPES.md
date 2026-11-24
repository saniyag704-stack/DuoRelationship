# DUO — Context State, Constants, Storage & Types

This file contains the complete source code for **Context State, Constants, Storage & Types** in DUO.

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

