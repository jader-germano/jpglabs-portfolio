import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Server,
  Cloud,
  Brain,
  Database,
} from 'lucide-react';

import { supabase } from '../lib/supabase';
import type { PortfolioProject, PortfolioSkill } from '../types';

// ── Constants ─────────────────────────────────────────────────────────────────

const STACK_TAGS = ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'AI Agents', 'Kubernetes'];

const CATEGORY_META: Record<string, { icon: React.ComponentType<{ size?: number; className?: string }>; color: string }> = {
  Backend:  { icon: Server,   color: 'text-blue-400'   },
  Frontend: { icon: Code2,    color: 'text-violet-400' },
  DevOps:   { icon: Cloud,    color: 'text-cyan-400'   },
  AI:       { icon: Brain,    color: 'text-orange-400' },
  Database: { icon: Database, color: 'text-emerald-400' },
};

const CATEGORY_ORDER = ['Backend', 'Frontend', 'DevOps', 'AI', 'Database'];

// ── Helpers ───────────────────────────────────────────────────────────────────

function groupSkillsByCategory(skills: PortfolioSkill[]): Record<string, PortfolioSkill[]> {
  return skills.reduce<Record<string, PortfolioSkill[]>>((acc, skill) => {
    const cat = skill.category ?? 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});
}

// ── Skeleton components ───────────────────────────────────────────────────────

function ProjectSkeleton() {
  return (
    <div className="bg-[#101215] border border-white/5 rounded-[40px] p-10 animate-pulse space-y-4">
      <div className="h-3 w-24 bg-white/10 rounded-full" />
      <div className="h-6 w-3/4 bg-white/10 rounded-full" />
      <div className="h-4 w-full bg-white/5 rounded-full" />
      <div className="h-4 w-5/6 bg-white/5 rounded-full" />
      <div className="flex gap-2 pt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-5 w-16 bg-white/5 rounded-full" />
        ))}
      </div>
    </div>
  );
}

function SkillsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-[#101215] border border-white/5 rounded-[32px] p-8 space-y-4">
          <div className="h-4 w-32 bg-white/10 rounded-full" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="h-7 w-20 bg-white/5 rounded-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

const PublicHome: React.FC = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [skills, setSkills] = useState<PortfolioSkill[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingSkills, setLoadingSkills] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await supabase
          .from('portfolio_projects')
          .select('*')
          .eq('status', 'active')
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(4);
        setProjects(data ?? []);
      } finally {
        setLoadingProjects(false);
      }
    };

    const fetchSkills = async () => {
      try {
        const { data } = await supabase
          .from('portfolio_skills')
          .select('*')
          .order('category', { ascending: true });
        setSkills(data ?? []);
      } finally {
        setLoadingSkills(false);
      }
    };

    fetchProjects();
    fetchSkills();
  }, []);

  const grouped = groupSkillsByCategory(skills);
  const orderedCategories = [
    ...CATEGORY_ORDER.filter((c) => grouped[c]),
    ...Object.keys(grouped).filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  return (
    <div className="min-h-screen bg-[#08090a] text-gray-100 selection:bg-blue-500/30 overflow-y-auto">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center relative px-6 md:px-24 py-24">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[30%] w-[700px] h-[700px] rounded-full bg-blue-500/5 blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
              jpglabs.com.br · 2026
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              Jader Philipe<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500 italic">
                Software Engineer
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
              Senior engineer specializing in scalable backend systems, agentic AI architectures,
              and cloud-native infrastructure. Building products that run at scale.
            </p>

            {/* Stack tags */}
            <div className="flex flex-wrap gap-3 pt-2">
              {STACK_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all"
              >
                Ver Projetos
              </a>
              <a
                href="mailto:jader.gp15@gmail.com"
                className="border border-white/10 bg-white/5 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
              >
                Entrar em Contato
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-700 animate-bounce">
          <span className="text-[8px] font-black uppercase tracking-[0.5em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-700 to-transparent" />
        </div>
      </section>

      {/* ── FEATURED PROJECTS ─────────────────────────────────────────────────── */}
      <section id="projects" className="py-32 px-6 md:px-24 bg-black/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4">
              Work & Open Source
            </p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Featured <br />
              <span className="text-gray-500 italic">Projects</span>
            </h2>
          </div>

          {loadingProjects ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProjectSkeleton />
              <ProjectSkeleton />
            </div>
          ) : projects.length === 0 ? (
            <p className="text-gray-600 text-sm italic">Nenhum projeto featured disponível no momento.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#101215] border border-white/5 rounded-[40px] p-10 flex flex-col gap-6 group hover:border-blue-500/20 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-green-500">
                        {project.status === 'active' ? '● Active' : project.status}
                      </span>
                      <h3 className="text-2xl font-black uppercase tracking-tight">{project.title}</h3>
                    </div>
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                          aria-label="GitHub"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                          aria-label="Live site"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed flex-1">{project.description}</p>

                  {project.tech_stack?.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                      {project.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────────────────── */}
      <section id="skills" className="py-32 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4">
              Expertise & Toolchain
            </p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Skills &<br />
              <span className="text-gray-500 italic">Technologies</span>
            </h2>
          </div>

          {loadingSkills ? (
            <SkillsSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orderedCategories.map((category, idx) => {
                const meta = CATEGORY_META[category];
                const Icon = meta?.icon;
                const colorClass = meta?.color ?? 'text-gray-400';

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-[#101215] border border-white/5 rounded-[32px] p-8 hover:border-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      {Icon && <Icon size={18} className={colorClass} />}
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${colorClass}`}>
                        {category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {grouped[category].map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-xs font-semibold text-gray-300 hover:bg-white/10 hover:border-white/10 transition-all cursor-default"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-32 px-6 md:px-24 bg-black/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
              Open to Opportunities
            </p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Let's Work<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500 italic">
                Together
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
              Disponível para projetos de consultoria, contratos de engenharia e colaborações técnicas.
              Vamos construir algo incrível.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="https://www.linkedin.com/in/jader-germano/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#0A66C2] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href="mailto:jader.gp15@gmail.com"
              className="flex items-center gap-3 border border-white/10 bg-white/5 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
            >
              <Mail size={16} />
              jader.gp15@gmail.com
            </a>
            <a
              href="https://github.com/jader-germano"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-white/10 bg-white/5 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
            >
              <Github size={16} />
              GitHub
              <ArrowUpRight size={12} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer className="py-8 px-6 md:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">
            © {new Date().getFullYear()} Jader Philipe · JPGLabs
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">
            Built with React · Vite · Supabase
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicHome;
