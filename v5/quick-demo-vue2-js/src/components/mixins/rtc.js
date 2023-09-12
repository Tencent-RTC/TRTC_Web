/*
 * @Description: 音视频通话集成
 * @Date: 2022-03-14 17:15:23
 * @LastEditTime: 2022-03-23 17:47:14
 */
import TRTC from 'trtc-sdk-v5';

export default {
  data() {
    return {
      trtc: null,
      remoteUsersViews: [],
      isMutedVideo: false,
      isMutedAudio: false,
      // status
      camStatus: 'stopped', // stopped, starting, started, stopping
      micStatus: 'stopped',
      roomStatus: 'exited', // exited, exiting, entering, entered
      shareStatus: 'stopped' // stopping, stopped, sharing, shared
    };
  },

  methods: {
    initTRTC() {
      if (this.trtc) return;
      this.trtc = TRTC.create();
      this.addSuccessLog('trtc instance created.');
    },

    async enterRoom() {
      this.roomStatus = 'entering';
      this.initTRTC();
      try {
        await this.trtc.enterRoom({
          roomId: this.roomId,
          sdkAppId: parseInt(this.sdkAppId, 10),
          userId: this.userId,
          userSig: this.userSig,
        });
        this.roomStatus = 'entered';

        this.installEventHandlers();
        this.startGetAudioLevel();
        this.reportSuccessEvent('enterRoom');
        this.addSuccessLog(`Enter room [${this.roomId}] success.`);
      } catch (error) {
        this.roomStatus = 'exited';
        console.error('enterRoom room failed', error);
        this.addFailedLog(`Enter room ${this.roomId} failed, please check your params. Error: ${error.message}`);
        this.reportFailedEvent('enterRoom', error);
        throw error;
      }
    },

    async handleStartLocalAudio() {
      this.micStatus = 'starting';
      this.initTRTC();
      try {
        await this.trtc.startLocalAudio({
          option: {
            microphoneId: this.microphoneId,
          },
        });
        this.isMutedAudio = false;
        this.micStatus = 'started';
        this.addSuccessLog('Local audio started successfully');
        this.reportSuccessEvent('startLocalAudio');
      } catch (error) {
        this.micStatus = 'stopped';
        this.addFailedLog(`Local audio is failed to started. Error: ${error.message}`);
        this.reportFailedEvent('startLocalAudio', error.message);
        throw error;
      }
    },

    async handleStopLocalAudio() {
      if (this.micStatus !== 'started') {
        this.addFailedLog('The audio has not been started');
        return;
      }
      this.micStatus = 'stopping';
      this.initTRTC();
      try {
        await this.trtc.stopLocalAudio();
        this.micStatus = 'stopped';
        this.addSuccessLog('Local audio stopped successfully');
        this.reportSuccessEvent('stopLocalAudio');
      } catch (error) {
        this.micStatus = 'started';
        this.addFailedLog(`Local audio is failed to stopped. Error: ${error.message}`);
        this.reportFailedEvent('stopLocalAudio', error.message);
        throw error;
      }
    },

    async handleStartLocalVideo() {
      this.camStatus = 'starting';
      this.initTRTC();
      try {
        await this.trtc.startLocalVideo({
          view: 'local',
          option: {
            cameraId: this.cameraId,
            profile: '480p',
          },
        });
        this.camStatus = 'started';
        this.isMutedVideo = false;
        this.addSuccessLog('Local video started successfully');
        this.reportSuccessEvent('startLocalVideo');
      } catch (error) {
        this.camStatus = 'stopped';
        this.addFailedLog(`Local video is failed to started. Error: ${error.message}`);
        this.reportFailedEvent('startLocalVideo', error.message);
        throw error;
      }
    },

    async handleStopLocalVideo() {
      if (this.camStatus !== 'started') {
        this.addFailedLog('The video has not been started');
        return;
      }
      this.camStatus = 'stopping';
      this.initTRTC();
      try {
        await this.trtc.stopLocalVideo();
        this.camStatus = 'stopped';
        this.addSuccessLog('Local audio stopped successfully');
        this.reportSuccessEvent('stopLocalVideo');
      } catch (error) {
        this.camStatus = 'started';
        this.addFailedLog(`Local audio is failed to stopped. Error: ${error.message}`);
        this.reportFailedEvent('stopLocalVideo', error.message);
        throw error;
      }
    },

    async exitRoom() {
      if (this.roomStatus !== 'entered') {
        this.addFailedLog('The room has not been entered');
        return;
      }
      this.roomStatus = 'exiting';
      this.stopGetAudioLevel();

      try {
        await this.trtc.exitRoom();
        this.roomStatus = 'exited';
        this.remoteUsersViews = [];
        this.uninstallEventHandlers();

        this.addSuccessLog('Exit room success.');
        this.reportSuccessEvent('exitRoom');
      } catch (error) {
        this.roomStatus = 'entered';
        this.addFailedLog(`Exit room failed. Error: ${error.message}`);
        this.reportFailedEvent('exitRoom', error);
        throw error;
      }

      if (this.micStatus === 'started') this.handleStopLocalAudio();
      if (this.camStatus === 'started') this.handleStopLocalVideo();
      if (this.shareStatus === 'shared') this.handleStopShare();
    },

    async muteVideo() {
      try {
        await this.trtc.updateLocalVideo({ mute: true });
        this.isMutedVideo = true;
        this.addSuccessLog('Mute video success.');
      } catch (error) {
        this.addFailedLog(`Mute video error: ${error.message}`);
      }
    },

    async muteAudio() {
      try {
        await this.trtc.updateLocalAudio({ mute: true });
        this.isMutedAudio = true;
        this.addSuccessLog('Mute audio success.');
      } catch (error) {
        this.addFailedLog(`Mute audio error: ${error.message}`);
      }
    },

    async unmuteVideo() {
      try {
        await this.trtc.updateLocalVideo({ mute: false });
        this.isMutedVideo = false;
        this.addSuccessLog('Unmute video success.');
      } catch (error) {
        this.addFailedLog(`Unmute video error: ${error.message}`);
      }
    },

    async unmuteAudio() {
      try {
        await this.trtc.updateLocalAudio({ mute: false });
        this.isMutedAudio = false;
        this.addSuccessLog('Unmute audio success.');
      } catch (error) {
        this.addFailedLog(`Unmute audio error: ${error.message}`);
      }
    },

    async switchDevice(type, deviceId) {
      try {
        if (type === 'video' && this.camStatus === 'started') {
          await this.trtc.updateLocalVideo({
            option: { cameraId: deviceId },
          });
          this.addSuccessLog(`Switch ${type} device success.`);
        }
        if (type === 'audio' && this.micStatus === 'started') {
          await this.trtc.updateLocalAudio({
            option: { microphoneId: deviceId },
          });
          this.addSuccessLog(`Switch ${type} device success.`);
        }
      } catch (error) {
        console.error('switchDevice failed', error);
        this.addFailedLog(`Switch ${type} device failed.`);
      }
    },

    startGetAudioLevel() {
      this.trtc.on(TRTC.EVENT.AUDIO_VOLUME, (event) => {
        event.result.forEach(({ userId, volume }) => {
          const isMe = userId === ''; // 当 userId 为空串时，代表本地麦克风音量。
          if (isMe) {
            console.log(`my volume: ${volume}`);
          } else {
            console.log(`user: ${userId} volume: ${volume}`);
          }
        });
      });
      this.trtc.enableAudioVolumeEvaluation(2000);
    },

    stopGetAudioLevel() {
      this.trtc && this.trtc.enableAudioVolumeEvaluation(-1);
    },

    installEventHandlers() {
      this.trtc.on(TRTC.EVENT.ERROR, this.handleError);
      this.trtc.on(TRTC.EVENT.KICKED_OUT, this.handleKickedOut);
      this.trtc.on(TRTC.EVENT.REMOTE_USER_ENTER, this.handleRemoteUserEnter);
      this.trtc.on(TRTC.EVENT.REMOTE_USER_EXIT, this.handleRemoteUserExit);
      this.trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, this.handleRemoteVideoAvailable);
      this.trtc.on(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, this.handleRemoteVideoUnavailable);
      this.trtc.on(TRTC.EVENT.REMOTE_AUDIO_UNAVAILABLE, this.handleRemoteAudioUnavailable);
      this.trtc.on(TRTC.EVENT.REMOTE_AUDIO_AVAILABLE, this.handleRemoteAudioAvailable);
      this.trtc.on(TRTC.EVENT.SCREEN_SHARE_STOPPED, this.handleScreenShareStopped);
    },

    uninstallEventHandlers() {
      this.trtc.off(TRTC.EVENT.ERROR, this.handleError);
      this.trtc.off(TRTC.EVENT.KICKED_OUT, this.handleKickedOut);
      this.trtc.off(TRTC.EVENT.REMOTE_USER_ENTER, this.handleRemoteUserEnter);
      this.trtc.off(TRTC.EVENT.REMOTE_USER_EXIT, this.handleRemoteUserExit);
      this.trtc.off(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, this.handleRemoteVideoAvailable);
      this.trtc.off(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, this.handleRemoteVideoUnavailable);
      this.trtc.off(TRTC.EVENT.REMOTE_AUDIO_UNAVAILABLE, this.handleRemoteAudioUnavailable);
      this.trtc.off(TRTC.EVENT.REMOTE_AUDIO_AVAILABLE, this.handleRemoteAudioAvailable);
      this.trtc.off(TRTC.EVENT.SCREEN_SHARE_STOPPED, this.handleScreenShareStopped);
    },

    handleError(error) {
      this.addFailedLog(`Local error: ${error.message}`);
      alert(error);
    },

    async handleKickedOut(event) {
      this.addFailedLog(`User has been kicked out for ${event.reason}`);
      this.trtc = null;
      await this.exitRoom();
    },

    handleRemoteUserEnter(event) {
      const { userId } = event;
      this.addSuccessLog(`Remote User [${userId}] entered`);
    },

    handleRemoteUserExit(event) {
      this.addSuccessLog(`Remote User [${event.userId}] exit`);
    },

    handleRemoteVideoAvailable(event) {
      const { userId, streamType } = event;
      try {
        this.addSuccessLog(`[${userId}] [${streamType}] video available`);
        if (streamType === TRTC.TYPE.STREAM_TYPE_MAIN) {
          this.remoteUsersViews.push(`${userId}_main`);
          this.$nextTick(async () => {
            await this.trtc.startRemoteVideo({ userId, streamType, view: `${userId}_main` });
          });
        } else {
          this.remoteUsersViews.push(`${userId}_screen`);
          this.$nextTick(async () => {
            await this.trtc.startRemoteVideo({ userId, streamType, view: `${userId}_screen` });
          });
        }
        this.addSuccessLog(`Play remote video success: [${userId}]`);
      } catch (error) {
        this.addFailedLog(`Play remote video failed: [${userId}], error: ${error.message}`);
      }
    },

    handleRemoteVideoUnavailable(event) {
      this.addSuccessLog(`[${event.userId}] [${event.streamType}] video unavailable`);
      const { streamType } = event;
      this.trtc.stopRemoteVideo({ userId: event.userId, streamType });
      if (streamType === TRTC.TYPE.STREAM_TYPE_MAIN) {
        this.remoteUsersViews = this.remoteUsersViews.filter(userId => userId !== `${event.userId}_main`);
      } else {
        this.remoteUsersViews = this.remoteUsersViews.filter(userId => userId !== `${event.userId}_screen`);
      }
    },

    handleRemoteAudioUnavailable(event) {
      this.addSuccessLog(`[${event.userId}] audio unavailable`);
    },

    handleRemoteAudioAvailable(event) {
      this.addSuccessLog(`[${event.userId}] audio available`);
    },

    handleScreenShareStopped() {
      this.shareStatus = 'stopped';
      this.addSuccessLog('Stop share screen success');
    }
  },
};
