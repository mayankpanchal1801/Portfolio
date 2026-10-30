import FigureLabel from "@/components/primitives/FigureLabel";
import LocalTime from "@/components/primitives/LocalTime";
import Reveal from "@/components/primitives/Reveal";
import { contact } from "@/constants/personal";

type Props = {
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  headingId: string;
  /** Optional extra fact shown in the telemetry row, e.g. an entry count. */
  meta?: string;
};

/**
 * The opening plate shared by every non-home page.
 *
 * All four pages start their first text block on the same line
 * (`--top-line`), so moving between them reads as turning a page in one
 * book rather than arriving somewhere else.
 */
export default function PageHeader({ index, label, title, intro, headingId, meta }: Props) {
  return (
    <header className="relative border-b border-rule pb-16 pt-(--top-line) md:pb-24" data-lit>
      <div className="shell relative z-[1]">
        {/* Telemetry row — where you are, how many, what time it is here. */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-rule pb-6">
          <FigureLabel index={index} label={label} rule={false} />
          {meta && <p className="tag hidden md:block">{meta}</p>}
          <p className="tag flex items-center gap-2 tabular-nums">
            <span>{contact.city}</span>
            <span aria-hidden className="text-rule-strong">
              /
            </span>
            <LocalTime />
          </p>
        </div>

        <div className="pt-10 md:pt-14">
          <Reveal
            as="h1"
            id={headingId}
            mode="words"
            immediate
            className="font-display text-d1 font-medium text-ink"
          >
            {title}
          </Reveal>

          {intro && (
            <Reveal
              as="p"
              mode="rise"
              delay={0.24}
              immediate
              className="measure mt-10 text-lede text-ink-2"
            >
              {intro}
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}
