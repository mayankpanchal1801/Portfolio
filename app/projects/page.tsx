import ProjectsListClient from '@/components/pages/ProjectsListClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects — Mayank Panchal',
  description:
    'A selection of products and websites designed and built by Mayank Panchal across React, WordPress, and full-stack technologies.',
}

export default function ProjectsPage() {
  return <ProjectsListClient />
}
