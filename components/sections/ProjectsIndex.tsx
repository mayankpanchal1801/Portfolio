"use client";

import Roll from "@/components/primitives/Roll";
import { projectsArr } from "@/constants/projects";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { scrollToTarget } from "@/lib/lenis";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");
const DECK = "(min-width: 1024px) and (min-height: 640px)";

/**
 * The project index as a deck of plates.
 *
 * Every project is a full plate that sticks under the header; the next
 * one slides up over it while the one beneath recedes - shrinking back
 * and dimming - so the stack reads as depth rather than a list. The rail
 * on the left is the deck's table of contents: it tracks the plate on
 * top and jumps to any other through Lenis.
 *
 * The stacking itself is plain `position: sticky` (see `.deck__item`), so
 * it works with no script at all; the script adds only the recession, the
 * picture drift and the rail. Below the breakpoint the deck is a list.
 */
export default function ProjectsIndex() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const total = projectsArr.length;

  // Natural document position of plate i: plate i always starts i pitches
  // below the list's top. Measured from heights and the row gap, never
  // from offsetTop - a stuck plate's offsetTop includes its sticky shift.
  const geometry = () => {
    const list = listRef.current;
    const items = list ? gsap.utils.toArray<HTMLElement>("[data-deck-item]", list) : [];
    const gap = list ? parseFloat(getComputedStyle(list).rowGap) || 0 : 0;
    const pitch = items.length ? items[0].offsetHeight + gap : 0;
    const stick = (i: number) => parseFloat(getComputedStyle(items[i]).top) || 0;
    return { list, items, pitch, stick };
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(`${DECK} and (prefers-reduced-motion: no-preference)`, () => {
        const { list, items } = geometry();
        if (!list || items.length < 2) return;

        items.forEach((item, i) => {
          const body = item.querySelector<HTMLElement>("[data-deck-body]");
          const picture = item.querySelector<HTMLElement>("[data-deck-img]");

          // The picture settles as its plate rises into place.
          if (picture) {
            ScrollTrigger.create({
              trigger: list,
              start: () => `top+=${geometry().pitch * i} bottom`,
              end: () => `top+=${geometry().pitch * i} top+=${geometry().stick(i)}`,
              invalidateOnRefresh: true,
              onUpdate: (self) =>
                picture.style.setProperty("--y", (1 - self.progress).toFixed(3)),
              onRefresh: (self) =>
                picture.style.setProperty("--y", (1 - self.progress).toFixed(3)),
            });
          }

          // …and recedes as the next plate rides up over it.
          if (body && i < items.length - 1) {
            ScrollTrigger.create({
              trigger: list,
              start: () => `top+=${geometry().pitch * (i + 1)} bottom`,
              end: () => `top+=${geometry().pitch * (i + 1)} top+=${geometry().stick(i + 1)}`,
              invalidateOnRefresh: true,
              onUpdate: (self) => body.style.setProperty("--d", self.progress.toFixed(3)),
              onRefresh: (self) => body.style.setProperty("--d", self.progress.toFixed(3)),
            });
          }
        });

        return () => {
          for (const item of items) {
            item.querySelector<HTMLElement>("[data-deck-body]")?.style.removeProperty("--d");
            item.querySelector<HTMLElement>("[data-deck-img]")?.style.removeProperty("--y");
          }
        };
      });

      // The rail only exists at deck sizes; it follows the plate on top.
      mm.add(DECK, () => {
        const { list, items } = geometry();
        if (!list || !items.length) return;
        items.forEach((_, i) => {
          ScrollTrigger.create({
            trigger: list,
            start: () => `top+=${geometry().pitch * i - 1} top+=${geometry().stick(i) + 40}`,
            end: () => `top+=${geometry().pitch * (i + 1) - 1} top+=${geometry().stick(i) + 40}`,
            invalidateOnRefresh: true,
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
      });

      return () => mm.revert();
    },
    { scope: listRef },
  );

  const jump = (i: number) => {
    const { list, pitch, stick } = geometry();
    if (!list || !window.matchMedia(DECK).matches) {
      scrollToTarget(`#project-${projectsArr[i].slug}`);
      return;
    }
    const top = list.getBoundingClientRect().top + window.scrollY;
    scrollToTarget(top + pitch * i - stick(i) + 2, { offset: 0 });
  };

  return (
    <section className="band shell" aria-labelledby="projects-index-heading">
      <h2 id="projects-index-heading" className="sr-only">
        Project index
      </h2>

      <div className="grid gap-x-10 lg:grid-cols-12">
        {/* ── Rail: the deck's table of contents. ── */}
        <nav
          aria-label="Projects in this index"
          className="deck-rail hidden self-start lg:sticky lg:top-[calc(var(--header-h)+3.5rem)] lg:col-span-3 lg:block xl:col-span-2"
        >
          <p className="tag tabular-nums">
            <span className="text-accent">{pad(active + 1)}</span> / {pad(total)}
          </p>
          <ol className="mt-6 border-t border-rule">
            {projectsArr.map((project, i) => (
              <li key={project.slug} className="border-b border-rule">
                <a
                  href={`#project-${project.slug}`}
                  aria-current={active === i ? "true" : undefined}
                  onClick={(e) => {
                    // Lenis's own #anchor handler listens on window and would
                    // aim at the plate's stuck position; the deck knows better.
                    e.preventDefault();
                    e.stopPropagation();
                    jump(i);
                  }}
                  className="group flex items-center gap-3 py-3 text-sm text-ink-3 transition-colors hover:text-ink"
                >
                  <span className="deck-rail__tick h-px w-5 shrink-0 bg-rule-strong" />
                  <span className="font-mono text-[0.66rem] tracking-[0.14em] tabular-nums">
                    {pad(i + 1)}
                  </span>
                  <span className="truncate">
                    <Roll>{project.title}</Roll>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── The deck. ── */}
        <ol
          ref={listRef}
          className="grid gap-16 lg:col-span-9 lg:gap-[18vh] lg:pb-[14vh] xl:col-span-10"
          style={{ "--n": total } as React.CSSProperties}
        >
          {projectsArr.map((project, i) => {
            const inert = Boolean(project.placeholder);
            const href = `/projects/${project.slug}`;
            return (
              <li
                key={project.slug}
                id={`project-${project.slug}`}
                data-deck-item
                className="deck__item scroll-mt-28"
                style={{ "--i": i } as React.CSSProperties}
              >
                <article
                  data-deck-body
                  className="deck__body group relative grid overflow-hidden border border-rule-strong bg-paper-2 shadow-[inset_0_1px_0_var(--c-sheen),0_-30px_60px_-40px_var(--c-shadow)] lg:grid-cols-12"
                >
                  {/* Picture — the case study's door. */}
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-rule bg-paper-3 lg:order-2 lg:col-span-7 lg:aspect-auto lg:border-b-0 lg:border-l">
                    {project.imgSrc ? (
                      <Link
                        href={inert ? "/projects" : href}
                        tabIndex={-1}
                        aria-hidden
                        data-cursor={inert ? undefined : "View"}
                        className="absolute inset-0"
                      >
                        <Image
                          data-deck-img
                          src={project.imgSrc}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="deck__img object-cover object-top"
                        />
                      </Link>
                    ) : (
                      <span
                        aria-hidden
                        className="absolute inset-0 grid place-items-center font-display text-[6rem] font-medium tracking-[-0.05em] text-rule-strong tabular-nums"
                      >
                        {pad(i + 1)}
                      </span>
                    )}
                    <span className="tag absolute left-4 top-4 border border-rule-strong bg-paper/85 px-2.5 py-1.5 text-ink backdrop-blur tabular-nums">
                      fig. P.{pad(i + 1)}
                    </span>
                    {project.status === "live" && (
                      <span className="tag absolute right-4 top-4 flex items-center gap-2 bg-ink px-2.5 py-1.5 text-paper">
                        <span className="ping h-1.5 w-1.5 bg-accent" />
                        Live
                      </span>
                    )}
                  </div>

                  {/* Copy. */}
                  <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:col-span-5 lg:p-9 xl:p-11">
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-display text-[clamp(2.5rem,4vw,4rem)] font-medium leading-none tracking-[-0.05em] text-outline tabular-nums">
                          {pad(i + 1)}
                        </span>
                        <span className="tag tag--accent text-right">
                          {project.category} · {project.year}
                        </span>
                      </div>

                      <h3 className="mt-5 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
                        {inert ? (
                          project.title
                        ) : (
                          <Link
                            href={href}
                            className="transition-colors duration-500 hover:text-accent-ink"
                          >
                            {project.title}
                          </Link>
                        )}
                      </h3>
                      <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">
                        {project.subtitle}
                      </p>
                      <p className="mt-5 line-clamp-3 text-ink-2">{project.description}</p>
                    </div>

                    <div>
                      <dl className="grid grid-cols-2 gap-4 border-t border-rule pt-5">
                        <div>
                          <dt className="tag">Role</dt>
                          <dd className="mt-1.5 line-clamp-2 text-sm text-ink">{project.role}</dd>
                        </div>
                        <div>
                          <dt className="tag">Client</dt>
                          <dd className="mt-1.5 line-clamp-2 text-sm text-ink">
                            {project.client ?? "Personal"}
                          </dd>
                        </div>
                      </dl>

                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 5).map((tech) => (
                          <li key={tech} className="chip">
                            {tech}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        {inert ? (
                          <span className="tag">In progress</span>
                        ) : (
                          <Link href={href} className="btn btn-solid" data-cursor="Open">
                            <Roll>Case study →</Roll>
                          </Link>
                        )}
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            className={clsx("btn btn-outline")}
                          >
                            <Roll>Live site ↗</Roll>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Recession shade — darkens the plate as the next covers it. */}
                  <span aria-hidden className="deck__shade pointer-events-none absolute inset-0" />
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
