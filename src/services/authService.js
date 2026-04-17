import { http, getStoredToken, setStoredToken } from './http';

/**
 * Maps to your backend auth routes (adjust paths as needed).
 * Default: GET /api/auth/me, logout clears local token.
 */
export const authService = {
  async me() {
    if (!getStoredToken()) {
      throw new Error('Not authenticated');
    }
    const ms = Number(process.env.REACT_APP_AUTH_ME_TIMEOUT_MS) || 8000;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), ms);
    try {
      return await http.get('/api/auth/me', { signal: controller.signal });
    } finally {
      clearTimeout(id);
    }
  },

  logout(redirectTo) {
    setStoredToken(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('token');
    }
    if (typeof window !== 'undefined' && redirectTo) {
      window.location.assign(redirectTo);
    }
  },

  redirectToLogin(returnPath) {
    if (typeof window === 'undefined') return;
    const loginBase = process.env.REACT_APP_LOGIN_URL || '/login';
    const sep = loginBase.includes('?') ? '&' : '?';
    const next =
      returnPath ||
      `${window.location.pathname}${window.location.search}`;
    const url = `${loginBase}${sep}next=${encodeURIComponent(next)}`;
    window.location.assign(url);
  },
};
