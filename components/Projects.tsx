'use client'

import Project from '@/components/Project'
import { useSectionInView } from '@/constants/hooks'
import { projectsArr } from '@/constants/projects'
import { gsap } from '@/lib/gsap-config'
import { splitText } from '@/lib/text-splitter'
import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'

export default function Projects() {
  const { ref: sectionRef } = useSectionInView('Projects', 0.2)

  /* Desktop refs */
  const desktopRef     = useRef<HTMLDivElement>(null)
  const labelRef       = useRef<HTMLSpanElement>(null)
  const headingRef     = useRef<HTMLHeadingElement>(null)
  const counterRef     = useRef<HTMLSpanElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const cardsAreaRef   = useRef<HTMLDivElement>(null)
  const trackRef       = useRef<HTMLDivElement>(null)

  /* Mobile refs */
  const mLabelRef   = useRef<HTMLSpanElement>(null)
  const mHeadingRef = useRef<HTMLHeadingElement>(null)
  const mTrackRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return

    const isMobile = window.innerWidth < 768

    /* ── Animate label + heading for whichever layout is visible ── */
    const activeLabel   = isMobile ? mLabelRef.current   : labelRef.current
    const activeHeading = isMobile ? mHeadingRef.current : headingRef.current
    const section       = sectionRef.current as HTMLElement | null

    if (activeLabel && section) {
      const chars = splitText(activeLabel, 'chars')
      gsap.from(chars, {
        y: 14, opacity: 0, duration: 0.4, stagger: 0.02, ease: 'back.out(2)',
        scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none reverse' },
      })
    }
    if (activeHeading && section) {
      const words = splitText(activeHeading, 'words')
      gsap.from(words, {
        yPercent: 110, duration: 0.6, stagger: 0.07, ease: 'expo.out',
        scrollTrigger: { trigger: section, start: 'top 82%', toggleActions: 'play none none reverse' },
      })
    }

    /* ── Mobile: fade-in cards on scroll ── */
    if (isMobile) {
      const mCards = mTrackRef.current?.querySelectorAll('.proj-card')
      if (mCards && section) {
        gsap.from(Array.from(mCards), {
          opacity: 0, y: 36, duration: 0.55, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' },
        })
      }
      return
    }

    /* ── Desktop: GSAP horizontal scroll ── */
    const desktop   = desktopRef.current
    const cardsArea = cardsAreaRef.current
    const track     = trackRef.current
    if (!desktop || !cardsArea || !track) return

    const totalScroll = track.scrollWidth - cardsArea.clientWidth
    if (totalScroll <= 0) return

    /* Main scrub tween — pins the desktop container */
    const hTween = gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: desktop,
        start: 'top top',
        end: `+=${totalScroll}`,
        pin: true,
        scrub: 1.0,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          /* live progress bar */
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { scaleX: self.progress })
          }
          /* live counter */
          if (counterRef.current) {
            const idx = Math.min(
              Math.floor(self.progress * projectsArr.length),
              projectsArr.length - 1
            )
            counterRef.current.textContent = String(idx + 1).padStart(2, '0')
          }
        },
      },
    })

    /* ── Per-image parallax via containerAnimation ── */
    track.querySelectorAll<HTMLElement>('.proj-img-inner').forEach((el) => {
      const card = el.closest('.proj-card')
      if (!card) return
      gsap.fromTo(el,
        { x: 48 },
        {
          x: -48,
          ease: 'none',
          scrollTrigger: {
            containerAnimation: hTween,
            trigger: card,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        }
      )
    })

    /* ── Card entry reveal scrubbed against horizontal progress ── */
    track.querySelectorAll<HTMLElement>('.proj-card').forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0.08, y: 32 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            containerAnimation: hTween,
            trigger: card,
            start: 'left 96%',
            end: 'left 62%',
            scrub: true,
          },
        }
      )
    })
  }, { dependencies: [] })

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="projects"
    >

      {/* ═══════ MOBILE LAYOUT (< md) ═══════ */}
      <div className="md:hidden section-full relative">
        <div className="section-inner">

          {/* Ghost number */}
          <span className="ghost-number" style={{ top: '4%', right: '-2%' }} aria-hidden="true">
            02
          </span>

          <span
            ref={mLabelRef}
            className="inline-block font-mono text-label uppercase tracking-[0.15em] text-gold mb-4"
          >
            Selected work
          </span>
          <h2
            ref={mHeadingRef}
            className="font-display font-bold text-chalk mb-10 overflow-hidden"
            style={{ fontSize: 'clamp(2.2rem, 8vw, 3rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
          >
            Projects
          </h2>
        </div>

        {/* Native horizontal snap scroll on mobile */}
        <div
          ref={mTrackRef}
          className="projects-mobile-track"
          style={{ scrollbarWidth: 'none' }}
        >
          {projectsArr.map((project, i) => (
            <Project key={project.title} project={project} index={i} variant="mobile" />
          ))}
        </div>
      </div>

      {/* ═══════ DESKTOP LAYOUT (md+) ═══════ */}
      <div
        ref={desktopRef}
        className="hidden md:flex flex-col h-screen overflow-hidden relative"
      >
        {/* Ghost number */}
        <span className="ghost-number" style={{ top: '6%', left: '-1%' }} aria-hidden="true">
          02
        </span>

        {/* ── Header row: label/heading + counter/progress ── */}
        <div className="flex items-end justify-between px-10 lg:px-16 pt-24 pb-5 flex-shrink-0">
          <div>
            <span
              ref={labelRef}
              className="inline-block font-mono text-label uppercase tracking-[0.15em] text-gold mb-3"
            >
              Selected work
            </span>
            <h2
              ref={headingRef}
              className="font-display font-bold text-chalk overflow-hidden"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
                lineHeight: '1.0',
                letterSpacing: '-0.04em',
              }}
            >
              Projects
            </h2>
          </div>

          {/* Live counter + progress */}
          <div className="flex flex-col items-end gap-2 pb-1">
            <div className="font-mono text-mist text-sm flex items-baseline gap-1.5">
              <span ref={counterRef} className="text-chalk text-[1.1rem] font-semibold tabular-nums">
                01
              </span>
              <span className="opacity-40">/</span>
              <span className="text-label">{String(projectsArr.length).padStart(2, '0')}</span>
            </div>

            <div className="w-28 h-px bg-ash overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-violet"
                style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
              />
            </div>

            <span className="font-mono text-[0.6rem] text-mist opacity-40 uppercase tracking-[0.18em]">
              scroll to explore
            </span>
          </div>
        </div>

        {/* ── Cards area: overflow hidden clips horizontal track ── */}
        <div ref={cardsAreaRef} className="flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="projects-desktop-track"
            style={{ willChange: 'transform' }}
          >
            {projectsArr.map((project, i) => (
              <Project key={project.title} project={project} index={i} variant="desktop" />
            ))}
            {/* Trailing spacer so last card doesn't hit the right edge */}
            <div className="flex-shrink-0 w-20" aria-hidden="true" />
          </div>
        </div>
      </div>

    </section>
  )
}
