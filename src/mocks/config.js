export function isMockApiEnabled() {
  return false;
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
