'use client'

import { projectsArr } from '@/constants/projects'
import { gsap } from '@/lib/gsap-config'
import { splitText } from '@/lib/text-splitter'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { BsArrowLeft, BsArrowUpRight } from 'react-icons/bs'

const CATEGORIES = ['All', ...Array.from(new Set(projectsArr.map((p) => p.category)))]

export default function ProjectsListClient() {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const labelRef   = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const introRef   = useRef<HTMLParagraphElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  const visibleProjects =
    activeFilter === 'All'
      ? projectsArr
      : projectsArr.filter((p) => p.category === activeFilter)

  // ── Entrance animation (runs once on mount) ──────────────────────────────
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.2 })

    if (labelRef.current) {
      const chars = splitText(labelRef.current, 'chars')
      tl.from(chars, { y: 14, opacity: 0, duration: 0.4, stagger: 0.03, ease: 'back.out(2)' })
    }
    if (headingRef.current) {
      const words = splitText(headingRef.current, 'words')
      tl.from(words, { yPercent: 110, duration: 0.65, stagger: 0.09 }, '-=0.25')
    }
    if (introRef.current) {
      tl.from(introRef.current, { opacity: 0, y: 16, duration: 0.5 }, '-=0.35')
    }
    if (filtersRef.current) {
      tl.from(Array.from(filtersRef.current.children), {
        opacity: 0, y: 12, duration: 0.35, stagger: 0.06,
      }, '-=0.25')
    }
  }, [])

  // ── Re-animate cards whenever filter changes ──────────────────────────────
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.proj-grid-card'))
    if (cards.length === 0) return
    gsap.fromTo(
      cards,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.42, stagger: 0.08, ease: 'power3.out', clearProps: 'transform' },
    )
  }, [activeFilter])

  return (
    <main className="min-h-screen bg-void">
      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="section-inner pt-36 pb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-label text-mist uppercase tracking-[0.14em] hover:text-chalk transition-colors mb-12"
        >
          <BsArrowLeft className="text-[0.65rem]" />
          Back to home
        </Link>

        <span
          ref={labelRef}
          className="inline-block font-mono text-label uppercase tracking-[0.18em] text-gold mb-4 block overflow-hidden"
        >
          All work
        </span>

        <div className="overflow-hidden mb-5">
          <h1
            ref={headingRef}
            className="font-display font-bold text-chalk"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.0, letterSpacing: '-0.04em' }}
          >
            Projects
          </h1>
        </div>

        <p
          ref={introRef}
          className="text-mist text-[1rem] max-w-[480px] leading-relaxed mb-10"
        >
          A selection of products and websites I&apos;ve designed and built
          across various industries.
        </p>

        {/* Filter chips */}
        <div ref={filtersRef} className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={[
                'font-mono text-[0.68rem] uppercase tracking-[0.12em] px-4 py-1.5 rounded-full border transition-all duration-200',
                activeFilter === cat
                  ? 'bg-violet border-violet text-void'
                  : 'bg-transparent border-ash text-mist hover:border-mist hover:text-chalk',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="section-inner">
        <div className="h-px bg-ash mb-12" />
      </div>

      {/* ── Projects grid ────────────────────────────────────────────────── */}
      <div className="section-inner pb-24">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="proj-grid-card group relative flex flex-col overflow-hidden rounded-[10px] border border-ash bg-smoke hover:border-neutral-600 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_0_40px_rgba(20,184,166,0.07)]"
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '260px' }}>
                <Image
                  src={project.imgSrc}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-smoke/70 to-transparent" />

                {/* Category badge */}
                <span className="absolute top-4 left-4 font-mono text-[0.58rem] uppercase tracking-[0.13em] px-2.5 py-1 rounded-full bg-void/70 backdrop-blur-sm border border-white/10 text-chalk/70">
                  {project.category}
                </span>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-chalk/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-chalk translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <BsArrowUpRight className="text-xs" />
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-[0.6rem] text-mist uppercase tracking-[0.14em]">
                    {project.year}
                  </span>
                  <span className="font-mono text-[0.6rem] text-mist uppercase tracking-[0.14em]">
                    {project.role}
                  </span>
                </div>

                <h2 className="font-display font-semibold text-chalk text-[1.2rem] leading-tight mb-3 group-hover:text-[--color-glow] transition-colors duration-300">
                  {project.title}
                </h2>

                <p className="text-mist text-[0.875rem] leading-[1.7] line-clamp-2 flex-1">
                  {project.description}
                </p>

                {/* Footer row */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-ash">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[0.56rem] uppercase tracking-[0.1em] px-2 py-[0.18rem] rounded border border-[rgba(20,184,166,0.25)] text-[#2dd4bf] bg-[rgba(20,184,166,0.06)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-[0.63rem] uppercase tracking-[0.16em] text-mist group-hover:text-chalk transition-colors flex items-center gap-1 flex-shrink-0 ml-3">
                    View case
                    <BsArrowUpRight className="text-[0.55rem]" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
