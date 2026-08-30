import { useSyncExternalStore } from "react";

/**
 * A tiny localStorage-backed external store for useSyncExternalStore.
 * All consumers of the same store stay in sync (including across tabs),
 * and the server snapshot is always the fallback, so SSR/hydration is safe.
 */
export interface LocalStore<T> {
  subscribe(listener: () => void): () => void;
  getSnapshot(): T;
  getServerSnapshot(): T;
  set(next: T | ((prev: T) => T)): void;
}

export function createLocalStore<T>(
  key: string,
  fallback: T,
  parse?: (raw: unknown) => T
): LocalStore<T> {
  let cached: T = fallback;
  // The raw string last seen in localStorage; snapshot identity stays stable
  // between renders unless the underlying value actually changed.
  let lastRaw: string | null | undefined;
  const listeners = new Set<() => void>();
  let watchingStorage = false;

  const notify = () => listeners.forEach((l) => l());

  function read(): T {
    if (typeof window === "undefined") return fallback;
    let raw: string | null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      return cached;
    }
    if (raw === lastRaw) return cached;
    lastRaw = raw;
    if (raw === null) {
      cached = fallback;
      return cached;
    }
    try {
      const value = JSON.parse(raw) as unknown;
      cached = parse ? parse(value) : (value as T);
    } catch {
      cached = fallback;
    }
    return cached;
  }

  return {
    subscribe(listener) {
      listeners.add(listener);
      if (!watchingStorage && typeof window !== "undefined") {
        watchingStorage = true;
        window.addEventListener("storage", (e) => {
          if (e.key === key || e.key === null) notify();
        });
      }
      return () => listeners.delete(listener);
    },
    getSnapshot: read,
    getServerSnapshot: () => fallback,
    set(next) {
      const value =
        typeof next === "function" ? (next as (prev: T) => T)(read()) : next;
      cached = value;
      try {
        const raw = JSON.stringify(value);
        lastRaw = raw;
        window.localStorage.setItem(key, raw);
      } catch {
        // Private browsing / quota — keep the in-memory value.
        lastRaw = undefined;
      }
      notify();
    },
  };
}

export function useLocalStore<T>(store: LocalStore<T>): T {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );
}

const noopSubscribe = () => () => {};

/** True after hydration — replaces ad-hoc "mounted" flags without effects. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}
