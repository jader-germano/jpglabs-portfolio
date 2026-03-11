import type { Product, Role } from '../types';

export interface ProductCatalogItem extends Product {
  headline: string;
  summary: string;
  accessRoles: Role[];
  detailHighlights: string[];
}

export const PRODUCT_CATALOG: ProductCatalogItem[] = [
  {
    id: '1',
    slug: 'ai-toolkit-v3',
    name: 'AI ARCHITECT TOOLKIT V3.0',
    headline: 'Flagship Architecture Stack',
    summary: 'Complete orchestration blueprint for senior engineers and consultants.',
    description: 'Blueprint completo para desenvolver, operar e escalar sistemas multiagentes com Java 21, MCP e n8n em produção.',
    price: 297,
    tags: ['JAVA 21', 'MCP', 'N8N'],
    features: [
      'Agent Blueprints',
      'Infrastructure as Code',
      'MCP Server Templates',
      'Production Playbooks',
    ],
    detailHighlights: [
      'Arquitetura orientada a agentes com governança de contexto.',
      'Checklist de deploy para VPS com Traefik e observabilidade.',
      'Modelos de prompts para engenharia, atendimento e vendas.',
    ],
    accessRoles: ['ADMIN', 'USER_CONSULTANT', 'USER'],
    pdfUrl: '/downloads/ai-toolkit-v3.pdf',
  },
  {
    id: '2',
    slug: 'k8s-blueprint',
    name: 'Kubernetes (K8s) Blueprint',
    headline: 'Container Orchestration Foundation',
    summary: 'Production-ready Kubernetes baseline focused on AI workloads.',
    description: 'Guia prático para operação de clusters K8s com deployment padronizado, autoscaling e monitoramento para serviços de IA.',
    price: 197,
    tags: ['DEVOPS', 'K8S', 'SCALING'],
    features: ['Helm Charts', 'Auto-scaling Logic', 'Monitoring Stack'],
    detailHighlights: [
      'Modelo operacional para cluster single-node e multi-node.',
      'Padrões de segurança para namespaces e segredos.',
      'Pipelines de atualização sem downtime para workloads críticos.',
    ],
    accessRoles: ['ADMIN', 'USER_CONSULTANT'],
    pdfUrl: '/downloads/k8s-blueprint.pdf',
  },
  {
    id: '3',
    slug: 'traefik-edge-proxy',
    name: 'Traefik Edge Proxy',
    headline: 'Secure Routing at the Edge',
    summary: 'Dynamic routing and TLS automation for modern service mesh borders.',
    description: 'Implementação de borda com Traefik para rotear aplicações, proteger endpoints e automatizar certificados SSL.',
    price: 97,
    tags: ['SECURITY', 'TRAEFIK', 'PROXY'],
    features: ['Dynamic Config', "Let's Encrypt Integration", 'Dashboard Security'],
    detailHighlights: [
      'Regras para roteamento HTTP/HTTPS com fallback seguro.',
      'Integração com Cloudflare para DNS challenge.',
      'Políticas de exposição segura para serviços internos.',
    ],
    accessRoles: ['ADMIN'],
    pdfUrl: '/downloads/traefik-edge-proxy.pdf',
  },
  {
    id: '4',
    slug: 'local-llm-models',
    name: 'Local LLM Models',
    headline: 'Offline AI Inference Stack',
    summary: 'Run private LLM workloads locally with predictable performance.',
    description: 'Guia de modelos LLM locais com foco em performance, privacidade e custo previsível para pipelines de automação.',
    price: 147,
    tags: ['LLM', 'AI', 'LOCAL'],
    features: ['Docker-LLM Setup', 'Hardware Optimization', 'API Wrapper'],
    detailHighlights: [
      'Matriz de sizing para CPU/GPU conforme contexto de uso.',
      'Configuração de runtime para modelos quantizados.',
      'Estratégias para cache, batching e redução de latência.',
    ],
    accessRoles: ['ADMIN'],
    pdfUrl: '/downloads/local-llm-models.pdf',
  },
  {
    id: '5',
    slug: 'llm-infrastructure-model',
    name: 'LLM-based Infrastructure Model',
    headline: 'Self-Healing AI Infrastructure',
    summary: 'Decision framework for autonomous operations in infrastructure.',
    description: 'Modelo de infraestrutura orientado por LLMs para operação assistida, detecção de anomalias e resposta automatizada.',
    price: 497,
    tags: ['AUTO-HEAL', 'AI-INFRA', 'NEXT-GEN'],
    features: ['Decision Logic', 'Agentic Maintenance', 'Anomaly Detection'],
    detailHighlights: [
      'Fluxo de decisão para remediação automática de falhas.',
      'Arquitetura de eventos com pontos de observabilidade.',
      'Camadas de validação humana para ações críticas.',
    ],
    accessRoles: ['ADMIN'],
    pdfUrl: '/downloads/llm-infrastructure-model.pdf',
  },
];

export const getProductBySlug = (slug: string): ProductCatalogItem | undefined =>
  PRODUCT_CATALOG.find((product) => product.slug === slug);

export const canDownloadProduct = (
  product: ProductCatalogItem,
  role: Role | undefined,
): boolean => {
  if (!role || role === 'PUBLIC') {
    return false;
  }

  if (role === 'ADMIN') {
    return true;
  }

  return product.accessRoles.includes(role);
};
