"use client";

import { useState, useEffect, useCallback } from "react";

export interface FavoriteStory {
  id: string;
  title: string;
  preview: string;
  content: string;
  ageGroup: string;
  theme: string;
  savedAt: number;
}

const STORAGE_KEY = "islamicsleeps-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteStory[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  const save = useCallback((favs: FavoriteStory[]) => {
    setFavorites(favs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  }, []);

  const addFavorite = useCallback(
    (story: Omit<FavoriteStory, "savedAt">) => {
      const updated = [...favorites, { ...story, savedAt: Date.now() }];
      save(updated);
    },
    [favorites, save]
  );

  const removeFavorite = useCallback(
    (id: string) => {
      save(favorites.filter((f) => f.id !== id));
    },
    [favorites, save]
  );

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite, mounted };
}
