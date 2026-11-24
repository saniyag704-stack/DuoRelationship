# Requirement Specification & Source Code
## REQ_24: Trust-First Ephemeral Privacy Badge Component

> **File Path:** `src/components/layout/SecurityBadge.tsx`  
> **Layer:** `Layout Layer` · **Category:** `UI Component`  
> **Lines of Code:** 45 lines · **Size:** 1.81 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

Removes privacy paranoia. Couples will never upload real vulnerable chat screenshots unless they are 100% assured their data is never stored or trained on.

---

### 📋 2. Functional & Technical Requirements

1. **Renders prominent trust banner:**  "🔒 100% Private & Encrypted · Chats are analyzed in real-time and never stored."
2. **Highlights client-side RAM buffer and complete relationship confidentiality.:** Highlights client-side RAM buffer and complete relationship confidentiality.

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* Playwright verifies SecurityBadge presence across Home, Decode, Soften, and Sync screens.

---

### 💻 5. Complete Verbatim Source Code

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
