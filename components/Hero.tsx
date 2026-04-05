'use client'

import MagneticButton from '@/components/ui/MagneticButton'
import SvgOrbit from '@/components/ui/SvgOrbit'
import { useSectionInView } from '@/constants/hooks'
import { useActiveSectionContext } from '@/context/active-section-context'
import { gsap } from '@/lib/gsap-config'
import { splitText } from '@/lib/text-splitter'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { BsArrowRight, BsDownload, BsGithub, BsLinkedin } from 'react-icons/bs'

export default function Hero() {
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext()
  const { ref: sectionRef } = useSectionInView('Hero', 0.5)
  const labelRef     = useRef<HTMLSpanElement>(null)
  const headlineRef  = useRef<HTMLHeadingElement>(null)
  const subtextRef   = useRef<HTMLParagraphElement>(null)
  const ctasRef      = useRef<HTMLDivElement>(null)
  const photoWrapRef = useRef<HTMLDivElement>(null)
  const emojiRef     = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const label    = labelRef.current
    const headline = headlineRef.current
    const subtext  = subtextRef.current
    const ctas     = ctasRef.current
    const photo    = photoWrapRef.current
    if (!label || !headline || !subtext || !ctas || !photo) return

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.5 })

    // Split label into chars
    const labelChars = splitText(label, 'chars')

    // Split headline into words
    const headlineWords = splitText(headline, 'words')

    tl
      // Label chars stagger in
      .from(labelChars, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.025,
        ease: 'back.out(2)',
      })
      // Headline words slam up
      .from(
        headlineWords,
        { yPercent: 110, duration: 0.85, stagger: 0.07, ease: 'expo.out' },
        '-=0.3'
      )
      // Subtext
      .from(subtext, { opacity: 0, y: 24, duration: 0.6 }, '-=0.5')
      // CTAs
      .from(Array.from(ctas.children), {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
      }, '-=0.4')
      // Photo
      .from(
        photo,
        { scale: 0, opacity: 0, duration: 1.1, ease: 'elastic.out(1, 0.55)' },
        0.2
      )

    // Scroll parallax on photo
    gsap.to(photo, {
      yPercent: -35,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, [])

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Radial glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(20,184,166,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="section-inner w-full pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">

          {/* LEFT — text content */}
          <div className="max-w-[640px]">
            {/* Label */}
            <span
              ref={labelRef}
              className="inline-block font-mono text-label uppercase tracking-[0.18em] text-gold mb-6"
              aria-label="Full Stack Developer"
            >
              Full Stack Developer
            </span>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="font-display font-bold text-chalk mb-6"
              style={{
                fontSize: 'clamp(3rem, 8vw, 7.5rem)',
                lineHeight: '0.95',
                letterSpacing: '-0.04em',
              }}
              aria-label="Hello, I'm Mayank."
            >
              Hello,{'\u00A0'}I&apos;m Mayank.
            </h1>

            {/* Subtext */}
            <p
              ref={subtextRef}
              className="text-mist text-[1.0625rem] leading-relaxed mb-10 max-w-[480px]"
            >
              I build accessible, pixel-perfect digital experiences for the web — with precision,
              performance, and a love for clean code.
            </p>

            {/* CTAs */}
            <div ref={ctasRef} className="flex flex-wrap gap-4 items-center">
              <MagneticButton>
                <Link
                  href="#contact"
                  className="btn-base btn-filled group"
                  onClick={() => {
                    setActiveSection('Contact')
                    setTimeOfLastClick(Date.now())
                  }}
                >
                  Contact me
                  <BsArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="/resume.pdf"
                  download
                  title="Mayank Panchal Resume"
                  className="btn-base btn-outline"
                >
                  Download CV
                  <BsDownload />
                </a>
              </MagneticButton>

              <div className="flex items-center gap-3 ml-2">
                <a
                  href="https://www.linkedin.com/in/mayankpanchal01/"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="w-10 h-10 rounded-full border border-ash flex items-center justify-center text-mist hover:text-chalk hover:border-mist transition-colors text-[1.1rem]"
                  data-cursor="link"
                >
                  <BsLinkedin />
                </a>
                <a
                  href="https://github.com/munkpanchal"
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                  className="w-10 h-10 rounded-full border border-ash flex items-center justify-center text-mist hover:text-chalk hover:border-mist transition-colors text-[1.1rem]"
                  data-cursor="link"
                >
                  <BsGithub />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — photo */}
          <div
            ref={photoWrapRef}
            className="relative mx-auto lg:mx-0 flex-shrink-0"
            style={{ width: 260, height: 260 }}
            data-cursor="image"
          >
            {/* Teal glow behind photo */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(20,184,166,0.35) 0%, transparent 70%)',
                transform: 'scale(1.4)',
              }}
              aria-hidden="true"
            />

            {/* Orbit ring — animated SVG */}
            <SvgOrbit
              radius={136}
              strokeColor="rgba(20,184,166,0.4)"
              strokeWidth={1}
              duration={1.2}
              delay={0.8}
              className="-inset-[8px]"
            />
            <SvgOrbit
              radius={148}
              strokeColor="rgba(245,158,11,0.2)"
              strokeWidth={1}
              duration={1.5}
              delay={1.0}
              className="-inset-[20px]"
            />

            {/* Profile photo */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-ash">
              <Image
                src="/bannerDp.jpg"
                alt="Mayank Panchal"
                fill
                sizes="260px"
                className="object-cover"
                priority
              />
            </div>

            {/* Wave emoji */}
            <span
              ref={emojiRef}
              className="absolute -bottom-1 -right-1 text-3xl select-none pointer-events-none"
              aria-hidden="true"
            >
              👋
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-mist">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-mist to-transparent" />
        </div>
      </div>
    </section>
  )
}
