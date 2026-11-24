# DUO — Project Configuration & Theme Settings

This file contains the complete source code for **Project Configuration & Theme Settings** in DUO.

---

## Package Configuration

- **File Path:** `package.json`
- **Lines of Code:** 32 lines
- **Size:** 0.72 KB

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
    "@types/canvas-confetti": "^1.9.0",
    "@types/node": "^20.17.0",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3"
  }
}

```

---

## TypeScript Configuration

- **File Path:** `tsconfig.json`
- **Lines of Code:** 27 lines
- **Size:** 0.56 KB

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

---

## Tailwind CSS Configuration & Theme Tokens

- **File Path:** `tailwind.config.ts`
- **Lines of Code:** 79 lines
- **Size:** 2.24 KB

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

---

## PostCSS Configuration

- **File Path:** `postcss.config.mjs`
- **Lines of Code:** 10 lines
- **Size:** 0.15 KB

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

---

## Git Ignore Configuration

- **File Path:** `.gitignore`
- **Lines of Code:** 31 lines
- **Size:** 0.26 KB

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

# local env files
.env*.local

# typescript
*.tsbuildinfo
next-env.d.ts

```

---

