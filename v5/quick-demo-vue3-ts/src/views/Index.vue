<template>
  <el-row style='padding: 0 10px 40px 10px'>
    <el-col :md='{ span: 18, offset: 3 }' :sm='{ span: 24 }'>
      <Guidance />
      <Inputs />
      <Device @switchDevice='switchDevice' />
      <h1 style='font-size: 14px;font-weight: 500'>{{ t('operation') }}</h1>
      <div class='btn-line'>
        <el-button type='primary' @click='handleEnter'>
          Enter Room
        </el-button>
        <el-button type='primary' @click='handleExit'>
          Exit Room
        </el-button>
      </div>
      <div class='btn-line'>
        <el-button type='primary' @click='handleStartLocalAudio'>
          Start Local Audio
        </el-button>
        <el-button type='primary' @click='handleStopLocalAudio'>
          Stop Local Audio
        </el-button>
        <el-button type='primary' @click='handleStartLocalVideo'>
          Start Local Video
        </el-button>
        <el-button type='primary' @click='handleStopLocalVideo'>
          Stop Local Video
        </el-button>
      </div>
      <div class='btn-line'>
        <el-button type='primary' @click='handleStartShare'>Start Share Screen</el-button>
        <el-button type='primary' @click='handleStopShare'>Stop Share Screen</el-button>
      </div>
      <div class='share-link' v-if='store.isEntered'>
        <div class='alert'>{{ t('invite') }}</div>
        <div class='invite'>
          <button class="invite-btn" @click='copy'>
            <img src="../assets/clippy.svg" alt="Copy to clipboard" class='clip'>
          </button>
          <el-input id="foo" v-model="inviteLink"></el-input>
        </div>
      </div>
      <div class='pusher'>
        <div class='logs'>
          <strong>Log:</strong>
          <template v-for='(item, index) in store.logs' :key='index'>
            <div class='log'>
              <template v-if="item.type === 'success'">
                <span>🟩 </span>{{ item.content }}
              </template>
              <template v-else>
                <span>🟥 </span>{{ item.content }}
              </template>
            </div>
          </template>
        </div>
        <div class='local' id='local' v-show="isStartedVideo">
          <div class='tag'>
            <div :class="audioMuted ? 'muteAudio' : 'unmuteAudio'" @click='toggleAudio'></div>
            <div :class="videoMuted ? 'muteVideo' : 'unmuteVideo'" @click='toggleVideo'></div>
          </div>
        </div>
      </div>
      <Player />
    </el-col>
  </el-row>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import TRTC from 'trtc-sdk-v5';
import { inject, ref, nextTick } from 'vue';
import { copyText } from 'vue3-clipboard';
import Guidance from '@/components/ui/Guidance.vue';
import Inputs from '@/components/Inputs.vue';
import Device from '@/components/Device.vue';
import Player from '@/components/Player.vue';
import appStore from '@/store/index';

const $aegis: any = inject('$aegis');
function reportSuccessEvent(name: string) {
  $aegis.reportEvent({
    name,
    ext1: `${name}-success`,
    ext2: 'webrtcQuickDemoVue3',
    ext3: store.sdkAppId,
  });
}
function reportFailedEvent(name: string, message: string) {
  $aegis.reportEvent({
    name,
    ext1: `${name}-failed#${store.roomId}**${store.userId}*${message}`,
    ext2: 'webrtcQuickDemoVue3',
    ext3: store.sdkAppId,
  });
}

const { t } = useI18n();
const store = appStore();

const trtc = TRTC.create();

const audioMuted = ref(false);
const videoMuted = ref(false);
const isStartedVideo = ref(false);

const inviteLink = ref<string>();

const addSuccessLog = (str: string) => {
  store.logs.push({
    type: 'success',
    content: str,
  });
};

const addFailedLog = (str: string) => {
  store.logs.push({
    type: 'failed',
    content: str,
  });
};

const toggleAudio = async () => {
  try {
    if (!audioMuted.value) {
      await trtc.updateLocalAudio({ mute: true });
      audioMuted.value = true;
    } else {
      await trtc.updateLocalAudio({ mute: false });
      audioMuted.value = false;
    }
    addSuccessLog(`Audio Muted: ${audioMuted.value}`);
  } catch (error: any) {
    addFailedLog(`Mute audio error: ${error.message}`);
  }
};

const toggleVideo = async () => {
  try {
    if (!videoMuted.value) {
      await trtc.updateLocalVideo({ mute: true });
      videoMuted.value = true;
    } else {
      await trtc.updateLocalVideo({ mute: false });
      videoMuted.value = false;
    }
    addSuccessLog(`Video Muted: ${videoMuted.value}`);
  } catch (error: any) {
    addFailedLog(`Mute video error: ${error.message}`);
  }
};

async function handleStartShare() {
  try {
    await trtc.startScreenShare();
    store.isShared = true;
    addSuccessLog('Start share screen success');
  } catch (error: any) {
    addFailedLog(`Start share error: ${error.message}`);
  }
}

async function handleStopShare() {
  if (!store.isShared) {
    ElMessage({ message: 'stopScreenShare() - please start firstly', type: 'warning' });
    return;
  }
  try {
    await trtc.stopScreenShare();
    store.isShared = false;
    addSuccessLog('Stop share screen success');
  } catch (error: any) {
    addFailedLog(`Stop share error: ${error.message}`);
  }
}

async function handleEnter() {
  if (!store.getInitParamsStates()) {
    ElMessage({ message: t('paramsNeed'), type: 'error' });
    return;
  }
  if (store.isEntered) {
    ElMessage({ message: 'duplicate enterRoom() observed', type: 'warning' });
    return;
  }

  try {
    await trtc.enterRoom({
      roomId: store.roomId,
      sdkAppId: parseInt(store.sdkAppId, 10),
      userId: store.userId,
      userSig: store.getUserSig(),
    });
    store.isEntered = true;

    inviteLink.value = store.createShareLink();

    installEventHandlers();

    await handleStartLocalAudio();
    await handleStartLocalVideo();

    addSuccessLog(`[${store.userId}] enter room [${store.roomId}] success`);
    reportSuccessEvent('enterRoom');
  } catch (error: any) {
    addFailedLog(`Enter room ${store.roomId} failed. Error: ${error.message}`);
    reportFailedEvent('enterRoom', error.message);
  }
}

async function handleStartLocalAudio() {
  try {
    await trtc.startLocalAudio({
      option: {
        microphoneId: store.audioDeviceId,
      },
    });
    audioMuted.value = false;
    addSuccessLog('Local audio started successfully');
    reportSuccessEvent('startLocalAudio');
  } catch (error: any) {
    addFailedLog(`Local audio is failed to started. Error: ${error.message}`);
    reportFailedEvent('startLocalAudio', error.message);
  }
}

async function handleStopLocalAudio() {
  try {
    await trtc.stopLocalAudio();
    addSuccessLog('Local audio stopped successfully');
    reportSuccessEvent('stopLocalAudio');
  } catch (error: any) {
    addFailedLog(`Local audio is failed to stopped. Error: ${error.message}`);
    reportFailedEvent('stopLocalAudio', error.message);
  }
}

async function handleStartLocalVideo() {
  try {
    await trtc.startLocalVideo({
      view: 'local',
      option: {
        cameraId: store.videoDeviceId,
        profile: '480p',
      },
    });
    videoMuted.value = false;
    isStartedVideo.value = true;
    addSuccessLog('Local audio stopped successfully');
    reportSuccessEvent('startLocalVideo');
  } catch (error: any) {
    addFailedLog(`Local audio is failed to stopped. Error: ${error.message}`);
    reportFailedEvent('startLocalVideo', error.message);
  }
}

async function handleStopLocalVideo() {
  try {
    await trtc.stopLocalVideo();
    isStartedVideo.value = false;
    addSuccessLog('Local audio stopped successfully');
    reportSuccessEvent('stopLocalVideo');
  } catch (error: any) {
    addFailedLog(`Local audio is failed to stopped. Error: ${error.message}`);
    reportFailedEvent('stopLocalVideo', error.message);
  }
}

async function handleExit() {
  if (!store.isEntered) {
    ElMessage({ message: 'exitRoom() - please enterRoom() firstly', type: 'warning' });
    return;
  }
  try {
    uninstallEventHandlers();
    await trtc.exitRoom();
    await trtc.stopLocalVideo();
    await trtc.stopLocalAudio();
    if (store.isShared) handleStopShare();
    store.isEntered = false;
    store.isAudioPublished = false;
    store.isVideoPublished = false;
    addSuccessLog('Exit room success');
    reportSuccessEvent('exitRoom');
  } catch (error: any) {
    addFailedLog(`Exit room failed. Error: ${error.message}`);
    reportSuccessEvent('exitRoom');
  }
}

async function switchDevice({ videoId, audioId }: { videoId: string, audioId: string }) {
  if (!store.isEntered) {
    return;
  }
  if (videoId) {
    try {
      await trtc.updateLocalVideo({
        option: { cameraId: videoId },
      });
      addSuccessLog('Switch video device success');
    } catch (error: any) {
      addFailedLog('Switch video device failed');
    }
  }
  if (audioId) {
    try {
      await trtc.updateLocalAudio({
        option: { microphoneId: audioId },
      });
      addSuccessLog('Switch audio device success');
    } catch (error: any) {
      addFailedLog('Switch audio device failed');
    }
  }
}

function installEventHandlers() {
  trtc.on(TRTC.EVENT.ERROR, handleError);
  trtc.on(TRTC.EVENT.KICKED_OUT, handleKickedOut);
  trtc.on(TRTC.EVENT.REMOTE_USER_ENTER, handleRemoteUserEnter);
  trtc.on(TRTC.EVENT.REMOTE_USER_EXIT, handleRemoteUserExit);
  trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, handleRemoteVideoAvailable);
  trtc.on(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, handleRemoteVideoUnavailable);
  trtc.on(TRTC.EVENT.REMOTE_AUDIO_UNAVAILABLE, handleRemoteAudioUnavailable);
  trtc.on(TRTC.EVENT.REMOTE_AUDIO_AVAILABLE, handleRemoteAudioAvailable);
  trtc.on(TRTC.EVENT.SCREEN_SHARE_STOPPED, handleScreenShareStopped);
}

function uninstallEventHandlers() {
  trtc.off(TRTC.EVENT.ERROR, handleError);
  trtc.off(TRTC.EVENT.KICKED_OUT, handleKickedOut);
  trtc.off(TRTC.EVENT.REMOTE_USER_ENTER, handleRemoteUserEnter);
  trtc.off(TRTC.EVENT.REMOTE_USER_EXIT, handleRemoteUserExit);
  trtc.off(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, handleRemoteVideoAvailable);
  trtc.off(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, handleRemoteVideoUnavailable);
  trtc.off(TRTC.EVENT.REMOTE_AUDIO_UNAVAILABLE, handleRemoteAudioUnavailable);
  trtc.off(TRTC.EVENT.REMOTE_AUDIO_AVAILABLE, handleRemoteAudioAvailable);
  trtc.off(TRTC.EVENT.SCREEN_SHARE_STOPPED, handleScreenShareStopped);
}

function handleError(error: any) {
  ElMessage({ message: `Local error: ${error.message}`, type: 'error' });
  addFailedLog(`Local error: ${error.message}`);
}

function handleKickedOut(event: any) {
  ElMessage({ message: `User has been kicked out for ${event.reason}`, type: 'warning' });
  addFailedLog(`User has been kicked out for ${event.reason}`);
}

function handleRemoteUserEnter(event: any) {
  const { userId } = event;
  addSuccessLog(`Remote User [${userId}] entered`);
}

function handleRemoteUserExit(event: any) {
  addSuccessLog(`Remote User [${event.userId}] exit`);
}

async function handleRemoteVideoAvailable(event: any) {
  const { userId, streamType } = event;
  try {
    addSuccessLog(`[${userId}] [${streamType}] video available`);
    if (streamType === TRTC.TYPE.STREAM_TYPE_MAIN) {
      store.remoteUsersViews.push(`${userId}_main`);
      await nextTick();
      await trtc.startRemoteVideo({ userId, streamType, view: `${userId}_main` });
    } else {
      store.remoteUsersViews.push(`${userId}_screen`);
      await nextTick();
      trtc.startRemoteVideo({ userId, streamType, view: `${userId}_screen` });
    }
    store.addSuccessLog(`Play remote video success: [${userId}]`);
  } catch (error: any) {
    store.addFailedLog(`Play remote video failed: [${userId}], error: ${error.message}`);
  }
}

function handleRemoteVideoUnavailable(event: any) {
  addSuccessLog(`[${event.userId}] [${event.streamType}] video unavailable`);
  const { streamType } = event;
  trtc.stopRemoteVideo({ userId: event.userId, streamType });
  if (streamType === TRTC.TYPE.STREAM_TYPE_MAIN) {
    store.remoteUsersViews = store.remoteUsersViews.filter((userId: string) => userId !== `${event.userId}_main`);
  } else {
    store.remoteUsersViews = store.remoteUsersViews.filter((userId: string) => userId !== `${event.userId}_screen`);
  }
}

function handleRemoteAudioUnavailable(event: any) {
  addSuccessLog(`[${event.userId}] audio unavailable`);
}

function handleRemoteAudioAvailable(event: any) {
  addSuccessLog(`[${event.userId}] audio available`);
}

function handleScreenShareStopped() {
  store.isShared = false;
  addSuccessLog('Stop share screen success');
}

function copy() {
  copyText(inviteLink.value, undefined, (error: any) => {
    if (error) {
      ElMessage({ message: 'Copy failed!', type: 'error' });
    } else {
      ElMessage({ message: 'Copied!', type: 'success' });
    }
    inviteLink.value = store.createShareLink();
  });
}

</script>

<style lang='stylus' scoped>
.btn-line
  padding-bottom 10px

.share-link
  color #084298
  background-color #cfe2ff
  border-color #b6d4fe
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

.invite
  display flex
  padding-top 6px

  .invite-btn
    height 32px
    display flex
    justify-content center
    align-items center
    border: 1px solid #d5d5d5;
    border-radius 3px
    padding 6px 12px
    cursor pointer
    background-color #eee

  .clip
    width 12px
    height 12px

.logs
  min-width 180px
  width calc(100% - 490px)
  height 360px
  margin-right 10px
  margin-bottom 10px
  border 1px solid #ccc
  padding 6px
  overflow-y scroll

.log
  font-size 12px

.local
  width 480px
  height 360px
  margin 0 0 10px 0
  position relative

@media (max-width: 540px)
  .logs
    width 100%
    height 150px
    margin-right 0

  .local
    width 100%
    height 100%

.pusher
  padding-top 10px
  display flex
  width 100%
  flex-direction row
  flex-wrap wrap
  justify-content space-between

.muteAudio
  background url(../assets/mic-mute.svg) center center no-repeat

.unmuteAudio
  background url(../assets/mic.svg) center center no-repeat

.muteVideo
  background url(../assets/camera-mute.svg) center center no-repeat

.unmuteVideo
  background url(../assets/camera.svg) center center no-repeat

.tag
  position absolute
  bottom 0
  width 100%
  height 25px
  z-index 999
  background rgba(0, 0, 0, 0.3)
  display flex
  padding 0 4px
  flex-direction row-reverse

.tag > div
  height 25px
  width 25px
  cursor pointer

</style>
