import { isMockApiEnabled } from '@/mocks/config';
import { handleMockRequest } from '@/mocks/handlers';

const DEFAULT_TOKEN_KEY = 'madrasa_access_token';

export function getTokenStorageKey() {
  return process.env.REACT_APP_AUTH_TOKEN_KEY || DEFAULT_TOKEN_KEY;
}

export function getStoredToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(getTokenStorageKey());
}

export function setStoredToken(token) {
  if (typeof window === 'undefined') return;
  const key = getTokenStorageKey();
  if (token) window.localStorage.setItem(key, token);
  else window.localStorage.removeItem(key);
}

export function getApiBase() {
  return (process.env.REACT_APP_API_URL || 'http://localhost:8080').replace(/\/$/, '');
}

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function parseBody(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function buildUrl(path, query) {
  const base = getApiBase();
  const rel = path.startsWith('http') ? path : `${base}${path}`;
  if (!query || !Object.keys(query).length) return rel;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null || v === '') continue;
    params.set(k, String(v));
  }
  const qs = params.toString();
  if (!qs) return rel;
  return rel.includes('?') ? `${rel}&${qs}` : `${rel}?${qs}`;
}

/**
 * Normalize list responses from common API shapes.
 */
export function normalizeListResponse(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

function resolveCredentials() {
  const mode = process.env.REACT_APP_FETCH_CREDENTIALS;
  if (mode === 'omit') return 'omit';
  if (mode === 'same-origin') return 'same-origin';
  if (mode === 'include') return 'include';
  const base = getApiBase();
  if (
    typeof window !== 'undefined' &&
    base &&
    (base.startsWith('http://') || base.startsWith('https://')) &&
    !base.startsWith(window.location.origin)
  ) {
    return 'include';
  }
  return 'same-origin';
}

export async function apiRequest(method, path, { query, body, headers, signal } = {}) {
  if (isMockApiEnabled()) {
    try {
      return await handleMockRequest(method, path, { query, body, headers }, signal);
    } catch (e) {
      const status = e.status || 500;
      throw new ApiError(e.message || 'Mock API error', { status, data: e.data });
    }
  }

  const url = buildUrl(path, query);
  const token = getStoredToken();

  const res = await fetch(url, {
    method,
    signal,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: resolveCredentials(),
  });

  const data = await parseBody(res);

  if (!res.ok) {
    const message =
      (typeof data === 'object' && data && (data.message || data.error)) ||
      res.statusText ||
      'Request failed';
    throw new ApiError(String(message), { status: res.status, data });
  }

  return data;
}

export const http = {
  get: (path, opts) => apiRequest('GET', path, opts),
  post: (path, body, opts = {}) => apiRequest('POST', path, { ...opts, body }),
  patch: (path, body, opts = {}) => apiRequest('PATCH', path, { ...opts, body }),
  put: (path, body, opts = {}) => apiRequest('PUT', path, { ...opts, body }),
  delete: (path, opts = {}) => apiRequest('DELETE', path, opts),
};
