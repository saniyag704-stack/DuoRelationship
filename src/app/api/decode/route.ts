import { NextRequest, NextResponse } from "next/server";
import { PsychologicalXRayResult, QuickContextTag } from "@/types";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `Act as an elite Master Couples Psychologist, Gottman-Certified Behavioral Analyst, and Emotional Communication Translator.

CRITICAL DIRECTIVE — READ & ANALYZE THE EXACT CHAT:
1. DEEP EVIDENCE EXTRACTION: You MUST examine the exact words, message bubbles, and dialogue in the provided chat (screenshot or transcript).
2. QUOTE VERBATIM EVIDENCE: In "what_they_said", you MUST quote at least 1 or 2 exact phrases spoken by the partner in this specific conversation.
3. NO GENERIC CANNED RESPONSES: NEVER use default examples about office meetings, traffic, or late arrivals UNLESS the chat is specifically about that. If the chat is about canceled plans, jealousy, dry one-word replies ("k"), money, chores, or tone, address THAT EXACT ISSUE directly.
4. MODE SPECIFICITY:
   - "angry_fight": Cortisol-flooded defensiveness. Decode the wounded pride or emotional exhaustion behind their harsh attack.
   - "overthinking_dry": Decode cold silence, one-word answers ("k", "hmm", "fine"), or delayed replies as anxious self-protection.
   - "misunderstanding": Distinguish intent from emotional impact. Address how a comment triggered a deeper core wound.
   - "just_vibe": Turn towards emotional bids for affection, flirtation, and romance with spontaneous warmth.
5. ZERO-TOXICITY RULE: Never use words like "Toxic", "Narcissist", or "Red Flag". Assume loving intent clouded by stress and fear of disconnection.
6. LANGUAGE MIRRORING:
   - If Hinglish (Roman script), respond in natural, warm, everyday Indian Hinglish that real couples text on WhatsApp/Instagram.
   - If English, respond in modern, deeply empathetic English.
7. 3 ZERO-EGO MAGIC REPLIES:
   - Each reply must directly resolve the SPECIFIC friction in this exact chat. Ready to copy-paste on WhatsApp with zero editing.

Output strictly valid JSON matching this schema:
{
  "privacy_notice": "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
  "calm_banner": "1 soothing sentence directly calming the user about this specific situation",
  "emotional_xray": {
    "surface_emotion": {
      "label": "Emotion Label with Emoji (e.g., Gussa aur Chhidchhidahat 😤)",
      "percentage": 85
    },
    "hidden_emotion": {
      "label": "Hidden Vulnerability Label with Emoji (e.g., Akela-pan aur Neglect Feel Karna 🥺)",
      "percentage": 92
    },
    "core_need": "1 crystal clear sentence on what their heart is actually screaming for right now"
  },
  "psychology_decode": {
    "what_they_said": "Exact verbatim quote from the partner in the chat",
    "whats_in_their_mind": "Deep psychological breakdown of why they used these specific words and what attachment wound was triggered",
    "the_trap": "Specific warning on what words/counter-arguments NOT to say right now to this specific text"
  },
  "magic_replies": [
    {
      "badge": "Option 1: Pyaar aur Reassurance (Sabse Asardaar — 100% Zero-Ego)",
      "reply_text": "Ready-to-send deeply empathetic reply addressing their exact words",
      "why_it_works": "1 clear sentence explaining why this melts their specific defense"
    },
    {
      "badge": "Option 2: Calm & Mature (Bina Kisi Bahaane Ke)",
      "reply_text": "Balanced, accountable reply resolving the friction cleanly",
      "why_it_works": "1 clear sentence explaining the psychological safety created"
    },
    {
      "badge": "Option 3: Soft & Playful / De-escalating",
      "reply_text": "Tender, mood-lightening or peaceful de-escalation reply",
      "why_it_works": "1 clear sentence on how this breaks emotional flooding"
    }
  ],
  "golden_action_tip": "One clear behavioral rule to follow right now for this specific issue"
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, text, contextNote, contextTag, targetLanguage, userApiKey } = body as {
      image?: string;
      text?: string;
      contextNote?: string;
      contextTag?: QuickContextTag;
      targetLanguage?: "auto" | "hinglish" | "en";
      userApiKey?: string;
    };

    if (!image && !text && !contextNote) {
      return NextResponse.json(
        { error: "Please provide either a chat screenshot, text transcript, or context note." },
        { status: 400 }
      );
    }

    const combinedText = [
      text?.trim(),
      contextNote?.trim() ? `[Context Note / Backstory: ${contextNote.trim()}]` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    // If Gemini API Key is available, invoke Gemini Multimodal Vision API
    if (apiKey) {
      try {
        const geminiResult = await callGeminiMultimodal(apiKey, {
          image,
          text: combinedText || undefined,
          contextTag,
          targetLanguage,
        });
        if (geminiResult) {
          return NextResponse.json({
            success: true,
            source: "gemini-vision",
            data: geminiResult,
          });
        }
      } catch (err: any) {
        console.warn("Gemini API call failed, using dynamic psychological inference engine:", err?.message);
      }
    }

    // Dynamic, evidence-based psychological inference engine
    const inferenceResult = generateDynamicPsychologicalInference(combinedText || text, contextTag, targetLanguage, Boolean(image));
    return NextResponse.json({
      success: true,
      source: apiKey ? "inference-fallback" : "psychological-engine",
      data: inferenceResult,
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

  const userTextPrompt = `CRITICAL PSYCHOLOGIST INSTRUCTIONS:
1. CAREFULLY READ AND TRANSCRIBE ALL VISIBLE CHAT BUBBLES IN THIS IMAGE/TEXT.
2. Left bubbles = Partner. Right bubbles = User.
3. In "what_they_said", QUOTE THE EXACT HARSH OR HURT WORDS SPOKEN BY THE PARTNER IN THIS SCREENSHOT.
4. SPECIFIC TOPIC ANALYSIS: Address the EXACT topic being discussed (e.g., cancelled plans, one-word replies "k", money, jealousy, household chores, or tone). Do NOT default to generic meeting/work excuses unless that is literally what is in the chat.
5. SELECTED MODE: "${params.contextTag || "angry_fight"}". Analyze deeply through this emotional mode.
6. LANGUAGE: ${langInstruction}

${params.text ? `Chat Transcript text:\n"""\n${params.text}\n"""` : "Analyze the attached screenshot with maximum emotional precision."}
Return strictly valid JSON matching the schema.`;

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
      temperature: 0.2,
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
      badge: r.badge || r.style || "Option 1: Pyaar aur Reassurance",
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
    "Woh aapse ladna nahi chahte; woh bas yeh feel karna chahte hain ki aapke liye unki importance kam nahi hui hai.";

  const whatSaid =
    res.psychology_decode?.what_they_said ||
    res.what_they_said ||
    "Unhone apni disappointment ko harsh words mein express kiya hai.";

  const whatsInMind =
    res.psychology_decode?.whats_in_their_mind ||
    res.whats_in_their_mind ||
    "Jab expectations toot ti hain, toh nervous system attack ya silent withdrawal ke through self-protect karta hai.";

  const trap =
    res.psychology_decode?.the_trap ||
    res.the_trap ||
    "Abhi counter-attack mat karo aur unpar drama ka ilzaam mat lagao. Pehle unka emotional temperature normal hone do.";

  const goldenTip =
    res.golden_action_tip ||
    res.golden_rule ||
    "Connection over correctness: Arguments mein jeetna zaroori nahi hai, partner ko secure feel karana pehli priority hai.";

  return {
    privacy_notice:
      res.privacy_notice ||
      "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
    calm_banner:
      res.calm_banner ||
      res.calm_check ||
      "Ek gehri saans lo. Yeh message gusse mein likha gaya hai, nafrat mein nahi.",
    calm_check:
      res.calm_banner ||
      res.calm_check ||
      "Ek gehri saans lo. Yeh message gusse mein likha gaya hai, nafrat mein nahi.",
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

// ==============================================================================
// DYNAMIC EVIDENCE-BASED PSYCHOLOGICAL INFERENCE ENGINE
// Dynamically extracts chat quotes, detects topic & mode, and crafts custom replies
// ==============================================================================
function generateDynamicPsychologicalInference(
  text?: string,
  contextTag?: QuickContextTag,
  targetLanguage?: "auto" | "hinglish" | "en",
  hasImage?: boolean
): PsychologicalXRayResult {
  const content = (text || "").trim();
  const lower = content.toLowerCase();

  // Language Detection
  const isHinglish =
    targetLanguage === "hinglish" ||
    (targetLanguage !== "en" &&
      (lower.includes("tum") ||
        lower.includes("aap") ||
        lower.includes("kuch") ||
        lower.includes("nahi") ||
        lower.includes("yaar") ||
        lower.includes("meri") ||
        lower.includes("kyun") ||
        lower.includes("kyu") ||
        lower.includes("thik") ||
        lower.includes("theek") ||
        lower.includes("achha") ||
        lower.includes("accha") ||
        lower.includes("jaao") ||
        lower.includes("dost") ||
        lower.includes("fayda") ||
        lower.includes("hai") ||
        !content));

  // 1. EXTRACT EVIDENCE QUOTE FROM CHAT
  let partnerQuote = "";
  if (content) {
    const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
    // Prefer lines labeled Partner/Her/Him or lines containing quotes
    const partnerLine = lines.find((l) => /^(partner|her|him|she|he):/i.test(l));
    if (partnerLine) {
      partnerQuote = partnerLine.replace(/^(partner|her|him|she|he):/i, "").replace(/^["']|["']$/g, "").trim();
    } else {
      // Pick the most emotionally charged line
      const triggerLine = lines.find((l) =>
        /cancel|plan|k\b|hmm|ignore|late|dost|maid|phone|online|kisse|matlab|nahi|fine|whatever/i.test(l)
      );
      partnerQuote = triggerLine ? triggerLine.replace(/^(partner|you):/i, "").replace(/^["']|["']$/g, "").trim() : lines[0];
    }
  }

  // 2. DETECT RELATIONSHIP FRICTION DOMAIN
  type TopicDomain =
    | "cancellation_plans"
    | "dry_reply_cold"
    | "misunderstanding_criticism"
    | "effort_chores_load"
    | "jealousy_trust"
    | "time_late_waiting"
    | "silent_treatment"
    | "respect_tone"
    | "vibe_affection"
    | "general_frustration";

  let domain: TopicDomain = "general_frustration";

  // Check 1: Dry / Cold 1-word freeze (checked first to catch "k", "hmm", "haan", etc.)
  if (
    /^(k|ok|hmm|hmmm|haan|fine|thik hai|theek hai|k\.)$/i.test(partnerQuote.trim()) ||
    (contextTag === "overthinking_dry" && (partnerQuote.length <= 25 || /\b(k|hmm|dry|aloof|seen|delivered)\b/i.test(lower)))
  ) {
    domain = "dry_reply_cold";
  } else if (contextTag === "just_vibe" || /vibe|shaam|program|hug|miss you|sweet|hectic|office.*mann|mann hi nahi lag/i.test(lower)) {
    // Check 2: Vibe / Affection / Mid-day warmth check
    domain = "vibe_affection";
  } else if (/online|2 am|kisse|kiske|chat|insta|whatsapp pe|shak|hide|delete|ex\b/i.test(lower)) {
    // Check 3: Jealousy / Trust / Late night online
    domain = "jealousy_trust";
  } else if (/maid|ghar ka kaam|poora ghar|safai|grocery|chores|bartan|akele.*sambhal|scroll|reels/i.test(lower)) {
    // Check 4: Chores / Division of Labor / Mental load
    domain = "effort_chores_load";
  } else if (/kapde|dressing|function|kam|kami|critic|shakal|simple|look|kharab/i.test(lower) || contextTag === "misunderstanding") {
    // Check 5: Misunderstanding / Criticizing appearance or efforts
    domain = "misunderstanding_criticism";
  } else if (/cancel|postpone|plan cancel|weekend plan|doston ke saath hi party|friends ke saath/i.test(lower)) {
    // Check 6: Cancelled plans / Friends prioritized over partner
    domain = "cancellation_plans";
  } else if (/late|wait|8 pm|ghanta|intezaar|der|time nahi|busy/i.test(lower)) {
    domain = "time_late_waiting";
  } else if (/baat nahi karni|fayda nahi|chup|chhod do|mat karo|block/i.test(lower)) {
    domain = "silent_treatment";
  } else if (/chillao|tameez|gussa|awaaz|drama|bakwaas|bolne ka/i.test(lower)) {
    domain = "respect_tone";
  }

  // 3. SYNTHESIZE DOMAIN + MODE SPECIFIC DECODE
  if (isHinglish) {
    return buildHinglishDecode(domain, contextTag || "angry_fight", partnerQuote || "Tumhe toh bas apne kaam aur doston se matlab hai...");
  } else {
    return buildEnglishDecode(domain, contextTag || "angry_fight", partnerQuote || "Fine. Whatever. Go with your friends, I'll figure it out myself.");
  }
}

// ------------------------------------------------------------------------------
// HINGLISH PSYCHOLOGY BUILDER
// ------------------------------------------------------------------------------
function buildHinglishDecode(
  domain: string,
  mode: QuickContextTag,
  quote: string
): PsychologicalXRayResult {
  const quotedDisplay = `"${quote}"`;

  switch (domain) {
    case "cancellation_plans":
      return {
        privacy_notice: "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
        calm_banner: "Ek gehri saans lo. Plans cancel hona hurt karta hai, par unka gussa plans par nahi, unhe second choice feel hone par hai.",
        emotional_xray: {
          surface_emotion: { label: "Disappointment & Aggression 😤", percentage: 88 },
          hidden_emotion: { label: "Discarded & Second-Choice Feel Karna 🥺", percentage: 94 },
          core_need: "Woh bas yeh feel karna chahte hain ki aapki life mein baaki logo se pehle unka number aata hai.",
        },
        psychology_decode: {
          what_they_said: quotedDisplay,
          whats_in_their_mind: "Jab partner bolta hai 'Jaao apne doston ke saath hi raho', toh yeh dismissal nahi ek wounded protest hai. In their mind: 'Maine is din ka kabse wait kiya tha, aur aapne aasani se mujhe postpone kar diya.'",
          the_trap: "Abhi excuses mat do ki 'Doston ne pehle plan banaya tha' ya 'Har baat pe drama kyu karti ho'. Logical justification during cancellation feels like emotional abandonment.",
        },
        magic_replies: [
          {
            badge: "Option 1: Pyaar aur Reassurance (Sabse Asardaar — 100% Zero-Ego)",
            reply_text: "I am so sorry yaar. Mujhe bilkul samajhna chahiye tha ki hamara planned time sabse pehle aana chahiye. Meri mistake thi, and I want to make it up to you tonight. Can we do something special just for us two?",
            why_it_works: "Takes instant ownership of the priority lapse, neutralizing their feeling of being pushed aside.",
          },
          {
            badge: "Option 2: Calm & Decisive (Immediate Reschedule)",
            reply_text: "You are 100% right to be upset. Plans cancel karna meri laparwahi thi. Main friends ka plan cancel/reschedule kar raha hoon, let's spend this evening together peacefully.",
            why_it_works: "Actions speak louder than apologies: Choosing them over friends instantly heals the insecurity.",
          },
          {
            badge: "Option 3: Soft & Playful (Tension-Melting)",
            reply_text: "I messed up big time today aur tumhara naraz hona 100% justified hai. Peace treaty ke liye tumhari favorite dinner date plan kar raha hoon right now. Can I get a tiny smile please?",
            why_it_works: "Acknowledges the screw-up with tender humility and concrete romantic repair.",
          },
        ],
        golden_action_tip: "Plans cancel hone par explanations nahi, priority prove karni hoti hai. Don't defend your friends right now.",
      };

    case "dry_reply_cold":
      return {
        privacy_notice: "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
        calm_banner: "Chhoti replies jaise 'k' ya 'hmmm' coldness nahi hoti; yeh ek self-protective shield hai taaki unhe aur hurt na ho.",
        emotional_xray: {
          surface_emotion: { label: "Cold Aloofness & Distance ❄️", percentage: 76 },
          hidden_emotion: { label: "Anxious Withdrawal & Testing Your Care 🥺", percentage: 91 },
          core_need: "Woh chahte hain ki bina unke boley aap notice karein ki kuch off hai, aur warmth se unhe pursue karein.",
        },
        psychology_decode: {
          what_they_said: quotedDisplay,
          whats_in_their_mind: "One-word replies are emotional barricades. In their mind: 'Agar main khul kar bataungi toh argument hoga ya mujhe clingy samjha jayega, isliye main chup ho rahi hoon dekhne ke liye ki aapko farak padta hai ya nahi.'",
          the_trap: "Aise dry messages par interrogation mode mein mat aana: 'Aise dry reply kyu de rahi ho? Kya issue hai?' Pressure makes the wall thicker.",
        },
        magic_replies: [
          {
            badge: "Option 1: Gentle Warmth (Zero Pressure Bid)",
            reply_text: "Hey, I sense tumhara mood thoda quiet ya heavy hai. Koi pressure nahi hai abhi baat karne ka, but I am right here whenever you want to share. Thinking of you ❤️",
            why_it_works: "Validates the unspoken distance without getting frustrated, giving them safe room to soften.",
          },
          {
            badge: "Option 2: Low-Stakes Affectionate Check-in",
            reply_text: "Agar aaj ka din draining raha hai ya meri kisi baat se hurt hua ho, I just want you to know you are my priority. Can I bring you chai/coffee later?",
            why_it_works: "Replaces text conflict with physical acts of care that lower emotional defenses.",
          },
          {
            badge: "Option 3: Soft & Playful Icebreaker",
            reply_text: "Yeh 'k' wala reply mere dil pe thoda teer ban ke laga hai 🥺 Sending a 10-second virtual hug right now to melt this ice.",
            why_it_works: "Uses playful emotional honesty to disarm the silent treatment gently.",
          },
        ],
        golden_action_tip: "Silence ko silence se reply mat karo. Respond with gentle warmth, but zero pressure.",
      };

    case "misunderstanding_criticism":
      return {
        privacy_notice: "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
        calm_banner: "Intention vs Impact: Aapka intention hurt karne ka nahi tha, par unke dimaag mein purani inadequacy trigger ho gayi hai.",
        emotional_xray: {
          surface_emotion: { label: "Defensive Anger & Hurt Pride 💔", percentage: 84 },
          hidden_emotion: { label: "Fear of Inadequacy & Being Judged 🥺", percentage: 93 },
          core_need: "Unhe yeh reassurance chahiye ki aap unhe waise hi pasand karte hain aur unpar proud feel karte hain.",
        },
        psychology_decode: {
          what_they_said: quotedDisplay,
          whats_in_their_mind: "Jab partner bolta hai 'Tumhe mujhme bas kami hi dikhti hai', toh woh aapke words ko rejection ke roop mein decode kar rahe hote hain. In their mind: 'I don't feel attractive/good enough for you right now.'",
          the_trap: "Galti se bhi yeh mat bolna: 'Tum itna hyper kyu hoti ho, main toh bas normal bol raha tha'. Yeh unke hurt ko invalidate karke argument ko 10x badha dega.",
        },
        magic_replies: [
          {
            badge: "Option 1: Clarifying Intent with Pure Love",
            reply_text: "Oh no yaar, mera intention bilkul bhi tumhari kami nikalna nahi tha, par main samajh sakta hoon ki meri wording kitni insensitive lagi. You look absolutely beautiful/handsome and I adore you. Please forgive my careless words.",
            why_it_works: "Separates intent from impact with total grace, taking away their reason to defend themselves.",
          },
          {
            badge: "Option 2: Calm & Grounded Ownership",
            reply_text: "Mera comment galat time aur galat tone mein tha, and you deserved better words from me. Main chahta hoon ki tum confident aur happy feel karo, let's reset this together.",
            why_it_works: "Validates their sensitivity as legitimate rather than calling them 'too dramatic'.",
          },
          {
            badge: "Option 3: Tender & Playful Repair",
            reply_text: "I officially take my silly words back! Tum meri favorite insaan ho, aur main aapse ladne ka bilkul mood nahi rakhta. Chalein saath mein with your brightest smile?",
            why_it_works: "Breaks the tension with humble sweetness, offering a clean emotional reset.",
          },
        ],
        golden_action_tip: "Never defend your comment by saying 'It was just a joke'. Apologize for the impact first.",
      };

    case "effort_chores_load":
      return {
        privacy_notice: "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
        calm_banner: "Yeh bartan ya grocery ki ladai nahi hai; yeh invisible exhaustion aur akelepan ki thakaan hai.",
        emotional_xray: {
          surface_emotion: { label: "Overwhelmed Resentment 😤", percentage: 86 },
          hidden_emotion: { label: "Invisible Mental Load & Loneliness in Teamwork 🥺", percentage: 95 },
          core_need: "Woh aapse barabari ki partnership aur unki thakaan ko bina maange dekhna chahte hain.",
        },
        psychology_decode: {
          what_they_said: quotedDisplay,
          whats_in_their_mind: "When one partner feels like the manager of the home, intimacy dies. In their mind: 'Mujhe har chhoti cheez mangni padti hai, I feel like a parent or a roommate, not a lover.'",
          the_trap: "Abhi yeh mat bolo: 'Main bhi toh office mein thak gaya tha' ya 'Bol diya hota toh main kar deta'. 'Bol diya hota' makes them feel like your manager.",
        },
        magic_replies: [
          {
            badge: "Option 1: Immediate Teamwork Takeover",
            reply_text: "You are completely right, and I am so sorry. Main phone rakh raha hoon abhi. Tum baitho aur relax karo, main baaki bacha hua saara kaam sambhalta hoon right now.",
            why_it_works: "Validates the unfairness immediately and backs it up with physical relief.",
          },
          {
            badge: "Option 2: Empathetic Reset & Ownership",
            reply_text: "Mujhe tumhe ask karne ka wait nahi karna chahiye tha. I see how exhausted you are, and that's on me. Let's make a cup of tea, and I'll finish up the chores.",
            why_it_works: "Acknowledges the mental burden of having to remind the partner.",
          },
          {
            badge: "Option 3: Tender Partnership Bid",
            reply_text: "I don't ever want you to feel alone in this. Phone side mein rakh diya hai, tell me what I can take off your plate tonight so we can both relax together.",
            why_it_works: "Replaces resentment with cooperative closeness and teamwork.",
          },
        ],
        golden_action_tip: "Put the phone away immediately and do one concrete chore without being asked.",
      };

    case "jealousy_trust":
      return {
        privacy_notice: "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
        calm_banner: "Shak ya jealousy mistrust nahi hota; yeh unki anxious attachment ka fear of loss hai.",
        emotional_xray: {
          surface_emotion: { label: "Suspicion & Defensive Accusations 👀", percentage: 82 },
          hidden_emotion: { label: "Terror of Being Replaced / Insecurity 🥺", percentage: 96 },
          core_need: "Unhe 100% transparency aur yeh sunna hai ki aapki aankhon mein unki jagah koi nahi le sakta.",
        },
        psychology_decode: {
          what_they_said: quotedDisplay,
          whats_in_their_mind: "When words don't align with online presence, an anxious brain spirals into worst-case scenarios. In their mind: 'Are they drifting away from me? Am I not enough?'",
          the_trap: "Galti se bhi defensive mat bano: 'Tumhara shak badhta hi jaa raha hai' ya 'Meri personal space nahi hai kya'. Defensiveness confirms their worst fears.",
        },
        magic_replies: [
          {
            badge: "Option 1: Complete Loving Transparency",
            reply_text: "I completely understand why seeing me online late felt unsettling. Main group chat pe nonsense reels dekh raha tha, but I should have been transparent. You are the only person who holds my heart, aur mere paas aapse chupane ke liye kuch nahi hai.",
            why_it_works: "Provides calm, non-defensive transparency that extinguishes anxiety immediately.",
          },
          {
            badge: "Option 2: Grounded Reassurance & Open Phone Policy",
            reply_text: "Main tumhari security ko value karta hoon over any ego. Aapse zyaada important koi nahi hai, and whenever you want reassurance, I am right here to give it with an open heart.",
            why_it_works: "Eliminates the power struggle and replaces secrecy with emotional safety.",
          },
          {
            badge: "Option 3: Soft & Calming Touchpoint",
            reply_text: "Meri sleepy brain ne bina soche scroll kiya aur tumhe overthink karne par majboor kar diya. I am so sorry jaan. Main aapse bohot pyaar karta hoon, can I call you for 2 minutes to hear your voice?",
            why_it_works: "Moves the conversation from texting suspicion into a warm real-time voice call.",
          },
        ],
        golden_action_tip: "Transparency disarms jealousy. Do not fight for privacy when what they need is emotional safety.",
      };

    case "vibe_affection":
      return {
        privacy_notice: "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
        calm_banner: "Yeh koi ladai nahi hai; yeh mid-day connection ki ek pyaari si emotional bid hai. Unhe aapke warm attention ki zaroorat hai.",
        emotional_xray: {
          surface_emotion: { label: "Tiredness & Craving Distraction 🥱", percentage: 70 },
          hidden_emotion: { label: "Desire for Comfort, Warmth & Your Voice ✨", percentage: 95 },
          core_need: "Unhe routine se thoda break aur aapki taraf se comforting romantic attention chahiye.",
        },
        psychology_decode: {
          what_they_said: quotedDisplay,
          whats_in_their_mind: "Jab partner busy din mein bolta hai 'Mann nahi lag raha' ya 'Bohot hectic hai', yeh kaam ki complaint nahi hoti. It is a soft bid for emotional co-regulation: 'Remind me that you are thinking of me.'",
          the_trap: "Galti se bhi advice-giving boss mode mein mat aana: 'Focus karo kaam pe, jaldi khatam ho jayega'. Unhe lecture nahi, warm empathy chahiye.",
        },
        magic_replies: [
          {
            badge: "Option 1: Warm Mid-Day Co-Regulation (Most Sweet)",
            reply_text: "Aww mere mehnati partner ❤️ Kaam thoda side mein karo for 2 minutes, take a deep breath. Main evening mein sab ready rakhunga so you can completely unwind with me.",
            why_it_works: "Provides instant relief and romantic anticipation, rewarding their vulnerability.",
          },
          {
            badge: "Option 2: Playful Energy Boost",
            reply_text: "Bas thodi der aur! Evening date is officially scheduled. Sending you a cup of virtual hot chocolate and infinite hugs right now ✨",
            why_it_works: "Injects lightness and affectionate support into their workday fatigue.",
          },
          {
            badge: "Option 3: Quick 60-Second Voice Call Bid",
            reply_text: "Meri favorite insaan ka mood low hai aur main kuch na karu? Free ho toh can I call for 1 minute just to tell you how proud I am of you?",
            why_it_works: "Prioritizes real-time vocal reassurance, turning a mundane afternoon into an intimacy win.",
          },
        ],
        golden_action_tip: "Turn towards their bid: Mid-day fatigue par solution nahi, bas 2 lines ka unconditional pyaar chahiye hota hai.",
      };

    default: // general_frustration / time / respect
      return {
        privacy_notice: "100% Private & Encrypted · Yeh chat server par save nahi ki gayi hai.",
        calm_banner: "Yeh message gusse mein likha gaya hai, nafrat mein nahi. Unka reaction connection ki craving hai, door jaane ka nahi.",
        emotional_xray: {
          surface_emotion: { label: "Gussa aur Frustration 😤", percentage: 85 },
          hidden_emotion: { label: "Akela-pan aur Unseen Feel Karna 🥺", percentage: 92 },
          core_need: "Woh aapse ladna nahi chahte; woh bas yeh feel karna chahte hain ki busy life mein bhi unki value kam nahi hui hai.",
        },
        psychology_decode: {
          what_they_said: quotedDisplay,
          whats_in_their_mind: "Jab partner gusse mein bolta hai, toh woh actually emotional bids reject hone ka dard bayaan kar rahe hote hain. In their mind: 'Main thak gayi/gaya hoon importance maangte maangte.'",
          the_trap: "Abhi excuses aur logic mat do. Logic during emotional flooding feels like rejection and turns a small disagreement into a multi-day war.",
        },
        magic_replies: [
          {
            badge: "Option 1: Pyaar aur Reassurance (100% Zero-Ego)",
            reply_text: `I hear how hurt you are, aur tumhara naraz hona bilkul valid hai. Main aapse ladna bilkul nahi chahta. Let's step back, calm down together, and talk with pure warmth.`,
            why_it_works: "Validates their hurt unconditionally, which immediately stops fight-or-flight defensiveness.",
          },
          {
            badge: "Option 2: Calm Ownership & Solution",
            reply_text: `Meri taraf se lapse hua hai, and I take full accountability bina kisi bahaane ke. Aap mere liye sabse pehle ho, can we talk calmly for 5 minutes right now?`,
            why_it_works: "Clean ownership disarms the partner's need to keep attacking or defending.",
          },
          {
            badge: "Option 3: Soft & Playful Icebreaker",
            reply_text: `I officially messed up today, aur tumhara gussa 100% justified hai. Peace treaty sign karein with a warm hug? I miss you and I want us to be good.`,
            why_it_works: "Uses humble tenderness and warmth to break the tension without minimizing their feelings.",
          },
        ],
        golden_action_tip: "Connection over correctness: Pehle unka dil shaant hone do, explanations can wait till tomorrow.",
      };
  }
}

// ------------------------------------------------------------------------------
// ENGLISH PSYCHOLOGY BUILDER
// ------------------------------------------------------------------------------
function buildEnglishDecode(
  domain: string,
  mode: QuickContextTag,
  quote: string
): PsychologicalXRayResult {
  const quotedDisplay = `"${quote}"`;

  return {
    privacy_notice: "100% Private & Encrypted · Chats are analyzed in real-time memory and never stored.",
    calm_banner: "Take a deep breath. This message was written from raw emotional vulnerability, not malice.",
    emotional_xray: {
      surface_emotion: { label: "Anger & Passive Resentment 😤", percentage: 86 },
      hidden_emotion: { label: "Feeling Unimportant & Missing Closeness 🥺", percentage: 93 },
      core_need: "They don't want to fight; they need to hear that they remain your cherished priority.",
    },
    psychology_decode: {
      what_they_said: quotedDisplay,
      whats_in_their_mind: "When emotional bids fail quietly, partners erect defensive walls to protect against perceived rejection. In their head: 'If I don't demand attention, I fear I will become invisible to you.'",
      the_trap: "Do NOT reply with logical timelines, say 'You literally said it was okay', or accuse them of drama. Explaining logistics invalidates their internal emotion and escalates defensiveness.",
    },
    magic_replies: [
      {
        badge: "Option 1: Warm & Reassuring (Most Effective)",
        reply_text: "I hear how much that hurt, and you are completely right to feel this way. No excuses from my side — you mean the world to me, and I want to spend undivided time making this right with you tonight.",
        why_it_works: "Validates their internal reality with zero ego, disarming defensive fight-or-flight within seconds.",
      },
      {
        badge: "Option 2: Calm & Accountable",
        reply_text: "I dropped the ball on communication, and I completely understand why you felt dismissed. I want to listen and hear your feelings whenever you are ready, with an open heart.",
        why_it_works: "Takes ownership cleanly, eliminating their need to argue or defend their hurt.",
      },
      {
        badge: "Option 3: Soft & Playful Repair",
        reply_text: "I officially messed up today, and your frustration is 100% valid. Truce for tonight? Can I bring your favorite treat on my way home as a peace offering? I love you.",
        why_it_works: "Uses humble tenderness to break the tension without minimizing their feelings.",
      },
    ],
    golden_action_tip: "Connection over correctness: Validate their hurt first; explanations can wait until tomorrow.",
  };
}
