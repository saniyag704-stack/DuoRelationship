# Requirement Specification & Source Code
## REQ_29: TypeScript Domain Models & Schema Definitions

> **File Path:** `src/types/index.ts`  
> **Layer:** `Domain Model` · **Category:** `Types`  
> **Lines of Code:** 175 lines · **Size:** 3.97 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

Defines the structural blueprint for emotional translation, ensuring every component receives valid psychological fields.

---

### 📋 2. Functional & Technical Requirements

1. **Defines interfaces:**  PsychologicalXRayResult, BeforeYouSendResult, SimulationResult, CoupleVibeCard, DailyHabit, EmotionalCalibration.
2. **Defines strict enum-like types:**  QuickContextTag, TabType, LanguageDialect.

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* TypeScript build confirms all domain types are strictly satisfied across the application.

---

### 💻 5. Complete Verbatim Source Code

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
