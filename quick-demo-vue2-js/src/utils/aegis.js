/*
 * @Description: Agies
 * @Date: 2022-03-18 17:42:38
 * @LastEditTime: 2022-04-07 17:42:51
 */

import Vue from 'vue';
import Aegis from 'aegis-web-sdk';

const isProd = location.origin === 'https://web.sdk.qcloud.com';
const isDev = location.origin.includes('localhost') || location.origin.includes('127.0.0.1');
const DEMOKEY = isProd ? 'v5QuickDemoVue2' : 'v5QuickDemoVue2Dev';

const AEGIS_ID = {
  dev: 'iHWefAYqBEHVFrSxnV',
  prod: 'iHWefAYqVGQzlNLveU',
};

let aegis;

if (isProd || isDev) {
  aegis = new Aegis({
    id: isProd ? AEGIS_ID.prod : AEGIS_ID.dev,
    reportApiSpeed: false,
    reportAssetSpeed: false,
  });
}

Vue.prototype.$DEMOKEY = DEMOKEY;
Vue.prototype.$aegis = aegis;
