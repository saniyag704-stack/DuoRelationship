# 🔒 DUO — Environment Variables & API Key Security Architecture

DUO is built with a **Zero-Leak Security Architecture** to ensure your private Google Gemini API keys are never exposed, committed to GitHub, or leaked to public code repositories.

---

## 🛡️ 1. How Git Protection Works (.gitignore)

In the project's [`.gitignore`](file:///d:/relationship%20duo/.gitignore), all local environment secret files are strictly ignored:

```gitignore
# environment variables and API keys (STRICTLY PRIVATE - NEVER COMMIT)
.env
.env.local
.env.*.local
.env.development
.env.test
.env.production
!.env.example
```

* **`.env.local`:** Your local private file containing your actual secret API key. Git completely ignores this file, so running `git add .` or `git push` will **never** upload it to GitHub.
* **`.env.example`:** A public template file tracked in Git that shows what variables are expected, without revealing your actual keys.

---

## 🔑 2. Local Setup: How to Add Your API Key

1. Open the file [`.env.local`](file:///d:/relationship%20duo/.env.local) in your project root:
   ```env
   # Paste your real Google Gemini API Key below:
   GEMINI_API_KEY=AIzaSyYourActualKeyHere123456789
   ```
2. Get your free API key anytime from **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
3. Save the file. Next.js automatically loads `process.env.GEMINI_API_KEY` into all backend API routes:
   - `/api/decode` (Multimodal Vision Screenshot Decoding)
   - `/api/soften` (Live Message Protector)
   - `/api/simulate` (Safe Conversation Simulator)
   - `/api/daily-coach` (Daily Micro-Habit Advice)

---

## ☁️ 3. Cloud Setup: Adding API Key to Vercel / Production

When deploying to Vercel or cloud hosting:
1. Go to your project on **Vercel Dashboard**.
2. Navigate to **Settings** $\rightarrow$ **Environment Variables**.
3. Add:
   * **Key:** `GEMINI_API_KEY`
   * **Value:** *(Paste your Google Gemini API key)*
4. Click **Save**.
5. Vercel automatically injects the key into your serverless API routes securely on the cloud.

---

## 📱 4. In-App UI Key Override (For End Users)

DUO also includes a client-side API configuration modal built into the interface:
* On the desktop or mobile screen, click the **"Gemini API Config"** (🔑) button in the top right header.
* Users can enter their personal Gemini API key directly into the app.
* It is stored only in the browser's local RAM/storage and sent directly in the header of API requests without ever being saved on a database.
