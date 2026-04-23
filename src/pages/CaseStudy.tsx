import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Cpu, Code, Globe } from 'lucide-react';
import { ROUTES } from '../config/routes';
import { CartesianBackground } from '../components/CartesianBackground';

const CASE_STUDIES: Record<string, {
  title: string;
  subtitle: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  imageIcon: React.ElementType;
}> = {
  'ai-toolkit-v3': {
    title: 'AI Architect Toolkit v3.0',
    subtitle: 'Orchestrating Autonomous Engineering Teams',
    challenge: 'Senior engineers spend 40% of their time on repetitive setup and boilerplate for AI integration, slowing down innovation.',
    solution: 'We built a comprehensive ecosystem of pre-configured agents, MCP servers, and infrastructure-as-code templates. The toolkit provides a "factory in a box" for spinning up specialized AI workers.',
    results: [
      'Reduced setup time from 3 days to 15 minutes',
      'Enabled local execution of Llama 3 models via Docker',
      'Standardized output quality across 5 different engineering teams'
    ],
    techStack: ['Java 21', 'Spring AI', 'n8n', 'Docker', 'Ollama', 'MCP Protocol'],
    imageIcon: Cpu
  },
  'cloud-infra': {
    title: 'JPGLabs Cloud Infrastructure',
    subtitle: 'Resilient VPS Architecture for High-Load AI',
    challenge: 'Running multiple LLMs and automation workflows on a budget requires extreme resource optimization and security.',
    solution: 'A single-node Kubernetes (k3s) cluster managed by GitOps. We utilize Traefik for dynamic edge routing and automatic SSL, ensuring secure exposure of internal services.',
    results: [
      '99.99% Uptime with self-healing pods',
      'Zero-cost SSL certificate management',
      'Seamless deployment via GitHub Actions'
    ],
    techStack: ['Kubernetes (k3s)', 'Traefik', 'Ansible', 'Grafana', 'Prometheus', 'Hostinger VPS'],
    imageIcon: Globe
  }
};

const CaseStudy: React.FC = () => {
  const { slug } = useParams();
  // Default to a generic one or show not found if slug is missing/invalid
  const study = slug && CASE_STUDIES[slug] ? CASE_STUDIES[slug] : CASE_STUDIES['ai-toolkit-v3'];

  return (
    <>
      <CartesianBackground intensity="ambient" />
      <div className="relative z-10">
        <div className="min-h-screen bg-[#050505] text-white font-sans py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Link to={ROUTES.portfolioCanonical} className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 uppercase text-[10px] font-black tracking-widest">
              <ChevronLeft size={12} /> Back to Hub
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
              <div className="w-20 h-20 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-8">
                <study.imageIcon size={40} />
              </div>
              <h1 className="text-5xl md:text-7xl font-black font-display tracking-tighter uppercase leading-none mb-6">{study.title}</h1>
              <p className="text-xl text-gray-400 font-light">{study.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
              <div className="md:col-span-2 space-y-12">
                <section>
                  <h3 className="text-sm font-black text-accent uppercase tracking-widest mb-4">The Challenge</h3>
                  <p className="text-gray-400 leading-relaxed">{study.challenge}</p>
                </section>
                <section>
                  <h3 className="text-sm font-black text-accent uppercase tracking-widest mb-4">The Solution</h3>
                  <p className="text-gray-400 leading-relaxed">{study.solution}</p>
                </section>
                <section>
                  <h3 className="text-sm font-black text-accent uppercase tracking-widest mb-4">Key Results</h3>
                  <ul className="space-y-3">
                    {study.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div>
                <div className="p-8 rounded-[32px] border border-white/5 bg-[#111214]/50 backdrop-blur-sm sticky top-32">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Code size={14} /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {study.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudy;
