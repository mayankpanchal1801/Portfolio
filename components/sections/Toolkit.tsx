import Panel from "@/components/primitives/Panel";
import Reveal from "@/components/primitives/Reveal";
import SectionHead from "@/components/primitives/SectionHead";
import SkillMark from "@/components/primitives/SkillMark";
import { skillsArr, skillsFlat } from "@/constants/skills";

type Props = { index?: string; headingId?: string };

export default function Toolkit({ index = "03", headingId = "toolkit-heading" }: Props) {
  return (
    <section id="toolkit" className="band shell" aria-labelledby={headingId}>
      <SectionHead
        index={index}
        label="Toolkit"
        headingId={headingId}
        title={
          <>
            What I reach for, <span className="text-signal">daily</span>.
          </>
        }
        intro={`${skillsArr.length} disciplines, ${skillsFlat.length} tools - grounded in Python and TypeScript, with enough infrastructure and AI tooling to own a feature from schema to production URL.`}
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {skillsArr.map((group, i) => (
          <Reveal key={group.category} mode="rise" delay={(i % 4) * 0.06}>
            <Panel className="h-full p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl text-ink">{group.category}</h3>
                <span className="tag tabular-nums">{String(group.items.length).padStart(2, "0")}</span>
              </div>
              <p className="mt-2 text-sm text-ink-3">{group.caption}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1.5 rounded-full border border-rule bg-paper/60 px-2.5 py-1.5 text-[0.78rem] text-ink-2 transition-colors hover:border-accent-line hover:text-ink"
                  >
                    <SkillMark name={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
