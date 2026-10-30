"use client";

import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useRef } from "react";

type Props = {
  text: string;
  className?: string;
};

/**
 * A line of display type whose letters climb out of the baseline one
 * after another, scrubbed to the scroll as the block comes up the
 * screen. Split at render time, so with no script it is just the word.
 */
export default function RiseChars({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-char]", {
          yPercent: 100,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <p ref={ref} aria-label={text} className={clsx("overflow-hidden", className)}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden data-char className="inline-block whitespace-pre">
          {ch}
        </span>
      ))}
    </p>
  );
}
