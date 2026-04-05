'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'

function generateNoise(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const imageData = ctx.createImageData(width, height)
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    const val = Math.floor(Math.random() * 255)
    data[i] = val
    data[i + 1] = val
    data[i + 2] = val
    data[i + 3] = 255
  }
  ctx.putImageData(imageData, 0, 0)
}

export default function NoiseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      generateNoise(ctx, canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    // Subtle breathing pulse
    const anim = gsap.to(canvas, {
      opacity: 0.055,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })

    return () => {
      window.removeEventListener('resize', resize)
      anim.kill()
    }
  }, [])

  return <canvas ref={canvasRef} className="noise-canvas" aria-hidden="true" />
}
