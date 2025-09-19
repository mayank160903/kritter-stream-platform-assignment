type CacheValue<T> = { value: T; expiresAt: number };

const memoryCache = new Map<string, CacheValue<unknown>>();

export function cacheGet<T>(key: string): T | null {
  const inMemory = memoryCache.get(key) as CacheValue<T> | undefined;
  if (inMemory && inMemory.expiresAt > Date.now()) return inMemory.value;
  if (inMemory) memoryCache.delete(key);

  try {
    const raw = sessionStorage.getItem(key) || localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheValue<T>;
    if (parsed.expiresAt > Date.now()) {
      memoryCache.set(key, parsed);
      return parsed.value;
    }
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  } catch {
    // Ignore storage errors (e.g., SSR or private mode)
  }
  return null;
}

export function cacheSet<T>(
  key: string,
  value: T,
  ttlMs: number,
  persistent: 'session' | 'local' = 'session'
) {
  const item: CacheValue<T> = { value, expiresAt: Date.now() + ttlMs };
  memoryCache.set(key, item);
  try {
    const store = persistent === 'session' ? sessionStorage : localStorage;
    store.setItem(key, JSON.stringify(item));
  } catch {
    // Ignore storage errors
  }
}

export function cacheDelete(key: string) {
  memoryCache.delete(key);
  try {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  } catch {}
}

export function cacheClear() {
  memoryCache.clear();
}


