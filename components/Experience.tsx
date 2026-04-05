'use client'

import { experienceArr } from '@/constants/experience'
import { useSectionInView } from '@/constants/hooks'
import { gsap } from '@/lib/gsap-config'
import { splitText } from '@/lib/text-splitter'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { LuGraduationCap } from 'react-icons/lu'
import { MdOutlineWorkOutline } from 'react-icons/md'

export default function Experience() {
  const { ref: sectionRef } = useSectionInView('Experience', 0.25)
  const labelRef     = useRef<HTMLSpanElement>(null)
  const headingRef   = useRef<HTMLHeadingElement>(null)
  const ghostRef     = useRef<HTMLSpanElement>(null)
  const lineRef      = useRef<HTMLDivElement>(null)
  const timelineRef  = useRef<HTMLDivElement>(null)
  const entryRefs    = useRef<HTMLDivElement[]>([])
  const dotRingRefs  = useRef<HTMLDivElement[]>([])

  useGSAP(() => {
    const label   = labelRef.current
    const heading = headingRef.current
    const line    = lineRef.current
    const timeline = timelineRef.current
    const ghost   = ghostRef.current
    if (!label || !heading || !line || !timeline) return

    // Label
    const labelChars = splitText(label, 'chars')
    gsap.from(labelChars, {
      y: 20, opacity: 0, duration: 0.5, stagger: 0.03, ease: 'back.out(2)',
      scrollTrigger: { trigger: label, start: 'top 88%', toggleActions: 'play none none reverse' },
    })

    // Heading
    const words = splitText(heading, 'words')
    gsap.from(words, {
      yPercent: 110, duration: 0.9, stagger: 0.09, ease: 'expo.out',
      scrollTrigger: { trigger: heading, start: 'top 85%', toggleActions: 'play none none reverse' },
    })

    // Timeline line draws downward
    gsap.from(line, {
      scaleY: 0,
      transformOrigin: 'top center',
      ease: 'none',
      scrollTrigger: {
        trigger: timeline,
        start: 'top 70%',
        end: 'bottom 80%',
        scrub: 2,
      },
    })

    // Entry cards — alternate left/right on desktop
    const entries = entryRefs.current.filter(Boolean)
    gsap.from(entries, {
      opacity: 0,
      x: (i: number) => (i % 2 === 0 ? -60 : 60),
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: timeline,
        start: 'top 72%',
        toggleActions: 'play none none reverse',
      },
    })

    // Dot pulse rings
    dotRingRefs.current.filter(Boolean).forEach((ring, i) => {
      gsap.to(ring, {
        scale: 2.2,
        opacity: 0,
        duration: 1.6,
        repeat: -1,
        ease: 'power2.out',
        delay: i * 0.5,
      })
    })

    // Ghost parallax
    if (ghost) {
      gsap.to(ghost, {
        y: -70, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="experience"
      className="section-full relative"
    >
      {/* Ghost number */}
      <span ref={ghostRef} className="ghost-number" style={{ top: '5%', left: '-2%' }} aria-hidden="true">
        04
      </span>

      <div className="section-inner">
        {/* Label + Heading */}
        <span
          ref={labelRef}
          className="inline-block font-mono text-label uppercase tracking-[0.15em] text-gold mb-4"
          aria-label="My journey"
        >
          My journey
        </span>
        <h2
          ref={headingRef}
          className="font-display font-bold text-chalk mb-20"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
          aria-label="Experience"
        >
          Experience
        </h2>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center vertical line */}
          <div
            ref={lineRef}
            className="timeline-line absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-ash hidden md:block"
          />

          <div className="space-y-16 md:space-y-0">
            {experienceArr.map((item, i) => {
              const isLeft = i % 2 === 0
              const Icon = item.type === 'education' ? LuGraduationCap : MdOutlineWorkOutline

              return (
                <div
                  key={i}
                  ref={(el) => { if (el) entryRefs.current[i] = el }}
                  className={`relative flex items-start gap-6 md:gap-0 md:mb-16 ${
                    isLeft ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Mobile: left-side line and dot */}
                  <div className="flex-shrink-0 flex flex-col items-center md:hidden">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <div
                        ref={(el) => { if (el) dotRingRefs.current[i] = el }}
                        className="absolute inset-0 rounded-full border border-violet/50"
                      />
                      <div className="w-8 h-8 rounded-full bg-smoke border border-ash flex items-center justify-center text-violet text-sm">
                        <Icon />
                      </div>
                    </div>
                    {i < experienceArr.length - 1 && (
                      <div className="w-px flex-1 min-h-[3rem] bg-ash mt-2" />
                    )}
                  </div>

                  {/* Desktop: dot on center line */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-5 z-10 items-center justify-center">
                    <div className="relative w-10 h-10">
                      <div
                        ref={(el) => { if (el) dotRingRefs.current[i] = el }}
                        className="absolute inset-0 rounded-full border border-violet/50"
                      />
                      <div className="w-10 h-10 rounded-full bg-smoke border border-ash flex items-center justify-center text-violet text-base">
                        <Icon />
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 md:max-w-[42%] bg-smoke border border-ash rounded-[var(--radius-card)] p-6 hover:border-neutral-600 transition-[border-color] duration-300 ${
                      isLeft ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    {/* Date */}
                    <div className="font-mono text-label text-gold uppercase tracking-[0.15em] mb-2.5">
                      {item.date}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-semibold text-chalk text-[1.05rem] leading-snug mb-1">
                      {item.title}
                    </h3>

                    {/* Company + location */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      <span className="font-mono text-[0.72rem] text-violet">{item.company}</span>
                      <span className="text-ash text-[0.6rem]">·</span>
                      <span className="font-mono text-[0.65rem] text-mist">{item.location}</span>
                    </div>

                    {/* Description */}
                    {item.description && (
                      <p className="text-mist text-[0.82rem] leading-[1.75] mb-4">
                        {item.description}
                      </p>
                    )}

                    {/* Bullets */}
                    {item.bullets.length > 0 && (
                      <ul className="flex flex-col gap-2">
                        {item.bullets.map((pt, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <span className="mt-[0.45rem] flex-shrink-0 w-1 h-1 rounded-full bg-violet" />
                            <span className="text-mist text-[0.78rem] leading-[1.7]">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
