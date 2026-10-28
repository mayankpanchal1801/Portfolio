import Drift from "@/components/primitives/Drift";
import Approach from "@/components/sections/Approach";
import Chronology from "@/components/sections/Chronology";
import ContactCta from "@/components/sections/ContactCta";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import SelectedWork from "@/components/sections/SelectedWork";
import Toolkit from "@/components/sections/Toolkit";
import { about, faqs, site } from "@/constants/personal";
import { projectsArr } from "@/constants/projects";

const STACK_TICKER = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "FastAPI",
  "Pydantic",
  "SQLAlchemy",
  "PostgreSQL",
  "Redis",
  "Celery",
  "Docker",
  "AWS EC2",
  "Nginx",
  "GitHub Actions",
];

const profileLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/#home`,
  url: site.url,
  name: `${site.name} - ${site.role}`,
  description: about.intro,
  mainEntity: { "@id": `${site.url}/#person` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.url }],
  },
};

const workLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Selected work",
  itemListElement: projectsArr
    .filter((p) => !p.placeholder)
    .map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${site.url}/projects/${p.slug}`,
    })),
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <Hero />

      <div className="relative z-[1] border-y border-rule bg-paper-2/60 py-6 backdrop-blur-sm">
        <Drift
          items={STACK_TICKER}
          duration={60}
          itemClassName="font-display text-[clamp(1.25rem,2.4vw,1.9rem)] font-normal tracking-[-0.03em] text-ink-3"
        />
      </div>

      <Stats />

      <SelectedWork />
      <Approach />
      <Toolkit />
      <Chronology />
      <ContactCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
