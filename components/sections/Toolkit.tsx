import Reveal from "@/components/primitives/Reveal";
import SectionHead from "@/components/primitives/SectionHead";
import SkillMark from "@/components/primitives/SkillMark";
import { skillsArr, skillsFlat } from "@/constants/skills";

type Props = { index?: string; headingId?: string };

export default function Toolkit({
  index = "03",
  headingId = "toolkit-heading",
}: Props) {
  return (
    <section id="toolkit" className="band shell" aria-labelledby={headingId}>
      <SectionHead
        index={index}
        label="Toolkit"
        headingId={headingId}
        title="What I reach for, day to day."
        intro="Grounded in Python and TypeScript, with enough backend, infrastructure, and AI tooling to own a feature from schema to production URL."
      />

      <div className="mt-6 flex items-baseline justify-between md:mt-10">
        <span className="tag">Index</span>
        <span className="tag tabular-nums">
          {skillsArr.length} groups · {skillsFlat.length} tools
        </span>
      </div>

      <dl className="mt-4 border-t border-rule">
        {skillsArr.map((group, i) => (
          <Reveal
            as="div"
            key={group.category}
            mode="fade"
            delay={Math.min(i, 4) * 0.04}
            className="grid-12 gap-y-4 border-b border-rule py-8"
          >
            <dt className="col-span-12 md:col-span-3 lg:col-span-2">
              <span className="marginal text-accent-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-d3 text-ink">{group.category}</h3>
              <p className="mt-2 text-sm italic text-ink-3">{group.caption}</p>
            </dt>

            <dd className="col-span-12 md:col-span-9 lg:col-span-10">
              <ul className="flex flex-wrap gap-x-2 gap-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="group/chip inline-flex items-center gap-2 rounded-full border border-rule px-3 py-1.5 transition-colors hover:border-accent-line hover:bg-accent-soft"
                  >
                    <SkillMark name={item} />
                    <span className="text-sm text-ink-2 transition-colors group-hover/chip:text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
