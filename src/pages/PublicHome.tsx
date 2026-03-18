import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  FileText,
  Layers3,
  Mic,
  Network,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../config/routes';
import { PRODUCT_CATALOG } from '../data/products';

type RuntimeOverview = {
  architecture?: {
    title?: string;
    summary?: string;
    sections?: Array<{ title: string; summary: string }>;
  };
  summary?: {
    total?: number;
    online?: number;
    warning?: number;
    alerts?: number;
  };
};

const PI_RUNTIME_BASE = (
  import.meta.env.VITE_PI_SERVICE_BASE_URL ||
  import.meta.env.VITE_PI_SERVICE_PROD_URL ||
  '/pi'
).replace(/\/+$/, '');

const PublicHome: React.FC = () => {
  const [runtime, setRuntime] = useState<RuntimeOverview | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${PI_RUNTIME_BASE}/system/overview`)
      .then((res) => (res.ok ? res.json() : Promise.reject(`HTTP ${res.status}`)))
      .then((data) => !cancelled && setRuntime(data))
      .catch(() => !cancelled && setRuntime(null));
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen bg-[#08090a] text-gray-100 selection:bg-blue-500/30 overflow-y-auto snap-y snap-mandatory" ref={containerRef}>
      
      {/* SECTION 1: HERO (Horizontal Feel) */}
      <section className="min-h-screen flex flex-col justify-center snap-start relative px-6 md:px-24">
        <div className="max-w-7xl mx-auto w-full grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">JPG Labs OS • 2026</p>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              AI Systems <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 italic">Engineering</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
              Desenvolvimento de arquiteturas agentic, governança de memória e sistemas operacionais de IA para alta performance.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-6">
              <Link to={ROUTES.portfolioCanonical} className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
                Ver Portfólio
              </Link>
              <Link to={ROUTES.services} className="border border-white/10 bg-white/5 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
                Explorar Serviços
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="hidden lg:block bg-black/40 border border-white/5 p-8 rounded-[48px] backdrop-blur-xl shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Mic size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Pi Runtime</p>
                  <h2 className="text-xl font-black uppercase italic">Live Snapshot</h2>
                </div>
              </div>
              
              {runtime ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0f1217] p-4 rounded-2xl border border-white/5">
                      <span className="text-[9px] font-black uppercase text-gray-600 block mb-2 tracking-widest">Status</span>
                      <span className="text-green-500 font-black text-xl uppercase tracking-tighter">Online</span>
                    </div>
                    <div className="bg-[#0f1217] p-4 rounded-2xl border border-white/5">
                      <span className="text-[9px] font-black uppercase text-gray-600 block mb-2 tracking-widest">Sistemas</span>
                      <span className="text-white font-black text-xl tracking-tighter">{runtime.summary?.total || 0} Pods</span>
                    </div>
                  </div>
                  <div className="bg-[#0f1217] p-5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-3">Última Auditoria</p>
                    <p className="text-sm text-gray-400 leading-relaxed italic line-clamp-2">
                      "{runtime.architecture?.summary || 'Sincronizando protocolos de governança...'}"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="animate-pulse space-y-4">
                  <div className="h-24 bg-white/5 rounded-3xl" />
                  <div className="h-32 bg-white/5 rounded-3xl" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-700 animate-bounce">
          <span className="text-[8px] font-black uppercase tracking-[0.5em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-700 to-transparent" />
        </div>
      </section>

      {/* SECTION 2: SERVICES (Horizontal Grid) */}
      <section className="min-h-screen snap-start flex flex-col justify-center bg-black/20 border-y border-white/5 relative px-6 md:px-24 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4">Soluções & Consultoria</p>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                Hands-on <br /><span className="text-gray-500 italic">Delivery Lanes</span>
              </h2>
            </div>
            <Link to={ROUTES.services} className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">
              Ver todos os serviços <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'AI Orchestration', icon: Bot, desc: 'Fluxos multi-agente para entrega, suporte e crescimento.' },
              { title: 'VPS Hardening', icon: ShieldCheck, desc: 'Segurança em nível de host, edge routing e observabilidade.' },
              { title: 'Architecture Review', icon: Layers3, desc: 'Auditoria de sistemas para escala e integração de IA.' },
              { title: 'PI Runtime / MCP Ops', icon: Network, desc: 'Camada operacional que transforma memória, tools e infraestrutura em superfícies MCP e produto reviewável.' },
            ].map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#101215] border border-white/5 p-10 rounded-[40px] group hover:border-blue-500/30 transition-all cursor-default"
              >
                <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <s.icon size={28} />
                </div>
                <h3 className="text-xl font-black uppercase mb-4 tracking-tight">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-[40px] border border-white/5 bg-[#101215]/80 p-8 md:p-10">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-500 mb-4">PI + MCP Active Lane</p>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
                  O portfolio agora acompanha o que o PI entrega em runtime, assets e roadmap.
                </h3>
                <p className="text-gray-400 leading-relaxed max-w-3xl">
                  Cada avanço em MCP, speech, deploy, segurança e superfícies cliente pode virar prova pública, PDF comercial
                  ou item ativo de roadmap sem depender de atualização manual solta.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                <Link to={`${ROUTES.portfolioCanonical}#pi-roadmap`} className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all text-center">
                  Ver trilha MCP
                </Link>
                <Link to={ROUTES.offer} className="border border-white/10 bg-white/5 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all text-center">
                  Ver oferta ativa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCTS (Marketplace) */}
      <section className="min-h-screen snap-start flex flex-col justify-center px-6 md:px-24 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6">Toolkit & Assets</p>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic">Featured Products</h2>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar snap-x">
            {PRODUCT_CATALOG.map((p) => (
              <motion.div
                key={p.id}
                className="min-w-[320px] md:min-w-[450px] snap-center bg-gradient-to-b from-[#101215] to-black border border-white/8 rounded-[48px] p-12 relative group"
              >
                <div className="absolute top-12 right-12 text-white/5 group-hover:text-white/10 transition-colors">
                  <FileText size={80} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">{p.headline}</p>
                <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-6 pr-20">{p.name}</h3>
                <p className="text-gray-400 text-base leading-relaxed mb-10 line-clamp-3 italic">
                  "{p.summary}"
                </p>
                
                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <span className="text-2xl font-black text-white">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p.price)}
                  </span>
                  <Link to={ROUTES.downloads} className="h-14 w-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-all">
                    <ArrowUpRight size={24} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default PublicHome;
