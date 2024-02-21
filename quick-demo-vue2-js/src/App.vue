<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$aegis.reportEvent({
      name: 'loaded',
      ext1: 'loaded-success',
      ext2: 'webrtcQuickDemoVue2',
    });
  },
};
</script>
