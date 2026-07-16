import genesis from "@/public/projects/genesis.png";
import quadDesign from "@/public/projects/quad.png";
import reena from "@/public/projects/reena.png";
import spotifyImage from "@/public/projects/spotifyByMe.png";
import type { StaticImageData } from "next/image";

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  category: "AI / LLM" | "Full Stack" | "React App" | "WordPress" | "Platform";
  description: string;
  longDescription: string;
  highlights: string[];
  tags: string[];
  imgSrc?: StaticImageData;
  url?: string;
  githubUrl?: string;
  /** True while the entry is a scaffolded placeholder (user to fill in later). */
  placeholder?: boolean;
  /** Optional client / location line (used in project cards). */
  client?: string;
  featured?: boolean;
};

export const projectsArr: Project[] = [
  //
  // ─── FLAGSHIP FULL-STACK ─────────────────────────────────────────────
  //
  {
    slug: "taskflow",
    title: "TaskFlow — Full-Stack Project & Task Management Platform",
    year: "2025",
    role: "Full Stack Developer",
    category: "Full Stack",
    client: "Personal",
    description:
      "Full-stack task management platform — Next.js (App Router) frontend, async FastAPI backend, PostgreSQL storage, WebSockets for real-time updates.",
    longDescription:
      "TaskFlow is a full-stack project & task management platform built end-to-end: a Next.js (App Router) frontend backed by an async FastAPI service, PostgreSQL for persistence, Redis + Celery for background work, and Docker + Nginx on AWS EC2 for deployment. It ships real-time task updates via WebSockets, JWT auth with role-based permissions, and Pydantic-validated REST APIs on SQLAlchemy models — the same architectural pattern I use across production Screetract work.",
    highlights: [
      "Next.js (App Router) frontend paired with an async FastAPI backend — one repo, one deploy, one engineer.",
      "PostgreSQL data models with SQLAlchemy ORM and Pydantic schemas for typed, validated REST endpoints.",
      "JWT authentication with role-based access control — same pattern hardened in production Screetract apps.",
      "Real-time task updates via WebSockets; background jobs (notifications, digests) handled by Celery + Redis.",
      "Dockerized full-stack (frontend + backend + Postgres + Redis) with docker-compose; deployed on AWS EC2 behind Nginx via GitHub Actions.",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "SQLAlchemy",
      "Redis",
      "Celery",
      "WebSockets",
      "Docker",
      "AWS EC2",
    ],
    featured: true,
  },

  //
  // ─── AI / LLM PROJECTS (placeholders — fill in details) ───────────────
  //
  {
    slug: "ai-project-1",
    title: "[AI Project 1 — Add title]",
    year: "2025",
    role: "Full Stack + LLM Engineer",
    category: "AI / LLM",
    client: "Personal / Client",
    description:
      "[One-line pitch — e.g. Retrieval-augmented chatbot that answers questions over your private documents.]",
    longDescription:
      "[Long-form description. What problem does it solve? Which LLM (Claude / GPT-4 / local Ollama)? Retrieval strategy? Eval harness? Add ~3–5 sentences.]",
    highlights: [
      "[Highlight 1 — e.g. Streamed responses with SSE and citations to source chunks]",
      "[Highlight 2 — e.g. Hybrid retrieval combining BM25 + vector embeddings via pgvector]",
      "[Highlight 3 — e.g. Per-query eval harness with LLM-as-judge scoring]",
      "[Highlight 4 — e.g. <100ms TTFB on cached queries via Redis + edge cache]",
      "[Highlight 5 — e.g. Dockerized FastAPI + Next.js, deployed to AWS EC2 behind Nginx]",
    ],
    tags: ["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "pgvector", "LLM", "RAG"],
    placeholder: true,
    featured: true,
  },
  {
    slug: "ai-project-2",
    title: "[AI Project 2 — Add title]",
    year: "2025",
    role: "AI Engineer",
    category: "AI / LLM",
    client: "Personal",
    description:
      "[One-line pitch — e.g. Agentic developer assistant that reads a repo and drafts pull requests.]",
    longDescription:
      "[Long-form description. Tool-use loop? Which framework (Claude Agent SDK, custom)? How did you handle rate limits and cost? Guardrails?]",
    highlights: [
      "[Highlight 1 — e.g. Multi-step tool use with plan/act/verify loop]",
      "[Highlight 2 — e.g. Sandboxed execution in ephemeral Docker containers]",
      "[Highlight 3 — e.g. Token budget enforcement + graceful degradation]",
      "[Highlight 4 — e.g. Prompt caching cut cost by ~70%]",
      "[Highlight 5 — e.g. Structured tool outputs validated with Pydantic schemas]",
    ],
    tags: ["Python", "FastAPI", "Claude API", "Agents", "Docker"],
    placeholder: true,
    featured: true,
  },
  {
    slug: "ai-project-3",
    title: "[AI Project 3 — Add title]",
    year: "2025",
    role: "Full Stack Developer",
    category: "AI / LLM",
    client: "Personal",
    description:
      "[One-line pitch — e.g. Local-first LLM playground running on Ollama with a Next.js UI.]",
    longDescription:
      "[Long-form description. Why local-first? Which models (Llama 3, Mistral, Qwen)? What UX affordances (streaming, tool use, chat history)?]",
    highlights: [
      "[Highlight 1 — e.g. Streaming responses via Ollama's HTTP API]",
      "[Highlight 2 — e.g. Model switching between Llama 3, Mistral, Qwen at runtime]",
      "[Highlight 3 — e.g. Chat history stored in IndexedDB for local-first UX]",
      "[Highlight 4 — e.g. Markdown + code fenced rendering with copy-to-clipboard]",
    ],
    tags: ["Next.js", "TypeScript", "Ollama", "Tailwind CSS"],
    placeholder: true,
  },

  //
  // ─── SHIPPED PRODUCTION PROJECTS ─────────────────────────────────────
  //
  {
    slug: "vlsid-conference-portal",
    title: "VLSID Conference Registration Portal",
    year: "2024",
    role: "Full Stack Developer",
    category: "Full Stack",
    client: "VLSID, Pune",
    description:
      "Scalable registration and payment platform for a national conference, serving 1,000+ attendees with zero downtime.",
    longDescription:
      "A production registration and payment platform built for VLSID's annual conference in Pune. React on the frontend, Node.js REST APIs on the backend, and a hardened payment validation layer. Withstood peak-day registration traffic without a single incident.",
    highlights: [
      "Handled 1,000+ attendees across registration, payment, and check-in flows with zero downtime during the conference.",
      "Optimized backend workflows and payment validation for reliable performance under peak load.",
      "Role-based dashboards for organizers, delegates, and sponsors — each with tailored data access.",
      "Automated confirmation emails and PDF badge generation on successful payment.",
      "Deployed on Nginx behind Docker with GitHub Actions CI/CD.",
    ],
    tags: ["React.js", "Node.js", "Express.js", "REST APIs", "Docker", "Nginx"],
    featured: true,
  },
  {
    slug: "cometlit-literacy-platform",
    title: "CometLit — Literacy Learning Platform",
    year: "2023",
    role: "Frontend Developer",
    category: "React App",
    client: "CometLit",
    description:
      "Responsive learning platform with vocabulary, reading, writing, quizzes, and progress tracking modules.",
    longDescription:
      "A responsive literacy platform built with React, structured around modular learning units — vocabulary, reading, writing, quizzes, and progress tracking. Built as a reusable component system with local state and clean, mobile-first UI. Deployed on Netlify.",
    highlights: [
      "Modular learning units — vocabulary, reading, writing, quizzes — each as a reusable React component.",
      "Local state management for lesson progress and quiz scoring.",
      "Mobile-first responsive design tested across breakpoints.",
      "Deployed on Netlify with automated preview deploys per branch.",
    ],
    tags: ["React.js", "JavaScript", "CSS3", "Netlify"],
  },
  {
    slug: "spotify-clone",
    title: "Spotify Clone",
    year: "2023",
    role: "Full Stack Developer",
    category: "React App",
    client: "Personal",
    description:
      "Full-stack music streaming clone built with React, GraphQL, and Redux — real-time playback, playlists, and artist discovery.",
    longDescription:
      "A full-stack clone that replicates Spotify's core experience — React on the frontend, GraphQL on the backend. Real-time playback, playlist management, artist discovery. Redux drives global playback and queue state; SCSS mirrors Spotify's visual language closely.",
    highlights: [
      "Real-time music streaming with smooth playback controls and queue management.",
      "GraphQL API with efficient data fetching and client-side caching.",
      "Redux-powered global state for playback, playlists, and user library.",
      "Responsive SCSS UI closely mirroring Spotify's design language.",
      "Deployed on Netlify with automated CI/CD pipeline.",
    ],
    tags: ["React.js", "Redux", "GraphQL", "SCSS"],
    imgSrc: spotifyImage,
    url: "https://spotifybymayank.netlify.app",
    githubUrl: "https://github.com/munkpanchal",
  },
  {
    slug: "quadometry-designs",
    title: "Quadometry Designs",
    year: "2022",
    role: "WordPress Developer",
    category: "WordPress",
    client: "Quadometry Designs, Bengaluru",
    description:
      "Corporate website for an architectural firm — fully custom WordPress theme with cinematic GSAP scroll animations.",
    longDescription:
      "QUADOMETRY DESIGN is a Bengaluru-based architectural firm. This engagement was a fully custom WordPress theme built from scratch in PHP, with GSAP-powered scroll animations, a bespoke portfolio showcase, and a Webpack-optimized build pipeline.",
    highlights: [
      "Custom WordPress theme built entirely from scratch in PHP.",
      "GSAP-powered scroll animations and cinematic page transitions.",
      "Responsive portfolio grid with lightbox for project photography.",
      "Webpack build pipeline with SCSS compilation and JS bundling.",
      "jQuery-based interactive carousels and smooth UI micro-interactions.",
    ],
    tags: ["WordPress", "PHP", "Bootstrap", "SCSS", "GSAP", "Webpack"],
    imgSrc: quadDesign,
    url: "https://quadometrydesigns.com",
  },
  {
    slug: "genesis-planners",
    title: "Genesis Planners",
    year: "2022",
    role: "WordPress Developer",
    category: "WordPress",
    client: "GPPL, Hyderabad",
    description:
      "Website for a multi-disciplinary architectural firm with 27+ years of experience — 200+ staff, six practice areas.",
    longDescription:
      "GPPL is a leading multi-disciplinary architectural firm based in Hyderabad. A high-performance custom WordPress theme was required to showcase a vast portfolio across multiple practice areas, with advanced filtering, custom post types, and animation.",
    highlights: [
      "Custom WordPress theme with advanced Custom Post Types for project portfolios.",
      "GSAP scroll-triggered reveals for portfolio entries and section transitions.",
      "Responsive mega-menu navigation spanning 6 architecture practice areas.",
      "Performance-optimized image lazy loading and Webpack asset bundling.",
      "Contact forms integrated with CRM via custom PHP action hooks.",
    ],
    tags: ["WordPress", "PHP", "Bootstrap", "SCSS", "GSAP", "Webpack"],
    imgSrc: genesis,
    url: "https://genesisplanners.in",
  },
  {
    slug: "reena-bapat-studio",
    title: "Reena Bapat Design Studio",
    year: "2023",
    role: "WordPress Developer",
    category: "WordPress",
    client: "Reena Bapat Studio, Bengaluru",
    description:
      "Boutique design studio website — editorial WordPress theme for a sustainable hospitality and interiors firm.",
    longDescription:
      "Reena Bapat Design Studio is a Bengaluru-based boutique studio specializing in bespoke, sustainable hospitality, landscape, interiors, master-planning, and residential projects. The site reflects their aesthetic — minimal, editorial, refined — with carefully considered typography and whitespace.",
    highlights: [
      "Editorial-style WordPress theme precisely mirroring the studio's design ethos.",
      "Custom gallery grid with lightbox for high-resolution project photography.",
      "Webpack + SCSS build system with PostCSS for optimized CSS delivery.",
      "Mobile-first responsive breakpoints tested across all device sizes.",
      "SEO-optimized semantic markup and structured data for local search.",
    ],
    tags: ["WordPress", "PHP", "Bootstrap", "SCSS", "Webpack"],
    imgSrc: reena,
    url: "https://reenabapat.studio",
  },
];

export const featuredProjects = projectsArr.filter((p) => p.featured);
