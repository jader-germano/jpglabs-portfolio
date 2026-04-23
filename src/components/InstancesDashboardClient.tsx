import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Box,
  ChevronDown,
  ExternalLink,
  Route,
  Server,
  ShieldAlert,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { useLanguage } from "../context/LanguageProvider";
import { useAuth } from "../context/AuthContext";
import { DASHBOARD_ROUTE_INVENTORY } from "../lib/dashboard-routes";
import { portfolioApiBaseUrl } from "../lib/portfolio-api";
import { fetchWithAuth } from "../lib/fetch-with-auth";
import type { PiDashboardSnapshot } from "../lib/pi-runtime";

const STATUS_STYLES = {
  online: "bg-green-500/10 text-green-400 border-green-500/20",
  warning: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  offline: "bg-red-500/10 text-red-300 border-red-500/20",
  unknown: "bg-white/5 text-gray-400 border-white/10",
  declared: "bg-red-500/10 text-red-300 border-red-500/20",
} as const;

export default function InstancesDashboardClient() {
  const { dictionary, locale } = useLanguage();
  const { user, isRootAdmin } = useAuth();
  const [snapshot, setSnapshot] = useState<PiDashboardSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // PRIME_OWNER in the original system corresponds to ROOT_ADMIN in this SPA's
  // role model. Preserve the intent (full technical visibility) by gating on
  // isRootAdmin and expose a string role for display only.
  const role = user?.role ?? "GUEST";
  const canViewRouteDetails = isRootAdmin;

  const copy =
    locale === "pt"
      ? {
          source: "Origem",
          hostMode: "Modo do host",
          liveServices: "Serviços online",
          warnings: "Alertas",
          traffic24h: "Acessos 24h",
          uniqueVisitors: "Clientes únicos",
          runtimeTitle: "Topologia operacional do Pi",
          runtimeDescription:
            "Camada viva do runtime, com carregamento em background, suporte cloud-first e fallback da VPS restrito ao fechamento seguro da sessão.",
          trafficTitle: "Evidências de tráfego",
          trafficDescription:
            "Mapa enxuto de acessos externos ao Pi, separado das leituras internas do painel para provar uso real sem inflar os números.",
          topRoutes: "Rotas com mais sinais",
          recentEvidence: "Evidências recentes",
          lastSeen: "Último acesso",
          noTrafficEvidence: "Ainda não há evidências externas suficientes nesta janela.",
          inventoryTitle: "Inventário de rotas",
          inventoryDescription:
            "Todos os nomes de rota ficam visíveis para navegação. O detalhamento técnico permanece restrito ao perfil ROOT_ADMIN.",
          detailsLocked: "Detalhes restritos a ROOT_ADMIN",
          detailsVisible: "Detalhes visíveis",
          routeDescription: "Descrição",
          routeFile: "Arquivo",
          routePath: "Caminho fonte",
          routeNote: "Observação",
          open: "Abrir",
          refreshedAt: "Atualizado em",
          runtimeUnavailable: "Não foi possível carregar o snapshot do Pi runtime.",
        }
      : {
          source: "Source",
          hostMode: "Host mode",
          liveServices: "Online services",
          warnings: "Alerts",
          traffic24h: "24h traffic",
          uniqueVisitors: "Unique clients",
          runtimeTitle: "Pi operational topology",
          runtimeDescription:
            "Live runtime layer showing background terminal loading, cloud-first assistance lanes, and the VPS fallback restricted to safe session closure.",
          trafficTitle: "Traffic evidence",
          trafficDescription:
            "Lean access map for external Pi traffic, separated from dashboard observer reads so the panel shows actual usage instead of self-generated hits.",
          topRoutes: "Top signal routes",
          recentEvidence: "Recent evidence",
          lastSeen: "Last access",
          noTrafficEvidence: "No external evidence has been captured in this window yet.",
          inventoryTitle: "Route inventory",
          inventoryDescription:
            "Every route name stays visible for navigation. Technical route detail is reserved for ROOT_ADMIN.",
          detailsLocked: "Details restricted to ROOT_ADMIN",
          detailsVisible: "Details visible",
          routeDescription: "Description",
          routeFile: "File",
          routePath: "Source path",
          routeNote: "Note",
          open: "Open",
          refreshedAt: "Refreshed at",
          runtimeUnavailable: "Unable to load the Pi runtime snapshot.",
        };

  useEffect(() => {
    let isDisposed = false;

    const loadSnapshot = async () => {
      try {
        const response = await fetchWithAuth(`${portfolioApiBaseUrl}/api/dashboard/runtime`, {
          cache: "no-store",
        });
        const payload = (await response.json()) as PiDashboardSnapshot | { detail?: string };

        if (!response.ok) {
          throw new Error("detail" in payload && payload.detail ? payload.detail : "runtime request failed");
        }

        if (!isDisposed) {
          setSnapshot(payload as PiDashboardSnapshot);
          setError("");
        }
      } catch (runtimeError) {
        if (!isDisposed) {
          setError(runtimeError instanceof Error ? runtimeError.message : copy.runtimeUnavailable);
        }
      } finally {
        if (!isDisposed) {
          setLoading(false);
        }
      }
    };

    void loadSnapshot();
    const interval = window.setInterval(loadSnapshot, 15000);

    return () => {
      isDisposed = true;
      window.clearInterval(interval);
    };
  }, [copy.runtimeUnavailable]);

  const updatedAt = snapshot
    ? new Date(snapshot.fetchedAt).toLocaleString(locale === "pt" ? "pt-BR" : "en-US")
    : null;
  const trafficLastSeen = snapshot?.overview.traffic?.lastSeenAt
    ? new Date(snapshot.overview.traffic.lastSeenAt).toLocaleString(locale === "pt" ? "pt-BR" : "en-US")
    : "—";

  return (
    <div className="min-h-screen bg-[#050505] p-8 text-white">
      <header className="mb-12 flex flex-col gap-6 border-b border-white/5 pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tighter">
            <Box className="text-red-500" />
            {dictionary.instances.title}
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-gray-500">{dictionary.instances.subtitle}</p>
          <p className="mt-2 text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">Role: {role}</p>
        </div>

        <Link
          to="/dashboard/guardian"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-red-500"
        >
          <ShieldAlert size={16} />
          {dictionary.instances.guardianCta}
        </Link>
      </header>

      {error ? (
        <div className="mb-8 rounded-[28px] border border-red-500/20 bg-red-500/5 px-6 py-5 text-sm text-red-200">
          <p className="font-semibold">{copy.runtimeUnavailable}</p>
          <p className="mt-2 font-mono text-xs text-red-100/80">{error}</p>
        </div>
      ) : null}

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-[28px] border border-white/5 bg-white/[0.02] p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.liveServices}</p>
          <div className="mt-4 text-4xl font-black">{snapshot?.overview.summary.online ?? "—"}</div>
          <p className="mt-2 text-xs text-gray-500">{snapshot?.overview.summary.total ?? 0} mapped services</p>
        </article>

        <article className="rounded-[28px] border border-white/5 bg-white/[0.02] p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.warnings}</p>
          <div className="mt-4 text-4xl font-black">{snapshot?.overview.summary.alerts ?? 0}</div>
          <p className="mt-2 text-xs text-gray-500">{snapshot?.overview.summary.warning ?? 0} warning states</p>
        </article>

        <article className="rounded-[28px] border border-white/5 bg-white/[0.02] p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.source}</p>
          <div className="mt-4 text-2xl font-black uppercase">{snapshot?.source ?? "—"}</div>
          <p className="mt-2 text-xs text-gray-500 break-all">{snapshot?.baseUrl ?? "—"}</p>
        </article>

        <article className="rounded-[28px] border border-white/5 bg-white/[0.02] p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.hostMode}</p>
          <div className="mt-4 text-2xl font-black">{snapshot?.overview.host.mode ?? "—"}</div>
          <p className="mt-2 text-xs text-gray-500">{snapshot?.overview.host.hostname ?? "—"}</p>
        </article>

        <article className="rounded-[28px] border border-white/5 bg-white/[0.02] p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.traffic24h}</p>
          <div className="mt-4 text-4xl font-black">{snapshot?.overview.traffic?.external.last24h ?? 0}</div>
          <p className="mt-2 text-xs text-gray-500">{snapshot?.overview.traffic?.external.interactive24h ?? 0} interactive hits</p>
        </article>

        <article className="rounded-[28px] border border-white/5 bg-white/[0.02] p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.uniqueVisitors}</p>
          <div className="mt-4 text-4xl font-black">{snapshot?.overview.traffic?.uniqueClients.last24h ?? 0}</div>
          <p className="mt-2 text-xs text-gray-500">{copy.lastSeen}: {trafficLastSeen}</p>
        </article>
      </section>

      <section className="mb-12 rounded-[32px] border border-white/5 bg-white/[0.02] p-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.24em] text-white">
              <TerminalSquare className="text-red-500" size={18} />
              {copy.runtimeTitle}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">{copy.runtimeDescription}</p>
          </div>
          {updatedAt ? (
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">
              {copy.refreshedAt}: {updatedAt}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {snapshot?.runtimeLanes.map((lane) => (
            <article key={lane.id} className="rounded-[28px] border border-white/5 bg-black/30 p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-black tracking-tight">{lane.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{lane.summary}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${STATUS_STYLES[lane.status]}`}>
                  {lane.status}
                </span>
              </div>

              <p className="text-sm leading-7 text-gray-300">{lane.detail}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {lane.meta.map((item) => (
                  <div key={`${lane.id}-${item.label}`} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{item.label}</p>
                    <p className="mt-2 text-sm font-mono text-gray-200">{item.value}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12 rounded-[32px] border border-white/5 bg-white/[0.02] p-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.24em] text-white">
              <Activity className="text-red-500" size={18} />
              {copy.trafficTitle}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">{copy.trafficDescription}</p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            {copy.lastSeen}: {trafficLastSeen}
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <article className="rounded-[28px] border border-white/5 bg-black/30 p-6">
            <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">{copy.topRoutes}</h3>
            <div className="mt-5 space-y-3">
              {(snapshot?.overview.traffic?.topRoutes ?? []).map((route) => (
                <div key={route.route} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-sm text-gray-200">{route.route}</p>
                      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{route.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-white">{route.hits}</p>
                      <p className="mt-1 text-[10px] text-gray-500">{new Date(route.lastSeenAt).toLocaleString(locale === "pt" ? "pt-BR" : "en-US")}</p>
                    </div>
                  </div>
                </div>
              ))}

              {!snapshot?.overview.traffic?.topRoutes?.length ? (
                <p className="text-sm text-gray-500">{copy.noTrafficEvidence}</p>
              ) : null}
            </div>
          </article>

          <article className="rounded-[28px] border border-white/5 bg-black/30 p-6">
            <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">{copy.recentEvidence}</h3>
            <div className="mt-5 space-y-3">
              {(snapshot?.overview.traffic?.recentEvidence ?? []).map((event) => (
                <div key={`${event.at}-${event.route}`} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-sm text-gray-200">{event.route}</p>
                      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">
                        {event.method} · {event.category} · {event.access}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-white">{event.statusCode}</p>
                      <p className="mt-1 text-[10px] text-gray-500">{new Date(event.at).toLocaleString(locale === "pt" ? "pt-BR" : "en-US")}</p>
                    </div>
                  </div>
                </div>
              ))}

              {!snapshot?.overview.traffic?.recentEvidence?.length ? (
                <p className="text-sm text-gray-500">{copy.noTrafficEvidence}</p>
              ) : null}
            </div>
          </article>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-8 flex items-center gap-3">
          <Server className="text-red-500" size={18} />
          <h2 className="text-sm font-black uppercase tracking-[0.24em] text-white">{dictionary.instances.title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {snapshot?.overview.instances.map((service) => (
            <article
              key={service.id}
              className="rounded-[32px] border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-red-500/20"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                  <Server size={20} />
                </div>
                <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${STATUS_STYLES[service.status]}`}>
                  {service.status}
                </span>
              </div>

              <h3 className="truncate font-bold text-gray-100" title={service.name}>
                {service.name}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-gray-600">{service.category}</p>
              <p className="mt-4 text-sm leading-7 text-gray-400">{service.summary}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/5 bg-black/30 px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">Latency</p>
                  <p className="mt-2 text-sm font-mono text-red-300">{service.latencyMs}ms</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-black/30 px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">Visibility</p>
                  <p className="mt-2 text-sm font-mono text-gray-200">{service.visibility}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {Object.entries(service.links ?? {}).map(([label, href]) => (
                  <a
                    key={`${service.id}-${label}`}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 transition-all hover:border-red-500/40 hover:text-white"
                  >
                    {label}
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </article>
          ))}

          {!loading && snapshot?.overview.instances.length === 0 ? (
            <div className="col-span-full rounded-[32px] border-2 border-dashed border-white/5 p-20 text-center">
              <p className="font-mono italic text-gray-600">{dictionary.instances.empty}</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/5 bg-white/[0.02] p-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.24em] text-white">
              <Route className="text-red-500" size={18} />
              {copy.inventoryTitle}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">{copy.inventoryDescription}</p>
          </div>

          <span
            className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] ${
              canViewRouteDetails ? "border-red-500/30 bg-red-500/10 text-red-200" : "border-white/10 bg-white/[0.03] text-gray-500"
            }`}
          >
            {canViewRouteDetails ? copy.detailsVisible : copy.detailsLocked}
          </span>
        </div>

        <div className="space-y-4">
          {DASHBOARD_ROUTE_INVENTORY.map((route) => (
            <details key={`${route.label}-${route.path}`} className="group rounded-[28px] border border-white/5 bg-black/30 p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-white">{route.label}</p>
                  <p className="mt-2 text-[11px] font-mono text-gray-400">{route.path}</p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{route.access}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={route.path}
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 transition-all hover:border-red-500/40 hover:text-white"
                  >
                    {copy.open}
                    <ExternalLink size={12} />
                  </Link>
                  <ChevronDown className="text-gray-600 transition-transform group-open:rotate-180" size={16} />
                </div>
              </summary>

              <div className="mt-5 border-t border-white/5 pt-5">
                {canViewRouteDetails ? (
                  <div className="grid gap-4 text-sm text-gray-300 md:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.routeDescription}</p>
                      <p className="mt-2 leading-7 text-gray-400">{route.description}</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.routeFile}</p>
                        <p className="mt-2 font-mono text-sm text-gray-200">{route.sourceFile}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.routePath}</p>
                        <p className="mt-2 break-all font-mono text-sm text-gray-400">{route.sourcePath}</p>
                      </div>
                      {route.note ? (
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-600">{copy.routeNote}</p>
                          <p className="mt-2 text-sm leading-7 text-gray-400">{route.note}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-gray-400">
                    {copy.detailsLocked}
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-gray-500">
          <Activity size={12} className="animate-pulse text-green-500" />
          <Sparkles size={12} className="text-red-400" />
          {dictionary.instances.live}
        </div>
      </div>
    </div>
  );
}
