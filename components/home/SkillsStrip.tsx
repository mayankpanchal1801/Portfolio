"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import SkillLogo from "@/components/shared/SkillLogo";
import { skillsArr, type SkillGroup } from "@/constants/skills";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs";

export default function SkillsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState<number>(0);

  const total = skillsArr.reduce((n, g) => n + g.items.length, 0);

  useGSAP(() => {
    const rows = sectionRef.current?.querySelectorAll("[data-skill-row]");
    if (!rows || !rows.length) return;
    gsap.from(rows, {
      y: 28,
      opacity: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: "expo.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section relative"
      aria-labelledby="skills-heading"
    >
      <span className="ghost-num left-[-3rem] top-4">04</span>

      <div className="container relative z-10">
        <SectionHeading
          number="04"
          eyebrow="Toolkit"
          title="What I reach for, day to day."
          intro="Grounded in React, Next.js, and TypeScript — with enough backend, infra, and AI tooling to own features from Figma to production URL."
        />

        {/* Meta strip */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <span className="eyebrow">Index</span>
          <span className="eyebrow tabular-nums">
            {skillsArr.length} categories &middot; {total} tools
          </span>
        </div>

        <div className="border-t border-fog" role="list">
          {skillsArr.map((group, i) => (
            <SkillRow
              key={group.category}
              group={group}
              index={i}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Individual accordion row
   ───────────────────────────────────────────────────────────── */

type RowProps = {
  group: SkillGroup;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function SkillRow({ group, index, isOpen, onToggle }: RowProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  useGSAP(() => {
    const content = contentRef.current;
    if (!content) return;
    if (!isOpen) return;

    // Skip stagger animation on first mount so the default-open row
    // doesn't visibly re-run its intro every navigation.
    const skipInitial = firstRun.current;
    firstRun.current = false;

    const items = content.querySelectorAll<HTMLElement>("[data-skill-item]");
    const caption = content.querySelector<HTMLElement>("[data-caption]");

    if (skipInitial) return;

    if (caption) {
      gsap.fromTo(
        caption,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: "expo.out", overwrite: true }
      );
    }
    gsap.fromTo(
      items,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.03,
        delay: 0.12,
        ease: "expo.out",
        overwrite: true,
      }
    );
  }, [isOpen]);

  return (
    <div
      data-skill-row
      role="listitem"
      className={`border-b border-fog transition-colors ${
        isOpen ? "bg-char/60" : "hover:bg-char/30"
      }`}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`skill-panel-${index}`}
        onClick={onToggle}
        className="group w-full flex items-center justify-between gap-4 md:gap-8 py-6 md:py-8 text-left cursor-pointer px-1 md:px-2"
        data-cursor="hover"
      >
        <div className="flex items-baseline gap-4 md:gap-8 flex-1 min-w-0">
          <span
            className={`font-mono text-xs md:text-sm tabular-nums transition-colors ${
              isOpen ? "text-acid" : "text-ash group-hover:text-acid"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-serif text-2xl md:text-4xl lg:text-5xl leading-none transition-colors truncate ${
              isOpen ? "italic-wonk text-acid" : "text-bone"
            }`}
          >
            {group.category}
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-5 shrink-0">
          <span className="hidden md:inline font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ash tabular-nums">
            {String(group.items.length).padStart(2, "0")} tools
          </span>
          <span
            aria-hidden
            className={`inline-flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full border transition-all duration-300 ${
              isOpen
                ? "border-acid text-acid rotate-90 bg-acid/5"
                : "border-fog text-pearl group-hover:border-bone group-hover:text-bone"
            }`}
          >
            <BsArrowRight />
          </span>
        </div>
      </button>

      {/* Expanding content — CSS grid-template-rows trick for smooth height animation */}
      <div
        id={`skill-panel-${index}`}
        className="grid transition-[grid-template-rows] duration-500 ease-out-expo"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        aria-hidden={!isOpen}
      >
        <div className="overflow-hidden">
          <div ref={contentRef} className="pb-8 md:pb-10 px-1 md:px-2">
            <div className="ml-8 md:ml-16 max-w-4xl">
              <p
                data-caption
                className="font-serif italic-wonk text-lg md:text-2xl text-pearl mb-6 md:mb-8 max-w-[38ch] leading-snug"
              >
                {group.caption}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
                {group.items.map((item, j) => (
                  <li
                    key={item}
                    data-skill-item
                    className="group/item flex items-center gap-3 md:gap-4 py-3 border-b border-fog/70"
                  >
                    <span className="font-mono text-[0.62rem] tabular-nums text-ash w-6 shrink-0 group-hover/item:text-acid transition-colors">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <SkillLogo name={item} />
                    <span className="flex-1 min-w-0 text-bone text-base md:text-lg leading-tight group-hover/item:text-acid group-hover/item:translate-x-1 transition-[color,transform] duration-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
