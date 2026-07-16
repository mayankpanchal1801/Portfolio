"use client";

import { navLinksArr } from "@/constants/links";
import { contact, site } from "@/constants/personal";
import { gsap } from "@/lib/gsap-config";
import { getLenis } from "@/lib/lenis";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV = navLinksArr.map((l, i) => ({ ...l, num: String(i + 1).padStart(2, "0") }));

function isActive(pathname: string, url: string) {
  if (url === "/") return pathname === "/";
  return pathname === url || pathname.startsWith(url + "/");
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayTl = useRef<gsap.core.Timeline | null>(null);
  const navItemRefs = useRef<HTMLLIElement[]>([]);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const b1 = useRef<HTMLSpanElement>(null);
  const b2 = useRef<HTMLSpanElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  // ── header slide-in on mount ───────────────────────────────
  useGSAP(() => {
    if (!headerRef.current) return;
    gsap.from(headerRef.current, { y: -60, opacity: 0, duration: 0.9, ease: "expo.out", delay: 2.4 });
  }, []);

  // ── scrolled state ─────────────────────────────────────────
  useEffect(() => {
    const read = () => {
      const lenis = getLenis();
      return lenis ? lenis.scroll : typeof window !== "undefined" ? window.scrollY : 0;
    };
    const update = () => setScrolled(read() > 40);
    update();
    const lenis = getLenis();
    if (lenis) return lenis.on("scroll", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // ── clock (Bengaluru IST) ──────────────────────────────────
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: contact.timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => {
      if (clockRef.current) clockRef.current.textContent = fmt.format(new Date());
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // ── overlay timeline ───────────────────────────────────────
  useEffect(() => {
    const overlay = overlayRef.current;
    const items = navItemRefs.current.filter(Boolean);
    if (!overlay || items.length === 0) return;
    gsap.set(overlay, { yPercent: -100 });
    gsap.set(items, { yPercent: 120, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(overlay, { yPercent: 0, duration: 0.75, ease: "expo.inOut" }).to(
      items,
      { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "expo.out" },
      "-=0.35",
    );
    overlayTl.current = tl;
    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const tl = overlayTl.current;
    if (!tl) return;
    if (menuOpen) tl.play();
    else tl.reverse();
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  useEffect(() => {
    if (!b1.current || !b2.current) return;
    if (menuOpen) {
      gsap.to(b1.current, { rotate: 45, y: 3, duration: 0.28, ease: "power2.inOut" });
      gsap.to(b2.current, { rotate: -45, y: -3, duration: 0.28, ease: "power2.inOut" });
    } else {
      gsap.to(b1.current, { rotate: 0, y: 0, duration: 0.28, ease: "power2.inOut" });
      gsap.to(b2.current, { rotate: 0, y: 0, duration: 0.28, ease: "power2.inOut" });
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const focus = requestAnimationFrame(() => firstMobileLinkRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    };
    document.addEventListener("keydown", onKey);
    return () => { cancelAnimationFrame(focus); document.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={clsx(
          "fixed top-0 left-0 right-0 z-[990] transition-[background,backdrop-filter,border-color] duration-500",
          scrolled
            ? "bg-obsidian/80 backdrop-blur-xl border-b border-fog/80"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="container flex items-center justify-between h-[68px] md:h-[76px]">
          <Link
            href="/"
            aria-label={`${site.name} — Home`}
            className="group flex items-center gap-3"
            data-cursor="hover"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-acid/60 bg-acid/10 transition-colors group-hover:bg-acid group-hover:border-acid">
              <span className="font-serif italic-wonk text-acid text-lg group-hover:text-obsidian transition-colors">
                m
              </span>
            </span>
            <span className="hidden sm:flex items-baseline gap-2">
              <span className="font-serif text-lg text-bone">Mayank Panchal</span>
              <span className="hidden md:block h-px w-4 bg-fog" aria-hidden />
              <span className="hidden md:block font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ash">
                {site.role}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV.map((item) => {
                const active = isActive(pathname, item.url);
                return (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      data-cursor="hover"
                      className={clsx(
                        "group inline-flex items-baseline gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] transition-colors",
                        active ? "text-bone" : "text-ash hover:text-bone",
                      )}
                    >
                      <span className={clsx("transition-colors", active ? "text-acid" : "text-ash/60 group-hover:text-acid")}>
                        {item.num}
                      </span>
                      <span className="relative">
                        {item.name}
                        <span
                          className={clsx(
                            "absolute left-0 right-0 -bottom-1 h-px bg-acid transition-transform duration-500 ease-out-expo origin-left",
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

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-fog">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-acid opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
              </span>
              <span ref={clockRef} className="font-mono text-[0.68rem] text-bone tabular-nums">--:--</span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">IST</span>
            </div>

            <Link
              href="/contact"
              data-cursor="hover"
              className="hidden md:inline-flex btn btn-primary py-2.5 px-4 text-[0.72rem]"
            >
              Let&rsquo;s talk
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="nav-overlay"
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMenuOpen((o) => !o)}
              data-cursor="hover"
            >
              <span ref={b1} className="block h-[1.5px] w-6 bg-bone rounded-full origin-center" />
              <span ref={b2} className="block h-[1.5px] w-6 bg-bone rounded-full origin-center" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay nav */}
      <div
        id="nav-overlay"
        ref={overlayRef}
        className="fixed inset-0 z-[985] bg-obsidian md:hidden"
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        aria-hidden={!menuOpen}
        role={menuOpen ? "dialog" : undefined}
        aria-modal={menuOpen ? true : undefined}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 20% 10%, rgba(214,255,59,0.08) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative flex flex-col h-full container pt-28 pb-10">
          <nav aria-label="Mobile" className="flex-1 flex flex-col justify-center">
            <ul className="space-y-2">
              {NAV.map((item, i) => {
                const active = isActive(pathname, item.url);
                return (
                  <li
                    key={item.url}
                    ref={(el) => { if (el) navItemRefs.current[i] = el; }}
                    className="overflow-hidden"
                  >
                    <Link
                      ref={i === 0 ? firstMobileLinkRef : undefined}
                      href={item.url}
                      onClick={() => setMenuOpen(false)}
                      className={clsx(
                        "group flex items-baseline gap-5 py-4 border-b border-fog/70 transition-colors",
                        active ? "text-bone" : "text-pearl/70 hover:text-bone",
                      )}
                    >
                      <span className="font-mono text-[0.7rem] tracking-[0.18em] text-ash">
                        {item.num}
                      </span>
                      <span
                        className="font-serif italic-wonk"
                        style={{ fontSize: "clamp(2.5rem, 11vw, 4.5rem)", lineHeight: 1 }}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="pt-6 border-t border-fog">
            <span className="eyebrow eyebrow--acid">Contact</span>
            <div className="mt-3 flex flex-col gap-1">
              <a href={`mailto:${contact.email}`} className="text-lg text-bone link-underline">{contact.email}</a>
              <a href={contact.phoneHref} className="font-mono text-sm text-pearl">{contact.phone}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
