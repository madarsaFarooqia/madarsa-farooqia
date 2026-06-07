// Use RELATIVE paths instead of @/ for mocks
jest.mock('./lib/query-client', () => ({
  queryClientInstance: {
    getDefaultOptions: () => ({}),
    setDefaultOptions: () => {},
    mount: () => {},
    unmount: () => {}
  }
}));

jest.mock('./components/ui/toaster', () => ({
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

jest.mock('./components/layout/Layout', () => {
  return function Layout({ children }) {
    return <div data-testid="layout">{children}</div>;
  };
});

jest.mock('./lib/PageNotFound', () => () => <div>PageNotFound</div>);

// Mock third-party libraries
jest.mock('sonner', () => ({
  Toaster: () => null
}));

jest.mock('@tanstack/react-query', () => ({
  QueryClientProvider: ({ children }) => <>{children}</>,
  QueryClient: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  HashRouter: ({ children }) => <>{children}</>,
  Route: ({ element }) => element,
  Routes: ({ children }) => <>{children}</>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
  useParams: () => ({}),
  Navigate: ({ to }) => <div>Navigate to {to}</div>
}));

// Mock all page components using relative paths
jest.mock('./pages/Home', () => () => <div>Home</div>);
jest.mock('./pages/Teachers', () => () => <div>Teachers</div>);
jest.mock('./pages/Donate', () => () => <div>Donate</div>);
jest.mock('./pages/Fundraising', () => () => <div>Fundraising</div>);
jest.mock('./pages/Contact', () => () => <div>Contact</div>);
jest.mock('./pages/MyDonations', () => () => <div>MyDonations</div>);
jest.mock('./pages/Payment', () => () => <div>Payment</div>);
jest.mock('./pages/ComingSoon', () => () => <div>ComingSoon</div>);
jest.mock('./pages/Niswaan', () => () => <div>Niswaan</div>);
jest.mock('./pages/MasjidHifz', () => () => <div>MasjidHifz</div>);
jest.mock('./pages/ReceiptViewer', () => () => <div>ReceiptViewer</div>);
jest.mock('./pages/auth/Login', () => () => <div>Login</div>);
jest.mock('./pages/auth/Signup', () => () => <div>Signup</div>);
jest.mock('./pages/auth/ForgotPassword', () => () => <div>ForgotPassword</div>);
jest.mock('./pages/auth/ResetPassword', () => () => <div>ResetPassword</div>);
jest.mock('./pages/admin/AdminLayout', ({ children }) => <>{children}</>);
jest.mock('./pages/admin/AdminDashboard', () => () => <div>AdminDashboard</div>);
jest.mock('./pages/admin/TeachersAdmin', () => () => <div>TeachersAdmin</div>);
jest.mock('./pages/admin/StudentsAdmin', () => () => <div>StudentsAdmin</div>);
jest.mock('./pages/admin/EventsAdmin', () => () => <div>EventsAdmin</div>);
jest.mock('./pages/admin/RegistrationsAdmin', () => () => <div>RegistrationsAdmin</div>);
jest.mock('./pages/admin/CampaignsPro', () => () => <div>CampaignsPro</div>);
jest.mock('./pages/admin/DonationsPro', () => () => <div>DonationsPro</div>);
jest.mock('./pages/admin/ReportsAdmin', () => () => <div>ReportsAdmin</div>);
jest.mock('./pages/admin/BlogAdmin', () => () => <div>BlogAdmin</div>);
jest.mock('./pages/admin/QAAdmin', () => () => <div>QAAdmin</div>);
jest.mock('./pages/admin/InfrastructureAdmin', () => () => <div>InfrastructureAdmin</div>);
jest.mock('./components/UserNotRegisteredError', () => () => <div>UserNotRegisteredError</div>);
jest.mock('./components/shared/LoadingSpinner', () => () => <div>LoadingSpinner</div>);

import { render } from '@testing-library/react';
import App from './App';

test('App renders without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeDefined();
});