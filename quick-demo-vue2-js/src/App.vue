<template>
  <router-view/>
</template>

<script>
import TRTC from 'trtc-sdk-v5';

export default {
  name: 'App',
  mounted() {
    this.$aegis?.reportEvent({
      name: 'loaded',
      ext1: 'loaded-success',
      ext2: this.$DEMOKEY,
    });

    // check current environment is supported TRTC or not
    TRTC.isSupported().then((checkResult) => {
      console.log('checkResult', checkResult.result, 'checkDetail', checkResult.detail);
      if (!checkResult.result) {
        const isZh = this.$i18n?.locale === 'zh-cn';
        this.$message?.error(isZh
          ? '当前浏览器不支持 TRTC，请使用最新版本的 Chrome 浏览器。'
          : 'Your browser does not support TRTC. Please use the latest version of Chrome.');
      }
    });
  },
};
</script>
