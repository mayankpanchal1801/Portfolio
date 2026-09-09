import Reveal from "@/components/primitives/Reveal";
import clsx from "clsx";

type Props = {
  /** Section number set in the left margin, e.g. "02". */
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Element id so the owning <section> can point aria-labelledby at it. */
  headingId: string;
  className?: string;
};

/**
 * The standard section opening: a ruled line, a margin-set number and
 * label, then the display heading. Every band on the site uses it, which
 * is what makes the page rhythm read as one system.
 */
export default function SectionHead({
  index,
  label,
  title,
  intro,
  headingId,
  className,
}: Props) {
  return (
    <header className={clsx("border-t border-rule pt-8 md:pt-12", className)}>
      <div className="grid-12 items-start">
        <div className="col-span-12 md:col-span-3 lg:col-span-3 flex items-baseline gap-4 md:flex-col md:gap-3">
          <span className="marginal flex items-center gap-2 text-accent-ink">
            <span aria-hidden className="block h-px w-4 bg-accent-ink"></span>
            {index}
          </span>
          <span className="tag text-ink-3 md:mt-2">{label}</span>
        </div>

        <div className="col-span-12 md:col-span-9 lg:col-span-8 mt-6 md:mt-0">
          <Reveal
            as="h2"
            mode="words"
            id={headingId}
            className="font-display text-[clamp(2rem,6vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink"
          >
            {title}
          </Reveal>

          {intro && (
            <Reveal
              as="p"
              mode="fade"
              delay={0.12}
              className="mt-6 sm:mt-8 measure text-lg sm:text-xl text-ink-2 leading-relaxed"
            >
              {intro}
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}
