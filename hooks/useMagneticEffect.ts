'use client'

import { useRef, useCallback } from 'react'
import { gsap } from '@/lib/gsap-config'

interface MagneticOptions {
  strength?: number
  duration?: number
  ease?: string
}

/**
 * Magnetic hover effect — element moves toward the cursor within its bounding area.
 */
export function useMagneticEffect<T extends HTMLElement>(options: MagneticOptions = {}) {
  const { strength = 0.5, duration = 0.3, ease = 'power2.out' } = options
  const ref = useRef<T>(null)

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const relX = (e.clientX - rect.left - rect.width / 2) * strength
      const relY = (e.clientY - rect.top - rect.height / 2) * strength
      gsap.to(el, { x: relX, y: relY, duration, ease })
    },
    [strength, duration, ease]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  }, [])

  const bind = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [onMouseMove, onMouseLeave])

  return { ref, bind }
}
