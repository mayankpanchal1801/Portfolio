import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * The lenis.dev label flip. Two copies of the text share one grid cell;
 * hovering the nearest link or button folds one away and unfolds the
 * other (see `.roll` in globals.css). The copy is aria-hidden, so the
 * accessible name is read once.
 */
export default function Roll({ children, className }: Props) {
  return (
    <span className={clsx("roll", className)}>
      <span className="roll__a">{children}</span>
      <span aria-hidden className="roll__b">
        {children}
      </span>
    </span>
  );
}
