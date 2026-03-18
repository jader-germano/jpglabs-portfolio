export interface ServiceMetric {
  id: string;
  slug: string;
  name: string;
  status: 'online' | 'warning' | 'offline';
  cpuPercent: number;
  memoryMb: number;
  diskPercent: number;
  pods: number;
  tooltip: string;
  publicSummary: string;
  podDetails: string;
}

export const SERVICE_CATALOG: ServiceMetric[] = [
  {
    id: 'svc-1',
    slug: 'n8n-workflow',
    name: 'n8n Workflow',
    status: 'online',
    cpuPercent: 65,
    memoryMb: 2048,
    diskPercent: 44,
    pods: 3,
    tooltip: 'Execuções agendadas e webhooks em alta demanda no horário comercial.',
    publicSummary: 'Automation workflows online with stable throughput.',
    podDetails: `NAME                                 READY   STATUS    RESTARTS   AGE
n8n-worker-7d58b9f44-abcde           1/1     Running   0          45d
n8n-worker-7d58b9f44-fghij           1/1     Running   0          45d
n8n-webhook-5cf9fd7d8-zxy01          1/1     Running   0          45d

--- Logs (tail -n 6) ---
[2026-03-09 09:10:44] INFO: Trigger received from payment webhook.
[2026-03-09 09:10:45] DEBUG: Processing node "AI Agent".
[2026-03-09 09:11:09] INFO: Workflow completed in 24s.
[2026-03-09 09:14:02] INFO: Health check passed.
[2026-03-09 09:18:56] INFO: Trigger received from CRM form.
[2026-03-09 09:19:10] INFO: Workflow completed in 14s.`,
  },
  {
    id: 'svc-2',
    slug: 'traefik-proxy',
    name: 'Traefik Proxy',
    status: 'online',
    cpuPercent: 12,
    memoryMb: 256,
    diskPercent: 19,
    pods: 2,
    tooltip: 'Roteamento de borda e renovação SSL automática via DNS challenge.',
    publicSummary: 'Edge routing and TLS automation are fully operational.',
    podDetails: `NAME                                 READY   STATUS    RESTARTS   AGE
traefik-76f66b4cc7-bh9p1             1/1     Running   0          102d
traefik-76f66b4cc7-lk312             1/1     Running   0          102d

--- Logs (tail -n 6) ---
[2026-03-09 09:05:01] INFO: ACME certificate renewal checked.
[2026-03-09 09:05:02] INFO: Router /offer synced.
[2026-03-09 09:07:19] INFO: Health check passed.
[2026-03-09 09:13:40] INFO: Route /dashboard/instances balanced.
[2026-03-09 09:15:07] INFO: Metrics endpoint scraped.
[2026-03-09 09:18:22] INFO: Zero 5xx errors in current window.`,
  },
  {
    id: 'svc-3',
    slug: 'postgresql-main',
    name: 'PostgreSQL Main',
    status: 'online',
    cpuPercent: 45,
    memoryMb: 4096,
    diskPercent: 53,
    pods: 1,
    tooltip: 'Banco principal para auth, billing e observabilidade transacional.',
    publicSummary: 'Primary database healthy with regular backup cadence.',
    podDetails: `NAME                                 READY   STATUS    RESTARTS   AGE
postgres-main-0                      1/1     Running   0          152d

--- Logs (tail -n 5) ---
2026-03-09 09:00:00 LOG: checkpoint complete: wrote 312 buffers.
2026-03-09 09:02:44 LOG: connection authorized: user=app_user.
2026-03-09 09:08:17 LOG: automatic vacuum of table completed.
2026-03-09 09:12:55 LOG: archive command completed successfully.
2026-03-09 09:18:30 LOG: backup stream replicated with no lag.`,
  },
  {
    id: 'svc-4',
    slug: 'local-llm-llama3',
    name: 'Local LLM (Llama 3)',
    status: 'warning',
    cpuPercent: 88,
    memoryMb: 12288,
    diskPercent: 61,
    pods: 1,
    tooltip: 'Carga alta em inferência local durante pipelines de agentes simultâneos.',
    publicSummary: 'LLM runtime online with high but stable compute load.',
    podDetails: `NAME                                 READY   STATUS    RESTARTS   AGE
llm-runtime-6d8896cd6f-r6k9m         1/1     Running   1          18d

--- Logs (tail -n 6) ---
[2026-03-09 09:04:12] INFO: Model llama3 loaded successfully.
[2026-03-09 09:06:34] WARN: GPU memory pressure at 92%.
[2026-03-09 09:06:40] INFO: Request batching activated.
[2026-03-09 09:11:15] INFO: Average latency 520ms.
[2026-03-09 09:16:03] INFO: Queue depth normalized.
[2026-03-09 09:19:41] INFO: Health check passed.`,
  },
];

export const getServiceBySlug = (slug: string): ServiceMetric | undefined =>
  SERVICE_CATALOG.find((service) => service.slug === slug);

export const formatPublicUsage = (percent: number): string => {
  if (percent >= 85) {
    return 'High';
  }

  if (percent >= 60) {
    return 'Moderate';
  }

  return 'Stable';
};
