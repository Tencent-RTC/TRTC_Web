<template>
  <div class="guidance">
    <el-collapse v-model="active">
      <el-collapse-item :title="t('step1')" class="header" name="1">
        <div class="item">
          <ul>
            <li v-if="isEnLang">Determine if the current browser environment is suitable for using TRTC，You can visit <a
              target="_blank" href="https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html">TRTC Detect Page</a></li>
            <li v-if="isZhLang">判断当前浏览器环境是否满足使用 TRTC，您可以访问 <a
              target="_blank" href="https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html">TRTC 检测页面</a></li>
          </ul>
        </div>
      </el-collapse-item>
      <el-collapse-item :title="t('step2')" class="header" name="2">
        <div class="item">
          <ul v-if="isEnLang" class="collapse-content">
            Please visit the <a href="https://console.trtc.io/?quickclaim=engine_trial" target="_blank" rel="noopener noreferrer"> TRTC console </a> and create an RTC Engine application.
          </ul>
          <ul v-if="isZhLang" class="collapse-content">
            <li>登录<a target="_blank" href="https://console.cloud.tencent.com/trtc">实时音视频控制台</a>，选择【开发辅助】 > 【<a
              target="_blank" href="https://console.cloud.tencent.com/trtc/quickstart">快速跑通Demo</a>】</li>
            <li>单击【新建应用】输入应用名称，例如 TestTRTC；若您已创建应用可单击选择已有应用。</li>
            <li>根据实际业务需求添加或编辑标签，单击【创建】。</li>
            <img src="../../assets/image/step1.png" alt="创建应用" style="width: 400px"/>
          </ul>
        </div>
      </el-collapse-item>
      <el-collapse-item :title="t('step3')" class="header" name="3">
        <div class="item">
          <ul v-if="isEnLang" class="collapse-content">
            <li>Copy the SDKAppId and SDKSecretKey into the input box</li>
            <img src="../../assets/image/step2-en.png" alt="SDKAppId" style="width: 400px"/>
          </ul>
          <ul v-if="isZhLang" class="collapse-content">
            <li>复制 SDKAppId 和密钥（SDKSecretKey）填入输入框</li>
            <img src="../../assets/image/step2.png" alt="SDKAppId" style="width: 400px"/>
          </ul>
        </div>
      </el-collapse-item>
      <el-collapse-item :title="t('step4')" class="header" name="4">
        <div class="item">
          <ul v-if="isEnLang" class="collapse-content">
            <li>Input userId and roomId</li>
            <li>Click the "Enter Room" button to enter the room</li>
            <li>Click the "Start Local Audio/Video" button to capture microphone or camera</li>
            <li>Click the "Stop Local Audio/Video" button to stop capturing microphone or camera</li>
            <li>Click the "Start Screen Share" button to start screen sharing</li>
            <li>Click the "Stop Screen Share" button to stop screen sharing</li>
          </ul>
          <ul v-if="isZhLang" class="collapse-content">
            <li>输入 userId 和 roomId</li>
            <li>点击【进入房间】按钮进入房间</li>
            <li>点击【采集麦克风】/ 【采集摄像头】按钮，可采集麦克风或摄像头</li>
            <li>点击【终止采集麦克风】/ 【终止采集摄像头】按钮，可终止采集麦克风或摄像头</li>
            <li>点击【开始共享屏幕】按钮开始屏幕分享</li>
            <li>点击【停止共享屏幕】按钮取消屏幕分享</li>
          </ul>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
const isEnLang = computed(() => locale.value === 'en');
const isZhLang = computed(() => locale.value === 'zh-cn');

const active = ref<Array<string>>(['1', '4']);

</script>

<style lang="stylus" scoped>
ul
  padding-left 15px
.guidance
  border-radius 6px
  border-left 1px solid #ebeef5
  border-right 1px solid #ebeef5
  margin 20px 0
  .header
    padding 0 20px
  .item
    display flex
    flex-direction column

</style>
