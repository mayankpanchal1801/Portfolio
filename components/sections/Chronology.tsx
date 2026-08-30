import Reveal from "@/components/primitives/Reveal";
import SectionHead from "@/components/primitives/SectionHead";
import { experienceArr } from "@/constants/experience";

type Props = {
  /** Home shows the headline bullets; /about shows all of them. */
  full?: boolean;
  index?: string;
  headingId?: string;
};

export default function Chronology({
  full = false,
  index = "04",
  headingId = "chronology-heading",
}: Props) {
  return (
    <section id="chronology" className="band bg-paper-2" aria-labelledby={headingId}>
      <div className="shell">
        <SectionHead
          index={index}
          label="Chronology"
          headingId={headingId}
          title="Four years, one company, four roles."
          intro="Grew from Associate to Lead Software Engineer at Screen Interactiv (Screetract OPC) in Bengaluru — 15+ projects shipped across the frontend, the backend, and the infrastructure between them."
        />

        <ol className="mt-14 border-t border-rule md:mt-20">
          {experienceArr.map((item, i) => (
            <Reveal
              as="li"
              key={`${item.company}-${item.title}-${i}`}
              mode="fade"
              className="grid-12 gap-y-5 border-b border-rule py-9 md:py-11"
            >
              <div className="col-span-12 md:col-span-3 lg:col-span-2">
                <p className="tag tag--accent">
                  {item.type === "work" ? "Work" : "Education"}
                </p>
                <p className="mt-2 font-mono text-sm text-ink">{item.date}</p>
                <p className="mt-1 font-mono text-xs text-ink-3">{item.location}</p>
              </div>

              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <h3 className="font-display text-d3 text-ink">{item.title}</h3>
                <p className="mt-1 text-ink-3">{item.company}</p>

                {item.description && (
                  <p className="measure mt-4 text-ink-2">{item.description}</p>
                )}

                {item.bullets.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {(full ? item.bullets : item.bullets.slice(0, 3)).map((b) => (
                      <li key={b} className="flex gap-3 text-ink-2">
                        <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {item.stack && item.stack.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.stack.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-rule px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-3"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
