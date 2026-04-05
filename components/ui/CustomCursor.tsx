'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Set initial position off-screen to avoid flash
    gsap.set([dot, ring], { x: -100, y: -100 })

    // quickTo for high-performance cursor following
    const xDot  = gsap.quickTo(dot,  'x', { duration: 0.08, ease: 'none' })
    const yDot  = gsap.quickTo(dot,  'y', { duration: 0.08, ease: 'none' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const onEnterLink = () => {
      dot.classList.add('is-link')
      ring.classList.add('is-link')
    }

    const onLeaveLink = () => {
      dot.classList.remove('is-link')
      ring.classList.remove('is-link')
    }

    const onEnterImg = () => ring.classList.add('is-img')
    const onLeaveImg = () => ring.classList.remove('is-img')

    window.addEventListener('mousemove', onMove)

    // Delegate hover detection via event delegation
    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="link"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
      document.querySelectorAll('img, [data-cursor="image"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterImg)
        el.addEventListener('mouseleave', onLeaveImg)
      })
    }

    addHoverListeners()

    // Re-apply listeners when DOM changes (MutationObserver)
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
