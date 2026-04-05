'use client'

import { gsap } from '@/lib/gsap-config'
import { useEffect, useRef } from 'react'

export default function Loading() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const textRef  = useRef<HTMLSpanElement>(null)
  const barRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const text = textRef.current
    const bar  = barRef.current
    if (!wrap || !text || !bar) return

    const tl = gsap.timeline()

    // Animate loading bar
    tl.to(bar, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' })
      // Counter text
      .from(text, { opacity: 0, duration: 0.2 }, 0)
      // Fade out loader
      .to(wrap, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.7)

    // Count up 0 → 100
    const obj = { val: 0 }
    gsap.to(obj, {
      val: 100,
      duration: 0.7,
      ease: 'power2.inOut',
      onUpdate() {
        if (text) text.textContent = String(Math.floor(obj.val)).padStart(3, '0')
      },
    })
  }, [])

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[99999] bg-void flex flex-col items-center justify-center gap-8"
    >
      {/* Counter */}
      <span
        ref={textRef}
        className="font-display font-bold text-chalk opacity-0"
        style={{ fontSize: 'clamp(4rem, 12vw, 8rem)', letterSpacing: '-0.06em' }}
        aria-label="Loading"
      >
        000
      </span>

      {/* Loading bar */}
      <div className="w-48 h-px bg-ash overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-violet to-glow"
          style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
        />
      </div>

      <span className="font-mono text-label text-mist uppercase tracking-[0.2em]">
        Loading
      </span>
    </div>
  )
}
