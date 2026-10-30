"use client";

import { gsap } from "@/lib/gsap-config";
import { prefersReducedMotion, splitWords } from "@/lib/split-text";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useRef } from "react";

type Props = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

/**
 * A paragraph that is lit as it is read: every word starts as a ghost and
 * comes up to full ink as the scroll line passes it, scrubbed both ways.
 *
 * Words are only dimmed once the script has split them (and only behind
 * `.ink-ready`), so with no script the paragraph is simply there.
 */
export default function ReadAlong({ as: Tag = "p", className, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const words = splitWords(el, { mask: false });
      if (!words.length) return;

      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "bottom 48%",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} data-read className={clsx(className)}>
      {children}
    </Component>
  );
}
