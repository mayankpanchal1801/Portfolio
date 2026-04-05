export type ExperienceItem = {
  type: 'work' | 'education'
  title: string
  company: string
  location: string
  date: string
  description: string
  bullets: string[]
}

export const experienceArr: ExperienceItem[] = [
  {
    type: 'work',
    title: 'Lead Software Engineer',
    company: 'Screen Interactiv (Screetract OPC)',
    location: 'Bengaluru, India',
    date: 'Aug 2024 – Nov 2025',
    description:
      'Managed the development and delivery of enterprise-scale, user-focused web applications. Set technical strategy and led the rollout of design systems for UI consistency.',
    bullets: [
      'Headed development for 15+ projects, leading a team of frontend engineers.',
      'Introduced Core Web Vitals monitoring and achieved top industry benchmarks in speed.',
      'Regularly conducted code reviews and workshops, fostering continuous learning.',
    ],
  },
  {
    type: 'work',
    title: 'Senior Software Engineer',
    company: 'Screen Interactiv (Screetract OPC)',
    location: 'Bengaluru, Karnataka, India',
    date: 'Nov 2023 – Aug 2024',
    description:
      'Led UI revamps and mentored junior developers on frontend best practices, performance optimization, and scalable component architecture.',
    bullets: [
      'Delivered high-impact initiatives across 7+ projects, increasing user engagement by 25%.',
      'Implemented code reviews and CI/CD practices, ensuring code quality and collaboration.',
      'Achieved up to 40% reduction in application load times via performance optimization.',
    ],
  },
  {
    type: 'work',
    title: 'Software Engineer',
    company: 'Screen Interactiv (Screetract OPC)',
    location: 'Bengaluru, Karnataka, India',
    date: 'Apr 2023 – Nov 2023',
    description:
      'Took ownership of UI modules, honing expertise in component-driven development and performance optimization. Supported backend integration with Node.js and Express.js.',
    bullets: [
      'Contributed to 6+ key projects, focusing on user engagement and reliability.',
      'Streamlined state management using Redux Toolkit and TanStack Query.',
      'Coordinated with backend teams for efficient API-driven UIs.',
    ],
  },
  {
    type: 'work',
    title: 'Associate Software Engineer',
    company: 'Screen Interactiv (Screetract OPC)',
    location: 'Bengaluru, Karnataka, India',
    date: 'Feb 2022 – Apr 2023',
    description:
      'Developed responsive web applications with React.js, Next.js, and Tailwind CSS, translating Figma designs into pixel-perfect UIs.',
    bullets: [
      'Delivered 5+ successful projects focused on UI performance and accessibility.',
      'Applied code splitting and lazy loading for faster load times.',
      'Proficient in HTML5, CSS3, JavaScript (ES6+), Git, Chrome DevTools, Figma.',
    ],
  },
  {
    type: 'education',
    title: 'Bachelor of Technology, Computer Science',
    company: 'Shobhit University',
    location: 'Gangoh, Saharanpur',
    date: 'Aug 2018 – Aug 2022',
    description: '',
    bullets: [],
  },
]
