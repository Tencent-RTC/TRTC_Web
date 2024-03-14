import { defineStore } from 'pinia';
import { genTestUserSig } from '../utils/generateTestUserSig';

const appStore = defineStore('app', {
  state: () => ({
    sdkAppId: '',
    userId: '',
    roomId: '',
    sdkSecretKey: '',
    userSig: '',
    audioDeviceId: '',
    videoDeviceId: '',
    cameraList: [],
    microphoneList: [],
    logs: [],
    remoteUsersViews: [],
    invitedRemoteUsers: [],
  }),
  getters: {},
  actions: {
    getInitParamsStates() {
      return !!(this.sdkAppId && this.sdkSecretKey && this.roomId && this.userId);
    },
    getUserSig() {
      return this.userSig || genTestUserSig({
        sdkAppId: parseInt(this.sdkAppId, 10),
        userId: this.userId,
        sdkSecretKey: this.sdkSecretKey,
      }).userSig;
    },
    createShareLink() {
      const userId = `Guest_${Math.floor(Math.random() * 1000000)}`;
      const { userSig } = genTestUserSig({
        sdkAppId: parseInt(this.sdkAppId, 10),
        userId,
        sdkSecretKey: this.sdkSecretKey,
      });
      const { origin } = window.location;
      const { pathname } = window.location;
      return `${origin}${pathname}#/invite?userSig=${userSig}&&SDKAppId=${this.sdkAppId}&&userId=${userId}&&roomId=${this.roomId}`;
    },
    addSuccessLog(str: string) {
      this.logs.push({
        type: 'success',
        content: str,
      });
    },
    addFailedLog(str: string) {
      this.logs.push({
        type: 'failed',
        content: str,
      });
    },
  },
});

export default appStore;
