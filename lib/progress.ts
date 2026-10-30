import { ScrollTrigger } from "./gsap-config";

type Options = {
  /** ScrollTrigger start / end, in its own vocabulary. */
  start?: string;
  end?: string;
  /** The custom property written on `el`, 0 → 1. */
  name?: string;
  trigger?: HTMLElement;
  onUpdate?: (progress: number, self: ScrollTrigger) => void;
};

/**
 * The lenis.dev technique: one ScrollTrigger per scene writes its own
 * progress into a CSS custom property, and the stylesheet does the rest
 * with `calc()`. No tween per element, no React re-render per frame - and
 * since Lenis already smooths the scroll, the value is used raw.
 *
 * The property is only ever written on `el`, so only that subtree
 * recalculates. Returns the trigger so the caller can kill it.
 */
export function scrollProgress(el: HTMLElement, opts: Options = {}): ScrollTrigger {
  const { start = "top top", end = "bottom bottom", name = "--p", trigger = el, onUpdate } = opts;

  const write = (self: ScrollTrigger) => {
    el.style.setProperty(name, self.progress.toFixed(4));
    onUpdate?.(self.progress, self);
  };

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    invalidateOnRefresh: true,
    onUpdate: write,
    onRefresh: write,
  });
}
