'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap-config'
import { ScrollTrigger } from '@/lib/gsap-config'
import { splitText } from '@/lib/text-splitter'
import { useSectionInView } from '@/constants/hooks'
import MagneticButton from '@/components/ui/MagneticButton'
import { FaPaperPlane } from 'react-icons/fa'

export default function Contact() {
  const { ref: sectionRef } = useSectionInView('Contact', 0.3)
  const labelRef      = useRef<HTMLSpanElement>(null)
  const headingRef    = useRef<HTMLHeadingElement>(null)
  const ghostRef      = useRef<HTMLSpanElement>(null)
  const emailRef      = useRef<HTMLAnchorElement>(null)
  const emailLineRef  = useRef<HTMLSpanElement>(null)
  const formRef       = useRef<HTMLFormElement>(null)
  const leftColRef    = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const label   = labelRef.current
    const heading = headingRef.current
    const form    = formRef.current
    const leftCol = leftColRef.current
    if (!label || !heading || !form || !leftCol) return

    // Label chars
    const labelChars = splitText(label, 'chars')
    gsap.from(labelChars, {
      y: 20, opacity: 0, duration: 0.5, stagger: 0.03, ease: 'back.out(2)',
      scrollTrigger: { trigger: label, start: 'top 88%', toggleActions: 'play none none reverse' },
    })

    // Heading word mask
    const words = splitText(heading, 'words')
    gsap.from(words, {
      yPercent: 110, duration: 0.9, stagger: 0.09, ease: 'expo.out',
      scrollTrigger: { trigger: heading, start: 'top 85%', toggleActions: 'play none none reverse' },
    })

    // Left column fade
    gsap.from(leftColRef.current!.children, {
      opacity: 0, y: 30, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: leftCol, start: 'top 82%', toggleActions: 'play none none reverse' },
    })

    // Form fields slide up
    gsap.from(Array.from(form.children), {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: form,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    })

    // Ghost parallax
    if (ghostRef.current) {
      gsap.to(ghostRef.current, {
        y: -70, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
      })
    }
  }, [])

  // Email underline hover
  const handleEmailEnter = () => {
    if (!emailLineRef.current) return
    gsap.to(emailLineRef.current, { scaleX: 1, duration: 0.4, ease: 'power3.out', transformOrigin: 'left' })
  }
  const handleEmailLeave = () => {
    if (!emailLineRef.current) return
    gsap.to(emailLineRef.current, { scaleX: 0, duration: 0.3, ease: 'power3.in', transformOrigin: 'right' })
  }

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="contact"
      className="section-full relative"
    >
      {/* Ghost number */}
      <span ref={ghostRef} className="ghost-number" style={{ top: '5%', right: '-2%' }} aria-hidden="true">
        05
      </span>

      <div className="section-inner">
        {/* Label + Heading */}
        <span
          ref={labelRef}
          className="inline-block font-mono text-label uppercase tracking-[0.15em] text-gold mb-4"
          aria-label="Get in touch"
        >
          Get in touch
        </span>
        <h2
          ref={headingRef}
          className="font-display font-bold text-chalk mb-16"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: '1.0', letterSpacing: '-0.03em' }}
          aria-label="Let's Talk."
        >
          Let&apos;s Talk<span className="text-gradient-gold">.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* LEFT — info */}
          <div ref={leftColRef} className="space-y-8">
            <p className="text-mist text-[1rem] leading-[1.8] max-w-[400px]">
              I&apos;m excited to connect with you. Whether you have a project in mind,
              want to discuss a collaboration, or simply have a question — I&apos;m here.
            </p>

            <div>
              <div className="font-mono text-label text-mist uppercase tracking-[0.12em] mb-2">Email</div>
              <a
                ref={emailRef}
                href="mailto:mayankpanchal1801@gmail.com"
                className="relative inline-block font-display font-medium text-chalk text-[1.1rem] hover:text-white transition-colors"
                onMouseEnter={handleEmailEnter}
                onMouseLeave={handleEmailLeave}
                data-cursor="link"
              >
                mayankpanchal1801@gmail.com
                <span
                  ref={emailLineRef}
                  className="absolute bottom-0 left-0 w-full h-px bg-violet"
                  style={{ transform: 'scaleX(0)' }}
                  aria-hidden="true"
                />
              </a>
            </div>

            <div className="w-24 h-px bg-ash" />

            <p className="text-mist text-[0.875rem] leading-[1.7]">
              I&apos;m currently available for freelance projects and full-time roles.
              Response time is typically within 24 hours.
            </p>
          </div>

          {/* RIGHT — form */}
          <form
            ref={formRef}
            className="flex flex-col gap-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="email" className="block font-mono text-label text-mist uppercase tracking-[0.12em] mb-3">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-mono text-label text-mist uppercase tracking-[0.12em] mb-3">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Tell me about your project..."
                rows={5}
                className="form-input"
              />
            </div>

            <MagneticButton>
              <button
                type="submit"
                className="btn-base btn-filled group"
              >
                Send Message
                <FaPaperPlane className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-sm" />
              </button>
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  )
}
