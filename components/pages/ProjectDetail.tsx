"use client";

import ImageReveal from "@/components/ui/ImageReveal";
import Reveal from "@/components/ui/Reveal";
import type { Project } from "@/constants/projects";
import { gsap } from "@/lib/gsap-config";
import { splitText } from "@/lib/text-splitter";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { BsArrowUpRight, BsGithub, BsGlobe } from "react-icons/bs";

type Props = {
  project: Project;
  nextProject: Project;
};

export default function ProjectDetail({ project, nextProject }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const highlightsRef = useRef<HTMLOListElement>(null);

  useGSAP(() => {
    if (titleRef.current) {
      const words = splitText(titleRef.current, "words");
      gsap.from(words, { yPercent: 110, duration: 1.1, stagger: 0.06, ease: "expo.out", delay: 2.6 });
    }
    const list = highlightsRef.current;
    if (list) {
      const items = Array.from(list.children) as HTMLElement[];
      items.forEach((el, i) => {
        gsap.from(el, {
          x: 40,
          opacity: 0,
          duration: 0.7,
          ease: "expo.out",
          delay: i * 0.05,
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });
    }
  }, []);

  return (
    <main className="pt-32 md:pt-40" itemScope itemType="https://schema.org/CreativeWork">
      <nav aria-label="Breadcrumb" className="container mb-10 flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ash">
        <Link href="/" className="hover:text-bone" data-cursor="hover">Home</Link>
        <span>/</span>
        <Link href="/projects" className="hover:text-bone" data-cursor="hover">Projects</Link>
        <span>/</span>
        <span className="text-bone truncate">{project.title}</span>
      </nav>

      <header className="container mb-14 md:mb-20">
        <div className="rule mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-9">
            <p className="eyebrow mb-6">
              <span className="text-acid">{project.category}</span> · {project.year}
            </p>
            <h1
              ref={titleRef}
              className="font-serif text-bone leading-[0.95]"
              style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)", letterSpacing: "-0.04em" }}
              itemProp="name"
            >
              {project.title}
            </h1>
            <Reveal as="p" mode="fade" delay={0.1} className="mt-6 max-w-measure text-lede text-pearl">
              {project.description}
            </Reveal>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-2">
            {project.url && (
              <a href={project.url} target="_blank" rel="noreferrer" className="btn btn-primary" itemProp="url" data-cursor="hover">
                Visit live <BsGlobe />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-hair" data-cursor="hover">
                Source <BsGithub />
              </a>
            )}
          </div>
        </div>
      </header>

      {project.imgSrc && (
        <figure className="container mb-14 md:mb-20">
          <ImageReveal
            src={project.imgSrc}
            alt={project.title}
            className="aspect-[16/9] border border-fog"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
            from="bottom"
            parallax
          />
        </figure>
      )}

      <section className="container mb-14 md:mb-20">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-fog py-6">
          {[
            { k: "Role", v: project.role },
            { k: "Client", v: project.client ?? "—" },
            { k: "Year", v: project.year },
            { k: "Category", v: project.category },
          ].map((r) => (
            <div key={r.k}>
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-acid mb-1">{r.k}</dt>
              <dd className="text-bone text-sm">{r.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container mb-14 md:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6 text-pearl">
          <p className="eyebrow eyebrow--acid">Overview</p>
          <Reveal mode="fade" className="text-lede text-bone">
            {project.longDescription}
          </Reveal>
        </div>

        <aside className="lg:col-span-4">
          <p className="eyebrow mb-4">Stack</p>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="px-3 py-1.5 rounded-full font-mono text-[0.7rem] uppercase tracking-[0.12em] border border-fog text-pearl hover:border-acid hover:text-acid transition-colors"
              >
                {t}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="container mb-16 md:mb-24">
        <p className="eyebrow mb-6">Highlights</p>
        <ol ref={highlightsRef} className="border-t border-fog">
          {project.highlights.map((h, i) => (
            <li key={i} className="grid grid-cols-12 gap-4 py-6 border-b border-fog">
              <span className="col-span-1 font-mono text-[0.72rem] tracking-[0.14em] text-acid">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="col-span-11 text-bone text-lg leading-relaxed">{h}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container">
        <div className="rule mb-8" />
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-10"
          data-cursor="hover"
        >
          <div className="md:col-span-2">
            <p className="eyebrow eyebrow--acid">Next</p>
          </div>
          <div className="md:col-span-8">
            <h3
              className="font-serif text-bone group-hover:text-acid transition-colors"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.02, letterSpacing: "-0.025em" }}
            >
              {nextProject.title}
            </h3>
            <p className="text-ash mt-2 italic-wonk">{nextProject.description}</p>
          </div>
          <div className="md:col-span-2 flex md:justify-end">
            <span className="inline-flex w-14 h-14 items-center justify-center rounded-full border border-fog text-bone transition-all group-hover:border-acid group-hover:bg-acid group-hover:text-obsidian group-hover:translate-x-1 group-hover:-translate-y-1">
              <BsArrowUpRight />
            </span>
          </div>
        </Link>
      </section>
    </main>
  );
}
