export interface RepositoryLink {
  id: string;
  name: string;
  category: string;
  summary: string;
  href: string;
}

export interface TechReferenceLink {
  id: string;
  name: string;
  version: string;
  category: string;
  href: string;
}

export const REPOSITORY_LINKS: RepositoryLink[] = [
  {
    id: 'repo-platform',
    name: 'JPGLabs Platform Ops',
    category: 'Infrastructure',
    summary: 'VPS, Cloudflare, mailserver and canonical n8n workflow operations.',
    href: 'https://github.com/jader-germano/jpglabs',
  },
  {
    id: 'repo-portfolio',
    name: 'JPGLabs Portfolio',
    category: 'Application',
    summary: 'Public and protected portfolio/dashboard application.',
    href: 'https://github.com/jader-germano/jpglabs-portfolio',
  },
  {
    id: 'repo-assets',
    name: 'JPGLabs AI Assets',
    category: 'Products',
    summary: 'PDFs, HTML sources, launch plans and agent bundles.',
    href: 'https://github.com/jader-germano/jpglabs-ai-assets',
  },
  {
    id: 'repo-legacy-portfolio',
    name: 'Legacy Portfolio V2',
    category: 'Archive',
    summary: 'Older portfolio iteration kept as a reference source.',
    href: 'https://github.com/jader-germano/portfolio-v2',
  },
];

export const TECH_REFERENCE_LINKS: TechReferenceLink[] = [
  {
    id: 'java-21',
    name: 'Java',
    version: '21',
    category: 'Language',
    href: 'https://docs.oracle.com/en/java/javase/21/',
  },
  {
    id: 'spring-boot-3',
    name: 'Spring Boot',
    version: '3.x',
    category: 'Framework',
    href: 'https://docs.spring.io/spring-boot/index.html',
  },
  {
    id: 'angular-20',
    name: 'Angular',
    version: '20',
    category: 'Framework',
    href: 'https://angular.dev/',
  },
  {
    id: 'react-19',
    name: 'React',
    version: '19',
    category: 'Framework',
    href: 'https://react.dev/',
  },
  {
    id: 'vite-7',
    name: 'Vite',
    version: '7',
    category: 'Build Tool',
    href: 'https://vite.dev/guide/',
  },
  {
    id: 'tailwind-4',
    name: 'Tailwind CSS',
    version: '4',
    category: 'Styling',
    href: 'https://tailwindcss.com/docs/installation',
  },
  {
    id: 'n8n',
    name: 'n8n',
    version: 'Current',
    category: 'Automation',
    href: 'https://docs.n8n.io/',
  },
  {
    id: 'docker',
    name: 'Docker',
    version: 'Current',
    category: 'Infrastructure',
    href: 'https://docs.docker.com/',
  },
  {
    id: 'traefik',
    name: 'Traefik',
    version: 'Current',
    category: 'Edge',
    href: 'https://doc.traefik.io/traefik/',
  },
  {
    id: 'cloudflare-dns',
    name: 'Cloudflare DNS',
    version: 'Current',
    category: 'Network',
    href: 'https://developers.cloudflare.com/dns/',
  },
];
