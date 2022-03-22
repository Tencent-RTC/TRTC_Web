/*
 * @Description: Agies
 * @Date: 2022-03-18 17:42:38
 * @LastEditTime: 2022-03-18 17:47:31
 */

import Vue from 'vue';
import Aegis from 'aegis-web-sdk';

const aegis = new Aegis({
  id: 'iHWefAYqpBFdmIMeDi',
  reportApiSpeed: true, // 接口测速
  reportAssetSpeed: true, // 静态资源测速
});

Vue.prototype.$aegis = aegis;
