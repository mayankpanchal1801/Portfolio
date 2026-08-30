"use client";

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

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 border-y border-rule py-4">
        <span className="tag mr-3">Filter</span>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            disabled={counts[f] === 0}
            className={clsx(
              "rounded-full border px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors",
              "disabled:cursor-not-allowed disabled:opacity-40",
              filter === f
                ? "border-accent bg-accent text-white"
                : "border-rule text-ink-2 hover:border-ink hover:text-ink",
            )}
          >
            {f}
            <span className="ml-2 tabular-nums opacity-60">{counts[f]}</span>
          </button>
        ))}
        <span className="tag ml-auto tabular-nums">
          {String(visible.length).padStart(2, "0")} /{" "}
          {String(projectsArr.length).padStart(2, "0")}
        </span>
      </div>

      {/* Grid */}
      <ul className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2">
        {visible.map((p, i) => {
          const inert = Boolean(p.placeholder);
          const Card = (
            <>
              <div className="relative aspect-[4/3] overflow-hidden border border-rule bg-paper-2 transition-colors group-hover:border-rule-strong">
                {p.imgSrc ? (
                  <Image
                    src={p.imgSrc}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center font-display text-[5rem] text-rule-strong"
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

              <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-rule pt-4">
                <span className="marginal text-accent-ink">{p.category}</span>
                <span className="marginal tabular-nums">{p.year}</span>
              </div>

              <h3
                className={clsx(
                  "mt-3 font-display text-d3",
                  inert ? "text-ink-3" : "text-ink transition-colors group-hover:text-accent-ink",
                )}
              >
                {p.title}
              </h3>

              <p className="mt-3 text-ink-2">{p.description}</p>

              <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                {p.tags.slice(0, 5).map((t) => (
                  <span key={t} className="marginal">
                    {t}
                  </span>
                ))}
              </p>

              {!inert && (
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink transition-colors group-hover:text-accent-ink">
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
              {inert ? (
                <div>{Card}</div>
              ) : (
                <Link href={`/projects/${p.slug}`} className="block">
                  {Card}
                </Link>
              )}
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
