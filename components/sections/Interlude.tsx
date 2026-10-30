"use client";

import { gsap } from "@/lib/gsap-config";
import { scrollProgress } from "@/lib/progress";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

/**
 * The zoom-through - lenis.dev's "so we built web scrolling / Enter Lenis
 * / As it should be", in this site's own words.
 *
 * Two lines frame the screen; as you scroll the frame swells and both
 * lines are pushed off its edges while the centre phrase rushes up from a
 * speck and past the camera. Behind it the other palette floods out from
 * the middle, so the section after this one (`[data-invert]`) begins in
 * a colour the reader has already been carried into. In light mode the
 * page is already light, so the flood is the same paper and simply hands
 * over - there is never a dark band in the light theme.
 *
 * All of it is `calc()` off one `--p` (see `.interlude` in globals.css).
 * Unarmed - reduced motion, no script - it is three lines of type.
 */
export default function Interlude() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.dataset.armed = "";
        const st = scrollProgress(section);
        return () => {
          st.kill();
          delete section.dataset.armed;
          section.style.removeProperty("--p");
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="interlude relative" aria-label="How I work, in one line">
      <div className="interlude__sticky">
        <div className="interlude__frame shell">
          <p className="interlude__top font-display text-d1 font-medium text-ink">
            Fewer handoffs,
            <br />
            <span className="text-ink-3">more shipping.</span>
          </p>

          <p className="interlude__zoom justify-self-center font-display text-mark font-medium text-accent">
            End to end
          </p>

          <p className="interlude__bottom justify-self-end text-right font-display text-d1 font-medium text-ink">
            <span className="text-ink-3">Schema to</span>
            <br />
            production.
          </p>
        </div>

        <div aria-hidden className="interlude__wash" data-invert />
      </div>
    </section>
  );
}
