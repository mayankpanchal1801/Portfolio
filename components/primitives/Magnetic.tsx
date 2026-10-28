"use client";

import { gsap } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/split-text";
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  /** 0-1: how far the element chases the pointer. */
  strength?: number;
  className?: string;
};

/** Pulls its child a little toward the pointer, then springs back. */
export default function Magnetic({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.45)" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * strength);
      y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      x(0);
      y(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={className ?? "inline-block"}>
      {children}
    </span>
  );
}
