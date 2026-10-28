"use client";

import Panel from "@/components/primitives/Panel";
import Reveal from "@/components/primitives/Reveal";
import { projectsArr, type Project } from "@/constants/projects";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const ALL_CATEGORIES = Array.from(new Set(projectsArr.map((p) => p.category)));
const FILTERS = ["All", ...ALL_CATEGORIES];
type Filter = string;

function matches(project: Project, filter: Filter) {
  return filter === "All" || project.category === filter;
}

export default function ProjectsIndex() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () => projectsArr.filter((p) => matches(p, filter)),
    [filter],
  );

  const counts = useMemo(
    () =>
      Object.fromEntries(
        FILTERS.map((f) => [f, projectsArr.filter((p) => matches(p, f)).length]),
      ) as Record<Filter, number>,
    [],
  );

  return (
    <section className="band shell" aria-labelledby="projects-index-heading">
      <h2 id="projects-index-heading" className="sr-only">
        Project index
      </h2>

      {/* Filter bar - with horizontal scroll on mobile */}
      <div className="border-y border-rule py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="tag mr-2 shrink-0">Filter</span>
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                disabled={counts[f] === 0}
                className={clsx(
                  "shrink-0 rounded-full border px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors cursor-pointer",
                  "disabled:cursor-not-allowed disabled:opacity-40",
                  filter === f
                    ? "border-accent bg-accent text-on-accent"
                    : "border-rule text-ink-2 hover:border-ink hover:text-ink bg-paper/60",
                )}
              >
                {f}
                <span className="ml-1.5 tabular-nums opacity-75">{counts[f]}</span>
              </button>
            ))}
          </div>

          <span className="tag ml-auto shrink-0 hidden sm:block tabular-nums">
            {String(visible.length).padStart(2, "0")} /{" "}
            {String(projectsArr.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Grid */}
      <ul className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2">
        {visible.map((p, i) => {
          const inert = Boolean(p.placeholder);
          const Card = (
            <>
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-paper-3">
                {p.imgSrc ? (
                  <Image
                    src={p.imgSrc}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center font-display text-[4rem] sm:text-[5rem] text-rule-strong"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}

                {inert && (
                  <span className="absolute left-3 top-3 rounded-full border border-rule-strong bg-paper px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-3">
                    In progress
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4 px-2">
                <span className="marginal text-accent-ink">{p.category}</span>
                <span className="marginal tabular-nums">{p.year}</span>
              </div>

              <h3
                className={clsx(
                  "mt-3 px-2 font-display text-xl sm:text-d3",
                  inert ? "text-ink-3" : "text-ink transition-colors group-hover:text-accent-ink",
                )}
              >
                {p.title}
              </h3>

              <p className="mt-2 px-2 text-sm text-ink-2 leading-relaxed">{p.description}</p>

              <p className="mt-4 flex flex-wrap gap-x-2.5 gap-y-1 px-2">
                {p.tags.slice(0, 5).map((t) => (
                  <span key={t} className="marginal text-[0.65rem]">
                    {t}
                  </span>
                ))}
              </p>

              {!inert && (
                <span className="mt-4 mb-2 ml-2 inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink transition-colors group-hover:text-accent-ink">
                  Case study ↗
                </span>
              )}
            </>
          );

          return (
            <Reveal
              as="li"
              key={p.slug}
              mode="fade"
              delay={Math.min(i, 3) * 0.06}
              className="group"
            >
              <Panel className="h-full p-3 sm:p-4">
                {inert ? (
                  <div>{Card}</div>
                ) : (
                  <Link href={`/projects/${p.slug}`} className="block" data-cursor="View">
                    {Card}
                  </Link>
                )}
              </Panel>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
