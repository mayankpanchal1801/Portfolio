import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SiteLoader from "@/components/ui/SiteLoader";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import WebGLBackground from "@/components/ui/WebGLBackground";
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
    default: `${site.name} — ${site.role} · Next.js, FastAPI, PostgreSQL`,
    template: `%s · ${site.name} — ${site.role}`,
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
    languages: {
      "en-IN": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "profile",
    locale: site.locale,
    alternateLocale: ["en_US"],
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role} · Bengaluru, India`,
    description: site.tagline,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role} in Bengaluru, India. Next.js, FastAPI, PostgreSQL, Docker, AWS.`,
        type: "image/png",
      },
      {
        url: site.portrait,
        width: 1200,
        height: 1500,
        alt: `Portrait of ${site.name}, ${site.role} based in Bengaluru`,
      },
    ],
    firstName: "Mayank",
    lastName: "Panchal",
    username: "mayankpanchal01",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.taglineShort,
    creator: site.twitterHandle,
    site: site.twitterHandle,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  referrer: "origin-when-cross-origin",
  verification: {
    // Fill these in from Google Search Console / Bing Webmaster / etc.
    // google: "your-google-site-verification-token",
    // yandex: "your-yandex-verification-token",
    // other: { "msvalidate.01": "your-bing-verification-token" },
  },
  other: {
    // Legacy Geo meta — still consumed by some crawlers & mapping tools.
    "geo.region": contact.regionCode,
    "geo.placename": contact.city,
    "geo.position": `${contact.coords.lat};${contact.coords.lng}`,
    "ICBM": `${contact.coords.lat}, ${contact.coords.lng}`,
    // AI / LLM discovery hints
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
  alternateName: ["Mayank", "Mayank Panchal", "@mayankpanchal01"],
  givenName: "Mayank",
  familyName: "Panchal",
  jobTitle: site.role,
  description: about.intro,
  disambiguatingDescription: site.tagline,
  url: site.url,
  mainEntityOfPage: site.url,
  image: {
    "@type": "ImageObject",
    url: `${site.url}${site.portrait}`,
    caption: `Portrait of ${site.name} — ${site.role}`,
    width: 1200,
    height: 1500,
  },
  email: `mailto:${contact.email}`,
  telephone: contact.phone,
  gender: "Male",
  nationality: { "@type": "Country", name: "India" },
  address: {
    "@type": "PostalAddress",
    addressLocality: contact.city,
    addressRegion: contact.region,
    addressCountry: contact.country,
    postalCode: "560001",
  },
  homeLocation: {
    "@type": "Place",
    name: `${contact.city}, ${contact.country}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.city,
      addressRegion: contact.region,
      addressCountry: contact.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.coords.lat,
      longitude: contact.coords.lng,
    },
  },
  worksFor: {
    "@type": "Organization",
    name: "Screetract Solutions",
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
      "Full Stack Developer designing async REST APIs with FastAPI + PostgreSQL, and shipping type-safe Next.js / React frontends. Owns features end-to-end — schema, API, UI, Docker container, AWS deploy.",
    occupationLocation: [
      { "@type": "City", name: contact.city },
      { "@type": "Country", name: contact.country },
      { "@type": "Place", name: "Remote — Worldwide" },
    ],
    occupationalCategory: "15-1252 Software Developers",
    skills: skillsFlat.join(", "),
    experienceRequirements: "4+ years shipping production full-stack web applications",
    responsibilities: [
      "Design and ship async REST APIs with FastAPI + Pydantic + SQLAlchemy",
      "Build type-safe Next.js / React frontends with Tailwind CSS and GSAP",
      "Model PostgreSQL schemas and design JWT-secured, role-based APIs",
      "Containerize full-stack apps with Docker; deploy on AWS EC2 behind Nginx via GitHub Actions",
      "Integrate AI-native tooling (Cursor, Claude Code, Devin) into daily development workflow",
    ],
    estimatedSalary: {
      "@type": "MonetaryAmountDistribution",
      name: "annual",
      currency: "INR",
      duration: "P1Y",
    },
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
    alumni: { "@id": `${site.url}/#person` },
  },
  knowsAbout: skillsFlat,
  knowsLanguage: [
    { "@type": "Language", name: "English", alternateName: "en" },
    { "@type": "Language", name: "Hindi", alternateName: "hi" },
  ],
  seeks: {
    "@type": "Demand",
    name: contact.availability,
    availableAtOrFrom: {
      "@type": "Place",
      name: `${contact.city}, ${contact.country} (Remote)`,
    },
  },
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
  copyrightYear: 2026,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.url}/projects?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const professionalServiceLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#service`,
  name: `${site.name} — Full-Stack Engineering Services`,
  description:
    "Full-stack engineering services — Next.js / React on the frontend, Python (FastAPI + Pydantic + SQLAlchemy) on the backend, PostgreSQL data modeling, JWT-secured REST APIs, Docker + Nginx on AWS EC2, GitHub Actions CI/CD, plus AI-augmented delivery using Cursor and Claude Code.",
  slogan: site.taglineShort,
  provider: { "@id": `${site.url}/#person` },
  founder: { "@id": `${site.url}/#person` },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "City", name: "Bengaluru" },
    { "@type": "Place", name: "Remote — Worldwide" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: contact.city,
    addressRegion: contact.region,
    addressCountry: contact.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: contact.coords.lat,
    longitude: contact.coords.lng,
  },
  telephone: contact.phone,
  email: contact.email,
  priceRange: "$$",
  currenciesAccepted: "INR, USD, EUR",
  paymentAccepted: "Bank Transfer, UPI",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "19:00",
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Full-stack web application development",
        description:
          "End-to-end delivery of production web apps — Next.js frontend, FastAPI + PostgreSQL backend, Docker containers on AWS EC2 with GitHub Actions CI/CD.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Backend / API development (FastAPI + PostgreSQL)",
        description:
          "Async REST API design with FastAPI, Pydantic schemas, SQLAlchemy ORM, JWT authentication, Celery background jobs, and Redis caching.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Frontend / UI engineering (Next.js + React + TypeScript)",
        description:
          "Type-safe, performant Next.js (App Router) and React interfaces with Tailwind CSS, GSAP animations, and Core Web Vitals-first performance work.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "AI-augmented engineering & code review",
        description:
          "Human-in-the-loop AI development workflow with Cursor, Claude Code, Devin, Kiro, Antigravity, Copilot, ChatGPT, and Ollama.",
      },
    },
  ],
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
        {/* Suppress the site loader on repeat visits within a session — runs before
            body renders so there's no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("portfolio.loaded")==="1")document.documentElement.setAttribute("data-loaded","1");}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-obsidian text-bone antialiased isolate">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-acid focus:text-obsidian focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>

        <WebGLBackground />
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

        <Script id="ld-person" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <Script id="ld-website" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
        <Script id="ld-service" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceLd) }} />
      </body>
    </html>
  );
}
