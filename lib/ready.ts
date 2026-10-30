/**
 * One tiny gate: "the preloader is off the screen, intros may play."
 *
 * Hero reveals are created paused and held here, so they are not spent
 * behind the loading panel. If the preloader never reports in - it was
 * removed, its timeline threw, fonts never settled - the safety net below
 * opens the gate anyway, so the page can never be stuck invisible.
 */

const FALLBACK_MS = 3500;

let ready = false;
const waiting = new Set<() => void>();

export function markReady(): void {
  if (ready) return;
  ready = true;
  for (const run of waiting) run();
  waiting.clear();
}

export function isReady(): boolean {
  return ready;
}

/** Runs `run` now if the gate is already open, else once it opens. */
export function whenReady(run: () => void): () => void {
  if (ready) {
    run();
    return () => {};
  }
  waiting.add(run);
  return () => waiting.delete(run);
}

if (typeof window !== "undefined") {
  window.setTimeout(markReady, FALLBACK_MS);
}
