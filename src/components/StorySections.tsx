import type { QuranOrHadith, WhatItMeans } from "@/data/types";

/**
 * The panels that follow a story: moral, the "But WHY?" section, an optional
 * ayah/hadith, and parent discussion questions. Shared by library stories,
 * generated stories, and shared story pages.
 */

export function MoralPanel({ moral }: { moral: string }) {
  return (
    <div className="bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/10">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">✨</span>
        <h2 className="font-semibold text-primary">Lesson & Moral</h2>
      </div>
      <p className="text-foreground/80 leading-relaxed">{moral}</p>
    </div>
  );
}

export function WhySection({ whatItMeans }: { whatItMeans: WhatItMeans }) {
  const blocks = [
    { emoji: "💭", label: "What does it mean?", text: whatItMeans.meaning },
    { emoji: "🌙", label: "Why does it matter?", text: whatItMeans.whyItMatters },
    { emoji: "✨", label: "In your life", text: whatItMeans.inYourLife },
  ];
  return (
    <div className="bg-accent/5 rounded-2xl p-6 sm:p-8 border border-accent/20">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">🤔</span>
        <h2 className="font-bold text-lg text-foreground">But WHY?</h2>
      </div>
      <p className="text-sm text-muted mb-5">
        Because every little heart deserves a real answer.
      </p>
      <div className="space-y-5">
        {blocks.map((b) => (
          <div key={b.label}>
            <h3 className="flex items-center gap-2 font-semibold text-foreground mb-1">
              <span aria-hidden>{b.emoji}</span>
              {b.label}
            </h3>
            <p className="text-foreground/80 leading-relaxed">{b.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QuranHadithCard({ source }: { source: QuranOrHadith }) {
  return (
    <div className="bg-secondary/5 rounded-2xl p-6 sm:p-8 border border-secondary/20">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📖</span>
        <h2 className="font-semibold text-secondary">From the Quran & Sunnah</h2>
      </div>
      {source.arabic && (
        <p className="arabic-text text-2xl leading-loose text-foreground text-right mb-4">
          {source.arabic}
        </p>
      )}
      <p className="text-foreground/80 leading-relaxed italic">
        &ldquo;{source.text}&rdquo;
      </p>
      <p className="text-sm text-muted mt-3">{source.source}</p>
    </div>
  );
}

export function TalkAboutIt({ questions }: { questions: string[] }) {
  if (questions.length === 0) return null;
  return (
    <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-border">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">💜</span>
        <h2 className="font-semibold text-foreground">Talk about it tonight</h2>
      </div>
      <p className="text-sm text-muted mb-4">
        Snuggle up and wonder together — there are no wrong answers.
      </p>
      <ul className="space-y-3">
        {questions.map((q, i) => (
          <li key={i} className="flex gap-3 text-foreground/80 leading-relaxed">
            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function StorySections({
  moral,
  whatItMeans,
  quranOrHadith,
  talkAboutIt,
}: {
  moral: string;
  whatItMeans?: WhatItMeans;
  quranOrHadith?: QuranOrHadith;
  talkAboutIt?: string[];
}) {
  return (
    <div className="space-y-6">
      <MoralPanel moral={moral} />
      {whatItMeans && <WhySection whatItMeans={whatItMeans} />}
      {quranOrHadith && <QuranHadithCard source={quranOrHadith} />}
      {talkAboutIt && talkAboutIt.length > 0 && (
        <TalkAboutIt questions={talkAboutIt} />
      )}
    </div>
  );
}
