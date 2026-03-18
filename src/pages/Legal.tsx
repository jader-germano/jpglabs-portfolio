import { motion } from 'framer-motion';
import { 
  Lock, Shield, Info, ChevronRight
} from 'lucide-react';

function Legal() {
  return (
    <div className="min-h-screen bg-[#08090a] text-gray-300 font-sans selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      
      {/* Background Aura */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(0,112,243,0.15),transparent_70%)] pointer-events-none" />

      <main className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-mono mb-8 uppercase tracking-widest"
        >
          <Shield size={14} /> Direitos Autorais & Termos Técnicos
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-12"
        >
          Propriedade Intelectual <br />
          <span className="text-gray-500 italic">JPG Labs</span>
        </motion.h1>

        <div className="space-y-12 text-left bg-white/5 p-10 rounded-[40px] border border-white/5 backdrop-blur-md">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Lock className="text-blue-500" size={24} /> 1. Proteção de Algoritmos e Agentes
            </h2>
            <p className="leading-relaxed text-gray-400">
              Todos os "Agent Blueprints", configurações de sistema, prompts de orquestração e fluxos de automação n8n contidos no <b>AI Architect Toolkit</b> são de propriedade exclusiva da JPGLabs. O licenciamento concedido no momento da compra é de uso <b>pessoal e intransferível</b> para implementação em projetos próprios ou de clientes, sendo proibida a redistribuição ou revenda dos prompts originais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Shield className="text-blue-500" size={24} /> 2. Limitação de Responsabilidade
            </h2>
            <p className="leading-relaxed text-gray-400">
              As implementações técnicas (Java, Angular, Docker) seguem padrões de mercado de alta segurança. No entanto, a JPGLabs não se responsabiliza por custos de infraestrutura de terceiros (Cloudflare, Hostinger, Anthropic API) ou por modificações feitas pelo usuário que possam comprometer a integridade dos sistemas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Info className="text-blue-500" size={24} /> 3. Atualizações e Roadmap
            </h2>
            <p className="leading-relaxed text-gray-400">
              O compromisso de 1 ano de atualizações refere-se à manutenção técnica dos agentes atuais e ao lançamento de novos módulos conforme descrito no roadmap oficial. O acesso ao portal interativo é vitalício enquanto o serviço estiver ativo.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <a href="/" className="text-blue-500 hover:text-blue-400 font-bold flex items-center justify-center gap-2 transition-colors group">
            Voltar para a Home <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </main>

      <footer className="py-20 text-center opacity-30 text-white">
        <p className="text-gray-700 text-[10px] uppercase tracking-[0.3em]">&copy; 2026 JPGLabs • Todos os direitos reservados</p>
      </footer>

    </div>
  );
}

export default Legal;
