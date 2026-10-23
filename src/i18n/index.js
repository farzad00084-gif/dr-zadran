import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import fa from './locales/fa/translation.json';
import ps from './locales/ps/translation.json';
import { getLanguageFromPath } from '../utils/localizedPath.js';

const initialLanguage =
  typeof window === 'undefined' ? 'en' : getLanguageFromPath(window.location.pathname);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fa: { translation: fa },
    ps: { translation: ps },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  supportedLngs: ['en', 'fa', 'ps'],
  initImmediate: false,
  interpolation: { escapeValue: false },
  returnObjects: true,
  react: { useSuspense: false },
});

export default i18n;
