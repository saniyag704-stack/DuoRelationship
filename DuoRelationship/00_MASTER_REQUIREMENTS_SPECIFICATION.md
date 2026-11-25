# 💍 DUO — Master System Architecture & Requirements Specification

> **System Name:** DUO · Premium AI Relationship Co-Pilot & Emotional Translator
> **Target Demographic:** Indian Couples (Gen-Z & Millennials) · English, Hindi & Roman Hinglish
> **Brand Aesthetic:** Obsidian Gold & Soft Rose Noir (`#0B0C10`, `#D4AF37`, `#E47A94`)
> **Testing Status:** 100% Passed Playwright End-to-End Suite ✅
> **Generated Date:** 2026-11-25T06:19:16.787Z

---

## 📑 Requirements Directory & Traceability Matrix (All 29 Files)

| ID | Requirement Specification | Category | Layer | Verified Code Link |
| :--- | :--- | :--- | :--- | :--- |
| **REQ_01** | [Package Manifest & Dependency Configuration](./per_file_docs/REQ_01_package_json.md) | Configuration | `Root Config` | [`package.json`](../package.json) |
| **REQ_02** | [TypeScript Compiler Configuration](./per_file_docs/REQ_02_tsconfig_json.md) | Configuration | `Root Config` | [`tsconfig.json`](../tsconfig.json) |
| **REQ_03** | [Tailwind CSS Luxury Obsidian Gold Theme Tokens](./per_file_docs/REQ_03_tailwind_config_ts.md) | Styling & Design System | `Styling` | [`tailwind.config.ts`](../tailwind.config.ts) |
| **REQ_04** | [PostCSS Pipeline Configuration](./per_file_docs/REQ_04_postcss_config_mjs.md) | Configuration | `Build Pipeline` | [`postcss.config.mjs`](../postcss.config.mjs) |
| **REQ_05** | [Git Version Control Exclusion Rules](./per_file_docs/REQ_05__gitignore.md) | Configuration | `Security & VCS` | [`.gitignore`](../.gitignore) |
| **REQ_06** | [Root Layout, Fonts & Navigation Shell](./per_file_docs/REQ_06_src_app_layout_tsx.md) | App Shell | `Layout Layer` | [`src/app/layout.tsx`](../src/app/layout.tsx) |
| **REQ_07** | [Main Application Shell & Tab Router](./per_file_docs/REQ_07_src_app_page_tsx.md) | App Shell | `Controller Layer` | [`src/app/page.tsx`](../src/app/page.tsx) |
| **REQ_08** | [Global Styles, Custom Scrollbars & Glassmorphism](./per_file_docs/REQ_08_src_app_globals_css.md) | Styling | `CSS Layer` | [`src/app/globals.css`](../src/app/globals.css) |
| **REQ_09** | [Psychological X-Ray Vision API & Translation Engine](./per_file_docs/REQ_09_src_app_api_decode_route_ts.md) | API Route | `Backend AI Layer` | [`src/app/api/decode/route.ts`](../src/app/api/decode/route.ts) |
| **REQ_10** | [Before You Send Live Angry Message Protector API](./per_file_docs/REQ_10_src_app_api_soften_route_ts.md) | API Route | `Backend AI Layer` | [`src/app/api/soften/route.ts`](../src/app/api/soften/route.ts) |
| **REQ_11** | [Safe Conversation Simulator API](./per_file_docs/REQ_11_src_app_api_simulate_route_ts.md) | API Route | `Backend AI Layer` | [`src/app/api/simulate/route.ts`](../src/app/api/simulate/route.ts) |
| **REQ_12** | [Daily Connection Vitamin & Micro-Habit Coach API](./per_file_docs/REQ_12_src_app_api_daily_coach_route_ts.md) | API Route | `Backend AI Layer` | [`src/app/api/daily-coach/route.ts`](../src/app/api/daily-coach/route.ts) |
| **REQ_13** | [Psychological X-Ray Interactive Component (5-Section Reveal)](./per_file_docs/REQ_13_src_components_decode_DecodePreview_tsx.md) | UI Component | `Feature Component` | [`src/components/decode/DecodePreview.tsx`](../src/components/decode/DecodePreview.tsx) |
| **REQ_14** | [Live Message Softener Interactive Component](./per_file_docs/REQ_14_src_components_rewrite_SoftenerPreview_tsx.md) | UI Component | `Feature Component` | [`src/components/rewrite/SoftenerPreview.tsx`](../src/components/rewrite/SoftenerPreview.tsx) |
| **REQ_15** | [Spark & Sync Studio Component (Battery, Simulator & Love DNA)](./per_file_docs/REQ_15_src_components_sync_SyncPreview_tsx.md) | UI Component | `Feature Component` | [`src/components/sync/SyncPreview.tsx`](../src/components/sync/SyncPreview.tsx) |
| **REQ_16** | [Daily Relationship Vitamin & Micro-Habit Card Component](./per_file_docs/REQ_16_src_components_home_DailyMicroHabitCard_tsx.md) | UI Component | `Dashboard Widget` | [`src/components/home/DailyMicroHabitCard.tsx`](../src/components/home/DailyMicroHabitCard.tsx) |
| **REQ_17** | [Emotional Alignment Meter & Calibration Log Component](./per_file_docs/REQ_17_src_components_home_EmotionalAlignmentMeter_tsx.md) | UI Component | `Dashboard Widget` | [`src/components/home/EmotionalAlignmentMeter.tsx`](../src/components/home/EmotionalAlignmentMeter.tsx) |
| **REQ_18** | [Zero-Fake Welcome Banner Component](./per_file_docs/REQ_18_src_components_home_EmptyStateBanner_tsx.md) | UI Component | `Dashboard Widget` | [`src/components/home/EmptyStateBanner.tsx`](../src/components/home/EmptyStateBanner.tsx) |
| **REQ_19** | [Hero Action Card: 8-Second Chat Screenshot Decoder](./per_file_docs/REQ_19_src_components_home_PrimaryDecodeAction_tsx.md) | UI Component | `Dashboard Widget` | [`src/components/home/PrimaryDecodeAction.tsx`](../src/components/home/PrimaryDecodeAction.tsx) |
| **REQ_20** | [Quick Activity & Statistics Counter Component](./per_file_docs/REQ_20_src_components_home_QuickStatsRow_tsx.md) | UI Component | `Dashboard Widget` | [`src/components/home/QuickStatsRow.tsx`](../src/components/home/QuickStatsRow.tsx) |
| **REQ_21** | [Weekly Vibe & Chemistry Archetype Report Component](./per_file_docs/REQ_21_src_components_home_WeeklyVibeReport_tsx.md) | UI Component | `Dashboard Widget` | [`src/components/home/WeeklyVibeReport.tsx`](../src/components/home/WeeklyVibeReport.tsx) |
| **REQ_22** | [Top Navigation Header & Emotional Dialect Switcher Component](./per_file_docs/REQ_22_src_components_layout_Header_tsx.md) | UI Component | `Layout Layer` | [`src/components/layout/Header.tsx`](../src/components/layout/Header.tsx) |
| **REQ_23** | [Mature 4-Tab Bottom Navigation Bar Component](./per_file_docs/REQ_23_src_components_layout_BottomNav_tsx.md) | UI Component | `Layout Layer` | [`src/components/layout/BottomNav.tsx`](../src/components/layout/BottomNav.tsx) |
| **REQ_24** | [Trust-First Ephemeral Privacy Badge Component](./per_file_docs/REQ_24_src_components_layout_SecurityBadge_tsx.md) | UI Component | `Layout Layer` | [`src/components/layout/SecurityBadge.tsx`](../src/components/layout/SecurityBadge.tsx) |
| **REQ_25** | [Relationship Context & LocalStorage State Management](./per_file_docs/REQ_25_src_context_RelationshipContext_tsx.md) | State Management | `Context State` | [`src/context/RelationshipContext.tsx`](../src/context/RelationshipContext.tsx) |
| **REQ_26** | [Behavioral Psychology Constants & Relatable Scenarios](./per_file_docs/REQ_26_src_lib_constants_ts.md) | Library | `Data & Library` | [`src/lib/constants.ts`](../src/lib/constants.ts) |
| **REQ_27** | [Client-Side LocalStorage Persistence Engine](./per_file_docs/REQ_27_src_lib_storage_ts.md) | Library | `Data Layer` | [`src/lib/storage.ts`](../src/lib/storage.ts) |
| **REQ_28** | [CSS Class Merging & General Utilities](./per_file_docs/REQ_28_src_lib_utils_ts.md) | Library | `Utility Layer` | [`src/lib/utils.ts`](../src/lib/utils.ts) |
| **REQ_29** | [TypeScript Domain Models & Schema Definitions](./per_file_docs/REQ_29_src_types_index_ts.md) | Types | `Domain Model` | [`src/types/index.ts`](../src/types/index.ts) |

---

## 🏛️ System Architecture & Four Core Pillars

### Pillar 1: Home Dashboard (Relationship Pulse)
- Dynamic Emotional Alignment Meter calculating genuine calibration from user de-escalations.
- Daily Micro-Habit (Connection Vitamin) delivering attachment theory prompts.
- Weekly Vibe Report unlocking complementary Couple Archetypes.

### Pillar 2: The Psychological X-Ray (`/decode`)
- 8-second multimodal vision scan analyzing sender vs partner chat bubbles.
- 5-Section reveal: Calm banner, Emotional Contrast Meter, Deep Subtext & The Trap, 3 Zero-Ego Magic Replies, and Golden Action Rule.

### Pillar 3: "Before You Send" Live Message Protector (`/before-you-send`)
- Impulse filter assessing escalation risk before WhatsApp/Instagram messages are sent.
- 3 Upgraded versions: Soft & Loving, Clear & Mature, Short & De-escalating.

### Pillar 4: "Spark & Sync" Connection Studio (`/spark`)
- Module 1: Emotional Battery slider (0-100%) and Digital Hug sync.
- Module 2: Safe Conversation Simulator for rehearsal of sensitive discussions.
- Module 3: Couple Love DNA Card Generator for organic social sharing.

---

## 🔒 Security & Ephemeral Privacy Architecture

- **Zero Server Retention:** User chat screenshots and text transcripts are never stored in databases or server disks.
- **Client RAM Buffer:** All calibration history lives exclusively in client-side LocalStorage.
- **No Toxic Labels:** Stigmatizing psychological terminology (*"Narcissist"*, *"Toxic"*, *"Red Flag"*) is strictly forbidden.
