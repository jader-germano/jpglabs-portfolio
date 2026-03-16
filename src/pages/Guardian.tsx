import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, Terminal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type GuardianData = {
  lastScan: string;
  threats: number;
  firewallStatus: 'ACTIVE' | 'DOWN';
  sslDaysLeft: number;
  failedLogins: number;
  activeLocks: number;
  recentLogs: Array<{ id: string; time: string; event: string; severity: 'INFO' | 'WARN' | 'CRITICAL' }>;
};

const Guardian: React.FC = () => {
  const { isPrimeOwner } = useAuth();
  const [data, setData] = useState<GuardianData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, fetch from Pi Service /system/security
    setTimeout(() => {
      setData({
        lastScan: new Date().toLocaleTimeString(),
        threats: 0,
        firewallStatus: 'ACTIVE',
        sslDaysLeft: 340,
        failedLogins: 12,
        activeLocks: 1,
        recentLogs: [
          { id: '1', time: '14:20:00', event: 'Admin authentication bypass attempted via SSH.', severity: 'WARN' },
          { id: '2', time: '14:15:33', event: 'UFW blocking excessive connections from 182.xx.xx.xx.', severity: 'INFO' },
          { id: '3', time: '12:00:00', event: 'Automated LGPD audit routine completed successfully.', severity: 'INFO' },
        ]
      });
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 selection:bg-red-500/30">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">Security Posture</span>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter mt-2">
            Guardian <span className="text-gray-600 italic">Matrix</span>
          </h1>
          <p className="text-gray-500 text-sm mt-4 uppercase tracking-widest font-bold max-w-xl">
            Threat detection, firewall status, and authentication audits.
          </p>
        </div>
      </div>

      {loading && !data ? (
        <div className="h-64 flex items-center justify-center border border-white/5 rounded-[40px] bg-[#101215]/50">
          <div className="animate-pulse text-red-500"><ShieldCheck size={40} /></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#101215]/80 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 text-white/5"><ShieldAlert size={120} /></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6 text-green-500">
                  <ShieldCheck size={24} />
                  <h3 className="text-xs font-black uppercase tracking-widest">System Integrity</h3>
                </div>
                <div className="space-y-4 font-mono text-xs mt-8">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5 text-gray-300">
                    <span className="uppercase text-gray-500 font-bold">Firewall (UFW)</span>
                    <span className="text-green-500 font-black">{data?.firewallStatus}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5 text-gray-300">
                    <span className="uppercase text-gray-500 font-bold">SSL Certificate</span>
                    <span className="text-blue-500 font-black">VALID ({data?.sslDaysLeft} DAYS)</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5 text-gray-300">
                    <span className="uppercase text-gray-500 font-bold">Failed Logins</span>
                    <span className="text-orange-500 font-black">{data?.failedLogins} Attempts</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5 text-gray-300">
                    <span className="uppercase text-gray-500 font-bold">Active IP Locks</span>
                    <span className="text-red-500 font-black">{data?.activeLocks} Blocked</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 p-8 rounded-[32px] backdrop-blur-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 mb-2">Last Scan: {data?.lastScan}</p>
              <h4 className="text-2xl font-black text-white uppercase tracking-tight">0 Critical Threats</h4>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">Continuous background scanning by Monarx Agent is operational.</p>
            </div>
          </div>

          <div className="lg:col-span-8 bg-[#101215]/80 border border-white/5 rounded-[40px] p-10 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                <Activity size={20} className="text-red-500" /> Security Event Log
              </h2>
              {isPrimeOwner && (
                <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">
                  Export JSON
                </button>
              )}
            </div>

            <div className="space-y-4">
              {data?.recentLogs.map((log) => (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-black/40 border border-white/5 rounded-3xl"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 shrink-0">
                    {log.severity === 'CRITICAL' ? <AlertTriangle className="text-red-500" size={18} /> : 
                     log.severity === 'WARN' ? <ShieldAlert className="text-orange-500" size={18} /> : 
                     <CheckCircle2 className="text-green-500" size={18} />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${
                        log.severity === 'CRITICAL' ? 'text-red-500' : log.severity === 'WARN' ? 'text-orange-500' : 'text-green-500'
                      }`}>
                        {log.severity}
                      </span>
                      <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{log.time}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-300">{log.event}</p>
                  </div>
                  
                  {isPrimeOwner && (
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-500 hover:text-white transition-all shrink-0">
                      <Terminal size={14} />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <Link to="/pi" className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-all">
                Open Advanced Firewall Rules (Pi Service) &rarr;
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Guardian;
