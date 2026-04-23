import { motion } from "framer-motion";
import { Linkedin, Mail, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageProvider";

export default function CTASection() {
  const { dictionary } = useLanguage();

  return (
    <section className="py-40 px-8 md:px-20 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-10"
      >
        <h2
          className="font-display font-light tracking-tighter"
          style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.03em" }}
        >
          {dictionary.cta.titleLineOne}<br />
          <em style={{ color: "var(--text-dim)" }}>{dictionary.cta.titleLineTwo}</em>
        </h2>
        <p className="text-lg font-light max-w-xl mx-auto leading-relaxed" style={{ color: "var(--text-dim)" }}>
          {dictionary.cta.description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/jader-phelipe/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 text-white px-8 py-4 rounded-xl font-mono font-bold uppercase text-[10px] tracking-widest transition-all"
            style={{
              background: "var(--accent)",
              boxShadow: "0 8px 24px -8px var(--accent-glow)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.12)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = ""; }}
          >
            <Linkedin size={16} />
            {dictionary.cta.linkedin}
          </a>
          <a
            href="mailto:contato@jpglabs.com.br"
            className="inline-flex items-center justify-center gap-3 text-white px-8 py-4 rounded-xl font-mono font-bold uppercase text-[10px] tracking-widest transition-all hover:border-white/20"
            style={{ background: "transparent", border: "1px solid var(--border-strong)", color: "var(--text-dim)" }}
          >
            <Mail size={16} />
            contato@jpglabs.com.br
          </a>
          <a
            href="https://jpglabs.com.br"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-mono font-bold uppercase text-[10px] tracking-widest transition-all hover:border-white/20"
            style={{ background: "transparent", border: "1px solid var(--border-strong)", color: "var(--text-dim)" }}
          >
            <Globe size={16} />
            jpglabs.com.br
          </a>
        </div>
      </motion.div>
    </section>
  );
}
