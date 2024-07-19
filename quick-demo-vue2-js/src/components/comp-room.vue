<template>
  <div class="rtc-container">
    <p v-if="isHostMode" class="label">{{ $t('Operation') }}</p>
    <div class="control-container">
      <div class="rtc-control-container">
        <el-button
          class="button"
          type="primary"
          size="small"
          :loading="roomStatus === 'entering'"
          :disabled="roomStatus === 'entered'"
          @click="handleEnterRoom">{{ $t('Enter Room') }}</el-button>
        <el-button
          class="button"
          type="primary"
          size="small"
          :loading="roomStatus === 'exiting'"
          @click="handleExit">{{ $t('Exit Room') }}</el-button>
      </div>
      <div class="rtc-control-container">
        <el-button
          v-if="isHostMode"
          class="button"
          type="primary"
          :loading="micStatus === 'starting'"
          :disabled="micStatus === 'started'"
          size="small" @click="handleStartLocalAudio">{{ $t('Start Local Audio') }}
        </el-button>
        <el-button
          v-if="isHostMode"
          class="button"
          type="primary"
          :loading="camStatus === 'starting'"
          :disabled="camStatus === 'started'"
          size="small" @click="handleStartLocalVideo">{{ $t('Start Local Video') }}
        </el-button>
        <el-button
          v-if="isHostMode"
          class="button"
          :loading="micStatus === 'stopping'"
          type="primary" size="small" @click="handleStopLocalAudio">{{ $t('Stop Local Audio') }}
        </el-button>
        <el-button
          v-if="isHostMode"
          class="button"
          :loading="camStatus === 'stopping'"
          type="primary" size="small" @click="handleStopLocalVideo">{{ $t('Stop Local Video') }}
        </el-button>
      </div>
      <div v-if="isHostMode" class="screen-share-control-container">
        <el-button
          class="button"
          type="primary"
          size="small"
          :loading="shareStatus === 'sharing'"
          :disabled="shareStatus === 'shared'"
          @click="handleStartScreenShare">{{ $t('Start Screen Share') }}</el-button>
        <el-button
          class="button"
          type="primary"
          size="small"
          :loading="shareStatus === 'stopping'"
          @click="handleStopScreenShare">{{ $t('Stop Screen Share') }}</el-button>
      </div>
    </div>

    <div v-if="showInviteLink" class="invite-link-container">
      <span v-if="isEnLang">Copy the link to invite friends to enter the video call, one link can invite only one person,
        the link will be updated automatically after copying.</span>
      <span v-else>复制链接邀请好友加入视频通话，一条链接仅可邀请一人，复制后自动更新链接。</span>
      <el-input class="invite-input" v-model="inviteLink">
        <template slot="prepend">
          <el-tooltip
            :visibleArrow="false"
            effect="dark"
            content="Copied!"
            placement="bottom"
            :manual="true"
            v-model="showCopiedTip">
            <span class="invite-btn" @click="handleCopyInviteLink">
              <svg-icon icon-name="copy"></svg-icon>
            </span>
          </el-tooltip>
        </template>
      </el-input>
    </div>

    <div class="info-container" :class="$isMobile && 'info-container-mobile'">
      <div v-if="isHostMode" class="log-container" ref="logContainer">
        <p class="log-label">Log:</p>
        <div v-for="(item, index) in logList" :key="index">
          <span class="log-state" v-if="item.type === 'success'">🟩 </span>
          <span class="log-state" v-if="item.type === 'failed'">🟥 </span>
          <span>{{ item.log }}</span>
        </div>
      </div>

      <div v-show="camStatus === 'started'" class="local-stream-container">
        <div id="local" class="local-stream-content"></div>
        <div class="local-stream-control">
          <div class="video-control control">
            <span v-if="!isMutedVideo" @click="muteVideo">
              <svg-icon icon-name="video" class="icon-class"></svg-icon>
            </span>
            <span v-if="isMutedVideo"  @click="unmuteVideo">
              <svg-icon icon-name="video-muted" class="icon-class"></svg-icon>
            </span>
          </div>
          <div class="audio-control control">
            <span v-if="!isMutedAudio" @click="muteAudio">
              <svg-icon icon-name="audio" class="icon-class"></svg-icon>
            </span>
            <span v-if="isMutedAudio" @click="unmuteAudio">
              <svg-icon icon-name="audio-muted" class="icon-class"></svg-icon>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="remote-container">
      <div
        v-for="(item) in remoteUsersViews"
        :key="item"
        :id="item"
        class="remote-stream-container">
      </div>
    </div>
  </div>
</template>

<script>
import rtc from './mixins/rtc.js';
import TRTC from 'trtc-sdk-v5';
import LibGenerateTestUserSig from '@/utils/lib-generate-test-usersig.min.js';

export default {
  name: 'compRoom',
  mixins: [rtc],
  props: {
    type: String,
    sdkAppId: Number,
    sdkSecretKey: String,
    userId: String,
    roomId: Number,
    cameraId: String,
    microphoneId: String,
    inviteUserSig: String,
  },
  data() {
    return {
      logList: [],
      inviteLink: '',
      showCopiedTip: false,
    };
  },
  mounted() {
    this.trtc = TRTC.create();
  },
  computed: {
    isHostMode() {
      return this.type !== 'invite';
    },
    isEnLang() {
      return this.$i18n.locale === 'en';
    },
    showInviteLink() {
      return this.isHostMode && this.roomStatus === 'entered' && this.inviteLink;
    },
  },
  watch: {
    cameraId(val) {
      this.switchDevice('video', val);
    },
    microphoneId(val) {
      this.switchDevice('audio', val);
    },
  },
  methods: {
    generateInviteLink() {
      if (!this.isHostMode) {
        return;
      }
      const { sdkAppId, sdkSecretKey, roomId } = this;
      const inviteUserId = `user_${parseInt(Math.random() * 100000000, 10)}`;
      const userSigGenerator = new LibGenerateTestUserSig(sdkAppId, sdkSecretKey, 604800);
      const inviteUserSig = userSigGenerator.genTestUserSig(inviteUserId);
      this.inviteLink = encodeURI(`${location.origin}${location.pathname}#/invite?sdkAppId=${sdkAppId}&userSig=${inviteUserSig}&roomId=${roomId}&userId=${inviteUserId}`);
    },
    handleCopyInviteLink() {
      navigator.clipboard.writeText(this.inviteLink);
      this.showCopiedTip = true;
      setTimeout(() => {
        this.showCopiedTip = false;
      }, 1500);
      this.generateInviteLink();
    },
    async handleEnterRoom() {
      if (this.isHostMode) {
        if (!this.sdkAppId || !this.sdkSecretKey) {
          alert(this.$t('Please enter sdkAppId and sdkSecretKey'));
          return;
        }
        if (!this.userId || !this.roomId) {
          alert(this.$t('Please enter userId and roomId'));
          return;
        }
        const userSigGenerator = new LibGenerateTestUserSig(this.sdkAppId, this.sdkSecretKey, 604800);
        this.userSig = userSigGenerator.genTestUserSig(this.userId);
      } else {
        if (!this.sdkAppId || !this.inviteUserSig || !this.userId || !this.roomId) {
          alert(this.$t('Please reacquire the invitation link'));
          return;
        }
        this.userSig = this.inviteUserSig;
      }
      await this.enterRoom();
      this.handleStartLocalAudio();
      this.handleStartLocalVideo();
      this.generateInviteLink();
    },

    async handleExit() {
      await this.exitRoom();
    },

    async handleStartScreenShare() {
      if (!this.sdkAppId || !this.sdkSecretKey) {
        alert(this.$t('Please enter sdkAppId and sdkSecretKey'));
        return;
      }
      this.shareStatus = 'sharing';
      try {
        await this.trtc.startScreenShare();
        this.shareStatus = 'shared';
        this.addSuccessLog('Start share screen success');
      } catch (error) {
        this.shareStatus = 'stopped';
        this.addFailedLog(`Start share error: ${error.message}`);
      }
    },

    async handleStopScreenShare() {
      if (this.shareStatus !== 'shared') {
        this.addFailedLog('The Share is not started');
        return;
      }
      this.shareStatus = 'stopping';
      try {
        await this.trtc.stopScreenShare();
        this.shareStatus = 'stopped';
        this.addSuccessLog('Stop share screen success');
      } catch (error) {
        this.shareStatus = 'shared';
        this.addFailedLog(`Stop share error: ${error.message}`);
      }
    },

    addSuccessLog(log) {
      if (!this.isHostMode) {
        return;
      }
      this.logList.push({
        type: 'success',
        log,
      });
      const { scrollHeight } = this.$refs.logContainer;
      this.$refs.logContainer.scrollTop = scrollHeight;
    },

    addFailedLog(log) {
      if (!this.isHostMode) {
        return;
      }
      this.logList.push({
        type: 'failed',
        log,
      });
      const { scrollHeight } = this.$refs.logContainer;
      this.$refs.logContainer.scrollTop = scrollHeight;
    },
    reportSuccessEvent(name) {
      const ext3 = name === 'enterRoom' ? this.sdkAppId : 0;
      this.$aegis?.reportEvent({
        name,
        ext1: `${name}-success`,
        ext2: this.$DEMOKEY,
        ext3,
      });
    },
    reportFailedEvent(name, error, type = 'rtc') {
      this.$aegis?.reportEvent({
        name,
        ext1: `${name}-failed#${this.roomId}*${type === 'share' ? this.shareUserId : this.userId}*${error.message}`,
        ext2: this.$DEMOKEY,
        ext3: 0
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.rtc-container {
  .label {
    margin: 14px 0 6px;
    text-align: left;
    font-weight: bold;
  }

  .control-container {
    text-align: left;
    margin-bottom: 10px;
    div:not(:nth-last-child(1)) {
      margin-bottom: 10px;
    }
    .button:not(:first-child) {
      margin-left: 2px;
    }
  }

  .invite-link-container {
    width: 100%;
    color: #084298;
    background-color: #cfe2ff;
    position: relative;
    padding: 10px 16px;
    margin-bottom: 16px;
    border: 1px solid #b6d4fe;
    border-radius: 0.25rem;
    .invite-input {
      margin-top: 10px;
    }
    .invite-btn {
      display: flex;
      cursor: pointer;
    }
  }

  .info-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .log-container {
      flex-grow: 1;
      border: 1px solid #dddddd;
      height: 360px;
      padding: 10px;
      margin-right: 16px;
      overflow-y: scroll;
      .log-label {
        margin: 0 0 6px;
        font-weight: bold;
      }
      .log-state {
        display: inline-block;
        margin-right: 6px;
      }
      > div {
        font-size: 12px;
      }
    }
    .local-stream-container {
      width: 480px;
      height: 360px;
      position: relative;
      flex-shrink: 0;
      .local-stream-content {
        width: 100%;
        height: 100%;
      }
      .local-stream-control {
        width: 100%;
        height: 30px;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 10px;
        .control {
          margin-left: 10px;
        }
        .icon-class {
          color: #fff;
          cursor: pointer;
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .info-container-mobile {
    display: block;
    .log-container {
      margin-right: 0;
    }
    .local-stream-container {
      width: 320px;
      height: 240px;
      margin-top: 10px;
    }
  }

  .remote-container {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    .remote-stream-container {
      width: 320px;
      height: 240px;
      margin: 0 10px 10px 0;
    }
  }
}
</style>

<i18n>
{
	"en": {
		"Operation": "Operation",
    "Enter Room": "Enter Room",
    "Start Local Audio": "Start Local Audio",
    "Stop Local Audio": "Stop Local Audio",
    "Start Local Video": "Start Local Video",
    "Stop Local Video": "Stop Local Video",
    "Exit Room": "Exit Room",
    "Start Screen Share": "Start Screen Share",
    "Stop Screen Share": "Stop Screen Share",
    "Please enter sdkAppId and sdkSecretKey": "Please enter sdkAppId and sdkSecretKey",
    "Please enter userId and roomId": "Please enter userId and roomId",
    "Please reacquire the invitation link": "Please reacquire the invitation link!"
	},
	"zh-cn": {
		"Operation": "操作",
    "Enter Room": "进入房间",
    "Start Local Audio": "采集麦克风",
    "Stop Local Audio": "终止采集麦克风",
    "Start Local Video": "采集摄像头",
    "Stop Local Video": "终止采集摄像头",
    "Exit Room": "离开房间",
    "Start Screen Share": "开始共享屏幕",
    "Stop Screen Share": "停止共享屏幕",
    "Please enter sdkAppId and sdkSecretKey": "请输入 sdkAppId 和 sdkSecretKey",
    "Please enter userId and roomId": "请输入 userId 和 roomId",
    "Please reacquire the invitation link": "请重新获取邀请链接！"
	}
}
</i18n>
