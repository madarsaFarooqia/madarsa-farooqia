import { http, normalizeListResponse } from './http';
import { mapDonationFromApi } from '../lib/apiMappers';

const path = '/api/donations';

export const donationService = {
  async initiateGuest(payload) {
    const body = {
      campaignId: payload.campaign_id || payload.campaignId || null,
      amount: payload.amount,
      currency: payload.currency || 'USD',
      isAnonymous: payload.is_anonymous ?? payload.isAnonymous ?? false,
      donorEmail: payload.donor_email || payload.donorEmail,
      donorName: payload.donor_name || payload.donorName,
      donorPhone: payload.donor_phone || payload.donorPhone,
      purpose: payload.purpose,
    };
    const data = await http.post(`${path}/guest/initiate`, body);
    return mapDonationFromApi(data);
  },

  async initiate(payload) {
    const body = {
      campaignId: payload.campaign_id || payload.campaignId,
      amount: payload.amount,
      currency: payload.currency || 'USD',
      isAnonymous: payload.is_anonymous ?? payload.isAnonymous ?? false,
    };
    const data = await http.post(`${path}/initiate`, body);
    return mapDonationFromApi(data);
  },

  async getStatus(id) {
    const data = await http.get(`${path}/${id}/status`);
    return mapDonationFromApi(data);
  },

  async getMy() {
    const data = await http.get(`${path}/my`);
    return normalizeListResponse(data).map(mapDonationFromApi);
  },

  async listAdmin(sort, limit) {
    const data = await http.get(`${path}/admin`, { query: { sort, limit } });
    return normalizeListResponse(data).map(mapDonationFromApi);
  },

  async getReceiptHtml(id) {
    const base = process.env.REACT_APP_API_URL || 'http://localhost:8081/farooqia/v1';
    return `${base.replace(/\/$/, '')}${path}/${id}/receipt`;
  },

  /** @deprecated Use initiateGuest or initiate */
  async create(payload) {
    return this.initiateGuest(payload);
  },

  async list() {
    return this.getMy();
  },

  async filter() {
    return this.getMy();
  },

  async update() {
    throw new Error('Donation updates are not supported via API');
  },

  async delete() {
    throw new Error('Donation deletion is not supported via API');
  },
};
