import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { appParams } from '@/lib/app-params';
import { authService } from '@/services/authService';
import { publicAppService } from '@/services/publicAppService';
import { getStoredToken, setStoredToken } from '@/services/http';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  const hydrateUser = useCallback(async () => {
    if (!getStoredToken()) {
      setUser(null);
      setIsAuthenticated(false);
      setAuthChecked(true);
      setIsLoadingAuth(false);
      setAuthError(null);
      return;
    }
    setIsLoadingAuth(true);
    try {
      const currentUser = await authService.me();
      setUser(currentUser);
      setIsAuthenticated(true);
      setAuthError(null);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      if (error?.status === 401 || error?.status === 403) {
        setStoredToken(null);
        if (process.env.REACT_APP_ENFORCE_AUTH_GATE === 'true') {
          setAuthError({
            type: 'auth_required',
            message: error?.message || 'Authentication required',
          });
        } else {
          setAuthError(null);
        }
      } else {
        setAuthError(null);
      }
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  }, []);

  const checkAppState = useCallback(async () => {
    setAuthError(null);
    if (appParams.token) {
      setStoredToken(appParams.token);
    }
    setIsLoadingPublicSettings(true);
    if (process.env.REACT_APP_FETCH_PUBLIC_SETTINGS === 'true') {
      try {
        const settings = await publicAppService.getSettings();
        setAppPublicSettings(settings);
      } catch {
        setAppPublicSettings(null);
      }
    } else {
      setAppPublicSettings(null);
    }
    setIsLoadingPublicSettings(false);

    await hydrateUser();
  }, [hydrateUser]);

  useEffect(() => {
    checkAppState();
  }, [checkAppState]);

  const checkUserAuth = useCallback(async () => {
    await hydrateUser();
  }, [hydrateUser]);

  const logout = (shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);
    setAuthError(null);
    authService.logout(shouldRedirect ? '/' : null);
  };

  const navigateToLogin = () => {
    authService.redirectToLogin(`${window.location.pathname}${window.location.search}`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
        authChecked,
        logout,
        navigateToLogin,
        checkUserAuth,
        checkAppState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
