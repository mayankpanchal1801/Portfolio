'use client'

import type { Project } from '@/constants/projects'
import { gsap } from '@/lib/gsap-config'
import { splitText } from '@/lib/text-splitter'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { BsArrowLeft, BsArrowUpRight, BsGithub } from 'react-icons/bs'
import { LuExternalLink } from 'react-icons/lu'

type Props = { project: Project; nextProject: Project }

export default function ProjectDetailView({ project, nextProject }: Props) {
  const heroRef  = useRef<HTMLDivElement>(null)
  const leftRef  = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef  = useRef<HTMLParagraphElement>(null)
  const listRef  = useRef<HTMLUListElement>(null)
  const nextRef  = useRef<HTMLDivElement>(null)

  // ── Main entrance timeline ────────────────────────────────────────────────
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 })

      if (heroRef.current) {
        tl.from(heroRef.current, { opacity: 0, scale: 1.04, duration: 0.85 })
      }
      if (leftRef.current) {
        tl.from(Array.from(leftRef.current.children), {
          opacity: 0, x: -22, duration: 0.5, stagger: 0.07,
        }, '-=0.45')
      }
      if (titleRef.current) {
        const words = splitText(titleRef.current, 'words')
        tl.from(words, { yPercent: 110, duration: 0.6, stagger: 0.07 }, '-=0.5')
      }
      if (descRef.current) {
        tl.from(descRef.current, { opacity: 0, y: 18, duration: 0.5 }, '-=0.3')
      }
      if (listRef.current) {
        tl.from(Array.from(listRef.current.children), {
          opacity: 0, x: -14, duration: 0.32, stagger: 0.06,
        }, '-=0.25')
      }
    },
    { dependencies: [project.slug] },
  )

  // ── "Next project" scroll reveal ──────────────────────────────────────────
  useGSAP(
    () => {
      if (!nextRef.current) return
      gsap.from(nextRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: nextRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { dependencies: [project.slug] },
  )

  return (
    <main className="min-h-screen bg-void">
      {/* Breadcrumb */}
      <div className="section-inner pt-28 pb-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-label text-mist uppercase tracking-[0.14em] hover:text-chalk transition-colors"
        >
          <BsArrowLeft className="text-[0.65rem]" />
          All projects
        </Link>
      </div>

      {/* Hero image */}
      <div ref={heroRef} className="section-inner pb-10">
        <div
          className="relative w-full rounded-[10px] overflow-hidden border border-ash"
          style={{ aspectRatio: '16 / 7' }}
        >
          <Image
            src={project.imgSrc}
            alt={project.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
        </div>
      </div>

      {/* ── 2-column content ──────────────────────────────────────────────── */}
      <div className="section-inner pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start">

          {/* LEFT — meta + links (sticky on desktop) */}
          <div ref={leftRef} className="flex flex-col gap-6 lg:sticky lg:top-28">

            {/* Meta fields */}
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-mono text-[0.58rem] text-mist uppercase tracking-[0.14em] block mb-1">
                  Category
                </span>
                <span className="font-mono text-[0.72rem] text-chalk uppercase tracking-[0.08em]">
                  {project.category}
                </span>
              </div>
              <div>
                <span className="font-mono text-[0.58rem] text-mist uppercase tracking-[0.14em] block mb-1">
                  Year
                </span>
                <span className="font-mono text-[0.72rem] text-chalk">{project.year}</span>
              </div>
              <div>
                <span className="font-mono text-[0.58rem] text-mist uppercase tracking-[0.14em] block mb-1">
                  Role
                </span>
                <span className="font-mono text-[0.72rem] text-chalk">{project.role}</span>
              </div>
            </div>

            <div className="h-px bg-ash" />

            {/* Tech stack */}
            <div>
              <span className="font-mono text-[0.58rem] text-mist uppercase tracking-[0.14em] block mb-3">
                Tech stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-chip">{tag}</span>
                ))}
              </div>
            </div>

            <div className="h-px bg-ash" />

            {/* Links */}
            <div className="flex flex-col gap-2.5">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base btn-filled text-[0.8rem] justify-center"
              >
                Live site
                <LuExternalLink className="text-sm" />
              </a>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base btn-outline text-[0.8rem] justify-center"
                >
                  GitHub
                  <BsGithub className="text-sm" />
                </a>
              )}
            </div>
          </div>

          {/* RIGHT — project details */}
          <div className="flex flex-col gap-9">

            {/* Title */}
            <h1
              ref={titleRef}
              className="font-display font-bold text-chalk overflow-hidden"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', lineHeight: 1.05, letterSpacing: '-0.04em' }}
            >
              {project.title}
            </h1>

            {/* Long description */}
            <p ref={descRef} className="text-mist text-[1rem] leading-[1.95]">
              {project.longDescription}
            </p>

            {/* Highlights */}
            <div>
              <span className="font-mono text-[0.58rem] text-mist uppercase tracking-[0.14em] block mb-5">
                Key highlights
              </span>
              <ul ref={listRef} className="flex flex-col gap-3.5">
                {project.highlights.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <span className="mt-[0.52rem] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-violet" />
                    <span className="text-mist text-[0.9375rem] leading-[1.85]">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Next project ──────────────────────────────────────────────────── */}
      <div className="section-inner pb-16">
        <div className="h-px bg-ash mb-12" />
        <div ref={nextRef}>
          <span className="font-mono text-[0.58rem] text-mist uppercase tracking-[0.14em] block mb-5">
            Next project
          </span>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 rounded-[10px] border border-ash bg-smoke hover:border-neutral-600 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.05)]"
          >
            <div className="relative flex-shrink-0 w-full sm:w-36 h-24 rounded-lg overflow-hidden">
              <Image
                src={nextProject.imgSrc}
                alt={nextProject.title}
                fill
                className="object-cover object-top"
                sizes="144px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-mono text-[0.58rem] text-mist uppercase tracking-[0.14em] block mb-1">
                {nextProject.year} · {nextProject.category}
              </span>
              <h3 className="font-display font-semibold text-chalk text-[1.1rem] group-hover:text-[--color-glow] transition-colors mb-1.5 truncate">
                {nextProject.title}
              </h3>
              <p className="text-mist text-[0.8125rem] line-clamp-2">
                {nextProject.description}
              </p>
            </div>
            <BsArrowUpRight className="text-mist group-hover:text-chalk transition-colors text-lg flex-shrink-0 mt-1 sm:mt-0" />
          </Link>
        </div>
      </div>
    </main>
  )
}
