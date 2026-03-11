import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, Server, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildServiceRoute } from '../config/routes';
import { formatPublicUsage, SERVICE_CATALOG } from '../data/services';
import { useAuth } from '../context/AuthContext';

const Instances: React.FC = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
            Instances <span className="text-gray-600 italic">& Services</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-bold">
            Real-time VPS cluster monitoring
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
            <input
              type="text"
              placeholder="SEARCH SERVICE..."
              className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-blue-500 transition-all w-64"
            />
          </div>
          <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-500 hover:text-white transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICE_CATALOG.map((service) => (
          <motion.article
            key={service.id}
            whileHover={{ y: -5 }}
            className="rounded-[32px] border border-white/5 bg-[#111214]/50 p-8 backdrop-blur-sm hover:border-blue-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                <Server size={24} />
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    service.status === 'online'
                      ? 'bg-green-500'
                      : service.status === 'warning'
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                  } animate-pulse`}
                />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{service.status}</span>
              </div>
            </div>

            <h2 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{service.name}</h2>
            <p className="text-xs text-gray-500 mb-6 min-h-10" title={service.tooltip}>
              {service.publicSummary}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <p className="text-[9px] font-black text-gray-600 uppercase mb-1">CPU Usage</p>
                <p className="text-lg font-black text-white">
                  {isAdmin ? `${service.cpuPercent}%` : formatPublicUsage(service.cpuPercent)}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <p className="text-[9px] font-black text-gray-600 uppercase mb-1">Memory</p>
                <p className="text-lg font-black text-white">{isAdmin ? `${service.memoryMb}MB` : 'Public Tier'}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                {isAdmin ? `${service.pods} PODS ACTIVE` : 'SANITIZED VIEW'}
              </span>
              <Link
                to={buildServiceRoute(service.slug)}
                className="text-gray-700 group-hover:text-blue-500 transition-colors inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
              >
                Details <Terminal size={14} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Instances;
