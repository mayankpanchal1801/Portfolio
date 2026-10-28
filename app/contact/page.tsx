import PageHeader from "@/components/primitives/PageHeader";
import ContactForm from "@/components/sections/ContactForm";
import { contact, faqs, site, socials } from "@/constants/personal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} - ${site.role} in ${contact.city}, ${contact.country}. Email ${contact.email}${contact.phone ? ` or call ${contact.phone}` : ""}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact - ${site.name}`,
    description: `Get in touch with ${site.name} - ${site.role} based in ${contact.city}, ${contact.country}.`,
    url: `${site.url}/contact`,
    type: "website",
  },
};

const contactLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${site.url}/contact#page`,
  url: `${site.url}/contact`,
  name: `Contact - ${site.name}`,
  mainEntity: { "@id": `${site.url}/#person` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${site.url}/contact` },
    ],
  },
};

const contactFaqs = faqs.filter((f) =>
  /contact|located|available/i.test(f.q),
);

export default function ContactPage() {
  return (
    <>
      <PageHeader
        index="C"
        label="Contact"
        headingId="contact-heading"
        meta="Replies within a business day"
        title={
          <>
            Let&rsquo;s make <span className="text-signal">something</span> together.
          </>
        }
        intro="Email is the fastest way to reach me. Prefer LinkedIn or GitHub? Both are below."
      />

      <section className="band shell" aria-labelledby="contact-form-heading">
        <h2 id="contact-form-heading" className="sr-only">
          Send a message
        </h2>

        <div className="grid-12">
          <div className="col-span-12 lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="col-span-12 mt-16 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <div className="flex items-baseline justify-between border-b border-rule pb-3">
              <span className="tag tag--accent">Direct</span>
              <span className="tag">Preferred</span>
            </div>

            <ul className="mt-6 space-y-6">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="uline block font-display text-[clamp(1.05rem,1.7vw,1.4rem)] text-ink [overflow-wrap:anywhere]"
                >
                  {contact.email}
                </a>
                <span className="tag mt-1.5 block">Email</span>
              </li>
            </ul>

            <div className="mt-10 rounded-2xl border border-rule bg-paper-2/70 p-6">
              <p className="tag">Location</p>
              <p className="mt-4 font-display text-d3 text-ink">{contact.city}</p>
              <p className="text-ink-3">
                {contact.region}, {contact.country}
              </p>
              <dl className="mt-5 space-y-2 border-t border-rule pt-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="tag">Coord.</dt>
                  <dd className="marginal text-ink tabular-nums">
                    {contact.coords.lat.toFixed(4)}°N · {contact.coords.lng.toFixed(4)}°E
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="tag">Timezone</dt>
                  <dd className="marginal text-ink">{contact.timezone}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="tag">Region</dt>
                  <dd className="marginal text-ink">{contact.regionCode}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-10">
              <p className="tag">Elsewhere</p>
              <ul className="mt-4">
                {socials.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-baseline justify-between gap-4 border-b border-rule py-3"
                  >
                    <a href={s.url} target="_blank" rel="noreferrer" className="uline text-ink">
                      {s.label}
                    </a>
                    <span className="marginal">{s.handle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Common questions ── */}
      {contactFaqs.length > 0 && (
        <section className="band border-t border-rule bg-paper-2/50" aria-labelledby="faq-heading">
          <div className="shell">
            <h2 id="faq-heading" className="sr-only">
              Common questions
            </h2>
            <div className="flex items-baseline gap-3 border-t border-rule pt-5">
              <span className="marginal text-accent-ink">C1</span>
              <span className="marginal">Common questions</span>
            </div>

            <dl className="mt-10 border-t border-rule">
              {contactFaqs.map((f) => (
                <div key={f.q} className="grid-12 gap-y-3 border-b border-rule py-7">
                  <dt className="col-span-12 font-display text-d3 text-ink md:col-span-5">
                    {f.q}
                  </dt>
                  <dd className="col-span-12 text-ink-2 md:col-span-6 md:col-start-7">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
    </>
  );
}
