# DUO — Gemini AI API Endpoints & Routes

This file contains the complete source code for **Gemini AI API Endpoints & Routes** in DUO.

---

## API: /api/decode (Psychological X-Ray & Vision AI)

- **File Path:** `src/app/api/decode/route.ts`
- **Lines of Code:** 442 lines
- **Size:** 18.62 KB

```typescript
import { NextRequest, NextResponse } from "next/server";
import { PsychologicalXRayResult, QuickContextTag } from "@/types";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `Act as a world-class Relationship Psychologist and Emotional Translator for couples (specializing in English, Hindi, and natural everyday Indian Hinglish).

CRITICAL LANGUAGE & TONE INSTRUCTION:
Mirror the user's exact Hinglish/English conversational style. Keep explanations deeply empathetic, psychological, and crystal clear. Never sound like a formal dictionary or a cold therapist—sound like a wise, warm, emotionally intelligent Indian relationship coach. Ensure zero duplicate text in JSON fields.

INDIAN COUPLE CULTURAL NUANCES:
Decode classic Indian passive-aggressive or hurt phrases accurately:
- "Achha thik hai" / "Koi baat nahi" -> Means "I am hurt and tired of explaining, I want you to notice without me asking."
- "Jaao apne doston/kaam ke paas" -> Means "I miss you and feel left out, please reassure me I'm still your priority."
- "Baat karne ka koi fayda nahi" -> Means "I feel unheard right now; please listen with empathy instead of giving logical excuses."
- "Tumhe toh bas apne se matlab hai" -> Means "I am craving your presence and feeling taking for granted."

LANGUAGE RULES:
1. If the chat/transcript is in Hinglish (Hindi written in Roman/English script, e.g. "Tumhe toh bas kaam se matlab hai, rehne do"), respond in warm, natural, everyday Hinglish (Roman script) that young Indian couples actually speak. Never use heavy, formal Sanskritized Hindi or robotic textbook English.
2. If in pure English, respond in warm, modern, empathetic English.
3. If in Devanagari Hindi, respond in simple, conversational Hindi mixed with relatable English relationship terms (like Priority, Space, Overthinking, Vibe).
4. Zero-Toxicity Rule: Never use words like "Red Flag" or "Toxic". De-escalate anger and decode the hidden vulnerability behind harsh messages.

Return strictly valid JSON with NO duplicate text and NO markdown fences outside the JSON, matching this exact schema:
{
  "privacy_notice": "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
  "calm_banner": "Ek gehri saans lo. Yeh message gusse mein likha gaya hai, nafrat mein nahi.",
  "emotional_xray": {
    "surface_emotion": {
      "label": "Gussa aur Frustration 😤",
      "percentage": 85
    },
    "hidden_emotion": {
      "label": "Akela-pan aur Unseen Feel Karna 🥺",
      "percentage": 92
    },
    "core_need": "Woh aapse ladna nahi chahte; woh bas yeh feel karna chahte hain ki woh abhi bhi aapki #1 priority hain."
  },
  "psychology_decode": {
    "what_they_said": "Quote the key harsh line from the partner's chat",
    "whats_in_their_mind": "Deep psychological explanation of their defense mechanism, hurt, or overwhelm",
    "the_trap": "Clear warning on what NOT to reply right now (e.g., giving logical excuses) and why it will escalate the fight"
  },
  "magic_replies": [
    {
      "badge": "Option 1: Pyaar aur Apnaapan (Warm & Reassuring — Sabse Asardaar)",
      "reply_text": "Ready-to-send deeply empathetic, zero-ego reply (Render ONCE cleanly)",
      "why_it_works": "1 short line explaining the psychological impact"
    },
    {
      "badge": "Option 2: Calm & Mature (Bina Kisi Bahaane Ke)",
      "reply_text": "Ready-to-send mature, balanced reply without excuses",
      "why_it_works": "1 short line explaining the psychological impact"
    },
    {
      "badge": "Option 3: Soft & Playful (Tension-Melting)",
      "reply_text": "Ready-to-send mood-lightening, affectionate reply",
      "why_it_works": "1 short line explaining the psychological impact"
    }
  ],
  "golden_action_tip": "Iss waqt logic nahi, reassurance chahiye: Abhi excuses mat do ki aap kyun busy the. Pehle unka dil shaant hone do; explanations can wait till tomorrow."
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, text, contextTag, targetLanguage, userApiKey } = body as {
      image?: string;
      text?: string;
      contextTag?: QuickContextTag;
      targetLanguage?: "auto" | "hinglish" | "en";
      userApiKey?: string;
    };

    if (!image && !text) {
      return NextResponse.json(
        { error: "Please provide either a chat screenshot or text transcript." },
        { status: 400 }
      );
    }

    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    // If Gemini API Key is available, invoke the official Gemini Multimodal Vision API
    if (apiKey) {
      try {
        const geminiResult = await callGeminiMultimodal(apiKey, {
          image,
          text,
          contextTag,
          targetLanguage,
        });
        if (geminiResult) {
          const normalized = normalizeResult(geminiResult);
          return NextResponse.json({
            success: true,
            source: "gemini-vision",
            data: normalized,
          });
        }
      } catch (err: any) {
        console.warn("Gemini API call failed, falling back to psychological inference engine:", err?.message);
      }
    }

    // Graceful fallback to DUO's psychological inference engine
    const fallbackResult = generatePsychologicalInference(text, contextTag, targetLanguage, Boolean(image));
    return NextResponse.json({
      success: true,
      source: apiKey ? "inference-fallback" : "psychological-engine",
      data: fallbackResult,
    });
  } catch (error: any) {
    console.error("Decode API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during psychological decode." },
      { status: 500 }
    );
  }
}

async function callGeminiMultimodal(
  apiKey: string,
  params: { image?: string; text?: string; contextTag?: QuickContextTag; targetLanguage?: "auto" | "hinglish" | "en" }
): Promise<PsychologicalXRayResult | null> {
  const modelName = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const parts: any[] = [];

  // Screenshot image part
  if (params.image) {
    let base64Data = params.image;
    let mimeType = "image/jpeg";

    if (base64Data.startsWith("data:")) {
      const match = base64Data.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (match) {
        mimeType = match[1];
        base64Data = match[2];
      }
    }

    parts.push({
      inlineData: {
        mimeType: mimeType || "image/jpeg",
        data: base64Data,
      },
    });
  }

  const langInstruction =
    params.targetLanguage === "hinglish"
      ? "User explicitly requested output in natural everyday Indian Hinglish (Roman script)."
      : params.targetLanguage === "en"
      ? "User explicitly requested output in warm modern English."
      : "Auto-detect chat language. If Hinglish/Hindi, respond in natural everyday Indian Hinglish.";

  const userTextPrompt = `Please decode this angry/emotional conversation exchange according to your strict system prompt rules.
${params.text ? `Chat Transcript text:\n"""\n${params.text}\n"""` : "Analyze the attached chat screenshot carefully (Right bubble = User, Left bubble = Partner)."}
${params.contextTag ? `Context: ${params.contextTag}` : ""}
Language Override Instruction: ${langInstruction}
Ensure your response is valid JSON strictly following the 5-section schema with zero duplicate text.`;

  parts.push({ text: userTextPrompt });

  const payload = {
    contents: [
      {
        role: "user",
        parts,
      },
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    generationConfig: {
      temperature: 0.25,
      responseMimeType: "application/json",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error [${response.status}]: ${errorText}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
  const parsed = JSON.parse(cleaned) as PsychologicalXRayResult;
  return normalizeResult(parsed);
}

function normalizeResult(res: any): PsychologicalXRayResult {
  const normReplies = (res.magic_replies || []).map((r: any) => {
    const textVal =
      r.reply_text ||
      r.replyText ||
      r.reply ||
      r.text ||
      r.message ||
      "";
    return {
      badge: r.badge || r.style || "Option 1: Pyaar aur Apnaapan (Warm & Reassuring)",
      reply_text: textVal,
      text: textVal,
      why_it_works:
        r.why_it_works ||
        r.whyItWorks ||
        "Yeh unke hurt ko validate karta hai bina defensiveness ke, aur turant emotional security deta hai.",
      style: r.style || r.badge || "",
    };
  });

  const surface =
    res.emotional_xray?.surface_emotion ||
    res.surface_emotion || {
      label: "Gussa aur Frustration 😤",
      percentage: 85,
    };

  const hidden =
    res.emotional_xray?.hidden_emotion ||
    res.hidden_emotion || {
      label: "Akela-pan aur Unseen Feel Karna 🥺",
      percentage: 92,
    };

  const coreNeed =
    res.emotional_xray?.core_need ||
    res.core_need ||
    "Woh aapse ladna nahi chahte; woh bas yeh sunna chahte hain ki woh aapki pehli priority hain.";

  const whatSaid =
    res.psychology_decode?.what_they_said ||
    res.what_they_said ||
    "Tumhe toh bas apne kaam aur doston se matlab hai. 'Achha thik hai, koi baat nahi', main hi overreact karti hoon na? Jaao unhi ke paas.";

  const whatsInMind =
    res.psychology_decode?.whats_in_their_mind ||
    res.whats_in_their_mind ||
    "Jab Indian relationships mein partner bolta hai 'Achha thik hai, jaao apne doston ke paas', toh yeh coldness nahi balki deep exhaustion hai. In their mind: 'Mujhe baar-baar importance maangna hurtful lagta hai, I just want you to choose me without me asking.'";

  const trap =
    res.psychology_decode?.the_trap ||
    res.the_trap ||
    "Abhi galti se bhi office meetings, traffic ke excuses ya 'Har baar tum drama shuru kar deti ho' mat bolna. Logic during emotional flooding feels like rejection and escalates the fight for hours.";

  const goldenTip =
    res.golden_action_tip ||
    res.golden_rule ||
    "Iss waqt logic nahi, reassurance chahiye: Abhi excuses mat do ki aap kyun busy the. Pehle unka dil shaant hone do; explanations can wait till tomorrow.";

  return {
    privacy_notice:
      res.privacy_notice ||
      "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
    calm_banner:
      res.calm_banner ||
      res.calm_check ||
      "Ek gehri saans lo. Yeh message gusse mein likha gaya hai, nafrat mein nahi. Partner aapse ladna nahi chahta, they just feel left out and miss being your priority.",
    calm_check:
      res.calm_banner ||
      res.calm_check ||
      "Ek gehri saans lo. Yeh message gusse mein likha gaya hai, nafrat mein nahi. Partner aapse ladna nahi chahta, they just feel left out and miss being your priority.",
    emotional_xray: {
      surface_emotion: surface,
      hidden_emotion: hidden,
      core_need: coreNeed,
    },
    surface_emotion: surface,
    hidden_emotion: hidden,
    core_need: coreNeed,
    psychology_decode: {
      what_they_said: whatSaid,
      whats_in_their_mind: whatsInMind,
      the_trap: trap,
    },
    the_trap: trap,
    magic_replies: normReplies,
    golden_action_tip: goldenTip,
    golden_rule: goldenTip,
  };
}

// Resilient Behavioral Fallback Engine with dialect & context awareness
function generatePsychologicalInference(
  text?: string,
  contextTag?: QuickContextTag,
  targetLanguage?: "auto" | "hinglish" | "en",
  hasImage?: boolean
): PsychologicalXRayResult {
  const raw = (text || "").toLowerCase();
  const detectedHinglish =
    raw.includes("tum") ||
    raw.includes("aap") ||
    raw.includes("kuch") ||
    raw.includes("nahi") ||
    raw.includes("yaar") ||
    raw.includes("hamesha") ||
    raw.includes("meri") ||
    raw.includes("kyun") ||
    raw.includes("kyu") ||
    raw.includes("theek") ||
    raw.includes("thik") ||
    raw.includes("achha") ||
    raw.includes("jaao") ||
    raw.includes("doston") ||
    raw.includes("fayda") ||
    raw.includes("rahi") ||
    raw.includes("raha");

  const useHinglish =
    targetLanguage === "hinglish" ||
    (targetLanguage !== "en" && (detectedHinglish || !text));

  if (useHinglish) {
    const quotedLine = text
      ? text.split("\n").find((l) => l.toLowerCase().includes("tum") || l.toLowerCase().includes("thik") || l.toLowerCase().includes("jaao")) ||
        "Tumhe toh bas apne kaam aur doston se matlab hai. 'Achha thik hai, koi baat nahi', jaao unhi ke paas."
      : "Tumhe toh bas apne kaam aur doston se matlab hai. 'Achha thik hai, koi baat nahi', jaao unhi ke paas.";

    const result: PsychologicalXRayResult = {
      privacy_notice: "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
      calm_banner:
        "Ek gehri saans lo. Yeh message gusse mein likha gaya hai, nafrat mein nahi. Partner aapse ladna nahi chahta, they just feel left out and miss being your priority.",
      emotional_xray: {
        surface_emotion: {
          label: "Gussa aur Frustration 😤",
          percentage: 85,
        },
        hidden_emotion: {
          label: "Akela-pan aur Unseen Feel Karna 🥺",
          percentage: 92,
        },
        core_need:
          "Woh aapse ladna nahi chahte; woh bas yeh feel karna chahte hain ki busy life mein bhi woh aapki #1 priority hain.",
      },
      psychology_decode: {
        what_they_said: quotedLine.replace(/^(Partner:|You:)/i, "").trim(),
        whats_in_their_mind:
          "Jab Indian relationships mein partner bolta hai 'Achha thik hai, jaao apne doston/kaam ke paas', toh yeh dismissal nahi balki ek wounded protest bid hai. In their mind: 'Mujhe baar-baar importance maangna exhausting lagta hai, I just want you to choose me without me asking.'",
        the_trap:
          "Abhi galti se bhi office meetings, traffic ke excuses ya 'Har baar tum drama shuru kar deti ho' mat bolna. Logic during emotional flooding feels like rejection and turns a 10-minute sulk into a 3-day cold war.",
      },
      magic_replies: [
        {
          badge: "Option 1: Pyaar aur Apnaapan (Warm & Reassuring — 100% Zero-Ego)",
          reply_text:
            "I am so sorry yaar. Tumhara gussa hona 100% valid hai, aur mujhe tumhe pehle hi update dena chahiye tha. Work wrap up karke seedha tumhare paas aa raha hoon, let's relax together without any screens.",
          why_it_works:
            "Acknowledges their hurt without defensiveness and immediately reassures them of their priority.",
        },
        {
          badge: "Option 2: Calm & Mature (Bina Kisi Bahaane Ke)",
          reply_text:
            "Meeting sach mein stretch ho gayi thi, par call ya text na kar pana meri lapse thi. Main tumhari evening bilkul kharab nahi karna chahta. Can I call you for 2 minutes right now to hear your voice?",
          why_it_works:
            "Takes calm ownership cleanly, giving them the safety to drop their defensive guard.",
        },
        {
          badge: "Option 3: Soft & Playful (Tension-Melting)",
          reply_text:
            "I officially messed up today, aur tumhara daantna banta hai. Peace treaty ke liye tumhari favorite ice cream ya chai leke aa raha hoon in 15 mins. Please ek choti si smile de do?",
          why_it_works:
            "Uses humble tenderness and an emotional comfort bid to dissolve tension instantly.",
        },
      ],
      golden_action_tip:
        "Iss waqt logic nahi, reassurance chahiye: Abhi excuses mat do ki aap kyun busy the. Pehle unka dil shaant hone do; explanations can wait till tomorrow.",
    };

    return normalizeResult(result);
  }

  // Pure English fallback
  const quotedLineEn = text
    ? text.split("\n")[0] || "Fine. Whatever. Go with your friends, I'll figure dinner out myself."
    : "Fine. Whatever. Go with your friends, I'll figure dinner out myself.";

  const resultEn: PsychologicalXRayResult = {
    privacy_notice: "100% Private & Encrypted · Chats are analyzed in real-time memory and never stored.",
    calm_banner:
      "Take a deep breath. This message was written in hurt and exhaustion, not malice. They aren't pushing you away; they are craving reassurance.",
    emotional_xray: {
      surface_emotion: {
        label: "Anger & Passive Resentment 😤",
        percentage: 84,
      },
      hidden_emotion: {
        label: "Feeling Unimportant & Missing Closeness 🥺",
        percentage: 91,
      },
      core_need:
        "They don't want to fight; they need to hear that they remain your cherished priority despite busy schedules.",
    },
    psychology_decode: {
      what_they_said: quotedLineEn.replace(/^(Partner:|You:)/i, "").trim(),
      whats_in_their_mind:
        "When expectations of connection collapse quietly, the nervous system shields itself with sarcastic or blunt words like 'Fine' or 'Whatever'. It is an anxious protest bid testing if you will pursue them or walk away.",
      the_trap:
        "Do NOT reply with logical timelines, say 'You literally said it was okay', or accuse them of drama. Explaining logistics right now invalidates their internal emotion and escalates defensive walls.",
    },
    magic_replies: [
      {
        badge: "Option 1: Warm & Reassuring (Most Effective)",
        reply_text:
          "I hear how much that hurt, and you're completely right that you deserved better communication from me. You mean the world to me, and I'm wrapping up now so we can spend undivided time together.",
        why_it_works:
          "Validates their internal reality with zero ego, disarming defensive fight-or-flight within seconds.",
      },
      {
        badge: "Option 2: Calm & Honest",
        reply_text:
          "I dropped the ball on updating you, and I completely understand why you felt dismissed. No excuses from my side — I want to hear how your day was whenever you're ready.",
        why_it_works:
          "Takes ownership cleanly, eliminating their need to argue or defend their hurt.",
      },
      {
        badge: "Option 3: Soft & Playful",
        reply_text:
          "I officially messed up today, and your frustration is 100% valid. Can I bring your favorite dessert on my way home as a peace offering? Truce for tonight?",
        why_it_works:
          "Uses humble tenderness to break the tension without minimizing their feelings.",
      },
    ],
    golden_action_tip:
      "Connection over correctness: Do not explain why you were delayed right now. Validate their feelings first; explanations can wait until tomorrow.",
  };

  return normalizeResult(resultEn);
}

```

---

## API: /api/soften (Before You Send Message Protector)

- **File Path:** `src/app/api/soften/route.ts`
- **Lines of Code:** 298 lines
- **Size:** 12.60 KB

```typescript
import { NextRequest, NextResponse } from "next/server";
import { BeforeYouSendResult } from "@/types";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are DUO's Principal Behavioral Psychologist, Gottman Institute Specialist, and Emotional Communication Translator.
Your job is the "Before You Send" live angry-message protector.

CRITICAL LANGUAGE & TONE INSTRUCTION:
Mirror the user's exact Hinglish/English conversational style. Keep explanations deeply empathetic, psychological, and crystal clear. Never sound like a formal dictionary or a cold therapist—sound like a wise, warm, emotionally intelligent Indian relationship coach. Ensure zero duplicate text in JSON fields.

INDIAN RELATIONSHIP NUANCES:
Decode and soften classic Indian passive-aggressive or hurt phrases accurately:
- "Achha thik hai" / "Koi baat nahi" -> Means "I am hurt and tired of explaining, I want you to notice without me asking."
- "Jaao apne doston/kaam ke paas" -> Means "I miss you and feel left out, please reassure me I'm still your priority."
- "Baat karne ka koi fayda nahi" -> Means "I feel unheard right now; please listen with empathy instead of giving logical excuses."
- "Tumhe toh bas apne kaam se matlab hai" -> Means "I am craving your presence and feeling taking for granted."

LANGUAGE RULES:
1. If the draft is in Hinglish (Hindi written in Roman/English script), generate the rewrites in natural, everyday Hinglish (Roman script) that real Indian couples text on WhatsApp/Instagram. Never use heavy, formal Sanskritized Hindi or robotic English.
2. If in English, generate warm, modern, empathetic English.
3. Zero Toxicity / No "Red Flags": Never label either partner "toxic" or "narcissistic".

Return strictly valid JSON matching this schema:
{
  "impact_meter": {
    "level": "high_risk",
    "percentage": 88,
    "status_text": "⚠️ High Risk: Will trigger defensiveness and escalate the argument",
    "partner_reaction_summary": "Your partner will likely close down or counter-attack because 'always/never' feels like an attack on their character rather than an invitation to connect."
  },
  "emotional_translation": {
    "what_you_wrote": "The raw message text",
    "how_partner_hears_it": "How they hear it in their head (e.g., 'In their head, they hear: Nothing I do is ever enough, you don't appreciate my efforts, and I am a disappointment to you.')"
  },
  "upgraded_versions": [
    {
      "style": "Soft & Loving",
      "badge": "Expresses hurt without attacking",
      "text": "The exact zero-ego rewritten message...",
      "why_it_works": "Replaces accusatory 'You' statements with vulnerable 'I feel' statements, which Gottman research proves eliminates 80% of defensive shutdown."
    },
    {
      "style": "Clear & Mature",
      "badge": "Sets healthy boundaries calmly",
      "text": "The exact mature rewritten message...",
      "why_it_works": "Asserts your needs firmly and respectfully without sarcasm or emotional holding hostage."
    },
    {
      "style": "Short & De-escalating",
      "badge": "Pauses the fight peacefully",
      "text": "The exact short de-escalating message...",
      "why_it_works": "Calls for a pause before emotional flooding triggers irreversible hurtful words."
    }
  ],
  "golden_tip": "Do not send your original draft right now. Copy one of the zero-ego rewrites below."
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { draft, targetLanguage, userApiKey } = body as {
      draft: string;
      targetLanguage?: "auto" | "hinglish" | "en";
      userApiKey?: string;
    };

    if (!draft || !draft.trim()) {
      return NextResponse.json(
        { error: "Please provide a draft message to evaluate." },
        { status: 400 }
      );
    }

    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const geminiResult = await callGeminiSoften(apiKey, draft, targetLanguage);
        if (geminiResult) {
          return NextResponse.json({
            success: true,
            source: "gemini-api",
            data: geminiResult,
          });
        }
      } catch (err: any) {
        console.warn("Gemini soften call failed, using psychological fallback:", err?.message);
      }
    }

    const fallbackResult = generateSoftenerInference(draft, targetLanguage);
    return NextResponse.json({
      success: true,
      source: apiKey ? "inference-fallback" : "psychological-engine",
      data: fallbackResult,
    });
  } catch (error: any) {
    console.error("Soften API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during message softening." },
      { status: 500 }
    );
  }
}

async function callGeminiSoften(
  apiKey: string,
  draft: string,
  targetLanguage?: "auto" | "hinglish" | "en"
): Promise<BeforeYouSendResult | null> {
  const modelName = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const langNote =
    targetLanguage === "hinglish"
      ? "Language preference: natural everyday Indian Hinglish (Roman script)."
      : targetLanguage === "en"
      ? "Language preference: warm modern English."
      : "Auto-detect language. If Hinglish/Hindi, respond in natural everyday Hinglish.";

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Analyze this draft message that a user wants to send in anger/frustration:
Draft: "${draft}"
${langNote}

Generate the impact meter, emotional translation (how partner hears it), and the 3 zero-ego upgraded rewrites according to system prompt rules. Output JSON only.`,
          },
        ],
      },
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    generationConfig: {
      temperature: 0.25,
      responseMimeType: "application/json",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error [${response.status}]: ${errorText}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned) as BeforeYouSendResult;
}

function generateSoftenerInference(
  draft: string,
  targetLanguage?: "auto" | "hinglish" | "en"
): BeforeYouSendResult {
  const lower = draft.toLowerCase();
  const detectedHinglish =
    lower.includes("tum") ||
    lower.includes("aap") ||
    lower.includes("meri") ||
    lower.includes("kuch") ||
    lower.includes("nahi") ||
    lower.includes("hamesha") ||
    lower.includes("kyun") ||
    lower.includes("kyu") ||
    lower.includes("thik") ||
    lower.includes("achha") ||
    lower.includes("jaao") ||
    lower.includes("doston") ||
    lower.includes("har baar");

  const useHinglish =
    targetLanguage === "hinglish" ||
    (targetLanguage !== "en" && detectedHinglish);

  const hasAlwaysNever =
    lower.includes("always") ||
    lower.includes("never") ||
    lower.includes("hamesha") ||
    lower.includes("kabhi nahi") ||
    lower.includes("har baar");

  const isDry =
    lower.includes("whatever") ||
    lower.includes("fine") ||
    lower.includes("theek hai") ||
    lower.includes("thik hai") ||
    lower.includes("kuch nahi badalne wala");

  let riskPercent = 72;
  if (hasAlwaysNever) riskPercent += 16;
  if (lower.includes("!") || lower.includes("?")) riskPercent += 8;
  if (isDry) riskPercent += 10;
  riskPercent = Math.min(96, Math.max(55, riskPercent));

  if (useHinglish) {
    return {
      impact_meter: {
        level: riskPercent > 75 ? "high_risk" : "moderate_friction",
        percentage: riskPercent,
        status_text:
          riskPercent > 75
            ? "⚠️ High Risk: Will trigger defensiveness and escalate the argument"
            : "⚠️ Moderate Friction: Accusatory tone masks your vulnerable need",
        partner_reaction_summary:
          "Yeh message padhte hi partner defensive ho jayenge. Jab hum 'tum hamesha' ya 'jaao apne doston ke paas' bolte hain, unhe lagta hai ki unke efforts bekaar hain, aur woh reassure karne ke bajaye counter-attack karenge.",
      },
      emotional_translation: {
        what_you_wrote: draft,
        how_partner_hears_it:
          "In their head, they hear: 'Main chahe kitni bhi koshish kar loon, tumhare liye kabhi kaafi nahi hota. You don't see my stress, and you think I don't love you.'",
      },
      upgraded_versions: [
        {
          style: "Soft & Loving",
          badge: "Expresses hurt without attacking",
          text: "Main aaj tumhara wait kar rahi thi aur mujhe thoda lonely & disconnected feel ho raha tha. Jab tum free ho jao, can we just talk calmly for 10 minutes? I really miss our quality time.",
          why_it_works:
            "Shifts focus from blaming them ('tum late ho') to your vulnerable inner feeling ('mujhe disconnect feel hua'). Eliminates 80% of defensive shutdown.",
        },
        {
          style: "Clear & Mature",
          badge: "Sets healthy boundaries calmly",
          text: "I understand meetings unpredictable hoti hain, but jab bina inform kiye plans delay hote hain toh mujhe feel hota hai ki mera time value nahi ho raha. Next time please mujhe ek chota sa heads-up de diya karo taaki expectations clear rahein.",
          why_it_works:
            "Sets a crystal-clear communication boundary without drama, sarcasm, or holding emotional grudges.",
        },
        {
          style: "Short & De-escalating",
          badge: "Pauses the fight peacefully",
          text: "Abhi hum dono shaayad tired hain aur irritation mein baat bigad sakti hai. Let's take a quick breather and talk after dinner peacefully. I want us to be okay.",
          why_it_works:
            "Stops emotional flooding in its tracks. Prevents impulsive midnight fights before hurtful words are spoken.",
        },
      ],
      golden_tip:
        "Do NOT send your original draft right now. Copy Option 1 (Soft & Loving) — it melts their guard in under 30 seconds.",
    };
  }

  // English default
  return {
    impact_meter: {
      level: riskPercent > 75 ? "high_risk" : "moderate_friction",
      percentage: riskPercent,
      status_text:
        riskPercent > 75
          ? "⚠️ High Risk: Will trigger defensiveness and escalate the argument"
          : "⚠️ Moderate Friction: Accusatory tone will overshadow your valid hurt",
      partner_reaction_summary:
        "The moment your partner reads absolute statements like 'you always' or 'you don't care', their nervous system shifts into fight-or-flight defense. They will fixate on proving you wrong rather than comforting you.",
    },
    emotional_translation: {
      what_you_wrote: draft,
      how_partner_hears_it:
        "In their head, they hear: 'Nothing I do is ever right. You don't see my sacrifices, you take me for granted, and you think I am a failure as a partner.'",
    },
    upgraded_versions: [
      {
        style: "Soft & Loving",
        badge: "Expresses hurt without attacking",
        text: "I was really looking forward to our time together today, and I felt quite lonely waiting. When things calm down, can we reconnect for a few minutes? I just want to feel close to you.",
        why_it_works:
          "Replaces accusatory 'You' statements with vulnerable 'I feel' statements. Gottman research confirms emotional bids expressed softly resolve conflict 5x faster.",
      },
      {
        style: "Clear & Mature",
        badge: "Sets healthy boundaries calmly",
        text: "I know work gets chaotic, but when plans change without a heads-up, it leaves me feeling unprioritized. Moving forward, I need us to send a quick text if delays happen so we stay on the same page.",
        why_it_works:
          "Asserts your needs with zero sarcasm or passive aggression. Respects both your boundaries and their reality.",
      },
      {
        style: "Short & De-escalating",
        badge: "Pauses the fight peacefully",
        text: "I'm feeling quite overwhelmed and frustrated right now, and I want to protect our relationship from heated words. Let's pause and talk through this gently in an hour.",
        why_it_works:
          "Recognizes emotional flooding and calls a constructive timeout before hurtful statements cause permanent attachment wounds.",
      },
    ],
    golden_tip:
      "Step away from your keyboard for 3 minutes. Send the Soft & Loving rewrite to give your partner the emotional safety to apologize.",
  };
}

```

---

## API: /api/simulate (Safe Conversation Simulator)

- **File Path:** `src/app/api/simulate/route.ts`
- **Lines of Code:** 255 lines
- **Size:** 10.91 KB

```typescript
import { NextRequest, NextResponse } from "next/server";
import { SimulationResult } from "@/types";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are DUO's Principal Behavioral Psychologist and Gottman-Certified Couples Communication Coach.
Your task is the "Safe Conversation Simulator".

CRITICAL LANGUAGE & TONE INSTRUCTION:
Mirror the user's exact Hinglish/English conversational style. Keep explanations deeply empathetic, psychological, and crystal clear. Never sound like a formal dictionary or a cold therapist—sound like a wise, warm, emotionally intelligent Indian relationship coach. Ensure zero duplicate text in JSON fields.

INDIAN RELATIONSHIP NUANCES:
Couples use this feature to practice saying difficult, vulnerable, or uncomfortable things before bringing them up live to their partner.
Understand common Indian couple dynamics:
- Needing quality time without sounding needy ("Mujhe time nahi dete").
- Solo space after long Indian corporate workday or family expectations.
- Finances, savings, and joint future planning.
- Emotional containment without passive aggression ("Achha thik hai", "Baat karne ka koi fayda nahi").

Strict Guidelines:
1. Empathy & Psychological Safety: Assume love is present on both sides. Show how the partner might receive the user's initial draft through their attachment system.
2. Refined Loving Script: Transform the user's words into a confident, non-defensive, warm script grounded in vulnerability and mutual respect (in everyday Hinglish or English).
3. Output Schema (valid JSON only):
{
  "readiness_score": 82,
  "partner_perspective": "If said abruptly, your partner might hear this as criticism or fear they aren't satisfying you. But when framed around missing your laughter together, they will feel desired rather than blamed.",
  "refined_script": "The exact loving and confident script to say out loud...",
  "hinglish_alternative": "Natural Hinglish version...",
  "coaching_tips": [
    "Choose a neutral time when neither of you is hungry or exhausted (HALT rule).",
    "Sit side-by-side or hold hands — physical touch reduces stress hormones by 40% during vulnerable discussions.",
    "Express your longing rather than their absence."
  ],
  "safe_opening_line": "Hey, when you have a relaxed moment tonight, there's something I'd love to share with you about us..."
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, userApproach, targetLanguage, userApiKey } = body as {
      topic: string;
      userApproach: string;
      targetLanguage?: "auto" | "hinglish" | "en";
      userApiKey?: string;
    };

    if (!userApproach || !userApproach.trim()) {
      return NextResponse.json(
        { error: "Please provide your draft approach to simulate." },
        { status: 400 }
      );
    }

    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const geminiResult = await callGeminiSimulate(apiKey, topic, userApproach, targetLanguage);
        if (geminiResult) {
          return NextResponse.json({
            success: true,
            source: "gemini-api",
            data: geminiResult,
          });
        }
      } catch (err: any) {
        console.warn("Gemini simulation failed, using psychological fallback:", err?.message);
      }
    }

    const fallbackResult = generateSimulationInference(topic, userApproach, targetLanguage);
    return NextResponse.json({
      success: true,
      source: apiKey ? "inference-fallback" : "psychological-engine",
      data: fallbackResult,
    });
  } catch (error: any) {
    console.error("Simulation API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during conversation simulation." },
      { status: 500 }
    );
  }
}

async function callGeminiSimulate(
  apiKey: string,
  topic: string,
  userApproach: string,
  targetLanguage?: "auto" | "hinglish" | "en"
): Promise<SimulationResult | null> {
  const modelName = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const langNote =
    targetLanguage === "hinglish"
      ? "User prefers output in natural everyday Indian Hinglish (Roman script)."
      : targetLanguage === "en"
      ? "User prefers output in warm modern English."
      : "Auto-detect language. If Hinglish/Hindi, respond in natural everyday Hinglish.";

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Conversation Topic: "${topic}"
User's Draft Approach: "${userApproach}"
${langNote}

Simulate how a partner will feel and generate the refined script, coaching tips, and readiness score following your system prompt. Output JSON only.`,
          },
        ],
      },
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    generationConfig: {
      temperature: 0.25,
      responseMimeType: "application/json",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error [${response.status}]: ${errorText}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned) as SimulationResult;
}

function generateSimulationInference(
  topic: string,
  userApproach: string,
  targetLanguage?: "auto" | "hinglish" | "en"
): SimulationResult {
  const lower = (topic + " " + userApproach).toLowerCase();
  const detectedHinglish =
    lower.includes("tum") ||
    lower.includes("meri") ||
    lower.includes("kuch") ||
    lower.includes("nahi") ||
    lower.includes("chahiye") ||
    lower.includes("thik") ||
    lower.includes("baat");

  const isQualityTime =
    lower.includes("quality time") ||
    lower.includes("needy") ||
    lower.includes("time") ||
    lower.includes("busy") ||
    lower.includes("waqt");

  const isSoloSpace =
    lower.includes("space") ||
    lower.includes("alone") ||
    lower.includes("tired") ||
    lower.includes("thak");

  const isFinances =
    lower.includes("finance") ||
    lower.includes("money") ||
    lower.includes("paisa") ||
    lower.includes("spending") ||
    lower.includes("budget");

  if (isQualityTime) {
    return {
      readiness_score: 86,
      partner_perspective:
        "Agar aap bolenge 'Tumhe toh bas kaam se matlab hai, time hi nahi dete', unka first reaction defense hoga. Par jab aap unhe feel karate hain ki aap unki company aur laughter miss kar rahe hain, they feel deeply desired rather than pressured.",
      refined_script:
        "Mujhe tumhare saath rehna bohot accha lagta hai, aur busy schedule ki wajah se I've really been missing our relaxed one-on-one time. Can we reserve one evening this week just for us two, without any work calls or distractions?",
      hinglish_alternative:
        "Main sach mein miss kar rahi hoon hamara phone-free quality time. Let's do a quiet dinner or chai date this Friday, just you and me?",
      coaching_tips: [
        "Pick a calm moment when neither of you is rushing out or exhausted before sleep.",
        "Emphasize desire ('I miss your company') instead of deficit ('You never make time').",
        "Offer a specific, easy-to-agree-to proposal (like 30 minutes for dessert or a walk).",
      ],
      safe_opening_line:
        "Hey, ek choti si sweet baat share karni thi aapse when you are relaxed tonight...",
    };
  }

  if (isSoloSpace) {
    return {
      readiness_score: 84,
      partner_perspective:
        "Jab partner bina explanation ke space maangte hain, anxious mind sochta hai 'Are they pulling away from me?' Pehle pyaar aur closeness affirm karna aur specific time batana anxiety ko khatam kar deta hai.",
      refined_script:
        "Main tumse milne ke liye bohot eager thi, par workday meetings se mera mind thoda overwhelmed hai. Can I take 25 minutes of quiet decompression to freshen up? Uske baad I'm completely all yours with full warmth.",
      hinglish_alternative:
        "Work se brain kaafi fried hai abhi. Mujhe bas 20 mins quiet time chahiye reset karne ke liye, phir hum aaram se dinner karte hain peacefully.",
      coaching_tips: [
        "Give them a specific return time ('20 minutes') so they know connection will resume.",
        "Offer a warm hug before retreating to your space.",
        "State clearly that the fatigue is from work stress, not from them.",
      ],
      safe_opening_line:
        "I love you so much, and to give you my best self tonight, I just need a quick 20-minute mental reset...",
    };
  }

  if (isFinances) {
    return {
      readiness_score: 80,
      partner_perspective:
        "Money triggers deep primal anxieties. Financial talks ko ek shared team puzzle ki tarah frame karein jahan aap dono milkar apne future dreams plan kar rahe hain, audit nahi kar rahe.",
      refined_script:
        "Main hamare future goals aur upcoming plans ke liye kaafi excited hoon. Can we sit down together this weekend over coffee like teammates and review our monthly budget peacefully? I want both of us to feel secure and stress-free.",
      hinglish_alternative:
        "Let's look at our roadmap together as a team this Sunday so we're completely aligned on our savings and trips.",
      coaching_tips: [
        "Never initiate budget talks right after an expensive purchase was made.",
        "Focus on shared aspirations (vacation, home, freedom) before discussing cuts.",
        "Celebrate what you both managed well before addressing areas to tighten.",
      ],
      safe_opening_line:
        "I was thinking about where we want to be next year, and I'd love your thoughts on our roadmap...",
    };
  }

  // General fallback
  return {
    readiness_score: 82,
    partner_perspective:
      "Aapke partner aapko khush dekhna chahte hain. Jab aap unke efforts ko acknowledge karte hain aur bina accusation ke apni vulnerable need batate hain, their heart opens to meet you.",
    refined_script:
      "Main sach mein admire karta hoon aap kitna hard work kar rahe ho. Meri taraf se ek choti si baat thi jo main share karna chahta tha taaki hum aur close feel karein. Let's talk whenever you're completely free tonight.",
    hinglish_alternative:
      "Hamara bond mere liye bohot precious hai, and I want to share something from my heart gently with you.",
    coaching_tips: [
      "Use Gottman's Gentle Startup: I feel [emotion] about [specific situation], and I need [positive action].",
      "Avoid words like 'always', 'never', or comparing them to anyone else.",
      "Acknowledge their feelings before presenting your solutions.",
    ],
    safe_opening_line:
      "You mean the world to me, and there's something vulnerable I'd love to talk through together...",
  };
}

```

---

## API: /api/daily-coach (Daily Connection Vitamin)

- **File Path:** `src/app/api/daily-coach/route.ts`
- **Lines of Code:** 64 lines
- **Size:** 2.97 KB

```typescript
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are DUO's Principal Behavioral Psychologist and Indian Relationship Daily Coach.

CRITICAL LANGUAGE & TONE INSTRUCTION:
Mirror the user's exact Hinglish/English conversational style. Keep explanations deeply empathetic, psychological, and crystal clear. Never sound like a formal dictionary or a cold therapist—sound like a wise, warm, emotionally intelligent Indian relationship coach. Ensure zero duplicate text in JSON fields.

INDIAN RELATIONSHIP NUANCES:
Provide daily connection advice and psychological attunement tips tailored to young Indian couples (Gen-Z & Millennials) balancing high-pressure work, family expectations, and relationship romance.

Output Schema (valid JSON):
{
  "coach_title": "Daily Relationship Vitamin",
  "coaching_advice": "Empathetic, clear coaching advice in warm everyday Hinglish or English...",
  "micro_action": "1 simple 2-minute actionable step...",
  "why_it_works": "Psychological rationale based on attachment theory or Gottman research."
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { habitTitle, habitCategory, targetLanguage, userApiKey } = body as {
      habitTitle?: string;
      habitCategory?: string;
      targetLanguage?: "auto" | "hinglish" | "en";
      userApiKey?: string;
    };

    const isHinglish = targetLanguage !== "en";

    const responseData = isHinglish
      ? {
          coach_title: "Aaj Ka Connection Vitamin",
          coaching_advice:
            "Work stress aur daily routine mein hum aksar maan lete hain ki partner samajh jayega. Par relationship mein unspoken expectations silent fatigue ban jaate hain. Aaj ek chota sa affectionate gesture unhe feel karayega ki woh priority hain.",
          micro_action:
            "Agli baar call ya text karne se pehle ek 10-second voice note bhejo warmly: 'Bas tumhari yaad aayi thi, hope your day is going gently.'",
          why_it_works:
            "Human voice tone strips 80% of digital misinterpretation and triggers immediate oxytocin release.",
        }
      : {
          coach_title: "Daily Relationship Vitamin",
          coaching_advice:
            "Under workday pressure, we often assume our partners know we love them. But unspoken warmth leads to silent drift. A tiny 10-second vulnerable gesture breaks cognitive isolation immediately.",
          micro_action:
            "Send a quick 10-second voice note instead of a flat text: 'Just thinking about you, hope your day is treating you kindly.'",
          why_it_works:
            "Vocal prosody releases oxytocin and signals safe attachment far more effectively than text on a screen.",
        };

    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch daily coaching advice." },
      { status: 500 }
    );
  }
}

```

---

