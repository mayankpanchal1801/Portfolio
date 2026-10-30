"use client";

import SystemGraph from "@/components/sections/SystemGraph";
import { useTilt } from "@/lib/use-tilt";

/** Readouts that float in front of the panel, each at its own depth. */
const HUD = [
  { label: "p95", value: "14ms", at: "-left-5 top-[22%]", z: 74, delay: "-1.2s" },
  { label: "uptime", value: "99.9%", at: "-right-4 top-[46%]", z: 118, delay: "-3.4s" },
  { label: "CLS", value: "0.00", at: "-left-3 bottom-[18%]", z: 92, delay: "-5.1s" },
];

/**
 * The instrument panel and its telemetry, on one tilting plate.
 *
 * The tilt is taken off the card and put here so the readouts swing with
 * it. They sit 74-118px in front along Z (`.pop`), which is what makes
 * the swing read as parallax: the near chips travel further across the
 * card than the card travels itself.
 *
 * The perspective comes from the `.stage` wrapper in Hero - passing 0
 * here keeps a second one from fighting it - and `.deep` is what stops
 * this element from flattening the chips into the card's own plane.
 */
export default function HeroInstrument() {
  const ref = useTilt<HTMLDivElement>({ max: 8, lift: 0, perspective: 0 });

  return (
    <div ref={ref} className="deep relative">
      <SystemGraph tilt={0} />

      {HUD.map((chip) => (
        <span
          key={chip.label}
          aria-hidden
          className={`hud pop absolute ${chip.at} hidden lg:inline-flex`}
          style={
            { "--z": `${chip.z}px`, animationDelay: chip.delay } as React.CSSProperties
          }
        >
          {chip.label} <b>{chip.value}</b>
        </span>
      ))}
    </div>
  );
}
