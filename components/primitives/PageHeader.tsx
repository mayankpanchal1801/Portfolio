import LocalTime from "@/components/primitives/LocalTime";
import Reveal from "@/components/primitives/Reveal";
import { contact } from "@/constants/personal";

type Props = {
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  headingId: string;
  /** Optional extra fact shown in the ribbon, e.g. an entry count. */
  meta?: string;
};

/** The opening block shared by every non-home page. */
export default function PageHeader({
  index,
  label,
  title,
  intro,
  headingId,
  meta,
}: Props) {
  return (
    <header className="ruled border-b border-rule pb-14 pt-12 md:pb-20 md:pt-16">
      <div className="shell relative z-[1]">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-rule pb-4">
          <p className="tag tag--accent">
            {label} · {index}
          </p>
          {meta && <p className="tag hidden md:block">{meta}</p>}
          <p className="tag flex items-center gap-2 tabular-nums">
            <span>{contact.city}</span>
            <span aria-hidden className="text-rule-strong">
              /
            </span>
            <LocalTime />
          </p>
        </div>

        <Reveal
          as="h1"
          id={headingId}
          mode="words"
          immediate
          className="-ml-[0.045em] mt-10 max-w-[16ch] font-display text-d1 font-semibold text-ink md:mt-14"
        >
          {title}
        </Reveal>

        {intro && (
          <Reveal
            as="p"
            mode="rise"
            delay={0.24}
            immediate
            className="measure mt-7 text-lede text-ink-2"
          >
            {intro}
          </Reveal>
        )}
      </div>
    </header>
  );
}
