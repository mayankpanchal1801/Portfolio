"use client";

import Reveal from "@/components/primitives/Reveal";
import SectionHead from "@/components/primitives/SectionHead";
import { projectsArr } from "@/constants/projects";
import Image from "next/image";
import Link from "next/link";

/** Shipped work only - in-progress stubs live on the projects index. */
const shipped = projectsArr.filter((p) => !p.placeholder).slice(0, 6);

export default function SelectedWork() {
  return (
    <section id="work" className="band shell" aria-labelledby="work-heading">
      <SectionHead
        index="01"
        label="Selected work"
        headingId="work-heading"
        title={
          <>
            A short list of things <br className="hidden md:block" />
            I have <em className="italic">helped ship.</em>
          </>
        }
        intro="Enterprise dashboards, event platforms, studio websites - a cross-section of the last four years."
      />

      <ul className="mt-14 md:mt-24 border-t border-rule">
        {shipped.map((p, i) => (
          <li key={p.slug} className="group relative border-b border-rule">
            <Link
              href={`/projects/${p.slug}`}
              className="block py-8 md:py-14 transition-colors duration-500 ease-out md:grid-12 md:items-center md:gap-y-4 hover:bg-paper-2"
            >
              {/* Mobile View */}
              <div className="flex flex-col gap-4 md:hidden px-4">
                <div className="flex items-center justify-between">
                  <span className="marginal text-accent-ink font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="marginal tabular-nums">{p.year}</span>
                </div>

                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-[2rem] leading-none text-ink transition-colors group-hover:text-accent-ink">
                    {p.title}
                  </h3>
                  <span
                    aria-hidden
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rule text-xs text-ink transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                  >
                    ↗
                  </span>
                </div>

                <p className="text-sm text-ink-3">
                  <span className="text-ink-2">{p.category}</span>
                  <span aria-hidden className="px-1.5 text-rule-strong">/</span>
                  <span>{p.client ?? p.role}</span>
                </p>
              </div>

              {/* Desktop View (md+) */}
              <span className="marginal hidden md:col-span-1 md:block md:pl-4 text-ink-3 group-hover:text-accent-ink transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="hidden font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-ink transition-colors duration-500 group-hover:text-accent-ink md:col-span-5 md:block">
                {p.title}
              </h3>

              <p className="hidden text-base text-ink-3 md:col-span-3 md:block">
                {p.category}
                <br />
                <span className="text-ink-2">{p.client ?? p.role}</span>
              </p>

              <span className="marginal hidden md:col-span-2 md:block md:text-right">
                {p.year}
              </span>

              <span
                aria-hidden
                className="hidden justify-end md:col-span-1 md:flex md:pr-4"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-rule-strong text-ink transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  ↗
                </span>
              </span>

              {/* Desktop hover peek - Made much larger and more prominent */}
              {p.imgSrc && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-[15%] top-1/2 z-20 hidden w-72 lg:w-96 -translate-y-1/2 rotate-3 overflow-hidden rounded-sm border border-rule-strong opacity-0 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:opacity-100 md:block"
                >
                  <Image
                    src={p.imgSrc}
                    alt=""
                    width={384}
                    height={288}
                    sizes="384px"
                    className="h-auto w-full object-cover"
                  />
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <Reveal mode="fade" className="mt-12 md:mt-16 flex justify-center md:justify-end">
        <Link href="/projects" className="btn btn-outline w-full sm:w-auto text-center px-8 py-4 text-sm">
          View all projects ↗
        </Link>
      </Reveal>
    </section>
  );
}
