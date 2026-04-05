import ProjectDetailView from '@/components/pages/ProjectDetailView'
import { projectsArr } from '@/constants/projects'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return projectsArr.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = projectsArr.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Mayank Panchal`,
    description: project.description,
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const idx = projectsArr.findIndex((p) => p.slug === params.slug)
  if (idx === -1) notFound()

  const project = projectsArr[idx]
  const nextProject = projectsArr[(idx + 1) % projectsArr.length]

  return <ProjectDetailView project={project} nextProject={nextProject} />
}
