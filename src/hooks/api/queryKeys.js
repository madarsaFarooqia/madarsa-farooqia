export const queryKeys = {
  auth: {
    me: ['auth', 'me'],
  },
  public: {
    settings: ['public', 'settings'],
  },
  teachers: {
    all: (sort, limit) => ['teachers', sort, limit],
  },
  students: {
    all: (sort, limit) => ['students', sort, limit],
  },
  campaigns: {
    all: (sort, limit, filters) => ['campaigns', sort, limit, filters],
    detail: (id) => ['campaigns', id],
  },
  donations: {
    my: ['donations', 'my'],
    admin: (sort, limit) => ['donations', 'admin', sort, limit],
    status: (id) => ['donations', 'status', id],
  },
  events: {
    all: (sort, limit) => ['events', sort, limit],
  },
  registrations: {
    all: (sort, limit) => ['registrations', sort, limit],
  },
  contactMessages: {
    all: (sort, limit) => ['contactMessages', sort, limit],
  },
  institutions: {
    all: ['institutions'],
    detail: (id) => ['institutions', id],
  },
  content: {
    quotes: ['content', 'quotes'],
    randomQuote: ['content', 'quotes', 'random'],
    quotesByType: (type) => ['content', 'quotes', 'type', type],
  },
  stats: {
    dashboard: ['stats', 'dashboard'],
    admin: ['stats', 'admin'],
    videos: (limit) => ['stats', 'videos', limit],
  },
  entity: (name, sort) => ['entity', name, sort],
};
