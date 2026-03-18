import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Bot,
  GraduationCap, 
  Mic,
  Network,
  ShieldCheck,
  Wrench, 
  Calendar,
  ChevronDown,
  Building2,
  Cpu
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { EDUCATION, EXPERIENCES, PROFILE_IDENTITY, SKILL_GROUPS } from '../data/career-profile';
import RoadmapBoard from '../components/RoadmapBoard';
import { PORTFOLIO_ACTIVE_ROADMAP } from '../data/roadmap';
import type { Experience } from '../data/career-profile';

const PI_SYSTEM_LANES = [
  {
    title: 'PI Runtime',
    icon: Cpu,
    summary: 'Camada operacional que sustenta health, readiness, orquestração e verificação de ambiente antes da narrativa comercial.',
  },
  {
    title: 'Custom MCP Systems',
    icon: Network,
    summary: 'Servidores de contexto, contratos MCP e separação entre lane de operador e lane public-safe para produto reviewável.',
  },
  {
    title: 'Voice and Client Surfaces',
    icon: Mic,
    summary: 'Speech premium, fallback local e clientes iPhone/macOS conectados ao mesmo runtime como prova de integração real.',
  },
  {
    title: 'Roadmap Delivery',
    icon: Bot,
    summary: 'Atualizações contínuas guiadas por agentes, assets de portfólio e rotina de publicação baseada em evidência do PI.',
  },
] as const;

const ExperienceCard: React.FC<{ exp: Experience }> = ({ exp }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative pl-12 pb-12 group last:pb-0">
      {/* Timeline Line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-white/5 group-last:bottom-12" />
      
      {/* Timeline Icon */}
      <div className="absolute left-0 top-0 h-10 w-10 rounded-xl bg-[#101215] border border-white/10 flex items-center justify-center text-gray-500 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all z-10 shadow-xl">
        <Building2 size={18} />
      </div>

      <motion.div 
        layout
        className={`bg-[#101215]/80 border border-white/5 rounded-[32px] p-8 transition-all cursor-pointer hover:border-white/10 ${isExpanded ? 'ring-1 ring-blue-500/30 shadow-2xl' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">{exp.title}</h3>
            <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mt-2">
              {exp.company} {exp.client && <span className="text-gray-500 italic">@ {exp.client}</span>}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 self-start">
            <Calendar size={12} className="text-gray-500" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{exp.period}</span>
          </div>
        </div>

        <p className="mt-6 text-gray-400 text-sm leading-relaxed max-w-2xl italic">"{exp.summary}"</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {exp.stack.map((s) => (
            <span key={s} className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all ${isExpanded ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' : 'bg-white/5 border-white/5 text-gray-600'}`}>
              {s}
            </span>
          ))}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-8 mt-8 border-t border-white/5 space-y-4">
                {exp.details.map((detail, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <p className="text-gray-300 text-sm leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-center text-gray-600">
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24 selection:bg-blue-500/30">
      
      {/* HEADER */}
      <header className="mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-12"
        >
          <div className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">{PROFILE_IDENTITY.headline}</p>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
              Jader <br /><span className="text-gray-500 italic">Germano</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
              {PROFILE_IDENTITY.summary}
            </p>
            <div className="flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
              <span>{PROFILE_IDENTITY.location}</span>
              <a href={PROFILE_IDENTITY.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href={PROFILE_IDENTITY.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <a href={`mailto:${PROFILE_IDENTITY.email}`} className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all flex items-center gap-3">
              Contato <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </header>

      {/* EDUCATION & SKILLS SECTION */}
      <section className="grid lg:grid-cols-[1fr_1.5fr] gap-12 mb-32">
        <div className="space-y-12">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <GraduationCap className="text-orange-500" size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">Formação</h2>
            </div>
            <div className="space-y-8">
              {EDUCATION.map((edu) => (
                <div key={edu.degree} className="border-l-2 border-white/5 pl-6 py-2 hover:border-orange-500/50 transition-colors">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{edu.period}</p>
                  <h4 className="text-sm font-bold text-white uppercase">{edu.degree}</h4>
                  <p className="text-xs text-gray-400 mt-1">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#101215]/50 border border-white/5 rounded-[40px] p-10 backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-10">
            <Wrench className="text-blue-500" size={24} />
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Domínio Técnico</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {SKILL_GROUPS.map((group) => (
              <div key={group.category}>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-6">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="bg-black/40 border border-white/5 px-3 py-1.5 rounded-lg text-[10px] font-bold text-gray-400 hover:text-white hover:border-white/10 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="mb-32">
        <div className="flex items-center gap-4 mb-16">
          <Cpu className="text-blue-500" size={24} />
          <h2 className="text-3xl font-black uppercase tracking-tight text-white">Experiência Profissional</h2>
        </div>
        
        <div className="space-y-4">
          {EXPERIENCES.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      </section>

      <section className="mb-32">
        <div className="flex items-center gap-4 mb-8">
          <ShieldCheck className="text-orange-500" size={24} />
          <h2 className="text-3xl font-black uppercase tracking-tight text-white">PI + MCP Proof Surface</h2>
        </div>
        <p className="text-gray-400 max-w-3xl leading-relaxed mb-10">
          O ecossistema JPG Labs deixou de ser apenas portfólio estático. Hoje ele mostra uma camada operacional real:
          runtime PI, produto orientado a MCP, pipeline de assets, speech e clientes conectados sobre a mesma base.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {PI_SYSTEM_LANES.map((lane) => (
            <article
              key={lane.title}
              className="rounded-[32px] border border-white/5 bg-[#101215]/70 p-8 backdrop-blur-sm hover:border-blue-500/20 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 mb-6">
                <lane.icon size={24} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">{lane.title}</h3>
              <p className="text-gray-400 leading-relaxed">{lane.summary}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ARCHITECTURAL SOLUTION (FLAGSHIP) */}
      <section className="bg-gradient-to-br from-blue-600 to-orange-600 rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl group-hover:backdrop-blur-2xl transition-all" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-6">Detalhamento da Solução</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-8">
            JPG Labs OS: <br /><span className="italic">PI + MCP Delivery Layer</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-12">
            Conheça como runtime, memória, lanes public-safe, speech e clientes conectados formam uma superfície de produto
            e prova técnica ao mesmo tempo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/legal" className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-2xl">
              Ver Documentação Técnica <ArrowUpRight size={18} />
            </Link>
            <Link to={`${ROUTES.portfolioCanonical}#pi-roadmap`} className="inline-flex items-center gap-4 border border-white/20 bg-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/15 transition-all shadow-2xl">
              Ver Roadmap Ativo <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <div id="pi-roadmap">
        <RoadmapBoard
          items={PORTFOLIO_ACTIVE_ROADMAP}
          eyebrow="Public-safe Execution"
          titlePrefix="PI + MCP"
          titleAccent="Roadmap"
          description="Trilha ativa que conecta PI, MCP, assets comerciais e publicação contínua no portfólio sem expor detalhes privados de operação."
          showFilters={false}
        />
      </div>

    </div>
  );
};

export default Portfolio;
