import { http, normalizeListResponse } from './http';
import { mapCampaignFromApi, mapCampaignToApi } from '../lib/apiMappers';

const path = '/api/campaigns';

export const campaignService = {
  async list(sort, limit) {
    const data = await http.get(path, { query: { sort, limit } });
    return normalizeListResponse(data).map(mapCampaignFromApi);
  },

  async filter(filters, sort, limit) {
    const data = await http.get(path, { query: { ...filters, sort, limit } });
    return normalizeListResponse(data).map(mapCampaignFromApi);
  },

  async getById(id) {
    const data = await http.get(`${path}/${id}`);
    return mapCampaignFromApi(data);
  },

  async create(payload) {
    const created = await http.post(path, mapCampaignToApi(payload));
    return mapCampaignFromApi(created);
  },

  async update(id, payload) {
    const updated = await http.put(`${path}/${id}`, mapCampaignToApi(payload));
    return mapCampaignFromApi(updated);
  },

  async close(id) {
    const updated = await http.patch(`${path}/${id}/close`);
    return mapCampaignFromApi(updated);
  },

  async delete(id) {
    return this.close(id);
  },
};
