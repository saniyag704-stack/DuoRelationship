# Requirement Specification & Source Code
## REQ_04: PostCSS Pipeline Configuration

> **File Path:** `postcss.config.mjs`  
> **Layer:** `Build Pipeline` · **Category:** `Configuration`  
> **Lines of Code:** 10 lines · **Size:** 0.15 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

Optimizes CSS delivery so screens render instantaneously on low-bandwidth mobile connections during intense relationship arguments.

---

### 📋 2. Functional & Technical Requirements

1. **Integrates Tailwind CSS and Autoprefixer for cross-browser visual consistency across iOS Safari, Android Chrome, and Desktop.:** Integrates Tailwind CSS and Autoprefixer for cross-browser visual consistency across iOS Safari, Android Chrome, and Desktop.

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* CSS builds cleanly and responsive flex/grid layouts function properly on mobile and desktop viewports.

---

### 💻 5. Complete Verbatim Source Code

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;

```
