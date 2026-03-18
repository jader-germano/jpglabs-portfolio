import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Cpu, Database, ExternalLink, Network } from 'lucide-react';
import { buildServiceRoute, ROUTES } from '../config/routes';
import { SERVICE_CATALOG } from '../data/services';

const Overview: React.FC = () => {
  const avgCpu = Math.round(
    SERVICE_CATALOG.reduce((total, service) => total + service.cpuPercent, 0) / SERVICE_CATALOG.length,
  );
  const avgMemoryGb = (
    SERVICE_CATALOG.reduce((total, service) => total + service.memoryMb, 0) / SERVICE_CATALOG.length / 1024
  ).toFixed(1);
  const avgDisk = Math.round(
    SERVICE_CATALOG.reduce((total, service) => total + service.diskPercent, 0) / SERVICE_CATALOG.length,
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
          VPS <span className="text-blue-500 italic">Overview</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-bold">
          Hostinger-style operational snapshot
        </p>
      </div>

      <section className="rounded-[32px] border border-white/5 bg-[#111214]/50 p-8 backdrop-blur-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <Cpu size={16} className="text-blue-500" />
              <span className="text-[10px] font-black text-blue-500 uppercase">CPU</span>
            </div>
            <p className="text-2xl font-black text-white">{avgCpu}%</p>
          </div>
          <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <Database size={16} className="text-purple-500" />
              <span className="text-[10px] font-black text-purple-500 uppercase">RAM</span>
            </div>
            <p className="text-2xl font-black text-white">{avgMemoryGb}GB</p>
          </div>
          <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <Network size={16} className="text-green-500" />
              <span className="text-[10px] font-black text-green-500 uppercase">Disk</span>
            </div>
            <p className="text-2xl font-black text-white">{avgDisk}%</p>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/5 bg-[#111214]/50 p-8 backdrop-blur-sm">
        <h2 className="font-black text-white uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
          <Activity size={16} className="text-blue-500" /> Active Services
        </h2>

        <div className="space-y-4">
          {SERVICE_CATALOG.map((service) => (
            <Link
              key={service.id}
              to={buildServiceRoute(service.slug)}
              className="rounded-2xl border border-white/5 bg-black/30 p-4 flex items-center justify-between hover:border-blue-500/40 transition-all"
            >
              <div>
                <p className="text-sm font-black text-white uppercase tracking-tight">{service.name}</p>
                <p className="text-xs text-gray-500 mt-1">{service.publicSummary}</p>
              </div>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest inline-flex items-center gap-2">
                Details <ExternalLink size={12} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <Link
            to={ROUTES.dashboardInstances}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 hover:text-white transition-all inline-flex items-center gap-2"
          >
            Open Instances Dashboard <ExternalLink size={12} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Overview;
