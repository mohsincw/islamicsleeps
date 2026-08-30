"use client";

import { FavoriteStory, useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  story: Omit<FavoriteStory, "savedAt">;
  className?: string;
}

export default function FavoriteButton({ story, className }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite, mounted } = useFavorites();
  const saved = mounted && isFavorite(story.id);

  return (
    <button
      onClick={() => (saved ? removeFavorite(story.id) : addFavorite(story))}
      aria-label={saved ? "Remove from favorites" : "Save to favorites"}
      aria-pressed={saved}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
        saved
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-border text-muted hover:text-primary hover:border-primary/30"
      } ${className ?? ""}`}
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{saved ? "Saved" : "Save story"}</span>
    </button>
  );
}
