'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap-config'
import { ScrollTrigger } from '@/lib/gsap-config'

interface SvgOrbitProps {
  radius?: number
  strokeColor?: string
  strokeWidth?: number
  duration?: number
  delay?: number
  useScrollTrigger?: boolean
  scrollTarget?: string
  className?: string
}

export default function SvgOrbit({
  radius = 80,
  strokeColor = 'rgba(124,58,237,0.5)',
  strokeWidth = 1,
  duration = 2,
  delay = 0.8,
  useScrollTrigger: useST = false,
  scrollTarget,
  className = '',
}: SvgOrbitProps) {
  const circleRef = useRef<SVGCircleElement>(null)
  const size = (radius + strokeWidth) * 2

  useEffect(() => {
    const circle = circleRef.current
    if (!circle) return

    const circumference = 2 * Math.PI * radius
    gsap.set(circle, { strokeDasharray: circumference, strokeDashoffset: circumference })

    if (useST) {
      gsap.to(circle, {
        strokeDashoffset: 0,
        duration,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: scrollTarget || circle,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    } else {
      gsap.to(circle, {
        strokeDashoffset: 0,
        duration,
        delay,
        ease: 'power3.inOut',
      })
    }
  }, [radius, duration, delay, useST, scrollTarget])

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`absolute pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <circle
        ref={circleRef}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}
