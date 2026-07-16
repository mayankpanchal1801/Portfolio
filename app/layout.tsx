import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SiteLoader from "@/components/ui/SiteLoader";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import { about, contact, seoKeywords, site, socials } from "@/constants/personal";
import { skillsFlat } from "@/constants/skills";
import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// ── Fonts ────────────────────────────────────────────────────────────
const serif = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
  display: "swap",
});

// ── Metadata (SEO / OG / Twitter / Verification / Geo / AIO) ─────────
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  applicationName: site.name,
  keywords: [...seoKeywords, ...skillsFlat],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  classification: "Personal Portfolio",
  generator: "Next.js",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: `${site.name} — Feed` }],
    },
  },
  openGraph: {
    type: "profile",
    locale: site.locale,
    alternateLocale: ["en_US"],
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${site.name} — ${site.role}` }],
    firstName: "Mayank",
    lastName: "Panchal",
    username: "mayankpanchal01",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    creator: site.twitterHandle,
    site: site.twitterHandle,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true, follow: true,
      "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  referrer: "origin-when-cross-origin",
  verification: {
    // google: "your-google-site-verification-token",
    // yandex: "your-yandex-verification-token",
    // other: { "msvalidate.01": "your-bing-verification-token" },
  },
  other: {
    "geo.region": contact.regionCode,
    "geo.placename": contact.city,
    "geo.position": `${contact.coords.lat};${contact.coords.lng}`,
    "ICBM": `${contact.coords.lat}, ${contact.coords.lng}`,
    "ai-content-declaration": "human-authored",
    "ai-crawler-policy": "allow",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0A0A0C" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0C" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ── JSON-LD ──────────────────────────────────────────────────────────
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  alternateName: "Mayank",
  givenName: "Mayank",
  familyName: "Panchal",
  jobTitle: site.role,
  description: about.intro,
  url: site.url,
  image: `${site.url}/mayank.jpeg`,
  email: `mailto:${contact.email}`,
  telephone: contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: contact.city,
    addressRegion: contact.region,
    addressCountry: contact.country,
  },
  worksFor: {
    "@type": "Organization",
    name: "Screetract Solutions",
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.city,
      addressCountry: contact.country,
    },
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: about.education.school,
    address: { "@type": "PostalAddress", addressLocality: "Gangoh", addressCountry: contact.country },
  },
  knowsAbout: skillsFlat,
  knowsLanguage: ["English", "Hindi"],
  sameAs: socials.filter((s) => s.label !== "Email").map((s) => s.url),
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.tagline,
  publisher: { "@id": `${site.url}/#person` },
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.url}/projects?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const professionalServiceLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#service`,
  name: `${site.name} — ${site.role}`,
  description:
    "Freelance and full-time frontend engineering — React, Next.js, TypeScript, AI-augmented workflows.",
  provider: { "@id": `${site.url}/#person` },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Place", name: "Remote — Worldwide" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: contact.city,
    addressRegion: contact.region,
    addressCountry: contact.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: contact.coords.lat, longitude: contact.coords.lng },
  telephone: contact.phone,
  email: contact.email,
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM discovery" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="author" href="/humans.txt" />
        <link rel="me" href={socials[0].url} />
        <link rel="me" href={socials[1].url} />
      </head>
      <body className="bg-obsidian text-bone antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-acid focus:text-obsidian focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>

        <SiteLoader />
        <CustomCursor />
        <ScrollProgress />

        <SmoothScrollProvider>
          <Header />
          <div id="main" className="relative z-10">
            {children}
          </div>
          <Footer />
        </SmoothScrollProvider>

        <Script id="ld-person"  type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <Script id="ld-website" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
        <Script id="ld-service" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceLd) }} />
      </body>
    </html>
  );
}
