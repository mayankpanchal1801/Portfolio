export type ExperienceItem = {
  type: "work" | "education";
  title: string;
  company: string;
  location: string;
  date: string;
  dateStart: string; // ISO 8601 (YYYY-MM) — for structured data
  dateEnd?: string;  // omit if present role
  description: string;
  bullets: string[];
  /** Optional stack tags shown as chips beneath the role card. */
  stack?: string[];
};

/**
 * Chronological work history at Screen Interactiv (Screetract OPC),
 * Feb 2022 → Nov 2025 — sourced from LinkedIn profile.
 * Ordered newest-first for editorial timelines.
 */
export const experienceArr: ExperienceItem[] = [
  {
    type: "work",
    title: "Lead Software Engineer",
    company: "Screen Interactiv (Screetract OPC)",
    location: "Bengaluru, India",
    date: "Aug 2024 – Nov 2025",
    dateStart: "2024-08",
    dateEnd: "2025-11",
    description:
      "Owned end-to-end delivery of enterprise-scale, user-focused web applications. Set technical strategy, rolled out a shared design system for UI consistency, and drove team-wide adoption of modern state management, performance techniques, and accessibility + SEO standards across products.",
    bullets: [
      "Headed development for 15+ projects, leading a team of frontend engineers through the full delivery cycle.",
      "Introduced Core Web Vitals monitoring and hit top industry benchmarks for speed on every shipped surface.",
      "Ran regular code reviews and workshops — fostered continuous learning and raised the team's engineering bar.",
      "Set technical strategy, standardized the design system, and enforced a11y + SEO baselines across the portfolio.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "Redux Toolkit", "Zustand", "TanStack Query", "Tailwind CSS", "Docker", "AWS EC2", "GitHub Actions"],
  },
  {
    type: "work",
    title: "Senior Software Engineer",
    company: "Screen Interactiv (Screetract OPC)",
    location: "Bengaluru, Karnataka, India",
    date: "Nov 2023 – Aug 2024",
    dateStart: "2023-11",
    dateEnd: "2024-08",
    description:
      "Led UI revamps and mentored junior developers on frontend best practices, performance optimization, and scalable component architecture. Used TypeScript, Redux Toolkit, and advanced memoization to improve web-app stability and efficiency.",
    bullets: [
      "Delivered high-impact initiatives across 7+ projects, lifting user engagement by ~25%.",
      "Introduced structured code reviews and CI/CD practices, hardening code quality and team collaboration.",
      "Cut application load times by up to ~40% through targeted performance optimization.",
      "Mentored juniors on TypeScript, memoization strategy, and scalable component patterns.",
    ],
    stack: ["React", "Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Redux Toolkit", "TanStack Query", "Docker", "GitHub Actions"],
  },
  {
    type: "work",
    title: "Software Engineer",
    company: "Screen Interactiv (Screetract OPC)",
    location: "Bengaluru, Karnataka, India",
    date: "Apr 2023 – Nov 2023",
    dateStart: "2023-04",
    dateEnd: "2023-11",
    description:
      "Took full ownership of UI modules, honing expertise in component-driven development and frontend performance. Worked in TypeScript, hardened cross-browser compatibility, and supported backend integration with Node.js and Express.js for seamless user experiences.",
    bullets: [
      "Contributed to 6+ key projects with a focus on user engagement and reliability.",
      "Streamlined state management using Redux Toolkit and TanStack Query.",
      "Coordinated with backend teams to build efficient, API-driven UIs.",
      "Improved cross-browser and cross-device consistency across the app portfolio.",
    ],
    stack: ["React", "TypeScript", "Redux Toolkit", "TanStack Query", "Node.js", "Express.js", "REST APIs"],
  },
  {
    type: "work",
    title: "Associate Software Engineer",
    company: "Screen Interactiv (Screetract OPC)",
    location: "Bengaluru, Karnataka, India",
    date: "Feb 2022 – Apr 2023",
    dateStart: "2022-02",
    dateEnd: "2023-04",
    description:
      "Built responsive web applications with React.js, Next.js, and Tailwind CSS — translating Figma designs into pixel-perfect UIs. Shipped reusable components, tuned state management with Redux and Context API, and collaborated across teams on accessibility and SEO.",
    bullets: [
      "Delivered 5+ successful projects focused on UI performance and accessibility.",
      "Applied code splitting and lazy loading to accelerate first paint and interaction.",
      "Translated Figma designs into pixel-perfect production UIs at scale.",
      "Fluent in HTML5, CSS3, JavaScript (ES6+), Git, Chrome DevTools, and Figma.",
    ],
    stack: ["React", "Next.js", "Tailwind CSS", "Redux", "Context API", "Figma"],
  },
  {
    type: "education",
    title: "Bachelor of Technology, Computer Science",
    company: "Shobhit University",
    location: "Gangoh, India",
    date: "Aug 2018 – Aug 2022",
    dateStart: "2018-08",
    dateEnd: "2022-08",
    description:
      "Four-year undergraduate program in Computer Science — data structures, algorithms, systems fundamentals, and software engineering.",
    bullets: [],
  },
];
