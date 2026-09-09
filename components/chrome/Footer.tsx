import Drift from "@/components/primitives/Drift";
import Reveal from "@/components/primitives/Reveal";
import { navLinksArr } from "@/constants/links";
import { contact, site, socials } from "@/constants/personal";
import Link from "next/link";

/**
 * The one inverted surface on the site — an ink slab that closes every
 * page, with the email set as the largest thing on it.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[1] bg-paper text-ink">
      <div className="border-b border-rule py-7">
        <Drift
          items={[
            "Full-stack engineering",
            "Next.js · FastAPI · PostgreSQL",
            "Docker · AWS · CI/CD",
            "Bengaluru · Remote worldwide",
          ]}
          duration={58}
          itemClassName="font-display text-[clamp(1.75rem,4vw,3rem)] tracking-[-0.03em]"
        />
      </div>

      <div className="shell py-12 sm:py-16 md:py-24">
        <p className="tag text-ink-3">Start a conversation</p>

        <Reveal
          as="a"
          mode="words"
          href={`mailto:${contact.email}`}
          className="mt-5 sm:mt-6 block font-display text-[clamp(1.5rem,6.5vw,5rem)] leading-[0.95] tracking-[-0.04em] break-words transition-colors hover:text-accent"
        >
          {contact.email}
        </Reveal>

        <p className="measure mt-5 sm:mt-7 text-sm sm:text-base text-ink-2 leading-relaxed">
          Hiring, freelancing, or just curious about the stack — a short note is
          enough. I reply within a business day.
        </p>

        <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-8 border-t border-rule pt-8 sm:pt-10 md:grid-cols-4 md:gap-6">
          <nav aria-label="Footer">
            <p className="tag text-ink-3">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {navLinksArr.map((l) => (
                <li key={l.url}>
                  <Link href={l.url} className="uline">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="tag text-ink-3">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="uline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="tag text-ink-3">Direct</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${contact.email}`} className="uline break-all">
                  {contact.email}
                </a>
              </li>
              {contact.phone && (
                <li>
                  <a
                    href={contact.phoneHref}
                    className="font-mono text-sm text-ink-2"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <p className="tag text-ink-3">Based in</p>
            <address className="mt-4 space-y-1 not-italic">
              <p>{contact.city}</p>
              <p className="text-sm text-ink-2">
                {contact.region}, {contact.country}
              </p>
              <p className="pt-2 font-mono text-xs text-ink-3 tabular-nums">
                {contact.coords.lat.toFixed(4)}°N ·{" "}
                {contact.coords.lng.toFixed(4)}°E
              </p>
              <p className="font-mono text-xs text-ink-3">
                {contact.timezone}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between text-xs">
          <p className="tag text-ink-3">
            © {year} · {site.name}
          </p>
          <p className="tag text-ink-3">
            Next.js · Tailwind · GSAP · Built in {contact.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
