"use client";

import { gsap } from "@/lib/gsap-config";
import { scrollProgress } from "@/lib/progress";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

type Props = {
  "aria-labelledby": string;
  children: React.ReactNode;
};

/**
 * The hero's stage.
 *
 * It owns the two things the markup cannot. A pointer parallax swings
 * every `[data-par]` layer by its own depth factor. And on a large screen
 * with motion allowed it arms the hero as a scroll scene: the section
 * grows, its viewport sticks, and `--p` drives the opening move in CSS -
 * the name parts to either side and the architecture instrument rises out
 * of the floor into the gap (see `.hero` in globals.css).
 *
 * Unarmed - touch, small screens, reduced motion, no script - it is one
 * screen of type with the instrument underneath.
 */
export default function HeroStage({ children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const movers = gsap.utils.toArray<HTMLElement>("[data-par]", section).map((el) => ({
            el,
            // How far this layer travels, relative to the base distance.
            depth: Number(el.dataset.par) || 1,
            x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
          }));
          if (!movers.length) return;

          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            for (const m of movers) {
              m.x(-nx * 38 * m.depth);
              m.y(-ny * 28 * m.depth);
            }
          };

          window.addEventListener("pointermove", onMove, { passive: true });
          return () => {
            window.removeEventListener("pointermove", onMove);
            for (const m of movers) gsap.set(m.el, { clearProps: "x,y" });
          };
        },
      );

      mm.add(
        "(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)",
        () => {
          section.dataset.armed = "";
          // Past a third of the way the type has gone and the instrument
          // owns the screen - hand pointer events across with it, so the
          // faded buttons can never be clicked through the panel.
          const st = scrollProgress(section, {
            onUpdate: (p) => section.classList.toggle("is-open", p > 0.35),
          });
          return () => {
            st.kill();
            section.classList.remove("is-open");
            delete section.dataset.armed;
            section.style.removeProperty("--p");
          };
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="hero stage relative isolate" {...rest}>
      {children}
    </section>
  );
}
