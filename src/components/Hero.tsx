import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageProvider";

export default function Hero() {
  const { dictionary } = useLanguage();

  return (
    <section className="min-h-screen flex flex-col justify-center px-8 pt-40 pb-16 md:px-20 md:pt-44 max-w-7xl mx-auto relative overflow-hidden">
      {/* Cartesian grid background — decorative, hero only */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to right, var(--grid-major) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-major) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px, 48px 48px, 192px 192px, 192px 192px",
          maskImage: "radial-gradient(ellipse 90% 90% at 15% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 15% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Cartesian axis lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          maskImage: "radial-gradient(ellipse 70% 80% at 15% 50%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 15% 50%, black 0%, transparent 100%)",
        }}
      >
        <div className="absolute top-0 bottom-0" style={{ left: "15%", width: "1px", background: "var(--axis)" }} />
        <div className="absolute left-0 right-0 top-1/2" style={{ height: "1px", background: "var(--axis)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 relative z-10"
      >
        <div className="flex items-center gap-3">
          <span
            className="font-mono tracking-[0.3em] text-[10px] uppercase font-bold"
            style={{ color: "var(--accent)" }}
          >
            {dictionary.hero.eyebrow}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[9px] font-mono font-bold uppercase tracking-widest">
            {dictionary.hero.status}
          </span>
        </div>

        <h1
          className="font-display font-light leading-none"
          style={{ fontSize: "clamp(64px, 10vw, 120px)", letterSpacing: "-0.03em" }}
        >
          Jader{" "}
          <em style={{ color: "var(--text-dim)" }}>Germano</em>
        </h1>

        <div className="h-px w-20" style={{ background: "var(--accent)" }} />

        <p className="text-lg max-w-xl font-light leading-relaxed" style={{ color: "var(--text-dim)" }}>
          {dictionary.hero.summary}{" "}
          <span className="text-white font-medium">{dictionary.hero.emphasis}</span>.
        </p>

        <div className="flex flex-wrap gap-3 pt-4">
          {["Java", "Node.js", "Angular", "React", "Docker · Kubernetes"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest"
              style={{ border: "1px solid var(--border-strong)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-10 left-8 md:left-20 text-[9px] font-mono uppercase tracking-[0.8em] z-10"
        style={{ color: "var(--text-faint)" }}
      >
        {dictionary.hero.scroll}
      </motion.div>
    </section>
  );
}
