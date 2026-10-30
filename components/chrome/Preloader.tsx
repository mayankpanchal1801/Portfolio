"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { markReady } from "@/lib/ready";
import { site } from "@/constants/personal";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

/**
 * The boot panel: counts to 100 while the fonts settle, then lifts away
 * and opens the gate in lib/ready, so the hero intro plays to a visitor
 * who is actually looking at it.
 *
 * It follows the active theme (set on <html> before first paint), so a
 * visitor in light mode never sits through a dark screen.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      html.classList.add("is-loading");

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const counter = { value: 0 };
      const span = reduced ? 0.2 : 1.5;

      const tl = gsap.timeline({ paused: true });

      tl.to(counter, {
        value: 100,
        duration: span,
        ease: "power2.inOut",
        onUpdate: () => {
          if (count.current) {
            count.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
          }
        },
      })
        .to("[data-loader-bar]", { scaleX: 1, duration: span, ease: "power2.inOut" }, 0)
        .to("[data-loader-inner]", {
          yPercent: -24,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power3.in",
        })
        .add(() => {
          html.classList.remove("is-loading");
          markReady();
          // The panel held the scroll height at 0; let ScrollTrigger re-measure.
          ScrollTrigger.refresh();
        })
        .to(
          root.current,
          { yPercent: -100, duration: reduced ? 0.01 : 1, ease: "expo.inOut" },
          "<",
        )
        .set(root.current, { display: "none" });

      // Fonts first, so the counter is not re-typeset mid-count.
      const fonts = document.fonts?.ready ?? Promise.resolve();
      fonts.then(() => tl.play()).catch(() => tl.play());

      return () => {
        html.classList.remove("is-loading");
        markReady();
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-preloader
      aria-hidden="true"
      className="fixed inset-0 z-[1800] flex flex-col justify-between bg-paper px-[var(--gutter)] py-7 text-ink"
    >
      <div data-loader-inner className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-3 sm:flex-row sm:justify-between">
          <span>{site.name}</span>
          <span>{site.role} · Bengaluru, India</span>
        </div>

        <div>
          <div className="mb-6 h-px w-full origin-left scale-x-0 bg-accent" data-loader-bar />
          <div className="flex items-end justify-between gap-6">
            <span
              ref={count}
              className="font-display text-[min(24vw,34vh)] font-medium leading-[0.8] tracking-[-0.05em] tabular-nums"
            >
              000
            </span>
            <span className="mb-[1.4vw] shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-3">
              Loading figures
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
