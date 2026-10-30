import clsx from "clsx";

/**
 * Hairline vector marks — the drafting furniture a surface is built from.
 *
 * This is the instrument-panel answer to a hand-drawn Rough.js outline: the
 * same job (give a plain rectangle a drawn personality) done with 1px
 * vectors instead of wobble. Arm lengths and tick offsets come from a
 * stable hash of `seed`, so a given card keeps the same marks on every
 * visit while no two cards on a page are identical.
 *
 * Each corner is its own fixed-size SVG, so a non-uniform parent never
 * stretches the geometry.
 */

export type MarkPreset = "brackets" | "scale" | "crosshair";

type Props = {
  preset?: MarkPreset;
  /** Any stable string - the slug, the title. Same seed, same marks. */
  seed?: string;
  /** Draw in the accent instead of the rule colour. */
  accent?: boolean;
  className?: string;
};

/** FNV-1a — small, stable, and identical on server and client. */
function hash(key: string) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** rotate / translate per corner, clockwise from top-left. */
const CORNERS = [
  { position: "left-0 top-0", rotate: 0 },
  { position: "right-0 top-0", rotate: 90 },
  { position: "right-0 bottom-0", rotate: 180 },
  { position: "left-0 bottom-0", rotate: 270 },
] as const;

export default function Mark({ preset = "brackets", seed = "mark", accent, className }: Props) {
  const h = hash(seed);
  const stroke = clsx("mark__line", accent && "mark__line--accent");

  if (preset === "crosshair") {
    // A single registration cross — used where a corner would be too loud.
    return (
      <span aria-hidden className={clsx("mark", className)}>
        <svg viewBox="0 0 14 14" className="absolute right-2 top-2 h-3.5 w-3.5">
          <path d="M7 0.5 V13.5 M0.5 7 H13.5" className={stroke} />
        </svg>
      </span>
    );
  }

  if (preset === "scale") {
    // A tick scale along the top edge: twelve ticks, every third one long.
    return (
      <span aria-hidden className={clsx("mark", className)}>
        <svg
          viewBox="0 0 120 8"
          preserveAspectRatio="none"
          className="absolute inset-x-3 top-0 h-2"
        >
          {Array.from({ length: 12 }, (_, i) => {
            const long = i % 3 === 0;
            return (
              <path
                key={i}
                d={`M${i * 10 + 5} 0 V${long ? 7 : 3.5}`}
                className={stroke}
                opacity={long ? 1 : 0.55}
              />
            );
          })}
        </svg>
      </span>
    );
  }

  // brackets — four corner Ls, each arm 10–15px depending on the seed.
  return (
    <span aria-hidden className={clsx("mark", className)}>
      {CORNERS.map((corner, i) => {
        const arm = 10 + ((h >> (i * 3)) % 6);
        return (
          <svg
            key={corner.position}
            viewBox="0 0 20 20"
            className={clsx("absolute h-5 w-5", corner.position)}
            style={{ rotate: `${corner.rotate}deg` }}
          >
            <path d={`M0.5 ${arm} V0.5 H${arm}`} className={stroke} />
          </svg>
        );
      })}
    </span>
  );
}
