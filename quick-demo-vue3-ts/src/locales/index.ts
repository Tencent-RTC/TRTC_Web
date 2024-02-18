import { createI18n } from 'vue-i18n';
import { getLanguage } from '../utils/utils';

import en from './lang/en.json';
import zh from './lang/zh-cn.json';

document.title = getLanguage() === 'en' ? 'Quick demo Vue 3 | Tencent RTC' : 'Quick demo Vue 3 | TRTC 实时音视频';

const i18n = createI18n({
  locale: getLanguage() || 'en',
  legacy: false, // 使用Composition API，这里必须设置为false
  globalInjection: true,
  global: true,
  fallbackLocale: 'en',
  messages: {
    en,
    'zh-cn': zh,
  },
});

export default i18n;
