import FigureLabel from "@/components/primitives/FigureLabel";
import Reveal from "@/components/primitives/Reveal";
import SkillMark from "@/components/primitives/SkillMark";
import { skillsArr, skillsFlat } from "@/constants/skills";

type Props = { index?: string; headingId?: string };

/**
 * lenis.dev's "Why smooth scroll?": the heading holds its place a third of
 * the way down the screen while the disciplines scroll up past it, each
 * rising in as it arrives. Pure `position: sticky` - nothing to arm, and
 * on small screens it is simply a heading over a list.
 */
export default function Toolkit({ index = "04", headingId = "toolkit-heading" }: Props) {
  return (
    <section id="toolkit" className="band shell" aria-labelledby={headingId}>
      <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
        <div className="lg:sticky lg:top-[26vh] lg:col-span-5 lg:self-start" data-lit>
          <FigureLabel index={index} label="toolkit" className="w-full" />
          <Reveal
            as="h2"
            id={headingId}
            mode="words"
            className="mt-10 font-display text-d1 font-medium text-ink"
          >
            What I reach for, <span className="lit">daily</span>.
          </Reveal>
          <Reveal as="p" mode="fade" delay={0.1} className="mt-8 max-w-md text-ink-2">
            {skillsArr.length} disciplines, {skillsFlat.length} tools — grounded in Python and
            TypeScript, with enough infrastructure and AI tooling to own a feature from schema
            to production URL.
          </Reveal>
        </div>

        <ol className="border-t border-rule lg:col-span-6 lg:col-start-7">
          {skillsArr.map((group, i) => (
            <Reveal
              as="li"
              key={group.category}
              mode="rise"
              className="group border-b border-rule py-9 lg:py-12"
              data-ink
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-d3 font-medium text-ink">
                  <span className="mr-4 font-mono text-[0.75rem] tracking-[0.16em] text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {group.category}
                </h3>
                <span className="tag tabular-nums">
                  {String(group.items.length).padStart(2, "0")} tools
                </span>
              </div>

              {/* The ink bar runs under the heading as the row is read. */}
              <div aria-hidden className="mt-5 h-px w-full bg-rule">
                <div className="ink-fill h-full bg-accent" />
              </div>

              <p className="mt-5 text-ink-2">{group.caption}</p>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    <SkillMark name={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
