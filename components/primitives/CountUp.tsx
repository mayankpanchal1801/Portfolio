"use client";

import { gsap } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/split-text";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

type Props = {
  value: number;
  suffix?: string;
  className?: string;
};

/** Counts from zero to `value` the first time it scrolls into view. */
export default function CountUp({ value, suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const decimals = Number.isInteger(value) ? 0 : 1;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const state = { n: 0 };
      el.textContent = (0).toFixed(decimals);
      gsap.to(state, {
        n: value,
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = state.n.toFixed(decimals);
        },
      });
    },
    { scope: ref, dependencies: [value, decimals] },
  );

  return (
    <span className={className}>
      <span ref={ref}>{value.toFixed(decimals)}</span>
      {suffix}
    </span>
  );
}
