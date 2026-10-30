import FigureLabel from "@/components/primitives/FigureLabel";
import LocalTime from "@/components/primitives/LocalTime";
import Parallax from "@/components/primitives/Parallax";
import RiseChars from "@/components/primitives/RiseChars";
import Roll from "@/components/primitives/Roll";
import { navLinksArr } from "@/constants/links";
import { contact, site, socials } from "@/constants/personal";
import Link from "next/link";

/**
 * Closes every page: the oversized wordmark, link columns, status bar.
 *
 * The contents ride up from under the page's last section as the footer
 * arrives (a parallax inside a clipping frame - the lenis.dev curtain
 * without taking the footer out of flow), and the wordmark's letters
 * climb out of their baseline one at a time.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[1] overflow-hidden border-t border-rule bg-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="floor opacity-60" />
      </div>

      <Parallax from={-28} to={0} parent start="top bottom" end="bottom bottom">
      <div className="shell relative grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <FigureLabel index="XX" label="colophon" rule={false} />
          <p className="mt-6 max-w-sm font-display text-d3 font-medium text-ink">
            Leading teams, shipping systems, sweating the details.
          </p>
          <p className="tag tag--accent mt-6 flex items-center gap-2">
            <span className="ping h-1.5 w-1.5 bg-accent" />
            Available for new roles
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className="tag">Sitemap</p>
          <ul className="mt-6 space-y-3">
            {navLinksArr.map((link) => (
              <li key={link.url}>
                <Link href={link.url} className="text-ink-2 transition-colors hover:text-ink">
                  <Roll>{link.name}</Roll>
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-ink-2 transition-colors hover:text-ink"
              >
                <Roll>Résumé ↗</Roll>
              </a>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="tag">Elsewhere</p>
          <ul className="mt-6 space-y-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target={social.label === "Email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="text-ink-2 transition-colors hover:text-ink"
                >
                  <Roll>{social.label} ↗</Roll>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div aria-hidden>
        <RiseChars
          text="MAYANK PANCHAL"
          className="text-outline pointer-events-none select-none whitespace-nowrap text-center font-display text-[clamp(3rem,11.6vw,13rem)] font-medium leading-[0.82] tracking-[-0.05em]"
        />
      </div>
      </Parallax>

      <div className="shell flex flex-wrap items-center justify-between gap-4 border-t border-rule py-6">
        <p className="tag">
          © {year} {site.name}
        </p>
        <p className="tag flex items-center gap-2 tabular-nums">
          {contact.city} <span aria-hidden className="text-rule-strong">/</span> <LocalTime />
        </p>
        <p className="tag hidden sm:block">Next.js · GSAP · Lenis</p>
      </div>
    </footer>
  );
}
