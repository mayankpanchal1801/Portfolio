import Reveal from "@/components/primitives/Reveal";
import clsx from "clsx";

type Props = {
  /** Section number, e.g. "02". */
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Element id so the owning <section> can point aria-labelledby at it. */
  headingId: string;
  className?: string;
};

/** Standard section opening: mono eyebrow with a drawn rule, then the display heading. */
export default function SectionHead({ index, label, title, intro, headingId, className }: Props) {
  return (
    <div className={clsx("grid gap-8 lg:grid-cols-12", className)}>
      <div className="lg:col-span-12">
        <p className="tag tag--accent flex items-center gap-4">
          <span className="tabular-nums">{index}</span>
          <span aria-hidden className="h-px w-12 bg-accent-line" />
          {label}
        </p>
      </div>

      <Reveal
        as="h2"
        id={headingId}
        mode="words"
        className="font-display text-d1 font-normal text-ink lg:col-span-8"
      >
        {title}
      </Reveal>

      {intro && (
        <Reveal
          as="p"
          mode="fade"
          delay={0.1}
          className="text-ink-2 lg:col-span-4 lg:self-end lg:pb-3"
        >
          {intro}
        </Reveal>
      )}
    </div>
  );
}
