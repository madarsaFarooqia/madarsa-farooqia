import { http } from './http';

/**
 * Optional public bootstrap (feature flags, maintenance, etc.).
 * GET /api/public/settings — safe to 404 while you are still wiring the API.
 */
export const publicAppService = {
  async getSettings() {
    const data = await http.get('/api/public/settings');
    return data ?? null;
  },
};
