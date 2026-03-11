import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, ExternalLink, ShieldCheck, Terminal } from 'lucide-react';
import { buildServiceRoute, ROUTES } from '../config/routes';
import { SERVICE_CATALOG } from '../data/services';

const statusClass: Record<'online' | 'warning' | 'offline', string> = {
  online: 'text-green-500',
  warning: 'text-amber-500',
  offline: 'text-red-500',
};

const Guardian: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
          Guardian <span className="text-red-500 italic">Monitoring</span>
        </h1>
        <p className="text-gray-500 mt-3 text-sm uppercase tracking-widest font-bold">
          Security posture and service health for admin operations
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <section className="xl:col-span-4 rounded-[32px] border border-white/5 bg-[#111214]/50 p-8 backdrop-blur-sm">
          <h2 className="font-black text-white uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-500" /> Security Integrity
          </h2>
          <div className="space-y-4 font-mono text-xs">
            <div className="flex justify-between text-green-500"><span className="uppercase">Firewall</span><span>ACTIVE</span></div>
            <div className="flex justify-between text-green-500"><span className="uppercase">Intrusion Detection</span><span>MONITORING</span></div>
            <div className="flex justify-between text-blue-500"><span className="uppercase">SSL Certificates</span><span>VALID (340 days)</span></div>
            <div className="flex justify-between text-gray-500"><span className="uppercase">Last Scan</span><span>14:02:11</span></div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/5 bg-black/30 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2">Active Alerts</p>
            <p className="text-xs text-green-500">No critical threats detected in current scan window.</p>
          </div>
        </section>

        <section className="xl:col-span-8 rounded-[32px] border border-white/5 bg-[#111214]/50 p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-black text-white uppercase tracking-widest text-sm flex items-center gap-2">
              <Activity size={16} className="text-blue-500" /> Services Under Guardian
            </h2>
            <Link
              to={ROUTES.overview}
              className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-white transition-all inline-flex items-center gap-2"
            >
              VPS Overview <ExternalLink size={12} />
            </Link>
          </div>

          <div className="space-y-4">
            {SERVICE_CATALOG.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-white/5 bg-black/30 px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div>
                  <p className="text-white font-black uppercase tracking-tight text-sm">{service.name}</p>
                  <p className="text-gray-500 text-xs mt-1">{service.tooltip}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${statusClass[service.status]}`}>
                    {service.status}
                  </span>
                  <Link
                    to={buildServiceRoute(service.slug)}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all inline-flex items-center gap-2"
                  >
                    Pod Details <Terminal size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Guardian;
