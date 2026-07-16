import { projectsArr } from "@/constants/projects";
import { site } from "@/constants/personal";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`,         lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${site.url}/about`,    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/contact`,  lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectsArr
    .filter((p) => !p.placeholder) // don't sitemap placeholder AI projects
    .map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...projectRoutes];
}
