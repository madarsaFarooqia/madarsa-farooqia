MOCK DATA PACKAGE (src/mocks)
=============================

Purpose
-------
- Provides in-memory responses for the same `/api/...` routes the app uses.
- Lets you review the full UI before the backend exists.

Enable / disable
----------------
- Development: mocks are ON by default.
- To call your real API from `yarn start`, add to `.env.development.local`:

    REACT_APP_USE_MOCK_API=false

- To force mocks on in any build:

    REACT_APP_USE_MOCK_API=true

Admin panel in mock mode
-------------------------
1. Add to `.env.development.local`:

    REACT_APP_MOCK_USER_ROLE=admin

2. In the browser console (once per browser):

    localStorage.setItem('madrasa_access_token', 'mock');

3. Refresh and open /admin

My Donations in mock mode
-------------------------
- With the mock token set, the mock user email is donor@example.com; sample
  donations use that email so /my-donations shows charts.

Remove when integrating
-------------------------
1. Delete the entire folder: `src/mocks/`
2. In `src/services/http.js`, remove the import of `@/mocks/config` and
   `@/mocks/handlers`, and remove the `if (isMockApiEnabled()) { ... }` block
   at the top of `apiRequest`.
