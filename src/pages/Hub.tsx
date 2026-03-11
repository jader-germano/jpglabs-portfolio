import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Linkedin, Layers, Globe, ArrowUpRight, Cpu, User, 
  Bot, Zap, Package, ChevronRight, Star, ShoppingCart, 
  Briefcase, Code, ChevronDown, ChevronUp, FileText, Search, Lock, Github,
  Home, Download, Server, ShieldCheck, HandCoins
} from 'lucide-react';
import { Link } from 'react-router-dom';
import RoadmapBoard from '../components/RoadmapBoard';
import { ROUTES } from '../config/routes';
import { useAuth } from '../context/AuthContext';
import { REPOSITORY_LINKS, TECH_REFERENCE_LINKS } from '../data/documentation';
import { PRODUCT_CATALOG } from '../data/products';

const PROJECTS = [
  { 
    id: 'ai-toolkit-v3',
    title: 'AI Architect Toolkit v3.0', 
    category: 'Flagship Product',
    desc: 'Ecossistema completo de orquestração de IA com foco em Java 21 e Protocolo MCP.',
    tags: ['React', 'Docker', 'MCP', 'Java 21']
  },
  { 
    id: 'agent-fleet',
    title: 'Agent Fleet Orchestrator', 
    category: 'AgentOps',
    desc: 'Frota de 12+ agentes especialistas automatizando Vendas, Copy e DevOps.',
    tags: ['LLM Orchestration', 'Prompt Engineering', 'n8n']
  },
  { 
    id: 'cloud-infra',
    title: 'JPGLabs Cloud Infra', 
    category: 'Infrastructure',
    desc: 'Stack resiliente com Traefik, Docker Context e SSL automático via Cloudflare.',
    tags: ['DevOps', 'Ubuntu 24.04', 'Cloudflare']
  },
  { 
    id: 'social-commerce',
    title: 'Social Commerce Engine', 
    category: 'Automation',
    desc: 'Fluxo automatizado de distribuição de conteúdo multi-canal (IG, TikTok, YT).',
    tags: ['n8n', 'Social APIs', 'AI Copywriting']
  }
];

const SERVICES = [
  { title: 'AI Orchestration', icon: Cpu, desc: 'Multi-agent systems and complex n8n workflows.', color: 'text-blue-500' },
  { title: 'Custom LLM Dev', icon: Bot, desc: 'Fine-tuned models and specialized prompt engineering.', color: 'text-purple-500' },
  { title: 'DevOps for AI', icon: Layers, desc: 'K8s cluster management and GPU-optimized infra.', color: 'text-green-500' },
];

const PRODUCTS = PRODUCT_CATALOG;

const DOCUMENTS = [
  {
    id: '1',
    title: 'Agent Ops Blueprint',
    category: 'Automation',
    available: true,
    href: 'https://github.com/jader-germano/jpglabs-ai-assets/blob/main/JPGLabs_Agente_Engenheiro_Software_Claude.pdf',
  },
  {
    id: '2',
    title: 'MCP Protocol Guide',
    category: 'Protocol',
    available: true,
    href: 'https://github.com/jader-germano/jpglabs-ai-assets/blob/main/redesigned/Guia_MCP_Protocol.html',
  },
  {
    id: '3',
    title: 'Docker Orchestration',
    category: 'Infra',
    available: true,
    href: 'https://github.com/jader-germano/jpglabs-ai-assets/blob/main/redesigned/Infraestrutura_DevOps_Moderno.html',
  },
  {
    id: '8',
    title: 'Reactive Node + Java WebFlux Replica',
    category: 'Architecture',
    available: true,
    href: '/docs/reactive-backend-migration.md',
  },
  {
    id: '9',
    title: 'Implementation Journal',
    category: 'Delivery',
    available: true,
    href: '/docs/implementation-journal.md',
  },
  {
    id: '10',
    title: 'Project Publication Log',
    category: 'Delivery',
    available: true,
    href: '/docs/project-publication-log.md',
  },
  {
    id: '11',
    title: 'Latest Release Notes',
    category: 'Delivery',
    available: true,
    href: '/docs/latest-release-notes.md',
  },
  { id: '4', title: 'LGPD Implementation Strategy', category: 'Security', available: false },
  { id: '5', title: 'Network Hardening Guide', category: 'Security', available: false },
  {
    id: '6',
    title: 'Advanced Prompting V2',
    category: 'AI',
    available: true,
    href: 'https://github.com/jader-germano/jpglabs-ai-assets',
  },
  {
    id: '7',
    title: 'Service Monitoring (Traefik)',
    category: 'Infra',
    available: true,
    href: 'https://github.com/jader-germano/jpglabs/blob/main/docs/vps-setup.md',
  },
];

const EXPERIENCE = [
  {
    company: 'TSE (Tribunal Superior Eleitoral)',
    role: 'Senior Software Engineer',
    period: 'Current',
    system: 'Banco de Docentes da EJE & GED',
    tech: ['Java 21', 'Spring Boot 3', 'MyBatis', 'Oracle', 'Angular', 'Clean Architecture', 'LGPD Compliance'],
    solutions: [
      'LGPD logging and audit-flow hardening for sensitive docente data',
      'Role-aware consultation flows between administrativo, pendencias and dados pessoais',
      'Backend/frontend coordination for compliance-safe institutional workflows',
    ],
    repositories: [],
    references: [
      { label: 'Java 21', href: 'https://docs.oracle.com/en/java/javase/21/' },
      { label: 'Spring Boot 3.x', href: 'https://docs.spring.io/spring-boot/index.html' },
      { label: 'Angular 20', href: 'https://angular.dev/' },
      {
        label: 'MyBatis Spring Boot Starter 3.0.5',
        href: 'https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/',
      },
    ],
  },
  {
    company: 'Digisystem',
    role: 'Automation Specialist',
    period: 'Project-based',
    system: 'Activity Reporting Automation',
    tech: ['Jira API', 'Google Apps Script', 'n8n', 'Data Extraction'],
    solutions: [
      'Automated extraction and consolidation of activity data from Jira',
      'Operational handoff through Google Apps Script and structured spreadsheets',
      'Reduction of manual reporting effort through scheduled automation',
    ],
    repositories: [],
    references: [
      { label: 'Jira Cloud REST API', href: 'https://developer.atlassian.com/cloud/jira/platform/rest/v3/' },
      { label: 'Google Apps Script', href: 'https://developers.google.com/apps-script' },
      { label: 'n8n Docs', href: 'https://docs.n8n.io/' },
    ],
  },
  {
    company: 'JPGLabs (Founder)',
    role: 'AI Architect & Lead Dev',
    period: '2024 - Present',
    system: 'AI Orchestration Hub',
    tech: ['React 19', 'Vite 7', 'Tailwind 4', 'Traefik', 'n8n', 'Docker', 'Ollama'],
    solutions: [
      'Protected portfolio/dashboard for proof-of-work and client operations',
      'n8n delivery, lead-hunter, social-sales and monitoring workflows on VPS',
      'Local LLM runtime and open-webui lane for private experimentation',
      'Technical product packaging through PDFs, HTML source assets and guided downloads',
    ],
    repositories: [
      { label: 'JPGLabs Platform Ops', href: 'https://github.com/jader-germano/jpglabs' },
      { label: 'JPGLabs Portfolio', href: 'https://github.com/jader-germano/jpglabs-portfolio' },
      { label: 'JPGLabs AI Assets', href: 'https://github.com/jader-germano/jpglabs-ai-assets' },
    ],
    references: [
      { label: 'React 19', href: 'https://react.dev/' },
      { label: 'Vite 7', href: 'https://vite.dev/guide/' },
      { label: 'Tailwind CSS 4', href: 'https://tailwindcss.com/docs/installation' },
      { label: 'Traefik', href: 'https://doc.traefik.io/traefik/' },
      { label: 'Docker', href: 'https://docs.docker.com/' },
      { label: 'n8n', href: 'https://docs.n8n.io/' },
      { label: 'Ollama', href: 'https://ollama.com/' },
    ],
  }
];

const TECH_STACK = [
  { category: 'Languages', items: ['Java 21', 'TypeScript', 'Python', 'Node.js', 'SQL'] },
  { category: 'Frameworks', items: ['Spring Boot 3', 'Angular', 'React', 'Next.js', 'React Native', 'Expo'] },
  { category: 'Cloud & DevOps', items: ['Docker', 'Kubernetes (k3s)', 'AWS S3', 'Azure', 'Traefik', 'Hostinger VPS'] },
  { category: 'AI & Data', items: ['Ollama', 'Deepseek-R1', 'n8n', 'LangChain', 'PostgreSQL', 'Oracle'] }
];

function Hub() {
  const [activeHubTab, setActiveHubTab] = useState('portfolio');
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [docSearch, setDocSearch] = useState('');
  const { isAuthenticated, isAdmin, isConsultant } = useAuth();

  const loggedAccessItems = [
    {
      label: 'Home',
      href: ROUTES.home,
      icon: Home,
      description: 'Dashboard principal com a visao operacional da VPS.',
      show: isAuthenticated,
    },
    {
      label: 'Downloads',
      href: ROUTES.downloads,
      icon: Download,
      description: 'Produtos, assets e materiais liberados para a conta.',
      show: isAuthenticated,
    },
    {
      label: 'Instances',
      href: ROUTES.dashboardInstances,
      icon: Server,
      description: 'Servicos balanceados, detalhes tecnicos e leitura de instancias.',
      show: isConsultant,
    },
    {
      label: 'Guardian',
      href: ROUTES.guardian,
      icon: ShieldCheck,
      description: 'Seguranca, backups e trilha administrativa da operacao.',
      show: isAdmin,
    },
    {
      label: 'Upsell',
      href: ROUTES.upsell,
      icon: HandCoins,
      description: 'Fluxo administrativo comercial e ofertas internas.',
      show: isAdmin,
    },
  ].filter((item) => item.show);

  const filteredDocs = DOCUMENTS.filter(doc => 
    doc.title.toLowerCase().includes(docSearch.toLowerCase()) ||
    doc.category.toLowerCase().includes(docSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.05),transparent_50%)]" />

      {/* Hub Navigation */}
      <div className="sticky top-16 z-40 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-center gap-8">
          {[
            { id: 'portfolio', label: 'Portfolio', icon: User },
            { id: 'docs', label: 'Docs', icon: FileText },
            { id: 'services', label: 'Services', icon: Globe },
            { id: 'products', label: 'Products', icon: ShoppingCart },
            { id: 'roadmap', label: 'Roadmap', icon: Layers },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveHubTab(tab.id)}
              className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeHubTab === tab.id ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="relative">
        
        {activeHubTab === 'portfolio' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20">
            <section className="px-8 md:px-20 max-w-7xl mx-auto text-left mb-20">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <span className="text-blue-500 font-mono tracking-[0.3em] text-xs uppercase font-black">Founder & AI Architect</span>
                <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none uppercase">JADER <br /><span className="text-gray-700 italic">GERMANO</span></h1>
                <div className="h-1 w-20 bg-blue-600 mt-8" />
                <p className="text-xl text-gray-400 max-w-xl font-light leading-relaxed pt-8">
                  Engenheiro de Software Sênior com foco em orquestração de IA. <br />
                  Construindo o futuro da autonomia técnica na <b>JPGLabs</b>.
                </p>
              </motion.div>
            </section>

            {loggedAccessItems.length ? (
              <section className="px-8 md:px-20 max-w-7xl mx-auto mb-20">
                <div className="rounded-[32px] border border-white/5 bg-[#111214]/60 p-8 backdrop-blur-sm">
                  <div className="max-w-3xl mb-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-500 mb-4">Logged Access</p>
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
                      Workspace <span className="text-blue-500 italic">Entry Points</span>
                    </h2>
                    <p className="text-gray-400 text-base leading-relaxed">
                      Atalhos das funcionalidades liberadas para a sessao autenticada, mantendo o mesmo acesso operacional do dashboard.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
                    {loggedAccessItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="rounded-2xl border border-white/10 bg-black/30 p-5 hover:border-blue-500/30 hover:bg-white/5 transition-all"
                      >
                        <item.icon size={20} className="text-blue-500 mb-4" />
                        <p className="text-sm font-black text-white uppercase tracking-tight">{item.label}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mt-2">Protected Route</p>
                        <p className="text-sm text-gray-400 leading-relaxed mt-3">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {/* Engineering & Experience Section */}
            <section className="px-8 md:px-20 max-w-7xl mx-auto mb-40 grid grid-cols-1 lg:grid-cols-2 gap-16">
               <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                    <Briefcase className="text-blue-500" /> Professional Experience
                  </h3>
                  <div className="space-y-4">
                    {EXPERIENCE.map((exp, i) => (
                      <div key={i} className="rounded-2xl border border-white/5 bg-[#111214]/50 overflow-hidden">
                        <button 
                          onClick={() => setExpandedExp(expandedExp === i ? null : i)}
                          className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                        >
                          <div className="text-left">
                            <h4 className="text-lg font-bold text-white">{exp.company}</h4>
                            <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">{exp.role} • {exp.period}</p>
                          </div>
                          {expandedExp === i ? <ChevronUp size={16} className="text-blue-500" /> : <ChevronDown size={16} className="text-gray-600" />}
                        </button>
                        <AnimatePresence>
                          {expandedExp === i && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }} 
                              animate={{ height: 'auto', opacity: 1 }} 
                              exit={{ height: 0, opacity: 0 }}
                              className="px-6 pb-6 border-t border-white/5"
                            >
                              <div className="pt-4 space-y-4">
                                <div>
                                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Core System</p>
                                  <p className="text-sm text-gray-300">{exp.system}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Technologies</p>
                                  <div className="flex flex-wrap gap-2">
                                    {exp.tech.map(t => (
                                      <span key={t} className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20">{t}</span>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Solutions Delivered</p>
                                  <div className="space-y-2">
                                    {exp.solutions.map((solution) => (
                                      <p key={solution} className="text-sm text-gray-300 flex items-start gap-2">
                                        <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
                                        {solution}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                                {exp.repositories.length ? (
                                  <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Repository Sources</p>
                                    <div className="flex flex-wrap gap-2">
                                      {exp.repositories.map((repository) => (
                                        <a
                                          key={repository.href}
                                          href={repository.href}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.15em] text-white hover:border-blue-500/30 hover:text-blue-300 transition-all"
                                        >
                                          {repository.label}
                                          <ArrowUpRight size={12} />
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                ) : null}
                                <div>
                                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Versioned References</p>
                                  <div className="flex flex-wrap gap-2">
                                    {exp.references.map((reference) => (
                                      <a
                                        key={reference.href}
                                        href={reference.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 border border-white/5 text-[10px] font-black uppercase tracking-[0.15em] text-gray-300 hover:border-blue-500/30 hover:text-white transition-all"
                                      >
                                        {reference.label}
                                        <ArrowUpRight size={12} />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
               </div>

               <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                    <Code className="text-purple-500" /> Engineering Stack
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {TECH_STACK.map((stack) => (
                      <div key={stack.category} className="p-6 rounded-2xl border border-white/5 bg-[#111214]/50">
                        <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">{stack.category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {stack.items.map(item => (
                            <span key={item} className="text-sm text-white font-medium bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-default">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </section>

            <section className="space-y-60 px-8 md:px-20 max-w-7xl mx-auto">
              {PROJECTS.map((project, i) => (
                <motion.div 
                  key={project.title}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center text-left"
                >
                  <div className={i % 2 === 0 ? "order-1" : "order-1 lg:order-2"}>
                    <div className="relative group overflow-hidden rounded-[40px] border border-white/5 bg-white/5 aspect-square md:aspect-video flex items-center justify-center shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <Layers size={100} className="text-gray-900 group-hover:text-blue-600 transition-colors duration-700" />
                    </div>
                  </div>
                  <div className={i % 2 === 0 ? "order-2" : "order-2 lg:order-1"}>
                    <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-6 block font-black">{project.category}</span>
                    <h3 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase">{project.title}</h3>
                    <p className="text-xl text-gray-400 mb-10 font-light leading-relaxed">{project.desc}</p>
                    <div className="flex flex-wrap gap-3 mb-12">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-gray-500 uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                    <Link to={`/case-study/${project.id}`} className="inline-flex items-center gap-3 font-black text-xs text-white group uppercase tracking-[0.2em] border-b border-blue-600 pb-2 transition-all hover:border-white">
                      View Case Study <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </section>
          </motion.div>
        )}

        {activeHubTab === 'docs' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-32 px-6 max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">Technical <span className="text-blue-500 italic">Documentation</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto font-light text-lg">
                Canonical repo entry points, current source materials and version-aware references for the stack used across JPG Labs.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-12">
              <div className="rounded-[32px] border border-white/5 bg-[#111214]/50 p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-5">
                  <Github className="text-blue-500" size={20} />
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Git Documentation Sources</h3>
                </div>
                <div className="space-y-4">
                  {REPOSITORY_LINKS.map((repo) => (
                    <a
                      key={repo.href}
                      href={repo.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl border border-white/5 bg-black/30 p-5 hover:border-blue-500/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-black text-white uppercase tracking-tight">{repo.name}</p>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mt-2">{repo.category}</p>
                          <p className="text-sm text-gray-400 mt-3 leading-relaxed">{repo.summary}</p>
                        </div>
                        <ArrowUpRight size={16} className="text-gray-500 shrink-0" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/5 bg-[#111214]/50 p-8 backdrop-blur-sm">
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-5">Versioned Technology References</h3>
                <div className="flex flex-wrap gap-3">
                  {TECH_REFERENCE_LINKS.map((reference) => (
                    <a
                      key={reference.href}
                      href={reference.href}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-3 rounded-2xl border border-white/10 bg-black/30 text-left hover:border-blue-500/30 transition-all"
                    >
                      <p className="text-sm font-black text-white uppercase tracking-tight">{reference.name}</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mt-2">
                        {reference.version} • {reference.category}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative max-w-md mx-auto mt-8 mb-16">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="SEARCH KNOWLEDGE BASE..." 
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold uppercase tracking-widest text-white focus:border-blue-500 outline-none transition-all shadow-2xl"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredDocs.map((doc) => (
                <div key={doc.id} className="group flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-[#111214]/50 backdrop-blur-sm hover:border-blue-500/30 transition-all">
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${doc.available ? 'bg-blue-600/10 text-blue-500' : 'bg-gray-800 text-gray-600'}`}>
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold uppercase tracking-tight ${doc.available ? 'text-white' : 'text-gray-600 line-through'}`}>{doc.title}</h4>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{doc.category}</span>
                    </div>
                  </div>
                  
                  {doc.available && 'href' in doc ? (
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:text-white transition-all text-gray-500"
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-red-500/50 px-4 py-2 rounded-lg border border-red-500/10 bg-red-500/5">
                      <Lock size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Restricted</span>
                    </div>
                  )}
                </div>
              ))}
              {filteredDocs.length === 0 && (
                <div className="py-20 text-center opacity-20 uppercase font-black text-xl tracking-widest italic">No documents found</div>
              )}
            </div>
          </motion.div>
        )}

        {activeHubTab === 'services' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-32 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">Our <span className="text-blue-500 italic">Services</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto font-light text-xl">Enterprise-grade AI solutions and infrastructure for modern engineering teams.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVICES.map((s, i) => (
                <div key={i} className="p-12 rounded-[40px] border border-white/5 bg-white/[0.02] hover:border-blue-500/30 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                    <s.icon size={120} />
                  </div>
                  <s.icon className={`${s.color} mb-8 group-hover:scale-110 transition-transform`} size={48} />
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">{s.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-light">{s.desc}</p>
                  <div className="mt-10 pt-10 border-t border-white/5">
                     <button className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 flex items-center gap-2 hover:text-white transition-all">
                       Inquire Service <ChevronRight size={14} />
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeHubTab === 'products' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-32 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">Premium <span className="text-blue-500 italic">Products</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto font-light text-xl">Production-ready blueprints and toolkits for AI engineers.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="rounded-[40px] border border-white/5 bg-[#111214]/50 p-10 backdrop-blur-sm flex flex-col group hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                      <Package size={28} />
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight leading-none">{product.name}</h3>
                  <p className="text-gray-500 mb-8 font-light text-sm flex-1">{product.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {product.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black text-gray-400 uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-end gap-2 mb-6">
                      <span className="text-[10px] font-black text-gray-600 uppercase mb-1">Price</span>
                      <span className="text-3xl font-black text-white tracking-tighter">R$ {product.price},00</span>
                    </div>
                    <Link to={`${ROUTES.downloads}/${product.slug}`} className="w-full py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all">
                      View Details <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeHubTab === 'roadmap' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <RoadmapBoard />
          </motion.div>
        )}

        <section className="py-60 px-8 md:px-20 max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-12 shadow-2xl">
            <User size={40} className="text-blue-500" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter uppercase italic">The Architect's Vision</h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed mb-16 max-w-2xl mx-auto">
            Minha missão é clara: construir sistemas que pensam, agem e escalam sozinhos. Na JPGLabs, eu entrego a infraestrutura que permite que empresas foquem no que importa.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a href="https://www.linkedin.com/in/jader-germano/" target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 uppercase text-xs tracking-widest">
              <Linkedin size={20} /> Personal LinkedIn
            </a>
            <Link to={ROUTES.home} className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all uppercase text-xs tracking-widest">
              <Zap size={20} /> Back to Dashboard
            </Link>
          </div>
        </section>

        <footer className="py-20 text-center text-gray-800 font-mono text-[9px] uppercase tracking-[1em] border-t border-white/5">
          &copy; 2026 Jader Germano • All Systems Operational
        </footer>
      </main>
    </div>
  );
}

export default Hub;
