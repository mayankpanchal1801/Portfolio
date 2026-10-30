import FigureLabel from "@/components/primitives/FigureLabel";
import LocalTime from "@/components/primitives/LocalTime";
import Magnetic from "@/components/primitives/Magnetic";
import Reveal from "@/components/primitives/Reveal";
import Roll from "@/components/primitives/Roll";
import Rotator from "@/components/primitives/Rotator";
import Wordmark3D from "@/components/primitives/Wordmark3D";
import HeroInstrument from "@/components/sections/HeroInstrument";
import HeroStage from "@/components/sections/HeroStage";
import { contact, site } from "@/constants/personal";
import Link from "next/link";

const FOCUS = [
  "scalable frontends",
  "async Python APIs",
  "design systems",
  "high-performing teams",
];

/** Three facts, drawn in as a tick-list once the instrument has landed. */
const MARKS = [
  "Schema → API → UI → container → production URL",
  "15+ products led end to end, one engineering bar",
  "Core Web Vitals and bundle budgets set on day one",
];

/**
 * The opening scene, in two beats.
 *
 * Beat one is type: the name set edge to edge the way lenis.dev sets its
 * title - first line hard left, second hard right - with the role tucked
 * into the space the first line leaves, the stack into the space the
 * second leaves, and the pitch and the two doors on a line beneath.
 *
 * Beat two is the work: scrolling parts the name to either side while the
 * architecture instrument rises out of the floor plane, tilts upright and
 * settles in the gap, readouts floating in front of it.
 *
 * HeroStage arms the scroll and the pointer parallax; every position here
 * is the unarmed layout, which is what touch, reduced motion and a page
 * with no script all get.
 */
export default function Hero() {
  return (
    <HeroStage aria-labelledby="hero-name">
      <div className="hero__sticky">
        {/* ── Atmosphere. Each layer gets its own wrapper: the drift lives
               on the element's `translate`, the parallax on the wrapper's
               `transform`, so the two never overwrite each other. ── */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0" data-par="0.3">
            <span className="orb -left-40 -top-24 h-[42rem] w-[42rem]" />
          </div>
          <div className="absolute inset-0" data-par="0.75">
            <span
              className="orb right-[8%] top-[38%] h-[26rem] w-[26rem]"
              style={{ animationDelay: "-7s", animationDuration: "23s" }}
            />
          </div>
          <div className="hero__floor absolute inset-0" data-par="0.18">
            <span className="floor" />
          </div>
          <span className="scanline" style={{ "--scan-travel": "72vh" } as React.CSSProperties} />
        </div>

        <div className="hero__type shell relative z-[1] w-full">
          {/* ── Telemetry rail, flush to the top line. ── */}
          <div className="hero__top">
            <Reveal
              mode="fade"
              immediate
              delay={0.05}
              className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-rule pb-5"
            >
              <FigureLabel index="00" label="index" rule={false} />
              <p className="tag tag--accent flex items-center gap-2">
                <span className="ping h-1.5 w-1.5 bg-accent" />
                Open to new opportunities
              </p>
              <p className="tag flex items-center gap-2 tabular-nums">
                {contact.city} <span aria-hidden className="text-rule-strong">/</span>{" "}
                <LocalTime />
              </p>
            </Reveal>
          </div>

          {/* ── The name, split across the full measure. ── */}
          <div className="hero__title relative mt-10 lg:mt-[5svh]" data-par="0.12">
            <Wordmark3D
              id="hero-name"
              className="hero__mark text-[clamp(3.75rem,min(16.5vw,25svh),17rem)] leading-[0.84] tracking-[-0.055em]"
              lines={[
                { text: "Mayank", className: "hero__l1" },
                { text: "Panchal", accent: true, align: "end", className: "hero__l2" },
              ]}
            />

            {/* Top-right: the role, in the room "Mayank" leaves. */}
            <div className="hero__tr mt-10 lg:absolute lg:right-0 lg:top-[5%] lg:mt-0 lg:w-[min(34%,30rem)]">
              <Reveal as="p" mode="rise" immediate delay={0.45} className="font-display text-d3 font-medium text-ink">
                {site.role}, building <Rotator items={FOCUS} className="text-accent" />
              </Reveal>
            </div>

            {/* Bottom-left: the stack, in the room "Panchal" leaves. */}
            <div className="hero__bl mt-5 lg:absolute lg:bottom-[9%] lg:left-0 lg:mt-0 lg:w-[min(40%,34rem)]">
              <Reveal as="p" mode="fade" immediate delay={0.55} className="tag leading-relaxed">
                Next.js · FastAPI · PostgreSQL · Docker · AWS
              </Reveal>
            </div>
          </div>

          {/* ── The pitch and the doors, on their own line under the name. ── */}
          <div className="hero__pitch mt-10 grid gap-8 lg:mt-[4svh] lg:grid-cols-12 lg:items-end">
            <Reveal as="p" mode="fade" immediate delay={0.6} className="text-lede text-ink-2 lg:col-span-6">
              Five years turning product ideas into fast, accessible, production-grade
              software — and growing the engineers who build it.
            </Reveal>
            <Reveal
              mode="fade"
              immediate
              delay={0.75}
              className="flex flex-wrap items-center gap-4 lg:col-span-6 lg:justify-end"
            >
              <Magnetic>
                <Link href="/projects" className="btn btn-solid" data-cursor="Open">
                  <Roll>View selected work →</Roll>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/contact" className="btn btn-outline">
                  <Roll>Start a conversation</Roll>
                </Link>
              </Magnetic>
            </Reveal>
          </div>

          {/* ── Foot: the invitation to scroll, and the palette. ── */}
          <div aria-hidden className="hero__foot mt-12 hidden items-center justify-between lg:flex">
            <span className="flex items-center gap-4">
              <span className="scroll-cue" />
              <span className="tag text-ink-3">scroll to open the stack</span>
            </span>
            <span className="tag text-ink-3">
              or press <kbd className="border border-rule-strong px-1.5 py-1 font-mono">⌘K</kbd>
            </span>
          </div>
        </div>

        {/* ── Beat two: the instrument, rising out of the floor, with the
               three facts it stands for alongside. ── */}
        <div className="hero__rig shell relative z-[2] grid items-center gap-10 lg:max-w-[68rem] lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
          <Reveal mode="depth" immediate delay={0.7} className="stage">
            <HeroInstrument />
          </Reveal>

          <div className="hero__marks">
            <FigureLabel index="00.3" label="how I work" rule={false} />
            <ul className="ticks mt-6" data-lit>
              {MARKS.map((mark, i) => (
                <li key={mark} style={{ "--i": i } as React.CSSProperties} className="text-sm">
                  {mark}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </HeroStage>
  );
}
