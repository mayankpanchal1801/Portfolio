import ProjectCase from "@/components/sections/ProjectCase";
import { site } from "@/constants/personal";
import { projectsArr } from "@/constants/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { slug: string };

/** Only shipped projects get a case-study route. */
const shipped = projectsArr.filter((p) => !p.placeholder);

export function generateStaticParams() {
  return shipped.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = shipped.find((p) => p.slug === slug);
  if (!project) return {};

  const url = `${site.url}/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.description,
    keywords: project.tags,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${site.name}`,
      description: project.description,
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = shipped.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = shipped[index];
  // Wrap within shipped projects only, so "next" can never be a dead link.
  const nextProject = shipped[(index + 1) % shipped.length];
  const url = `${site.url}/projects/${project.slug}`;

  const projectLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    name: project.title,
    headline: project.title,
    description: project.description,
    abstract: project.longDescription,
    url,
    inLanguage: "en",
    author: { "@id": `${site.url}/#person` },
    creator: { "@id": `${site.url}/#person` },
    dateCreated: project.year,
    genre: project.category,
    keywords: project.tags.join(", "),
    ...(project.imgSrc ? { image: `${site.url}${project.imgSrc.src}` } : {}),
    ...(project.url ? { sameAs: [project.url] } : {}),
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${site.url}/projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  return (
    <>
      <ProjectCase project={project} nextProject={nextProject} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
