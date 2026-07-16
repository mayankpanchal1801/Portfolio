/**
 * Single source of truth for personal identity, contact, and site copy.
 * Consumed by SEO metadata, JSON-LD structured data, layout, footer,
 * hero, about, contact, and llms.txt generation.
 */

export const site = {
  name: "Mayank Panchal",
  shortName: "Mayank Panchal — Full Stack Developer",
  role: "Full Stack Developer",
  roleDetail: "Python (FastAPI) · Next.js / React.js",
  tagline:
    "Full Stack Developer building production web apps end-to-end — Next.js on the frontend, Python (FastAPI + PostgreSQL) on the backend, containerized with Docker and shipped on AWS.",
  domain: "portfoliobymayank.vercel.app",
  url: "https://portfoliobymayank.vercel.app",
  locale: "en_IN",
  yearFounded: 2022,
  twitterHandle: "@mayankpanchal01",
  ogImage: "/og.png",
  themeColor: "#0A0A0C",
} as const;

export const contact = {
  email: "mayank.careers01@gmail.com",
  phone: "+91 96116 41801",
  phoneHref: "tel:+919611641801",
  city: "Bengaluru",
  region: "Karnataka",
  country: "India",
  countryCode: "IN",
  regionCode: "IN-KA",
  timezone: "Asia/Kolkata",
  coords: {
    lat: 12.9716,
    lng: 77.5946,
  },
  availability:
    "Open to Full-Stack, Backend (FastAPI/Python), and AI-augmented engineering roles",
} as const;

export const socials = [
  {
    label: "LinkedIn",
    handle: "mayankpanchal01",
    url: "https://www.linkedin.com/in/mayankpanchal01",
  },
  {
    label: "GitHub",
    handle: "munkpanchal",
    url: "https://github.com/munkpanchal",
  },
  {
    label: "Email",
    handle: "mayank.careers01@gmail.com",
    url: "mailto:mayank.careers01@gmail.com",
  },
] as const;

export const about = {
  headline:
    "I build production web apps end-to-end — Next.js on top, FastAPI + PostgreSQL underneath.",
  intro:
    "I'm a Full Stack Developer with 4+ years of experience owning features from database schema to deployed UI. Comfortable across Next.js / React.js on the frontend and Python (FastAPI + PostgreSQL + SQLAlchemy) on the backend — with hands-on Docker, CI/CD, and AWS to get things live.",
  workingWith:
    "I work daily with AI-native tooling — Cursor, Claude Code, Devin (formerly Windsurf), Kiro, Antigravity, GitHub Copilot, ChatGPT, and local Ollama models — to accelerate implementation, refactoring, and code review while keeping engineering rigor intact.",
  bio: [
    "Full Stack Developer based in Bengaluru with 4+ years of experience shipping production web applications end-to-end. Comfortable owning a feature all the way through — from PostgreSQL schema, to async FastAPI + Pydantic APIs, to a type-safe Next.js UI, to a Docker container on AWS EC2 behind Nginx.",
    "On the frontend I build with Next.js (App Router), React.js, TypeScript, and Tailwind — with deep experience in state (Redux, Zustand, Context) and performance work (Core Web Vitals up ~30% via lazy loading, code splitting, memoization, bundle work). On the backend I design async REST APIs with FastAPI + Pydantic + SQLAlchemy, secured with JWT and role-based access control, backed by PostgreSQL and Redis, with Celery for background jobs and WebSockets for real-time surfaces.",
    "At Screetract Solutions I've grown from Associate to Lead Software Engineer across 15+ shipped projects — reusable Tailwind + Next.js component libraries that cut feature time ~25%, containerized full-stack apps deployed via GitHub Actions to AWS, and a mentoring role across code reviews and architecture calls.",
    "I lean heavily on AI-augmented workflows — Cursor, Claude Code, Devin (Windsurf), Kiro, Antigravity, Copilot, ChatGPT, Ollama — for implementation, debugging, refactoring, documentation, and code review. AI is a force multiplier, not a substitute for engineering judgement; I verify what it produces and keep humans in the loop.",
    "Outside client work I've solved 350+ DSA problems on LeetCode and HackerRank, and I spend time exploring new AI dev tools as they land.",
  ],
  values: [
    {
      title: "Own it end-to-end",
      body: "Schema → API → UI → container → prod URL. One engineer, one pull request, one deploy.",
    },
    {
      title: "Human-in-the-loop AI",
      body: "AI accelerates the boring parts. I still read the diff, run the tests, and own the outcome.",
    },
    {
      title: "Performance is a feature",
      body: "Core Web Vitals, bundle budgets, async-first APIs, cached queries — shipped features, not afterthoughts.",
    },
    {
      title: "Boring, obvious code",
      body: "Small components. Typed contracts. Pydantic on the way in, SQLAlchemy on the way down. No premature abstractions.",
    },
  ],
  stats: [
    { value: "4+", label: "Years shipping full-stack" },
    { value: "15+", label: "Projects delivered" },
    { value: "350+", label: "DSA problems solved" },
    { value: "99.9%", label: "Production uptime" },
  ],
  education: {
    degree: "Bachelor of Technology, Computer Science",
    school: "Shobhit University",
    location: "Gangoh, India",
    date: "Aug 2018 – Sep 2022",
  },
} as const;

export const seoKeywords = [
  "Mayank Panchal",
  "Full Stack Developer Bengaluru",
  "Python FastAPI Developer",
  "Next.js Developer India",
  "React Developer",
  "TypeScript Developer",
  "PostgreSQL SQLAlchemy",
  "REST API Design",
  "AI-augmented development",
  "Cursor",
  "Claude Code",
  "Devin Windsurf",
  "GitHub Copilot",
  "Docker AWS EC2",
  "GitHub Actions CI/CD",
  "React Portfolio",
  "Next.js Portfolio",
  "Tailwind CSS",
  "GSAP animations",
] as const;
