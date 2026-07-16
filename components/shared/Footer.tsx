"use client";

import Marquee from "@/components/ui/Marquee";
import { navLinksArr } from "@/constants/links";
import { about, contact, site, socials } from "@/constants/personal";
import { gsap } from "@/lib/gsap-config";
import { splitText } from "@/lib/text-splitter";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const el = emailRef.current;
    if (!el) return;
    const chars = splitText(el as HTMLAnchorElement as HTMLElement, "chars");
    gsap.from(chars, {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.025,
      ease: "expo.out",
      scrollTrigger: { trigger: footerRef.current, start: "top 80%", toggleActions: "play none none reverse" },
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-obsidian border-t border-fog mt-24 overflow-hidden"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="py-10 border-b border-fog">
        <Marquee
          items={[
            "Available for work",
            "Full Stack Developer",
            "Next.js · FastAPI · PostgreSQL",
            "Docker · AWS · CI/CD",
            "AI-augmented workflows",
            "Bengaluru · India · Remote",
            "Let's build something",
          ]}
          speed={40}
          direction={-1}
          itemClassName="text-4xl md:text-6xl"
        />
      </div>

      <div className="container py-16 md:py-24">
        <div className="mb-14 md:mb-20">
          <p className="eyebrow eyebrow--acid mb-6">Let&rsquo;s work together</p>
          <a
            ref={emailRef}
            href={`mailto:${contact.email}`}
            data-cursor="hover"
            className="block font-serif leading-[0.95] tracking-[-0.03em] text-bone hover:text-acid transition-colors"
            style={{ fontSize: "clamp(2.25rem, 8vw, 6.5rem)" }}
          >
            {contact.email}
          </a>
          <p className="mt-6 max-w-measure text-pearl">
            {about.workingWith.split(" — ")[0]}. If you&rsquo;re hiring, freelancing, or just curious — send a note.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 pt-10 border-t border-fog">
          <div>
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-2 text-bone">
              {navLinksArr.map((l) => (
                <li key={l.url}>
                  <Link href={l.url} className="link-underline" data-cursor="hover">{l.name}</Link>
                </li>
              ))}
              <li>
                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="link-underline" data-cursor="hover">
                  Résumé (PDF)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Elsewhere</p>
            <ul className="space-y-2 text-bone">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="link-underline" data-cursor="hover">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-2 text-pearl">
              <li>
                <a href={`mailto:${contact.email}`} className="link-underline text-bone" data-cursor="hover">{contact.email}</a>
              </li>
              <li>
                <a href={contact.phoneHref} className="font-mono text-sm" data-cursor="hover">{contact.phone}</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Based in</p>
            <address className="not-italic text-pearl space-y-1">
              <p className="text-bone">{contact.city}</p>
              <p className="text-sm">{contact.region}, {contact.country}</p>
              <p className="font-mono text-xs text-ash mt-2">
                {contact.coords.lat.toFixed(4)}°N · {contact.coords.lng.toFixed(4)}°E
              </p>
              <p className="font-mono text-xs text-ash">{contact.timezone}</p>
            </address>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-fog flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ash">
            © {year} · {site.name}
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ash">
            Designed &amp; built in {contact.city} · Next.js · GSAP · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
