// Mock all dependencies before importing App
jest.mock('react-router-dom', () => ({
  HashRouter: ({ children }) => <>{children}</>,
  Route: ({ element }) => element,
  Routes: ({ children }) => <>{children}</>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
  useParams: () => ({}),
  Navigate: ({ to }) => <div>Navigate to {to}</div>
}));

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
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
    isLoggingIn: false
  })
}));

jest.mock('./lib/LanguageContext', () => ({
  LanguageProvider: ({ children }) => <>{children}</>,
  useLanguage: () => ({
    language: 'en',
    setLanguage: jest.fn()
  })
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

// Mock Layout component
jest.mock('./components/layout/Layout', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="layout">{children}</div>
}));

// // Mock i18n
// jest.mock('react-i18next', () => ({
//   useTranslation: () => ({
//     t: (key) => key,
//     i18n: { language: 'en' }
//   })
// }));

// Now import and run tests
import { render } from '@testing-library/react';
import App from './App';

test('App renders without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeDefined();
});