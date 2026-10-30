"use client";

import FigureLabel from "@/components/primitives/FigureLabel";
import Magnetic from "@/components/primitives/Magnetic";
import Reveal from "@/components/primitives/Reveal";
import Roll from "@/components/primitives/Roll";
import { featuredProjects } from "@/constants/projects";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { scrollProgress } from "@/lib/progress";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Selected work as the lenis.dev showcase reel.
 *
 * On a large screen with motion allowed the section grows by exactly the
 * reel's overflow and its viewport sticks, so vertical scroll walks the
 * reel sideways - sticky rather than a GSAP pin, so there is no spacer to
 * re-measure and nothing jumps when Lenis settles. Each picture drifts
 * against the travel inside its own frame.
 *
 * Unarmed (touch, small screens, reduced motion, no script) the very same
 * markup is a native swipe row with snap points.
 */
export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const total = featuredProjects.length;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>("[data-card]", track);
          let distance = 0;
          let centres: number[] = [];
          let current = -1;

          // Runs before every refresh, so the section is the right height
          // by the time ScrollTrigger measures where it starts and ends.
          const measure = () => {
            distance = Math.max(0, track.scrollWidth - section.clientWidth);
            section.style.setProperty("--distance", `${distance}px`);
            centres = cards.map((c) => c.offsetLeft + c.offsetWidth / 2);
          };

          const place = (p: number) => {
            const half = section.clientWidth / 2;
            const shift = p * distance;
            let nearest = 0;
            let best = Infinity;
            cards.forEach((card, i) => {
              const x = (centres[i] - shift - half) / half;
              card.style.setProperty("--x", gsap.utils.clamp(-1.5, 1.5, x).toFixed(3));
              if (Math.abs(x) < best) {
                best = Math.abs(x);
                nearest = i;
              }
            });
            if (nearest !== current && countRef.current) {
              current = nearest;
              countRef.current.textContent = pad(nearest + 1);
            }
          };

          section.dataset.armed = "";
          measure();
          ScrollTrigger.addEventListener("refreshInit", measure);
          const st = scrollProgress(section, { onUpdate: place });

          return () => {
            ScrollTrigger.removeEventListener("refreshInit", measure);
            st.kill();
            delete section.dataset.armed;
            section.style.removeProperty("--distance");
            section.style.removeProperty("--p");
            for (const card of cards) card.style.removeProperty("--x");
          };
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="showcase relative"
      aria-labelledby="work-heading"
    >
      <div className="showcase__sticky py-(--rhythm)">
        {/* Telemetry: which plate the reel is centred on. */}
        <div className="shell flex items-center justify-between gap-6">
          <FigureLabel index="02" label="selected work" rule={false} />
          <p className="tag tabular-nums">
            <span ref={countRef} className="text-accent">
              01
            </span>{" "}
            / {pad(total)}
          </p>
        </div>

        <div className="showcase__viewport no-scrollbar mt-10 snap-x snap-mandatory scroll-px-(--gutter) overflow-x-auto lg:mt-12">
          <ul ref={trackRef} className="showcase__track relative items-stretch">
            {/* The reel opens on its own title card. */}
            <li className="flex w-[min(84vw,28rem)] shrink-0 snap-start flex-col gap-8 lg:w-[clamp(22rem,30vw,30rem)] lg:justify-between lg:gap-10 lg:pr-6">
              <Reveal
                as="h2"
                id="work-heading"
                mode="words"
                className="font-display text-[clamp(2.5rem,min(5vw,9svh),4.75rem)] font-medium leading-[0.96] tracking-[-0.04em] text-ink"
              >
                Things I&rsquo;ve <span className="text-accent">shipped</span>.
              </Reveal>
              <div>
                <p className="text-ink-2">
                  Products and platforms across SaaS, events, manufacturing and travel —
                  designed, built and run end to end.
                </p>
                <p aria-hidden className="tag mt-8 flex items-center gap-3 text-ink-3">
                  <span className="h-px w-10 bg-accent" />
                  <span className="lg:hidden">swipe</span>
                  <span className="hidden lg:inline">keep scrolling</span>
                </p>
              </div>
            </li>

            {featuredProjects.map((project, i) => (
              <li
                key={project.slug}
                data-card
                className="w-[min(78vw,26rem)] shrink-0 snap-start lg:w-[clamp(20rem,min(32vw,62svh),32rem)]"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="showcase__card group block"
                  data-cursor="View"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border border-rule bg-paper-2">
                    {project.imgSrc && (
                      <Image
                        src={project.imgSrc}
                        alt={`${project.title} - interface screenshot`}
                        fill
                        sizes="(min-width: 1024px) 32vw, 78vw"
                        className="showcase__img object-cover object-top"
                      />
                    )}
                    <span aria-hidden className="showcase__veil absolute inset-0" />
                    <span className="tag absolute left-3 top-3 border border-rule-strong bg-paper/85 px-2.5 py-1.5 text-ink backdrop-blur tabular-nums">
                      fig. 02.{pad(i + 1)}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-ink px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-paper">
                      {project.category}
                    </span>
                    <span
                      aria-hidden
                      className="showcase__go absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-accent text-lg text-on-accent"
                    >
                      ↗
                    </span>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="truncate font-display text-[1.35rem] font-medium tracking-[-0.025em] text-ink transition-colors duration-500 group-hover:text-accent-ink">
                      {project.title}
                    </h3>
                    <span className="tag shrink-0 tabular-nums">{project.year}</span>
                  </div>
                  <p className="mt-1 truncate text-sm text-ink-3">
                    {project.client ?? project.subtitle}
                  </p>
                </Link>
              </li>
            ))}

            {/* …and closes on the way out, like the reference's "want to see more?". */}
            <li className="flex w-[min(84vw,24rem)] shrink-0 snap-start flex-col justify-center gap-8 lg:w-[clamp(20rem,26vw,26rem)] lg:pl-8">
              <p className="font-display text-d2 font-medium text-ink">
                Want to see <span className="text-accent">more</span>?
              </p>
              <p className="text-sm text-ink-2">
                Every entry has a case study — the brief, the stack, and what shipped.
              </p>
              <div>
                <Magnetic>
                  <Link href="/projects" className="btn btn-solid" data-cursor="Open">
                    <Roll>All projects →</Roll>
                  </Link>
                </Magnetic>
              </div>
            </li>
          </ul>
        </div>

        {/* Reel progress — the one bar that says how far through you are. */}
        <div className="showcase__rail shell mt-10 hidden items-center gap-6 lg:mt-12">
          <span className="tag">00</span>
          <div className="h-px flex-1 bg-rule">
            <div className="showcase__meter h-full bg-accent" />
          </div>
          <span className="tag tabular-nums">{pad(total)}</span>
        </div>
      </div>
    </section>
  );
}
