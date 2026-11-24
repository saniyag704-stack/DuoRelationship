# Requirement Specification & Source Code
## REQ_02: TypeScript Compiler Configuration

> **File Path:** `tsconfig.json`  
> **Layer:** `Root Config` · **Category:** `Configuration`  
> **Lines of Code:** 27 lines · **Size:** 0.56 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

Ensures absolute type safety across relationship data schemas, avoiding runtime crashes during high-stress user emotional analysis.

---

### 📋 2. Functional & Technical Requirements

1. **Strict type checking enabled for all psychological data models.:** Strict type checking enabled for all psychological data models.
2. **Configures path alias `@/*` mapped to `./src/*` for clean imports.:** Configures path alias `@/*` mapped to `./src/*` for clean imports.
3. **Includes Next.js TypeScript plugin and DOM types.:** Includes Next.js TypeScript plugin and DOM types.

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* TypeScript build completes with zero compilation or type assertion errors.

---

### 💻 5. Complete Verbatim Source Code

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```
