<template>
  <div class='player-container'>
    <template v-for='userId in store.remoteUsersViews' :key='userId'>
      <div class='remote' :id='userId'></div>
    </template>
  </div>
</template>

<script lang='ts' setup>
import appStore from '@/store/index';

const store = appStore();
</script>

<style lang='stylus' scoped>
.player-container
  display flex
  width 100%
  min-height 100px
  flex-direction row

.remote
  width 25%
  min-height 100px
  margin 0 10px 10px 0
  position relative

@media (max-width: 540px)
  .remote
    width 100%
    min-height 100px
    margin 0 10px 10px 0
    position relative
    margin-right: 0;

</style>
