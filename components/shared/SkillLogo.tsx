import type { IconType } from "react-icons";
import {
  SiAmazonec2,
  SiAmazons3,
  SiCelery,
  SiCss3,
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
  SiOpenai,
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

const iconMap: Record<string, IconType> = {
  Python: SiPython,
  "JavaScript (ES6+)": SiJavascript,
  TypeScript: SiTypescript,
  HTML5: SiHtml5,
  CSS3: SiCss3,
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
  "AWS EC2": SiAmazonec2,
  "AWS S3": SiAmazons3,
  "GitHub Actions (CI/CD)": SiGithubactions,

  "GitHub Copilot": SiGithub,
  ChatGPT: SiOpenai,

  Git: SiGit,
  GitHub: SiGithub,
  Webpack: SiWebpack,
  Vite: SiVite,
  Postman: SiPostman,
  Vercel: SiVercel,
  Linux: SiLinux,
  Linear: SiLinear,
};

type Props = {
  name: string;
  className?: string;
};

/**
 * Renders a monochrome tool logo inside a hairline-bordered square.
 * Falls back to a monogram of the first initial for tools without a
 * dedicated brand icon (e.g. Cursor, Claude Code, Devin, Ollama).
 */
export default function SkillLogo({ name, className }: Props) {
  const Icon = iconMap[name];
  const wrapper =
    "shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-[4px] border border-fog bg-obsidian/60 transition-[color,border-color] duration-300";

  if (Icon) {
    return (
      <span
        aria-hidden
        className={`${wrapper} text-pearl group-hover/item:text-acid group-hover/item:border-acid/60 ${className ?? ""}`}
      >
        <Icon className="w-4 h-4" />
      </span>
    );
  }

  const letter = name.trim().charAt(0).toUpperCase();
  return (
    <span
      aria-hidden
      className={`${wrapper} font-mono text-[0.72rem] italic-wonk text-acid group-hover/item:border-acid/60 ${className ?? ""}`}
    >
      {letter}
    </span>
  );
}
