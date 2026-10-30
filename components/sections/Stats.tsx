import CountUp from "@/components/primitives/CountUp";
import FigureLabel from "@/components/primitives/FigureLabel";
import Reveal from "@/components/primitives/Reveal";
import { about } from "@/constants/personal";

/**
 * The footprint, measured in shipped code. Four headline numbers, each
 * tipping up off the floor as it scrolls in and counting up once it
 * lands, with a clay bar beneath it that fills as the ink reaches the
 * plate.
 */
export default function Stats() {
  return (
    <section className="shell pt-(--rhythm)" aria-label="Career at a glance">
      <FigureLabel index="01" label="the footprint" className="mb-10 w-full" />

      <dl className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {about.stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            mode="depth"
            delay={i * 0.09}
            className="group border-t border-rule pt-5"
            data-ink
          >
            <dd className="font-display text-[clamp(2.75rem,6.5vw,5rem)] font-medium leading-none tracking-[-0.045em] tabular-nums text-ink">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </dd>

            {/* The ink bar — scales 0 → 1 off --ink as the plate is read. */}
            <div aria-hidden className="mt-5 h-px w-full bg-rule">
              <div className="ink-fill h-full bg-accent transition-[box-shadow] duration-500 group-hover:shadow-[0_0_14px_1px_var(--c-glow-hot)]" />
            </div>

            <dt className="tag mt-4 leading-relaxed">
              <span className="text-rule-strong tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              {stat.label}
            </dt>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
