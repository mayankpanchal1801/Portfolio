'use client'

import { useRef, useEffect, forwardRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { ScrollTrigger } from '@/lib/gsap-config'

interface HorizontalScrollerProps {
  children: React.ReactNode
  className?: string
}

const HorizontalScroller = forwardRef<HTMLDivElement, HorizontalScrollerProps>(
  ({ children, className = '' }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const trackRef   = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const section = sectionRef.current
      const track   = trackRef.current
      if (!section || !track) return

      const ctx = gsap.context(() => {
        const totalWidth = track.scrollWidth - window.innerWidth

        if (totalWidth <= 0) return

        const tween = gsap.to(track, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${totalWidth + window.innerWidth * 0.5}`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }, section)

      return () => ctx.revert()
    }, [])

    return (
      <div ref={sectionRef} className={`overflow-hidden ${className}`}>
        <div ref={trackRef} className="h-scroll-track">
          {children}
        </div>
      </div>
    )
  }
)

HorizontalScroller.displayName = 'HorizontalScroller'
export default HorizontalScroller
