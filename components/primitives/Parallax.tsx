"use client";

import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useRef } from "react";

type Props = {
  /** yPercent at the start and end of the ride. */
  from?: number;
  to?: number;
  /** Measure against the parent instead of the element itself. */
  parent?: boolean;
  start?: string;
  end?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Scroll-scrubbed vertical drift. Content renders in its resting place;
 * the offset is only applied once the script runs, and never under
 * reduced motion.
 */
export default function Parallax({
  from = -12,
  to = 12,
  parent = false,
  start = "top bottom",
  end = "bottom top",
  className,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { yPercent: from },
          {
            yPercent: to,
            ease: "none",
            scrollTrigger: {
              trigger: parent ? el.parentElement : el,
              start,
              end,
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [from, to, parent, start, end] },
  );

  return (
    <div ref={ref} className={clsx("will-change-transform", className)}>
      {children}
    </div>
  );
}
