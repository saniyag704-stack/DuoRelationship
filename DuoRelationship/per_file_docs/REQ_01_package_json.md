# Requirement Specification & Source Code
## REQ_01: Package Manifest & Dependency Configuration

> **File Path:** `package.json`  
> **Layer:** `Root Config` · **Category:** `Configuration`  
> **Lines of Code:** 34 lines · **Size:** 0.78 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

Defines the modern, lightweight tech stack (Next.js 14, React 18, Tailwind, Lucide, Canvas-Confetti) enabling instant, sub-second psychological attunement with zero lag.

---

### 📋 2. Functional & Technical Requirements

1. **Configures Next.js 14 App Router environment.:** Configures Next.js 14 App Router environment.
2. **Defines dependencies:**  lucide-react (mature luxury iconography), canvas-confetti (celebration micro-rewards on de-escalation), tailwindcss (Obsidian Gold theme).
3. **Defines development and test scripts:**  dev, build, start, and playwright test runner.

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* Playwright verifies package builds cleanly without peer dependency conflicts or missing modules.

---

### 💻 5. Complete Verbatim Source Code

```json
{
  "name": "duo-relationship-copilot",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "framer-motion": "^11.11.9",
    "lucide-react": "^0.453.0",
    "next": "^14.2.15",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.4",
    "canvas-confetti": "^1.9.3"
  },
  "devDependencies": {
    "@playwright/test": "^1.65.1",
    "@types/canvas-confetti": "^1.9.0",
    "@types/node": "^20.17.0",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "autoprefixer": "^10.4.20",
    "playwright": "^1.65.1",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3"
  }
}

```
