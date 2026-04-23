type RuntimeSource = "local" | "public";
type RuntimeStatus = "online" | "warning" | "offline" | "unknown";
type LaneStatus = RuntimeStatus | "declared";

export type PiHealthResponse = {
  status: string;
  env: string;
  bind: string;
  models: {
    default: string;
    fast: string;
    large: string;
  };
  ollama: {
    base: string;
    reachable: boolean;
  };
  profile: {
    id: string;
    displayName: string;
    description?: string;
  };
  context?: {
    documents: number;
    truncated: boolean;
  };
  index?: {
    documentCount: number;
  };
  service?: {
    name: string;
    assistantName: string;
    summary: string;
    environment: string;
  };
};

export type PiGuardianCheck = {
  id: string;
  name: string;
  status: RuntimeStatus;
  detail: string;
  source: string;
};

export type PiInstance = {
  id: string;
  name: string;
  category: string;
  visibility: string;
  summary: string;
  status: RuntimeStatus;
  detail: string;
  latencyMs: number;
  links?: Record<string, string>;
  metrics?: Record<string, string>;
};

export type PiArchitectureSection = {
  title: string;
  summary: string;
};

export type PiTrafficRoute = {
  route: string;
  category: string;
  hits: number;
  lastSeenAt: string;
};

export type PiTrafficEvidence = {
  at: string;
  route: string;
  method: string;
  category: string;
  statusCode: number;
  access: string;
  origin: string;
};

export type PiTrafficSnapshot = {
  enabled: boolean;
  retentionDays: number;
  generatedAt: string;
  lastSeenAt: string | null;
  totals: {
    allTime: number;
    last24h: number;
    last7d: number;
  };
  external: {
    last24h: number;
    last7d: number;
    interactive24h: number;
    interactive7d: number;
  };
  uniqueClients: {
    last24h: number;
    last7d: number;
  };
  origins: Record<string, number>;
  accessModes: Record<string, number>;
  responses: Record<string, number>;
  topRoutes: PiTrafficRoute[];
  observerRoutes: PiTrafficRoute[];
  recentEvidence: PiTrafficEvidence[];
};

export type PiOverviewResponse = {
  profileId: string;
  profile: {
    id: string;
    displayName: string;
  };
  generatedAt: string;
  host: {
    platform: string;
    hostname: string;
    release: string;
    mode: string;
  };
  summary: {
    total: number;
    online: number;
    warning: number;
    offline: number;
    unknown: number;
    alerts: number;
  };
  architecture: {
    path?: string;
    available: boolean;
    title: string;
    summary: string;
    sections: PiArchitectureSection[];
    updatedAt?: string;
  };
  instances: PiInstance[];
  guardian: {
    alerts: Array<{ title?: string; detail?: string } | string>;
    checks: PiGuardianCheck[];
  };
  traffic?: PiTrafficSnapshot;
};

export type PiGuardianResponse = {
  profileId: string;
  profile: {
    id: string;
    displayName: string;
  };
  generatedAt: string;
  host: {
    platform: string;
    hostname: string;
    release: string;
    mode: string;
  };
  guardian: {
    alerts: Array<{ title?: string; detail?: string } | string>;
    checks: PiGuardianCheck[];
  };
};

export type RuntimeLane = {
  id: string;
  name: string;
  status: LaneStatus;
  summary: string;
  detail: string;
  meta: Array<{ label: string; value: string }>;
};

export type PiDashboardSnapshot = {
  source: RuntimeSource;
  baseUrl: string;
  fetchedAt: string;
  health: PiHealthResponse;
  overview: PiOverviewResponse;
  guardian: PiGuardianResponse;
  runtimeLanes: RuntimeLane[];
};

const normalizeBaseUrl = (value: string): string => value.replace(/\/+$/, "");

const viteEnv = (import.meta as ImportMeta).env as Record<string, string | undefined>;

const PI_RUNTIME_DSV_URL = normalizeBaseUrl(
  viteEnv.VITE_PI_RUNTIME_DSV_URL ||
  viteEnv.VITE_PI_RUNTIME_LOCAL_URL ||
  "http://localhost:3131",
);
const PI_RUNTIME_STG_URL = normalizeBaseUrl(
  viteEnv.VITE_PI_RUNTIME_STG_URL ||
  "https://stg.jpglabs.com.br/pi",
);
const PI_RUNTIME_PROD_URL = normalizeBaseUrl(
  viteEnv.VITE_PI_RUNTIME_PROD_URL ||
  viteEnv.VITE_PI_RUNTIME_PUBLIC_URL ||
  "https://jpglabs.com.br/pi",
);
const PI_PUBLIC_TOKEN =
  viteEnv.VITE_PI_API_KEY ||
  viteEnv.VITE_PI_SERVICE_BEARER_TOKEN ||
  viteEnv.VITE_PI_PUBLIC_BEARER_TOKEN ||
  "";

const isTruthyToken = (value?: string | null): value is string => Boolean(value && value.trim());

const getRuntimeFetchHeaders = (token?: string): HeadersInit =>
  ({
    ...(isTruthyToken(token) ? { Authorization: `Bearer ${token}` } : {}),
    "X-Pi-Observer": "jpglabs-dashboard",
  });

const fetchPiJson = async <T>(baseUrl: string, pathname: string, token?: string): Promise<T> => {
  const response = await fetch(`${baseUrl}${pathname}`, {
    headers: getRuntimeFetchHeaders(token),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`${pathname} failed with ${response.status}`);
  }

  return (await response.json()) as T;
};

const guardianFromOverview = (overview: PiOverviewResponse): PiGuardianResponse => ({
  profileId: overview.profileId,
  profile: overview.profile,
  generatedAt: overview.generatedAt,
  host: overview.host,
  guardian: overview.guardian,
});

const runtimeCandidates = (): Array<{ baseUrl: string; source: RuntimeSource; token?: string }> => {
  const candidates = [
    { baseUrl: PI_RUNTIME_DSV_URL, source: "local" as const, token: "" },
    { baseUrl: PI_RUNTIME_STG_URL, source: "public" as const, token: PI_PUBLIC_TOKEN },
    { baseUrl: PI_RUNTIME_PROD_URL, source: "public" as const, token: PI_PUBLIC_TOKEN },
  ];

  const seen = new Set<string>();
  return candidates.filter((candidate) => {
    if (!candidate.baseUrl) return false;
    if (seen.has(candidate.baseUrl)) return false;
    seen.add(candidate.baseUrl);
    return true;
  });
};

export const buildRuntimeLanes = (
  health: Pick<PiHealthResponse, "status" | "env" | "bind" | "models" | "ollama" | "profile">,
  overview: Pick<PiOverviewResponse, "host" | "summary">,
  source: RuntimeSource,
): RuntimeLane[] => {
  const backgroundStatus: LaneStatus = health.status === "ok" ? "online" : "warning";
  const runtimeEnvironment = health.env === "vps" ? "systemd-managed VPS runtime" : "LaunchAgent-backed local runtime";
  const backgroundDetail =
    source === "local"
      ? `Pi is currently loading from the local background runtime on ${health.bind}.`
      : `Pi is currently being proxied through the public runtime while preserving the same background-terminal contract.`;

  return [
    {
      id: "background-terminal",
      name: "Terminal Background Load",
      status: backgroundStatus,
      summary: "Pi stays alive as an operator runtime instead of a tab-bound UI session.",
      detail: `${runtimeEnvironment}; ${backgroundDetail}`,
      meta: [
        { label: "Source", value: source },
        { label: "Host mode", value: overview.host.mode },
        { label: "Profile", value: health.profile.displayName },
      ],
    },
    {
      id: "fallback-chain",
      name: "Fallback Architecture",
      status: "declared",
      summary: "Owner-requested operator chain with cloud-first assistance and a restricted Pi safety fallback.",
      detail:
        "This lane is modeled as Codex as the primary coding surface, paid providers as optional assistance lanes, and Pi on the VPS as a session-close-only fallback when paid APIs are unavailable. It is a declared operator architecture, not a host-level health probe.",
      meta: [
        { label: "Primary", value: "Codex" },
        { label: "Paid APIs", value: "Claude / GPT / Gemini" },
        { label: "VPS fallback", value: "Pi session-close only" },
      ],
    },
    {
      id: "agentic-vps",
      name: "Agentic Code Lane",
      status: health.ollama.reachable ? "online" : "warning",
      summary: "Pi-backed local runtime for memory, service control and explicitly approved maintenance flows.",
      detail:
        "The agentic lane runs through Pi plus Ollama-hosted models. It remains available for service memory, session sync and controlled owner-approved tasks, but it is not the default coding fallback for paid provider exhaustion.",
      meta: [
        { label: "Default", value: health.models.default },
        { label: "Fast", value: health.models.fast },
        { label: "Large", value: health.models.large },
      ],
    },
  ];
};

const loadSnapshotFromBase = async (baseUrl: string, source: RuntimeSource, token?: string): Promise<PiDashboardSnapshot> => {
  const health = await fetchPiJson<PiHealthResponse>(baseUrl, "/health", token);
  const overview = await fetchPiJson<PiOverviewResponse>(baseUrl, "/system/overview", token);

  let guardian: PiGuardianResponse;
  try {
    guardian = await fetchPiJson<PiGuardianResponse>(baseUrl, "/system/guardian", token);
  } catch {
    guardian = guardianFromOverview(overview);
  }

  return {
    source,
    baseUrl,
    fetchedAt: new Date().toISOString(),
    health,
    overview,
    guardian,
    runtimeLanes: buildRuntimeLanes(health, overview, source),
  };
};

export async function loadPiDashboardSnapshot(): Promise<PiDashboardSnapshot> {
  let lastError: unknown = null;

  for (const candidate of runtimeCandidates()) {
    try {
      return await loadSnapshotFromBase(candidate.baseUrl, candidate.source, candidate.token);
    } catch (error) {
      lastError = error;
    }
  }

  const detail = lastError instanceof Error ? lastError.message : "unknown runtime error";
  throw new Error(`Unable to reach Pi runtime from dsv, stg, or prod lanes: ${detail}`);
}
