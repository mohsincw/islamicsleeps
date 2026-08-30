"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FavoriteButton from "@/components/FavoriteButton";
import FeedbackWidget from "@/components/FeedbackWidget";
import ShareButton from "@/components/ShareButton";
import StoryReader from "@/components/StoryReader";
import { MoralPanel, WhySection } from "@/components/StorySections";
import { topics, getTopic } from "@/data/topics";
import type { AgeBucket, GeneratedStory, Gender } from "@/data/types";
import { useProfile } from "@/hooks/useProfile";
import { AGE_BUCKETS, ageLabel } from "@/lib/ages";

const genderOptions: { value: Gender; label: string }[] = [
  { value: "boy", label: "Boy" },
  { value: "girl", label: "Girl" },
  { value: "unspecified", label: "Prefer not to say" },
];

interface GeneratorFormProps {
  initialTopicId?: string;
}

type Result = GeneratedStory & { id: string };

export default function GeneratorForm({ initialTopicId }: GeneratorFormProps) {
  const { profile, saveProfile, mounted } = useProfile();

  const [name, setName] = useState("");
  const [ageBucket, setAgeBucket] = useState<AgeBucket>("5-8");
  const [gender, setGender] = useState<Gender>("unspecified");
  const [topicId, setTopicId] = useState<string | null>(
    initialTopicId && getTopic(initialTopicId) ? initialTopicId : null
  );
  const [customTheme, setCustomTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notConfigured, setNotConfigured] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  // Pre-fill from the saved child profile once, after hydration.
  const prefilled = useRef(false);
  useEffect(() => {
    if (!mounted || prefilled.current || !profile) return;
    prefilled.current = true;
    setName(profile.name);
    setAgeBucket(profile.ageBucket);
    setGender(profile.gender);
  }, [mounted, profile]);

  const selectedTopic = topicId ? getTopic(topicId) : undefined;
  const themeLabel = selectedTopic?.concept ?? customTheme.trim();
  const canSubmit = !loading && (!!selectedTopic || customTheme.trim().length > 0);

  async function generate() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    saveProfile({ name: name.trim(), ageBucket, gender });
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: topicId ?? undefined,
          theme: topicId ? undefined : customTheme.trim(),
          ageBucket,
          gender,
          childName: name.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.title) {
        if (data?.code === "not_configured") setNotConfigured(true);
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      // The id is minted exactly once per generated story, so the favorite
      // heart stays stable across re-renders.
      setResult({ ...(data as GeneratedStory), id: crypto.randomUUID() });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Who's this story for? */}
      <div className="bg-surface rounded-2xl p-6 border border-border mb-6">
        <h2 className="font-semibold text-foreground mb-4">
          Who&apos;s this story for?
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="child-name" className="block text-sm text-muted mb-2">
              Child&apos;s name <span className="text-muted/60">(optional — the hero of the story!)</span>
            </label>
            <input
              id="child-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              placeholder="e.g. Yusuf or Amina"
              className="w-full sm:w-80 bg-background border border-border rounded-full px-4 py-2.5 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary/40"
            />
          </div>
          <div>
            <p className="text-sm text-muted mb-2">Age</p>
            <div className="flex flex-wrap gap-2">
              {AGE_BUCKETS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setAgeBucket(b.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    ageBucket === b.id
                      ? "bg-primary text-white"
                      : "bg-background border border-border text-foreground hover:border-primary/30"
                  }`}
                >
                  {b.label}
                  <span className="hidden sm:inline text-xs opacity-70"> · {b.description}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted mb-2">Gender</p>
            <div className="flex flex-wrap gap-2">
              {genderOptions.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGender(g.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    gender === g.value
                      ? "bg-primary text-white"
                      : "bg-background border border-border text-foreground hover:border-primary/30"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Topic */}
      <div className="bg-surface rounded-2xl p-6 border border-border mb-6">
        <h2 className="font-semibold text-foreground mb-1">
          What&apos;s tonight&apos;s story about?
        </h2>
        <p className="text-sm text-muted mb-4">
          Pick one of the big WHY questions, or write your own topic.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTopicId(topicId === t.id ? null : t.id);
                setCustomTheme("");
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                topicId === t.id
                  ? "bg-primary text-white"
                  : "bg-background border border-border text-foreground hover:border-primary/30"
              }`}
            >
              {t.emoji} {t.question}
            </button>
          ))}
        </div>
        <input
          value={customTheme}
          onChange={(e) => {
            setCustomTheme(e.target.value);
            if (e.target.value) setTopicId(null);
          }}
          maxLength={80}
          placeholder="…or your own topic, e.g. 'starting a new school'"
          className="w-full bg-background border border-border rounded-full px-4 py-2.5 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary/40"
        />
      </div>

      {/* Generate */}
      <button
        onClick={generate}
        disabled={!canSubmit}
        className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-light transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Weaving your story…" : "✨ Generate Story"}
      </button>

      {loading && (
        <div className="mt-8 text-center py-10 bg-surface rounded-2xl border border-border islamic-pattern">
          <div className="text-4xl mb-4 animate-float">&#9790;</div>
          <p className="text-muted animate-pulse">
            Weaving your story under the stars&hellip;
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="mt-6 bg-accent/10 border border-accent/30 rounded-2xl p-5 text-foreground/80">
          <p>{error}</p>
          {notConfigured && (
            <p className="mt-2 text-sm">
              <Link href="/stories" className="text-primary font-semibold">
                Browse the story library instead →
              </Link>
            </p>
          )}
        </div>
      )}

      {result && !loading && (
        <div className="mt-10 animate-fade-in-up">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                {ageLabel(ageBucket)}
              </span>
              {themeLabel && <span className="text-xs text-muted">{themeLabel}</span>}
            </div>
            <h2 className="text-3xl font-bold text-foreground">{result.title}</h2>
          </div>

          <div className="bg-surface rounded-2xl p-6 sm:p-10 border border-border mb-6">
            <StoryReader text={result.story} />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <FavoriteButton
              story={{
                id: result.id,
                title: result.title,
                preview: result.story.slice(0, 140).trimEnd() + "…",
                content: result.story,
                ageGroup: ageBucket,
                theme: themeLabel || "A special story",
                moral: result.moral,
                whatItMeans: result.whatItMeans,
              }}
            />
            <ShareButton
              story={result}
              ageBucket={ageBucket}
              topic={themeLabel || undefined}
              childName={name.trim() || undefined}
            />
          </div>

          <div className="space-y-6">
            <MoralPanel moral={result.moral} />
            <WhySection whatItMeans={result.whatItMeans} />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <FeedbackWidget storyRef={`generated:${result.id}`} />
            <button
              onClick={() => {
                setResult(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-sm text-primary font-semibold hover:text-primary-light transition-colors cursor-pointer"
            >
              ✨ Generate another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
