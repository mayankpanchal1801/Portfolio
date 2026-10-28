"use client";

import Panel from "@/components/primitives/Panel";
import SectionHead from "@/components/primitives/SectionHead";
import { featuredProjects } from "@/constants/projects";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

/**
 * Selected work as a horizontal reel. On large screens with motion allowed
 * the section pins and vertical scroll drives the track sideways; elsewhere
 * (touch, small screens, reduced motion) it is an ordinary stacked list or a
 * natively scrollable row, so nothing depends on the pin.
 */
export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const total = featuredProjects.length;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!section || !viewport || !track) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        gsap.set(viewport, { overflow: "hidden" });

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.25}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
              if (countRef.current) {
                const n = Math.min(total, Math.floor(self.progress * total) + 1);
                countRef.current.textContent = String(n).padStart(2, "0");
              }
            },
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative flex flex-col justify-center py-[var(--rhythm)] lg:min-h-[100svh] lg:py-0 lg:pt-24"
      aria-labelledby="work-heading"
    >
      <div className="shell w-full">
        <SectionHead
          index="01"
          label="Selected work"
          headingId="work-heading"
          title={
            <>
              Things I&rsquo;ve <span className="text-signal">shipped</span>.
            </>
          }
          intro="Products and platforms across SaaS, events, manufacturing and travel — designed, built and run end to end."
        />
      </div>

      <div
        ref={viewportRef}
        className="no-scrollbar mt-12 w-full overflow-x-auto pl-[var(--gutter)] lg:mt-14 lg:overflow-x-hidden"
      >
        <ul ref={trackRef} className="flex w-max flex-col gap-6 pr-[var(--gutter)] lg:flex-row lg:gap-8">
          {featuredProjects.map((p, i) => (
            <li key={p.slug} className="w-[calc(100vw-2*var(--gutter))] lg:w-[min(46vw,620px)] lg:shrink-0">
              <Panel
                as={Link}
                href={`/projects/${p.slug}`}
                data-cursor="View"
                className="group block h-full p-3 sm:p-4"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-paper-3">
                  {p.imgSrc && (
                    <Image
                      src={p.imgSrc}
                      alt={`${p.title} - interface screenshot`}
                      fill
                      sizes="(min-width: 1024px) 620px, 100vw"
                      className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />
                  )}
                  <span className="tag absolute left-3 top-3 rounded-full bg-paper/80 px-3 py-2 text-ink backdrop-blur">
                    {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 px-2 pb-2 pt-5">
                  <div className="min-w-0">
                    <p className="tag tag--accent">
                      {p.category} · {p.year}
                    </p>
                    <h3 className="mt-3 font-display text-d2 font-normal text-ink">{p.title}</h3>
                    <p className="mt-3 line-clamp-2 text-sm text-ink-2">{p.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 4).map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-rule px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-3"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span
                    aria-hidden
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-rule-strong text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
                  >
                    ↗
                  </span>
                </div>
              </Panel>
            </li>
          ))}
        </ul>
      </div>

      <div className="shell mt-10 flex w-full items-center gap-6 lg:mt-12">
        <p className="tag tabular-nums">
          <span ref={countRef} className="text-accent">01</span> / {String(total).padStart(2, "0")}
        </p>
        <div className="hidden h-px flex-1 bg-rule-strong lg:block">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent" />
        </div>
        <Link href="/projects" className="btn btn-outline ml-auto">
          All projects ↗
        </Link>
      </div>
    </section>
  );
}
