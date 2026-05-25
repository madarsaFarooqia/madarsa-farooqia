#!/usr/bin/env node
/**
 * Smoke-test core + payments APIs. Run with backends up:
 *   node scripts/api-integration-test.mjs
 */
const CORE = process.env.REACT_APP_API_URL || 'http://localhost:8081/farooqia/v1';
const PAYMENTS = process.env.REACT_APP_PAYMENTS_API_URL || 'http://localhost:8082';

const results = [];

async function req(method, url, body, token) {
  const res = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  const payload = data?.data !== undefined && data?.success !== undefined ? data.data : data;
  return { ok: res.ok, status: res.status, payload, raw: data };
}

function record(name, ok, detail = '') {
  results.push({ name, ok, detail });
  const mark = ok ? '✓' : '✗';
  console.log(`${mark} ${name}${detail ? ` — ${detail}` : ''}`);
}

async function main() {
  console.log(`Core: ${CORE}\nPayments: ${PAYMENTS}\n`);

  let r = await req('GET', `${CORE}/api/public/settings`);
  record('GET /api/public/settings', r.ok, String(r.status));

  r = await req('GET', `${CORE}/api/campaigns`);
  record('GET /api/campaigns', r.ok && Array.isArray(r.payload), String(r.status));

  r = await req('GET', `${CORE}/api/scholars`);
  record('GET /api/scholars', r.ok && Array.isArray(r.payload), String(r.status));

  r = await req('GET', `${CORE}/api/institutions`);
  record('GET /api/institutions', r.ok && Array.isArray(r.payload), String(r.status));

  r = await req('GET', `${CORE}/api/content/quotes/random`);
  record('GET /api/content/quotes/random', r.ok, String(r.status));

  r = await req('GET', `${CORE}/api/stats/dashboard`);
  record('GET /api/stats/dashboard', r.ok, String(r.status));

  r = await req('GET', `${CORE}/api/events`);
  record('GET /api/events', r.ok && Array.isArray(r.payload), String(r.status));

  r = await req('GET', `${CORE}/api/students/public`);
  record('GET /api/students/public', r.ok && Array.isArray(r.payload), String(r.status));

  r = await req('POST', `${CORE}/api/contact-messages`, {
    name: 'API Test',
    email: 'test@example.com',
    subject: 'Smoke test',
    message: 'Integration test message',
  });
  record('POST /api/contact-messages', r.ok, String(r.status));

  r = await req('POST', `${CORE}/api/registrations`, {
    fullName: 'Test Student',
    email: 'student@example.com',
    course: 'Hifz',
    message: 'Integration test',
  });
  record('POST /api/registrations', r.ok, String(r.status));

  const email = `donor_${Date.now()}@example.com`;
  r = await req('POST', `${CORE}/auth/register`, {
    firstName: 'Test',
    lastName: 'Donor',
    email,
    password: 'Password123!',
    preferredLanguage: 'en',
  });
  const token = r.payload?.token;
  record('POST /auth/register', r.ok && !!token, String(r.status));

  if (token) {
    r = await req('GET', `${CORE}/auth/me`, null, token);
    record('GET /auth/me', r.ok && r.payload?.email === email, String(r.status));
  }

  r = await req('POST', `${CORE}/api/donations/guest/initiate`, {
    amount: 25,
    currency: 'USD',
    donorEmail: 'guest@example.com',
    donorName: 'Guest Donor',
    purpose: 'general',
  });
  const donationId = r.payload?.id;
  record('POST /api/donations/guest/initiate', r.ok && !!donationId, String(r.status));

  if (donationId) {
    r = await req('POST', `${PAYMENTS}/api/payments/initiate`, {
      donationId,
      amount: 25,
      currency: 'USD',
      donorId: 'guest',
    });
    const paymentId = r.payload?.paymentId;
    record('POST payments /initiate', r.ok && !!paymentId, String(r.status));

    if (paymentId) {
      r = await req('POST', `${PAYMENTS}/api/payments/${paymentId}/mock-success`);
      record('POST payments mock-success', r.ok, String(r.status));

      r = await req('GET', `${CORE}/api/donations/${donationId}/status`);
      record('GET donation status after pay', r.ok, r.payload?.status || '');
    }
  }

  const failed = results.filter((x) => !x.ok);
  console.log(`\n${results.length - failed.length}/${results.length} passed`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
