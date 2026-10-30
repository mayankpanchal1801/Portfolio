import Lenis from 'lenis'
import { gsap } from './gsap-config'
import { ScrollTrigger } from './gsap-config'
import { whenReady } from './ready'

let lenis: Lenis | null = null
let tickerCallback: ((time: number) => void) | null = null

/** Everything currently holding the page still - menu, palette, preloader. */
const locks = new Set<string>()

export function initLenis(): Lenis {
  if (lenis) return lenis

  lenis = new Lenis({
    // The lenis.dev feel: a plain 0.1 lerp rather than a fixed duration, so
    // a flick and a long drag both settle with the same weight.
    lerp: 0.1,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    // Touch keeps the platform's own inertia - syncTouch is still flaky on
    // older iOS and a phone's native fling is already what people expect.
    syncTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
    // In-page #anchors glide instead of jumping, clearing the floating header.
    anchors: { offset: -96 },
    // A link click mid-fling must not carry the old momentum into the new page.
    // Overlays that scroll on their own (the palette list) opt out with
    // `data-lenis-prevent`, which Lenis reads natively.
    stopInertiaOnNavigate: true,
  })

  // Feed Lenis into GSAP ticker so they share the same RAF loop
  tickerCallback = (time: number) => {
    lenis?.raf(time * 1000)
  }
  gsap.ticker.add(tickerCallback)
  gsap.ticker.lagSmoothing(0)

  // Keep ScrollTrigger in sync with Lenis scroll position
  lenis.on('scroll', ScrollTrigger.update)

  // The preloader holds the page at 0 until it lifts; so does Lenis.
  if (document.documentElement.classList.contains('is-loading')) {
    lockScroll('preloader')
    whenReady(() => unlockScroll('preloader'))
  }
  sync()

  return lenis
}

export function getLenis(): Lenis | null {
  return lenis
}

export function destroyLenis(): void {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback)
    tickerCallback = null
  }
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}

function sync(): void {
  if (!lenis) return
  if (locks.size) lenis.stop()
  else lenis.start()
}

/**
 * Freeze the page under an overlay. Keyed, so the menu closing cannot
 * unfreeze a page the palette is still holding. Falls back to the plain
 * `overflow: hidden` lock when Lenis is off (reduced motion).
 */
export function lockScroll(key: string): void {
  locks.add(key)
  document.documentElement.classList.add('is-locked')
  sync()
}

export function unlockScroll(key: string): void {
  locks.delete(key)
  if (!locks.size) document.documentElement.classList.remove('is-locked')
  sync()
}

/**
 * Scroll anywhere through Lenis when it is running, natively otherwise.
 * `offset` defaults to the floating header's clearance.
 */
export function scrollToTarget(
  target: number | string | HTMLElement,
  { offset = -96, immediate = false }: { offset?: number; immediate?: boolean } = {},
): void {
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate, duration: immediate ? 0 : 1.4 })
    return
  }
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  const top =
    typeof el === 'number'
      ? el
      : el
        ? el.getBoundingClientRect().top + window.scrollY + offset
        : 0
  window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
}
