"use client";

import PageRibbon from "@/components/shared/PageRibbon";
import { projectsArr, type Project } from "@/constants/projects";
import { gsap } from "@/lib/gsap-config";
import { splitText } from "@/lib/text-splitter";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";

const FILTERS: (Project["category"] | "All")[] = ["All", "AI / LLM", "Full Stack", "React App", "WordPress"];

export default function ProjectsList() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const filtered = useMemo(
    () => (filter === "All" ? projectsArr : projectsArr.filter((p) => p.category === filter)),
    [filter],
  );
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    if (titleRef.current) {
      const words = splitText(titleRef.current, "words");
      gsap.from(words, { yPercent: 110, duration: 1, stagger: 0.06, ease: "expo.out", delay: 2.7 });
    }
  }, []);

  // Animate cards in whenever the filter changes
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const items = Array.from(grid.children) as HTMLElement[];
    gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "expo.out" },
    );
  }, [filter]);

  return (
    <main className="pt-24 md:pt-32">
      <section className="container relative mb-12 md:mb-16" aria-labelledby="projects-title">
        <span className="ghost-num right-[-2rem] top-0">P</span>

        <PageRibbon
          section="Projects"
          index="P"
          right={
            <span className="tabular-nums">
              {String(projectsArr.length).padStart(2, "0")} entries
            </span>
          }
        />

        <h1
          ref={titleRef}
          id="projects-title"
          className="mt-10 md:mt-14 font-serif text-bone leading-[0.94]"
          style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)", letterSpacing: "-0.04em" }}
        >
          Selected work, <em className="italic-wonk text-acid">chronologically</em>.
        </h1>
        <p className="mt-6 max-w-measure text-lede text-pearl">
          An index of shipped production work, plus in-progress AI experiments. Each entry links to a case study.
        </p>
      </section>

      {/* Filter bar */}
      <section className="container mb-10">
        <div className="flex flex-wrap items-center gap-2 border-y border-fog py-4">
          <span className="eyebrow mr-4">P1 · Filter</span>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              data-cursor="hover"
              data-cursor-magnetic
              className={clsx(
                "px-3.5 py-1.5 rounded-full font-mono text-[0.7rem] uppercase tracking-[0.12em] border transition-all",
                filter === f
                  ? "bg-acid text-obsidian border-acid"
                  : "text-pearl border-fog hover:border-bone hover:text-bone",
              )}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ash tabular-nums">
            Showing {String(filtered.length).padStart(2, "0")} / {String(projectsArr.length).padStart(2, "0")}
          </span>
        </div>
      </section>

      {/* Editorial grid */}
      <section className="container">
        <ul ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {filtered.map((p, i) => (
            <li key={p.slug} className="group">
              <Link
                href={p.placeholder ? "#" : `/projects/${p.slug}`}
                className={clsx(p.placeholder && "pointer-events-none")}
                data-cursor="image"
              >
                <figure className="relative aspect-[4/3] overflow-hidden border border-fog bg-char transition-colors group-hover:border-acid">
                  {p.imgSrc ? (
                    <Image
                      src={p.imgSrc}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover grayscale transition-all duration-700 ease-out-expo group-hover:grayscale-0 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif italic-wonk text-8xl text-ash opacity-30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                  {p.placeholder && (
                    <span className="absolute top-3 left-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] bg-obsidian/80 text-acid px-2 py-1 rounded-sm border border-acid/40">
                      In progress
                    </span>
                  )}
                  <span className="absolute top-3 right-3 inline-flex w-10 h-10 items-center justify-center rounded-full bg-obsidian/80 border border-fog text-bone opacity-0 -translate-y-2 transition-all duration-500 ease-out-expo group-hover:opacity-100 group-hover:translate-y-0 group-hover:border-acid group-hover:text-acid">
                    <BsArrowUpRight />
                  </span>
                </figure>

                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="font-serif text-2xl md:text-3xl text-bone truncate group-hover:text-acid transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-sm text-ash mt-1">
                      <span className="text-acid">{p.category}</span> <span className="text-pearl">· {p.client ?? p.role}</span>
                    </p>
                  </div>
                  <span className="font-mono text-xs text-ash">{p.year}</span>
                </div>

                <p className="mt-3 text-pearl line-clamp-2">{p.description}</p>

                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                  {p.tags.slice(0, 5).map((t) => (
                    <span key={t} className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ash">
                      {t}
                    </span>
                  ))}
                </div>

                {!p.placeholder && (
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-bone group-hover:text-acid transition-colors">
                    Case study <BsArrowUpRight />
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
