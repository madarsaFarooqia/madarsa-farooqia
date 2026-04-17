import { http } from './http';

const path = '/api/contact-messages';

export const contactMessageService = {
  async create(payload) {
    return http.post(path, payload);
  },
};
