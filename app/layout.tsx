import CommandPalette from "@/components/chrome/CommandPalette";
import Cursor from "@/components/chrome/Cursor";
import Footer from "@/components/chrome/Footer";
import Header from "@/components/chrome/Header";
import ScrollMeter from "@/components/chrome/ScrollMeter";
import SmoothScroll from "@/components/chrome/SmoothScroll";
import { ThemeProvider } from "@/components/chrome/ThemeProvider";
import { about, contact, seoKeywords, site, socials } from "@/constants/personal";
import { skillsFlat } from "@/constants/skills";
import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ── Fonts ────────────────────────────────────────────────────────────
// Display: Instrument Serif - condensed editorial serif; its italic carries the accent words.
// Body:    Hanken Grotesk - warm, open grotesque with excellent small-size legibility.
// Data:    JetBrains Mono - labels, figures and telemetry.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display-face",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-body-face",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-mono-face",
  display: "swap",
});

// ── Metadata ─────────────────────────────────────────────────────────
// Icons and OG images come from the file conventions in app/ -
// icon.tsx, apple-icon.tsx, opengraph-image.tsx - so they always exist.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.role} · Next.js, FastAPI, PostgreSQL`,
    template: `%s · ${site.name} - ${site.role}`,
  },
  description: site.tagline,
  applicationName: site.name,
  keywords: [...seoKeywords, ...skillsFlat],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  generator: "Next.js",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/", "x-default": "/" },
    types: {
      "text/plain": [{ url: "/llms.txt", title: "LLM discovery" }],
    },
  },
  openGraph: {
    type: "profile",
    locale: site.locale,
    alternateLocale: ["en_US"],
    url: site.url,
    siteName: site.name,
    title: `${site.name} - ${site.role} · Bengaluru, India`,
    description: site.tagline,
    firstName: "Mayank",
    lastName: "Panchal",
    username: "mayankpanchal01",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - ${site.role}`,
    description: site.taglineShort,
    creator: site.twitterHandle,
    site: site.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/site.webmanifest",
  referrer: "origin-when-cross-origin",
  other: {
    "geo.region": contact.regionCode,
    "geo.placename": contact.city,
    "geo.position": `${contact.coords.lat};${contact.coords.lng}`,
    ICBM: `${contact.coords.lat}, ${contact.coords.lng}`,
    "ai-content-declaration": "human-authored",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3F1EA",
  width: "device-width",
  initialScale: 1,
};

// ── JSON-LD ──────────────────────────────────────────────────────────
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  alternateName: ["Mayank", "@mayankpanchal01"],
  givenName: "Mayank",
  familyName: "Panchal",
  jobTitle: site.role,
  description: about.intro,
  disambiguatingDescription: site.tagline,
  url: site.url,
  mainEntityOfPage: site.url,
  email: `mailto:${contact.email}`,
  telephone: contact.phone || undefined,
  nationality: { "@type": "Country", name: "India" },
  address: {
    "@type": "PostalAddress",
    addressLocality: contact.city,
    addressRegion: contact.region,
    addressCountry: contact.country,
  },
  homeLocation: {
    "@type": "Place",
    name: `${contact.city}, ${contact.country}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.coords.lat,
      longitude: contact.coords.lng,
    },
  },
  worksFor: {
    "@type": "Organization",
    name: "Screen Interactiv (Screetract OPC)",
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.city,
      addressRegion: contact.region,
      addressCountry: contact.country,
    },
  },
  hasOccupation: {
    "@type": "Occupation",
    name: site.role,
    description:
      "Lead Software Engineer designing async REST APIs with FastAPI + PostgreSQL, and shipping type-safe Next.js / React frontends. Owns features end-to-end - schema, API, UI, container, deploy.",
    occupationLocation: [
      { "@type": "City", name: contact.city },
      { "@type": "Country", name: contact.country },
    ],
    occupationalCategory: "15-1252 Software Developers",
    skills: skillsFlat.join(", "),
    experienceRequirements: "5 years shipping production full-stack web applications",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: about.education.school,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gangoh",
      addressRegion: "Uttar Pradesh",
      addressCountry: contact.country,
    },
  },
  knowsAbout: skillsFlat,
  knowsLanguage: [
    { "@type": "Language", name: "English", alternateName: "en" },
    { "@type": "Language", name: "Hindi", alternateName: "hi" },
  ],
  sameAs: socials.filter((s) => s.label !== "Email").map((s) => s.url),
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  alternateName: site.shortName,
  description: site.tagline,
  publisher: { "@id": `${site.url}/#person` },
  author: { "@id": `${site.url}/#person` },
  inLanguage: "en",
  copyrightHolder: { "@id": `${site.url}/#person` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${hanken.variable} ${jetbrains.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <body>
        <link rel="author" href="/humans.txt" />
        {socials
          .filter((s) => s.label !== "Email")
          .map((s) => (
            <link key={s.url} rel="me" href={s.url} />
          ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:bg-accent focus:text-on-accent focus:px-4 focus:py-2 focus:rounded-sm"
        >
          Skip to content
        </a>

        <ThemeProvider>
          <ScrollMeter />
          <Cursor />
          <CommandPalette />
          <SmoothScroll>
            <Header />
            <main id="main" className="relative z-[1]">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
