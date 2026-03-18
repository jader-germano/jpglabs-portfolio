import { motion } from 'framer-motion';
import { 
  Users, MessageCircle, Star, Sparkles, Trophy, Lock
} from 'lucide-react';

function Upsell() {
  return (
    <div className="min-h-screen bg-[#08090a] text-gray-300 font-sans selection:bg-amber-500/30 selection:text-white overflow-x-hidden">
      
      {/* Background Aura - Golden/Premium */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(245,158,11,0.1),transparent_70%)] pointer-events-none" />

      {/* 1. URGENCY BAR */}
      <div className="bg-amber-600 text-black py-2 text-center text-xs font-black uppercase tracking-[0.2em] px-4">
        Espere! Não feche esta página. Esta oferta é única e não aparecerá novamente.
      </div>

      <main className="pt-20 pb-20 max-w-4xl mx-auto px-6 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-xs font-mono mb-8"
        >
          <Star size={14} fill="currentColor" /> EXCLUSIVE INNER CIRCLE ACCESS
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8"
        >
          Quer levar a <span className="text-amber-500 italic font-serif text-5xl md:text-8xl">JPGLabs</span> para o seu negócio?
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-16"
        >
          Você já tem o Toolkit. Agora, você pode ter o <b>Arquiteto</b>. Junte-se ao Inner Circle e transforme sua carreira em uma consultoria de elite.
        </motion.p>

        {/* BENEFITS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 text-left">
          {[
            { icon: Users, title: 'Comunidade VIP', desc: 'Networking direto com Jader Germano e outros Engenheiros de IA Sêniores.' },
            { icon: MessageCircle, title: 'Suporte Prioritário', desc: 'Canal direto no WhatsApp para tirar dúvidas de implementação MCP e n8n.' },
            { icon: Trophy, title: 'Review de Arquitetura', desc: 'Eu reviso o design do seu sistema de IA uma vez por mês via call privada.' },
            { icon: Sparkles, title: 'Agentes sob Demanda', desc: 'Solicite templates de agentes específicos para o seu nicho.' }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[32px] border border-white/5 bg-white/5 backdrop-blur-sm group hover:border-amber-500/30 transition-all">
              <item.icon className="text-amber-500 mb-4" size={28} />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* PRICING BOX */}
        <div className="p-12 rounded-[40px] border-2 border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent shadow-[0_0_100px_rgba(245,158,11,0.1)] mb-12">
          <div className="flex flex-col items-center gap-2 mb-8">
            <span className="text-gray-500 line-through text-xl tracking-widest">VALOR REAL: R$ 2.997,00</span>
            <div className="flex items-end gap-2">
              <span className="text-sm font-bold text-amber-500 mb-4 uppercase">Apenas hoje</span>
              <span className="text-7xl md:text-9xl font-black text-white tracking-tighter">997</span>
              <span className="text-2xl font-bold text-amber-500 mb-4">,00</span>
            </div>
            <p className="text-amber-500/60 text-sm font-bold tracking-widest uppercase italic mt-4">Ou em 12x de R$ 99,50</p>
          </div>

          <a href="https://pay.kiwify.com.br/LINK_UPSELL" className="w-full py-6 bg-amber-500 text-black rounded-2xl font-black text-2xl transition-all shadow-[0_0_50px_rgba(245,158,11,0.2)] hover:scale-105 active:scale-95 block mb-6 uppercase">
            SIM! QUERO ENTRAR NO INNER CIRCLE
          </a>

          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
            <Lock size={14} /> Pagamento Único • Acesso por 1 Ano
          </div>
        </div>

        {/* SKIP LINK */}
        <a href="https://jpglabs.com.br/obrigado" className="text-gray-600 hover:text-gray-400 text-sm underline transition-colors">
          Não, obrigado. Quero apenas o Toolkit e perder esta oportunidade única.
        </a>

      </main>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 text-center opacity-30 grayscale">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-white text-black font-bold text-xs flex items-center justify-center">J</div>
          <span className="font-bold tracking-widest text-sm uppercase italic">JPG Labs</span>
        </div>
        <p className="text-gray-700 text-[10px] uppercase tracking-[0.3em]">&copy; 2026 JPGLabs • Inner Circle</p>
      </footer>

    </div>
  );
}

export default Upsell;
