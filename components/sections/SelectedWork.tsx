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

      <ul className="mt-14 border-t border-rule md:mt-20">
        {shipped.map((p, i) => (
          <li key={p.slug} className="group relative border-b border-rule">
            <Link
              href={`/projects/${p.slug}`}
              className="grid-12 items-center gap-y-2 py-7 transition-colors duration-300 md:py-9"
            >
              <span className="marginal col-span-2 md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="col-span-10 font-display text-d3 text-ink transition-colors group-hover:text-accent-ink md:col-span-5">
                {p.title}
              </h3>

              <p className="col-span-12 pl-[16.6%] text-sm text-ink-3 md:col-span-3 md:pl-0">
                {p.category}
                <span aria-hidden className="px-2 text-rule-strong">
                  /
                </span>
                {p.client ?? p.role}
              </p>

              <span className="marginal col-span-12 pl-[16.6%] md:col-span-2 md:pl-0 md:text-right">
                {p.year}
              </span>

              <span
                aria-hidden
                className="col-span-12 hidden justify-end md:col-span-1 md:flex"
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

      <Reveal mode="fade" className="mt-10 flex justify-end">
        <Link href="/projects" className="btn btn-outline">
          All projects ↗
        </Link>
      </Reveal>
    </section>
  );
}
