"use client";

import ThemeToggle from "@/components/chrome/ThemeToggle";
import { navLinksArr } from "@/constants/links";
import { contact, site, socials } from "@/constants/personal";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = navLinksArr.map((l, i) => ({ ...l, num: String(i + 1).padStart(2, "0") }));

function isActive(pathname: string, url: string) {
  if (url === "/") return pathname === "/";
  return pathname === url || pathname.startsWith(`${url}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the panel whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock the page behind the mobile panel and wire up Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-[900] border-b border-rule bg-paper/90 backdrop-blur-md transition-colors">
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-4 sm:gap-6">
        {/* Wordmark */}
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          onClick={() => setOpen(false)}
          className="group flex items-baseline gap-2 sm:gap-3 shrink-0"
        >
          <span className="font-display text-[1.05rem] sm:text-[1.125rem] font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-accent-ink">
            {site.name}
          </span>
          <span aria-hidden className="hidden h-3 w-px bg-rule-strong sm:block" />
          <span className="tag hidden sm:block text-[0.65rem]">{site.role}</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => {
              const active = isActive(pathname, item.url);
              return (
                <li key={item.url}>
                  <Link
                    href={item.url}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "group inline-flex items-baseline gap-1.5 font-mono text-tag uppercase transition-colors",
                      active ? "text-ink" : "text-ink-3 hover:text-ink",
                    )}
                  >
                    <span className={clsx(active ? "text-accent-ink font-semibold" : "text-ink-3/70")}>
                      {item.num}
                    </span>
                    <span className="relative pb-1">
                      {item.name}
                      <span
                        aria-hidden
                        className={clsx(
                          "absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <Link href="/contact" className="btn btn-solid hidden py-2.5 md:inline-flex">
            Get in touch
          </Link>

          {/* Mobile hamburger button - 44px touch target */}
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-11 w-11 items-center justify-center rounded-sm text-ink hover:bg-paper-2 md:hidden"
          >
            <span className="relative flex h-4 w-5 flex-col justify-between">
              <span
                aria-hidden
                className={clsx(
                  "block h-0.5 w-5 bg-ink transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open ? "translate-y-[7px] rotate-45" : "translate-y-0",
                )}
              />
              <span
                aria-hidden
                className={clsx(
                  "block h-0.5 w-5 bg-ink transition-opacity duration-200",
                  open ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                aria-hidden
                className={clsx(
                  "block h-0.5 w-5 bg-ink transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open ? "-translate-y-[7px] -rotate-45" : "translate-y-0",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className={clsx(
          "fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[899] overflow-y-auto border-t border-rule bg-paper md:hidden transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="shell flex min-h-[calc(100dvh-var(--header-h))] flex-col justify-between py-8">
          <nav aria-label="Mobile Navigation">
            <p className="tag tag--accent mb-2">Menu</p>
            <ul>
              {NAV.map((item) => {
                const active = isActive(pathname, item.url);
                return (
                  <li key={item.url} className="border-b border-rule">
                    <Link
                      href={item.url}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline justify-between py-4.5 group"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className={clsx("marginal", active ? "text-accent-ink font-bold" : "text-ink-3")}>
                          {item.num}
                        </span>
                        <span
                          className={clsx(
                            "font-display text-[clamp(1.75rem,5vw,2.5rem)] font-medium leading-tight transition-colors",
                            active ? "text-accent-ink" : "text-ink group-hover:text-accent-ink",
                          )}
                        >
                          {item.name}
                        </span>
                      </div>
                      {active && (
                        <span className="font-mono text-xs text-accent-ink font-semibold uppercase tracking-wider">
                          Current
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn btn-solid w-full justify-center py-3 text-center text-sm"
              >
                Get in touch ↗
              </Link>
            </div>
          </nav>

          <div className="border-t border-rule pt-6 mt-8 space-y-6">
            <div>
              <p className="tag tag--accent">Direct Contact</p>
              <a
                href={`mailto:${contact.email}`}
                className="uline mt-2.5 block font-display text-lg text-ink break-all"
              >
                {contact.email}
              </a>
              {contact.phone && (
                <a href={contact.phoneHref} className="mt-1 block font-mono text-sm text-ink-2">
                  {contact.phone}
                </a>
              )}
            </div>

            <div className="border-t border-rule/60 pt-4">
              <p className="tag text-ink-3">Elsewhere</p>
              <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-ink-2 hover:text-accent-ink transition-colors"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
