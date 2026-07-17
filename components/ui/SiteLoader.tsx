"use client";

import FigureTicks from "@/components/shared/FigureTicks";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

const SESSION_KEY = "portfolio.loaded";

export default function SiteLoader() {
  // Initial render matches server HTML (visible). On mount, if the session
  // flag is set we immediately unmount so no exit animation runs.
  const [active, setActive] = useState(true);

  const wrapRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const subLabelRef = useRef<HTMLDivElement>(null);
  const ticksRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const barSweepRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // Skip entirely on repeat visits within the same session.
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1") {
      setActive(false);
      return;
    }

    const wrap = wrapRef.current;
    const ribbon = ribbonRef.current;
    const wordmark = wordmarkRef.current;
    const subLabel = subLabelRef.current;
    const ticks = ticksRef.current;
    const meta = metaRef.current;
    const bar = barRef.current;
    const barSweep = barSweepRef.current;
    const num = numRef.current;
    if (!wrap || !ribbon || !wordmark || !subLabel || !ticks || !meta || !bar || !barSweep || !num) return;

    document.body.style.overflow = "hidden";

    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // ignore private-mode / disabled storage
        }
        document.body.style.overflow = "";
        setActive(false);
      },
    });

    // ── enter ─────────────────────────────────────
    tl.from(ribbon, { opacity: 0, y: -12, duration: 0.55, ease: "expo.out" })
      .from(ticks, { opacity: 0, scale: 0.9, duration: 0.6, ease: "expo.out" }, "-=0.35")
      .from(wordmark, { opacity: 0, y: 24, duration: 0.75, ease: "expo.out" }, "-=0.45")
      .from(subLabel, { opacity: 0, y: 12, duration: 0.5, ease: "expo.out" }, "-=0.5")
      .from(meta, { opacity: 0, y: 10, duration: 0.5, ease: "expo.out" }, "-=0.4");

    // ── progress (parallel) ───────────────────────
    tl.to(bar, { scaleX: 1, duration: 1.6, ease: "power3.inOut" }, "-=0.2")
      .to(
        counter,
        {
          v: 100,
          duration: 1.6,
          ease: "power3.inOut",
          onUpdate: () => {
            num.textContent = String(Math.floor(counter.v)).padStart(3, "0");
          },
        },
        "<",
      );

    // ── exit ──────────────────────────────────────
    // acid bar sweeps to full viewport width, then everything lifts up
    tl.to(barSweep, {
      scaleX: 1,
      duration: 0.55,
      ease: "expo.inOut",
    })
      .to([ribbon, meta, subLabel], {
        opacity: 0,
        y: -12,
        duration: 0.35,
        stagger: 0.04,
        ease: "power2.in",
      }, "-=0.3")
      .to(ticks, { opacity: 0, duration: 0.3, ease: "power2.in" }, "<")
      .to(wordmark, { yPercent: -140, duration: 0.85, ease: "expo.inOut" }, "-=0.15")
      .to(wrap, { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, "<+0.08");
  }, []);

  if (!active) return null;

  return (
    <div ref={wrapRef} className="site-loader">
      <div className="w-full flex flex-col gap-10 md:gap-16 relative">
        {/* Ribbon */}
        <div
          ref={ribbonRef}
          className="flex flex-wrap items-center justify-between gap-y-2 gap-x-6 pb-4 border-b border-fog"
        >
          <span className="eyebrow eyebrow--acid inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-acid opacity-70 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
            </span>
            Preparing specimen
          </span>
          <span className="eyebrow hidden md:inline-flex">Portfolio · MP-2026</span>
          <span className="eyebrow">Bengaluru · India</span>
        </div>

        {/* Wordmark with spec ticks */}
        <div className="relative self-start pt-3 md:pt-6">
          <div ref={ticksRef} className="absolute inset-0 pointer-events-none">
            <FigureTicks />
          </div>

          <div ref={wordmarkRef} className="flex items-baseline gap-2 will-change-transform px-2 md:px-4">
            <span
              className="font-serif italic-wonk text-bone leading-[0.9]"
              style={{ fontSize: "clamp(3.5rem, 14vw, 12rem)", letterSpacing: "-0.045em" }}
            >
              Mayank
            </span>
            <span
              className="font-serif text-acid leading-[0.9]"
              style={{ fontSize: "clamp(3.5rem, 14vw, 12rem)" }}
            >
              .
            </span>
          </div>

          <div ref={subLabelRef} className="mt-3 md:mt-4 px-2 md:px-4">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ash">
              Fig. 00 · The Author · Full-stack developer
            </span>
          </div>
        </div>

        {/* Meta row — progress + counter */}
        <div ref={metaRef} className="flex items-end justify-between w-full pt-6 border-t border-fog gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="eyebrow">Loading assets</span>
            <span className="font-mono text-[0.62rem] text-ash uppercase tracking-[0.22em]">
              GSAP · Lenis · WebGL · Fraunces
            </span>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative w-40 md:w-72 h-px bg-fog overflow-hidden">
              <span
                ref={barRef}
                className="absolute inset-0 bg-acid origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <span
              ref={numRef}
              className="font-mono text-sm md:text-base text-bone tabular-nums"
              aria-hidden
            >
              000
            </span>
          </div>
        </div>

        {/* Exit sweep — grows across full viewport when loader completes */}
        <div
          ref={barSweepRef}
          className="fixed left-0 right-0 bottom-0 h-px bg-acid origin-left will-change-transform"
          style={{ transform: "scaleX(0)" }}
          aria-hidden
        />
      </div>
    </div>
  );
}
