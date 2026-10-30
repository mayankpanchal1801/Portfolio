import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/split-text";

/**
 * One drop of ink.
 *
 * The reference spends a single drop of clay and lets it spread through
 * the page as you scroll. Here the drop is a scalar: `--ink`, driven from
 * 0 → 1 across each `[data-ink]` element's own entry, which the marks in
 * globals.css (`.ink-fill`, `.ink-tint`, `.ink-stroke`) interpolate off.
 *
 * `[data-lit]` is the other half: the highlighter swipe and the drawn
 * tick-lists arm themselves hidden and get `.is-lit` once, when the block
 * is 80% up the viewport.
 *
 * Both degrade to their finished state with no script (`--ink` defaults
 * to 1) and under reduced motion.
 */
export function playInk(root: ParentNode = document): () => void {
  const reduced = prefersReducedMotion();
  const cleanups: Array<() => void> = [];

  // Arms the pre-hidden states in globals.css. Set here rather than in the
  // stylesheet so a visitor with no script sees every mark finished instead
  // of a page of invisible bars and check-lists. useGSAP runs this in a
  // layout effect, so it lands before first paint - no flash.
  document.documentElement.classList.add("ink-ready");
  cleanups.push(() => document.documentElement.classList.remove("ink-ready"));

  for (const el of root.querySelectorAll<HTMLElement>("[data-lit]")) {
    if (reduced) {
      el.classList.add("is-lit");
      continue;
    }
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => el.classList.add("is-lit"),
    });
    cleanups.push(() => trigger.kill());
  }

  for (const el of root.querySelectorAll<HTMLElement>("[data-ink]")) {
    if (reduced) {
      el.style.setProperty("--ink", "1");
      continue;
    }
    const tween = gsap.fromTo(
      el,
      { "--ink": 0 },
      {
        "--ink": 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "top 42%",
          scrub: 0.6,
        },
      },
    );
    cleanups.push(() => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  }

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}
