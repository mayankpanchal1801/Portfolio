"use client";

import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useRef } from "react";

type Props = {
  items: string[];
  speed?: number;         // seconds per full loop
  direction?: 1 | -1;
  className?: string;
  itemClassName?: string;
  separator?: string;
  reactive?: boolean;     // adjust speed to scroll velocity
};

/**
 * Infinite marquee ticker driven by GSAP.
 * Renders items twice for seamless loop.
 */
export default function Marquee({
  items,
  speed = 30,
  direction = -1,
  className,
  itemClassName,
  separator = "✦",
  reactive = false,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;
    // measure single-copy width for wrapping
    const totalWidth = track.scrollWidth / 2;

    tweenRef.current?.kill();
    gsap.set(track, { x: 0 });
    const wrapFn = gsap.utils.wrap(-totalWidth, 0);
    tweenRef.current = gsap.to(track, {
      x: direction * totalWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (val: string) => `${wrapFn(parseFloat(val))}px`,
      },
    });

    if (reactive) {
      const st = gsap.context(() => {
        gsap.to(tweenRef.current!, {
          timeScale: 3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: track,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, track);
      return () => st.revert();
    }
  }, [speed, direction, items.length, reactive]);

  return (
    <div className={clsx("overflow-hidden select-none", className)} aria-hidden="true">
      <div ref={trackRef} className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={clsx("marquee-item font-serif italic-wonk text-bone", itemClassName)}
          >
            <span>{item}</span>
            <span className="text-acid text-2xl">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
