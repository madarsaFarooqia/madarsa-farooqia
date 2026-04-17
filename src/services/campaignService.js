import { http, normalizeListResponse } from './http';

const path = '/api/campaigns';

/** Admin / site “campaign” entity (distinct from fundraising campaigns below). */
export const campaignService = {
  async list(sort, limit) {
    const data = await http.get(path, { query: { sort, limit } });
    return normalizeListResponse(data);
  },

  async filter(filters, sort, limit) {
    const data = await http.get(path, { query: { ...filters, sort, limit } });
    return normalizeListResponse(data);
  },

  async create(payload) {
    return http.post(path, payload);
  },

  async update(id, payload) {
    return http.patch(`${path}/${id}`, payload);
  },

  async delete(id) {
    return http.delete(`${path}/${id}`);
  },
};
