"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import { experienceArr } from "@/constants/experience";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function ExperienceStrip() {
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 70%",
          end: "bottom 90%",
          scrub: 0.4,
        },
      });
    }
    const items = listRef.current ? (Array.from(listRef.current.children) as HTMLElement[]) : [];
    items.forEach((el, i) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        delay: i * 0.06,
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
      });
      const chips = el.querySelectorAll<HTMLElement>("[data-chip]");
      if (chips.length) {
        gsap.from(chips, {
          y: 10,
          opacity: 0,
          duration: 0.4,
          stagger: 0.03,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none reverse" },
        });
      }
    });
  }, []);

  return (
    <section id="experience" className="section relative bg-char" aria-labelledby="experience-heading">
      <span className="ghost-num right-[-4rem] top-4">05</span>
      <div className="container relative z-10">
        <SectionHeading
          number="05"
          eyebrow="Chronology"
          title="Four years, one company, four roles."
          intro="Grew from Associate to Lead Software Engineer at Screen Interactiv (Screetract OPC) in Bengaluru — 15+ projects shipped across the frontend and backend, plus AI-augmented interfaces."
        />

        <div className="relative">
          <div className="absolute left-6 md:left-1/4 top-0 bottom-0 w-px bg-fog" aria-hidden />
          <span
            ref={lineRef}
            className="absolute left-6 md:left-1/4 top-0 bottom-0 w-px bg-acid origin-top scale-y-0"
            aria-hidden
          />
          <ol ref={listRef} className="pl-14 md:pl-0">
            {experienceArr.map((item, i) => (
              <li
                key={`${item.title}-${i}`}
                className="relative grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 py-10 border-b border-fog"
              >
                <span
                  className="absolute left-[-1.85rem] md:left-[calc(25%-6px)] top-11 w-3 h-3 rounded-full bg-acid"
                  aria-hidden
                />
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-acid">
                    {item.type === "work" ? "Work" : "Education"}
                  </p>
                  <p className="font-mono text-sm text-pearl mt-1">{item.date}</p>
                  <p className="font-mono text-xs text-ash mt-1">{item.location}</p>
                </div>

                <div className="md:col-span-3">
                  <h3 className="font-serif text-2xl md:text-4xl text-bone">{item.title}</h3>
                  <p className="italic-wonk text-acid mt-1 text-lg">{item.company}</p>

                  {item.description && <p className="mt-4 text-pearl max-w-measure">{item.description}</p>}

                  {item.bullets.length > 0 && (
                    <ul className="mt-5 space-y-2 text-pearl">
                      {item.bullets.slice(0, 4).map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="text-acid select-none">→</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.stack && item.stack.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.stack.map((t) => (
                        <li
                          key={t}
                          data-chip
                          className="px-2.5 py-1 rounded-full font-mono text-[0.62rem] uppercase tracking-[0.14em] border border-fog text-pearl"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
