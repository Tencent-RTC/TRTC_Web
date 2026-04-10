<template>
  <el-input :placeholder="label" :type="type" v-model="infoValue">
    <template slot="prepend">
      <span class="label">{{ label }}</span>
    </template>
  </el-input>
</template>

<script>
import { getUrlParam } from '@/utils/utils.js';
export default {
  name: 'userIdInput',
  props: {
    label: String,
  },
  data() {
    return {
      type: 'string',
      infoValue: '',
    };
  },
  watch: {
    infoValue: {
      immediate: true,
      handler(val) {
        this.$emit('change', this.type === 'number' ? Number(val) : val);
        // Cache sdkAppId and sdkSecretKey to localStorage
        if (this.label === 'sdkAppId' || this.label === 'sdkSecretKey') {
          try { localStorage.setItem(`trtc_${this.label}`, String(val)); } catch (e) {}
        }
      },
    },
  },
  mounted() {
    switch (this.label) {
      case 'userId': {
        const userId = getUrlParam('userId');
        this.infoValue = userId ? userId : `user_${parseInt(Math.random() * 100000000, 10)}`;
        break;
      }
      case 'strRoomId': {
        const strRoomId = getUrlParam('strRoomId');
        this.infoValue = strRoomId ? strRoomId : `room_${parseInt(Math.random() * 100000, 10)}`;
        break;
      }
      case 'sdkAppId': {
        const sdkAppId = getUrlParam('sdkAppId');
        this.type = 'number';
        this.infoValue = sdkAppId || localStorage.getItem('trtc_sdkAppId') || '';
        break;
      }
      case 'sdkSecretKey': {
        const sdkSecretKey = getUrlParam('sdkSecretKey');
        this.infoValue = sdkSecretKey || localStorage.getItem('trtc_sdkSecretKey') || '';
        break;
      }
      default:
        break;
    }
  },
};
</script>

<style lang="scss" scoped>
.label {
  width: 80px;
  display: inline-block;
  font-weight: bold;
}
</style>
