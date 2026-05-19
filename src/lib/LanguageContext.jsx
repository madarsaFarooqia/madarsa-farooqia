import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuth } from './AuthContext';
import { languages } from './i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [language, setLanguageState] = useState(() => localStorage.getItem('madrasa_lang') || 'en');

  const updateLanguageMutation = useMutation({
    mutationFn: (languageCode) => authService.updateLanguagePreference(languageCode),
    retry: false,
  });

  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    if (user?.preferredLanguage && user.preferredLanguage !== language) {
      setLanguageState(user.preferredLanguage);
    }
  }, [user?.preferredLanguage]);

  useEffect(() => {
    localStorage.setItem('madrasa_lang', language);
    document.documentElement.dir = currentLang.dir;
    document.documentElement.lang = language;
  }, [language, currentLang]);

  const setLanguage = async (languageCode) => {
    setLanguageState(languageCode);

    if (!isAuthenticated) return;

    try {
      await updateLanguageMutation.mutateAsync(languageCode);
    } catch (error) {
      console.error('Failed to persist language preference:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currentLang, languages, isSavingLanguage: updateLanguageMutation.isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);