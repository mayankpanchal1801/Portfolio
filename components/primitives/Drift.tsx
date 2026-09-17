"use client";

import clsx from "clsx";

type Props = {
  items: string[];
  /** Seconds for one full pass. Higher is slower. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
};

/**
 * A single continuous ticker line. Pure CSS animation - no scroll
 * listener, no rAF loop, and it stops dead under reduced motion.
 * Duplicated once so the loop is seamless at translateX(-50%).
 */
export default function Drift({
  items,
  duration = 42,
  reverse = false,
  className,
  itemClassName,
}: Props) {
  const run = [...items, ...items];

  return (
    <div className={clsx("overflow-hidden select-none", className)} aria-hidden="true">
      <div
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
              ✳
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
