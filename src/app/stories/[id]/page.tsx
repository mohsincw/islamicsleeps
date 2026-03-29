"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { stories } from "@/data/stories";
import { useFavorites } from "@/hooks/useFavorites";

export default function StoryPage() {
  const params = useParams();
  const story = stories.find((s) => s.id === params.id);
  const { addFavorite, removeFavorite, isFavorite, mounted } = useFavorites();

  if (!story) {
    notFound();
  }

  const favorited = mounted && isFavorite(story.id);

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(story.id);
    } else {
      addFavorite({
        id: story.id,
        title: story.title,
        preview: story.preview,
        content: story.content,
        ageGroup: story.ageGroup,
        theme: story.theme,
      });
    }
  };

  const ageLabel =
    story.ageGroup === "toddler"
      ? "Ages 2-5"
      : story.ageGroup === "kids"
        ? "Ages 5-10"
        : "All Ages";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/stories"
        className="inline-flex items-center text-muted hover:text-primary transition-colors mb-8"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to stories
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
            {ageLabel}
          </span>
          <span className="text-xs text-muted">{story.theme}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {story.title}
          </h1>
          <button
            onClick={toggleFavorite}
            className={`shrink-0 p-2 rounded-full transition-colors ${
              favorited
                ? "bg-accent/10 text-accent"
                : "bg-surface-hover text-muted hover:text-accent"
            }`}
            aria-label={favorited ? "Remove from favorites" : "Save to favorites"}
          >
            <svg className="w-6 h-6" fill={favorited ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Story content */}
      <div className="bg-surface rounded-2xl p-6 sm:p-10 border border-border mb-8">
        <div className="story-text text-foreground/90 whitespace-pre-line">
          {story.content}
        </div>
      </div>

      {/* Moral */}
      <div className="bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">&#10024;</span>
          <h2 className="font-semibold text-primary">Lesson & Moral</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed">{story.moral}</p>
      </div>
    </div>
  );
}
