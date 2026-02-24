const cache = new Map<string, { count: number; resetAt: number }>();

export function withRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const state = cache.get(key);
  if (!state || state.resetAt < now) {
    cache.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (state.count >= limit) return { ok: false };
  state.count += 1;
  return { ok: true };
}
