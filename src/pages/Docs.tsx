import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Github, AlertTriangle, FileText, ChevronRight, BookOpen } from 'lucide-react';

const DOCS_DATA = [
  {
    title: 'Arquitetura do Ecossistema Pi',
    category: 'Architecture',
    updatedAt: '2026-03-16',
    githubPath: 'jader-germano/jpglabs/infrastructure/docs/architecture.md',
    isBroken: false,
  },
  {
    title: 'Biblioteca de Guias de Engenharia',
    category: 'Engineering',
    updatedAt: '2026-03-17',
    githubPath: 'jader-germano/jpglabs/docs/guides/README.md',
    isBroken: false,
  },
  {
    title: 'PI + MCP Agentic Service Foundation',
    category: 'Product',
    updatedAt: '2026-03-17',
    githubPath: 'jader-germano/jpglabs/products/pi-mcp-agentic-service-foundation/README.md',
    isBroken: false,
  },
  {
    title: 'Agentic Service Intake Template',
    category: 'Automation',
    updatedAt: '2026-03-17',
    githubPath: 'jader-germano/jpglabs/products/pi-mcp-agentic-service-foundation/AGENTIC_SERVICE_INTAKE_TEMPLATE.md',
    isBroken: false,
  },
  {
    title: 'Agentic Service Automation Spec',
    category: 'Automation',
    updatedAt: '2026-03-17',
    githubPath: 'jader-germano/jpglabs/products/pi-mcp-agentic-service-foundation/AGENTIC_SERVICE_AUTOMATION_SPEC.md',
    isBroken: false,
  },
  {
    title: 'PI + MCP Agentic Service Foundation Ebook',
    category: 'Product',
    updatedAt: '2026-03-17',
    githubPath: 'jader-germano/jpglabs/products/pi-mcp-agentic-service-foundation/PI_MCP_AGENTIC_SERVICE_FOUNDATION_EBOOK.md',
    isBroken: false,
  },
  {
    title: 'Git Flow Playbook',
    category: 'Delivery',
    updatedAt: '2026-03-17',
    githubPath: 'jader-germano/jpglabs/docs/guides/GIT_FLOW_PLAYBOOK.md',
    isBroken: false,
  },
  {
    title: 'CI/CD Pipelines Playbook',
    category: 'Delivery',
    updatedAt: '2026-03-17',
    githubPath: 'jader-germano/jpglabs/docs/guides/CI_CD_PIPELINES_PLAYBOOK.md',
    isBroken: false,
  },
  {
    title: 'Java + Spring Delivery Playbook',
    category: 'Backend',
    updatedAt: '2026-03-17',
    githubPath: 'jader-germano/jpglabs/docs/guides/JAVA_SPRING_DELIVERY_PLAYBOOK.md',
    isBroken: false,
  },
  {
    title: 'Java + Quarkus Parity Playbook',
    category: 'Backend',
    updatedAt: '2026-03-17',
    githubPath: 'jader-germano/jpglabs/docs/guides/JAVA_QUARKUS_PARITY_PLAYBOOK.md',
    isBroken: false,
  },
  {
    title: 'Node.js Service Delivery Playbook',
    category: 'Backend',
    updatedAt: '2026-03-17',
    githubPath: 'jader-germano/jpglabs/docs/guides/NODE_SERVICE_DELIVERY_PLAYBOOK.md',
    isBroken: false,
  },
  {
    title: 'Next Backend + BFF Playbook',
    category: 'Product Platform',
    updatedAt: '2026-03-17',
    githubPath: 'jader-germano/jpglabs/docs/guides/NEXT_BACKEND_BFF_PLAYBOOK.md',
    isBroken: false,
  },
  {
    title: 'Angular Delivery Playbook',
    category: 'Frontend',
    updatedAt: '2026-03-17',
    githubPath: 'jader-germano/jpglabs/docs/guides/ANGULAR_DELIVERY_PLAYBOOK.md',
    isBroken: false,
  },
  {
    title: 'React Product Surface Playbook',
    category: 'Frontend',
    updatedAt: '2026-03-17',
    githubPath: 'jader-germano/jpglabs/docs/guides/REACT_PRODUCT_SURFACE_PLAYBOOK.md',
    isBroken: false,
  },
  {
    title: 'Supabase Contract Playbook',
    category: 'Data Platform',
    updatedAt: '2026-03-17',
    githubPath: 'jader-germano/jpglabs/docs/guides/SUPABASE_CONTRACT_PLAYBOOK.md',
    isBroken: false,
  },
  {
    title: 'Manual de Implementação MCP',
    category: 'Engineering',
    updatedAt: '2026-03-14',
    githubPath: 'jader-germano/jpglabs/docs/mcp-manual.md',
    isBroken: false,
  },
];

const DocsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = DOCS_DATA.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 selection:bg-orange-500/30">
      
      {/* SEARCH BAR */}
      <div className="relative mb-20 max-w-2xl mx-auto">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500">
          <Search size={20} />
        </div>
        <input 
          type="text" 
          placeholder="Pesquisar na documentação técnica..."
          className="w-full bg-[#101215]/80 border border-white/5 rounded-[32px] pl-16 pr-8 py-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-all backdrop-blur-xl shadow-2xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
        {/* LATEST PUBLICATIONS */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <BookOpen className="text-orange-500" size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight text-white italic">Latest Publications</h2>
          </div>

          <div className="space-y-4">
            {filteredDocs.map((doc) => (
              <motion.div 
                key={doc.githubPath}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#101215] border border-white/5 p-8 rounded-[32px] group hover:border-white/10 transition-all"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2 block">{doc.category}</span>
                    <h3 className="text-xl font-black uppercase text-white mb-4 group-hover:text-orange-400 transition-colors">{doc.title}</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      <span>Atualizado em: {doc.updatedAt}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    {doc.isBroken ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-[9px] font-black uppercase tracking-widest cursor-help" title="Link quebrado no GitHub">
                        <AlertTriangle size={12} /> Link Quebrado
                      </div>
                    ) : (
                      <a 
                        href={`https://github.com/${doc.githubPath}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                      >
                        <Github size={12} /> View on GitHub
                      </a>
                    )}
                    
                    {doc.isBroken && (
                      <button className="text-[9px] font-black uppercase text-blue-400 hover:text-blue-300 underline tracking-widest">
                        Criar Issue no Git
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HUB PREVIEW */}
        <aside className="space-y-12">
          <div className="bg-gradient-to-b from-blue-600/20 to-transparent border border-blue-500/10 p-10 rounded-[48px] backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-8 text-blue-400">
              <FileText size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight">Hub de Docs</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Acesse snipets de código, diagramas de arquitetura e notas de pesquisa diretamente do meu Knowledge Hub sincronizado.
            </p>
            <div className="space-y-4">
              {['System Runtimes', 'Security Protocols', 'AI Agent Models'].map(item => (
                <div key={item} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group">
                  <span className="text-xs font-black uppercase text-gray-500 group-hover:text-white transition-colors">{item}</span>
                  <ChevronRight size={14} className="text-gray-700 group-hover:text-blue-400" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

    </div>
  );
};

export default DocsPage;
