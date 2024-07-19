import Aegis from 'aegis-web-sdk';

const isProd = window.location.origin === 'https://web.sdk.qcloud.com';
const isDev = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1');
const DEMOKEY = isProd ? 'v5QuickDemoVue3' : 'v5QuickDemoVue3Dev';

const AEGIS_ID = {
  dev: 'iHWefAYqBEHVFrSxnV',
  prod: 'iHWefAYqVGQzlNLveU',
};

let _aegis;

if (isProd || isDev) {
  _aegis = new Aegis({
    id: isProd ? AEGIS_ID.prod : AEGIS_ID.dev,
    reportApiSpeed: true,
    reportAssetSpeed: true,
  });
}

(_aegis as any).DEMOKEY = DEMOKEY;

const aegis = _aegis || {};

export default aegis;
