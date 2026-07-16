"use client";

import { gsap } from "@/lib/gsap-config";
import { splitText } from "@/lib/text-splitter";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useRef } from "react";

type Props = {
  as?: keyof React.JSX.IntrinsicElements;
  mode?: "words" | "chars" | "fade";
  delay?: number;
  stagger?: number;
  duration?: number;
  y?: number;
  className?: string;
  children: React.ReactNode;
  trigger?: "load" | "scroll";
  once?: boolean;
};

/**
 * Universal reveal wrapper.
 * - mode="words": splits text into rising word masks
 * - mode="chars": splits into stagger-in chars
 * - mode="fade": simple opacity + y translate
 */
export default function Reveal({
  as: Tag = "div",
  mode = "words",
  delay = 0,
  stagger = 0.06,
  duration = 0.9,
  y = 110,
  className,
  children,
  trigger = "scroll",
  once = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (mode === "words" || mode === "chars") {
        const targets = splitText(el as HTMLElement, mode);
        gsap.from(targets, {
          yPercent: mode === "words" ? y : 0,
          y: mode === "chars" ? 20 : 0,
          opacity: mode === "chars" ? 0 : 1,
          duration,
          stagger,
          delay,
          ease: mode === "words" ? "expo.out" : "back.out(2)",
        });
      } else {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration,
          delay,
          ease: "expo.out",
        });
      }
    };

    if (trigger === "load") {
      run();
      return;
    }

    const st = gsap.context(() => {
      const tween = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
      // simple wrapper
      tween.call(run);
    }, ref);

    return () => st.revert();
  }, [mode, delay, stagger, duration, y, trigger, once]);

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={clsx(className)}>
      {children}
    </Component>
  );
}
