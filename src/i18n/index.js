import { createI18n } from 'vue-i18n';
import en from './locales/en';
import es from './locales/es';

export const LOCALE_STORAGE_KEY = 'jivalab-locale';
export const SUPPORTED_LOCALES = ['en', 'es'];

const resolveInitialLocale = () => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
    return savedLocale;
  }

  const browserLocale = window.navigator.language?.split('-')[0];
  if (browserLocale && SUPPORTED_LOCALES.includes(browserLocale)) {
    return browserLocale;
  }

  return 'en';
};

const i18n = createI18n({
  legacy: false,
  locale: resolveInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    es
  }
});

export default i18n;
