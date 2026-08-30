import threeDVisualImg from "@/public/projects/3dvisual.png";
import basicsCoImg from "@/public/projects/basics-co.png";
import bizwebifyImg from "@/public/projects/bizwebify.png";
import codesefodImg from "@/public/projects/codesefod.png";
import excelPrecastImg from "@/public/projects/excel-precast.png";
import travelKampanyImg from "@/public/projects/travel-kampany.png";
import vlsid2026Img from "@/public/projects/vlsid-2026.png";
import vlsid2027Img from "@/public/projects/vlsid-2027.png";
import workosImg from "@/public/projects/workos.png";
import type { StaticImageData } from "next/image";

export type ProjectType = "inhouse" | "client";
export type ProjectStatus = "live" | "beta" | "coming-soon";

export type Project = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  category: string;
  type?: ProjectType;
  status?: ProjectStatus;
  year: string;
  role: string;
  client?: string;
  description: string;
  longDescription: string;
  highlights: string[];
  tech: string[];
  tags: string[];
  services?: string[];
  imgSrc?: StaticImageData;
  url?: string;
  githubUrl?: string;
  placeholder?: boolean;
  featured?: boolean;
  color?: string;
  accentColor?: string;
  accentSolid?: string;
};

export const projectsArr: Project[] = [
  {
    id: 1,
    type: "inhouse",
    status: "live",
    slug: "workos",
    title: "Work OS",
    subtitle: "Workspace & Project Management SaaS",
    tag: "In-House App",
    category: "In-House App",
    year: "2025",
    role: "System Architect & Full-Stack Developer",
    client: "In-House SaaS",
    description:
      "Enterprise-grade monorepo workspace engine featuring Next.js 15, React 19, Zustand & PWA on the frontend with a 28-module FastAPI, PostgreSQL 16 & Redis 7 backend.",
    longDescription:
      "Work OS is an end-to-end workspace and project management platform architected as a modular monorepo. The web client (apps/web) is built on Next.js 15, React 19, Zustand, and React Query with offline PWA support, while the high-performance backend (apps/api) runs on FastAPI (Python) across 28 decoupled domain modules backed by PostgreSQL 16 and Redis 7. It powers real-time cross-component communication, strict schema validation, distributed caching, and end-to-end agency workflow orchestration without third-party bloat.",
    tech: [
      "Next.js 15",
      "React 19",
      "FastAPI",
      "Python",
      "PostgreSQL 16",
      "Redis 7",
      "Zustand",
      "React Query",
      "PWA",
      "Tailwind CSS",
    ],
    tags: [
      "Next.js 15",
      "React 19",
      "FastAPI",
      "Python",
      "PostgreSQL 16",
      "Redis 7",
      "Zustand",
      "React Query",
      "PWA",
      "Tailwind CSS",
    ],
    highlights: [
      "Next.js 15 & React 19 frontend with Zustand state & React Query caching",
      "FastAPI backend architecture spanning 28 decoupled domain modules",
      "PostgreSQL 16 relational persistence & Redis 7 distributed cache layer",
      "Monorepo package boundaries with strict cross-component data flow & PWA",
    ],
    services: [
      "System Architecture",
      "UI/UX Design",
      "Full-Stack Development",
      "API Engineering",
      "Domain Modeling",
    ],
    imgSrc: workosImg,
    url: "https://workos.dsgnphy.com/",
    color: "from-sky-500/30 to-sky-950/25",
    accentColor: "text-sky-300",
    accentSolid: "#38bdf8",
    featured: true,
  },
  {
    id: 2,
    type: "client",
    slug: "vlsid-2027",
    title: "VLSID 2027",
    subtitle: "40th International VLSI Design Conference",
    tag: "Conference",
    category: "Conference",
    year: "2026",
    role: "Lead Web Developer",
    client: "VLSI Society of India",
    description:
      "Official digital platform for the 40th International Conference on VLSI Design and the 26th International Conference on Embedded Systems — Bengaluru, January 2027.",
    longDescription:
      "VLSID is India’s flagship VLSI and embedded-systems conference, a sister event of the Design Automation Conference and sponsored by the VLSI Society of India. For the 40th edition (2–6 January 2027, Sheraton Grand Whitefield, Bengaluru) we built the public site around the year’s theme — Artificial Intelligence to Physical Intelligence — covering call for papers, tutorials, SRF/PhD forum, tapeout contest, committee, archives, sponsorship, and registration. The platform has to carry 2,000+ engineers, faculty, industry, and government visitors through a dense programme without feeling like a brochure.",
    tech: ["WordPress", "Custom Theme", "PHP", "Tailwind CSS"],
    tags: ["WordPress", "Custom Theme", "PHP", "Tailwind CSS"],
    highlights: [
      "Conference CMS for papers, tutorials, forums, and registration CTAs",
      "Editorial homepage for the 40th-edition AI → Physical Intelligence theme",
      "Committee, speakers, partners, and archive modules the organisers can update",
      "Enquiry routing for general, sponsorship, TPC, and registration desks",
    ],
    services: ["Web Design", "Web Development", "CMS Integration", "Conference UX"],
    imgSrc: vlsid2027Img,
    url: "https://vlsid.org/",
    color: "from-indigo-500/30 to-indigo-950/25",
    accentColor: "text-indigo-300",
    accentSolid: "#818cf8",
    featured: true,
  },
  {
    id: 3,
    type: "client",
    slug: "travel-kampany",
    title: "Travel Kampany",
    subtitle: "Travel & Tourism",
    tag: "Travel & Tourism",
    category: "Travel & Tourism",
    year: "2024",
    role: "Full-Stack Developer",
    client: "Travel Kampany",
    description:
      "A dynamic travel platform with itinerary builders, destination showcases, and secure payment gateways.",
    longDescription:
      "Travel Kampany set out to make custom trip planning feel as effortless as booking a flight. We architected a dynamic platform around a flexible itinerary builder, destination showcases that double as marketing pages, and a hardened payment flow that supports multiple gateways. The stack is built for speed and scale — destinations and packages are managed entirely from a custom admin.",
    tech: ["Custom PHP", "Node.js", "Tailwind CSS", "API Integrations"],
    tags: ["Custom PHP", "Node.js", "Tailwind CSS", "API Integrations"],
    highlights: [
      "Custom itinerary builder with drag-to-reorder days",
      "Secure multi-gateway payments with retry logic",
      "Destination CMS with SEO-friendly URLs",
      "Sub-second navigation via aggressive caching",
    ],
    services: ["Product Strategy", "UI/UX Design", "Full-Stack Development", "Payment Integration"],
    imgSrc: travelKampanyImg,
    url: "https://travelkampany.in/",
    color: "from-cyan-500/30 to-cyan-900/20",
    accentColor: "text-cyan-300",
    accentSolid: "#22d3ee",
    featured: true,
  },
  {
    id: 4,
    type: "client",
    slug: "excel-precast",
    title: "Excel Precast",
    subtitle: "Construction & Manufacturing",
    tag: "Manufacturing",
    category: "Manufacturing",
    year: "2024",
    role: "Web Developer",
    client: "Excel Precast",
    description:
      "A premium website for Excel Precast highlighting their products, projects, and manufacturing capabilities.",
    longDescription:
      "Excel Precast needed a digital presence that matched the scale and precision of their precast concrete operations. We built a clean, content-first website that lets prospects browse the full product catalogue, explore completed projects by industry, and request quotes without friction. The custom WordPress theme keeps the marketing team fully autonomous — every page, image, and case study is editable in-CMS.",
    tech: ["WordPress", "Custom Theme", "PHP", "Tailwind CSS"],
    tags: ["WordPress", "Custom Theme", "PHP", "Tailwind CSS"],
    highlights: [
      "Custom WordPress theme tailored to product taxonomy",
      "Fully responsive across desktop, tablet, and mobile",
      "CMS-driven product and project galleries",
      "Optimised for organic search and lead capture",
    ],
    services: ["Web Design", "Web Development", "CMS Integration", "SEO Setup"],
    imgSrc: excelPrecastImg,
    url: "https://excelprecast.com/",
    color: "from-amber-500/30 to-amber-900/20",
    accentColor: "text-amber-300",
    accentSolid: "#fbbf24",
    featured: true,
  },
  {
    id: 5,
    type: "client",
    slug: "vlsid-2026",
    title: "VLSID 2026",
    subtitle: "39th International VLSI Design Conference",
    tag: "Conference",
    category: "Conference",
    year: "2025",
    role: "Web Developer",
    client: "VLSI Society of India, Pune",
    description:
      "Last year’s conference site for the 39th VLSI Design and 25th Embedded Systems editions — a dual-venue programme in Pune, January 2026.",
    longDescription:
      "For VLSID 2026 we shipped the official site for Global Synergy in Silicon — VLSI and Embedded AI for next-gen electrified mobility. The programme split across MIT World Peace University (tutorials, 3–4 January) and JW Marriott Pune (main conference, 5–7 January), with 2,000+ attendees, keynotes, partners from Cadence, Intel, Qualcomm, Siemens, AMD, and a full author/forum stack. The build had to present two venues, a dense speaker roster, and sponsor tiers without burying Call for Papers, registration, or travel.",
    tech: ["WordPress", "Custom Theme", "PHP", "Tailwind CSS"],
    tags: ["WordPress", "Custom Theme", "PHP", "Tailwind CSS"],
    highlights: [
      "Dual-venue programme (MIT WPU tutorials + JW Marriott main conference)",
      "Keynote, leader, and partner grids for a 2,000+ attendee edition",
      "Author tracks: papers, tutorials, design contest, tape-out, fellowship",
      "Sponsorship, exhibitor, and registration flows for VSI’s sister-DAC event",
    ],
    services: ["Web Design", "Web Development", "CMS Integration", "Event Platforms"],
    imgSrc: vlsid2026Img,
    url: "https://2026.vlsid.org/",
    color: "from-teal-500/30 to-teal-950/25",
    accentColor: "text-teal-300",
    accentSolid: "#2dd4bf",
    featured: true,
  },
  {
    id: 6,
    type: "client",
    slug: "basics-co",
    title: "Basics Architect.",
    subtitle: "Architecture & Design Studio",
    tag: "Branding & Design",
    category: "Branding & Design",
    year: "2023",
    role: "Frontend & WordPress Developer",
    client: "Basics Co.",
    description:
      "A sleek portfolio website reflecting Basics Co.'s creative approach, work, services, and client testimonials.",
    longDescription:
      "Basics Co. is a branding-led studio with a sharp visual identity, and their site needed to feel like an extension of the work itself. We paired a custom WordPress theme with a Vite-powered front-end so the team gets editorial flexibility without sacrificing performance. Smooth scroll-driven animations and a modern aesthetic carry visitors through the work, services, and testimonials.",
    tech: ["WordPress", "Custom Theme", "Vite", "Tailwind CSS"],
    tags: ["WordPress", "Custom Theme", "Vite", "Tailwind CSS"],
    highlights: [
      "Custom WordPress theme with editorial flexibility",
      "Vite-powered front-end for sub-second load times",
      "Scroll-driven animations and case study modules",
      "Modular block system for fast content updates",
    ],
    services: ["Web Design", "WordPress Theme Development", "Animation", "Performance Tuning"],
    imgSrc: basicsCoImg,
    url: "https://basics.co.in/",
    color: "from-purple-500/30 to-purple-900/20",
    accentColor: "text-purple-300",
    accentSolid: "#c084fc",
    featured: true,
  },
  {
    id: 7,
    type: "client",
    slug: "3dvisual",
    title: "3D Visual Solutions",
    subtitle: "Architectural Visualization & 3D Rendering",
    tag: "3D Visualization",
    category: "3D Visualization",
    year: "2023",
    role: "Web Developer",
    client: "3D Visual Solutions, Bengaluru",
    description:
      "A premium digital platform showcasing photo-realistic architectural visualization, 3D renderings, walkthroughs, and drone mapping.",
    longDescription:
      "3D Visual Solutions is a Bengaluru-based architectural visualization studio delivering photorealistic 3D renders, cinematic walkthroughs, 2D/3D floor plans, and aerial drone mapping for architects, interior designers, and real estate developers. We crafted an immersive, media-rich website featuring smooth interactive video hero presentations, curated portfolio lightbox galleries, and frictionless project inquiry routing.",
    tech: ["WordPress", "Custom Theme", "PHP", "Tailwind CSS", "Vite"],
    tags: ["WordPress", "Custom Theme", "PHP", "Tailwind CSS", "Vite"],
    highlights: [
      "Interactive video-driven hero showcase with ambient typography",
      "Categorized portfolio galleries for exterior, interior, walkthroughs, and drone mapping",
      "Optimized responsive layouts with Lenis smooth scrolling",
      "Direct multi-channel consultation and project inquiry workflows",
    ],
    services: ["Web Design", "Web Development", "Custom WordPress Theme", "Performance Tuning"],
    imgSrc: threeDVisualImg,
    url: "https://3dvisual.in/",
    color: "from-emerald-500/30 to-emerald-950/25",
    accentColor: "text-emerald-300",
    accentSolid: "#34d399",
    featured: true,
  },
  {
    id: 8,
    type: "client",
    slug: "codesefod",
    title: "Codesefod",
    subtitle: "IT Services & Software",
    tag: "IT & Software",
    category: "IT & Software",
    year: "2023",
    role: "Full-Stack Developer",
    client: "Codesefod",
    description:
      "A robust platform for Codesefod's services, case studies, and tech blog — engineered for performance and SEO.",
    longDescription:
      "Codesefod is an IT services company whose own website had to demonstrate the engineering quality they sell. We built a Laravel-powered platform with server-side rendering, a structured case-study system, and a developer-friendly blog. Everything is tuned for Core Web Vitals and SEO, and the entire stack is deployed on AWS for predictable performance under load.",
    tech: ["Custom PHP", "Laravel", "Tailwind CSS", "AWS"],
    tags: ["Custom PHP", "Laravel", "Tailwind CSS", "AWS"],
    highlights: [
      "Laravel back-end with structured content models",
      "Server-side rendering for every page",
      "Indexed case studies and technical blog",
      "AWS deployment tuned for Core Web Vitals",
    ],
    services: ["Platform Architecture", "Full-Stack Development", "SEO Engineering", "AWS Deployment"],
    imgSrc: codesefodImg,
    url: "https://codesefod.com/",
    color: "from-blue-500/30 to-blue-900/20",
    accentColor: "text-blue-300",
    accentSolid: "#60a5fa",
    featured: true,
  },
  {
    id: 9,
    type: "client",
    slug: "bizwebify",
    title: "Bizwebify",
    subtitle: "Digital Marketing & Web Solutions",
    tag: "Digital Marketing",
    category: "Digital Marketing",
    year: "2022",
    role: "WordPress Developer",
    client: "Bizwebify",
    description:
      "A business-focused website showcasing Bizwebify's services, team, and client success — engineered for lead generation.",
    longDescription:
      "Bizwebify is in the business of getting their clients leads, so their own site had to set the example. We built a high-conversion WordPress site with bespoke plugins powering the team, services, and case-study sections. Cloudflare keeps it fast worldwide; the CTA framework keeps it converting. Edit copy, swap heroes, or launch a campaign page — all without touching code.",
    tech: ["WordPress", "Custom Plugins", "Elementor Pro", "Cloudflare"],
    tags: ["WordPress", "Custom Plugins", "Elementor Pro", "Cloudflare"],
    highlights: [
      "High-conversion landing page framework",
      "Custom WordPress plugins for team and case studies",
      "Cloudflare CDN with global edge caching",
      "A/B-ready CTA components",
    ],
    services: ["Web Design", "WordPress Development", "Conversion Optimisation", "Performance & CDN"],
    imgSrc: bizwebifyImg,
    url: "https://bizwebify.com/",
    color: "from-rose-500/30 to-rose-900/20",
    accentColor: "text-rose-300",
    accentSolid: "#fb7185",
    featured: true,
  },
];

/** Shipped work only — placeholders never surface as selected work. */
export const featuredProjects = projectsArr.filter((p) => p.featured && !p.placeholder);

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsArr.find((p) => p.slug === slug);
}

export function getProjectsByType(type?: ProjectType): Project[] {
  if (!type) return projectsArr;
  return projectsArr.filter((p) => (p.type ?? "client") === type);
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const count = projectsArr.length;
  const idx = projectsArr.findIndex((p) => p.slug === slug);
  if (idx === -1 || count < 2) return { prev: null, next: null };
  return {
    prev: projectsArr[(idx - 1 + count) % count],
    next: projectsArr[(idx + 1) % count],
  };
}

export function getClientNames(): string[] {
  const names: string[] = [];
  for (const project of projectsArr) {
    const name = project.title;
    if (name && !names.includes(name)) {
      names.push(name);
    }
  }
  return names;
}
