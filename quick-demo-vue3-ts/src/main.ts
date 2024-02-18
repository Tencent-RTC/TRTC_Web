import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import TRTC from 'trtc-sdk-v5';
import VueClipboard from 'vue3-clipboard';
import i18n from './locales';
import aegis from './utils/aegis';
import App from './App.vue';
import router from './router';
import 'element-plus/dist/index.css';

const app = createApp(App);

TRTC.setLogLevel(2);
app.use(i18n);
app.use(router);
app.use(createPinia());
app.use(ElementPlus);
app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
});
app.provide('$aegis', aegis);
app.config.globalProperties.$aegis = aegis;
app.mount('#app');
