"use client";

import { useCallback } from "react";
import type { AgeBucket, ChildProfile, Gender } from "@/data/types";
import { isAgeBucket } from "@/lib/ages";
import { createLocalStore, useHydrated, useLocalStore } from "@/lib/localStore";

const GENDERS: Gender[] = ["boy", "girl", "unspecified"];

const profileStore = createLocalStore<ChildProfile | null>(
  "islamicsleeps-profile",
  null,
  (raw) => {
    if (!raw || typeof raw !== "object") return null;
    const p = raw as Partial<ChildProfile>;
    return {
      name: typeof p.name === "string" ? p.name.slice(0, 40) : "",
      ageBucket: isAgeBucket(p.ageBucket ?? "") ? (p.ageBucket as AgeBucket) : "5-8",
      gender: GENDERS.includes(p.gender as Gender) ? (p.gender as Gender) : "unspecified",
    };
  }
);

export function useProfile() {
  const profile = useLocalStore(profileStore);
  const mounted = useHydrated();

  const saveProfile = useCallback((next: ChildProfile) => {
    profileStore.set(next);
  }, []);

  const clearProfile = useCallback(() => {
    profileStore.set(null);
  }, []);

  return { profile, saveProfile, clearProfile, mounted };
}
