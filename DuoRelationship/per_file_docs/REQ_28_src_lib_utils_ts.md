# Requirement Specification & Source Code
## REQ_28: CSS Class Merging & General Utilities

> **File Path:** `src/lib/utils.ts`  
> **Layer:** `Utility Layer` · **Category:** `Library`  
> **Lines of Code:** 26 lines · **Size:** 0.63 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

Provides seamless dynamic class composition for micro-animations and glowing states.

---

### 📋 2. Functional & Technical Requirements

1. **Exports `cn()` utility combining clsx and tailwind-merge.:** Exports `cn()` utility combining clsx and tailwind-merge.

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* Utility merges conflicting Tailwind classes reliably across components.

---

### 💻 5. Complete Verbatim Source Code

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
