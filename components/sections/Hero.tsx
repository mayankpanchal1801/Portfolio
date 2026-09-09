import LocalTime from "@/components/primitives/LocalTime";
import Reveal from "@/components/primitives/Reveal";
import { about, contact, site } from "@/constants/personal";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const SPEC = [
  { k: "Role", v: site.role },
  { k: "Stack", v: "Next.js · FastAPI · PostgreSQL" },
  { k: "Based", v: `${contact.city}, ${contact.country}` },
  { k: "Focus", v: "Full-Stack & Systems" },
];

export default function Hero() {
  return (
    <section className="ruled border-b border-rule pt-10 pb-16 md:pt-16 md:pb-24" aria-labelledby="hero-name">
      <div className="shell relative z-[1]">
        {/* Top Status line */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pb-8">
          <p className="tag tag--accent flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Available for new opportunities
          </p>
          <p className="tag flex items-center gap-2 tabular-nums">
            <span>{contact.city}</span>
            <span aria-hidden className="text-rule-strong">/</span>
            <LocalTime />
          </p>
        </div>

        {/* ── Massive Name ── */}
        <div className="border-t border-rule pt-8 md:pt-12 pb-8 md:pb-12 text-center">
          <Reveal
            as="h1"
            id="hero-name"
            mode="words"
            immediate
            className="font-display text-[clamp(4rem,14vw,12rem)] font-medium leading-[0.85] tracking-[-0.04em] text-ink"
          >
            Mayank
            <br />
            <span className="italic text-ink-2">Panchal<span className="text-accent not-italic">.</span></span>
          </Reveal>
        </div>

        <div className="grid-12 mt-4 md:mt-8 border-t border-rule pt-10 md:pt-16">
          {/* ── Portrait ── */}
          <figure className="col-span-12 lg:col-span-5 order-2 lg:order-1 mt-10 lg:mt-0">
            <div className="relative aspect-[3/4] w-full max-w-lg mx-auto lg:max-w-none overflow-hidden rounded-sm border border-rule bg-paper-2 group">
              <Image
                src="/profile.jpeg"
                alt={`${site.name}, ${site.role}, photographed in ${contact.city}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between border-t border-rule pt-3">
              <span className="marginal">Fig. 01 — {site.name}</span>
              <span className="marginal text-ink">{contact.city}, {contact.country}</span>
            </figcaption>
          </figure>

          {/* ── Lede & Specs ── */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 order-1 lg:order-2 flex flex-col justify-between">
            <div>
              <Reveal
                as="h2"
                mode="rise"
                delay={0.2}
                immediate
                className="text-2xl sm:text-3xl font-display text-ink leading-tight mb-6"
              >
                Full-Stack &amp; Backend Engineer bridging the gap between elegant interfaces and robust systems.
              </Reveal>
              
              <Reveal
                as="p"
                mode="fade"
                delay={0.3}
                immediate
                className="measure text-lede text-ink-2 mb-10"
              >
                I build production web applications end to end — a typed{" "}
                <em className="text-ink font-medium">Next.js</em> interface on top, an async{" "}
                <em className="text-ink font-medium">FastAPI</em> and{" "}
                <em className="text-ink font-medium">PostgreSQL</em> service underneath, and the
                Docker container on AWS that carries both to a URL.
              </Reveal>

              <Reveal
                mode="fade"
                delay={0.4}
                immediate
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                <Link href="/projects" className="btn btn-solid text-center">
                  View selected work
                </Link>
                <Link href="/contact" className="btn btn-outline text-center">
                  Start a conversation
                </Link>
              </Reveal>
            </div>

            {/* Specification table */}
            <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-rule pt-8">
              {SPEC.map((row) => (
                <div key={row.k}>
                  <dt className="tag">{row.k}</dt>
                  <dd className="mt-2 font-display text-base leading-snug text-ink">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── Figures ── */}
        <dl className="mt-16 sm:mt-24 grid grid-cols-2 border-y border-rule md:grid-cols-4">
          {about.stats.map((s, i) => (
            <div
              key={s.label}
              className={clsx(
                "py-6 sm:py-10 pr-4 sm:pr-8",
                i % 2 === 1 && "border-l border-rule pl-4 sm:pl-8",
                i >= 2 && "border-t border-rule md:border-t-0",
                "md:border-l md:border-rule md:pl-8",
                i === 0 && "md:border-l-0 md:pl-0",
              )}
            >
              <dd className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-none tracking-[-0.04em] text-ink tabular-nums">
                {s.value}
              </dd>
              <dt className="tag mt-3 block leading-relaxed">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
