import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import fi from './fi.json';
import en from './en.json';

export const resources = {
  en: {
    translation: en,
  },
  fi: {
    translation: fi,
  },
};

i18n.use(initReactI18next).init({
  lng: 'en',
  returnNull: false,
  resources,
  fallbackLng: 'en',
});

export default i18n;
