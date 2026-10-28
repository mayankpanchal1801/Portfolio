"use client";

import { gsap } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/split-text";
import { useEffect, useRef } from "react";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-hit]';

/**
 * A dot that tracks the pointer exactly and a ring that trails it. The
 * ring swells over anything clickable and turns into a labelled badge
 * over any element carrying `data-cursor="Label"`. The native cursor is
 * left visible, so touch, reduced motion and script failure lose nothing.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dx = gsap.quickTo(dot, "x", { duration: 0.08, ease: "none" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.08, ease: "none" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const show = (on: boolean) => {
      dot.classList.toggle("is-visible", on);
      ring.classList.toggle("is-visible", on);
    };

    const onMove = (e: PointerEvent) => {
      show(true);
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);

      const target = e.target as Element | null;
      const tagged = target?.closest?.<HTMLElement>("[data-cursor]");
      const text = tagged?.dataset.cursor ?? "";
      if (label.textContent !== text) label.textContent = text;
      ring.classList.toggle("is-label", Boolean(text));
      ring.classList.toggle("is-active", !text && Boolean(target?.closest?.(INTERACTIVE)));
    };

    const onLeave = () => show(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} />
      </div>
    </>
  );
}
