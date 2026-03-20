const PI_BASE = import.meta.env.VITE_PI_API_BASE ?? 'http://localhost:3131';
const PI_KEY  = import.meta.env.VITE_PI_API_KEY  ?? '';

function piHeaders(): HeadersInit {
  return PI_KEY ? { Authorization: `Bearer ${PI_KEY}` } : {};
}

export async function fetchVpsTelemetry() {
  const res = await fetch(`${PI_BASE}/vps/telemetry`, { headers: piHeaders() });
  if (!res.ok) throw new Error(`Pi VPS telemetry: ${res.status}`);
  return res.json();
}

export async function fetchPiHealth() {
  const res = await fetch(`${PI_BASE}/health`);
  if (!res.ok) throw new Error(`Pi health: ${res.status}`);
  return res.json();
}

export async function fetchSystemOverview() {
  const res = await fetch(`${PI_BASE}/system/overview`, { headers: piHeaders() });
  if (!res.ok) throw new Error(`Pi system: ${res.status}`);
  return res.json();
}
