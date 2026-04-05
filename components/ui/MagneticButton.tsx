'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap-config'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  as?: keyof JSX.IntrinsicElements
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.45,
  as: Tag = 'div',
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const inner   = innerRef.current
    if (!wrapper || !inner) return

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect()
      const relX = (e.clientX - rect.left - rect.width  / 2) * strength
      const relY = (e.clientY - rect.top  - rect.height / 2) * strength
      gsap.to(inner, { x: relX, y: relY, duration: 0.3, ease: 'power2.out' })
    }

    const onLeave = () => {
      gsap.to(inner, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    }

    wrapper.addEventListener('mousemove', onMove)
    wrapper.addEventListener('mouseleave', onLeave)

    return () => {
      wrapper.removeEventListener('mousemove', onMove)
      wrapper.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return (
    <div ref={wrapperRef} className={`inline-block ${className}`}>
      <div ref={innerRef}>
        {children}
      </div>
    </div>
  )
}
