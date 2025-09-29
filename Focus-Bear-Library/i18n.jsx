import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './assets/locales/en.json';
import vi from './assets/locales/vi.json';

// Optional: Helper to get/set language in AsyncStorage
const LANGUAGE_KEY = 'user-language';

export const saveLanguage = async lang => {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
};

export const loadLanguage = async () => {
  return (await AsyncStorage.getItem(LANGUAGE_KEY)) || 'en';
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: { en: { translation: en }, vi: { translation: vi } },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
