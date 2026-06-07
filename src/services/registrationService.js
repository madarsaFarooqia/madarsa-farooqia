import { http, normalizeListResponse } from './http';
import { mapRegistrationFromApi, mapRegistrationToApi } from '../lib/apiMappers';

const path = '/api/registrations';

export const registrationService = {
  async list(sort, limit) {
    const data = await http.get(path, { query: { sort, limit } });
    return normalizeListResponse(data).map(mapRegistrationFromApi);
  },

  async filter(filters, sort, limit) {
    const data = await http.get(path, { query: { ...filters, sort, limit } });
    return normalizeListResponse(data).map(mapRegistrationFromApi);
  },

  async create(payload) {
    const created = await http.post(path, mapRegistrationToApi(payload));
    return mapRegistrationFromApi(created);
  },

  async update(id, payload) {
    const updated = await http.put(`${path}/${id}`, mapRegistrationToApi(payload));
    return mapRegistrationFromApi(updated);
  },

  async delete(id) {
    return http.delete(`${path}/${id}`);
  },
};
