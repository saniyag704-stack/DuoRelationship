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
