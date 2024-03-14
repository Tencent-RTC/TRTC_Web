<template>
  <el-row style='padding: 0 10px 40px 10px'>
    <el-col :md='{span: 18, offset: 3}' :sm='{span: 24}'>
      <div class="invite">
        <div class='share-link'>
          <div class='alert'>{{ t('inviteUrl') }}</div>
        </div>
      </div>
      <div style='padding-top: 10px'>
        <el-button type='primary' @click='handleEnter'>
          Enter
        </el-button>
        <el-button type='primary' @click='handleExit'>
          Exit
        </el-button>
      </div>
      <div id='local' style='max-width: 640px;margin-top: 20px'></div>
      <div class='remote-container'>
        <template v-for='userId in store.invitedRemoteUsers' :key='userId'>
          <div :id='userId' style='max-width: 640px;margin-top: 20px'></div>
        </template>
      </div>
    </el-col>
  </el-row>
</template>
<script lang='ts' setup>
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus/es';
import { nextTick } from 'vue';
import TRTC from 'trtc-sdk-v5';
import { getParamKey } from '@/utils/utils';
import appStore from '@/store';

const { t } = useI18n();
const store = appStore();

const sdkAppId = parseInt(getParamKey('sdkAppId'), 10);
const myUserId = getParamKey('userId');
const userSig = getParamKey('userSig');
const roomId = parseInt(getParamKey('roomId'), 10);

const state = { url: window.location.href.split('?')[0] };
window.history.pushState(state, '', 'index.html#/invite');

navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
  stream.getTracks().forEach((track) => { track.stop(); });
}).catch(() => {
  ElMessage({ message: t('permit'), type: 'error' });
});

if (!sdkAppId || !myUserId || !userSig || !roomId) {
  ElMessage.error(t('check'));
}
const trtc = TRTC.create();

async function handleEnter() {
  try {
    await trtc.enterRoom({
      roomId,
      sdkAppId,
      userId: myUserId,
      userSig,
    });

    trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, handleRemoteVideoAvailable);
    trtc.on(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, handleRemoteVideoUnavailable);

    await trtc.startLocalAudio();
    await trtc.startLocalVideo({
      view: 'local',
      option: {
        profile: '1080p',
      },
    });
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    });
  }
}

async function handleRemoteVideoAvailable(event: any) {
  console.log('[demo] Video Available', event);
  const { userId, streamType } = event;
  try {
    if (streamType === TRTC.TYPE.STREAM_TYPE_MAIN) {
      store.invitedRemoteUsers.push(`${userId}_main`);
      await nextTick();
      await trtc.startRemoteVideo({ userId, streamType, view: `${userId}_main` });
    } else {
      store.invitedRemoteUsers.push(`${userId}_screen`);
      await nextTick();
      trtc.startRemoteVideo({ userId, streamType, view: `${userId}_screen` });
    }
    console.log(`startRemoteVideo success: [${userId}]`);
  } catch (error: any) {
    console.log(`startRemoteVideo failed: [${userId}], error: ${error.message}`);
  }
}

async function handleRemoteVideoUnavailable(event: any) {
  console.log('[demo] Video Unavailable', event);
  const { streamType } = event;
  trtc.stopRemoteVideo({ userId: event.userId, streamType });
  if (streamType === TRTC.TYPE.STREAM_TYPE_MAIN) {
    store.invitedRemoteUsers = store.invitedRemoteUsers.filter((userId: string) => userId !== `${event.userId}_main`);
  } else {
    store.invitedRemoteUsers = store.invitedRemoteUsers.filter((userId: string) => userId !== `${event.userId}_screen`);
  }
}

async function handleExit() {
  try {
    trtc.off(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, handleRemoteVideoAvailable);
    trtc.off(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, handleRemoteVideoUnavailable);
    await trtc.exitRoom();
    await trtc.stopLocalVideo();
    await trtc.stopLocalAudio();
  } catch (error: any) {
    ElMessage({ message: `Exit room failed. Error: ${error.message}`, type: 'error' });
  }
}
</script>
<style lang='stylus' scoped>
.invite
  display flex
  padding-top 20px

.share-link
  color #084298
  background-color #cfe2ff
  border-color #b6d4fe
  width 100%
  padding 15px 20px
  font-size 14px
  border-radius 4px

.el-button
  background-color #0d6efd
  font-size 14px
  font-weight 400
  padding 4px 8px

.el-button:hover
  background-color #0d6efd

.el-button:focus
  background-color #0d6efd

.el-button + .el-button
  margin-left 6px

.remote-container
  display flex
  flex-wrap wrap
  justify-content space-between
  padding-top 20px
</style>
