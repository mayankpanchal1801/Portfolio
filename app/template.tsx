"use client";

import { gsap } from "@/lib/gsap-config";
import { isReady } from "@/lib/ready";
import { prefersReducedMotion } from "@/lib/split-text";
import { useLayoutEffect, useRef } from "react";

/**
 * Page arrivals. The template remounts on every route change, so this
 * effect is the "a new page just landed" hook: a clay panel is already
 * covering the screen on the first painted frame and draws itself up and
 * away, unveiling the page from the bottom edge.
 *
 * It sits out the very first load - the preloader owns that entrance -
 * and stays `display: none` unless the script turns it on, so nothing can
 * ever be left covered.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !isReady() || prefersReducedMotion()) return;

    el.classList.add("is-on");
    const tween = gsap.fromTo(
      el,
      { clipPath: "inset(0% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.85,
        delay: 0.05,
        ease: "expo.inOut",
        onComplete: () => el.classList.remove("is-on"),
      },
    );
    return () => {
      tween.kill();
      el.classList.remove("is-on");
    };
  }, []);

  return (
    <>
      <div ref={ref} aria-hidden className="curtain" />
      {children}
    </>
  );
}
