export interface EducationItem {
  degree: string;
  school: string;
  period: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  client?: string;
  period: string;
  summary: string;
  details: string[];
  stack: string[];
  system?: string;
  repositories?: Array<{ label: string; href: string }>;
  references?: Array<{ label: string; href: string }>;
  isCurrent?: boolean;
}

export const PROFILE_IDENTITY = {
  fullName: "Jader Philipe Germano",
  displayName: "Jader Germano",
  headline: "Engenheiro de Software Sênior • MCP & AI Systems",
  summary:
    "Profissional com 8 anos de experiência em desenvolvimento de ponta a ponta, arquitetura de microsserviços, sistemas escaláveis de alta disponibilidade e liderança técnica, hoje focado em MCPs, sistemas operacionais de IA e superfícies de produto orientadas a contexto.",
  location: "Brasília - DF, Brasil",
  email: "contato@jpglabs.com.br",
  phone: "+55 61 981945408",
  linkedin: "https://www.linkedin.com/in/jader-germano",
  github: "https://github.com/jader-germano",
} as const;

export const EDUCATION: EducationItem[] = [
  {
    degree: "Ciência da Computação",
    school: "Centro Universitário de Brasília — UniCEUB",
    period: "2014 - 2018",
  },
  {
    degree: "Pós-graduação Lato Sensu em Java Development (EAD)",
    school: "Anhanguera",
    period: "Em andamento",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "AI Systems & MCP",
    skills: ["MCP Servers", "Agentic Systems", "OpenAI Apps SDK", "n8n", "Ollama", "Speech APIs"],
  },
  {
    category: "Linguagens",
    skills: ["Java", "JavaScript", "TypeScript"],
  },
  {
    category: "Backend & APIs",
    skills: ["Node.js", "Express", "Spring Boot", "Maven"],
  },
  {
    category: "Frontend",
    skills: ["Angular", "React", "Ember.js"],
  },
  {
    category: "Dados & DevOps",
    skills: ["PostgreSQL", "MySQL", "Oracle", "MongoDB", "Docker", "Kubernetes", "Jenkins", "AWS", "Azure DevOps", "GitLab CI/CD"],
  },
  {
    category: "Qualidade & Métodos",
    skills: ["Git Flow", "Jest", "JUnit", "Karma", "Selenium", "Scrum", "Kanban"],
  },
];

const TECH_REFERENCE_MAP: Record<string, { label: string; href: string }> = {
  Java: { label: "Java", href: "https://docs.oracle.com/en/java/" },
  "Java 17": { label: "Java 17", href: "https://docs.oracle.com/en/java/javase/17/" },
  "Java 11": { label: "Java 11", href: "https://docs.oracle.com/en/java/javase/11/" },
  "Java 8": { label: "Java 8", href: "https://docs.oracle.com/javase/8/docs/" },
  "Java 7": { label: "Java 7", href: "https://www.oracle.com/java/technologies/javase/jdk7-relnotes.html" },
  "Spring Boot": { label: "Spring Boot", href: "https://spring.io/projects/spring-boot" },
  "Spring 3.22": { label: "Spring Framework", href: "https://spring.io/projects/spring-framework" },
  Spring: { label: "Spring Framework", href: "https://spring.io/projects/spring-framework" },
  Angular: { label: "Angular", href: "https://angular.dev/" },
  "Angular 16": { label: "Angular 16", href: "https://v16.angular.io/docs" },
  "Angular 11": { label: "Angular 11", href: "https://v11.angular.io/docs" },
  "Angular 8": { label: "Angular 8", href: "https://v8.angular.io/docs" },
  "Angular 4": { label: "Angular 4", href: "https://v4.angular.io/docs" },
  AngularJS: { label: "AngularJS", href: "https://docs.angularjs.org/api" },
  React: { label: "React", href: "https://react.dev/" },
  "Node.js": { label: "Node.js", href: "https://nodejs.org/en/docs" },
  Express: { label: "Express", href: "https://expressjs.com/" },
  PostgreSQL: { label: "PostgreSQL", href: "https://www.postgresql.org/docs/" },
  MySQL: { label: "MySQL", href: "https://dev.mysql.com/doc/" },
  Oracle: { label: "Oracle Database", href: "https://docs.oracle.com/en/database/" },
  MongoDB: { label: "MongoDB", href: "https://www.mongodb.com/docs/" },
  Docker: { label: "Docker", href: "https://docs.docker.com/" },
  Kubernetes: { label: "Kubernetes", href: "https://kubernetes.io/docs/home/" },
  Jenkins: { label: "Jenkins", href: "https://www.jenkins.io/doc/" },
  AWS: { label: "AWS", href: "https://docs.aws.amazon.com/" },
  "Azure DevOps": { label: "Azure DevOps", href: "https://learn.microsoft.com/azure/devops/" },
  "GitLab CI/CD": { label: "GitLab CI/CD", href: "https://docs.gitlab.com/ee/ci/" },
  Maven: { label: "Apache Maven", href: "https://maven.apache.org/guides/" },
  "SQL Server": { label: "SQL Server", href: "https://learn.microsoft.com/sql/" },
  JUnit: { label: "JUnit", href: "https://junit.org/junit5/docs/current/user-guide/" },
  Jest: { label: "Jest", href: "https://jestjs.io/docs/getting-started" },
  "Ember.js": { label: "Ember.js", href: "https://guides.emberjs.com/" },
};

const referencesForStack = (stack: string[]) =>
  stack
    .map((item) => TECH_REFERENCE_MAP[item])
    .filter((value): value is { label: string; href: string } => Boolean(value))
    .slice(0, 4);

const CAREER_TIMELINE: Experience[] = [
  {
    id: "digisystem",
    title: "Engenheiro de Software Sênior",
    company: "Digisystem",
    client: "TSE",
    period: "Jan 2024 - Atual",
    summary: "Atuação sênior no GED do TSE, combinando sustentação evolutiva, liderança técnica e modernização de UX para um módulo corporativo de RH.",
    details: [
      "Desenvolveu e manteve o sistema GED, módulo corporativo do TSE para gerenciamento de funcionalidades de RH.",
      "Implementou novo padrão de UX alinhado à nova identidade visual dos sistemas do TSE.",
      "Liderou revisão de atividades técnicas, integração e deploy da equipe.",
      "Implementou solução de carga para operação.",
    ],
    stack: ["Java 17", "Spring 3.22", "Angular 16", "PostgreSQL", "GitLab CI/CD"],
    system: "GED do TSE",
    references: referencesForStack(["Java 17", "Spring 3.22", "Angular 16", "GitLab CI/CD"]),
    isCurrent: true,
  },
  {
    id: "revizia",
    title: "Desenvolvedor Full Stack Sênior",
    company: "Revizia",
    period: "Fev 2023 - Jun 2023",
    summary: "Participação no desenvolvimento e manutenção de um sistema fiscal com entregas orientadas a novas funcionalidades e integrações externas.",
    details: [
      "Participou do desenvolvimento e manutenção de sistema fiscal, implementando novas funcionalidades.",
      "Implementou integração com a API do Jira para redirecionamento direto do cliente ao backlog.",
      "Implementou integração com Google Maps para referência de clientes dentro do sistema.",
    ],
    stack: ["Java 11", "Spring", "Angular 11", "PostgreSQL", "AWS"],
    system: "Sistema fiscal",
    references: referencesForStack(["Java 11", "Spring", "Angular 11", "AWS"]),
  },
  {
    id: "cbde-coordinator",
    title: "Coordenador de TI / Desenvolvedor Full-Stack Sênior",
    company: "CBDE",
    period: "Jul 2022 - Nov 2022",
    summary: "Coordenação técnica e desenvolvimento do SIGECOM, com introdução de stack moderna para gestão de eventos desportivos estudantis.",
    details: [
      "Desenvolveu e coordenou a equipe do sistema SIGECOM para gestão de eventos desportivos estudantis.",
      "Introduziu Node.js, Docker e Kubernetes para manutenção e evolução do sistema.",
      "Liderou revisão de atividades técnicas, integração e deploy em ambientes.",
      "Implementou solução de deploy e gestão de serviços da aplicação pelo Kubernetes.",
    ],
    stack: ["Node.js", "TypeScript", "Angular 8", "PostgreSQL", "Docker", "Kubernetes", "GitLab CI/CD"],
    system: "SIGECOM",
    references: referencesForStack(["Node.js", "Angular 8", "Docker", "Kubernetes"]),
  },
  {
    id: "spread",
    title: "Desenvolvedor Full-Stack Pleno",
    company: "Spread",
    period: "Jul 2021 - Jun 2022",
    summary: "Desenvolvimento e sustentação do sistema de autenticação de vigilantes para agências da Caixa.",
    details: [
      "Atuou no desenvolvimento e sustentação do sistema de autenticação para vigilantes das agências da Caixa.",
      "Manteve uma base full-stack orientada a backend Node.js e frontend Ember.js.",
    ],
    stack: ["Node.js", "Express", "Ember.js", "PostgreSQL", "Azure DevOps"],
    system: "Sistema de autenticação para vigilantes da Caixa",
    references: referencesForStack(["Node.js", "Express", "Ember.js", "Azure DevOps"]),
  },
  {
    id: "saipos",
    title: "Desenvolvedor Full-Stack Pleno",
    company: "Saipos",
    period: "Jan 2021 - Abr 2021",
    summary: "Atuação no desenvolvimento e sustentação do ecossistema de sistemas da Saipos em contrato PJ.",
    details: [
      "Atuou no desenvolvimento e sustentação do ecossistema de sistemas da Saipos.",
      "Trabalhou em uma stack com backend Node.js, testes automatizados e frontend Angular 8 e AngularJS.",
    ],
    stack: ["Node.js", "Express", "Jest", "Angular 8", "AngularJS", "PostgreSQL", "Docker"],
    system: "Ecossistema Saipos",
    references: referencesForStack(["Node.js", "Express", "Jest", "Docker"]),
  },
  {
    id: "cbde-flex",
    title: "Desenvolvedor Full-Stack",
    company: "CBDE",
    period: "Dez 2020 - Jul 2022",
    summary: "Contrato autônomo flexível responsável por estruturar o arquétipo Node.js do SIGECOM.",
    details: [
      "Introduziu arquétipo em Node.js para desenvolvimento do SIGECOM.",
      "Estruturou a base responsável pela gestão de eventos desportivos estudantis.",
    ],
    stack: ["Node.js", "TypeScript", "Angular 8", "PostgreSQL", "Docker", "Kubernetes", "GitLab CI/CD"],
    system: "SIGECOM",
    references: referencesForStack(["Node.js", "Angular 8", "Docker", "Kubernetes"]),
  },
  {
    id: "mirante",
    title: "Desenvolvedor Full-Stack Pleno",
    company: "Mirante Tecnologia",
    period: "Set 2019 - Set 2020",
    summary: "Desenvolvimento e sustentação do sistema CBTUR para a Bancorbrás em um time gerenciado com metodologia Agile.",
    details: [
      "Atuou no desenvolvimento e sustentação do sistema CBTUR para o cliente Bancorbrás.",
      "Trabalhou em equipe gerenciada sob metodologia Agile.",
    ],
    stack: ["Java 8", "Spring Boot", "Maven", "JUnit", "SQL Server", "Angular 4", "Angular 8"],
    system: "CBTUR",
    references: referencesForStack(["Java 8", "Spring Boot", "Maven", "JUnit"]),
  },
  {
    id: "stefanini",
    title: "Desenvolvedor Full-Stack Pleno",
    company: "Stefanini Brasil",
    period: "Mai 2019 - Set 2019",
    summary: "Desenvolvimento e sustentação do sistema Atos Pessoal para o TCU.",
    details: [
      "Atuou no desenvolvimento e sustentação do sistema Atos Pessoal (TCU).",
      "Atuou em uma stack Java com JSF, PrimeFaces, AngularJS e Spring Boot.",
    ],
    stack: ["Java 7", "Java 8", "JSF", "PrimeFaces", "Maven", "Oracle", "JUnit", "AngularJS", "Spring Boot"],
    system: "Atos Pessoal (TCU)",
    references: referencesForStack(["Java 8", "Spring Boot", "Maven", "Oracle"]),
  },
  {
    id: "cast-group",
    title: "Desenvolvedor Full-Stack Pleno",
    company: "Cast Group",
    period: "Mai 2018 - Mai 2019",
    summary: "Atuação no projeto ARCO da ANATEL com foco em sustentação, arquitetura, segurança e performance.",
    details: [
      "Atuou no desenvolvimento e sustentação do sistema de arrecadação e cobrança da ANATEL, projeto ARCO.",
      "Propôs soluções arquiteturais, segurança e padrões de projeto.",
      "Implementou solução de auditoria por log de ações por usuários.",
      "Melhorou performance com melhorias de queries, Hibernate e indexação.",
    ],
    stack: ["Java 7", "JUnit", "SQL Server", "AngularJS"],
    system: "ARCO da ANATEL",
    references: referencesForStack(["Java 7", "JUnit", "SQL Server", "AngularJS"]),
  },
  {
    id: "basis",
    title: "Desenvolvedor Full-Stack Júnior",
    company: "Basis Tecnologia",
    period: "Jul 2017 - Mai 2018",
    summary: "Desenvolvimento e sustentação de sistemas Java em posição júnior.",
    details: [
      "Atuou no desenvolvimento e sustentação de sistemas Java.",
      "Trabalhou com Angular 2, PostgreSQL, Docker e Liquibase.",
    ],
    stack: ["Java 8", "Angular", "PostgreSQL", "Docker"],
    system: "Sistemas Java corporativos",
    references: referencesForStack(["Java 8", "Angular", "PostgreSQL", "Docker"]),
  },
  {
    id: "polisys",
    title: "Desenvolvedor Estagiário",
    company: "Polisys",
    period: "Jun 2016 - Jul 2017",
    summary: "Início da trajetória profissional com atuação no projeto ARCO da ANATEL.",
    details: [
      "Atuou no desenvolvimento e sustentação do sistema de arrecadação e cobrança da ANATEL, projeto ARCO.",
      "Consolidou a base inicial em Java, JUnit, SQL Server e AngularJS.",
    ],
    stack: ["Java 7", "JUnit", "SQL Server", "AngularJS"],
    system: "ARCO da ANATEL",
    references: referencesForStack(["Java 7", "JUnit", "SQL Server", "AngularJS"]),
  },
];

export const EXPERIENCES = CAREER_TIMELINE;

export const HUB_EXPERIENCES = CAREER_TIMELINE.slice(0, 6).map((experience) => ({
  company: experience.client ? `${experience.company} · ${experience.client}` : experience.company,
  role: experience.title,
  period: experience.period,
  system: experience.system ?? "Atuação full-stack",
  tech: experience.stack,
  solutions: experience.details,
  repositories: experience.repositories ?? [],
  references: experience.references ?? [],
}));

export const HUB_TECH_STACK = [
  { category: "Linguagens", items: ["Java", "JavaScript", "TypeScript", "SQL"] },
  { category: "Frameworks", items: ["Spring Boot", "Angular", "React", "Ember.js", "Express"] },
  { category: "Cloud & DevOps", items: ["Docker", "Kubernetes", "AWS", "Azure DevOps", "GitLab CI/CD"] },
  { category: "Dados & Qualidade", items: ["PostgreSQL", "MySQL", "Oracle", "MongoDB", "JUnit", "Jest", "Selenium"] },
];

const FORBIDDEN_TOKENS = [
  "previous company",
  "cruzeiro do sul",
  "etec",
  "gobarber",
  "placeholder",
  "lorem ipsum",
];

const KNOWN_COMPANIES = new Set([
  "Digisystem",
  "Revizia",
  "CBDE",
  "Spread",
  "Saipos",
  "Mirante Tecnologia",
  "Stefanini Brasil",
  "Cast Group",
  "Basis Tecnologia",
  "Polisys",
]);

const KNOWN_SCHOOLS = new Set([
  "Centro Universitário de Brasília — UniCEUB",
  "Anhanguera",
]);

function assertCareerProfileIsValid() {
  const blob = JSON.stringify({
    identity: PROFILE_IDENTITY,
    education: EDUCATION,
    skills: SKILL_GROUPS,
    experiences: CAREER_TIMELINE,
  }).toLowerCase();

  for (const token of FORBIDDEN_TOKENS) {
    if (blob.includes(token)) {
      throw new Error(`career-profile contains forbidden token: ${token}`);
    }
  }

  for (const education of EDUCATION) {
    if (!KNOWN_SCHOOLS.has(education.school)) {
      throw new Error(`career-profile contains unsupported school: ${education.school}`);
    }
  }

  for (const experience of CAREER_TIMELINE) {
    if (!KNOWN_COMPANIES.has(experience.company)) {
      throw new Error(`career-profile contains unsupported company: ${experience.company}`);
    }
  }
}

assertCareerProfileIsValid();
