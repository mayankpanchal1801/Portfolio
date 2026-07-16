import ProjectDetail from "@/components/pages/ProjectDetail";
import { site } from "@/constants/personal";
import { projectsArr } from "@/constants/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

type Params = { slug: string };

export function generateStaticParams() {
  return projectsArr.filter((p) => !p.placeholder).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsArr.find((p) => p.slug === slug);
  if (!project) return {};
  const url = `${site.url}/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.description,
      url,
      type: "article",
      images: [{ url: site.ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${site.name}`,
      description: project.description,
      images: [site.ogImage],
    },
    keywords: project.tags,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const idx = projectsArr.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();

  const project = projectsArr[idx];
  if (project.placeholder) notFound();

  const nextProject = projectsArr[(idx + 1) % projectsArr.length];
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
    ...(project.imgSrc ? { image: `${site.url}${(project.imgSrc as { src: string }).src ?? ""}` } : {}),
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
      <ProjectDetail project={project} nextProject={nextProject} />
      <Script
        id={`ld-project-${project.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectLd) }}
      />
      <Script
        id={`ld-crumbs-${project.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
