'use client'

import { projectsArr } from '@/constants/projects'
import Image from 'next/image'
import { BsArrowUpRight } from 'react-icons/bs'

type ProjectProps = {
  project: (typeof projectsArr)[0]
  index: number
  variant?: 'desktop' | 'mobile'
}

export default function Project({ project, index, variant = 'desktop' }: ProjectProps) {
  const { title, description, tags, imgSrc, url } = project
  const isMobile = variant === 'mobile'

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={`View ${title}`}
      className={[
        'proj-card group relative flex flex-col overflow-hidden',
        'bg-smoke border border-ash rounded-[10px]',
        'transition-[border-color,box-shadow] duration-500',
        'hover:border-[--color-violet] hover:shadow-[0_0_40px_rgba(20,184,166,0.08)]',
        isMobile
          ? 'flex-shrink-0 w-[80vw] sm:w-[60vw] h-[420px] snap-start'
          : 'flex-shrink-0 h-full',
      ].join(' ')}
      style={isMobile ? undefined : { width: 'clamp(320px, 28vw, 440px)' }}
      data-cursor="link"
    >
      {/* ── Image area ── */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: '58%' }}>

        {/* Inner wrapper — GSAP parallax target */}
        <div
          className="proj-img-inner absolute inset-0"
          style={{ width: '120%', left: '-10%' }}
        >
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="(max-width: 767px) 80vw, 440px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            priority={index < 2}
          />
        </div>

        {/* Hover overlay — teal tint */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-smoke/80 via-transparent to-transparent
                     opacity-60 group-hover:opacity-80 transition-opacity duration-500"
          aria-hidden="true"
        />

        {/* Arrow top-right: slides in on hover */}
        <div
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-chalk/10 backdrop-blur-sm
                     border border-white/20 flex items-center justify-center text-chalk
                     translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                     transition-all duration-300 ease-out"
          aria-hidden="true"
        >
          <BsArrowUpRight className="text-sm" />
        </div>

        {/* Index badge */}
        <span
          className="absolute top-4 left-4 font-mono text-[0.62rem] tracking-[0.14em]
                     text-chalk/50 bg-void/60 backdrop-blur-sm px-2 py-1 rounded"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* ── Info area ── */}
      <div className="flex flex-col justify-between p-5 flex-1">
        <div className="space-y-2">
          <h3 className="font-display font-semibold text-chalk text-[1.1rem] leading-tight
                         group-hover:text-[--color-glow] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-mist text-[0.8rem] leading-[1.65] line-clamp-2">
            {description}
          </p>
        </div>

        {/* Tags + visit link row */}
        <div className="flex items-end justify-between mt-4 gap-3">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[0.58rem] uppercase tracking-[0.1em] px-2 py-0.5 rounded
                           border border-[rgba(20,184,166,0.25)] text-[#2dd4bf] bg-[rgba(20,184,166,0.06)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Inline visit link */}
          <span
            className="flex-shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-mist
                       flex items-center gap-1 group-hover:text-chalk transition-colors duration-300"
          >
            Visit
            <BsArrowUpRight className="text-[0.6rem]" />
          </span>
        </div>
      </div>
    </a>
  )
}
