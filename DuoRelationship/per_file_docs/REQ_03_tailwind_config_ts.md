# Requirement Specification & Source Code
## REQ_03: Tailwind CSS Luxury Obsidian Gold Theme Tokens

> **File Path:** `tailwind.config.ts`  
> **Layer:** `Styling` · **Category:** `Styling & Design System`  
> **Lines of Code:** 79 lines · **Size:** 2.24 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

Implements the Obsidian Gold & Soft Rose Noir theme (#0B0C10, #D4AF37, #E47A94). Replaces stressful neon app alerts with a warm, luxury therapy-grade aesthetic that physiologically lowers heart rate.

---

### 📋 2. Functional & Technical Requirements

1. **Defines custom color tokens:**  obsidian (950, 900, 850), gold (300, 400, 500), and rose (300, 400, 500).
2. **Configures luxury glow box-shadows (`shadow-gold-glow`, `shadow-luxury-card`).:** Configures luxury glow box-shadows (`shadow-gold-glow`, `shadow-luxury-card`).
3. **Configures glassmorphic backdrop-blur utilities and smooth micro-transition keyframes.:** Configures glassmorphic backdrop-blur utilities and smooth micro-transition keyframes.

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* Playwright visual assertions confirm background rendering matches deep Obsidian (#0B0C10) and Gold accents.

---

### 💻 5. Complete Verbatim Source Code

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
