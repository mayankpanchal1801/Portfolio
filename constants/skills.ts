export type SkillGroup = {
  category: string;
  caption: string;
  items: string[];
};

export const skillsArr: SkillGroup[] = [
  {
    category: "Languages",
    caption: "The core toolbox — day-to-day.",
    items: ["Python", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "SCSS"],
  },
  {
    category: "Backend",
    caption: "Async-first APIs, typed contracts, secure by default.",
    items: [
      "FastAPI",
      "Pydantic",
      "SQLAlchemy",
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "JWT Authentication",
      "Celery",
      "WebSockets",
    ],
  },
  {
    category: "Frontend",
    caption: "Next.js, React, and everything around them.",
    items: [
      "Next.js (App Router)",
      "React.js",
      "Redux",
      "Zustand",
      "Context API",
      "Tailwind CSS",
      "GSAP",
    ],
  },
  {
    category: "Data & Infra",
    caption: "Where the state lives — and how it ships.",
    items: [
      "PostgreSQL",
      "Redis",
      "Docker",
      "Docker Compose",
      "Nginx",
      "AWS EC2",
      "AWS S3",
      "GitHub Actions (CI/CD)",
    ],
  },
  {
    category: "AI Developer Tools",
    caption: "AI-native workflow — used daily, not for demos.",
    items: [
      "Cursor",
      "Claude Code",
      "Devin (formerly Windsurf)",
      "Kiro",
      "Antigravity",
      "GitHub Copilot",
      "ChatGPT",
      "Ollama",
    ],
  },
  {
    category: "Tooling",
    caption: "Everyday keyboard companions.",
    items: ["Git", "GitHub", "Webpack", "Vite", "Postman", "Vercel", "Linux", "Linear"],
  },
  {
    category: "Architecture",
    caption: "How the code is organized.",
    items: [
      "Component-Driven Development",
      "Micro-Frontend",
      "Responsive Design",
      "Performance Optimization",
    ],
  },
  {
    category: "Practices",
    caption: "How the work gets shipped.",
    items: [
      "Agile / Scrum",
      "Code Review",
      "Technical Documentation",
      "Team Mentorship",
      "Cross-functional Collaboration",
    ],
  },
];

/** Flat list for schema.org knowsAbout and llms.txt */
export const skillsFlat: string[] = skillsArr.flatMap((g) => g.items);
