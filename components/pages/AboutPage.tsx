"use client";

import FigureTicks from "@/components/shared/FigureTicks";
import PageRibbon from "@/components/shared/PageRibbon";
import SectionHeading from "@/components/shared/SectionHeading";
import SkillLogo from "@/components/shared/SkillLogo";
import ImageReveal from "@/components/ui/ImageReveal";
import Reveal from "@/components/ui/Reveal";
import { experienceArr } from "@/constants/experience";
import { about, contact, site, socials } from "@/constants/personal";
import { skillsArr } from "@/constants/skills";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

export default function AboutPage() {
  return (
    <main className="pt-24 md:pt-32">
      {/* ─── Ribbon + lede ─── */}
      <section className="container relative" aria-labelledby="about-lede">
        <span className="ghost-num right-[-2rem] top-0">A</span>

        <PageRibbon section="About" index="A" />

        <Reveal
          as="h1"
          mode="words"
          className="mt-10 md:mt-14 font-serif text-bone"
        >
          <span
            className="inline-block"
            style={{
              fontSize: "clamp(2.5rem, 9vw, 8rem)",
              lineHeight: 0.94,
              letterSpacing: "-0.04em",
            }}
          >
            A full-stack developer who ships end-to-end — with AI as a{" "}
            <em className="italic-wonk text-acid">tool</em>, not a shortcut.
          </span>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <aside className="lg:col-span-4">
            <figure className="relative">
              <FigureTicks />
              <ImageReveal
                src="/mayank.jpeg"
                alt="Portrait of Mayank Panchal"
                className="aspect-[4/5] border border-fog"
                sizes="(max-width: 1024px) 100vw, 380px"
                priority
                parallax
              />
              <figcaption className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ash">
                <span>Fig. A</span>
                <span className="text-right text-bone">The Author</span>
                <span>Coord.</span>
                <span className="text-right">12.97°N · 77.59°E</span>
              </figcaption>
            </figure>

            <dl className="mt-8 space-y-4">
              {[
                { k: "Role", v: site.role },
                { k: "Based in", v: `${contact.city}, ${contact.country}` },
                { k: "Timezone", v: contact.timezone },
                { k: "Availability", v: contact.availability },
              ].map((r) => (
                <div key={r.k} className="grid grid-cols-3 border-t border-fog pt-3">
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ash col-span-1">
                    {r.k}
                  </dt>
                  <dd className="col-span-2 text-bone text-sm">{r.v}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="lg:col-span-8 space-y-6 text-pearl">
            <Reveal mode="fade" className="text-lede text-bone">
              {about.bio[0]}
            </Reveal>
            <Reveal mode="fade" delay={0.06}>{about.bio[1]}</Reveal>
            <Reveal mode="fade" delay={0.12}>{about.bio[2]}</Reveal>
            <Reveal mode="fade" delay={0.18}>{about.bio[3]}</Reveal>

            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                data-cursor="hover"
              >
                Résumé (PDF) <BsArrowUpRight />
              </a>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-hair"
                  data-cursor="hover"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="section container relative" aria-labelledby="values">
        <SectionHeading number="A1" eyebrow="Principles" title="How I work." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {about.values.map((v, i) => (
            <Reveal
              key={v.title}
              mode="fade"
              delay={i * 0.06}
              className="border-t border-fog pt-5 relative group"
            >
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-acid">
                {String(i + 1).padStart(2, "0")} / 04
              </p>
              <p className="mt-3 font-serif italic-wonk text-2xl text-bone">
                {v.title}
              </p>
              <p className="mt-3 text-pearl">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Experience ─── */}
      <section className="section bg-char" aria-labelledby="experience">
        <div className="container">
          <SectionHeading
            number="A2"
            eyebrow="Chronology"
            title="Four years, one company, four roles."
            intro="Screen Interactiv (Screetract OPC), Bengaluru — grew from Associate to Lead Software Engineer, shipping 15+ projects across the frontend, backend, and AI-augmented product surfaces."
          />
          <ol className="border-t border-fog">
            {experienceArr.map((item, i) => (
              <li
                key={`${item.title}-${i}`}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 border-b border-fog"
              >
                <div className="md:col-span-3">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-acid">
                    {item.type === "work" ? "Work" : "Education"}
                  </p>
                  <p className="font-mono text-sm text-pearl mt-1">{item.date}</p>
                  <p className="font-mono text-xs text-ash mt-1">{item.location}</p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-serif text-2xl md:text-3xl text-bone">
                    {item.title}
                  </h3>
                  <p className="italic-wonk text-acid mt-1">{item.company}</p>
                  {item.description && (
                    <p className="mt-3 text-pearl max-w-measure">{item.description}</p>
                  )}
                  {item.bullets.length > 0 && (
                    <ul className="mt-5 space-y-2 text-pearl">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="text-acid select-none">→</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.stack && item.stack.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.stack.map((t) => (
                        <li
                          key={t}
                          className="px-2.5 py-1 rounded-full font-mono text-[0.62rem] uppercase tracking-[0.14em] border border-fog text-pearl hover:border-acid hover:text-acid transition-colors"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Skills detail ─── */}
      <section className="section container" aria-labelledby="skills-detail">
        <SectionHeading
          number="A3"
          eyebrow="Toolkit"
          title="The stack in detail."
          intro="A grouped view of everything I use regularly — from language up to production infra and AI-native tooling."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-14 border-t border-fog pt-10">
          {skillsArr.map((group, i) => (
            <div key={group.category} className="group">
              <div className="flex items-baseline justify-between border-b border-fog pb-3 mb-5">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.7rem] tabular-nums text-acid">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-bone group-hover:italic-wonk group-hover:text-acid transition-colors">
                    {group.category}
                  </h3>
                </div>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ash">
                  {String(group.items.length).padStart(2, "0")} tools
                </span>
              </div>
              <p className="text-sm italic-wonk text-pearl mb-5">{group.caption}</p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                {group.items.map((item, j) => (
                  <li
                    key={item}
                    className="group/item flex items-center gap-3 py-2.5 border-b border-fog/70"
                  >
                    <span className="font-mono text-[0.62rem] tabular-nums text-ash w-6 shrink-0 group-hover/item:text-acid transition-colors">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <SkillLogo name={item} />
                    <span className="flex-1 min-w-0 text-bone text-sm md:text-base group-hover/item:text-acid group-hover/item:translate-x-1 transition-[color,transform] duration-300 truncate">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section container">
        <div className="rule mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-h2 text-bone">
              Want to work together?{" "}
              <em className="italic-wonk text-acid">Say hello.</em>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              href="/contact"
              className="btn btn-primary self-start"
              data-cursor="hover"
            >
              Start a conversation <BsArrowUpRight />
            </Link>
            <a
              href={`mailto:${contact.email}`}
              className="link-underline text-bone text-lg font-serif"
              data-cursor="hover"
            >
              {contact.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
