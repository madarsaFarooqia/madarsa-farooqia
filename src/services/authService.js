import { http, getStoredToken, setStoredToken } from './http';

export const authService = {
  async me() {
    if (!getStoredToken()) {
      throw new Error('Not authenticated');
    }
    // Adjust endpoint as per your actual backend /auth/me or similar
    // If your backend doesn't have /me, we might need to handle it differently
    return await http.get('/auth/me');
  },

  async login(credentials) {
    // credentials: { email, password }
    const response = await http.post('/auth/login', credentials);
    // response is expected to be { token, user } or similar
    if (response.token) {
      setStoredToken(response.token);
    }
    return response;
  },

  async register(userData) {
    // userData matches RegisterRequest in Spring Boot
    const response = await http.post('/auth/register', userData);
    if (response.token) {
      setStoredToken(response.token);
    }
    return response;
  },

  logout(redirectTo) {
    setStoredToken(null);
    if (typeof window !== 'undefined' && redirectTo) {
      window.location.assign(redirectTo);
    }
  },

  redirectToLogin(returnPath) {
    if (typeof window === 'undefined') return;
    const next = returnPath || `${window.location.pathname}${window.location.search}`;
    window.location.assign(`/login?next=${encodeURIComponent(next)}`);
  },
};
