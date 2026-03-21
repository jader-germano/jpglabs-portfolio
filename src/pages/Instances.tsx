import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Server, Terminal, Cpu, MemoryStick, Activity, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type VpsTelemetry = {
  hostname: string;
  uptime: string;
  cpuUsage: number;
  memTotal: string;
  memUsed: string;
  pods: Array<{
    name: string;
    status: string;
    restarts: number;
    age: string;
    namespace: string;
  }>;
};

const Instances: React.FC = () => {
  const { isRootAdmin } = useAuth();
  const [telemetry, setTelemetry] = useState<VpsTelemetry | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchTelemetry = () => {
    setLoading(true);
    // In a real scenario, this hits the Pi Service /vps/telemetry endpoint.
    // For now, we simulate the real data structure that Pi Service will provide.
    setTimeout(() => {
      setTelemetry({
        hostname: 'srv1443703',
        uptime: '14 days, 2 hours',
        cpuUsage: 12.4,
        memTotal: '32GB',
        memUsed: '4.2GB',
        pods: [
          { name: 'pi-local-app', status: 'Running', restarts: 0, age: '2d', namespace: 'default' },
          { name: 'pi-control-app', status: 'Running', restarts: 1, age: '2d', namespace: 'default' },
          { name: 'nginx-edge', status: 'Running', restarts: 0, age: '14d', namespace: 'kube-system' },
          { name: 'supabase-db', status: 'Running', restarts: 0, age: '14d', namespace: 'data' },
          { name: 'ollama-runtime', status: 'Running', restarts: 2, age: '5d', namespace: 'ai' },
        ]
      });
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchTelemetry();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const filteredPods = telemetry?.pods.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 selection:bg-blue-500/30">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Live Telemetry</span>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter mt-2">
            VPS <span className="text-gray-600 italic">Cluster</span>
          </h1>
          <p className="text-gray-500 text-sm mt-4 uppercase tracking-widest font-bold max-w-xl">
            Maximum state visibility of JPGLabs infrastructure. SSH access deprecated in favor of Pi-Service integration.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Pesquisar Pods..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#101215]/80 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-xs font-black uppercase tracking-widest text-white outline-none focus:border-blue-500/50 transition-all w-72 backdrop-blur-xl shadow-2xl"
            />
          </div>
          <button onClick={fetchTelemetry} className="p-4 rounded-2xl bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all shadow-xl">
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {loading && !telemetry ? (
        <div className="h-64 flex items-center justify-center border border-white/5 rounded-[40px] bg-[#101215]/50">
          <div className="animate-spin text-blue-500"><Activity size={32} /></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#101215]/80 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-4 mb-6 text-blue-400">
                <Server size={24} />
                <h3 className="text-xs font-black uppercase tracking-widest">Host Status</h3>
              </div>
              <p className="text-3xl font-black text-white uppercase tracking-tighter mb-2">{telemetry?.hostname}</p>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Uptime: {telemetry?.uptime}</p>
            </div>

            <div className="bg-[#101215]/80 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-4 mb-6 text-orange-400">
                <Cpu size={24} />
                <h3 className="text-xs font-black uppercase tracking-widest">CPU Load</h3>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <p className="text-4xl font-black text-white tracking-tighter">{telemetry?.cpuUsage}%</p>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold pb-1">/ 8 Cores</span>
              </div>
              <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-orange-500 h-full" style={{ width: `${telemetry?.cpuUsage}%` }} />
              </div>
            </div>

            <div className="bg-[#101215]/80 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-4 mb-6 text-purple-400">
                <MemoryStick size={24} />
                <h3 className="text-xs font-black uppercase tracking-widest">Memory (RAM)</h3>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <p className="text-4xl font-black text-white tracking-tighter">{telemetry?.memUsed}</p>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold pb-1">/ {telemetry?.memTotal}</span>
              </div>
              <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full" style={{ width: '15%' }} />
              </div>
            </div>
          </div>

          <div className="bg-[#101215]/80 border border-white/5 rounded-[40px] p-10 backdrop-blur-xl shadow-2xl">
            <h2 className="text-xl font-black uppercase tracking-tight text-white mb-8 flex items-center gap-3">
              <Terminal size={20} className="text-blue-500" /> Active Workloads (Pods)
            </h2>
            
            <div className="space-y-4">
              {filteredPods.map((pod) => (
                <motion.div 
                  key={pod.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-black/40 border border-white/5 rounded-3xl hover:border-blue-500/30 transition-all group"
                >
                  <div className="flex items-center gap-6 mb-4 md:mb-0">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <div>
                      <p className="text-lg font-black text-white uppercase tracking-tight">{pod.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Namespace: {pod.namespace}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black mb-1">Status</p>
                      <p className="text-xs text-green-400 font-bold uppercase tracking-widest">{pod.status}</p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black mb-1">Restarts</p>
                      <p className="text-xs text-white font-bold">{pod.restarts}</p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black mb-1">Age</p>
                      <p className="text-xs text-white font-bold">{pod.age}</p>
                    </div>
                    {isRootAdmin && (
                      <button className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white transition-all opacity-0 group-hover:opacity-100">
                        View Logs
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Instances;
