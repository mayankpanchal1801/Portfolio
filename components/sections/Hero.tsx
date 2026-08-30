import LocalTime from "@/components/primitives/LocalTime";
import Reveal from "@/components/primitives/Reveal";
import { about, contact, site } from "@/constants/personal";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

/** The four facts that belong beside a name, and nowhere else. */
const SPEC = [
  { k: "Role", v: site.role },
  { k: "Stack", v: "Next.js · FastAPI · PostgreSQL" },
  { k: "Based", v: `${contact.city}, ${contact.country}` },
  { k: "Focus", v: "Full-Stack & Systems" },
];

export default function Hero() {
  return (
    <section className="ruled border-b border-rule pt-14 pb-16 md:pt-20 md:pb-24" aria-labelledby="hero-name">
      <div className="shell relative z-[1]">
        {/* Status line */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-rule pb-4">
          <p className="tag tag--accent">Full-Stack &amp; Backend Engineer</p>
          <p className="tag hidden md:block">Portfolio — 2026 edition</p>
          <p className="tag flex items-center gap-2 tabular-nums">
            <span>{contact.city}</span>
            <span aria-hidden className="text-rule-strong">/</span>
            <LocalTime />
          </p>
        </div>

        <div className="grid-12 mt-10 md:mt-16">
          {/* ── Name + lede ── */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal
              as="h1"
              id="hero-name"
              mode="words"
              immediate
              className="-ml-[0.055em] font-display text-mark font-semibold text-ink"
            >
              Mayank
              <br />
              Panchal<span className="text-accent">.</span>
            </Reveal>

            <Reveal
              as="p"
              mode="rise"
              delay={0.28}
              immediate
              className="measure mt-8 text-lede text-ink-2"
            >
              I build production web applications end to end — a typed{" "}
              <em className="text-ink">Next.js</em> interface on top, an async{" "}
              <em className="text-ink">FastAPI</em> and{" "}
              <em className="text-ink">PostgreSQL</em> service underneath, and the
              Docker container on AWS that carries both to a URL.
            </Reveal>

            <Reveal
              mode="fade"
              delay={0.42}
              immediate
              className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <Link href="/projects" className="btn btn-solid text-center">
                Selected work
              </Link>
              <Link href="/contact" className="btn btn-outline text-center">
                Get in touch
              </Link>
            </Reveal>

            {/* Specification table */}
            <dl className="mt-12 sm:mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-rule pt-6 sm:grid-cols-4">
              {SPEC.map((row) => (
                <div key={row.k}>
                  <dt className="tag">{row.k}</dt>
                  <dd className="mt-1.5 font-display text-sm leading-snug text-ink">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Portrait ── */}
          <figure className="col-span-12 mt-10 sm:mt-14 lg:col-span-4 lg:col-start-9 lg:mt-2">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none overflow-hidden border border-rule-strong bg-paper-2">
              <Image
                src="/mayank.jpeg"
                alt={`${site.name}, ${site.role}, photographed in ${contact.city}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-3.5 flex items-baseline justify-between border-t border-rule pt-2.5">
              <span className="marginal">Fig. 01</span>
              <span className="marginal text-ink">{site.name}</span>
            </figcaption>
          </figure>
        </div>

        {/* ── Figures ── */}
        <dl className="mt-10 sm:mt-12 grid grid-cols-2 border-t border-rule md:mt-16 md:grid-cols-4">
          {about.stats.map((s, i) => (
            <div
              key={s.label}
              className={clsx(
                "border-rule py-5 pr-4 sm:py-7 sm:pr-6",
                i % 2 === 1 && "border-l pl-4 sm:pl-6",
                i >= 2 && "border-t md:border-t-0",
                "md:border-l md:pl-6",
                i === 0 && "md:border-l-0 md:pl-0",
              )}
            >
              <dd className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-none tracking-[-0.04em] text-ink tabular-nums">
                {s.value}
              </dd>
              <dt className="tag mt-2.5 sm:mt-3 block leading-relaxed">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
