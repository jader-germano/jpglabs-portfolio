export type Role = 'PRIME_OWNER' | 'SUB_OWNER' | 'ADMIN' | 'USER_CONSULTANT' | 'USER' | 'PUBLIC';

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
