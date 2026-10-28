import LocalTime from "@/components/primitives/LocalTime";
import { navLinksArr } from "@/constants/links";
import { contact, site, socials } from "@/constants/personal";
import Link from "next/link";

/** Closes every page: oversized outline wordmark, link columns, status bar. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[1] overflow-hidden border-t border-rule bg-paper">
      <div className="shell grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <p className="tag tag--accent flex items-center gap-2">
            <span className="ping h-1.5 w-1.5 rounded-full bg-accent" />
            Available for new roles
          </p>
          <p className="mt-5 max-w-sm font-display text-2xl leading-tight tracking-[-0.03em] text-ink">
            Leading teams, shipping systems, sweating the details.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className="tag">Sitemap</p>
          <ul className="mt-5 space-y-3">
            {navLinksArr.map((l) => (
              <li key={l.url}>
                <Link href={l.url} className="uline text-ink-2 hover:text-ink">
                  {l.name}
                </Link>
              </li>
            ))}
            <li>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="uline text-ink-2 hover:text-ink">
                Résumé ↗
              </a>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="tag">Elsewhere</p>
          <ul className="mt-5 space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target={s.label === "Email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="uline text-ink-2 hover:text-ink"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden
        className="text-outline pointer-events-none select-none whitespace-nowrap text-center font-display text-[clamp(3rem,12.5vw,13rem)] font-normal leading-[0.85] tracking-[-0.035em]"
      >
        MAYANK PANCHAL
      </p>

      <div className="shell flex flex-wrap items-center justify-between gap-4 border-t border-rule py-6">
        <p className="tag">
          © {year} {site.name}
        </p>
        <p className="tag flex items-center gap-2 tabular-nums">
          {contact.city} <span aria-hidden>/</span> <LocalTime />
        </p>
        <p className="tag hidden sm:block">Next.js · GSAP · Lenis</p>
      </div>
    </footer>
  );
}
