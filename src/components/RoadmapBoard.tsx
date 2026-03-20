import { useState } from 'react';
import { ArrowUpRight, CircleDot, Filter } from 'lucide-react';
import {
  CURRENT_EXECUTION_PRIORITY_INDEX,
  ROADMAP_ITEMS,
  type RoadmapItem,
  type RoadmapPriority,
  type RoadmapStatus,
} from '../data/roadmap';

const priorityOrder: Record<RoadmapPriority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  foundation: 3,
};

const statusOrder: Record<RoadmapStatus, number> = {
  now: 0,
  next: 1,
  planned: 2,
  research: 3,
};

const priorityStyles: Record<RoadmapPriority, string> = {
  critical: 'border-red-500/20 bg-red-500/10 text-red-300',
  high: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
  medium: 'border-blue-500/20 bg-blue-500/10 text-blue-300',
  foundation: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
};

const statusStyles: Record<RoadmapStatus, string> = {
  now: 'text-white bg-white/10 border-white/10',
  next: 'text-blue-300 bg-blue-500/10 border-blue-500/10',
  planned: 'text-gray-300 bg-white/5 border-white/10',
  research: 'text-purple-300 bg-purple-500/10 border-purple-500/10',
};

interface RoadmapBoardProps {
  items?: RoadmapItem[];
  eyebrow?: string;
  titlePrefix?: string;
  titleAccent?: string;
  description?: string;
  showFilters?: boolean;
}

const RoadmapBoard = ({
  items = ROADMAP_ITEMS,
  eyebrow = 'Interactive Prioritization',
  titlePrefix = 'Continuous',
  titleAccent = 'Roadmap',
  description = 'This board turns the current JPG Labs priorities into executable tracks, with explicit agent ownership, dependencies and release intent.',
  showFilters = true,
}: RoadmapBoardProps) => {
  const [areaFilter, setAreaFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState<'all' | RoadmapPriority>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | RoadmapStatus>('all');

  const areas = showFilters ? ['All', ...new Set(items.map((item) => item.area))] : ['All'];

  const visibleItems = items.filter((item) => {
    const areaMatches = areaFilter === 'All' || item.area === areaFilter;
    const priorityMatches = priorityFilter === 'all' || item.priority === priorityFilter;
    const statusMatches = statusFilter === 'all' || item.status === statusFilter;
    return areaMatches && priorityMatches && statusMatches;
  }).sort((left, right) => {
    const leftExecutionIndex =
      CURRENT_EXECUTION_PRIORITY_INDEX[left.id as keyof typeof CURRENT_EXECUTION_PRIORITY_INDEX] ?? Number.MAX_SAFE_INTEGER;
    const rightExecutionIndex =
      CURRENT_EXECUTION_PRIORITY_INDEX[right.id as keyof typeof CURRENT_EXECUTION_PRIORITY_INDEX] ?? Number.MAX_SAFE_INTEGER;

    if (leftExecutionIndex !== rightExecutionIndex) {
      return leftExecutionIndex - rightExecutionIndex;
    }

    const priorityDelta = priorityOrder[left.priority] - priorityOrder[right.priority];
    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    return statusOrder[left.status] - statusOrder[right.status];
  });

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="max-w-3xl mb-14">
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-500 mb-4">{eyebrow}</p>
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-5">
          {titlePrefix} <span className="text-blue-500 italic">{titleAccent}</span>
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          {description}
        </p>
      </div>

      {showFilters ? (
      <div className="rounded-[32px] border border-white/5 bg-[#111214]/50 p-6 backdrop-blur-sm mb-10">
        <div className="flex items-center gap-3 mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
          <Filter size={14} className="text-blue-500" />
          Prioritization Controls
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="flex flex-wrap gap-2">
            {areas.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => setAreaFilter(area)}
                className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  areaFilter === area
                    ? 'border-blue-500/40 bg-blue-500/10 text-white'
                    : 'border-white/10 bg-white/5 text-gray-500 hover:text-gray-300'
                }`}
              >
                {area}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {(['all', 'critical', 'high', 'medium', 'foundation'] as const).map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => setPriorityFilter(priority)}
                className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  priorityFilter === priority
                    ? 'border-white/20 bg-white/10 text-white'
                    : 'border-white/10 bg-white/5 text-gray-500 hover:text-gray-300'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {(['all', 'now', 'next', 'planned', 'research'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  statusFilter === status
                    ? 'border-white/20 bg-white/10 text-white'
                    : 'border-white/10 bg-white/5 text-gray-500 hover:text-gray-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
      ) : null}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {visibleItems.map((item) => (
          <article
            key={item.id}
            className="rounded-[32px] border border-white/5 bg-[#111214]/60 p-8 backdrop-blur-sm hover:border-blue-500/20 transition-all"
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-[0.22em] ${priorityStyles[item.priority]}`}
              >
                {item.priority}
              </span>
              <span
                className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-[0.22em] ${statusStyles[item.status]}`}
              >
                {item.status}
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-500">{item.area}</span>
            </div>

            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">{item.title}</h3>
            <p className="text-gray-400 leading-relaxed mb-6">{item.summary}</p>

            {item.cadence || item.sourceOfTruth || item.executionMode ? (
              <div className="flex flex-wrap gap-2 mb-6">
                {item.cadence ? (
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-300">
                    Cadence: {item.cadence}
                  </span>
                ) : null}
                {item.executionMode ? (
                  <span className="px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-[9px] font-black uppercase tracking-[0.2em] text-blue-200">
                    {item.executionMode}
                  </span>
                ) : null}
                {item.sourceOfTruth ? (
                  <span className="px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-200">
                    Source: {item.sourceOfTruth}
                  </span>
                ) : null}
              </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl border border-white/5 bg-black/30 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2">Assigned Agent</p>
                <p className="text-sm text-white">{item.ownerAgent}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 mt-2">{item.skillTrack}</p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/30 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2">Dependencies</p>
                <div className="space-y-2">
                  {item.dependencies.map((dependency) => (
                    <p key={dependency} className="text-sm text-gray-300 flex items-start gap-2">
                      <CircleDot size={14} className="text-blue-500 mt-0.5 shrink-0" />
                      {dependency}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/30 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-3">Practical Deliverables</p>
              <div className="space-y-2">
                {item.deliverables.map((deliverable) => (
                  <p key={deliverable} className="text-sm text-gray-300 flex items-start gap-2">
                    <CircleDot size={14} className="text-blue-500 mt-0.5 shrink-0" />
                    {deliverable}
                  </p>
                ))}
              </div>
            </div>

            {item.links?.length ? (
              <div className="flex flex-wrap gap-3 mt-6">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:border-blue-500/30 hover:text-blue-300 transition-all"
                  >
                    {link.label} <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
};

export default RoadmapBoard;
