<template>
	<div class="guidance-container">
		<el-collapse v-model="activeNames">
			<el-collapse-item name="1">
				<template slot="title">
					<span v-if="isEnLang" class="collapse-title">Step 1 : Create New Application</span>
					<span v-if="isZhLang" class="collapse-title">步骤 1 : 创建新的应用</span>
				</template>
        <ul v-if="isEnLang" class="collapse-content">
			Please visit the <a href="https://console.trtc.io/?quickclaim=engine_trial" target="_blank" rel="noopener noreferrer"> TRTC console </a> and create an RTC Engine application.
				</ul>
				<ul v-if="isZhLang" class="collapse-content">
					<li>登录<a target="_blank" href="https://console.cloud.tencent.com/trtc">实时音视频控制台</a>，选择【开发辅助】 > 【<a
						target="_blank" href="https://console.cloud.tencent.com/trtc/quickstart">快速跑通Demo</a>】</li>
					<li>单击【新建应用】输入应用名称，例如 TestTRTC；若您已创建应用可单击选择已有应用。</li>
					<li>根据实际业务需求添加或编辑标签，单击【创建】。</li>
					<img src="@/assets/image/step1.png" alt="创建应用" style="width: 400px"/>
				</ul>
			</el-collapse-item>
			<el-collapse-item name="2">
				<template slot="title">
					<span v-if="isEnLang" class="collapse-title">Step 2 : Get SDKAppID and SDKSecretKey</span>
					<span v-if="isZhLang" class="collapse-title">步骤 2 : 获取 SDKAppID 和 密钥 SDKSecretKey</span>
				</template>
        <ul v-if="isEnLang" class="collapse-content">
					<li>Copy the SDKAppId and SDKSecretKey into the input box</li>
					<img src="@/assets/image/step2-en.png" alt="SDKAppId" style="width: 400px"/>
				</ul>
				<ul v-if="isZhLang" class="collapse-content">
					<li>复制 SDKAppId 和密钥（SDKSecretKey）填入输入框</li>
					<img src="@/assets/image/step2.png" alt="SDKAppId" style="width: 400px"/>
				</ul>
			</el-collapse-item>
			<el-collapse-item name="3">
				<template slot="title">
          <span v-if="isEnLang" class="collapse-title">Step 3 : Start Video Call</span>
					<span v-if="isZhLang" class="collapse-title">步骤 3 : 开始视频通话</span>
				</template>
        <ul v-if="isEnLang" class="collapse-content">
                  <li>Input userId and strRoomId</li>
                  <li>Click the "Enter Room" button to enter the room</li>
                  <li>Click the "Start Local Audio/Video" button to capture microphone or camera</li>
                  <li>Click the "Stop Local Audio/Video" button to stop capturing microphone or camera</li>
                  <li>Click the "Start Share Screen" button to start screen sharing</li>
                  <li>Click the "Stop Share Screen" button to stop screen sharing</li>
				</ul>
				<ul v-if="isZhLang" class="collapse-content">
                  <li>输入 userId 和 strRoomId</li>
                  <li>点击【进入房间】按钮进入房间</li>
                  <li>点击【采集麦克风/摄像头】按钮，可采集麦克风或摄像头</li>
                  <li>点击【终止采集麦克风/摄像头】按钮，可终止采集麦克风或摄像头</li>
                  <li>点击【开始共享屏幕】按钮开始屏幕分享</li>
                  <li>点击【停止共享屏幕】按钮取消屏幕分享</li>
				</ul>
			</el-collapse-item>
	</el-collapse>
	</div>
</template>

<script>
export default {
  name: 'compGuidance',
  data() {
    return {
      activeNames: ['3'],
    };
  },
  computed: {
    isEnLang() {
      return this.$i18n.locale === 'en';
    },
    isZhLang() {
      return this.$i18n.locale === 'zh-cn';
    },
  },
};
</script>

<style lang="scss" scoped>
.guidance-container {
	width: 100%;
	border: 1px solid #DDDDDD;
	border-radius: 4px;
	padding: 0 10px;
	margin-top: 20px;
	text-align: left;
	.collapse-title {
		font-size: 16px;
		font-weight: bold;
    line-height: 18px;
	}
	.collapse-content {
		font-size: 14px;
    padding-left: 20px;
    font-weight: 400;
    margin-top: 10px;
	}
}
</style>
