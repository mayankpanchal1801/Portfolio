import FigureLabel from "@/components/primitives/FigureLabel";
import Reveal from "@/components/primitives/Reveal";
import clsx from "clsx";

type Props = {
  /** Figure number, e.g. "02". */
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Element id so the owning <section> can point aria-labelledby at it. */
  headingId: string;
  className?: string;
};

/**
 * Standard plate opening: the figure label, then the display heading.
 *
 * `data-lit` arms every `.lit` phrase inside the heading - the ink
 * director swipes them in when the block is 80% up the viewport.
 */
export default function SectionHead({ index, label, title, intro, headingId, className }: Props) {
  return (
    <div className={clsx("grid gap-8 lg:grid-cols-12", className)} data-lit>
      <div className="lg:col-span-12">
        {/* w-full so the hairline rule runs out to the end of the column. */}
        <FigureLabel index={index} label={label} className="w-full" />
      </div>

      <Reveal
        as="h2"
        id={headingId}
        mode="words"
        className="font-display text-d1 font-medium text-ink lg:col-span-8"
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
