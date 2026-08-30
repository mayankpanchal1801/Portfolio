"use client";

import ThemeToggle from "@/components/chrome/ThemeToggle";
import { navLinksArr } from "@/constants/links";
import { contact, site } from "@/constants/personal";
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
    <header className="sticky top-0 z-[900] border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
        {/* Wordmark */}
        <Link href="/" aria-label={`${site.name} — home`} className="group flex items-baseline gap-3">
          <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">
            {site.name}
          </span>
          <span aria-hidden className="hidden h-3 w-px bg-rule-strong sm:block" />
          <span className="tag hidden sm:block">{site.role}</span>
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
                    <span className={clsx(active ? "text-accent-ink" : "text-ink-3/70")}>
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

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link href="/contact" className="btn btn-solid hidden py-2.5 md:inline-flex">
            Get in touch
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              aria-hidden
              className="h-px w-5 origin-center bg-ink transition-transform duration-300"
              style={{ transform: open ? "translateY(3px) rotate(45deg)" : "none" }}
            />
            <span
              aria-hidden
              className="h-px w-5 origin-center bg-ink transition-transform duration-300"
              style={{ transform: open ? "translateY(-3px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[899] border-t border-rule bg-paper md:hidden"
      >
        <div className="shell flex h-full flex-col justify-between py-10">
          <nav aria-label="Mobile">
            <ul>
              {NAV.map((item) => {
                const active = isActive(pathname, item.url);
                return (
                  <li key={item.url} className="border-b border-rule">
                    <Link
                      href={item.url}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline gap-5 py-5"
                    >
                      <span className="marginal">{item.num}</span>
                      <span
                        className={clsx(
                          "font-display text-d2",
                          active ? "text-accent-ink" : "text-ink",
                        )}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-rule pt-6">
            <p className="tag tag--accent">Direct</p>
            <a
              href={`mailto:${contact.email}`}
              className="uline mt-3 block font-display text-lg text-ink"
            >
              {contact.email}
            </a>
            <a href={contact.phoneHref} className="mt-1 block font-mono text-sm text-ink-2">
              {contact.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
