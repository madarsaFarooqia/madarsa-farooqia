import { http, normalizeListResponse, getStoredToken } from './http';
import { mapStudentFromApi } from '../lib/apiMappers';

const path = '/api/students';

function listPath() {
  return getStoredToken() ? path : `${path}/public`;
}

export const studentService = {
  async list(sort, limit) {
    const data = await http.get(listPath(), { query: { sort, limit } });
    return normalizeListResponse(data).map(mapStudentFromApi);
  },

  async filter(filters, sort, limit) {
    let items = await this.list(sort, limit);
    if (filters?.is_featured) {
      items = items.filter((s) => s.is_featured);
    }
    if (filters?.course) {
      items = items.filter((s) => s.course === filters.course);
    }
    return items;
  },

  async create(payload) {
    const created = await http.post(path, payload);
    return mapStudentFromApi(created);
  },

  async update(id, payload) {
    const updated = await http.put(`${path}/${id}`, payload);
    return mapStudentFromApi(updated);
  },

  async delete(id) {
    return http.delete(`${path}/${id}`);
  },
};
