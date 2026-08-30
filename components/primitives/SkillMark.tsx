import type { IconType } from "react-icons";
import { BsOpenai } from "react-icons/bs";
import { FaAws } from "react-icons/fa6";
import {
  SiCelery,
  SiCss,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGraphql,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiLinear,
  SiLinux,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPydantic,
  SiPython,
  SiReact,
  SiRedis,
  SiRedux,
  SiSass,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiWebpack,
} from "react-icons/si";

const ICONS: Record<string, IconType> = {
  Python: SiPython,
  "JavaScript (ES6+)": SiJavascript,
  TypeScript: SiTypescript,
  HTML5: SiHtml5,
  CSS3: SiCss,
  SCSS: SiSass,

  FastAPI: SiFastapi,
  Pydantic: SiPydantic,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  GraphQL: SiGraphql,
  "JWT Authentication": SiJsonwebtokens,
  Celery: SiCelery,
  WebSockets: SiSocketdotio,

  "Next.js (App Router)": SiNextdotjs,
  "React.js": SiReact,
  Redux: SiRedux,
  "Tailwind CSS": SiTailwindcss,
  GSAP: SiGreensock,

  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  Docker: SiDocker,
  "Docker Compose": SiDocker,
  Nginx: SiNginx,
  "AWS EC2": FaAws,
  "AWS S3": FaAws,
  "GitHub Actions (CI/CD)": SiGithubactions,

  "GitHub Copilot": SiGithub,
  ChatGPT: BsOpenai,

  Git: SiGit,
  GitHub: SiGithub,
  Webpack: SiWebpack,
  Vite: SiVite,
  Postman: SiPostman,
  Vercel: SiVercel,
  Linux: SiLinux,
  Linear: SiLinear,
};

/**
 * Small monochrome brand mark for a tool. Tools without a brand icon —
 * Cursor, Claude Code, Devin, Ollama, and the practice entries — fall
 * back to a mono initial so every chip keeps the same measure.
 */
export default function SkillMark({ name }: { name: string }) {
  const Icon = ICONS[name];

  if (Icon) {
    return <Icon aria-hidden className="h-3.5 w-3.5 shrink-0 text-ink-3" />;
  }

  return (
    <span
      aria-hidden
      className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center font-mono text-[0.6rem] leading-none text-ink-3"
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}
