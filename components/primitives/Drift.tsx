"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/split-text";
import clsx from "clsx";
import { useEffect, useRef } from "react";

type Props = {
  items: string[];
  /** Seconds for one full pass at rest. Higher is slower. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
};

/**
 * A continuous ticker line that answers the scroll.
 *
 * At rest it drifts at `duration`; scrolling throws it forward, harder the
 * faster you go, and turns it round when you scroll back up - with a lean
 * into the direction of travel that settles as the page does.
 *
 * The CSS keyframe loop is the baseline: it runs with no script and stops
 * dead under reduced motion. The script only takes over when it can run.
 * Duplicated once so the loop is seamless at -50%.
 */
export default function Drift({
  items,
  duration = 42,
  reverse = false,
  className,
  itemClassName,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const run = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    track.style.animation = "none";
    const setX = gsap.quickSetter(track, "xPercent");
    const setSkew = gsap.quickSetter(track, "skewX", "deg");

    // Percent of the track per second: half the track is one full pass.
    const base = 50 / duration;
    let x = 0;
    let dir = reverse ? 1 : -1;
    let boost = 0;
    let skew = 0;

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity();
        dir = (self.direction === 1 ? -1 : 1) * (reverse ? -1 : 1);
        boost = Math.max(boost, Math.min(Math.abs(v) / 180, 14));
      },
    });

    const tick = (_t: number, dtMs: number) => {
      const dt = Math.min(dtMs, 64) / 1000;
      boost *= 0.9;
      x += dir * base * (1 + boost) * dt;
      if (x <= -50) x += 50;
      else if (x > 0) x -= 50;
      skew += (dir * Math.min(boost, 8) * -0.55 - skew) * 0.12;
      setX(x);
      setSkew(skew);
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      track.style.animation = "";
      gsap.set(track, { clearProps: "transform" });
    };
  }, [duration, reverse]);

  return (
    <div className={clsx("overflow-hidden select-none", className)} aria-hidden="true">
      <div
        ref={trackRef}
        className="drift-track animate-drift"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {run.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={clsx(
              "flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10",
              itemClassName,
            )}
          >
            <span>{item}</span>
            <span aria-hidden className="text-accent">
              +
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
