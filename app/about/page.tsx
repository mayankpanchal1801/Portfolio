import AboutPageView from "@/components/pages/AboutPage";
import { about, contact, site, socials } from "@/constants/personal";
import { experienceArr } from "@/constants/experience";
import { skillsFlat } from "@/constants/skills";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About",
  description: `${about.headline} ${about.intro}`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${site.name}`,
    description: about.intro,
    url: `${site.url}/about`,
    type: "profile",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `About ${site.name}` }],
  },
};

const aboutLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${site.url}/about#page`,
  url: `${site.url}/about`,
  name: `About — ${site.name}`,
  description: about.intro,
  mainEntity: {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    jobTitle: site.role,
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.city,
      addressRegion: contact.region,
      addressCountry: contact.country,
    },
    knowsAbout: skillsFlat,
    sameAs: socials.filter((s) => s.label !== "Email").map((s) => s.url),
    hasOccupation: experienceArr
      .filter((e) => e.type === "work")
      .map((e) => ({
        "@type": "Occupation",
        name: e.title,
        occupationLocation: {
          "@type": "City",
          name: contact.city,
        },
        estimatedSalary: undefined,
        occupationalCategory: "15-1252 Software Developers",
      })),
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "About", item: `${site.url}/about` },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutPageView />
      <Script
        id="ld-about"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
      />
    </>
  );
}
