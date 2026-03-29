"use client";

import { useFavorites, FavoriteStory } from "@/hooks/useFavorites";
import { useState } from "react";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites, removeFavorite, mounted } = useFavorites();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface-hover rounded w-48" />
          <div className="h-4 bg-surface-hover rounded w-72" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          My Favorites
        </h1>
        <p className="text-muted mt-2">
          Your saved stories — ready to read again anytime
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">&#9829;</div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            No favorites yet
          </h2>
          <p className="text-muted mb-6">
            Save stories from the library or generator to find them here
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/stories"
              className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-light transition-colors"
            >
              Browse Stories
            </Link>
            <Link
              href="/generate"
              className="px-6 py-3 bg-surface border border-border text-foreground rounded-full font-medium hover:border-primary/30 transition-colors"
            >
              Generate a Story
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((fav: FavoriteStory) => (
            <div
              key={fav.id}
              className="bg-surface rounded-2xl border border-border overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        {fav.ageGroup}
                      </span>
                      <span className="text-xs text-muted">{fav.theme}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {fav.title}
                    </h3>
                    <p className="text-sm text-muted mt-1">{fav.preview}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === fav.id ? null : fav.id)
                      }
                      className="p-2 rounded-full bg-surface-hover text-foreground/60 hover:text-primary transition-colors"
                      aria-label={expandedId === fav.id ? "Collapse" : "Read story"}
                    >
                      <svg
                        className={`w-5 h-5 transition-transform ${expandedId === fav.id ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => removeFavorite(fav.id)}
                      className="p-2 rounded-full bg-surface-hover text-muted hover:text-red-500 transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {expandedId === fav.id && (
                <div className="px-6 pb-6 border-t border-border pt-4">
                  <div className="story-text text-foreground/90 whitespace-pre-line">
                    {fav.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
