import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en.json';
import ur from './translations/ur.json';

i18n.use(initReactI18next).init({

  lng: 'en',

  fallbackLng: 'en',

  resources: {
    en: {
      translation: en,
    },

    ur: {
      translation: ur,
    },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;