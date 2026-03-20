export interface Experience {
  id: string;
  title: string;
  company: string;
  client?: string;
  period: string;
  summary: string;
  details: string[];
  stack: string[];
  isCurrent?: boolean;
}

export const EDUCATION = [
  {
    degree: 'Bacharelado em Engenharia de Computação',
    school: 'Universidade Cruzeiro do Sul',
    period: '2019 - 2023',
  },
  {
    degree: 'Técnico em Informática',
    school: 'ETEC - Escola Técnica Estadual de São Paulo',
    period: '2014 - 2016',
  },
];

export const SKILL_GROUPS = [
  {
    category: 'Arquitetura & Backend',
    skills: ['Java 17/21', 'Spring Boot 3.x', 'Quarkus', 'Node.js', 'PostgreSQL', 'Redis', 'Docker/K8s'],
  },
  {
    category: 'Frontend & UI/UX',
    skills: ['Angular 17+', 'React 18+', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
  },
  {
    category: 'AI Engineering',
    skills: ['LLM Orchestration', 'Model Context Protocol (MCP)', 'RAG Implementation', 'LangChain', 'Spring AI'],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'digisystem-tse',
    title: 'Staff Fullstack Engineer',
    company: 'Digisystem',
    client: 'TSE (Tribunal Superior Eleitoral)',
    period: 'Set 2020 - Presente',
    summary: 'Liderança técnica na modernização e manutenção de sistemas críticos do TSE via Digisystem.',
    details: [
      'Implementação de microserviços escaláveis com Java 21 e Spring Boot 3.4.',
      'Refatoração de interfaces complexas para Angular 18+, focando em acessibilidade e performance.',
      'Desenvolvimento de logs de auditoria e governança LGPD para sistemas eleitorais.',
      'Mentoria técnica para equipes de desenvolvimento e revisão de arquitetura.',
    ],
    stack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'Docker', 'Kubernetes', 'LGPD'],
    isCurrent: true,
  },
  {
    id: 'jpglabs-freelance',
    title: 'Senior Solutions Architect',
    company: 'JPG Labs',
    period: 'Jan 2024 - Presente',
    summary: 'Consultoria e desenvolvimento de sistemas operacionais de IA e infraestrutura automatizada.',
    details: [
      'Criação do ecossistema Pi para gestão de memória e automação pessoal.',
      'Desenvolvimento de soluções de segurança biométrica (Pi-Guard) integrada a WebAuthn.',
      'Implementação de pipelines de CI/CD automatizados para projetos de alto valor.',
    ],
    stack: ['Next.js', 'TypeScript', 'Ollama', 'Supabase', 'Cloudflare', 'Python'],
    isCurrent: true,
  },
  {
    id: 'software-engineer-prev',
    title: 'Fullstack Developer',
    company: 'Previous Company',
    period: 'Jan 2018 - Ago 2020',
    summary: 'Desenvolvimento de aplicações web e integrações de backend.',
    details: [
      'Manutenção de sistemas ERP em Java e interfaces em React.',
      'Otimização de consultas SQL para redução de latência em relatórios.',
    ],
    stack: ['Java', 'React', 'MySQL', 'AWS'],
  },
];
