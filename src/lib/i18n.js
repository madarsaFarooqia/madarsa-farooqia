import en from '../locales/en.json';
import ar from '../locales/ar.json';
import ur from '../locales/ur.json';
import hi from '../locales/hi.json';
import tr from '../locales/tr.json';

export const languages = [
  { code: 'en', label: 'English', dir: 'ltr', flag: '🇺🇸' },
  { code: 'ar', label: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  { code: 'ur', label: 'اردو', dir: 'rtl', flag: '🇮🇳' },
  { code: 'hi', label: 'हिंदी', dir: 'ltr', flag: '🇮🇳' },
  { code: 'tr', label: 'Türkçe', dir: 'ltr', flag: '🇹🇷' },
];

const translations = { en, ar, ur, hi, tr };

export const useTranslation = (lang) => {
  const data = translations[lang] || translations.en;

  const t = (key, defaultText) => {
    if (!key) return '';

    // Support namespace:key
    if (key.includes(':')) {
      const [ns, actualKey] = key.split(':');
      return data[ns]?.[actualKey] || defaultText || actualKey;
    }

    // Fallback to common or search in all namespaces
    if (data.common?.[key]) return data.common[key];

    // Search in all namespaces if no namespace provided
    for (const ns in data) {
      if (data[ns][key]) return data[ns][key];
    }

    return defaultText || key;
  };

  return { t };
};