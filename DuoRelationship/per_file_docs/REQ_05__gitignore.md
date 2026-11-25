# Requirement Specification & Source Code
## REQ_05: Git Version Control Exclusion Rules

> **File Path:** `.gitignore`  
> **Layer:** `Security & VCS` · **Category:** `Configuration`  
> **Lines of Code:** 44 lines · **Size:** 0.44 KB · **Status:** Production Verified ✅

---

### 🧠 1. Psychological & Business Rationale

Guarantees absolute client privacy by strictly preventing private local caches, temporary screen uploads, API secrets, and large tunnel binaries from leaking to GitHub.

---

### 📋 2. Functional & Technical Requirements

1. **Excludes node_modules, .next, build output, and local environment files (.env*.local).:** Excludes node_modules, .next, build output, and local environment files (.env*.local).
2. **Excludes binary files like cloudflared.exe and test log dumps.:** Excludes binary files like cloudflared.exe and test log dumps.

---

### 🔒 3. Security, Privacy & Cultural Localization Requirements

- **Privacy-First:** Strict ephemeral processing; client-side RAM buffer with zero long-term retention of private chat text.
- **Zero-Toxicity Guarantee:** Absolutely no shaming labels (*"Red Flag"*, *"Toxic"*, *"Narcissist"*). Assumes loving intent clouded by stress.
- **Cultural Localization:** Accurately decodes and responds in natural Indian Roman Hinglish (*"Achha thik hai"*, *"Jaao doston ke paas"*).

---

### 🧪 4. Playwright End-to-End Test & Verification Criteria

* Git status confirms only production code is tracked; zero temporary or secret files are staged.

---

### 💻 5. Complete Verbatim Source Code

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# environment variables and API keys (STRICTLY PRIVATE - NEVER COMMIT)
.env
.env.local
.env.*.local
.env.development
.env.test
.env.production
!.env.example

# typescript
*.tsbuildinfo
next-env.d.ts

# binaries & tunnels
cloudflared.exe
*.exe
*.log

.vercel

```
