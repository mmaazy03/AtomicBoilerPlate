import React from 'react';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en';
import es from './locales/es';
import AsyncStorage from '@react-native-async-storage/async-storage';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  detection: {
    caches: ['asyncStorage'],
  },
  debug: true,
});

i18n.on('languageChanged', lng => {
  AsyncStorage.setItem('appLanguage', lng);
});

export default i18n;
