"use client";

import { gsap } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/split-text";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

type Props = {
  items: string[];
  className?: string;
};

/**
 * Cycles through `items` with a vertical roll. The first item is the
 * static markup, so with reduced motion or no JS it simply reads as that.
 */
export default function Rotator({ items, className }: Props) {
  const listRef = useRef<HTMLSpanElement>(null);
  const loop = [...items, items[0]];

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list || prefersReducedMotion()) return;

      const step = 100 / loop.length;
      const tl = gsap.timeline({ repeat: -1, delay: 1.5 });
      for (let i = 1; i < loop.length; i++) {
        tl.to(list, { yPercent: -step * i, duration: 0.8, ease: "expo.inOut" }, "+=1.8");
      }
      tl.set(list, { yPercent: 0 });
    },
    { scope: listRef },
  );

  return (
    <span className={`relative inline-block h-[1.2em] overflow-hidden align-bottom ${className ?? ""}`}>
      <span ref={listRef} className="block" aria-label={items.join(", ")}>
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} aria-hidden={i > 0} className="block h-[1.2em] whitespace-nowrap leading-[1.2]">
            {item}
          </span>
        ))}
      </span>
    </span>
  );
}
