'use client'

import { navLinksArr } from '@/constants/links'
import type { SectionName } from '@/constants/types'
import { useActiveSectionContext } from '@/context/active-section-context'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  const headerRef      = useRef<HTMLElement>(null)
  const progressRef    = useRef<HTMLDivElement>(null)
  const mobileMenuRef  = useRef<HTMLDivElement>(null)
  const menuItemsRef   = useRef<HTMLLIElement[]>([])
  const menuTlRef      = useRef<gsap.core.Timeline | null>(null)
  const bar1Ref        = useRef<HTMLSpanElement>(null)
  const bar2Ref        = useRef<HTMLSpanElement>(null)
  const bar3Ref        = useRef<HTMLSpanElement>(null)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handle = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('#mobile-menu') && !target.closest('#hamburger-btn')) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [menuOpen])

  // GSAP: scroll progress bar
  useGSAP(() => {
    if (!progressRef.current) return
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
  }, [])

  // GSAP: header entrance
  useGSAP(() => {
    if (!headerRef.current) return
    gsap.from(headerRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.7,
      ease: 'expo.out',
      delay: 0.3,
    })
  }, [])

  // GSAP: mobile menu timeline
  useEffect(() => {
    const menu  = mobileMenuRef.current
    const items = menuItemsRef.current.filter(Boolean)
    if (!menu || items.length === 0) return

    menuTlRef.current = gsap.timeline({ paused: true })
    menuTlRef.current
      .fromTo(
        menu,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power3.inOut' }
      )
      .from(
        items,
        { opacity: 0, y: -8, stagger: 0.04, duration: 0.25, ease: 'power2.out' },
        '-=0.15'
      )
  }, [])

  // Toggle menu
  useEffect(() => {
    if (!menuTlRef.current) return
    if (menuOpen) {
      menuTlRef.current.play()
    } else {
      menuTlRef.current.reverse()
    }
  }, [menuOpen])

  // Hamburger bar animations
  useEffect(() => {
    const b1 = bar1Ref.current
    const b2 = bar2Ref.current
    const b3 = bar3Ref.current
    if (!b1 || !b2 || !b3) return

    if (menuOpen) {
      gsap.to(b1, { rotate: 45,  y: 7,  duration: 0.22, ease: 'power2.inOut' })
      gsap.to(b2, { opacity: 0, scaleX: 0, duration: 0.18 })
      gsap.to(b3, { rotate: -45, y: -7, duration: 0.22, ease: 'power2.inOut' })
    } else {
      gsap.to(b1, { rotate: 0, y: 0, duration: 0.22, ease: 'power2.inOut' })
      gsap.to(b2, { opacity: 1, scaleX: 1, duration: 0.18 })
      gsap.to(b3, { rotate: 0, y: 0, duration: 0.22, ease: 'power2.inOut' })
    }
  }, [menuOpen])

  const handleNavClick = (name: SectionName) => {
    setActiveSection(name)
    setTimeOfLastClick(Date.now())
    setMenuOpen(false)
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="scroll-progress"
        aria-hidden="true"
      />

      <header
        ref={headerRef}
        className={clsx(
          'fixed top-0 left-0 right-0 z-[999] transition-all duration-500',
          scrolled
            ? 'bg-ink/90 backdrop-blur-md border-b border-ash'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={isHome ? '#hero' : '/'}
            onClick={() => isHome && handleNavClick('Hero')}
            aria-label="Back to top"
            className="text-[1.15rem] font-bold tracking-tight text-chalk font-display select-none hover:opacity-80 transition-opacity"
          >
            MP<span className="text-violet">.</span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden sm:block">
            <ul className="flex items-center gap-1">
              {navLinksArr.map((navLink) => (
                <li key={navLink.url}>
                  <Link
                    href={isHome ? navLink.url : `/${navLink.url}`}
                    onClick={() => handleNavClick(navLink.name)}
                    className={clsx(
                      'nav-link px-3 py-1.5 font-mono text-label uppercase tracking-[0.12em] transition-colors duration-200',
                      activeSection === navLink.name
                        ? 'active text-violet'
                        : 'text-mist hover:text-chalk'
                    )}
                  >
                    {navLink.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hamburger (mobile) */}
          <button
            id="hamburger-btn"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="sm:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span ref={bar1Ref} className="block h-[1.5px] w-5 bg-chalk rounded-full origin-center" />
            <span ref={bar2Ref} className="block h-[1.5px] w-5 bg-chalk rounded-full" />
            <span ref={bar3Ref} className="block h-[1.5px] w-5 bg-chalk rounded-full origin-center" />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="sm:hidden overflow-hidden border-t border-ash bg-ink/95 backdrop-blur-md"
          style={{ height: 0, opacity: 0 }}
          aria-hidden={!menuOpen}
        >
          <ul className="flex flex-col py-3 px-6">
            {navLinksArr.map((navLink, i) => (
              <li
                key={navLink.url}
                ref={(el) => { if (el) menuItemsRef.current[i] = el }}
              >
                <Link
                  href={isHome ? navLink.url : `/${navLink.url}`}
                  onClick={() => handleNavClick(navLink.name)}
                  className={clsx(
                    'flex items-center gap-3 py-3 font-mono text-label uppercase tracking-[0.12em] transition-colors',
                    activeSection === navLink.name
                      ? 'text-violet'
                      : 'text-mist hover:text-chalk'
                  )}
                >
                  <span
                    className={clsx(
                      'h-1.5 w-1.5 rounded-full',
                      activeSection === navLink.name ? 'bg-violet' : 'bg-ash'
                    )}
                  />
                  {navLink.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  )
}
