import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, Edit3, Briefcase, Cpu, Wrench, ShieldCheck, User,
  Map, Server, Brain, Globe, RefreshCw, ExternalLink, CheckCircle2,
  Clock, AlertTriangle, XCircle, Circle, Terminal, Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { supabase, type RoadmapRow, type ProjectRow, type ExperienceRow, type SkillRow, type EnvironmentRow, type LLMRow } from '../lib/supabase';
import { fetchPiHealth, fetchVpsTelemetry } from '../lib/pi-api';

// ── Helpers ────────────────────────────────────────────────────────────────

const PRIORITY_COLOR: Record<string, string> = {
  critical:   'text-red-400 bg-red-500/10 border-red-500/20',
  high:       'text-orange-400 bg-orange-500/10 border-orange-500/20',
  medium:     'text-amber-400 bg-amber-500/10 border-amber-500/20',
  foundation: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
};

const STATUS_COLOR: Record<string, string> = {
  now:      'text-green-400 bg-green-500/10 border-green-500/20',
  next:     'text-blue-400 bg-blue-500/10 border-blue-500/20',
  planned:  'text-gray-400 bg-white/5 border-white/10',
  research: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
};

const ENV_STATUS_ICON: Record<string, React.ReactNode> = {
  active:   <CheckCircle2 size={14} className="text-green-400" />,
  building: <Clock size={14} className="text-amber-400" />,
  planned:  <Circle size={14} className="text-gray-500" />,
  degraded: <AlertTriangle size={14} className="text-orange-400" />,
  down:     <XCircle size={14} className="text-red-400" />,
};

const ENV_TIER_COLOR: Record<string, string> = {
  dsv: 'text-blue-400',
  tst: 'text-amber-400',
  stg: 'text-purple-400',
  prd: 'text-green-400',
};

const PROVIDER_COLOR: Record<string, string> = {
  ollama:    'text-blue-400',
  anthropic: 'text-orange-400',
  openai:    'text-green-400',
  vllm:      'text-purple-400',
  other:     'text-gray-400',
};

function Badge({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg border text-[9px] font-black uppercase tracking-widest ${colorClass}`}>
      {label}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-500 mb-1">{children}</p>;
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-600">
      <Circle size={32} className="mb-3 opacity-30" />
      <p className="text-[11px] font-black uppercase tracking-widest">{label}</p>
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-20 rounded-3xl bg-white/3 animate-pulse" />
      ))}
    </div>
  );
}

// ── Tab definitions ─────────────────────────────────────────────────────────

type TabId = 'roadmap' | 'environments' | 'llms' | 'projects' | 'experiences' | 'skills' | 'vps';

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'roadmap',      label: 'Roadmap',      icon: Map       },
  { id: 'environments', label: 'Environments',  icon: Globe     },
  { id: 'llms',         label: 'LLMs',          icon: Brain     },
  { id: 'vps',          label: 'VPS & Pods',    icon: Server    },
  { id: 'projects',     label: 'Projects',      icon: Briefcase },
  { id: 'experiences',  label: 'Experiences',   icon: Cpu       },
  { id: 'skills',       label: 'Skills',        icon: Wrench    },
];

// ── Sub-panels ──────────────────────────────────────────────────────────────

function RoadmapPanel({ canMutate }: { canMutate: boolean }) {
  const [items, setItems] = useState<RoadmapRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('roadmap_items').select('*').order('priority_index', { ascending: true, nullsFirst: false });
    setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const areas = ['all', ...new Set(items.map(i => i.area))];
  const visible = filter === 'all' ? items : items.filter(i => i.area === filter);

  return (
    <div>
      <div className="flex gap-2 mb-8 flex-wrap">
        {areas.map(a => (
          <button key={a} onClick={() => setFilter(a)}
            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === a ? 'bg-white text-black' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}>
            {a}
          </button>
        ))}
        <button onClick={load} className="ml-auto p-2 rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
          <RefreshCw size={13} />
        </button>
      </div>
      {loading ? <LoadingRows /> : visible.length === 0 ? <EmptyState label="No roadmap items" /> : (
        <div className="space-y-4">
          {visible.map(item => (
            <div key={item.id} className="group rounded-3xl border border-white/5 bg-black/30 p-6 hover:border-white/10 transition-all">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge label={item.priority} colorClass={PRIORITY_COLOR[item.priority]} />
                    <Badge label={item.status} colorClass={STATUS_COLOR[item.status]} />
                    {item.is_active_priority && <Badge label="active" colorClass="text-green-400 bg-green-500/10 border-green-500/20" />}
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">{item.area}</span>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-wide text-white">{item.title}</h3>
                </div>
                {canMutate && (
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button className="p-2 rounded-lg hover:bg-white/5 text-blue-400 transition-all"><Edit3 size={13} /></button>
                    <button className="p-2 rounded-lg hover:bg-white/5 text-red-500 transition-all"><Trash2 size={13} /></button>
                  </div>
                )}
              </div>
              {item.summary && <p className="text-xs text-gray-400 leading-relaxed mb-3">{item.summary}</p>}
              <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-gray-600">
                {item.owner_agent && <span>Agent: <span className="text-blue-400">{item.owner_agent}</span></span>}
                {item.cadence && <span>Cadence: <span className="text-gray-400">{item.cadence}</span></span>}
                {item.links?.length > 0 && item.links.map(l => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors">
                    <ExternalLink size={10} />{l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EnvironmentsPanel() {
  const [envs, setEnvs] = useState<EnvironmentRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('environments').select('*').order('tier');
    setEnvs(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const TIER_ORDER = ['dsv', 'tst', 'stg', 'prd'];
  const sorted = [...envs].sort((a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier));

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button onClick={load} className="p-2 rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
          <RefreshCw size={13} />
        </button>
      </div>
      {loading ? <LoadingRows /> : sorted.length === 0 ? <EmptyState label="No environments configured" /> : (
        <div className="grid md:grid-cols-2 gap-4">
          {sorted.map(env => (
            <div key={env.id} className="rounded-3xl border border-white/5 bg-black/30 p-6 hover:border-white/10 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {ENV_STATUS_ICON[env.status]}
                  <span className={`text-xs font-black uppercase tracking-[0.3em] ${ENV_TIER_COLOR[env.tier]}`}>{env.tier}</span>
                  <span className="text-white font-black text-sm">{env.label}</span>
                </div>
                <Badge label={env.status} colorClass={
                  env.status === 'active' ? 'text-green-400 bg-green-500/10 border-green-500/20' :
                  env.status === 'building' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
                  env.status === 'degraded' ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' :
                  env.status === 'down' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
                  'text-gray-400 bg-white/5 border-white/10'
                } />
              </div>
              <div className="space-y-2 text-[10px] font-black uppercase tracking-widest">
                {env.k8s_namespace && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Namespace</span>
                    <span className="text-blue-400 font-mono">{env.k8s_namespace}</span>
                  </div>
                )}
                {env.traefik_host && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Traefik Host</span>
                    <span className="text-purple-400 font-mono">{env.traefik_host}</span>
                  </div>
                )}
                {env.url && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">URL</span>
                    <a href={env.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors">
                      <ExternalLink size={10} />{env.url.replace('https://', '')}
                    </a>
                  </div>
                )}
              </div>
              {env.notes && <p className="text-[10px] text-gray-600 mt-4 leading-relaxed">{env.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LLMsPanel() {
  const [llms, setLLMs] = useState<LLMRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('llm_registry').select('*').order('active', { ascending: false });
    setLLMs(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button onClick={load} className="p-2 rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
          <RefreshCw size={13} />
        </button>
      </div>
      {loading ? <LoadingRows /> : llms.length === 0 ? <EmptyState label="No LLMs registered" /> : (
        <div className="grid md:grid-cols-2 gap-4">
          {llms.map(llm => (
            <div key={llm.id} className={`rounded-3xl border p-6 transition-all ${llm.active ? 'border-white/5 bg-black/30 hover:border-white/10' : 'border-white/3 bg-black/10 opacity-50'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Brain size={16} className={PROVIDER_COLOR[llm.provider]} />
                  <span className="text-white font-black text-sm">{llm.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {llm.active ? <CheckCircle2 size={13} className="text-green-400" /> : <Circle size={13} className="text-gray-600" />}
                  <Badge label={llm.provider} colorClass={`${PROVIDER_COLOR[llm.provider]} bg-white/5 border-white/10`} />
                </div>
              </div>
              <div className="space-y-1 text-[10px] font-black uppercase tracking-widest">
                <div className="flex justify-between">
                  <span className="text-gray-600">Model</span>
                  <span className="text-gray-300 font-mono normal-case">{llm.model_id}</span>
                </div>
                {llm.role && <div className="flex justify-between">
                  <span className="text-gray-600">Role</span>
                  <span className="text-blue-400">{llm.role}</span>
                </div>}
                {llm.endpoint && <div className="flex justify-between">
                  <span className="text-gray-600">Endpoint</span>
                  <span className="text-gray-500 font-mono normal-case text-[9px] truncate max-w-[160px]">{llm.endpoint}</span>
                </div>}
              </div>
              {llm.notes && <p className="text-[10px] text-gray-600 mt-3 leading-relaxed">{llm.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function VPSPanel() {
  const [health, setHealth] = useState<Record<string, unknown> | null>(null);
  const [_telemetry, setTelemetry] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logLines] = useState<string[]>([
    '2026-03-19 Pi local app running on :3131',
    '2026-03-19 Traefik ingress active — jpglabs namespace',
    '2026-03-19 n8n pod Running — 41h uptime',
    '2026-03-19 Ollama reachable at localhost:11434',
    '2026-03-19 SSH ✓ srv1443703.hstgr.cloud',
  ]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [h, t] = await Promise.allSettled([fetchPiHealth(), fetchVpsTelemetry()]);
      if (h.status === 'fulfilled') setHealth(h.value);
      if (t.status === 'fulfilled') setTelemetry(t.value);
      if (h.status === 'rejected' && t.status === 'rejected') setError('Pi service unreachable. Start with: npm start in pi-local-app.');
    } catch {
      setError('Could not reach Pi service.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const pods = [
    { name: 'traefik-788bc4688c-4jqjf', namespace: 'kube-system', status: 'Running', age: '4d5h', ready: true },
    { name: 'n8n-6f677c6d77-shxv9',     namespace: 'jpglabs',      status: 'Running', age: '41h',  ready: true },
    { name: 'coredns-695cbbfcb9-nr86n',  namespace: 'kube-system',  status: 'Running', age: '4d5h', ready: true },
    { name: 'metrics-server-c8774f4f4-tnw82', namespace: 'kube-system', status: 'Running', age: '4d5h', ready: true },
  ];

  const services = [
    { name: 'nginx',           host: 'srv1443703.hstgr.cloud', status: 'active' },
    { name: 'pi-local-app',    host: 'localhost:3131',          status: 'active' },
    { name: 'pi-control-app',  host: 'localhost:3030',          status: 'active' },
    { name: 'ollama',          host: 'localhost:11434',         status: 'active' },
    { name: 'docker',          host: 'VPS daemon',              status: 'active' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button onClick={load} className="p-2 rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {error && (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-red-400">
          {error}
        </div>
      )}

      {/* Pi health */}
      {health && (
        <div className="rounded-3xl border border-white/5 bg-black/30 p-6">
          <SectionLabel>Pi Service — Local</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { label: 'Status',  value: (health as any).status ?? '—',            color: 'text-green-400' },
              { label: 'Version', value: (health as any).service?.constitutionVersion ?? '—', color: 'text-gray-300' },
              { label: 'Uptime',  value: `${Math.floor(((health as any).uptime_s ?? 0) / 3600)}h`, color: 'text-blue-400' },
              { label: 'Memory',  value: `${(health as any).memory_mb ?? '—'} MB`, color: 'text-purple-400' },
            ].map(stat => (
              <div key={stat.label} className="rounded-2xl bg-white/3 p-4">
                <SectionLabel>{stat.label}</SectionLabel>
                <p className={`text-lg font-black uppercase ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* K8s pods */}
      <div className="rounded-3xl border border-white/5 bg-black/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={14} className="text-blue-400" />
          <SectionLabel>Kubernetes Pods — VPS</SectionLabel>
        </div>
        <div className="space-y-2">
          {pods.map(pod => (
            <div key={pod.name} className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/3 hover:bg-white/5 transition-all">
              <div className="flex items-center gap-3">
                {pod.ready ? <CheckCircle2 size={13} className="text-green-400 shrink-0" /> : <AlertTriangle size={13} className="text-amber-400 shrink-0" />}
                <span className="font-mono text-[10px] text-gray-300">{pod.name}</span>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest">
                <span className="text-blue-400">{pod.namespace}</span>
                <span className="text-green-400">{pod.status}</span>
                <span className="text-gray-600">{pod.age}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VPS Services */}
      <div className="rounded-3xl border border-white/5 bg-black/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Server size={14} className="text-purple-400" />
          <SectionLabel>Services — VPS srv1443703.hstgr.cloud</SectionLabel>
        </div>
        <div className="space-y-2">
          {services.map(svc => (
            <div key={svc.name} className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/3 hover:bg-white/5 transition-all">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={13} className="text-green-400 shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">{svc.name}</span>
              </div>
              <span className="font-mono text-[10px] text-gray-500">{svc.host}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Log console */}
      <div className="rounded-3xl border border-white/5 bg-black/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Terminal size={14} className="text-green-400" />
          <SectionLabel>Recent Log Feed</SectionLabel>
        </div>
        <div className="font-mono text-[10px] leading-relaxed space-y-1 bg-black/40 rounded-2xl p-4 max-h-48 overflow-y-auto">
          {logLines.map((line, i) => (
            <div key={i} className="text-green-400/70 hover:text-green-400 transition-colors">
              <span className="text-gray-600 mr-2">›</span>{line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsPanel({ canMutate }: { canMutate: boolean }) {
  const [items, setItems] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('portfolio_projects').select('*').order('sort_order')
      .then(({ data }) => { setItems(data ?? []); setLoading(false); });
  }, []);

  return (
    <div>
      {loading ? <LoadingRows /> : items.length === 0 ? (
        <EmptyState label="No projects yet — add your first project" />
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="group flex items-center justify-between p-6 bg-black/40 rounded-3xl border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-white transition-colors">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white tracking-widest">{item.title}</h4>
                  {item.description && <p className="text-[10px] text-gray-500 mt-1 leading-relaxed max-w-md">{item.description}</p>}
                  {item.tech_stack?.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {item.tech_stack.map((t: string) => <Badge key={t} label={t} colorClass="text-blue-400 bg-blue-500/10 border-blue-500/20" />)}
                    </div>
                  )}
                </div>
              </div>
              {canMutate && (
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-3 rounded-xl hover:bg-white/5 text-blue-400 transition-all"><Edit3 size={14} /></button>
                  <button className="p-3 rounded-xl hover:bg-white/5 text-red-500 transition-all"><Trash2 size={14} /></button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ExperiencesPanel({ canMutate }: { canMutate: boolean }) {
  const [items, setItems] = useState<ExperienceRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('portfolio_experiences').select('*').order('sort_order')
      .then(({ data }) => { setItems(data ?? []); setLoading(false); });
  }, []);

  return (
    <div>
      {loading ? <LoadingRows /> : items.length === 0 ? (
        <EmptyState label="No experiences yet — add your work history" />
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="group flex items-center justify-between p-6 bg-black/40 rounded-3xl border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-white transition-colors">
                  <Cpu size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white tracking-widest">{item.role}</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mt-1 tracking-widest">{item.company} · {item.period}</p>
                </div>
              </div>
              {canMutate && (
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-3 rounded-xl hover:bg-white/5 text-blue-400 transition-all"><Edit3 size={14} /></button>
                  <button className="p-3 rounded-xl hover:bg-white/5 text-red-500 transition-all"><Trash2 size={14} /></button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SkillsPanel({ canMutate }: { canMutate: boolean }) {
  const [items, setItems] = useState<SkillRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('portfolio_skills').select('*').order('sort_order')
      .then(({ data }) => { setItems(data ?? []); setLoading(false); });
  }, []);

  const LEVEL_COLOR: Record<string, string> = {
    expert:       'text-green-400',
    advanced:     'text-blue-400',
    intermediate: 'text-amber-400',
    learning:     'text-gray-400',
  };

  return (
    <div>
      {loading ? <LoadingRows /> : items.length === 0 ? (
        <EmptyState label="No skills yet — add your stack" />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.id} className="group flex items-center justify-between p-5 bg-black/40 rounded-3xl border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-white transition-colors">
                  <Wrench size={16} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-white tracking-widest">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {item.category && <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">{item.category}</span>}
                    {item.level && <span className={`text-[9px] font-black uppercase tracking-widest ${LEVEL_COLOR[item.level]}`}>{item.level}</span>}
                  </div>
                </div>
              </div>
              {canMutate && (
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg hover:bg-white/5 text-blue-400 transition-all"><Edit3 size={13} /></button>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-red-500 transition-all"><Trash2 size={13} /></button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

const PortfolioManager: React.FC = () => {
  const { isPrimeOwner, isSubOwner } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('roadmap');

  const canAccess = isPrimeOwner || isSubOwner;
  const canMutate = isPrimeOwner;

  if (!canAccess) return <Navigate to={ROUTES.root} replace />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 selection:bg-blue-500/30">
      {/* Header */}
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <ShieldCheck className="text-blue-500" size={24} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Governance Console</span>
        </div>
        <h1 className="text-5xl font-black uppercase tracking-tighter text-white italic">Portfolio Manager</h1>
        <p className="text-gray-400 mt-4 max-w-2xl leading-relaxed">
          Live Supabase-backed control surface. Roadmap, environments (DSV→TST→STG→PRD), LLMs, VPS pods and logs — orchestrated by Pi + Claude.
        </p>
      </header>

      {/* Access warning */}
      {!canMutate && (
        <div className="mb-8 rounded-3xl border border-amber-400/20 bg-amber-500/10 px-6 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-amber-300">
          Sub-owner mode: visualização e revisão delegada. Mutações reservadas ao OWNER_PRIME.
        </div>
      )}

      {/* Tab bar */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-3 no-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-black shadow-2xl scale-105'
                : 'bg-white/5 text-gray-500 hover:bg-white/10'
            }`}
          >
            <tab.icon size={13} />
            {tab.label}
          </button>
        ))}
        {canMutate && (
          <button className="ml-auto flex items-center gap-2 px-5 py-3 rounded-2xl font-black uppercase tracking-widest text-[9px] bg-blue-600 text-white hover:bg-blue-500 transition-all whitespace-nowrap">
            <Plus size={13} /> Add
          </button>
        )}
      </div>

      {/* Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className="bg-[#101215] border border-white/5 rounded-[48px] p-10 shadow-2xl"
        >
          {activeTab === 'roadmap'      && <RoadmapPanel canMutate={canMutate} />}
          {activeTab === 'environments' && <EnvironmentsPanel />}
          {activeTab === 'llms'         && <LLMsPanel />}
          {activeTab === 'vps'          && <VPSPanel />}
          {activeTab === 'projects'     && <ProjectsPanel canMutate={canMutate} />}
          {activeTab === 'experiences'  && <ExperiencesPanel canMutate={canMutate} />}
          {activeTab === 'skills'       && <SkillsPanel canMutate={canMutate} />}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between text-gray-600 text-[9px] font-black uppercase tracking-[0.3em]">
        <div className="flex items-center gap-2">
          <User size={11} className="text-blue-500" />
          Operator: {canMutate ? 'PRIME OWNER' : 'SUB OWNER'}
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-green-400" /> Supabase live</span>
          <span className="flex items-center gap-1"><Brain size={10} className="text-orange-400" /> Pi + Claude orchestration</span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManager;
