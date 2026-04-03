import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import zhCN from './zh-cn.json';
import { getLanguage } from '@/utils/utils';

const lng = getLanguage();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    'zh-cn': { translation: zhCN },
  },
  lng,
  fallbackLng: 'en',
  load: 'currentOnly',
  lowerCaseLng: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
