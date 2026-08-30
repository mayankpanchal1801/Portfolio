"use client";

import { useTheme } from "@/components/chrome/ThemeProvider";

/**
 * Two-state light/dark switch. The theme comes from an external store
 * read through useSyncExternalStore, so the server snapshot ("light")
 * hydrates cleanly and React swaps in the real value on its own.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className={`group relative inline-flex h-8 w-[62px] items-center rounded-full border border-rule-strong bg-paper-2 px-1 transition-colors hover:border-ink ${className ?? ""}`}
    >
      {/* The inactive icon stays on the track; the knob carries the active
          one, so the switch reads as a state, not a decoration. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 text-ink-3"
      >
        <span className={isDark ? "opacity-100" : "opacity-0"}>
          <SunIcon />
        </span>
        <span className={isDark ? "opacity-0" : "opacity-100"}>
          <MoonIcon />
        </span>
      </span>

      <span
        aria-hidden
        className="relative flex h-6 w-6 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: isDark ? "translateX(30px)" : "translateX(0)" }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4.5" />
      <path
        strokeLinecap="round"
        d="M12 1.5v2M12 20.5v2M22.5 12h-2M3.5 12h-2M19.4 4.6l-1.4 1.4M6 18l-1.4 1.4M19.4 19.4L18 18M6 6L4.6 4.6"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.5 14.8A9 9 0 1 1 9.2 3.5a7.2 7.2 0 0 0 11.3 11.3Z"
      />
    </svg>
  );
}
