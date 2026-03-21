export type Role =
  | 'ROOT_ADMIN'
  | 'ADMIN'
  | 'USER_CONSULTANT'
  | 'USER'
  | 'PUBLIC'
  | 'SUB_OWNER'
  | 'FAMILY'
  | 'PI_AGENT'
  | 'CLAUDE_ORCHESTRATOR';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  features: string[];
  pdfUrl?: string;
  isPurchased?: boolean;
}

export interface VPSStats {
  id: string;
  name: string;
  cpu: number;
  memory: number;
  disk: number;
  status: 'online' | 'offline' | 'restarting';
  details?: string;
}

export interface ServiceDetail {
  id: string;
  name: string;
  podDetails: string;
  usage: {
    cpu: string;
    memory: string;
  };
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  status: 'active' | 'archived' | 'in_progress';
  featured: boolean;
  url?: string;
  github_url?: string;
  image_url?: string;
  created_at: string;
}

export interface PortfolioSkill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
}
