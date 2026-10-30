"use client";

import FigureLabel from "@/components/primitives/FigureLabel";
import Plate from "@/components/primitives/Plate";
import Reveal from "@/components/primitives/Reveal";
import { experienceArr } from "@/constants/experience";
import { gsap } from "@/lib/gsap-config";
import { scrollProgress } from "@/lib/progress";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useRef, useState } from "react";

type Props = { full?: boolean; index?: string; headingId?: string };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2024-08" → 2024.583 */
function decimalYear(iso: string) {
  const [y, m] = iso.split("-").map(Number);
  return y + ((m || 1) - 1) / 12;
}

/** Oldest first - the section reads as a climb. */
const roles = experienceArr.filter((e) => e.type === "work").reverse();
const education = experienceArr.find((e) => e.type === "education");

const STARTS = roles.map((r) => decimalYear(r.dateStart));
const FROM = STARTS[0];
const TO = Math.max(...roles.map((r) => (r.dateEnd ? decimalYear(r.dateEnd) : FROM + 1)));
const SPAN = TO - FROM;
/** 0 → 1 position of a moment on the career's own time axis. */
const at = (year: number) => (year - FROM) / SPAN;
const YEARS = Array.from(
  { length: Math.floor(TO) - Math.ceil(FROM) + 1 },
  (_, i) => Math.ceil(FROM) + i,
);
/** Scroll that walks the timeline; the remainder holds the last role. */
const WALK = 0.9;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Career as a climb, in the scroll-scene language of the rest of the site.
 *
 * The scene sticks and the scroll *is* the calendar: it walks from the
 * first day as an Associate to the last day as Lead at a constant rate,
 * so a fourteen-month role holds the screen twice as long as a
 * seven-month one. On the left the year rolls over on an odometer, the
 * level counts up and a clay line climbs a staircase whose treads are as
 * wide as each role was long; on the right the role plates hand over as
 * the line reaches each riser; along the foot a needle rides the axis.
 *
 * Unarmed - small or short screens, reduced motion, no script - it is the
 * same plates as a plain list, oldest first.
 */
export default function Chronology({
  full = false,
  index = "05",
  headingId = "chronology-heading",
}: Props) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const n = roles.length;

  useGSAP(
    () => {
      const scene = sceneRef.current;
      if (!scene) return;
      const mm = gsap.matchMedia();
      mm.add(
        `(min-width: 1024px) and (min-height: ${full ? 760 : 680}px) and (prefers-reduced-motion: no-preference)`,
        () => {
          let current = -1;
          scene.dataset.armed = "";
          const st = scrollProgress(scene, {
            onUpdate: (p) => {
              const t = FROM + Math.min(1, p / WALK) * SPAN;
              let i = 0;
              STARTS.forEach((start, k) => {
                if (start <= t + 1e-6) i = k;
              });
              if (i !== current) {
                current = i;
                setActive(i);
              }
              if (dateRef.current) {
                const month = Math.min(11, Math.floor((t % 1) * 12 + 1e-6));
                dateRef.current.textContent = `${MONTHS[month]} ${Math.floor(t)}`;
              }
            },
          });
          return () => {
            st.kill();
            delete scene.dataset.armed;
            scene.style.removeProperty("--p");
            setActive(0);
          };
        },
      );
      return () => mm.revert();
    },
    { scope: sceneRef, dependencies: [full] },
  );

  const year = roles[active].dateStart.slice(0, 4);

  return (
    <section id="experience" aria-labelledby={headingId}>
      <div
        ref={sceneRef}
        className="career relative"
        style={{ "--n": n, "--walk": WALK } as React.CSSProperties}
      >
        <div className="career__sticky">
          <div className="career__grid shell grid gap-x-12 gap-y-14 py-(--rhythm) lg:grid-cols-12">
            {/* ── Left: the heading, then the instruments. ── */}
            <div className="career__lead flex flex-col lg:col-span-5" data-lit>
              <FigureLabel index={index} label="career" className="w-full" />
              <Reveal
                as="h2"
                id={headingId}
                mode="words"
                className="mt-10 font-display text-d1 font-medium text-ink"
              >
                Associate to Lead, <span className="lit">one team</span>.
              </Reveal>
              <p className="mt-6 max-w-md text-ink-2">
                From translating Figma files to setting technical strategy for 15+ products —
                each step earned by shipping.
              </p>

              <div aria-hidden className="career__instr mt-auto pt-10">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="tag">since</p>
                    <Odometer
                      value={year}
                      className="mt-2 font-display text-[clamp(3.75rem,7vw,6.5rem)] font-medium tracking-[-0.05em] text-ink"
                    />
                  </div>
                  <div className="text-right">
                    <p className="tag">level</p>
                    <p className="mt-2 font-display text-d2 font-medium tabular-nums text-accent">
                      L{active + 1}
                      <span className="text-ink-3">/{n}</span>
                    </p>
                  </div>
                </div>
                <Stairs active={active} />
              </div>
            </div>

            {/* ── Right: one plate per role. ── */}
            <ol className="career__stack space-y-8 lg:col-span-7 lg:self-center">
              {roles.map((job, i) => (
                <li
                  key={job.dateStart}
                  className={clsx(
                    "career__role",
                    i === active && "is-active",
                    i < active && "is-past",
                  )}
                >
                  <Plate seed={`role-${job.dateStart}`} gleam className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <p className="tag tag--accent tabular-nums">
                        L{i + 1} · {job.date}
                      </p>
                      <p className="tag">{job.location}</p>
                    </div>
                    <h3 className="mt-5 font-display text-d2 font-medium text-ink">{job.title}</h3>
                    <p className="mt-2 text-sm text-accent-ink">{job.company}</p>
                    <p className="mt-5 max-w-2xl text-ink-2">{job.description}</p>

                    {full && (
                      <ul className="mt-6 space-y-2.5 text-sm text-ink-2">
                        {job.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {job.stack && (
                      <ul className="mt-7 flex flex-wrap gap-1.5">
                        {job.stack.slice(0, full ? undefined : 8).map((tech) => (
                          <li key={tech} className="chip">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Plate>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Foot: the career's own time axis, with a needle on "now". ── */}
          <div aria-hidden className="career__axis shell">
            <div className="relative h-12">
              <div className="absolute inset-x-0 top-5 h-px bg-rule" />
              <div className="career__axis-fill absolute inset-x-0 top-5 h-px bg-accent" />
              {YEARS.map((y) => (
                <span
                  key={y}
                  className="absolute top-3 flex -translate-x-1/2 flex-col items-center gap-2"
                  style={{ left: `${at(y) * 100}%` }}
                >
                  <span className="h-2 w-px bg-rule-strong" />
                  <span className="tag tabular-nums text-ink-3">{y}</span>
                </span>
              ))}
              {roles.map((job, i) => (
                <span
                  key={job.dateStart}
                  className={clsx(
                    "career__mark absolute top-5 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-rule-strong bg-paper",
                    i <= active && "is-on",
                  )}
                  style={{ left: `${at(STARTS[i]) * 100}%` }}
                />
              ))}
              <span className="career__needle absolute -top-1 bottom-0 w-px bg-accent">
                <span
                  ref={dateRef}
                  className="tag absolute -top-5 left-2 whitespace-nowrap tabular-nums text-accent"
                >
                  {MONTHS[Math.round((FROM % 1) * 12)]} {Math.floor(FROM)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {education && (
        <div className="shell pb-(--rhythm)">
          <Reveal
            mode="fade"
            className="grid gap-4 border-t border-rule pt-8 lg:grid-cols-12 lg:gap-12"
          >
            <p className="tag tabular-nums lg:col-span-5">
              <span className="text-accent">L0</span> · {education.date}
            </p>
            <div className="lg:col-span-7">
              <p className="font-display text-lg font-medium text-ink">{education.title}</p>
              <p className="text-sm text-ink-3">
                {education.company} · {education.location}
              </p>
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}

/**
 * Digits that roll to their value instead of swapping - each column is a
 * strip of 0-9 translated by its digit (see `.odo` in globals.css).
 */
function Odometer({ value, className }: { value: string; className?: string }) {
  return (
    <span className={clsx("odo tabular-nums", className)}>
      {Array.from(value).map((ch, i) => (
        <span key={i} className="odo__col">
          <span
            className="odo__strip"
            style={{ "--d": Number(ch), "--i": i } as React.CSSProperties}
          >
            {Array.from({ length: 10 }, (_, d) => (
              <span key={d}>{d}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * The staircase. Each tread is as wide as the role was long and one riser
 * high; the clay copy on top is uncovered left to right with the scroll,
 * so it climbs each riser at the moment that promotion happened.
 */
function Stairs({ active }: { active: number }) {
  const W = 420;
  const H = 132;
  const rise = (H - 24) / roles.length;
  const x = (i: number) => (i < roles.length ? at(STARTS[i]) : 1) * W;
  const y = (i: number) => H - (i + 1) * rise;
  const d = `M0 ${H} ${roles.map((_, i) => `V${y(i)} H${x(i + 1)}`).join(" ")}`;

  const svg = (stroke: string) => (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" preserveAspectRatio="none">
      <path d={d} fill="none" stroke={stroke} strokeWidth={1} vectorEffect="non-scaling-stroke" />
    </svg>
  );

  return (
    <div className="relative mt-8">
      {svg("var(--c-rule-strong)")}
      <div className="career__climb absolute inset-0">{svg("var(--c-accent)")}</div>
      {roles.map((job, i) => (
        <span
          key={job.dateStart}
          className={clsx(
            "career__step tag absolute -translate-y-full pb-2 tabular-nums",
            i <= active ? "text-accent" : "text-ink-3",
          )}
          style={{ left: `${(x(i) / W) * 100}%`, top: `${(y(i) / H) * 100}%` }}
        >
          L{i + 1} · {pad(Number(job.dateStart.slice(2, 4)))}
        </span>
      ))}
    </div>
  );
}
