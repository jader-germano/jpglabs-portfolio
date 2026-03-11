import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Link as LinkIcon, UserRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import Hub from './Hub';

const toDisplayName = (slug: string): string =>
  slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const Portfolio: React.FC = () => {
  const { userSlug } = useParams<{ userSlug: string }>();
  const resolvedSlug = userSlug || 'jader-germano';

  if (resolvedSlug === 'jader-germano') {
    return <Hub />;
  }

  const displayName = toDisplayName(resolvedSlug);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[40px] border border-white/5 bg-[#111214]/50 p-10 backdrop-blur-sm"
      >
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 mb-8">
          <UserRound size={30} />
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-3">Dynamic Portfolio Route</p>
        <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-4">{displayName}</h1>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          This public portfolio page is generated from resume uploads and mapped to
          <span className="text-white font-bold"> /portifolio/{resolvedSlug}</span>.
          You can use the same route pattern to publish contractor profiles with custom content.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="rounded-2xl border border-white/5 bg-black/30 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2">Current Route</p>
            <p className="text-sm text-gray-300 font-mono inline-flex items-center gap-2">
              <LinkIcon size={14} className="text-blue-500" /> /portifolio/{resolvedSlug}
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-black/30 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2">Public Visibility</p>
            <p className="text-sm text-gray-300 inline-flex items-center gap-2">
              <FileText size={14} className="text-blue-500" /> Available without authentication
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to={ROUTES.services}
            className="px-6 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all"
          >
            View Services
          </Link>
          <Link
            to={ROUTES.offer}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
          >
            Open Offer
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Portfolio;
