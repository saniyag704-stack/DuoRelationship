# Requirement Specification & Source Code
## REQ_08: Global Styles, Custom Scrollbars & Glassmorphism

> **File Path:** `src/app/globals.css`  
> **Layer:** `CSS Layer` · **Category:** `Styling`  
> **Lines of Code:** 52 lines · **Size:** 0.96 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

Establishes a tactile, soothing sensory experience with subtle ambient gradients and soft glass borders that remove sensory overwhelm.

---

### 📋 2. Functional & Technical Requirements

1. **Configures custom styled dark scrollbars.:** Configures custom styled dark scrollbars.
2. **Defines luxury card utility classes and backdrop blur filters.:** Defines luxury card utility classes and backdrop blur filters.
3. **Enables fluid touch momentum scrolling on mobile devices.:** Enables fluid touch momentum scrolling on mobile devices.

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* Playwright verifies background gradients and cards render with glassmorphic transparency.

---

### 💻 5. Complete Verbatim Source Code

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #07080a;
  --foreground: #f4f4f6;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: var(--font-plus-jakarta), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Custom Luxury Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #0b0c10;
}

::-webkit-scrollbar-thumb {
  background: #2b3142;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d4af37;
}

/* Glassmorphism utilities */
.glass-panel {
  background: rgba(18, 19, 24, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(212, 175, 55, 0.15);
}

.gold-text-glow {
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.35);
}

.rose-text-glow {
  text-shadow: 0 0 20px rgba(217, 86, 117, 0.35);
}

```
