import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, Trash2, Edit3, Briefcase, Cpu, Wrench, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';

const PI_SYNC_CARDS = [
  {
    title: 'Sync Skill',
    value: 'pi-portfolio-sync',
    note: 'Orquestra copy, roadmap, assets, PDFs, ebooks e handoff de atualização.',
  },
  {
    title: 'Intake Factory',
    value: 'PI + MCP Service Foundation',
    note: 'Consolida intake obrigatório, banco inicial, backlog e pendências para serviços agentic.',
  },
  {
    title: 'Cadence',
    value: 'Weekly Review',
    note: 'Revisão contínua de PI, MCP, assets comerciais e docs públicas.',
  },
  {
    title: 'Publication Scope',
    value: 'Portfolio + Downloads',
    note: 'PublicHome, Portfolio, PDFs, ebooks, roadmap e referências públicas.',
  },
] as const;

const SPAWNED_AGENT_TASKS = [
  {
    agent: 'Agent Broadcast',
    focus: 'Capturar tudo que PI entregou e transformar em narrativa pública-safe para portfolio e oferta.',
  },
  {
    agent: 'Agent Forge',
    focus: 'Regenerar PDFs, ebooks e imagens quando houver mudança material em produto, posicionamento ou design.',
  },
  {
    agent: 'Agent Scribe',
    focus: 'Atualizar roadmap, release notes públicas e links canônicos sem vazar detalhes privados da operação.',
  },
  {
    agent: 'Agent Intake',
    focus: 'Transformar briefings estruturados em base de serviço, contratos iniciais, backlog e blockers explícitos.',
  },
] as const;

const PortfolioManager: React.FC = () => {
  const { isPrimeOwner, isSubOwner } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'experiences' | 'skills'>('projects');
  const canAccess = isPrimeOwner || isSubOwner;
  const canMutate = isPrimeOwner;
  const tabs = [
    { id: 'projects', label: 'Projetos & Gigs', icon: Briefcase },
    { id: 'experiences', label: 'Experiências', icon: Cpu },
    { id: 'skills', label: 'Skills & Stack', icon: Wrench },
  ] as const;

  if (!canAccess) {
    return <Navigate to={ROUTES.root} replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 selection:bg-blue-500/30">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <ShieldCheck className="text-blue-500" size={24} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Governance Console</span>
        </div>
        <h1 className="text-5xl font-black uppercase tracking-tighter text-white italic">Portfolio Manager</h1>
        <p className="text-gray-400 mt-4 max-w-2xl leading-relaxed">
          Centralized CRUD for autonomous portfolio management. Changes here reflect instantly on the public surface.
        </p>
      </header>

      <section className="mb-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
        <div className="rounded-[40px] border border-white/5 bg-[#101215]/70 p-8">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-500 mb-4">PI Publication Lane</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-4">
            Rotina ativa para refletir PI, MCP e assets no portfólio.
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Esta console agora assume que o trabalho do PI pode gerar atualização de narrativa, roadmap, PDF comercial,
            ebook, PDFs de oferta e provas de produto. O fluxo padrão deve passar pela skill `pi-portfolio-sync` e por agentes spawnados
            quando houver subtarefas independentes.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {PI_SYNC_CARDS.map((card) => (
              <div key={card.title} className="rounded-3xl border border-white/5 bg-black/30 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-600 mb-3">{card.title}</p>
                <p className="text-white text-sm font-black uppercase tracking-wide mb-2">{card.value}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{card.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[40px] border border-white/5 bg-[#101215]/70 p-8">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-orange-400 mb-4">Spawned Agent Tasks</p>
          <div className="space-y-4">
            {SPAWNED_AGENT_TASKS.map((task) => (
              <div key={task.agent} className="rounded-3xl border border-white/5 bg-black/30 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400 mb-2">{task.agent}</p>
                <p className="text-sm text-gray-300 leading-relaxed">{task.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-white text-black shadow-2xl scale-105' 
                : 'bg-white/5 text-gray-500 hover:bg-white/10'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#101215] border border-white/5 rounded-[48px] p-12 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">
            Gerenciar {activeTab === 'projects' ? 'Projetos' : activeTab === 'experiences' ? 'Experiências' : 'Skills'}
          </h2>
          <button
            disabled={!canMutate}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all ${
              canMutate
                ? 'bg-blue-600 text-white hover:bg-blue-500'
                : 'bg-white/5 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Plus size={14} /> Adicionar Novo
          </button>
        </div>

        {!canMutate && (
          <div className="mb-8 rounded-3xl border border-amber-400/20 bg-amber-500/10 px-6 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-amber-300">
            Sub-owner mode: visualizacao e revisao delegada. Mudancas estruturais seguem reservadas ao OWNER_PRIME.
          </div>
        )}

        <div className="space-y-4">
          {/* Placeholder for list items */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-6 bg-black/40 rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-white transition-colors">
                  {activeTab === 'projects' ? <Briefcase size={20} /> : activeTab === 'experiences' ? <Cpu size={20} /> : <Wrench size={20} />}
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white tracking-widest">Exemplo de Item {item}</h4>
                  <p className="text-[10px] text-gray-600 uppercase font-bold mt-1 tracking-widest">Modificado em: 2026-03-16</p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  disabled={!canMutate}
                  className={`p-3 rounded-xl transition-all ${canMutate ? 'hover:bg-white/5 text-blue-400' : 'text-gray-600 cursor-not-allowed'}`}
                >
                  <Edit3 size={16} />
                </button>
                <button
                  disabled={!canMutate}
                  className={`p-3 rounded-xl transition-all ${canMutate ? 'hover:bg-white/5 text-red-500' : 'text-gray-600 cursor-not-allowed'}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-white/5 flex items-center justify-between text-gray-600">
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em]">
            <User size={12} className="text-blue-500" /> Authorized Operator: {canMutate ? 'PRIME OWNER' : 'SUB OWNER'}
          </div>
          <button
            disabled={!canMutate}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
              canMutate
                ? 'bg-white/5 hover:bg-white/10 text-white'
                : 'bg-white/5 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save size={16} /> Salvar Alterações
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioManager;
