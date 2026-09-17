"use client";

import { gsap } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/split-text";
import { useEffect, useRef } from "react";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-hit]';

/**
 * A soft accent ring that trails the pointer and swells over anything
 * clickable. The native cursor is deliberately left visible - if this
 * script never runs, or the device is touch, nothing is lost.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const setX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
    const setY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      ring.classList.add("is-visible");
      setX(e.clientX);
      setY(e.clientY);

      const hit = (e.target as Element | null)?.closest?.(INTERACTIVE);
      ring.classList.toggle("is-active", Boolean(hit));
    };

    const onLeave = () => ring.classList.remove("is-visible");
    const onEnter = () => ring.classList.add("is-visible");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />;
}
