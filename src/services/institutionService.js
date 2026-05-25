import { http, normalizeListResponse } from './http';
import { mapInstitutionFromApi } from '../lib/apiMappers';

const path = '/api/institutions';

export const institutionService = {
  async list() {
    const data = await http.get(path);
    return normalizeListResponse(data).map(mapInstitutionFromApi);
  },

  async getById(id) {
    const data = await http.get(`${path}/${id}`);
    return mapInstitutionFromApi(data);
  },
};
