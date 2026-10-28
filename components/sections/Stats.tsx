import CountUp from "@/components/primitives/CountUp";
import Panel from "@/components/primitives/Panel";
import { about } from "@/constants/personal";

/** Four headline numbers; each counts up as it scrolls into view. */
export default function Stats() {
  return (
    <section className="shell pt-[var(--rhythm)]" aria-label="Career at a glance">
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {about.stats.map((s) => (
          <Panel key={s.label} className="p-5 sm:p-7">
            <dd className="font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-normal leading-none tracking-[-0.035em] tabular-nums text-ink">
              <CountUp value={s.value} suffix={s.suffix} />
            </dd>
            <dt className="tag mt-4 leading-relaxed">{s.label}</dt>
          </Panel>
        ))}
      </dl>
    </section>
  );
}
