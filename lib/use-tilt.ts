"use client";

import { gsap } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/split-text";
import { useEffect, useRef } from "react";

type Options = {
  /** Peak rotation on each axis, in degrees. 0 disables the tilt. */
  max?: number;
  /** How far the surface rises toward the viewer at full tilt, in px. */
  lift?: number;
  /**
   * Perspective applied to the element's own transform. Pass 0 when an
   * ancestor `.stage` already provides one - two perspectives stacked on
   * the same axis fight each other.
   */
  perspective?: number;
};

/**
 * Pointer-driven 3D tilt for one surface.
 *
 * Two jobs, deliberately together: it swings the element around its own
 * centre, and it writes the pointer position to `--mx` / `--my` for the
 * spotlight gradients in globals.css. The second half runs even when the
 * tilt does not, so a reduced-motion or touch visitor still gets the
 * light without the gymnastics.
 *
 * Children marked `.pop` carry a `translateZ`, so the tilt separates the
 * layers instead of skewing one flat picture - that needs
 * `transform-style: preserve-3d`, which is what `.deep` is for.
 */
export function useTilt<T extends HTMLElement>({
  max = 8,
  lift = 20,
  perspective = 1200,
}: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tilting =
      max > 0 &&
      !prefersReducedMotion() &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let rx: ((v: number) => void) | null = null;
    let ry: ((v: number) => void) | null = null;
    let tz: ((v: number) => void) | null = null;

    if (tilting) {
      if (perspective > 0) gsap.set(el, { transformPerspective: perspective });
      rx = gsap.quickTo(el, "rotationX", { duration: 0.7, ease: "power3.out" });
      ry = gsap.quickTo(el, "rotationY", { duration: 0.7, ease: "power3.out" });
      tz = gsap.quickTo(el, "z", { duration: 0.7, ease: "power3.out" });
    }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
      if (!rx || !ry || !tz) return;
      // -1 … 1 from the centre of the surface.
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      ry(nx * max);
      rx(-ny * max);
      tz(lift);
    };

    const onLeave = () => {
      rx?.(0);
      ry?.(0);
      tz?.(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (tilting) gsap.set(el, { clearProps: "transform" });
    };
  }, [max, lift, perspective]);

  return ref;
}
