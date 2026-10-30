"use client";

import { ScrollTrigger } from "@/lib/gsap-config";
import { destroyLenis, getLenis, initLenis, scrollToTarget } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/split-text";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Enables Lenis smooth scrolling, except where the visitor has asked for
 * reduced motion - there, native scrolling is the correct behaviour.
 *
 * It also owns the one thing the App Router cannot do for a virtual
 * scroller: on a route change Lenis still holds the old page's target, so
 * it is snapped to the top (or to the #hash) and re-measured, and every
 * ScrollTrigger recomputes against the new document height.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    initLenis();
    return () => destroyLenis();
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const hash = window.location.hash;
    const target = hash ? document.querySelector<HTMLElement>(hash) : null;
    scrollToTarget(target ?? 0, { immediate: true, offset: target ? -96 : 0 });

    // Two frames: the new page has to lay out before it can be measured.
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        getLenis()?.resize();
        ScrollTrigger.refresh();
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return <>{children}</>;
}
