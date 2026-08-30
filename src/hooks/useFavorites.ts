"use client";

import { useCallback } from "react";
import type { WhatItMeans } from "@/data/types";
import { createLocalStore, useHydrated, useLocalStore } from "@/lib/localStore";

export interface FavoriteStory {
  id: string;
  title: string;
  preview: string;
  content: string;
  /** Display value; legacy entries may hold "toddler"/"kids"/"all" — ageLabel() tolerates both. */
  ageGroup: string;
  theme: string;
  savedAt: number;
  moral?: string;
  whatItMeans?: WhatItMeans;
}

const favoritesStore = createLocalStore<FavoriteStory[]>(
  "islamicsleeps-favorites",
  [],
  (raw) =>
    Array.isArray(raw)
      ? raw.filter(
          (f): f is FavoriteStory =>
            !!f && typeof f === "object" && "id" in f && "title" in f
        )
      : []
);

export function useFavorites() {
  const favorites = useLocalStore(favoritesStore);
  const mounted = useHydrated();

  const addFavorite = useCallback((story: Omit<FavoriteStory, "savedAt">) => {
    favoritesStore.set((prev) =>
      prev.some((f) => f.id === story.id)
        ? prev
        : [...prev, { ...story, savedAt: Date.now() }]
    );
  }, []);

  const removeFavorite = useCallback((id: string) => {
    favoritesStore.set((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite, mounted };
}
