import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Activity, ChevronLeft, Terminal } from 'lucide-react';
import { buildServiceRoute, ROUTES } from '../config/routes';
import { formatPublicUsage, getServiceBySlug, SERVICE_CATALOG } from '../data/services';
import { useAuth } from '../context/AuthContext';

const ServiceDetail: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const { isAdmin } = useAuth();

  const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;

  if (!service) {
    return <Navigate to={ROUTES.dashboardInstances} replace />;
  }

  const visibleCpu = isAdmin ? `${service.cpuPercent}%` : formatPublicUsage(service.cpuPercent);
  const visibleMemory = isAdmin ? `${service.memoryMb}MB` : 'Public Tier';
  const visibleDisk = isAdmin ? `${service.diskPercent}%` : 'Public Tier';

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link
        to={ROUTES.dashboardInstances}
        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all"
      >
        <ChevronLeft size={12} /> Back to Instances
      </Link>

      <header className="mt-6 mb-8">
        <h1 className="text-4xl font-black text-white uppercase tracking-tight">{service.name}</h1>
        <p className="text-gray-500 mt-2 text-sm">{service.tooltip}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-[#111214]/50 border border-white/5">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2">CPU</p>
          <p className="text-2xl font-black text-white">{visibleCpu}</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#111214]/50 border border-white/5">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2">Memory</p>
          <p className="text-2xl font-black text-white">{visibleMemory}</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#111214]/50 border border-white/5">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2">Disk</p>
          <p className="text-2xl font-black text-white">{visibleDisk}</p>
        </div>
      </div>

      <section className="rounded-[32px] border border-white/5 bg-[#111214]/50 p-8 backdrop-blur-sm">
        <h2 className="font-black text-white uppercase tracking-widest text-sm mb-5 flex items-center gap-2">
          <Terminal size={16} className="text-blue-500" /> Pod Inspection
        </h2>
        <div className="rounded-2xl bg-black p-6 border border-white/5 font-mono text-xs leading-relaxed overflow-x-auto">
          <div className="flex items-center gap-2 mb-4 text-gray-500 border-b border-white/5 pb-4">
            <Activity size={14} />
            <span className="uppercase tracking-widest font-bold">Terminal Output</span>
          </div>
          <pre className="text-blue-400 whitespace-pre-wrap">
            {isAdmin
              ? service.podDetails
              : `[SANITIZED VIEW]\n${service.publicSummary}\n\nPod-level inspection is restricted to ADMIN role.`}
          </pre>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-4">Other Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICE_CATALOG.filter((item) => item.slug !== service.slug).map((item) => (
            <Link
              key={item.id}
              to={buildServiceRoute(item.slug)}
              className="rounded-2xl border border-white/5 bg-black/30 p-4 hover:border-blue-500/40 transition-all"
            >
              <p className="text-sm font-black text-white uppercase tracking-tight">{item.name}</p>
              <p className="text-xs text-gray-500 mt-1">{item.publicSummary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
