import React, { createContext, useContext, useState, useEffect } from 'react';
import { languages } from './i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('madrasa_lang') || 'en');

  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    localStorage.setItem('madrasa_lang', language);
    document.documentElement.dir = currentLang.dir;
    document.documentElement.lang = language;
  }, [language, currentLang]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currentLang, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);