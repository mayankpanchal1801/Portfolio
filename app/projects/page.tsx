import ProjectsList from "@/components/pages/ProjectsList";
import { projectsArr } from "@/constants/projects";
import { site } from "@/constants/personal";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of production products and websites built by Mayank Panchal across React, Next.js, WordPress, and AI/LLM stacks.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects — ${site.name}`,
    description:
      "Selected work — React, Next.js, WordPress, and AI/LLM projects by Mayank Panchal.",
    url: `${site.url}/projects`,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `Projects — ${site.name}` }],
  },
};

const itemListLd = {
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
  return (
    <>
      <ProjectsList />
      <Script
        id="ld-projects"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </>
  );
}
