"use client";

import ImageReveal from "@/components/ui/ImageReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { about, contact, site, socials } from "@/constants/personal";
import { gsap } from "@/lib/gsap-config";
import { splitText } from "@/lib/text-splitter";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { BsArrowDown, BsGithub, BsLinkedin } from "react-icons/bs";

const ROLES = [
  "Full Stack Developer",
  "Next.js · FastAPI · PostgreSQL",
  "React · TypeScript · Docker",
  "AI-augmented engineer",
  "Bengaluru, India",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 2.6 });

    // eyebrow
    if (eyebrowRef.current) {
      tl.from(Array.from(eyebrowRef.current.children), { opacity: 0, y: 20, duration: 0.6, stagger: 0.08 });
    }

    // headline lines
    for (const ref of [line1Ref, line2Ref, line3Ref]) {
      if (ref.current) {
        const words = splitText(ref.current, "words");
        tl.from(words, { yPercent: 110, duration: 0.95, stagger: 0.06, ease: "expo.out" }, "-=0.55");
      }
    }

    // rest
    if (subtextRef.current) tl.from(subtextRef.current, { opacity: 0, y: 24, duration: 0.7 }, "-=0.5");
    if (metaRef.current)   tl.from(Array.from(metaRef.current.children), { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 }, "-=0.5");
    if (ctasRef.current)   tl.from(Array.from(ctasRef.current.children), { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 }, "-=0.4");
    if (scrollHintRef.current) tl.from(scrollHintRef.current, { opacity: 0, duration: 0.5 }, "-=0.2");

    // Role ticker — repeat vertical scroll
    if (rolesRef.current) {
      const items = Array.from(rolesRef.current.children) as HTMLElement[];
      const height = items[0]?.offsetHeight ?? 40;
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

    // Scroll hint bounce
    if (scrollHintRef.current) {
      gsap.to(scrollHintRef.current.querySelector("[data-arrow]"), {
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
      className="relative min-h-screen pt-24 md:pt-32 pb-14 md:pb-20 overflow-hidden"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 15% 10%, rgba(214,255,59,0.10) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 90% 90%, rgba(255,107,74,0.05) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <span className="ghost-num right-[-4rem] bottom-[-6rem]">01</span>

      <div className="container relative z-10">
        {/* Top band */}
        <div className="hidden md:flex items-center justify-between mb-12 lg:mb-16">
          <div ref={eyebrowRef} className="flex items-center gap-8">
            <span className="eyebrow eyebrow--acid inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-acid" /> Available 2026
            </span>
            <span className="eyebrow">Portfolio v3 · 2026</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="eyebrow">{contact.city} → World</span>
            <span className="eyebrow">4+ years shipping</span>
          </div>
        </div>

        <div className="rule mb-10 md:mb-14" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-14 lg:gap-24 items-start">
          <div>
            <h1
              className="font-serif text-bone"
              style={{ fontSize: "clamp(3rem, 12vw, 12rem)", lineHeight: 0.9, letterSpacing: "-0.045em" }}
            >
              <span className="line-mask block">
                <span ref={line1Ref} className="inline-block will-change-transform">
                  Full stack.
                </span>
              </span>
              <span className="line-mask block">
                <span ref={line2Ref} className="inline-block italic-wonk text-acid will-change-transform">
                  End to end.
                </span>
              </span>
              <span className="line-mask block">
                <span ref={line3Ref} className="inline-block will-change-transform">
                  Ships to prod.
                </span>
              </span>
            </h1>

            {/* Rotating role ticker */}
            <div className="mt-8 md:mt-10 flex items-center gap-4">
              <span className="eyebrow">Currently</span>
              <span className="h-px flex-1 max-w-16 bg-fog" />
              <div className="overflow-hidden" style={{ height: 32 }}>
                <div ref={rolesRef} className="flex flex-col will-change-transform">
                  {ROLES.map((r) => (
                    <span
                      key={r}
                      className="h-8 font-serif italic-wonk text-lg md:text-xl text-pearl flex items-center"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p
              ref={subtextRef}
              className="mt-10 md:mt-12 max-w-measure text-lede text-pearl"
            >
              {about.intro}
            </p>

            <div ref={metaRef} className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-fog pt-6">
              {[
                { k: "Experience", v: "4+ years full-stack" },
                { k: "Frontend", v: "Next.js · React · TS" },
                { k: "Backend", v: "FastAPI · PostgreSQL" },
                { k: "Infra", v: "Docker · AWS EC2" },
              ].map((m) => (
                <div key={m.k}>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ash mb-1.5">{m.k}</p>
                  <p className="text-bone text-sm">{m.v}</p>
                </div>
              ))}
            </div>

            <div ref={ctasRef} className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Link href="/contact" className="btn btn-primary" data-cursor="hover" data-cursor-magnetic>
                  Get in touch
                  <BsArrowDown className="rotate-[-45deg]" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/projects" className="btn btn-ghost" data-cursor="hover" data-cursor-magnetic>
                  Selected work
                </Link>
              </MagneticButton>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-hair" data-cursor="hover">
                Résumé (PDF)
              </a>

              <div className="ml-2 flex items-center gap-2">
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
          </div>

          {/* Portrait */}
          <div className="relative mx-auto lg:mx-0 lg:mt-4 flex-shrink-0" style={{ width: "min(380px, 82vw)" }}>
            <figure>
              <ImageReveal
                src="/mayank.jpeg"
                alt="Portrait of Mayank Panchal"
                className="aspect-square border border-fog"
                sizes="(max-width: 1024px) 80vw, 380px"
                priority
                parallax
                from="bottom"
              />
              <figcaption className="mt-3 flex items-baseline justify-between">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ash">
                  Fig. 01 — The author
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ash">
                  BLR · 2026
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="mt-16 md:mt-24 flex items-center gap-4"
        >
          <span className="h-px w-16 bg-acid" aria-hidden />
          <span className="eyebrow eyebrow--acid">Scroll to explore</span>
          <span data-arrow className="text-acid inline-flex">
            <BsArrowDown />
          </span>
        </div>
      </div>
    </section>
  );
}
