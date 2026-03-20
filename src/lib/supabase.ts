import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, key);

// ── Types mirroring Supabase schema ────────────────────────────────────────

export type RoadmapRow = {
  id: string;
  title: string;
  area: string;
  priority: 'critical' | 'high' | 'medium' | 'foundation';
  status: 'now' | 'next' | 'planned' | 'research';
  owner_agent: string | null;
  skill_track: string | null;
  summary: string | null;
  deliverables: string[];
  dependencies: string[];
  links: { label: string; href: string }[];
  cadence: string | null;
  source_of_truth: string | null;
  execution_mode: string | null;
  is_active_priority: boolean;
  priority_index: number | null;
  created_at: string;
  updated_at: string;
};

export type ProjectRow = {
  id: string;
  title: string;
  description: string | null;
  tech_stack: string[];
  status: string;
  github_url: string | null;
  demo_url: string | null;
  area: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ExperienceRow = {
  id: string;
  company: string;
  role: string;
  period: string | null;
  description: string | null;
  tech_stack: string[];
  highlights: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type SkillRow = {
  id: string;
  name: string;
  category: string | null;
  level: 'expert' | 'advanced' | 'intermediate' | 'learning' | null;
  icon: string | null;
  sort_order: number;
  created_at: string;
};

export type EnvironmentRow = {
  id: string;
  label: string;
  tier: 'dsv' | 'tst' | 'stg' | 'prd';
  url: string | null;
  status: 'planned' | 'building' | 'active' | 'degraded' | 'down';
  k8s_namespace: string | null;
  traefik_host: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type LLMRow = {
  id: string;
  name: string;
  provider: 'ollama' | 'anthropic' | 'openai' | 'vllm' | 'other';
  model_id: string;
  role: 'fast' | 'large' | 'code' | 'vision' | 'embedding' | null;
  endpoint: string | null;
  active: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
};
