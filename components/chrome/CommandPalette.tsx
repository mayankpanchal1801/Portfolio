"use client";

import { useTheme } from "@/components/chrome/ThemeProvider";
import { navLinksArr } from "@/constants/links";
import { contact, socials } from "@/constants/personal";
import { projectsArr } from "@/constants/projects";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const PALETTE_EVENT = "palette:open";

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

/**
 * ⌘K / Ctrl+K launcher: jump to any page or project, open a profile,
 * copy the email, flip the theme. Opened from anywhere by dispatching
 * `PALETTE_EVENT` on window.
 */
export default function CommandPalette() {
  const router = useRouter();
  const { toggle, theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    const ext = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");

    return [
      ...navLinksArr.map((l) => ({
        id: `nav-${l.url}`,
        group: "Navigate",
        label: l.name,
        hint: l.url,
        run: go(l.url),
      })),
      ...projectsArr
        .filter((p) => !p.placeholder)
        .map((p) => ({
          id: `project-${p.slug}`,
          group: "Projects",
          label: p.title,
          hint: p.category,
          run: go(`/projects/${p.slug}`),
        })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: contact.email,
        run: () => {
          navigator.clipboard?.writeText(contact.email).catch(() => {});
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        },
      },
      {
        id: "resume",
        group: "Actions",
        label: "Open résumé (PDF)",
        hint: "/resume.pdf",
        run: ext("/resume.pdf"),
      },
      {
        id: "theme",
        group: "Actions",
        label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        run: toggle,
      },
      ...socials.map((s) => ({
        id: `social-${s.label}`,
        group: "Elsewhere",
        label: s.label,
        hint: s.handle,
        run: s.label === "Email" ? () => (window.location.href = s.url) : ext(s.url),
      })),
    ];
  }, [router, theme, toggle]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const choose = (item: Item | undefined) => {
    if (!item) return;
    item.run();
    if (item.id !== "copy-email") close();
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[active]);
    }
  };

  if (!open) return null;

  let lastGroup = "";

  return (
    <div
      className="fixed inset-0 z-[1500] flex items-start justify-center bg-ink/40 px-4 pt-[14vh] backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-rule-strong bg-paper-2 shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-rule px-5">
          <span aria-hidden className="font-mono text-accent">
            ›
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Jump to a page, project or action…"
            aria-label="Search commands"
            className="w-full bg-transparent py-4 text-base text-ink outline-none placeholder:text-ink-3"
          />
          <kbd className="tag rounded border border-rule-strong px-1.5 py-1">esc</kbd>
        </div>

        <ul ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-ink-3">No match for “{query}”.</li>
          )}
          {results.map((item, i) => {
            const header = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <li key={item.id}>
                {header && <p className="tag px-3 pb-1.5 pt-3">{item.group}</p>}
                <button
                  type="button"
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => choose(item)}
                  className={clsx(
                    "flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    i === active ? "bg-paper-3 text-ink" : "text-ink-2",
                  )}
                >
                  <span className="flex items-center gap-2">
                    {i === active && <span aria-hidden className="text-accent">↳</span>}
                    {item.id === "copy-email" && copied ? "Copied ✓" : item.label}
                  </span>
                  {item.hint && (
                    <span className="truncate font-mono text-[0.68rem] text-ink-3">{item.hint}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-rule px-5 py-2.5">
          <span className="tag">↑↓ navigate</span>
          <span className="tag">↵ select</span>
        </div>
      </div>
    </div>
  );
}
