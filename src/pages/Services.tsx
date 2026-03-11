import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Bot, Layers, ShieldCheck, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';

const CONTRACTOR_SERVICES = [
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
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Public Services</span>
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mt-4">
          Company <span className="text-gray-600 italic">Offerings</span>
        </h1>
        <p className="text-gray-500 text-sm mt-4 max-w-3xl leading-relaxed">
          Service packages designed for contractors and technical teams that need reliable AI operations,
          resilient infrastructure and senior implementation support.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {CONTRACTOR_SERVICES.map((service) => (
          <motion.article
            key={service.id}
            whileHover={{ y: -4 }}
            className="rounded-[32px] border border-white/5 bg-[#111214]/50 p-8 backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 mb-6">
              <service.icon size={22} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">{service.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.description}</p>
            <ul className="space-y-2">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <div className="rounded-3xl border border-white/5 bg-black/30 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Need a tailored engagement?</h3>
          <p className="text-gray-500 text-sm mt-2">Start with the offer page or review portfolio case studies.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to={ROUTES.offer}
            className="px-6 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all"
          >
            Open Offer
          </Link>
          <Link
            to={ROUTES.portfolioCanonical}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all inline-flex items-center gap-2"
          >
            View Portfolio <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
