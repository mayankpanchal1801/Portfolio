"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import { projectsArr } from "@/constants/projects";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { BsArrowUpRight } from "react-icons/bs";

export default function SelectedWork() {
  const listRef = useRef<HTMLUListElement>(null);
  const featured = projectsArr.filter((p) => p.featured || !p.placeholder).slice(0, 6);

  useGSAP(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.children) as HTMLElement[];
    items.forEach((el, i) => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        delay: i * 0.06,
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
      });
    });
  }, []);

  return (
    <section id="work" className="section relative" aria-labelledby="work-heading">
      <span className="ghost-num left-[-3rem] top-6">02</span>
      <div className="container relative z-10">
        <SectionHeading
          number="02"
          eyebrow="Selected work"
          title="A short list of things I've helped ship."
          intro="Enterprise dashboards, event platforms, LLM-powered tools, studio websites — a cross-section of the last four years."
        />

        <ul ref={listRef} className="divide-y divide-fog border-y border-fog">
          {featured.map((p, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <li key={p.slug} className="group relative">
                <Link
                  href={p.placeholder ? "/projects" : `/projects/${p.slug}`}
                  className="grid grid-cols-12 items-center gap-4 py-7 md:py-9 transition-colors hover:bg-char/60"
                  data-cursor="hover"
                >
                  <span className="col-span-1 font-mono text-[0.72rem] tracking-[0.16em] text-ash">
                    {num}
                  </span>

                  <div className="col-span-6 md:col-span-5 min-w-0">
                    <h3 className="font-serif text-2xl md:text-4xl text-bone truncate group-hover:text-acid transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-pearl text-sm truncate">{p.description}</p>
                  </div>

                  <div className="hidden md:block col-span-3">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-acid">
                      {p.category}
                    </p>
                    <p className="text-pearl text-sm">{p.client ?? p.role}</p>
                  </div>

                  <div className="col-span-3 md:col-span-2 text-right">
                    <span className="font-mono text-[0.72rem] tracking-[0.14em] text-ash">
                      {p.year}
                    </span>
                  </div>

                  <div className="col-span-1 md:col-span-1 flex justify-end">
                    <span className="inline-flex w-11 h-11 items-center justify-center rounded-full border border-fog text-pearl transition-all group-hover:border-acid group-hover:text-acid group-hover:translate-x-1 group-hover:-translate-y-1">
                      <BsArrowUpRight />
                    </span>
                  </div>

                  {/* Peek image on hover — desktop only */}
                  {p.imgSrc && (
                    <div
                      className="pointer-events-none hidden lg:block absolute right-32 top-1/2 -translate-y-1/2 w-64 aspect-[4/3] overflow-hidden border border-acid/40 bg-char opacity-0 scale-90 rotate-[3deg] transition-all duration-500 ease-out-expo group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 z-20"
                      aria-hidden
                    >
                      <Image
                        src={p.imgSrc}
                        alt=""
                        fill
                        sizes="256px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-end">
          <Link href="/projects" className="btn btn-ghost" data-cursor="hover">
            All projects
            <BsArrowUpRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
