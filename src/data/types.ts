export type AgeBucket = "2-4" | "5-8" | "9-12";

export type Gender = "boy" | "girl" | "unspecified";

export interface Topic {
  id: string;
  /** The question the way a child asks it, e.g. "Why should I pray namaaz?" */
  question: string;
  /** The Islamic concept, e.g. "Salah (Prayer)" */
  concept: string;
  emoji: string;
  /** A warm, kid-friendly answer to the question — the topic's "why". */
  answer: string;
}

/** The "But WHY?" section — kids don't just want the lesson, they want what it means for THEM. */
export interface WhatItMeans {
  /** What the concept actually is, in words a child understands. */
  meaning: string;
  /** Why Allah asks this of us. */
  whyItMatters: string;
  /** What it looks like in the child's own life this week. */
  inYourLife: string;
}

export interface QuranOrHadith {
  arabic?: string;
  text: string;
  source: string;
}

export interface Story {
  id: string;
  title: string;
  topicId: string;
  ageGroups: AgeBucket[];
  /** Human-readable theme label, e.g. "Sabr (Patience)" */
  theme: string;
  preview: string;
  content: string;
  moral: string;
  whatItMeans: WhatItMeans;
  quranOrHadith?: QuranOrHadith;
  /** 2–3 questions a parent can ask at bedtime. */
  talkAboutIt: string[];
}

/** Shape returned by /api/generate and stored in Supabase shared_stories. */
export interface GeneratedStory {
  title: string;
  story: string;
  moral: string;
  whatItMeans: WhatItMeans;
}

export interface ChildProfile {
  name: string;
  ageBucket: AgeBucket;
  gender: Gender;
}
