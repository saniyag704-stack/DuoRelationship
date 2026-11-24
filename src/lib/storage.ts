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
