"use client";

import { gsap } from "@/lib/gsap-config";
import { whenReady } from "@/lib/ready";
import { prefersReducedMotion } from "@/lib/split-text";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useRef } from "react";

type Line = {
  text: string;
  /** Set the line in the accent instead of the ink. */
  accent?: boolean;
  /** Push the line to the far edge - for a split, lenis.dev-style mark. */
  align?: "start" | "end";
  /** Hook for the owner's motion; applied to the face and its ghost alike. */
  className?: string;
};

type Props = {
  lines: Line[];
  id?: string;
  className?: string;
};

/** Hair spaces would collapse in an inline-block, so they are hard. */
function chars(text: string) {
  return Array.from(text).map((ch) => (ch === " " ? " " : ch));
}

/**
 * The name, extruded.
 *
 * Two copies of the same letters live in the stage: an outlined ghost
 * 90px behind the face (see `.wm__ghost`) and the face itself. A pointer
 * tilt on the stage separates them, which is what gives the mark a body
 * instead of a drop shadow.
 *
 * Each letter flips up from the floor on load - rotated back on X with
 * its hinge behind the baseline, so it arrives rather than fades. The
 * tween is created paused and released by lib/ready once the preloader
 * has lifted, and the markup renders finished without it.
 */
export default function Wordmark3D({ lines, id, className }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const label = lines.map((l) => l.text).join(" ");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const letters = el.querySelectorAll<HTMLElement>("[data-wm-char]");
      if (!letters.length) return;

      const tl = gsap.timeline({ paused: true });

      tl.from(letters, {
        yPercent: 118,
        rotationX: -86,
        z: -180,
        opacity: 0,
        duration: 1.25,
        stagger: { each: 0.035, from: "start" },
        ease: "expo.out",
        transformOrigin: "50% 100% -40px",
      });

      // The extrusion arrives after the face has landed, so the outline
      // never reads as the real letters waiting to be filled in.
      tl.from(
        el.querySelectorAll<HTMLElement>(".wm__ghost"),
        { opacity: 0, z: -340, duration: 1.4, ease: "expo.out" },
        0.4,
      );

      return whenReady(() => tl.play());
    },
    { scope: ref },
  );

  const letters = (line: Line, hidden: boolean) =>
    chars(line.text).map((ch, i) => (
      <span
        key={`${ch}-${i}`}
        className="wm__char"
        {...(hidden ? {} : { "data-wm-char": "" })}
      >
        {ch}
      </span>
    ));

  const stack = (hidden: boolean) =>
    lines.map((line) => (
      <span
        key={line.text}
        className={clsx(
          "wm__line block",
          line.align === "end" && "text-right",
          line.accent && (hidden ? "wm__ghost--accent" : "text-signal"),
          line.className,
        )}
      >
        {letters(line, hidden)}
      </span>
    ));

  return (
    <h1
      ref={ref}
      id={id}
      aria-label={label}
      className={clsx("wm font-display text-mark font-medium", className)}
    >
      <span aria-hidden className="wm__ghost">
        {stack(true)}
      </span>
      <span className="block">{stack(false)}</span>
    </h1>
  );
}
