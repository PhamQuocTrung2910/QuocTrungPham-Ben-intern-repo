import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from '../locales/en.json';
import es from '../locales/es.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

const fallback = { languageTag: 'en' };
const { languageTag } =
  RNLocalize.findBestAvailableLanguage(Object.keys(resources)) || fallback;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3', // fixes iOS/Android JSON parsing issues
  resources,
  lng: languageTag,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
