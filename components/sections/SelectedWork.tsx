"use client";

import Reveal from "@/components/primitives/Reveal";
import SectionHead from "@/components/primitives/SectionHead";
import { projectsArr } from "@/constants/projects";
import Image from "next/image";
import Link from "next/link";

/** Shipped work only — in-progress stubs live on the projects index. */
const shipped = projectsArr.filter((p) => !p.placeholder).slice(0, 6);

export default function SelectedWork() {
  return (
    <section id="work" className="band shell" aria-labelledby="work-heading">
      <SectionHead
        index="01"
        label="Selected work"
        headingId="work-heading"
        title="A short list of things I have helped ship."
        intro="Enterprise dashboards, event platforms, studio websites — a cross-section of the last four years."
      />

      <ul className="mt-10 border-t border-rule md:mt-20">
        {shipped.map((p, i) => (
          <li key={p.slug} className="group relative border-b border-rule">
            <Link
              href={`/projects/${p.slug}`}
              className="block py-6 transition-colors duration-300 md:grid-12 md:items-center md:gap-y-2 md:py-9"
            >
              {/* Mobile View */}
              <div className="flex flex-col gap-2.5 md:hidden">
                <div className="flex items-center justify-between">
                  <span className="marginal text-accent-ink font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="marginal tabular-nums">{p.year}</span>
                </div>

                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-[1.35rem] font-medium leading-snug text-ink transition-colors group-hover:text-accent-ink">
                    {p.title}
                  </h3>
                  <span
                    aria-hidden
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-rule text-xs text-ink-3 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                  >
                    ↗
                  </span>
                </div>

                <p className="text-xs text-ink-3">
                  <span className="text-ink-2">{p.category}</span>
                  <span aria-hidden className="px-1.5 text-rule-strong">/</span>
                  <span>{p.client ?? p.role}</span>
                </p>
              </div>

              {/* Desktop View (md+) */}
              <span className="marginal hidden md:col-span-1 md:block">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="hidden font-display text-d3 text-ink transition-colors group-hover:text-accent-ink md:col-span-5 md:block">
                {p.title}
              </h3>

              <p className="hidden text-sm text-ink-3 md:col-span-3 md:block">
                {p.category}
                <span aria-hidden className="px-2 text-rule-strong">
                  /
                </span>
                {p.client ?? p.role}
              </p>

              <span className="marginal hidden md:col-span-2 md:block md:text-right">
                {p.year}
              </span>

              <span
                aria-hidden
                className="hidden justify-end md:col-span-1 md:flex"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule-strong text-ink-3 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  ↗
                </span>
              </span>

              {/* Desktop hover peek */}
              {p.imgSrc && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-[12%] top-1/2 z-10 hidden w-56 -translate-y-1/2 rotate-2 overflow-hidden border border-rule-strong opacity-0 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:opacity-100 lg:block"
                >
                  <Image
                    src={p.imgSrc}
                    alt=""
                    width={224}
                    height={168}
                    sizes="224px"
                    className="h-auto w-full object-cover"
                  />
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <Reveal mode="fade" className="mt-8 md:mt-10 flex justify-end">
        <Link href="/projects" className="btn btn-outline w-full sm:w-auto text-center">
          All projects ↗
        </Link>
      </Reveal>
    </section>
  );
}
