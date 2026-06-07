import { http, normalizeListResponse } from './http';
import { mapScholarToTeacher, mapTeacherToScholar } from '../lib/apiMappers';

const path = '/api/scholars';

export const teacherService = {
  async list(sort, limit) {
    const data = await http.get(path, { query: { sort, limit } });
    return normalizeListResponse(data).map(mapScholarToTeacher);
  },

  async filter(filters, sort, limit) {
    const data = await http.get(path, { query: { ...filters, sort, limit } });
    let items = normalizeListResponse(data).map(mapScholarToTeacher);
    if (filters?.is_active !== undefined) {
      items = items.filter((t) => Boolean(t.is_active) === Boolean(filters.is_active));
    }
    return items;
  },

  async create(payload) {
    const created = await http.post(path, mapTeacherToScholar(payload));
    return mapScholarToTeacher(created);
  },

  async update(id, payload) {
    const updated = await http.put(`${path}/${id}`, mapTeacherToScholar(payload));
    return mapScholarToTeacher(updated);
  },

  async delete(id) {
    return http.delete(`${path}/${id}`);
  },
};
