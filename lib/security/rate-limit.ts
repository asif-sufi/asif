const cache = new Map<string, { count: number; resetAt: number }>();

export function withRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const state = cache.get(key);
  if (!state || state.resetAt < now) {
    cache.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (state.count >= limit) return { ok: false, remaining: 0, resetAt: state.resetAt };
  state.count += 1;
  return { ok: true, remaining: Math.max(0, limit - state.count) };
}

export function envLimit(name: string, fallback: number) {
  const raw = Number(process.env[name] ?? fallback);
  return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : fallback;
}

export function envWindowMs() {
  return envLimit("RATE_LIMIT_WINDOW_MS", 60_000);
}
