import { http, normalizeListResponse } from './http';
import { mapQuoteFromApi } from '../lib/apiMappers';

const path = '/api/content/quotes';

export const contentService = {
  async list() {
    const data = await http.get(path);
    return normalizeListResponse(data).map(mapQuoteFromApi);
  },

  async random() {
    const data = await http.get(`${path}/random`);
    return mapQuoteFromApi(data);
  },

  async byType(type) {
    const data = await http.get(`${path}/type/${type}`);
    return normalizeListResponse(data).map(mapQuoteFromApi);
  },
};
