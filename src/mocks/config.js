/**
 * Mock API: on in development by default so the UI works with no backend.
 * Turn off when your API is running: `REACT_APP_USE_MOCK_API=false` in `.env.development.local`.
 * Production: mocks run only if you explicitly set `REACT_APP_USE_MOCK_API=true` (not recommended).
 */
export function isMockApiEnabled() {
  if (process.env.REACT_APP_USE_MOCK_API === 'false') return false;
  if (process.env.REACT_APP_USE_MOCK_API === 'true') return true;
  return process.env.NODE_ENV === 'development';
}

export function mockUserRole() {
  return process.env.REACT_APP_MOCK_USER_ROLE || '';
}

export async function mockDelay(signal, ms = 280) {
  await new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    const onAbort = () => {
      clearTimeout(t);
      reject(new DOMException('Aborted', 'AbortError'));
    };
    if (signal?.aborted) {
      onAbort();
      return;
    }
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}
