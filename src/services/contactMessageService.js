import { http, normalizeListResponse } from './http';
import { mapContactFromApi } from '../lib/apiMappers';

const path = '/api/contact-messages';

export const contactMessageService = {
  async list(sort, limit) {
    const data = await http.get(path, { query: { sort, limit } });
    return normalizeListResponse(data).map(mapContactFromApi);
  },

  async create(payload) {
    const created = await http.post(path, payload);
    return mapContactFromApi(created);
  },

  async delete(id) {
    return http.delete(`${path}/${id}`);
  },
};
