import { http, getStoredToken, setStoredToken } from './http';
import { mapUserFromAuth } from '../lib/apiMappers';

function mapAuthResponse(response) {
  const token = response?.token;
  if (token) setStoredToken(token);
  const user = mapUserFromAuth({
    email: response?.email,
    role: response?.role,
    preferredLanguage: response?.preferredLanguage,
    firstName: response?.firstName,
    lastName: response?.lastName,
    id: response?.id,
    fullName: response?.fullName,
  });
  return { token, user, ...response };
}

export const authService = {
  async me() {
    if (!getStoredToken()) {
      throw new Error('Not authenticated');
    }
    const data = await http.get('/auth/me');
    return mapUserFromAuth(data);
  },

  async login(credentials) {
    const response = await http.post('/auth/login', credentials);
    return mapAuthResponse(response);
  },

  async register(userData) {
    const payload = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      phoneNumber: userData.phoneNumber,
      preferredLanguage: userData.preferredLanguage || 'en',
    };
    const response = await http.post('/auth/register', payload);
    return mapAuthResponse(response);
  },

  async forgotPassword(email) {
    return http.post('/auth/forgot-password', { email });
  },

  async resetPassword(data) {
    return http.post('/auth/reset-password', {
      token: data.token,
      newPassword: data.newPassword,
    });
  },

  async updateLanguagePreference(language) {
    return http.put('/auth/language', { language });
  },

  logout(redirectTo) {
    setStoredToken(null);
    if (typeof window !== 'undefined' && redirectTo) {
      window.location.assign(redirectTo);
    }
  },

  redirectToLogin(returnPath) {
    if (typeof window === 'undefined') return;
    const next = returnPath || `${window.location.pathname}${window.location.search}`;
    window.location.assign(`/login?next=${encodeURIComponent(next)}`);
  },
};
