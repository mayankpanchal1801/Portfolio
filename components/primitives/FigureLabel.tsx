import clsx from "clsx";

type Props = {
  /** The plate number — "01", "A2", "P1". Rendered in its own box. */
  index: string;
  label: string;
  /** Extend the hairline rule out to the end of the column. */
  rule?: boolean;
  className?: string;
};

/**
 * "fig. 01 — selected work"
 *
 * Every block on the site is a numbered plate. That numbering is the
 * reference's whole information architecture and it survives here intact,
 * just set in monospace with a boxed numeral and a rule running out of it
 * instead of a pencil note in the margin.
 */
export default function FigureLabel({ index, label, rule = true, className }: Props) {
  return (
    <p className={clsx("fig", className)}>
      <span className="fig__n">fig. {index}</span>
      <span aria-hidden>—</span>
      <span className="fig__label">{label}</span>
      {rule && <span aria-hidden className="fig__rule" />}
    </p>
  );
}
