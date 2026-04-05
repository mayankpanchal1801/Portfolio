'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap-config'
import { ScrollTrigger } from '@/lib/gsap-config'

export default function Footer() {
  const year     = new Date().getFullYear()
  const lineRef  = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const line = lineRef.current
    if (!line) return

    gsap.from(line, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      },
    })
  }, [])

  return (
    <footer ref={footerRef} className="relative py-8 mt-4">
      {/* Divider line draws in */}
      <div
        ref={lineRef}
        className="h-px bg-ash mb-8 mx-6 sm:mx-8"
        style={{ transformOrigin: 'left' }}
      />

      <div className="section-inner">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-label text-mist uppercase tracking-[0.1em]">
            &copy; {year} Mayank Panchal. All rights reserved.
          </p>
          <p className="font-mono text-label text-mist uppercase tracking-[0.1em]">
            Designed &amp; built by{' '}
            <span className="text-chalk">Mayank</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
