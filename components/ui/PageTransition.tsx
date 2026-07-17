"use client";

import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const SESSION_KEY = "portfolio.loaded";

/**
 * Per-route enter animation. `app/template.tsx` re-mounts on every route
 * change, so this fires on nav and on hard refresh of non-first-visit
 * pages. On the very first visit of a session, the SiteLoader owns the
 * intro — the curtain hides itself immediately.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const curtain = curtainRef.current;
      const label = labelRef.current;
      const content = contentRef.current;
      if (!curtain || !content) return;

      const isFirstLoad =
        typeof window !== "undefined" &&
        sessionStorage.getItem(SESSION_KEY) !== "1";

      if (isFirstLoad) {
        // SiteLoader owns this moment — vanish silently.
        gsap.set(curtain, { yPercent: -100 });
        return;
      }

      // Kick off with the curtain covering. Brief hold so the destination
      // route label registers, then wipe up.
      const tl = gsap.timeline();

      if (label) {
        tl.fromTo(
          label,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.3, ease: "expo.out" },
        )
          .to(label, { opacity: 0, y: -8, duration: 0.3, ease: "power2.in" }, "+=0.15");
      }

      tl.to(
        curtain,
        { yPercent: -100, duration: 0.85, ease: "expo.inOut" },
        label ? "-=0.15" : 0.1,
      ).from(
        content,
        { opacity: 0, y: 32, duration: 0.75, ease: "expo.out" },
        "-=0.45",
      );
    },
    { dependencies: [pathname] },
  );

  return (
    <>
      <div
        ref={curtainRef}
        aria-hidden
        className="fixed inset-0 z-[500] bg-obsidian pointer-events-none will-change-transform flex flex-col justify-end"
      >
        <div
          ref={labelRef}
          className="container flex items-center justify-between pb-8 md:pb-12"
        >
          <span className="eyebrow eyebrow--acid inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-acid opacity-70 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
            </span>
            Now viewing
          </span>
          <span className="font-serif italic-wonk text-acid text-xl md:text-3xl truncate max-w-[60vw]">
            {pathname === "/" ? "index" : pathname}
          </span>
        </div>
      </div>

      <div ref={contentRef} className="will-change-[opacity,transform]">
        {children}
      </div>
    </>
  );
}
