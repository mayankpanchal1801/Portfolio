import genesis from "@/public/projects/genesis.png";
import quadDesign from "@/public/projects/quad.png";
import reena from "@/public/projects/reena.png";
import spotifyImage from "@/public/projects/spotifyByMe.png";
import type { StaticImageData } from 'next/image';

export type Project = {
  slug: string
  title: string
  year: string
  role: string
  category: string
  description: string
  longDescription: string
  highlights: string[]
  tags: string[]
  imgSrc: StaticImageData
  url: string
  githubUrl?: string
}

export const projectsArr: Project[] = [
  {
    slug: "spotify-clone",
    title: "Spotify Clone",
    year: "2023",
    role: "Full Stack Developer",
    category: "React App",
    description:
      "A full-stack web application that replicates the popular music streaming service, Spotify.",
    longDescription:
      "A full-stack web application that replicates the core experience of Spotify — built with React for the frontend and GraphQL for the backend. It delivers a seamless and responsive user experience with real-time music playback, playlist management, and artist discovery. Redux manages global playback and queue state, while SCSS ensures the UI closely mirrors Spotify's visual language.",
    highlights: [
      "Real-time music streaming with smooth playback controls and queue management",
      "GraphQL API with efficient data fetching and client-side caching",
      "Redux-powered global state for playback, playlists, and user library",
      "Responsive SCSS UI closely mirroring Spotify's design language",
      "Deployed on Netlify with automated CI/CD pipeline",
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
    description:
      "Corporate website for an architectural firm based in Bangalore with a custom WordPress theme.",
    longDescription:
      "QUADOMETRY DESIGN is an architectural firm based out of Bangalore. A well-knit structure of experts who have worked in different verticals of the built environment forms the foundation of the brand. This project involved building a fully custom WordPress theme with GSAP-powered scroll animations, a bespoke portfolio showcase, and a Webpack-optimized build pipeline.",
    highlights: [
      "Custom WordPress theme built entirely from scratch in PHP",
      "GSAP-powered scroll animations and cinematic page transitions",
      "Responsive portfolio grid with lightbox for project photography",
      "Webpack build pipeline with SCSS compilation and JS bundling",
      "jQuery-based interactive carousels and smooth UI micro-interactions",
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
    description:
      "Website for a leading multi-disciplinary architectural firm with 27+ years of experience.",
    longDescription:
      "Encompassing over 27+ years of experience, GPPL has a network of over 200 staff and is a leading multi-disciplinary architectural firm based in Hyderabad. This engagement required building a high-performance custom WordPress theme capable of showcasing their vast portfolio of projects across multiple practice areas, with advanced filtering and animation.",
    highlights: [
      "Custom WordPress theme with advanced Custom Post Types for project portfolios",
      "GSAP scroll-triggered reveals for portfolio entries and section transitions",
      "Responsive mega-menu navigation spanning 6 architecture practice areas",
      "Performance-optimized image lazy loading and webpack asset bundling",
      "Contact forms integrated with CRM via custom PHP action hooks",
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
    description:
      "Boutique design studio website for a sustainable hospitality and interiors firm in Bengaluru.",
    longDescription:
      "Reena Bapat Design Studio is a vibrant boutique design studio based in Bengaluru, specializing in crafting bespoke and sustainable hospitality, landscape, interiors, master-planning and residential projects. The website reflects their aesthetic sensibility — minimal, editorial, and refined — with carefully considered typography and whitespace.",
    highlights: [
      "Editorial-style WordPress theme precisely mirroring the studio's design ethos",
      "Custom gallery grid with lightbox for high-resolution project photography",
      "Webpack + SCSS build system with PostCSS for optimized CSS delivery",
      "Mobile-first responsive breakpoints tested across all device sizes",
      "SEO-optimized semantic markup and structured data for local search",
    ],
    tags: ["WordPress", "PHP", "Bootstrap", "SCSS", "Webpack"],
    imgSrc: reena,
    url: "https://reenabapat.studio",
  },
];
