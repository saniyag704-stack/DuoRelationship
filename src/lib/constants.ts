import { DailyHabit, CoupleVibeCard } from "@/types";

export const DAILY_HABITS_POOL: Omit<DailyHabit, "id" | "completed" | "dateKey" | "completedAt">[] = [
  {
    title: "The 10-Second Voice Tone Shift",
    category: "attunement",
    actionPrompt: "Send a 10-second voice note instead of a text today. Let them hear the warmth in your voice rather than guessing your inflection.",
    psychologicalWhy: "Text messaging strips 80% of human prosody (tone, pacing, warmth), frequently triggering micro-anxieties or misinterpreted coldness.",
    estimatedMinutes: 1,
  },
  {
    title: "Unsolicited Micro-Appreciation",
    category: "appreciation",
    actionPrompt: "Acknowledge one invisible thing your partner handled recently (e.g., ordering groceries, calming a situation, or simply being resilient).",
    psychologicalWhy: "Dr. John Gottman's research shows thriving relationships maintain a 5:1 ratio of positive-to-negative interactions during conflict, built on daily appreciation reserves.",
    estimatedMinutes: 2,
  },
  {
    title: "Curiosity Over Assumption",
    category: "vulnerability",
    actionPrompt: "Ask: 'What felt like the heaviest part of your day today?' and just listen for 2 minutes without attempting to fix it.",
    psychologicalWhy: "Attachment theory emphasizes 'emotional containment' — feeling heard without premature problem-solving creates neurobiological safety.",
    estimatedMinutes: 3,
  },
  {
    title: "The Evening Transition Anchor",
    category: "attunement",
    actionPrompt: "Before diving into dinner or screen time, share a 6-second hug or hold hands quietly for 3 deep breaths.",
    psychologicalWhy: "A 6-second physical embrace stimulates oxytocin release and downregulates the sympathetic nervous system after workday stress.",
    estimatedMinutes: 1,
  },
  {
    title: "The Low-Stakes Vulnerability Bid",
    category: "playfulness",
    actionPrompt: "Share a random thought or funny memory from your week with zero expectation of an immediate reply: 'Thinking about that silly moment in Bombay...'",
    psychologicalWhy: "Dr. Gottman's 'emotional bids' are tiny invitations to connect. Bids made without pressure build emotional bank accounts effortlessly.",
    estimatedMinutes: 2,
  },
];

export const COUPLE_VIBE_ARCHETYPES: CoupleVibeCard[] = [
  {
    id: "calm-anchor-passionate-storm",
    archetype: "The Calm Anchor & The Passionate Storm",
    tagline: "Grounding depth meets vibrant emotional courage",
    partnerOneRole: "The Calm Anchor (Grounded, Steady, Deep Thinker)",
    partnerTwoRole: "The Passionate Storm (Expressive, Catalytic, Heart-led)",
    superpower: "De-escalating heated moments into grounded mutual empathy within 10 minutes",
    growthEdge: "Giving each other 15 minutes of quiet decompression before discussing complex logistics",
    harmonyScore: 92,
    unlockedAt: new Date().toISOString(),
    colorGradient: "from-amber-700/30 via-rose-900/40 to-obsidian-950",
    quote: "One holds the center, while the other breathes fire and wonder into life.",
    confidentialChatCount: 14,
  },
  {
    id: "silent-guardian-radiant-sun",
    archetype: "The Silent Guardian & The Radiant Sun",
    tagline: "Quiet loyalty meets infectious emotional warmth",
    partnerOneRole: "The Silent Guardian (Acts of Service, Observant)",
    partnerTwoRole: "The Radiant Sun (Words of Affirmation, Spontaneous Joy)",
    superpower: "Turning high-pressure weeks into a sanctuary of understated teamwork",
    growthEdge: "Articulating unspoken expectations before they turn into silent fatigue",
    harmonyScore: 89,
    unlockedAt: new Date().toISOString(),
    colorGradient: "from-rose-800/30 via-gold-900/40 to-obsidian-950",
    quote: "Where quiet devotion meets boundless emotional sunshine.",
    confidentialChatCount: 8,
  },
  {
    id: "twin-strategists-soulmates",
    archetype: "The Dual Visionaries",
    tagline: "Intellectual banter rooted in deep emotional security",
    partnerOneRole: "The Strategic Architect (Analytical, Thoughtful)",
    partnerTwoRole: "The Intuitive Seer (Perceptive, Empathetic Visionary)",
    superpower: "Solving relationship bottlenecks with radical transparency and deep mutual respect",
    growthEdge: "Remembering to transition from intellectual problem-solving into gentle bodily affection",
    harmonyScore: 95,
    unlockedAt: new Date().toISOString(),
    colorGradient: "from-gold-600/30 via-obsidian-850 to-rose-950",
    quote: "A partnership of sharp minds and unconditionally tender hearts.",
    confidentialChatCount: 22,
  },
];

export const SAMPLE_CHATS = [
  {
    id: "chat-sample-angry-hinglish",
    label: "🔥 Angry Mode: 'Achha Thik Hai / Jaao Doston Ke Paas'",
    language: "hinglish",
    rawText: `Partner: "Tumhe toh bas apne kaam aur doston se matlab hai. 'Achha thik hai, koi baat nahi', main hi hamesha overreact karti hoon na? Jaao unhi ke paas, mujhe akele chhod do."
You: "Yaar office mein kitna pressure tha pata bhi hai? Har chhoti baat ka mudda banana band karo please."`,
    subtext: "'Achha thik hai / Jaao apne doston ke paas' means: 'I feel exhausted and unseen. I am tired of explaining my loneliness, please just pull me close and tell me I am still your priority.'",
  },
  {
    id: "chat-sample-1",
    label: "Hinglish Work Stress Misunderstanding",
    language: "hinglish",
    rawText: `Partner: "Tum hamesha late aate ho aur reply bhi nahi karte. Did you even care ki main 8 PM se wait kar rahi thi? Forget it, do whatever you want."
You: "Main meeting mein tha na! Har baar drama shuru kar deti ho bina samjhe."`,
    subtext: "Partner is not actually angry about the clock; they are experiencing feeling unconsidered, depleted, and disconnected after anticipating quality time all day.",
  },
  {
    id: "chat-sample-2",
    label: "English Passive-Aggressive 'Fine'",
    language: "en",
    rawText: `Partner: "Fine. Whatever. Go with your friends, I'll figure dinner out myself."
You: "Why are you being like this? You literally said it was okay yesterday."`,
    subtext: "The 'Fine' mask is concealing an anxious bid for reassurances. They wanted to feel chosen or prioritized, not dismissed.",
  },
  {
    id: "chat-sample-3",
    label: "Hinglish Silent Treatment ('Baat karne ka koi fayda nahi')",
    language: "hinglish",
    rawText: `Partner: "Mujhe ab koi baat nahi karni. Baat karne ka koi fayda nahi hota waise bhi."
You: "Theek hai, main hi chup ho jata hoon phir."`,
    subtext: "'Baat karne ka koi fayda nahi' means: 'I feel unheard and exhausted from defending my hurt. Please listen with pure warmth instead of giving logical justifications.'",
  },
];
