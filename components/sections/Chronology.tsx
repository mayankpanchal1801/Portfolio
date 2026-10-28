"use client";

import Reveal from "@/components/primitives/Reveal";
import SectionHead from "@/components/primitives/SectionHead";
import { experienceArr } from "@/constants/experience";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/split-text";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useRef } from "react";

type Props = { full?: boolean; index?: string; headingId?: string };

const work = experienceArr.filter((e) => e.type === "work");
const education = experienceArr.find((e) => e.type === "education");

/**
 * Career as a promotion ladder: a progress line draws down the page as you
 * scroll, and each rung lights up when reached. Four levels, one company.
 */
export default function Chronology({
  full = false,
  index = "04",
  headingId = "chronology-heading",
}: Props) {
  const rootRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;

      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 65%", end: "bottom 65%", scrub: 0.4 },
        },
      );

      root.querySelectorAll<HTMLElement>("[data-rung]").forEach((rung) => {
        const dot = rung.querySelector("[data-dot]");
        gsap.from(rung.querySelector("[data-card]"), {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: rung, start: "top 82%", once: true },
        });
        if (dot) {
          ScrollTrigger.create({
            trigger: rung,
            start: "top 65%",
            toggleClass: { targets: dot, className: "is-on" },
          });
        }
      });
    },
    { scope: rootRef },
  );

  return (
    <section id="experience" className="band shell" aria-labelledby={headingId}>
      <SectionHead
        index={index}
        label="Career"
        headingId={headingId}
        title={
          <>
            Associate to Lead, <span className="text-signal">one team</span>.
          </>
        }
        intro="From translating Figma files to setting technical strategy for 15+ products - each step earned by shipping."
      />

      <div className="relative mt-16">
        <div aria-hidden className="absolute bottom-0 left-[11px] top-2 w-px bg-rule-strong md:left-[calc(16.66%-1px)]">
          <div ref={fillRef} className="h-full origin-top bg-accent" />
        </div>

        <ol ref={rootRef} className="space-y-10 md:space-y-14">
          {work.map((job, i) => (
            <li key={job.dateStart} data-rung className="relative grid gap-5 pl-10 md:grid-cols-12 md:gap-8 md:pl-0">
              <span
                data-dot
                aria-hidden
                className="tl-dot absolute left-0 top-2 h-[23px] w-[23px] rounded-full border border-rule-strong bg-paper md:left-[calc(16.66%-12px)]"
              />

              <div className="md:col-span-2 md:pr-8 md:text-right">
                <p className="tag tag--accent tabular-nums">L{work.length - i}</p>
                <p className="tag mt-2 tabular-nums">{job.date}</p>
              </div>

              <div data-card className="md:col-span-9 md:col-start-4">
                <div className="panel p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-display text-d3 text-ink">{job.title}</h3>
                    <p className="font-mono text-xs text-ink-3">{job.location}</p>
                  </div>
                  <p className="mt-1 text-sm text-accent-ink">{job.company}</p>

                  {!full && <p className="mt-4 max-w-2xl text-ink-2">{job.description}</p>}

                  <ul className={clsx("space-y-2.5 text-sm text-ink-2", full ? "mt-5" : "mt-5 hidden md:block")}>
                    {full && <li className="mb-4 text-base text-ink-2">{job.description}</li>}
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {job.stack && (
                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {job.stack.slice(0, full ? undefined : 8).map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-rule px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-3"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        {education && (
          <Reveal mode="fade" className="mt-14 grid gap-4 pl-10 md:grid-cols-12 md:gap-8 md:pl-0">
            <p className="tag tabular-nums md:col-span-2 md:pr-8 md:text-right">{education.date}</p>
            <div className="md:col-span-9 md:col-start-4">
              <p className="font-display text-lg text-ink">{education.title}</p>
              <p className="text-sm text-ink-3">
                {education.company} · {education.location}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
