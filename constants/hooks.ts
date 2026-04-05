'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from '@/lib/gsap-config'
import { useActiveSectionContext } from '@/context/active-section-context'
import { SectionName } from './types'

export function useSectionInView(sectionName: SectionName, threshold = 0.5) {
  const ref = useRef<HTMLElement>(null)
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext()

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    ScrollTrigger.create({
      trigger: el,
      start: `top ${(1 - threshold) * 100}%`,
      end: `bottom ${threshold * 100}%`,
      onEnter: () => {
        if (Date.now() - timeOfLastClick > 1000) {
          setActiveSection(sectionName)
        }
      },
      onEnterBack: () => {
        if (Date.now() - timeOfLastClick > 1000) {
          setActiveSection(sectionName)
        }
      },
    })
  }, [sectionName, threshold, timeOfLastClick, setActiveSection])

  return { ref }
}
