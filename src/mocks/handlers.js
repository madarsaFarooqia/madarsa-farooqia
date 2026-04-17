import { seedPublicSettings } from './fixtures';
import { mockDelay, mockUserRole } from './config';
import {
  getTeachers,
  getStudents,
  getEvents,
  getCampaigns,
  getFundraisingCampaigns,
  getDonations,
  getRegistrations,
  nextDonationId,
} from './state';

const TOKEN_KEY = process.env.REACT_APP_AUTH_TOKEN_KEY || 'madrasa_access_token';

function readToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

function sortKeyFromParam(sort, fallback = 'created_date') {
  if (!sort || typeof sort !== 'string') return { key: fallback, dir: -1 };
  if (sort.startsWith('-')) return { key: sort.slice(1), dir: -1 };
  return { key: sort, dir: 1 };
}

function applyListQuery(items, query = {}) {
  const q = { ...query };
  const sortParam = q.sort;
  const limit = q.limit != null && q.limit !== '' ? Number(q.limit) : undefined;
  delete q.sort;
  delete q.limit;

  let out = items.filter((row) =>
    Object.entries(q).every(([k, v]) => {
      if (v === '' || v === undefined || v === null) return true;
      return String(row[k]) === String(v);
    }),
  );

  const { key, dir } = sortKeyFromParam(sortParam);
  out = [...out].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    const ta = Date.parse(av);
    const tb = Date.parse(bv);
    if (!Number.isNaN(ta) && !Number.isNaN(tb) && (ta || tb)) {
      return (ta - tb) * dir;
    }
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
    return String(av ?? '').localeCompare(String(bv ?? '')) * dir;
  });

  if (Number.isFinite(limit) && limit > 0) out = out.slice(0, limit);
  return out;
}

function parseJsonPath(path, pattern) {
  const re = new RegExp(pattern);
  const m = path.match(re);
  return m || null;
}

function mockAuthMe() {
  if (!readToken()) {
    const err = new Error('Not authenticated');
    err.status = 401;
    throw err;
  }
  const forced = mockUserRole();
  const role = forced === 'admin' ? 'admin' : null;
  return {
    id: 'mock-user-1',
    email: 'donor@example.com',
    full_name: 'Demo Supporter',
    role,
  };
}

/** @returns {Promise<any>} */
export async function handleMockRequest(method, path, { query = {}, body } = {}, signal) {
  await mockDelay(signal);

  if (method === 'GET' && path === '/api/public/settings') {
    return { ...seedPublicSettings };
  }

  if (method === 'GET' && path === '/api/auth/me') {
    return mockAuthMe();
  }

  if (method === 'GET' && path === '/api/teachers') {
    return applyListQuery(getTeachers(), query);
  }
  if (method === 'POST' && path === '/api/teachers') {
    const list = getTeachers();
    const row = { ...body, id: `t-mock-${Date.now()}`, created_date: new Date().toISOString() };
    list.push(row);
    return row;
  }
  {
    const m = parseJsonPath(path, '^/api/teachers/([^/]+)$');
    if (m && method === 'PATCH') {
      const list = getTeachers();
      const row = list.find((x) => x.id === m[1]);
      if (!row) throw Object.assign(new Error('Not found'), { status: 404 });
      Object.assign(row, body);
      return row;
    }
    if (m && method === 'DELETE') {
      const list = getTeachers();
      const i = list.findIndex((x) => x.id === m[1]);
      if (i >= 0) list.splice(i, 1);
      return { ok: true };
    }
  }

  if (method === 'GET' && path === '/api/students') {
    return applyListQuery(getStudents(), query);
  }
  if (method === 'POST' && path === '/api/students') {
    const list = getStudents();
    const row = { ...body, id: `s-mock-${Date.now()}`, created_date: new Date().toISOString() };
    list.push(row);
    return row;
  }
  {
    const m = parseJsonPath(path, '^/api/students/([^/]+)$');
    if (m && method === 'PATCH') {
      const list = getStudents();
      const row = list.find((x) => x.id === m[1]);
      if (!row) throw Object.assign(new Error('Not found'), { status: 404 });
      Object.assign(row, body);
      return row;
    }
    if (m && method === 'DELETE') {
      const list = getStudents();
      const i = list.findIndex((x) => x.id === m[1]);
      if (i >= 0) list.splice(i, 1);
      return { ok: true };
    }
  }

  if (method === 'GET' && path === '/api/events') {
    const q = { ...query };
    if (q.sort === '-date') q.sort = '-date';
    return applyListQuery(getEvents(), q);
  }
  if (method === 'POST' && path === '/api/events') {
    const list = getEvents();
    const row = { ...body, id: `e-mock-${Date.now()}`, created_date: new Date().toISOString() };
    list.push(row);
    return row;
  }
  {
    const m = parseJsonPath(path, '^/api/events/([^/]+)$');
    if (m && method === 'PATCH') {
      const list = getEvents();
      const row = list.find((x) => x.id === m[1]);
      if (!row) throw Object.assign(new Error('Not found'), { status: 404 });
      Object.assign(row, body);
      return row;
    }
    if (m && method === 'DELETE') {
      const list = getEvents();
      const i = list.findIndex((x) => x.id === m[1]);
      if (i >= 0) list.splice(i, 1);
      return { ok: true };
    }
  }

  if (method === 'GET' && path === '/api/campaigns') {
    return applyListQuery(getCampaigns(), query);
  }
  if (method === 'POST' && path === '/api/campaigns') {
    const list = getCampaigns();
    const row = { ...body, id: `c-mock-${Date.now()}`, created_date: new Date().toISOString() };
    list.push(row);
    return row;
  }
  {
    const m = parseJsonPath(path, '^/api/campaigns/([^/]+)$');
    if (m && method === 'PATCH') {
      const list = getCampaigns();
      const row = list.find((x) => x.id === m[1]);
      if (!row) throw Object.assign(new Error('Not found'), { status: 404 });
      Object.assign(row, body);
      return row;
    }
    if (m && method === 'DELETE') {
      const list = getCampaigns();
      const i = list.findIndex((x) => x.id === m[1]);
      if (i >= 0) list.splice(i, 1);
      return { ok: true };
    }
  }

  if (method === 'GET' && path === '/api/fundraising-campaigns') {
    return applyListQuery(getFundraisingCampaigns(), query);
  }
  if (method === 'POST' && path === '/api/fundraising-campaigns') {
    const list = getFundraisingCampaigns();
    const row = { ...body, id: `fc-mock-${Date.now()}`, created_date: new Date().toISOString() };
    list.push(row);
    return row;
  }
  {
    const m = parseJsonPath(path, '^/api/fundraising-campaigns/([^/]+)$');
    if (m && method === 'PATCH') {
      const list = getFundraisingCampaigns();
      const row = list.find((x) => String(x.id) === String(m[1]));
      if (!row) throw Object.assign(new Error('Not found'), { status: 404 });
      Object.assign(row, body);
      return row;
    }
    if (m && method === 'DELETE') {
      const list = getFundraisingCampaigns();
      const i = list.findIndex((x) => String(x.id) === String(m[1]));
      if (i >= 0) list.splice(i, 1);
      return { ok: true };
    }
  }

  if (method === 'GET' && path === '/api/donations') {
    return applyListQuery(getDonations(), query);
  }
  if (method === 'POST' && path === '/api/donations') {
    const list = getDonations();
    const id = nextDonationId();
    const row = {
      ...body,
      id,
      created_date: new Date().toISOString(),
    };
    list.unshift(row);
    return row;
  }
  {
    const m = parseJsonPath(path, '^/api/donations/([^/]+)$');
    if (m && method === 'PATCH') {
      const list = getDonations();
      const row = list.find((x) => x.id === m[1]);
      if (!row) throw Object.assign(new Error('Not found'), { status: 404 });
      Object.assign(row, body);
      return row;
    }
    if (m && method === 'DELETE') {
      const list = getDonations();
      const i = list.findIndex((x) => x.id === m[1]);
      if (i >= 0) list.splice(i, 1);
      return { ok: true };
    }
  }

  if (method === 'GET' && path === '/api/registrations') {
    return applyListQuery(getRegistrations(), query);
  }
  if (method === 'POST' && path === '/api/registrations') {
    const list = getRegistrations();
    const row = { ...body, id: `r-mock-${Date.now()}`, created_date: new Date().toISOString() };
    list.push(row);
    return row;
  }
  {
    const m = parseJsonPath(path, '^/api/registrations/([^/]+)$');
    if (m && method === 'PATCH') {
      const list = getRegistrations();
      const row = list.find((x) => x.id === m[1]);
      if (!row) throw Object.assign(new Error('Not found'), { status: 404 });
      Object.assign(row, body);
      return row;
    }
    if (m && method === 'DELETE') {
      const list = getRegistrations();
      const i = list.findIndex((x) => x.id === m[1]);
      if (i >= 0) list.splice(i, 1);
      return { ok: true };
    }
  }

  if (method === 'POST' && path === '/api/contact-messages') {
    return { id: `cm-mock-${Date.now()}`, received: true, ...body };
  }

  throw Object.assign(new Error(`Mock API: no handler for ${method} ${path}`), { status: 404 });
}
