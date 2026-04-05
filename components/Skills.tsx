'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap-config'
import { ScrollTrigger } from '@/lib/gsap-config'
import { splitText } from '@/lib/text-splitter'
import { skillsArr } from '@/constants/skills'
import { useSectionInView } from '@/constants/hooks'

// Flatten all tools for the marquee
const allTools = skillsArr.flatMap((s) => s.tools)

const stats = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '+', label: 'Projects Delivered' },
  { value: 9, suffix: '', label: 'Skill Categories' },
]

export default function Skills() {
  const { ref: sectionRef } = useSectionInView('Skills', 0.25)
  const labelRef    = useRef<HTMLSpanElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const ghostRef    = useRef<HTMLSpanElement>(null)
  const marqueeRef  = useRef<HTMLDivElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const gridRef     = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<HTMLSpanElement[]>([])

  useGSAP(() => {
    const label   = labelRef.current
    const heading = headingRef.current
    const marquee = marqueeRef.current
    const grid    = gridRef.current
    const ghost   = ghostRef.current
    if (!label || !heading || !marquee || !grid) return

    // Label chars
    const labelChars = splitText(label, 'chars')
    gsap.from(labelChars, {
      y: 20, opacity: 0, duration: 0.5, stagger: 0.03, ease: 'back.out(2)',
      scrollTrigger: { trigger: label, start: 'top 88%', toggleActions: 'play none none reverse' },
    })

    // Heading words
    const words = splitText(heading, 'words')
    gsap.from(words, {
      yPercent: 110, duration: 0.9, stagger: 0.09, ease: 'expo.out',
      scrollTrigger: { trigger: heading, start: 'top 85%', toggleActions: 'play none none reverse' },
    })

    // Marquee — infinite loop
    const trackWidth = marquee.scrollWidth / 2
    gsap.to(marquee, {
      x: -trackWidth,
      duration: 25,
      ease: 'none',
      repeat: -1,
    })

    // Skill cards stagger
    const cards = Array.from(grid.children)
    gsap.from(cards, {
      opacity: 0,
      x: -40,
      duration: 0.7,
      stagger: { amount: 0.6, from: 'start' },
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    // Counter animations
    counterRefs.current.forEach((el, i) => {
      if (!el) return
      const obj = { val: 0 }
      gsap.to(obj, {
        val: stats[i].value,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate() {
          el.textContent = Math.ceil(obj.val) + stats[i].suffix
        },
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          once: true,
        },
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
      id="skills"
      className="section-full relative"
    >
      {/* Ghost number */}
      <span ref={ghostRef} className="ghost-number" style={{ top: '5%', right: '-2%' }} aria-hidden="true">
        03
      </span>

      <div className="section-inner">
        {/* Label + Heading */}
        <span
          ref={labelRef}
          className="inline-block font-mono text-label uppercase tracking-[0.15em] text-gold mb-4"
          aria-label="What I work with"
        >
          What I work with
        </span>
        <h2
          ref={headingRef}
          className="font-display font-bold text-chalk mb-12"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
          aria-label="Skills"
        >
          Skills
        </h2>

        {/* Stats counters */}
        <div ref={statsRef} className="grid grid-cols-3 gap-6 mb-16 max-w-[480px]">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <div className="font-display font-bold text-chalk mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                <span ref={(el) => { if (el) counterRefs.current[i] = el }}>
                  0{stat.suffix}
                </span>
              </div>
              <div className="font-mono text-label text-mist uppercase tracking-[0.1em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="overflow-hidden py-6 mb-16 border-y border-ash">
        <div ref={marqueeRef} className="marquee-track">
          {/* Two identical rows for seamless loop */}
          {[...allTools, ...allTools].map((tool, i) => (
            <div key={i} className="marquee-item">
              <span className="font-mono text-label text-mist uppercase tracking-[0.15em] whitespace-nowrap">
                {tool.trim()}
              </span>
              <span className="text-ash text-[0.5rem]">◆</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-inner">
        {/* Skill cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skillsArr.map((skill) => (
            <div key={skill.title} className="skill-card">
              <h3 className="font-display font-semibold text-chalk text-[1rem] mb-2 leading-tight">
                {skill.title}
              </h3>
              <p className="text-mist text-[0.8125rem] leading-[1.65] mb-3">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skill.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-[0.6rem] text-mist border border-ash px-2 py-0.5 rounded uppercase tracking-[0.08em]"
                  >
                    {tool.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
