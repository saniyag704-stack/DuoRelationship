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
    label: "🔥 Angry Mode: Cancelled Weekend / Friends vs Me",
    mode: "angry_fight" as const,
    language: "hinglish",
    rawText: `Partner: "Tumne phir se weekend plan cancel kar diya na? 'Achha thik hai, koi baat nahi', jaao apne doston ke saath hi party karo. Mera toh waise bhi koi scene nahi hai tumhari life mein."
You: "Yaar unhone bohot pehle plan banaya tha! Tum har baar drama kyu create karti ho?"`,
    subtext: "'Jaao apne doston ke saath' means: 'I felt so discarded when our plans got bumped. I am exhausted of feeling like your second choice behind everyone else.'",
  },
  {
    id: "chat-sample-dry-reply",
    label: "🤔 Overthinking: The 1-Word 'K / Hmm / Thik Hai' Freeze",
    mode: "overthinking_dry" as const,
    language: "hinglish",
    rawText: `You: "Hey baby, kaisa tha din? Main soch raha tha aaj dinner pe kahi bahar chalein saath mein ❤️"
Partner: "k"
You: "Kuch hua hai kya? Sab theek?"
Partner: "haan sab thik hai. mujhe kaam hai abhi."`,
    subtext: "'k / sab thik hai' means: 'Something hurt me earlier and I am silently testing whether you will notice my quiet withdrawal or simply ignore it.'",
  },
  {
    id: "chat-sample-misunderstanding",
    label: "💔 Misunderstanding: Innocent Comment Taken as Criticism",
    mode: "misunderstanding" as const,
    language: "hinglish",
    rawText: `You: "Aise kapde pehen ke jaa rahe ho kya function mein? Thoda simple nahi lag raha?"
Partner: "Matlab tumhe hamesha mere dressing sense mein kami hi dikhti hai na? Theek hai, main jaa hi nahi rahi function mein, tum akele jao."
You: "Arrey main bas normal puch raha tha, itna hyper kyu ho rahi ho?!"`,
    subtext: "A casual query triggered a deep core wound of: 'You are embarrassed of me, and you don't find me attractive or adequate.'",
  },
  {
    id: "chat-sample-chores-load",
    label: "🧹 Friction: Unequal Mental Load & Chores",
    mode: "angry_fight" as const,
    language: "hinglish",
    rawText: `Partner: "Main subah se akele hi poora ghar aur grocery sambhal rahi hoon. Tum bas sofe pe baith ke reels scroll kar rahe ho. Main tumhari maid nahi hoon!"
You: "Main din bhar office mein thak ke aaya hoon! 10 minute aaram bhi nahi kar sakta kya?"`,
    subtext: "'Main tumhari maid nahi hoon' means: 'I am drowning under the invisible mental load. I don't just want physical help; I need to feel like you care about my exhaustion.'",
  },
  {
    id: "chat-sample-jealousy",
    label: "👀 Overthinking: Midnight Online Activity / Insecurity",
    mode: "overthinking_dry" as const,
    language: "hinglish",
    rawText: `Partner: "Tum kal raat 2 AM tak WhatsApp pe online kisse baat kar rahe the? Mujhse toh bola tha 12 baje neend aa rahi hai."
You: "Arrey college ke group mein friends meme bhej rahe the! Ab kya main group chats bhi na dekhu? Tumhara shak badhta hi jaa raha hai."`,
    subtext: "'Online kisse baat kar rahe the' means: 'My anxious attachment was triggered by the mismatch in your words. I am terrified of losing your emotional exclusivity.'",
  },
  {
    id: "chat-sample-vibe-flirt",
    label: "✨ Vibe Check: Soft Mid-Day Connection Check",
    mode: "just_vibe" as const,
    language: "hinglish",
    rawText: `Partner: "Bohot hectic day hai office mein aaj... mann hi nahi lag raha kaam mein bilkul 🥱"
You: "Mera bhi yahi haal hai, bas 6 PM hone ka wait kar raha hoon."
Partner: "Phir shaam ko kya program hai hamara? Ya phir se phone mein lage rahoge?"`,
    subtext: "'Phir se phone mein lage rahoge?' is an affectionate bid for undivided attention and romance after an exhausting workday.",
  },
];
