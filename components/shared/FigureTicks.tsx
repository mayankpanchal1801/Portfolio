/**
 * Four acid L-shape corner ticks — wraps any positioned parent
 * to turn it into a "spec figure" (used on portrait, cards, etc.).
 */
export default function FigureTicks() {
  return (
    <>
      <span
        className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t border-l border-acid pointer-events-none"
        aria-hidden
      />
      <span
        className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t border-r border-acid pointer-events-none"
        aria-hidden
      />
      <span
        className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b border-l border-acid pointer-events-none"
        aria-hidden
      />
      <span
        className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b border-r border-acid pointer-events-none"
        aria-hidden
      />
    </>
  );
}
