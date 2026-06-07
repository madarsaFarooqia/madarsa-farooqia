// import { render } from '@testing-library/react';
// import App from './App';

// test('App renders without crashing', () => {
//   const { container } = render(<App />);
//   expect(container).toBeTruthy();
// });

// Mock all problematic dependencies before importing App
jest.mock('./components/ui/toaster', () => ({
  Toaster: () => null
}));

jest.mock('sonner', () => ({
  Toaster: () => null
}));

jest.mock('./lib/AuthContext', () => ({
  AuthProvider: ({ children }) => <>{children}</>,
  useAuth: () => ({
    isLoadingAuth: false,
    isLoadingPublicSettings: false,
    authError: null,
    user: null
  })
}));

jest.mock('./lib/LanguageContext', () => ({
  LanguageProvider: ({ children }) => <>{children} </>
}));

jest.mock('./lib/query-client', () => ({
  queryClientInstance: {
    getDefaultOptions: () => ({}),
    setDefaultOptions: () => {},
    mount: () => {},
    unmount: () => {}
  }
}));

jest.mock('@tanstack/react-query', () => ({
  QueryClientProvider: ({ children }) => <>{children}</>,
  QueryClient: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  HashRouter: ({ children }) => <>{children}</>,
  Route: ({ element }) => element,
  Routes: ({ children }) => <>{children}</>
}));

// Mock Layout component
jest.mock('./components/layout/Layout', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>
}));

// Now import App
import { render } from '@testing-library/react';
import App from './App';

test('App renders without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeDefined();
});