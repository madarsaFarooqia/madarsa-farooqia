import { http, normalizeListResponse } from './http';
import { mapEventFromApi, mapEventToApi } from '../lib/apiMappers';

const path = '/api/events';

export const eventService = {
  async list(sort, limit) {
    const data = await http.get(path, { query: { sort, limit } });
    return normalizeListResponse(data).map(mapEventFromApi);
  },

  async filter(filters, sort, limit) {
    let items = await this.list(sort, limit);
    if (filters?.is_upcoming !== undefined) {
      items = items.filter((e) => Boolean(e.is_upcoming) === Boolean(filters.is_upcoming));
    }
    return items;
  },

  async create(payload) {
    const created = await http.post(path, mapEventToApi(payload));
    return mapEventFromApi(created);
  },

  async update(id, payload) {
    const updated = await http.put(`${path}/${id}`, mapEventToApi(payload));
    return mapEventFromApi(updated);
  },

  async delete(id) {
    return http.delete(`${path}/${id}`);
  },
};
