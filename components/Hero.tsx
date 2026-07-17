"use client";

import FigureTicks from "@/components/shared/FigureTicks";
import ImageReveal from "@/components/ui/ImageReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { about, socials } from "@/constants/personal";
import { gsap } from "@/lib/gsap-config";
import { splitText } from "@/lib/text-splitter";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsArrowDown, BsGithub, BsLinkedin } from "react-icons/bs";

const ROLES = [
  "Full Stack Developer",
  "Next.js · FastAPI · PostgreSQL",
  "React · TypeScript · Docker",
  "AI-augmented engineer",
  "Bengaluru, India",
];

const STACK: { label: string; items: string[] }[] = [
  { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind"] },
  { label: "Backend", items: ["FastAPI", "Pydantic", "PostgreSQL", "Redis"] },
  { label: "Infra", items: ["Docker", "AWS EC2", "Nginx", "GH Actions"] },
  { label: "AI-augmented", items: ["Cursor", "Claude Code", "Devin", "Copilot"] },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 2.6 });

    if (ribbonRef.current) {
      tl.from(Array.from(ribbonRef.current.children), {
        opacity: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.07,
      });
    }

    for (const ref of [line1Ref, line2Ref]) {
      if (ref.current) {
        const words = splitText(ref.current, "words");
        tl.from(words, { yPercent: 110, duration: 1.0, stagger: 0.06 }, "-=0.6");
      }
    }

    if (taglineRef.current)
      tl.from(taglineRef.current, { opacity: 0, y: 24, duration: 0.75 }, "-=0.55");

    if (bioRef.current)
      tl.from(bioRef.current, { opacity: 0, y: 20, duration: 0.7 }, "-=0.5");

    if (ctasRef.current)
      tl.from(Array.from(ctasRef.current.children), {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.07,
      }, "-=0.4");

    if (stackRef.current)
      tl.from(Array.from(stackRef.current.children), {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
      }, "-=0.5");

    if (scrollRef.current)
      tl.from(scrollRef.current, { opacity: 0, duration: 0.5 }, "-=0.2");

    if (rolesRef.current) {
      const items = Array.from(rolesRef.current.children) as HTMLElement[];
      const height = items[0]?.offsetHeight ?? 28;
      gsap.set(rolesRef.current, { height });
      const rt = gsap.timeline({ repeat: -1, delay: 3.5 });
      items.forEach((_, i) => {
        rt.to(rolesRef.current, {
          y: -height * (i + 1),
          duration: 0.75,
          ease: "expo.inOut",
          delay: 1.8,
        });
      });
      rt.set(rolesRef.current, { y: 0 });
    }

    if (scrollRef.current) {
      gsap.to(scrollRef.current.querySelector("[data-arrow]"), {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
        delay: 4,
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen pt-20 md:pt-24 pb-12 md:pb-16 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 12% 8%, rgba(214,255,59,0.10) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 92% 92%, rgba(255,107,74,0.05) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <span className="ghost-num right-[-6rem] bottom-[-8rem]">01</span>

      <div className="container relative z-10">
        {/* ─── Ribbon ─── */}
        <div
          ref={ribbonRef}
          className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6 pb-5 border-b border-fog"
        >
          <span className="eyebrow eyebrow--acid inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-acid opacity-70 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
            </span>
            Available 2026
          </span>
          <span className="eyebrow hidden md:inline-flex">Portfolio · MP-2026</span>
          <span className="eyebrow inline-flex items-center gap-2 tabular-nums">
            <span>BLR</span>
            <span className="text-stone">/</span>
            <span className="text-bone">{time ?? "— · —"}</span>
            <span>IST</span>
          </span>
        </div>

        {/* ─── Wordmark + portrait ─── */}
        <div className="mt-10 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-8">
            <h1
              className="font-serif text-bone"
              style={{
                fontSize: "clamp(3rem, 14vw, 8rem)",
                lineHeight: 0.86,
                letterSpacing: "-0.05em",
              }}
            >
              <span className="line-mask block">
                <span ref={line1Ref} className="inline-block will-change-transform">
                  Mayank
                </span>
              </span>
              <span className="line-mask block">
                <span ref={line2Ref} className="inline-block will-change-transform">
                  Panchal.
                </span>
              </span>
            </h1>

            <p
              ref={taglineRef}
              className="mt-6 md:mt-8 font-serif text-3xl md:text-5xl text-pearl max-w-[22ch] leading-[1.05]"
            >
              <span className="italic-wonk text-acid">Full-stack developer</span>
              <span className="text-bone">, end to end.</span>
            </p>

            {/* Currently rotator */}
            <div className="mt-8 md:mt-10 flex items-center gap-4">
              <span className="eyebrow">Currently</span>
              <span className="h-px w-16 bg-fog" />
              <div className="overflow-hidden" style={{ height: 28 }}>
                <div ref={rolesRef} className="flex flex-col will-change-transform">
                  {ROLES.map((r) => (
                    <span
                      key={r}
                      className="h-7 font-serif italic-wonk text-lg text-pearl flex items-center whitespace-nowrap"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p ref={bioRef} className="mt-8 md:mt-10 max-w-measure text-lede text-pearl">
              {about.intro}
            </p>

            {/* CTAs + socials */}
            <div ref={ctasRef} className="mt-8 md:mt-10 flex flex-wrap items-center gap-3 md:gap-4">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="btn btn-primary"
                  data-cursor="hover"
                  data-cursor-magnetic
                >
                  Get in touch
                  <BsArrowDown className="rotate-[-45deg]" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/projects"
                  className="btn btn-ghost"
                  data-cursor="hover"
                  data-cursor-magnetic
                >
                  Selected work
                </Link>
              </MagneticButton>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn btn-hair"
                data-cursor="hover"
              >
                Résumé (PDF)
              </a>
              <span className="hidden md:inline-block h-6 w-px bg-fog mx-2" aria-hidden />
              <a
                href={socials[0].url}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 rounded-full border border-fog flex items-center justify-center text-pearl hover:text-obsidian hover:bg-acid hover:border-acid transition-colors"
                data-cursor="hover"
              >
                <BsLinkedin />
              </a>
              <a
                href={socials[1].url}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-11 h-11 rounded-full border border-fog flex items-center justify-center text-pearl hover:text-obsidian hover:bg-acid hover:border-acid transition-colors"
                data-cursor="hover"
              >
                <BsGithub />
              </a>
            </div>
          </div>

          {/* Portrait as spec figure */}
          <div className="lg:col-span-4 mx-auto lg:mx-0 lg:mt-3 w-full max-w-[380px]">
            <figure className="relative">
              <FigureTicks />
              <ImageReveal
                src="/mayank.jpeg"
                alt="Portrait of Mayank Panchal"
                className="aspect-square border border-fog"
                sizes="(max-width: 1024px) 80vw, 380px"
                priority
                parallax
                from="bottom"
              />
              <figcaption className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ash">
                <span>Fig. 01</span>
                <span className="text-right text-bone">The Author</span>
                <span>Coord.</span>
                <span className="text-right">12.97°N · 77.59°E</span>
                <span>Tz.</span>
                <span className="text-right">Asia / Kolkata</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* ─── Stack sheet ─── */}
        <div
          ref={stackRef}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-fog"
        >
          {STACK.map((col, i) => {
            const borders = [
              "px-4 md:px-6 pt-6 pb-6",
              i > 0 ? "md:border-l md:border-fog" : "",
              i % 2 === 1 ? "border-l border-fog md:border-l" : "",
              i < 2 ? "border-b border-fog md:border-b-0" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <div key={col.label} className={borders}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ash">
                    {col.label}
                  </span>
                  <span className="italic-wonk text-acid text-sm">
                    0{i + 1}
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {col.items.map((item) => (
                    <li key={item} className="text-bone text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* ─── Scroll footer ─── */}
        <div
          ref={scrollRef}
          className="mt-10 md:mt-14 flex items-center justify-between gap-4 flex-wrap"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-16 bg-acid" aria-hidden />
            <span className="eyebrow eyebrow--acid">Scroll to explore</span>
            <span data-arrow className="text-acid inline-flex">
              <BsArrowDown />
            </span>
          </div>
          <span className="eyebrow">Section 01 / 06</span>
        </div>
      </div>
    </section>
  );
}
