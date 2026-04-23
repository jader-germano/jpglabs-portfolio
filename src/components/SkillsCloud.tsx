import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageProvider";

const skillGroups = [
  {
    categoryKey: "backend",
    color: "border-red-600/30 text-red-400",
    skills: ["Java", "Node.js", "Express", "Spring Boot", "Maven", "Oracle", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    categoryKey: "frontend",
    color: "border-orange-500/30 text-orange-400",
    skills: ["Angular", "React", "Ember.js", "TypeScript", "JavaScript"],
  },
  {
    categoryKey: "devops",
    color: "border-emerald-500/30 text-emerald-400",
    skills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Azure DevOps", "GitLab CI/CD", "Git Flow"],
  },
  {
    categoryKey: "aiAutomation",
    color: "border-violet-500/30 text-violet-400",
    skills: ["JUnit", "Jest", "Karma", "Selenium", "Scrum", "Kanban"],
  },
] as const;

export default function SkillsCloud() {
  const { dictionary } = useLanguage();

  return (
    <section className="py-32 px-8 md:px-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: "var(--accent)" }}>
          {dictionary.skills.eyebrow}
        </span>
        <h2 className="text-5xl md:text-6xl font-display font-light tracking-tighter mt-3">
          {dictionary.skills.title}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.categoryKey}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.1 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
          >
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600 mb-4">
              {dictionary.skills.categories[group.categoryKey]}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.05 + si * 0.03 }}
                  className={`px-3 py-1 rounded-full border text-xs font-medium ${group.color} bg-white/[0.02]`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
