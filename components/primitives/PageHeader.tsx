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
    <header className="relative border-b border-rule pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="shell relative z-[1]">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pb-8">
          <p className="tag tag--accent flex items-center gap-2">
            <span className="block h-1.5 w-1.5 rounded-full bg-accent" />
            {label} <span className="opacity-50 mx-1">/</span> {index}
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

        <div className="pt-6 md:pt-10">
          <Reveal
            as="h1"
            id={headingId}
            mode="words"
            immediate
            className="font-display text-[clamp(3rem,9vw,8rem)] font-normal leading-[0.9] tracking-[-0.03em] text-ink"
          >
            {title}
          </Reveal>

          {intro && (
            <Reveal
              as="p"
              mode="rise"
              delay={0.24}
              immediate
              className="measure mt-10 text-xl sm:text-2xl font-display leading-tight tracking-[-0.02em] text-ink-2"
            >
              {intro}
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}
