import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Bot, Layers, ShieldCheck, Wrench, MessageCircle, Send } from 'lucide-react';

const CONTRACTOR_SERVICES = [
  {
    id: 'svc-contract-0',
    title: 'PI + MCP Service Foundation',
    icon: Bot,
    description:
      'Transforma intake, dados, integrações e regras de negócio em uma base executável para serviços agentic.',
    bullets: ['Mandatory intake', 'Database foundation', 'Roadmap with blockers'],
  },
  {
    id: 'svc-contract-1',
    title: 'AI Orchestration for Teams',
    icon: Bot,
    description:
      'Design and operation of multi-agent pipelines for delivery, support and growth teams.',
    bullets: ['Agent design', 'Prompt governance', 'Operational runbooks'],
  },
  {
    id: 'svc-contract-2',
    title: 'DevOps and VPS Hardening',
    icon: ShieldCheck,
    description:
      'Infrastructure setup with Traefik, container security and observability on VPS environments.',
    bullets: ['Traefik edge routing', 'Backup strategy', 'SLO/SLA monitoring'],
  },
  {
    id: 'svc-contract-3',
    title: 'Platform Modernization',
    icon: Layers,
    description:
      'Migration plans and architecture evolution for teams moving to AI-enabled services.',
    bullets: ['Legacy refactoring', 'Event-driven integration', 'Cost and reliability tuning'],
  },
  {
    id: 'svc-contract-4',
    title: 'Technical Mentorship',
    icon: Wrench,
    description:
      'Hands-on guidance for engineers and consultants implementing advanced AI infrastructure.',
    bullets: ['Architecture reviews', 'Live implementation sessions', 'Risk and compliance alignment'],
  },
];

const Services: React.FC = () => {
  useEffect(() => {
    // Inject WhatsApp Widget
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://w.app/widget-v1/5r60e9.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 selection:bg-blue-500/30">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Public Services</span>
        <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mt-4 leading-[0.85]">
          Company <br /><span className="text-gray-600 italic">Offerings</span>
        </h1>
        <p className="text-gray-500 text-lg mt-8 max-w-2xl leading-relaxed">
          Pacotes de serviço desenhados para empresas e times técnicos que exigem operações de IA resilientes e arquitetura de alta performance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
        {CONTRACTOR_SERVICES.map((service) => (
          <motion.article
            key={service.id}
            whileHover={{ y: -4 }}
            className="rounded-[40px] border border-white/5 bg-[#111214]/80 p-10 backdrop-blur-sm group hover:border-blue-500/30 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <service.icon size={28} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">{service.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">{service.description}</p>
            <ul className="grid grid-cols-1 gap-3">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-[10px] text-gray-500 uppercase tracking-widest font-black">
                  <div className="h-1 w-1 rounded-full bg-blue-500/50" />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <section className="grid lg:grid-cols-[1fr_1.2fr] gap-12 bg-[#101215] border border-white/5 rounded-[48px] overflow-hidden mb-24 shadow-2xl">
        <div className="p-12 md:p-16 flex flex-col justify-center">
          <div className="h-16 w-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-10">
            <MessageCircle size={32} />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-6">Commercial Inbox</h2>
          <p className="text-gray-400 leading-relaxed mb-10">
            `jpglabs.com.br` é a entrada profissional da operação. Para novos projetos, discovery técnico e propostas comerciais, a caixa oficial desta surface é `contato@jpglabs.com.br`.
          </p>
          <div className="flex flex-col gap-4">
            <a href="mailto:contato@jpglabs.com.br?subject=Novo%20projeto%20JPGLabs" className="flex items-center justify-between bg-white text-black px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
              contato@jpglabs.com.br <ArrowUpRight size={18} />
            </a>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">
              Use apenas emails do domínio `jpglabs.com.br` para esta lane profissional.
            </p>
          </div>
        </div>
        
        <div className="bg-white/5 p-12 md:p-16 border-l border-white/5">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/5 bg-black/30 p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400 mb-3">Inbox Policy</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Esta página não usa mais formulário solto nem canal placeholder. O ponto de entrada institucional para serviços, propostas e follow-up comercial é a inbox dedicada do domínio.
              </p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-black/30 p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 mb-3">Recommended subject line</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                `Novo projeto JPG Labs` + nome da empresa + principal problema que precisa ser resolvido.
              </p>
            </div>
            <a href="mailto:contato@jpglabs.com.br?subject=Novo%20projeto%20JPGLabs" className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3">
              Abrir Caixa de Entrada <Send size={16} />
            </a>
            <p className="text-[9px] text-gray-600 text-center uppercase tracking-widest">Ao iniciar contato, você segue os canais institucionais e as diretrizes públicas da JPG Labs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
