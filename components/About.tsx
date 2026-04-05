'use client'

import { useSectionInView } from '@/constants/hooks'
import { gsap } from '@/lib/gsap-config'
import { splitText } from '@/lib/text-splitter'
import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'

/* ── Data ─────────────────────────────────────────────── */
const stats = [
  { value: 4,  suffix: '+', label: 'Years\nExperience' },
  { value: 20, suffix: '+', label: 'Projects\nDelivered' },
  { value: 3,  suffix: '+', label: 'Industries\nServed'  },
]

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express',
  'GraphQL', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'GSAP',
  'Redux', 'Docker',
]

const bodyParagraphs = [
  `I've honed my ability to create responsive, interactive, and user-friendly interfaces
   using HTML5, CSS3, and modern frameworks like React.js and Next.js. My frontend
   toolkit also includes Tailwind CSS, SCSS/SASS, Redux, Context API, and Zustand,
   enabling me to build sleek, performant applications.`,
  `On the backend, I work with Node.js, Express.js, and RESTful APIs, along with
   GraphQL and WebSocket for real-time communication. I also have hands-on experience
   with server-side rendering and database systems like MongoDB, MySQL, PostgreSQL,
   and Firebase.`,
  `Beyond development, I prioritize clean architecture, maintainable code, and continuous
   improvement through version control (Git, GitHub), performance optimization, and CI/CD
   workflows. My solid grasp of Data Structures and Algorithms helps me write efficient,
   reliable code across all layers of the stack.`,
  `Whether I'm architecting a feature or refining an experience, I strive to deliver
   measurable impact. I'm passionate about mentoring, staying on top of emerging tech
   trends, and collaborating with teams that value both innovation and precision.`,
]

/* ── Component ──────────────────────────────────────────── */
export default function About() {
  const { ref: sectionRef } = useSectionInView('About', 0.3)

  const labelRef      = useRef<HTMLSpanElement>(null)
  const headingRef    = useRef<HTMLHeadingElement>(null)
  const ghostRef      = useRef<HTMLSpanElement>(null)
  const dividerRef    = useRef<HTMLSpanElement>(null)
  const statsRowRef   = useRef<HTMLDivElement>(null)
  const counterRefs   = useRef<HTMLSpanElement[]>([])
  const introCardRef  = useRef<HTMLDivElement>(null)
  const stackRef      = useRef<HTMLDivElement>(null)
  const parasBodyRef  = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const label    = labelRef.current
    const heading  = headingRef.current
    const ghost    = ghostRef.current
    const divider  = dividerRef.current
    const statsRow = statsRowRef.current

    if (!label || !heading) return

    /* Label chars stagger */
    const labelChars = splitText(label, 'chars')
    gsap.from(labelChars, {
      y: 14, opacity: 0, duration: 0.4, stagger: 0.025, ease: 'back.out(2)',
      scrollTrigger: { trigger: label, start: 'top 88%', toggleActions: 'play none none reverse' },
    })

    /* Heading word mask */
    const headingWords = splitText(heading, 'words')
    gsap.from(headingWords, {
      yPercent: 110, duration: 0.65, stagger: 0.075, ease: 'expo.out',
      scrollTrigger: { trigger: heading, start: 'top 85%', toggleActions: 'play none none reverse' },
    })

    /* Divider line draws right */
    if (divider) {
      gsap.from(divider, {
        scaleX: 0, transformOrigin: 'left', duration: 0.8, ease: 'power3.inOut',
        scrollTrigger: { trigger: divider, start: 'top 86%', toggleActions: 'play none none reverse' },
      })
    }

    /* Stat counters animate from 0 */
    counterRefs.current.forEach((el, i) => {
      if (!el) return
      const obj = { val: 0 }
      gsap.to(obj, {
        val: stats[i].value, duration: 1.4, ease: 'power2.out',
        onUpdate() { el.textContent = Math.ceil(obj.val) + stats[i].suffix },
        scrollTrigger: { trigger: statsRow, start: 'top 83%', once: true },
      })
    })

    /* Stat cards enter */
    if (statsRow) {
      gsap.from(Array.from(statsRow.children), {
        opacity: 0, y: 18, duration: 0.45, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: statsRow, start: 'top 84%', toggleActions: 'play none none reverse' },
      })
    }

    /* Intro quote card */
    if (introCardRef.current) {
      gsap.from(introCardRef.current, {
        opacity: 0, y: 28, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: introCardRef.current, start: 'top 84%', toggleActions: 'play none none reverse' },
      })
    }

    /* Stack chips stagger from left */
    if (stackRef.current) {
      gsap.from(stackRef.current.querySelectorAll('.tech-chip'), {
        opacity: 0, x: -14, duration: 0.3, stagger: 0.04, ease: 'power2.out',
        scrollTrigger: { trigger: stackRef.current, start: 'top 83%', toggleActions: 'play none none reverse' },
      })
    }

    /* Body paragraphs stagger */
    if (parasBodyRef.current) {
      gsap.from(Array.from(parasBodyRef.current.children), {
        opacity: 0, y: 22, duration: 0.5, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: parasBodyRef.current, start: 'top 81%', toggleActions: 'play none none reverse' },
      })
    }

    /* Ghost number parallax */
    if (ghost) {
      gsap.to(ghost, {
        y: -80, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current as HTMLElement,
          start: 'top bottom', end: 'bottom top', scrub: 2,
        },
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="about"
      className="section-full relative"
    >
      {/* Ghost number */}
      <span
        ref={ghostRef}
        className="ghost-number select-none pointer-events-none"
        style={{ top: '5%', right: '-2%' }}
        aria-hidden="true"
      >
        01
      </span>

      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.65fr] gap-14 lg:gap-24 items-start">

          {/* ── LEFT: label · heading · divider · stats ── */}
          <div className="lg:sticky lg:top-28 space-y-8">

            <div>
              <span
                ref={labelRef}
                className="inline-block font-mono text-label uppercase tracking-[0.15em] text-gold mb-5"
                aria-label="About me"
              >
                About me
              </span>
              <h2
                ref={headingRef}
                className="font-display font-bold text-chalk overflow-hidden"
                style={{
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                  lineHeight: '1.06',
                  letterSpacing: '-0.03em',
                }}
              >
                4+ years of building for the web.
              </h2>
            </div>

            {/* Animated divider */}
            <span
              ref={dividerRef}
              className="block h-px bg-ash"
              style={{ display: 'block' }}
              aria-hidden="true"
            />

            {/* Stat counters */}
            <div ref={statsRowRef} className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className="about-stat-card">
                  <div className="about-stat-value">
                    <span ref={(el) => { if (el) counterRefs.current[i] = el }}>
                      0{stat.suffix}
                    </span>
                  </div>
                  <div className="about-stat-label">
                    {stat.label.split('\n').map((line, li) => (
                      <span key={li} className="block leading-[1.3]">{line}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: intro card · stack · body paragraphs ── */}
          <div className="space-y-9">

            {/* Featured intro card */}
            <div ref={introCardRef} className="about-intro-card">
              <span className="about-intro-quote" aria-hidden="true">&ldquo;</span>
              <p className="text-chalk text-[1.05rem] leading-[1.9] relative z-10">
                Over the past four years, I&apos;ve focused on mastering the craft of web
                development — solving real-world challenges with scalable, intuitive solutions
                and building a well-rounded skill set across the entire stack.
              </p>
            </div>

            {/* Core tech stack */}
            <div ref={stackRef}>
              <p className="font-mono text-label text-mist uppercase tracking-[0.14em] mb-3">
                Core stack
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <span key={t} className="tech-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Horizontal rule */}
            <span className="block h-px bg-ash" aria-hidden="true" />

            {/* Body paragraphs */}
            <div ref={parasBodyRef} className="space-y-5">
              {bodyParagraphs.map((para, i) => (
                <p key={i} className="text-mist text-[0.9375rem] leading-[1.85]">
                  {para.trim()}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
