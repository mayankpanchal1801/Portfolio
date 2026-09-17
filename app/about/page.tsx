import PageHeader from "@/components/primitives/PageHeader";
import Reveal from "@/components/primitives/Reveal";
import Chronology from "@/components/sections/Chronology";
import ContactCta from "@/components/sections/ContactCta";
import Toolkit from "@/components/sections/Toolkit";
import { experienceArr } from "@/constants/experience";
import { about, contact, site, socials } from "@/constants/personal";
import { skillsFlat } from "@/constants/skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About - ${site.name}`,
    description: about.intro,
    url: `${site.url}/about`,
    type: "profile",
  },
};

const aboutLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${site.url}/about#page`,
  url: `${site.url}/about`,
  name: `About - ${site.name}`,
  description: about.intro,
  mainEntity: {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    jobTitle: site.role,
    email: contact.email,
    telephone: contact.phone || undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.city,
      addressRegion: contact.region,
      addressCountry: contact.country,
    },
    knowsAbout: skillsFlat,
    sameAs: socials.filter((s) => s.label !== "Email").map((s) => s.url),
    hasOccupation: experienceArr
      .filter((e) => e.type === "work")
      .map((e) => ({
        "@type": "Occupation",
        name: e.title,
        occupationLocation: { "@type": "City", name: contact.city },
        occupationalCategory: "15-1252 Software Developers",
      })),
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "About", item: `${site.url}/about` },
    ],
  },
};

const FACTS = [
  { k: "Role", v: site.role },
  { k: "Based in", v: `${contact.city}, ${contact.country}` },
  { k: "Timezone", v: contact.timezone },
  { k: "Education", v: `${about.education.degree}, ${about.education.school}` },
  { k: "Focus", v: "Full-Stack & Systems" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="A"
        label="About"
        headingId="about-heading"
        meta="Full-stack · Bengaluru"
        title={
          <>
            A developer who ships end to end - with AI as a{" "}
            <em className="text-accent-ink">tool</em>, not a shortcut.
          </>
        }
        intro={about.headline}
      />

      {/* ── Facts and the long version ── */}
      <section className="band shell" aria-labelledby="bio-heading">
        <h2 id="bio-heading" className="sr-only">
          Biography
        </h2>

        <div className="grid-12">
          <aside className="col-span-12 lg:col-span-4">
            <dl>
              {FACTS.map((f) => (
                <div key={f.k} className="grid grid-cols-3 gap-4 border-t border-rule py-3.5">
                  <dt className="tag col-span-1 pt-1">{f.k}</dt>
                  <dd className="col-span-2 text-sm text-ink">{f.v}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="col-span-12 mt-14 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <div className="space-y-6 text-ink-2">
              {about.bio.map((para, i) => (
                <Reveal
                  key={para.slice(0, 32)}
                  mode="fade"
                  delay={Math.min(i, 4) * 0.05}
                  className={i === 0 ? "text-lede text-ink" : undefined}
                >
                  {para}
                </Reveal>
              ))}
            </div>

            <Reveal mode="fade" className="mt-10 flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  {s.label}
                </a>
              ))}
            </Reveal>

            {/* Principles */}
            <div className="mt-16 border-t border-rule pt-8">
              <p className="tag tag--accent">Principles</p>
              <ol className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {about.values.map((v, i) => (
                  <Reveal
                    as="li"
                    key={v.title}
                    mode="fade"
                    delay={i * 0.05}
                    className="border-t border-rule pt-4"
                  >
                    <span className="marginal text-accent-ink">
                      {String(i + 1).padStart(2, "0")} / 04
                    </span>
                    <h3 className="mt-3 font-display text-lg text-ink">{v.title}</h3>
                    <p className="mt-2 text-sm text-ink-2">{v.body}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <Chronology full index="A1" headingId="about-chronology-heading" />
      <Toolkit index="A2" headingId="about-toolkit-heading" />
      <ContactCta index="A3" headingId="about-contact-heading" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
      />
    </>
  );
}
