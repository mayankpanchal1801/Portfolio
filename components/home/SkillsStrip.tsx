"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import { skillsArr } from "@/constants/skills";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function SkillsStrip() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const groups = Array.from(grid.children) as HTMLElement[];
    groups.forEach((g, i) => {
      gsap.from(g, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "expo.out",
        delay: (i % 2) * 0.08,
        scrollTrigger: { trigger: g, start: "top 88%", toggleActions: "play none none reverse" },
      });
      const items = g.querySelectorAll<HTMLElement>("[data-skill]");
      gsap.from(items, {
        y: 12,
        opacity: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: "power3.out",
        scrollTrigger: { trigger: g, start: "top 85%", toggleActions: "play none none reverse" },
      });
    });
  }, []);

  return (
    <section id="skills" className="section relative" aria-labelledby="skills-heading">
      <span className="ghost-num left-[-3rem] top-4">04</span>
      <div className="container relative z-10">
        <SectionHeading
          number="04"
          eyebrow="Toolkit"
          title="What I reach for, day to day."
          intro="Grounded in React, Next.js, and TypeScript — with enough backend, infra, and AI tooling to own features from Figma to production URL."
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-14">
          {skillsArr.map((group, i) => (
            <div key={group.category} className="border-t border-bone/80 pt-6">
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-serif text-2xl text-bone">{group.category}</h3>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-acid">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-sm text-ash italic-wonk mb-5">{group.caption}</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    data-skill
                    className="text-pearl hover:text-acid transition-colors cursor-default font-mono text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
