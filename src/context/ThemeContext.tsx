"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "islamicsleeps-theme";

// A tiny external store. The class on <html> is set before first paint by the
// inline script in layout.tsx; this store keeps React state in sync with it.
const listeners = new Set<() => void>();
let cached: Theme | null = null;

function getSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  if (cached) return cached;
  let saved: string | null = null;
  try {
    saved = window.localStorage.getItem(STORAGE_KEY);
  } catch {}
  cached =
    saved === "dark" || saved === "light"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  return cached;
}

function setThemeValue(theme: Theme) {
  cached = theme;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
  document.documentElement.classList.toggle("dark", theme === "dark");
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "light" as Theme);

  const toggleTheme = useCallback(() => {
    setThemeValue(getSnapshot() === "dark" ? "light" : "dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
