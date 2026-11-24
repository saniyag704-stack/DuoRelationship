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
