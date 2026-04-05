'use client'

import { useEffect } from 'react'
import { initLenis, destroyLenis } from '@/lib/lenis'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  return <>{children}</>
}
