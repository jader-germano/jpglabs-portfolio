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
    degree: 'Bacharelado em Ciência da Computação',
    school: 'Centro Universitário de Brasília — UniCEUB',
    period: '2014 - 2018',
  },
];

export const SKILL_GROUPS = [
  {
    category: 'Linguagens',
    skills: ['Java', 'JavaScript', 'TypeScript'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'Spring Boot', 'Maven', 'JPA/Hibernate'],
  },
  {
    category: 'Frontend',
    skills: ['Angular', 'React', 'Ember.js', 'AngularJS', 'JSF/PrimeFaces'],
  },
  {
    category: 'Bancos de Dados',
    skills: ['PostgreSQL', 'MySQL', 'Oracle', 'MongoDB', 'SQL Server'],
  },
  {
    category: 'DevOps & Cloud',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Azure DevOps', 'GitLab CI/CD', 'Git Flow'],
  },
  {
    category: 'Testes',
    skills: ['Jest', 'JUnit', 'Karma', 'Selenium'],
  },
  {
    category: 'AI Engineering (JPG Labs)',
    skills: ['Ollama', 'Claude API', 'Supabase', 'MCP', 'LangChain', 'RAG'],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'digisystem-tse',
    title: 'Engenheiro de Software Sênior',
    company: 'Digisystem',
    client: 'TSE — Tribunal Superior Eleitoral',
    period: 'Jan 2024 — Presente',
    summary: 'Sistema GED (Gestão Eletrônica de Documentos) do TSE — módulo corporativo de RH.',
    details: [
      'Implementou novo padrão de UX seguindo a nova proposta de identidade visual dos sistemas do TSE.',
      'Liderou a equipe técnica com revisão de atividades, integração e deploy.',
      'Implementou solução de carga para operação.',
    ],
    stack: ['Java 17', 'Spring 3.22', 'Angular 16', 'PostgreSQL', 'GitLab CI/CD'],
    isCurrent: true,
  },
  {
    id: 'jpglabs-independent',
    title: 'Engenharia pessoal & consultoria',
    company: 'JPG Labs',
    period: '2024 — Presente',
    summary: 'Projetos paralelos de AI Engineering, automações operacionais e ecossistema próprio.',
    details: [
      'Pi-local-app: runtime operacional de automação pessoal.',
      'openclaude-hub (futuro Axis): chat AI orquestrando múltiplos providers.',
      'Cartesian Motion design system próprio.',
    ],
    stack: ['Node.js', 'TypeScript', 'Ollama', 'Claude API', 'Supabase', 'Cloudflare'],
    isCurrent: true,
  },
  {
    id: 'revizia',
    title: 'Desenvolvedor Full Stack Sênior',
    company: 'Revizia',
    period: 'Fev 2023 — Jun 2023',
    summary: 'Sistema fiscal — novas funcionalidades e integrações.',
    details: [
      'Integração do sistema com a API do Jira para redirecionamento de clientes direto ao backlog.',
      'Integração com Google Maps para referência geográfica de clientes.',
    ],
    stack: ['Java 11', 'Spring', 'Angular 11', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'cbde-coord',
    title: 'Coordenador de TI / Desenvolvedor Full-Stack Sênior',
    company: 'CBDE — Confederação Brasileira do Desporto Escolar',
    period: 'Jul 2022 — Nov 2022',
    summary: 'Sistema SIGECOM — gestão de eventos desportivos estudantis.',
    details: [
      'Introduziu Node.js, Docker e Kubernetes para manutenção dos sistemas.',
      'Liderou a equipe técnica com revisão de atividades, integração e deploy em ambientes.',
      'Implementou solução de deploy via Kubernetes.',
    ],
    stack: ['Node.js', 'TypeScript', 'Angular 8', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitLab CI/CD'],
  },
  {
    id: 'spread-caixa',
    title: 'Desenvolvedor Full-Stack Pleno',
    company: 'Spread',
    client: 'Caixa Econômica Federal',
    period: 'Jul 2021 — Jun 2022',
    summary: 'Sistema de autenticação para vigilantes das agências da Caixa.',
    details: [
      'Desenvolvimento e sustentação do sistema de autenticação.',
    ],
    stack: ['Node.js', 'Express', 'Ember.js', 'PostgreSQL', 'Azure DevOps'],
  },
  {
    id: 'saipos',
    title: 'Desenvolvedor Full-Stack Pleno (CNPJ)',
    company: 'Saipos',
    period: 'Jan 2021 — Abr 2021',
    summary: 'Ecossistema de sistemas da Saipos.',
    details: [
      'Desenvolvimento e sustentação de múltiplos sistemas integrados.',
    ],
    stack: ['Node.js', 'Express', 'Jest', 'Angular 8', 'AngularJS', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'cbde-autonomo',
    title: 'Desenvolvedor Full-Stack (Autônomo)',
    company: 'CBDE — Confederação Brasileira do Desporto Escolar',
    period: 'Dez 2020 — Jul 2022',
    summary: 'Arquétipo Node.js para o sistema SIGECOM — gestão de eventos desportivos estudantis.',
    details: [
      'Introduziu arquétipo em Node.js para o desenvolvimento do SIGECOM.',
    ],
    stack: ['Node.js', 'TypeScript', 'Angular 8', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitLab CI/CD'],
  },
  {
    id: 'mirante-bancorbras',
    title: 'Desenvolvedor Full-Stack Pleno',
    company: 'Mirante Tecnologia',
    client: 'Bancorbrás',
    period: 'Set 2019 — Set 2020',
    summary: 'Sistema CBTUR — equipe gerenciada sob metodologia Agile.',
    details: [
      'Desenvolvimento e sustentação do sistema CBTUR.',
    ],
    stack: ['Java 8', 'Spring Boot', 'Maven', 'JPA/Hibernate', 'JinqJPAStreamProvider', 'JUnit', 'SQL Server', 'Angular 4/8'],
  },
  {
    id: 'stefanini-tcu',
    title: 'Desenvolvedor Full-Stack Pleno',
    company: 'Stefanini Brasil',
    client: 'TCU — Tribunal de Contas da União',
    period: 'Mai 2019 — Set 2019',
    summary: 'Sistema Atos Pessoal do TCU.',
    details: [
      'Desenvolvimento e sustentação do sistema Atos Pessoal.',
    ],
    stack: ['Java 7', 'Java 8', 'JSF', 'PrimeFaces', 'Maven', 'Oracle', 'JUnit', 'AngularJS', 'Spring Boot'],
  },
  {
    id: 'cast-anatel',
    title: 'Desenvolvedor Full-Stack Pleno',
    company: 'Cast Group',
    client: 'ANATEL',
    period: 'Mai 2018 — Mai 2019',
    summary: 'Projeto ARCO — sistema de arrecadação e cobrança da ANATEL.',
    details: [
      'Responsável por propor soluções arquiteturais, segurança e padrões de projeto.',
      'Implementou solução de auditoria por log de ações de usuários.',
      'Melhoria de performance via otimização de queries com Hibernate e indexação.',
    ],
    stack: ['Java 7', 'JUnit', 'SQL Server', 'AngularJS'],
  },
  {
    id: 'basis-tecnologia',
    title: 'Desenvolvedor Full-Stack Júnior',
    company: 'Basis Tecnologia',
    period: 'Jul 2017 — Mai 2018',
    summary: 'Desenvolvimento e sustentação de sistemas Java.',
    details: [
      'Atuou em múltiplos sistemas Java corporativos.',
    ],
    stack: ['Java 8', 'Angular 2', 'PostgreSQL', 'Docker', 'Liquibase'],
  },
  {
    id: 'polisys-anatel',
    title: 'Desenvolvedor Estagiário',
    company: 'Polisys',
    client: 'ANATEL',
    period: 'Jun 2016 — Jul 2017',
    summary: 'Projeto ARCO — sistema de arrecadação e cobrança da ANATEL.',
    details: [
      'Primeira atuação no projeto ARCO, que continuaria no Cast Group.',
    ],
    stack: ['Java 7', 'JUnit', 'SQL Server', 'AngularJS'],
  },
];
