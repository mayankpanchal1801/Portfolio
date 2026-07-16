import Hero from "@/components/Hero";
import AboutStrip from "@/components/home/AboutStrip";
import ContactStrip from "@/components/home/ContactStrip";
import ExperienceStrip from "@/components/home/ExperienceStrip";
import SelectedWork from "@/components/home/SelectedWork";
import SkillsStrip from "@/components/home/SkillsStrip";
import Marquee from "@/components/ui/Marquee";
import { about, site } from "@/constants/personal";
import { projectsArr } from "@/constants/projects";
import Script from "next/script";

const homeLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/#home`,
  url: site.url,
  name: `${site.name} — ${site.role}`,
  description: about.intro,
  primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}/mayank.jpeg` },
  mainEntity: { "@id": `${site.url}/#person` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.url }],
  },
};

const itemListLd = {
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

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="py-8 border-y border-fog bg-obsidian">
        <Marquee
          items={[
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
            "GitHub Actions",
            "Cursor",
            "Claude Code",
            "Devin",
          ]}
          speed={38}
          direction={-1}
          itemClassName="text-3xl md:text-5xl"
          separator="/"
        />
      </div>

      <SelectedWork />
      <AboutStrip />
      <SkillsStrip />

      <div className="py-8 border-y border-fog bg-obsidian">
        <Marquee
          items={[
            "Available for work",
            "Full Stack Developer",
            "Python · FastAPI · Next.js",
            "Bengaluru → World",
            "Human-in-the-loop AI",
            "Ships end-to-end",
          ]}
          speed={45}
          direction={1}
          itemClassName="text-3xl md:text-5xl"
        />
      </div>

      <ExperienceStrip />
      <ContactStrip />

      <Script id="ld-home" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeLd) }} />
      <Script id="ld-itemlist" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
    </main>
  );
}
