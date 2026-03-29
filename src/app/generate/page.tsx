"use client";

import { useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";

const themes = [
  "Tawakkul (Trust in Allah)",
  "Sabr (Patience)",
  "Shukr (Gratitude)",
  "Honesty (Sidq)",
  "Kindness & Mercy",
  "Forgiveness",
  "Generosity",
  "Courage & Bravery",
  "Respect for Parents",
  "Love for the Prophet (PBUH)",
  "Brotherhood & Friendship",
  "Story of a Prophet",
];

const ageGroups = [
  { value: "toddler", label: "Toddlers (2-5)", desc: "Simple words, short story" },
  { value: "kids", label: "Kids (5-10)", desc: "Moderate vocabulary, richer detail" },
  { value: "preteen", label: "Preteens (10+)", desc: "Complex themes, longer narrative" },
];

export default function GeneratePage() {
  const [selectedAge, setSelectedAge] = useState("kids");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [childName, setChildName] = useState("");
  const [story, setStory] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addFavorite, isFavorite, removeFavorite, mounted } = useFavorites();

  const storyId = storyTitle
    ? `generated-${storyTitle.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`
    : "";

  const handleGenerate = async () => {
    if (!selectedTheme) {
      setError("Please select a theme for the story.");
      return;
    }
    setError("");
    setLoading(true);
    setStory("");
    setStoryTitle("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ageGroup: selectedAge,
          theme: selectedTheme,
          childName: childName.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate story");
      }

      const data = await res.json();
      setStoryTitle(data.title);
      setStory(data.story);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const favorited = mounted && storyId && isFavorite(storyId);

  const toggleFavorite = () => {
    if (!story || !storyTitle) return;
    if (favorited) {
      removeFavorite(storyId);
    } else {
      addFavorite({
        id: storyId,
        title: storyTitle,
        preview: story.slice(0, 120) + "...",
        content: story,
        ageGroup: selectedAge,
        theme: selectedTheme,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Story Generator
        </h1>
        <p className="text-muted mt-2">
          Create a personalized Islamic bedtime story powered by AI
        </p>
      </div>

      <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-border mb-8">
        {/* Age Group */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Age Group
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ageGroups.map((ag) => (
              <button
                key={ag.value}
                onClick={() => setSelectedAge(ag.value)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedAge === ag.value
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div className="font-medium text-foreground text-sm">
                  {ag.label}
                </div>
                <div className="text-xs text-muted mt-1">{ag.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Story Theme
          </label>
          <div className="flex flex-wrap gap-2">
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTheme(t)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedTheme === t
                    ? "bg-primary text-white"
                    : "bg-surface-hover text-foreground/70 hover:text-primary border border-border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Child's Name */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2">
            Child&apos;s Name{" "}
            <span className="text-muted font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="e.g., Yusuf, Amina"
            className="w-full sm:w-72 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-light transition-colors shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Generating story...
            </span>
          ) : (
            "Generate Story"
          )}
        </button>
      </div>

      {/* Generated Story */}
      {story && (
        <div className="animate-fade-in-up">
          <div className="bg-surface rounded-2xl p-6 sm:p-10 border border-border mb-4">
            <div className="flex items-start justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {storyTitle}
              </h2>
              <button
                onClick={toggleFavorite}
                className={`shrink-0 p-2 rounded-full transition-colors ${
                  favorited
                    ? "bg-accent/10 text-accent"
                    : "bg-surface-hover text-muted hover:text-accent"
                }`}
                aria-label={favorited ? "Remove from favorites" : "Save to favorites"}
              >
                <svg
                  className="w-6 h-6"
                  fill={favorited ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="story-text text-foreground/90 whitespace-pre-line">
              {story}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
