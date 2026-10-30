"use client";

import { gsap } from "@/lib/gsap-config";
import { whenReady } from "@/lib/ready";
import { prefersReducedMotion, splitWords } from "@/lib/split-text";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useRef } from "react";

type Mode = "words" | "rise" | "fade" | "depth";

type Props = {
  as?: React.ElementType;
  mode?: Mode;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Fire immediately on mount instead of waiting for the scroll position. */
  immediate?: boolean;
  className?: string;
  children: React.ReactNode;
  /* Anchor attributes are included so `as="a"` can carry href/target/rel;
     AnchorHTMLAttributes extends HTMLAttributes, so plain elements are
     still fully covered. */
} & Omit<React.AnchorHTMLAttributes<HTMLElement>, "children" | "className">;

/**
 * The one reveal primitive the site uses.
 *
 * Content renders visible and unmodified. The animation only claims an
 * element once the script is running, so with JS off - or under
 * `prefers-reduced-motion` - everything is simply readable.
 */
export default function Reveal({
  as: Tag = "div",
  mode = "fade",
  delay = 0,
  stagger = 0.055,
  duration = 0.9,
  immediate = false,
  className,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const targets: gsap.TweenTarget = mode === "words" ? splitWords(el) : el;
      if (Array.isArray(targets) && targets.length === 0) return;

      const vars: gsap.TweenVars =
        mode === "words"
          ? { yPercent: 108, duration, stagger, ease: "expo.out" }
          : mode === "rise"
            ? { y: 34, opacity: 0, duration, ease: "expo.out" }
            : mode === "depth"
              ? {
                  // Tips up off the floor and comes forward. The negative
                  // Z in the origin puts the hinge behind the element, so
                  // it swings rather than pivots on its own bottom edge.
                  y: 56,
                  z: -220,
                  rotationX: -30,
                  opacity: 0,
                  duration: duration * 1.2,
                  ease: "expo.out",
                  transformOrigin: "50% 100% -60px",
                  transformPerspective: 1100,
                }
              : { y: 14, opacity: 0, duration: duration * 0.8, ease: "power2.out" };

      // `immediate` reveals are created paused so they are not spent behind
      // the preloader; lib/ready opens the gate once the panel has lifted
      // (and on a safety timeout, so this can never strand the content).
      const tween = gsap.from(targets, {
        ...vars,
        delay,
        paused: immediate,
        ...(immediate
          ? {}
          : {
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            }),
      });

      if (immediate) return whenReady(() => tween.play());
    },
    { scope: ref, dependencies: [mode, delay, stagger, duration, immediate] },
  );

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={clsx(className)} {...rest}>
      {children}
    </Component>
  );
}
