import Hero from "../components/Hero";
import WhatIBuild from "../components/WhatIBuild";
import CodeSnippets from "../components/CodeSnippets";
import ProjectsGrid from "../components/ProjectsGrid";
import ExperienceFlow from "../components/ExperienceFlow";
import SkillsCloud from "../components/SkillsCloud";
import ResumeUpload from "../components/ResumeUpload";
import KnowledgeVault from "../components/KnowledgeVault";
import CTASection from "../components/CTASection";
import { useLanguage } from "../context/LanguageProvider";

/**
 * PortfolioHome mirrors the composition from portfolio-backend/app/page.tsx
 * so the migrated sections (Hero, WhatIBuild, CodeSnippets, ProjectsGrid,
 * ExperienceFlow, SkillsCloud, ResumeUpload, KnowledgeVault, CTASection) get
 * an entry point inside the SPA without displacing the existing /portifolio/:slug
 * presentation page.
 */
export default function PortfolioHome() {
  const { dictionary } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white overflow-x-hidden">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 70%, rgba(192,74,63,0.04), transparent 50%)" }}
      />
      <main>
        <Hero />
        <WhatIBuild />
        <CodeSnippets />
        <ProjectsGrid />
        <ExperienceFlow />
        <SkillsCloud />
        <ResumeUpload />
        <KnowledgeVault />
        <CTASection />
      </main>
      <footer className="py-16 text-center text-gray-800 font-mono text-[9px] uppercase tracking-[1em] border-t border-white/5">
        {dictionary.footer}
      </footer>
    </div>
  );
}
