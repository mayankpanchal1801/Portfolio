'use client'

import { gsap } from '@/lib/gsap-config'
import { useEffect, useRef } from 'react'

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    // Initial page-load reveal: cover slides up and out
    gsap.fromTo(
      overlay,
      { yPercent: 0 },
      {
        yPercent: -100,
        duration: 0.7,
        ease: 'expo.inOut',
        delay: 0.05,
        onComplete: () => {
          overlay.style.pointerEvents = 'none'
        },
      }
    )
  }, [])

  return (
    <div
      ref={overlayRef}
      className="page-transition"
      aria-hidden="true"
    />
  )
}
