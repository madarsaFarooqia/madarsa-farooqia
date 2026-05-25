import { getPaymentsApiBase } from './http';

export const paymentService = {
  async mockSuccess(paymentId) {
    const base = getPaymentsApiBase();
    const res = await fetch(`${base}/api/payments/${paymentId}/mock-success`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
    });
    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }
    if (!res.ok) {
      throw new Error((data && data.message) || res.statusText || 'Payment confirmation failed');
    }
    return data;
  },
};
