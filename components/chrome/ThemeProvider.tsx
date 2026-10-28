"use client";

import { useServerInsertedHTML } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

export type ThemeChoice = "light" | "dark";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "mp-theme-v3";

/**
 * Runs before first paint. Resolves the stored choice into a concrete
 * `data-theme` on <html> (defaulting to "light"), so the CSS only
 * ever has to reason about one explicit value and there is no flash.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  STORAGE_KEY,
)});var t=s==="dark"?"dark":"light";document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

/* ────────────────────────────────────────────────────────────────
   External store

   The theme lives in localStorage and on the <html> element.
   useSyncExternalStore reads it without a hydration effect, so
   the server render and the first client paint never disagree.
   ──────────────────────────────────────────────────────────────── */

type Snapshot = { choice: ThemeChoice; theme: ResolvedTheme };

const SERVER_SNAPSHOT: Snapshot = { choice: "light", theme: "light" };

let snapshot: Snapshot | null = null;
const listeners = new Set<() => void>();

function readChoice(): ThemeChoice {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "light" || raw === "dark") return raw;
  } catch {
    // storage blocked (private mode, cookie policy) - fall through to default
  }
  return "light";
}

function resolve(choice: ThemeChoice): ResolvedTheme {
  return choice === "dark" ? "dark" : "light";
}

function commit(next: Snapshot) {
  snapshot = next;
  document.documentElement.setAttribute("data-theme", next.theme);
  for (const listener of listeners) listener();
}

function getSnapshot(): Snapshot {
  if (!snapshot) {
    const choice = readChoice();
    snapshot = { choice, theme: resolve(choice) };
  }
  return snapshot;
}

function getServerSnapshot(): Snapshot {
  return SERVER_SNAPSHOT;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  const onStorage = (e: StorageEvent) => {
    if (e.key !== null && e.key !== STORAGE_KEY) return;
    const choice = readChoice();
    commit({ choice, theme: resolve(choice) });
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function setThemeChoice(next: ThemeChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // non-fatal - the choice still applies for this page view
  }
  commit({ choice: next, theme: resolve(next) });
}

/* ────────────────────────────────────────────────────────────────
   React surface
   ──────────────────────────────────────────────────────────────── */

type ThemeContextValue = {
  /** What the visitor picked - may be "system". */
  choice: ThemeChoice;
  /** What is actually on screen right now. */
  theme: ResolvedTheme;
  setChoice: (next: ThemeChoice) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useServerInsertedHTML(() => (
    <script
      key="theme-init"
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />
  ));

  const { choice, theme } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    setThemeChoice(getSnapshot().theme === "dark" ? "light" : "dark");
  }, []);

  const value = useMemo(
    () => ({ choice, theme, setChoice: setThemeChoice, toggle }),
    [choice, theme, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
