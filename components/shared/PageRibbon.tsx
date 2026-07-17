"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Short label (e.g. "About", "Contact", "Projects"). */
  section: string;
  /** Two-char index like "02" — displayed as a specimen number. */
  index: string;
  /** Optional right-side extra element (e.g. entry count). Renders before the clock. */
  right?: React.ReactNode;
};

/**
 * Editorial ribbon strip used at the top of every page. Mirrors the
 * hero — pulsing acid dot, specimen number, live IST clock.
 */
export default function PageRibbon({ section, index, right }: Props) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6 pb-5 border-b border-fog">
      <span className="eyebrow eyebrow--acid inline-flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-acid opacity-70 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
        </span>
        {section} · {index}
      </span>
      <span className="eyebrow hidden md:inline-flex">Portfolio · MP-2026</span>
      <span className="eyebrow inline-flex items-center gap-2 tabular-nums">
        {right && (
          <>
            {right}
            <span className="text-stone">/</span>
          </>
        )}
        <span>BLR</span>
        <span className="text-stone">/</span>
        <span className="text-bone">{time ?? "— · —"}</span>
        <span>IST</span>
      </span>
    </div>
  );
}
