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
  { k: "Status", v: "Open to new work" },
];

export default function Hero() {
  return (
    <section className="ruled border-b border-rule pt-14 pb-16 md:pt-20 md:pb-24" aria-labelledby="hero-name">
      <div className="shell relative z-[1]">
        {/* Status line */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-rule pb-4">
          <p className="tag tag--accent flex items-center gap-2.5">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Available for full-stack &amp; backend roles
          </p>
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
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link href="/projects" className="btn btn-solid">
                Selected work
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Get in touch
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn btn-quiet"
              >
                Résumé ↗
              </a>
            </Reveal>

            {/* Specification table */}
            <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-rule pt-6 sm:grid-cols-4">
              {SPEC.map((row) => (
                <div key={row.k}>
                  <dt className="tag">{row.k}</dt>
                  <dd className="mt-2 font-display text-sm leading-snug text-ink">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Portrait ── */}
          <figure className="col-span-12 mt-14 lg:col-span-4 lg:col-start-9 lg:mt-2">
            <div className="relative aspect-[4/5] overflow-hidden border border-rule-strong bg-paper-2">
              <Image
                src="/mayank.jpeg"
                alt={`${site.name}, ${site.role}, photographed in ${contact.city}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between border-t border-rule pt-3">
              <span className="marginal">Fig. 01</span>
              <span className="marginal text-ink">{site.name}</span>
            </figcaption>
          </figure>
        </div>

        {/* ── Figures ── */}
        <dl className="mt-12 grid grid-cols-2 border-t border-rule md:mt-16 md:grid-cols-4">
          {about.stats.map((s, i) => (
            <div
              key={s.label}
              className={clsx(
                "border-rule py-7 pr-6",
                i % 2 === 1 && "border-l pl-6",
                i >= 2 && "border-t md:border-t-0",
                "md:border-l md:pl-6",
                i === 0 && "md:border-l-0 md:pl-0",
              )}
            >
              <dd className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-none tracking-[-0.04em] text-ink tabular-nums">
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
