"use client";

import FigureLabel from "@/components/primitives/FigureLabel";
import Mark from "@/components/primitives/Mark";
import Plate from "@/components/primitives/Plate";
import ReadAlong from "@/components/primitives/ReadAlong";
import Reveal from "@/components/primitives/Reveal";
import { about } from "@/constants/personal";
import { gsap } from "@/lib/gsap-config";
import { scrollProgress } from "@/lib/progress";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";

const LEADS = [
  { k: "Team", v: "Frontend engineers, mentored through the full delivery cycle" },
  { k: "Process", v: "Code review, CI/CD, design-system and a11y baselines" },
  { k: "Outcome", v: "15+ products shipped on a shared engineering bar" },
];

/**
 * How I lead, in two movements.
 *
 * First a statement that lights word by word as it is read. Then the
 * principles as lenis.dev's "brings the heat" cascade: the scene sticks,
 * and each plate steps in from off-screen to its own place on a diagonal,
 * one per stretch of scroll - and steps back out if you scroll back.
 * The heading sits in the empty triangle the diagonal leaves bottom-left,
 * the supporting facts in the one it leaves top-right.
 *
 * Unarmed, the plates are a plain two-column grid.
 */
export default function Approach() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const n = about.values.length;

  useGSAP(
    () => {
      const scene = sceneRef.current;
      if (!scene) return;
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>("[data-cascade-card]", scene);
          scene.dataset.armed = "";
          const st = scrollProgress(scene, {
            onUpdate: (p) => {
              cards.forEach((card, i) => {
                card.classList.toggle("is-in", p >= 0.06 + (i * 0.78) / cards.length);
              });
            },
          });
          return () => {
            st.kill();
            delete scene.dataset.armed;
            scene.style.removeProperty("--p");
            for (const card of cards) card.classList.remove("is-in");
          };
        },
      );
      return () => mm.revert();
    },
    { scope: sceneRef },
  );

  return (
    <section id="approach" aria-labelledby="approach-heading">
      <div className="shell pt-(--rhythm)">
        <FigureLabel index="03" label="how I lead" className="w-full" />
        <ReadAlong className="mt-12 max-w-[30ch] font-display text-d2 font-medium text-ink">
          I&rsquo;m a lead engineer who owns the whole line — the schema, the async API,
          the type-safe UI, the container and the deploy. Five years, fifteen-plus
          products, <span className="text-accent">one engineering bar.</span>
        </ReadAlong>
        <p className="mt-10">
          <Link href="/about" className="uline tag text-ink">
            The longer version ↗
          </Link>
        </p>
      </div>

      <div
        ref={sceneRef}
        className="cascade relative"
        style={{ "--n": n } as React.CSSProperties}
      >
        <div className="cascade__sticky">
          <div className="cascade__stage shell grid gap-x-4 gap-y-12 py-(--rhythm) md:grid-cols-2">
            <div className="cascade__head md:col-span-2" data-lit>
              <Reveal
                as="h2"
                id="approach-heading"
                mode="words"
                className="font-display text-d1 font-medium text-ink"
              >
                Principles, <span className="lit">not process</span>.
              </Reveal>
            </div>

            <p className="cascade__aside text-ink-2 md:col-span-2">
              Lead engineers are force multipliers. This is the playbook I run teams on.
            </p>

            {about.values.map((value, i) => (
              <div
                key={value.title}
                data-cascade-card
                className="cascade__card"
                style={{ "--i": i } as React.CSSProperties}
              >
                <Plate
                  seed={`value-${value.title}`}
                  tilt={4}
                  gleam
                  className="cascade__plate flex h-full flex-col justify-between gap-6 p-6 sm:p-7"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-[clamp(2.5rem,4vw,4.25rem)] font-medium leading-none tracking-[-0.05em] text-outline tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="tag">/ {String(n).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-d3 font-medium text-ink">{value.title}</h3>
                    <p className="mt-3 max-w-md text-sm text-ink-2 sm:text-base lg:text-sm xl:text-base">{value.body}</p>
                  </div>
                </Plate>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The three facts behind the principles, set as one hairline strip. */}
      <div className="shell pb-(--rhythm)">
        <dl className="relative isolate grid border-t border-rule md:grid-cols-3">
          <Mark preset="scale" seed="approach-leads" />
          {LEADS.map((lead) => (
            <div
              key={lead.k}
              className="border-b border-rule px-1 py-7 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0"
            >
              <dt className="tag tag--accent">{lead.k}</dt>
              <dd className="mt-3 text-sm text-ink-2">{lead.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
