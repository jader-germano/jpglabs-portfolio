import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, Trash2, Edit3, Briefcase, Cpu, Wrench, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';

const PortfolioManager: React.FC = () => {
  const { isRootAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'experiences' | 'skills'>('projects');
  const tabs = [
    { id: 'projects', label: 'Projetos & Gigs', icon: Briefcase },
    { id: 'experiences', label: 'Experiências', icon: Cpu },
    { id: 'skills', label: 'Skills & Stack', icon: Wrench },
  ] as const;

  if (!isRootAdmin) {
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
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-blue-500 transition-all">
            <Plus size={14} /> Adicionar Novo
          </button>
        </div>

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
                <button className="p-3 hover:bg-white/5 rounded-xl text-blue-400 transition-all"><Edit3 size={16} /></button>
                <button className="p-3 hover:bg-white/5 rounded-xl text-red-500 transition-all"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-white/5 flex items-center justify-between text-gray-600">
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em]">
            <User size={12} className="text-blue-500" /> Authorized Operator: ROOT ADMIN
          </div>
          <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">
            <Save size={16} /> Salvar Alterações
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioManager;
