"use client";

import { destroyLenis, initLenis } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/split-text";
import { useEffect } from "react";

/**
 * Enables Lenis smooth scrolling, except where the visitor has asked for
 * reduced motion - there, native scrolling is the correct behaviour.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    initLenis();
    return () => destroyLenis();
  }, []);

  return <>{children}</>;
}
