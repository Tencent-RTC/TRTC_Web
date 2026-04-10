<template>
  <NavBar />
  <router-view />
</template>

<script lang="ts" setup>
import TRTC from 'trtc-sdk-v5';
import { ElMessage } from 'element-plus/es';
import { inject } from 'vue';
import NavBar from '@/components/ui/NavBar.vue';

const $aegis: any = inject('$aegis');

// check current environment is supported TRTC or not
TRTC.isSupported().then((checkResult: any) => {
  console.log('checkResult', checkResult.result, 'checkDetail', checkResult.detail);
  if (!checkResult.result) {
    const isZh = document.documentElement.lang === 'zh' || navigator.language.toLowerCase().startsWith('zh');
    ElMessage({
      message: isZh
        ? '当前浏览器不支持 TRTC，请使用最新版本的 Chrome 浏览器。'
        : 'Your browser does not support TRTC. Please use the latest version of Chrome.',
      type: 'error',
      duration: 0,
      showClose: true,
    });
  }
});

$aegis?.reportEvent({
  name: 'loaded',
  ext1: 'loaded-success',
  ext2: $aegis?.DEMOKEY,
});
</script>

<style lang="stylus">
*
  box-sizing border-box
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, 'Microsoft YaHei', PingFang SC, sans-serif;

body
  margin 0
  padding 0
  width 100%
  height 100%

a
  color #0d6efd
  text-decoration none
</style>
