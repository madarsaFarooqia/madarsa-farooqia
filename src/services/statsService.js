import { http } from './http';

export const statsService = {
  async getDashboard() {
    return http.get('/api/stats/dashboard');
  },

  async getAdmin() {
    return http.get('/api/stats/admin');
  },

  async getVideos(limit = 6) {
    return http.get('/api/stats/videos', { query: { limit } });
  },
};
