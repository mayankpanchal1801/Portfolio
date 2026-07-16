"use client";

import Reveal from "@/components/ui/Reveal";
import clsx from "clsx";

type Props = {
  eyebrow?: string;
  number?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({ eyebrow, number, title, intro, align = "left", className }: Props) {
  return (
    <header
      className={clsx(
        "mb-14 md:mb-20 flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {(eyebrow || number) && (
        <div className="flex items-center gap-3">
          {number && <span className="font-mono text-eyebrow text-acid">{number}</span>}
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        </div>
      )}
      <Reveal as="h2" mode="words" className="font-serif text-h2 text-bone max-w-4xl">
        {title}
      </Reveal>
      {intro && (
        <Reveal as="p" mode="fade" delay={0.1} className={clsx("text-pearl text-lede max-w-measure", align === "center" && "mx-auto")}>
          {intro}
        </Reveal>
      )}
    </header>
  );
}
