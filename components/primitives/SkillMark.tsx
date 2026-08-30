import { SKILL_ICONS } from "./skill-icons";

/**
 * Small monochrome brand mark for a tool. Tools without a brand icon —
 * Cursor, Claude Code, Devin, Ollama, and the practice entries — fall
 * back to a mono initial so every chip keeps the same measure.
 */
export default function SkillMark({ name }: { name: string }) {
  const icon = SKILL_ICONS[name];

  if (icon) {
    return (
      <svg
        aria-hidden
        viewBox={icon.viewBox}
        className="h-3.5 w-3.5 shrink-0 fill-current text-ink-3"
      >
        {icon.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    );
  }

  return (
    <span
      aria-hidden
      className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center font-mono text-[0.6rem] leading-none text-ink-3"
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}
