import LocalTime from "@/components/primitives/LocalTime";
import Magnetic from "@/components/primitives/Magnetic";
import Reveal from "@/components/primitives/Reveal";
import Rotator from "@/components/primitives/Rotator";
import SystemGraph from "@/components/sections/SystemGraph";
import { contact, site } from "@/constants/personal";
import Link from "next/link";

const FOCUS = [
  "scalable frontends",
  "async Python APIs",
  "design systems",
  "high-performing teams",
];

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] items-center pb-16 pt-32 md:pb-20"
      aria-labelledby="hero-name"
    >
      {/* Ambient glow behind the headline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--c-glow), transparent 65%)" }}
      />

      <div className="shell relative z-[1] w-full">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal mode="fade" immediate delay={0.05} className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="tag tag--accent flex items-center gap-2 rounded-full border border-accent-line bg-accent-soft px-3 py-2">
                <span className="ping h-1.5 w-1.5 rounded-full bg-accent" />
                Open to new opportunities
              </p>
              <p className="tag flex items-center gap-2 tabular-nums">
                {contact.city} <span aria-hidden>/</span> <LocalTime />
              </p>
            </Reveal>

            <Reveal
              as="h1"
              id="hero-name"
              mode="words"
              immediate
              delay={0.1}
              className="mt-8 font-display text-[clamp(4.5rem,12.5vw,12rem)] font-normal leading-[0.8] tracking-[-0.035em]"
            >
              Mayank
              <br />
              <span className="text-signal">Panchal</span>
            </Reveal>

            <Reveal
              as="p"
              mode="rise"
              immediate
              delay={0.35}
              className="mt-6 font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-tight tracking-[-0.03em] text-ink"
            >
              {site.role}, building{" "}
              <Rotator items={FOCUS} className="italic text-accent" />
            </Reveal>

            <Reveal
              as="p"
              mode="fade"
              immediate
              delay={0.5}
              className="measure mt-6 text-lede text-ink-2"
            >
              Five years turning product ideas into fast, accessible, production-grade
              software — and growing the engineers who build it. I lead delivery across{" "}
              <em className="not-italic text-ink">Next.js</em>,{" "}
              <em className="not-italic text-ink">FastAPI</em> and{" "}
              <em className="not-italic text-ink">PostgreSQL</em>, from first schema to the
              container in production.
            </Reveal>

            <Reveal mode="fade" immediate delay={0.65} className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link href="/projects" className="btn btn-solid" data-cursor="Open">
                  View selected work →
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/contact" className="btn btn-outline">
                  Start a conversation
                </Link>
              </Magnetic>
              <p className="tag hidden xl:block">
                or press <kbd className="rounded border border-rule-strong px-1.5 py-1">⌘K</kbd>
              </p>
            </Reveal>
          </div>

          <Reveal mode="rise" immediate delay={0.6} className="lg:col-span-5">
            <SystemGraph />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
