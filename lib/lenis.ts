import Lenis from 'lenis'
import { gsap } from './gsap-config'
import { ScrollTrigger } from './gsap-config'

let lenis: Lenis | null = null

export function initLenis(): Lenis {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  })

  // Feed Lenis into GSAP ticker so they share the same RAF loop
  gsap.ticker.add((time: number) => {
    lenis?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // Keep ScrollTrigger in sync with Lenis scroll position
  lenis.on('scroll', ScrollTrigger.update)

  return lenis
}

export function getLenis(): Lenis | null {
  return lenis
}

export function destroyLenis(): void {
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}
