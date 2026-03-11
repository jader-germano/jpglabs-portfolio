import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Cpu, Network, ShieldCheck, X, LogIn } from 'lucide-react';
import { ROUTES } from '../config/routes';

const Offer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('agent');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      setIsLoginOpen(false);
      navigate(ROUTES.home);
    } else {
      setError('Invalid credentials');
    }
  };

  if (isAuthenticated) {
     // If already logged in, the layout will show the menu, 
     // but the offer page can still be viewed or we can redirect to home.
     // For this refactor, let's keep it as the landing page.
  }

  return (
    <div className="min-h-screen bg-[#08090a] text-gray-100 selection:bg-blue-500/30 pb-20 overflow-x-hidden">
      
      {/* Hero Section */}
      <main className="pt-20 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-8">
            <ShieldCheck size={14} /> Global Infrastructure V3.0
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">
            Modern AI Engineer <br/><span className="text-blue-600">Toolkit</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
            A infraestrutura, os prompts e os protocolos que transformam desenvolvedores sêniores em arquitetos de IA.
          </motion.p>
        </div>

        {/* Content Tabs Navigation */}
        <div className="flex justify-center mb-12">
           <div className="bg-white/5 rounded-full border border-white/10 p-1 flex gap-2">
              {[
                { id: 'agent', label: 'Agent Blueprint', icon: Cpu },
                { id: 'mcp', label: 'MCP Guide', icon: Network },
                { id: 'devops', label: 'DevOps Infra', icon: ShieldCheck },
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
           </div>
        </div>

        {/* Content Area */}
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
                  <h2 className="text-3xl font-black text-white mb-4 uppercase italic">🧠 O Agente Sênior</h2>
                  <p className="text-gray-500 mb-8 max-w-2xl">Prompt de sistema para instanciar um engenheiro de software que entende arquitetura hexagonal, segurança e performance.</p>
                  <div className="bg-black/60 border border-white/5 rounded-2xl p-6 font-mono text-xs leading-relaxed text-blue-400">
                    <pre>{`// 🛡️ LGPD Compliance & Audit Logger Service
@Service
public class LogLGPDService {

    @Async("auditExecutor")
    public void logSensitiveAccess(String user, String action, Object data) {
        try {
            // 1. Anonymize PII before logging
            String dataHash = CryptoUtils.sha256(data.toString());
            
            // 2. Structural Logging for Graylog/Kibana
            AuditEntry entry = AuditEntry.builder()
                .timestamp(Instant.now())
                .actor(user)
                .action(action)
                .resourceHash(dataHash)
                .complianceLevel("LGPD_TIER_3")
                .build();

            // 3. Persist to Immutable Ledger
            auditRepository.save(entry);
            
        } catch (Exception e) {
            // Failsafe: Never block the main thread
            metrics.increment("lgpd.audit_failure");
        }
    }
}`}</pre>
                  </div>
               </div>
             )}

             {activeTab === 'mcp' && (
                <div>
                   <h2 className="text-3xl font-black text-white mb-4 uppercase italic">🔌 MCP Implementation</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                         <h3 className="text-blue-500 font-black mb-2 uppercase text-sm tracking-widest">Host (Client)</h3>
                         <p className="text-sm text-gray-500">Applications like Claude Desktop or Gemini CLI that consume tools.</p>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                         <h3 className="text-green-500 font-black mb-2 uppercase text-sm tracking-widest">Server</h3>
                         <p className="text-sm text-gray-500">Context providers (DBs, APIs) exposing technical resources.</p>
                      </div>
                   </div>
                </div>
             )}

             {activeTab === 'devops' && (
                <div className="text-center py-10">
                   <h2 className="text-3xl font-black text-white mb-12 uppercase italic">🏗️ VPS Cloud Architecture</h2>
                   <div className="inline-block relative bg-black/50 p-10 rounded-[32px] border border-blue-500/30 font-mono text-sm text-blue-400 leading-relaxed">
                      [Internet] → [Cloudflare Proxy] <br/>
                      ↓ <br/>
                      [VPS Hostinger] <br/>
                      ↓ <br/>
                      [Traefik Edge Proxy (SSL Auto)] <br/>
                      ↙ &nbsp;&nbsp;&nbsp;&nbsp; ↓ &nbsp;&nbsp;&nbsp;&nbsp; ↘ <br/>
                      [n8n] &nbsp; [LLMs] &nbsp; [Apps]
                   </div>
                </div>
             )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating CTA */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4 items-end">
        <button 
          onClick={() => setIsLoginOpen(true)}
          className="bg-white/5 backdrop-blur-xl border border-white/10 text-white p-4 rounded-2xl shadow-2xl hover:bg-white/10 transition-all group"
        >
          <LogIn size={20} className="group-hover:text-blue-500 transition-colors" />
        </button>
        <a href="https://kiwify.app/dNAbUrV" className="bg-white text-black px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all transform hover:scale-105">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          Unlock Toolkit v3.0
        </a>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#08090a]/95 backdrop-blur-md"
            onClick={() => setIsLoginOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md p-10 rounded-[40px] border border-white/5 bg-[#111214] shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setIsLoginOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-gray-500">
                <X size={20} />
              </button>
              
              <div className="w-16 h-16 rounded-2xl bg-blue-600 mx-auto mb-8 flex items-center justify-center text-white font-black text-2xl shadow-[0_0_30px_rgba(37,99,235,0.3)] italic">J</div>
              <h2 className="text-2xl font-black text-white text-center mb-2 uppercase tracking-widest">Member Login</h2>
              <p className="text-gray-500 text-center mb-10 text-[10px] uppercase tracking-[0.3em] font-bold">Access Protected Infrastructure</p>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <input 
                    type="email" 
                    placeholder="EMAIL ADDRESS" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 transition-colors outline-none text-[10px] font-black uppercase tracking-widest"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <input 
                    type="password" 
                    placeholder="PASSWORD" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 transition-colors outline-none text-[10px] font-black uppercase tracking-widest"
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-[9px] text-center uppercase font-black tracking-widest">{error}</p>}
                <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-500 transition-all shadow-lg active:scale-95 uppercase text-[10px] tracking-[0.2em] mt-4">
                  Authenticate Session
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Offer;
