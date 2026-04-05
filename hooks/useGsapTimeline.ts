'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap-config'
import { DependencyList, RefObject } from 'react'

/**
 * Cleanup-aware GSAP hook. All animations and ScrollTriggers created inside
 * the callback are automatically reverted on component unmount.
 */
export function useGsapContext(
  callback: (context: gsap.Context) => void,
  deps: DependencyList = [],
  scope?: RefObject<HTMLElement>
) {
  useGSAP(
    () => {
      const ctx = gsap.context(callback)
      return () => ctx.revert()
    },
    { dependencies: deps as unknown[], scope: scope?.current ?? undefined }
  )
}
