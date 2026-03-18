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
    summary: 'Canonical VPS, Cloudflare, mailserver and operational workflow lane for JPGLabs.',
    href: 'https://github.com/jader-germano/jpglabs',
  },
  {
    id: 'repo-portfolio',
    name: 'JPGLabs Portfolio',
    category: 'Application',
    summary: 'Portfolio-first public surface with protected docs, downloads, dashboard and Pi handoff routes.',
    href: 'https://github.com/jader-germano/jpglabs-portfolio',
  },
  {
    id: 'repo-pi-service',
    name: 'Pi Service Guardrails',
    category: 'Operations',
    summary: 'Immutable constitution, service registry, and PI_MEMORY-backed runtime boundary for Pi clients.',
    href: 'https://jpglabs.com.br/pi',
  },
  {
    id: 'repo-release-docs',
    name: 'Portfolio Release Docs',
    category: 'Documentation',
    summary: 'Release notes, publication log and implementation history aligned to the current roadmap and access boundary.',
    href: '/docs',
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
  {
    id: 'lgpd',
    name: 'LGPD',
    version: '2018',
    category: 'Compliance',
    href: 'https://www.gov.br/cidadania/pt-br/acoes-e-programas/lgpd',
  },
];
