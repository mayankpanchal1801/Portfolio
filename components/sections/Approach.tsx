import Panel from "@/components/primitives/Panel";
import Reveal from "@/components/primitives/Reveal";
import SectionHead from "@/components/primitives/SectionHead";
import { about } from "@/constants/personal";

const LEADS = [
  { k: "Team", v: "Frontend engineers, mentored through the full delivery cycle" },
  { k: "Process", v: "Code review, CI/CD, design-system and a11y baselines" },
  { k: "Outcome", v: "15+ products shipped on a shared engineering bar" },
];

export default function Approach() {
  return (
    <section id="approach" className="band shell" aria-labelledby="approach-heading">
      <SectionHead
        index="02"
        label="How I lead"
        headingId="approach-heading"
        title={
          <>
            Principles, <span className="text-signal">not process</span>.
          </>
        }
        intro="Lead engineers are force multipliers. This is the playbook I run teams on."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {about.values.map((v, i) => (
          <Reveal key={v.title} mode="rise" delay={(i % 2) * 0.08}>
            <Panel className="h-full p-7 sm:p-9">
              <span className="font-display text-[clamp(3.5rem,7vw,6rem)] font-normal leading-none tracking-[-0.035em] text-outline">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-d3 text-ink">{v.title}</h3>
              <p className="mt-3 max-w-md text-ink-2">{v.body}</p>
            </Panel>
          </Reveal>
        ))}
      </div>

      <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule md:grid-cols-3">
        {LEADS.map((l) => (
          <div key={l.k} className="bg-paper-2 p-6 sm:p-7">
            <dt className="tag tag--accent">{l.k}</dt>
            <dd className="mt-3 text-sm text-ink-2">{l.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
