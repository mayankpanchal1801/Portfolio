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
    <header className={clsx("border-t border-rule pt-5", className)}>
      <div className="grid-12">
        <div className="col-span-12 md:col-span-3 lg:col-span-2 flex items-baseline gap-3 md:block">
          <span className="marginal text-accent-ink">{index}</span>
          <span className="marginal md:mt-2 md:block">{label}</span>
        </div>

        <div className="col-span-12 md:col-span-9 lg:col-span-10 mt-4 sm:mt-6 md:mt-0">
          <Reveal
            as="h2"
            mode="words"
            id={headingId}
            className="font-display text-d2 text-ink max-w-[19ch] lg:max-w-[24ch]"
          >
            {title}
          </Reveal>

          {intro && (
            <Reveal
              as="p"
              mode="fade"
              delay={0.12}
              className="mt-4 sm:mt-6 measure text-base sm:text-lede text-ink-2 leading-relaxed"
            >
              {intro}
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}
