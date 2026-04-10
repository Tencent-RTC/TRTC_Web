<template>
  <div class='inputs-container'>
    <h1 style='font-size: 14px;font-weight: 500'>{{t('param')}}</h1>
    <el-row :gutter='10'>
      <el-col :span="12">
        <el-input v-model="store.sdkAppId" placeholder="sdkAppId" type='number'>
          <template #prepend><div class='key'>SDKAppID</div></template>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-input v-model="store.sdkSecretKey" placeholder="sdkSecretKey" type='string'>
          <template #prepend><div class='key'>sdkSecretKey</div></template>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter='10'>
      <el-col :span="12">
        <el-input v-model="store.userId" placeholder="userID">
          <template #prepend><div class='key'>UserID</div></template>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-input v-model="store.strRoomId" placeholder="roomID(String)">
          <template #prepend><div class='key'>strRoomId</div></template>
        </el-input>
      </el-col>
    </el-row>
    <div class='alert'>
      <el-alert
        type="error"
        :closable="false"
      >
        <span class='alert'>{{ t('alert')}} <a target="_blank" :href="t('url')">{{ t('click')}}</a></span>
      </el-alert>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { getParamKey } from '@/utils/utils';
import appStore from '../store/index';

const { t } = useI18n();
// init input params
const store = appStore();
const urlSdkAppId = getParamKey('sdkAppId');
const urlSecretKey = getParamKey('sdkSecretKey');
store.$patch({
  sdkAppId: urlSdkAppId || localStorage.getItem('trtc_sdkAppId') || '',
  sdkSecretKey: urlSecretKey || localStorage.getItem('trtc_sdkSecretKey') || '',
  userId: getParamKey('userId'),
  strRoomId: getParamKey('strRoomId'),
});
const state = { url: window.location.href.split('?')[0] };
window.history.pushState(state, '', 'index.html#/');

// Cache sdkAppId and sdkSecretKey to localStorage
watch(() => store.sdkAppId, (val) => {
  try { localStorage.setItem('trtc_sdkAppId', val); } catch (e) {}
});
watch(() => store.sdkSecretKey, (val) => {
  try { localStorage.setItem('trtc_sdkSecretKey', val); } catch (e) {}
});

</script>

<style lang='stylus' scoped>
.el-row
  margin-bottom 10px
.key
  width 80px
  color #212529
.alert
  font-size 14px !important
  padding 10px 0
</style>
