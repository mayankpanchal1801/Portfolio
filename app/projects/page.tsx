import ContactCta from "@/components/sections/ContactCta";
import ProjectsIndex from "@/components/sections/ProjectsIndex";
import PageHeader from "@/components/primitives/PageHeader";
import { site } from "@/constants/personal";
import { projectsArr } from "@/constants/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production products and websites built by Mayank Panchal across Next.js, FastAPI, React, WordPress, and AI/LLM stacks.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects — ${site.name}`,
    description:
      "Selected work — Next.js, FastAPI, React, WordPress, and AI/LLM projects.",
    url: `${site.url}/projects`,
    type: "website",
  },
};

const collectionLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${site.url}/projects#page`,
  url: `${site.url}/projects`,
  name: `Projects — ${site.name}`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${site.url}/projects` },
    ],
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projectsArr
      .filter((p) => !p.placeholder)
      .map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}/projects/${p.slug}`,
        name: p.title,
      })),
  },
};

export default function ProjectsPage() {
  const shipped = projectsArr.filter((p) => !p.placeholder).length;

  return (
    <>
      <PageHeader
        index="P"
        label="Projects"
        headingId="projects-heading"
        meta={`${shipped} shipped · ${projectsArr.length} total`}
        title={
          <>
            Selected work, <em className="text-accent-ink">chronologically</em>.
          </>
        }
        intro="An index of shipped production work, plus a few AI experiments still in progress. Each shipped entry links to a case study."
      />

      <ProjectsIndex />
      <ContactCta index="P1" headingId="projects-contact-heading" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
    </>
  );
}
