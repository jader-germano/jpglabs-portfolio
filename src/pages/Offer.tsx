import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Network, ShieldCheck } from 'lucide-react';
import { CartesianBackground } from '../components/CartesianBackground';

const Offer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('agent');

  return (
    <>
      <CartesianBackground intensity="focused" />
      <div className="relative z-10">
        <div className="min-h-screen bg-[#08090a] text-gray-100 selection:bg-accent/30 pb-20 overflow-x-hidden">
          <main className="pt-20 max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-widest mb-8">
                <ShieldCheck size={14} /> Global Infrastructure V3.0
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black font-display text-white mb-6 tracking-tighter uppercase italic">
                Modern AI Engineer <br /><span className="text-accent">Toolkit</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
                A infraestrutura, os prompts e os protocolos que transformam desenvolvedores sêniores em arquitetos de IA.
              </motion.p>
            </div>

            <div className="flex justify-center mb-12">
              <div className="bg-white/5 rounded-full border border-white/10 p-1 flex gap-2">
                {[
                  { id: 'agent', label: 'Agent Blueprint', icon: Cpu },
                  { id: 'mcp', label: 'MCP Guide', icon: Network },
                  { id: 'devops', label: 'DevOps Infra', icon: ShieldCheck },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                      activeTab === tab.id ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <tab.icon size={14} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-[40px] border border-white/5 bg-[#111214]/50 p-10 backdrop-blur-sm relative overflow-hidden"
              >
                {activeTab === 'agent' && (
                  <div>
                    <h2 className="text-3xl font-black font-display text-white mb-4 uppercase italic">Senior Agent Blueprint</h2>
                    <p className="text-gray-500 mb-8 max-w-2xl">Prompt system and operating rules for an engineer who can reason about architecture, security, and performance in production.</p>
                    <div className="bg-black/60 border border-white/5 rounded-2xl p-6 font-mono text-xs leading-relaxed text-accent">
                      <pre>{`// LGPD audit-safe service pattern
@Service
public class AuditTrailService {
    @Async("auditExecutor")
    public void logAccess(String actor, String action, Object payload) {
        String payloadHash = CryptoUtils.sha256(payload.toString());
        auditRepository.save(actor, action, payloadHash, Instant.now());
    }
}`}</pre>
                    </div>
                  </div>
                )}

                {activeTab === 'mcp' && (
                  <div>
                    <h2 className="text-3xl font-black font-display text-white mb-4 uppercase italic">MCP Implementation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                        <h3 className="text-accent font-black mb-2 uppercase text-sm tracking-widest">Host</h3>
                        <p className="text-sm text-gray-500">Clients such as ChatGPT Apps, Claude Desktop, or CLI runtimes that consume tools.</p>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                        <h3 className="text-green-500 font-black mb-2 uppercase text-sm tracking-widest">Server</h3>
                        <p className="text-sm text-gray-500">Context providers that expose memory, infrastructure, and operational controls through a stable contract.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'devops' && (
                  <div className="text-center py-10">
                    <h2 className="text-3xl font-black font-display text-white mb-12 uppercase italic">VPS Cloud Architecture</h2>
                    <div className="inline-block relative bg-black/50 p-10 rounded-[32px] border border-accent/30 font-mono text-sm text-accent leading-relaxed">
                      [Internet] → [Cloudflare Proxy] <br />
                      ↓ <br />
                      [VPS Hostinger] <br />
                      ↓ <br />
                      [Nginx Edge / Pi Service] <br />
                      ↙ &nbsp;&nbsp;&nbsp;&nbsp; ↓ &nbsp;&nbsp;&nbsp;&nbsp; ↘ <br />
                      [Products] &nbsp; [Pi Runtime] &nbsp; [Apps]
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4 items-end">
            <a
              href="/pi"
              className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-5 py-4 rounded-2xl shadow-2xl hover:bg-white/10 transition-all group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em]"
            >
              Pi runtime
              <ArrowUpRight size={16} className="group-hover:text-accent transition-colors" />
            </a>
            <a href="https://kiwify.app/dNAbUrV" className="bg-accent text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 font-black text-xs uppercase tracking-widest hover:bg-accent-deep transition-colors transform hover:scale-105">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Unlock Toolkit v3.0
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
