import { createI18n } from 'vue-i18n';
import en from './locales/en';
import hi from './locales/hi';
import ta from './locales/ta';
import te from './locales/te';

export const LOCALE_STORAGE_KEY = 'jivalab-locale';
export const SUPPORTED_LOCALES = ['en', 'hi', 'ta', 'te'];

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
    hi,
    ta,
    te
  }
});

export default i18n;
