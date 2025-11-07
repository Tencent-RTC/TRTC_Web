<template>
  <div class="invite-container">
    <comp-nav></comp-nav>
    <div class="content" :class="$isMobile && 'content-mobile'">
      <div class="invite-tips">
        {{ $t("You've been invited to a video call")}}
      </div>
      <comp-room
        type="invite"
        :sdkAppId="Number(sdkAppId)"
        :inviteUserSig="userSig"
        :userId="userId"
        :strRoomId="strRoomId"></comp-room>
    </div>
  </div>
</template>

<script>
import compNav from '@/components/comp-nav.vue';
import CompRoom from '@/components/comp-room.vue';
import { getUrlParam, clearUrlParam } from '@/utils/utils.js';

export default {
  name: 'InviteApp',
  data() {
    return {
      sdkAppId: 0,
      userSig: '',
      userId: '',
      strRoomId: '',
    };
  },
  components: {
    compNav,
    CompRoom,
  },
  mounted() {
    this.sdkAppId = Number(getUrlParam('sdkAppId'));
    this.userSig = getUrlParam('userSig');
    this.userId = getUrlParam('userId');
    this.strRoomId = getUrlParam('strRoomId');
    clearUrlParam();
  },
};
</script>

<style lang="scss" scoped>
 .content {
    width: 80%;
    margin: 0 auto;
    max-width: 1320px;
    padding-top: 30px;
    &.content-mobile {
      width: 100%;
      padding: 30px 16px 20px;
    }
    .invite-tips {
      width: 100%;
      height: 60px;
      color: #084298;
      background-color: #cfe2ff;
      position: relative;
      padding: 1rem 1rem;
      margin-bottom: 1rem;
      border: 1px solid #b6d4fe;
      border-radius: 0.25rem;
    }
 }
</style>

<i18n>
{
	"en": {
		"You've been invited to a video call": "You've been invited to a video call!"
	},
	"zh-cn": {
		"You've been invited to a video call": "你被邀请参加视频通话！"
	}
}
</i18n>
