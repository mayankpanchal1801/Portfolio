"use client";

import { PALETTE_EVENT } from "@/components/chrome/CommandPalette";
import ThemeToggle from "@/components/chrome/ThemeToggle";
import { navLinksArr } from "@/constants/links";
import { contact, site } from "@/constants/personal";
import { gsap } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/split-text";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function isActive(pathname: string, url: string) {
  return url === "/" ? pathname === "/" : pathname.startsWith(url);
}

/**
 * Floating pill navigation. Slides away on scroll-down and returns on
 * scroll-up; the mobile menu is a full-screen sheet with staggered links.
 */
export default function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Hide on scroll down / reveal on scroll up.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || prefersReducedMotion()) return;
    let last = window.scrollY;
    let hidden = false;

    const onScroll = () => {
      const y = window.scrollY;
      const shouldHide = y > last && y > 160;
      if (Math.abs(y - last) > 6 && shouldHide !== hidden) {
        hidden = shouldHide;
        gsap.to(bar, { yPercent: hidden ? -160 : 0, duration: 0.5, ease: "power3.out" });
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet on navigation, lock scroll while it is open.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    if (!menu || prefersReducedMotion()) return;
    const sheet = sheetRef.current;
    if (!sheet) return;
    gsap.fromTo(
      sheet.querySelectorAll("[data-item]"),
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.07, ease: "expo.out", delay: 0.1 },
    );
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <>
      <header ref={barRef} className="fixed inset-x-0 top-0 z-[900] flex justify-center px-4 pt-4">
        <nav
          aria-label="Primary"
          className="flex w-full max-w-[1100px] items-center justify-between gap-3 rounded-full border border-rule bg-paper/70 py-2 pl-5 pr-2 shadow-[0_8px_40px_-12px_rgba(18,20,29,0.2)] backdrop-blur-xl"
        >
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} - home`}>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent font-display text-[0.8rem] font-normal text-on-accent">
              M
            </span>
            <span className="hidden font-display text-[1.3rem] font-normal sm:block">
              {site.name}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinksArr.map((l) => {
              const active = isActive(pathname, l.url);
              return (
                <li key={l.url}>
                  <Link
                    href={l.url}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "block rounded-full px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] transition-colors",
                      active
                        ? "bg-paper-3 text-ink"
                        : "text-ink-3 hover:text-ink",
                    )}
                  >
                    {l.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))}
              className="hidden cursor-pointer items-center gap-2 rounded-full border border-rule-strong px-3 py-2 font-mono text-[0.68rem] text-ink-3 transition-colors hover:border-accent hover:text-ink lg:flex"
              aria-label="Open command palette"
            >
              Search <kbd className="rounded bg-paper-3 px-1.5 py-0.5">⌘K</kbd>
            </button>
            <ThemeToggle />
            <a
              href={`mailto:${contact.email}`}
              className="btn btn-solid hidden !px-4 !py-2.5 sm:inline-flex"
            >
              Hire me
            </a>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-rule-strong md:hidden"
            >
              <span className="relative block h-2.5 w-4">
                <span
                  className={clsx(
                    "absolute left-0 h-px w-4 bg-ink transition-all duration-300",
                    menu ? "top-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={clsx(
                    "absolute left-0 h-px w-4 bg-ink transition-all duration-300",
                    menu ? "top-1/2 -rotate-45" : "bottom-0",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={sheetRef}
        className={clsx(
          "fixed inset-0 z-[850] flex flex-col justify-between bg-paper px-[var(--gutter)] pb-10 pt-28 transition-[clip-path] duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] md:hidden",
          menu ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
        aria-hidden={!menu}
        inert={!menu}
      >
        <ul>
          {navLinksArr.map((l, i) => (
            <li key={l.url} className="overflow-hidden border-b border-rule">
              <Link
                data-item
                href={l.url}
                className="flex items-baseline justify-between py-5 font-display text-[clamp(2.75rem,14vw,5rem)] font-normal leading-none tracking-[-0.03em]"
              >
                {l.name}
                <span className="tag">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div data-item>
          <p className="tag">Say hello</p>
          <a href={`mailto:${contact.email}`} className="mt-3 block font-display text-xl break-all text-accent">
            {contact.email}
          </a>
        </div>
      </div>
    </>
  );
}
