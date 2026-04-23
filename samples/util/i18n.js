/**
 * i18n - Internationalization module for samples-v5 demos
 * Supports English (en) and Chinese (zh)
 */

const I18N_LANG_KEY = 'trtc_demo_lang';

const translations = {
  en: {
    // ---- Header Nav ----
    'nav.basicFeatures': 'Basic Features',
    'nav.quickStart': 'Quick Start',
    'nav.screenSharing': 'Screen Sharing',
    'nav.liveStreaming': 'Live Streaming',
    'nav.mediaDevice': 'Media Device',
    'nav.audioVolume': 'Audio Volume',
    'nav.setEncodingProfile': 'Set Encoding Profile',
    'nav.advanceFeatures': 'Advance Features',
    'nav.enableAudioMixer': 'Enable Audio Mixer',
    'nav.enableWatermark': 'Enable Watermark',
    'nav.dataMessages': 'Data Messages',
    'nav.langSwitch': 'En/中',

    // ---- Params Form ----
    'params.configuration': 'Configuration',
    'params.getFrom': 'Get SDKAppId and SDKSecretKey from',
    'params.trtcConsole': 'TRTC Console',
    'params.trtcConsoleHref': 'https://console.trtc.io/?quickclaim=engine_trial',
    'params.warning': 'Note: This demo is for demonstration purposes only. Before official launch, please migrate SDKSecretKey and the UserSig calculation code to your own backend server to avoid unauthorized traffic use caused by the key leakage.',
    'params.learnMore': 'Learn More',
    'params.learnMoreHref': 'https://trtc.io/document/35166',
    'params.sdkAppId': 'SDKAppId',
    'params.sdkSecretKey': 'SDKSecretKey',
    'params.userId': 'UserId',
    'params.roomId': 'RoomId',
    'params.showHide': 'Show/Hide',

    // ---- Invite Section ----
    'invite.defaultTitle': 'Activate remote stream',
    'invite.defaultNote': 'Use the link below to invite another user to join the room. The link contains a pre-signed credential (userSig) and will be updated after being copied.',
    'invite.copied': 'Copied!',
    'invite.sendInvite': 'Copy the link to send invitation. Each link can only invite one person, and the link will be updated after being copied.',

    // ---- Video Views ----
    'video.localVideo': 'Local Video',
    'video.remoteVideo': 'Remote Video',

    // ---- Common UI ----
    'common.enterRoom': 'Enter Room',
    'common.exitRoom': 'Exit Room',
    'common.enterTheRoom': 'Enter the room',
    'common.startLocalAudio': 'Start Local Audio',
    'common.stopLocalAudio': 'Stop Local Audio',
    'common.startLocalVideo': 'Start Local Video',
    'common.stopLocalVideo': 'Stop Local Video',

    // ---- Utils ----
    'utils.browserNotSupported': 'Your browser does not supported TRTC!',
    'utils.enterCorrectParams': 'Please enter the correct SDKAppId, SDKSecretKey, userId, roomId',

    // ---- Quick Start ----
    'quickStart.title': 'Quick Start',
    'quickStart.manageLocalStream': 'Manage Local Stream',
    'quickStart.startMicrophone': 'Start Microphone',
    'quickStart.stopMicrophone': 'Stop Microphone',
    'quickStart.startCamera': 'Start Camera',
    'quickStart.stopCamera': 'Stop Camera',
    'quickStart.startScreenShare': 'Start Screen Share',
    'quickStart.stopScreenShare': 'Stop Screen Share',
    'quickStart.inviteOthers': 'Invite Others',
    'quickStart.inviteNote': 'Copy the link to invite another user to join the same room.',
    'quickStart.localStream': 'Local Stream',
    'quickStart.remoteStream': 'Remote Stream',
    'quickStart.localScreen': 'Local Screen',
    'quickStart.remoteScreen': 'Remote Screen',
    'quickStart.notPublished': 'Not published',
    'quickStart.noScreenSharing': 'No screen sharing',
    'quickStart.noRemoteUser': 'No remote user',
    'quickStart.inRoom': 'In room',
    'quickStart.enteredRoom': 'Entered room successfully',
    'quickStart.enterRoomFailed': 'Enter room failed',
    'quickStart.remoteUserJoined': 'Remote user joined',
    'quickStart.microphoneUpdated': 'Microphone updated',
    'quickStart.cameraUpdated': 'Camera updated',
    'quickStart.updateMicFailed': 'Update microphone failed',
    'quickStart.updateCamFailed': 'Update camera failed',
    'quickStart.microphoneStarted': 'Microphone started',
    'quickStart.microphoneStopped': 'Microphone stopped',
    'quickStart.cameraStarted': 'Camera started',
    'quickStart.cameraStopped': 'Camera stopped',
    'quickStart.toggleMicFailed': 'Toggle microphone failed',
    'quickStart.toggleCamFailed': 'Toggle camera failed',
    'quickStart.screenSharingStarted': 'Screen sharing started',
    'quickStart.screenSharingStopped': 'Screen sharing stopped',
    'quickStart.screenShareFailed': 'Screen share failed',
    'quickStart.exitedRoom': 'Exited room',
    'quickStart.exitRoomFailed': 'Exit room failed',
    'quickStart.noLocalStream': 'No local stream',
    'quickStart.audioStoppedVideoOn': 'Audio stopped, Video on',
    'quickStart.audioOnVideoStopped': 'Audio on, Video stopped',
    'quickStart.audioVideoPublished': 'Audio & Video published',
    'quickStart.userJoined': 'User ${userId} joined',

    // ---- Screen Sharing ----
    'screenSharing.title': 'Screen Sharing',
    'screenSharing.startScreenSharing': 'Start screen sharing',
    'screenSharing.iframeNote': 'You are running demo inside iframe. Therefore, capture HTMLElement is not supported.',
    'screenSharing.useSystemAudio': 'Use System Audio',
    'screenSharing.screenProfile': 'Screen Profile:',
    'screenSharing.captureElement': 'Capture HTMLElement:',
    'screenSharing.displaySurface': 'Display Surface:',
    'screenSharing.localScreen': 'Local Screen',
    'screenSharing.remoteScreen': 'Remote Screen',

    // ---- Live Streaming ----
    'liveStreaming.title': 'Live Streaming',
    'liveStreaming.enterAsAnchor': 'Enter the room as anchor',
    'liveStreaming.enterAsAudience': 'Enter the room as audience',
    'liveStreaming.copyLinkToJoin': 'Copy link to join as audience',
    'liveStreaming.switchRoles': 'Switch roles',
    'liveStreaming.audience': 'Audience',
    'liveStreaming.anchor': 'Anchor',

    // ---- Media Device ----
    'mediaDevice.title': 'Media Device',
    'mediaDevice.differentOptions': 'Different options to turn on/off the microphone and camera',
    'mediaDevice.options': 'Options:',
    'mediaDevice.useMute': 'Use the mute parameter (recommended)',
    'mediaDevice.usePublish': 'Use the publish parameter',
    'mediaDevice.useStop': 'Use stopLocalVideo() & stopLocalAudio()',
    'mediaDevice.muteMicrophone': 'Mute Microphone',
    'mediaDevice.publishMicrophone': 'Publish Microphone',
    'mediaDevice.unmuteMicrophone': 'Unmute Microphone',
    'mediaDevice.unpublishMicrophone': 'Unpublish Microphone',
    'mediaDevice.muteCamera': 'Mute Camera',
    'mediaDevice.publishCamera': 'Publish Camera',
    'mediaDevice.unmuteCamera': 'Unmute Camera',
    'mediaDevice.unpublishCamera': 'Unpublish Camera',
    'mediaDevice.switchDevices': 'Switch the microphone, camera and speaker',
    'mediaDevice.microphones': 'Microphones:',
    'mediaDevice.cameras': 'Cameras:',
    'mediaDevice.speakers': 'Speakers:',
    'mediaDevice.updateMicrophone': 'Update Microphone',
    'mediaDevice.updateCamera': 'Update Camera',
    'mediaDevice.updateSpeaker': 'Update Speaker',

    // ---- Audio Volume ----
    'audioVolume.title': 'Audio Volume',
    'audioVolume.detectAudioVolume': 'Detect audio volume',
    'audioVolume.speakingAfterMuting': 'Speaking after muting can still be detected',
    'audioVolume.localVolume': 'Local volume:',
    'audioVolume.remoteVolume': 'Remote volume:',
    'audioVolume.enableInBackground': 'Enable in background',
    'audioVolume.detectInterval': 'Detect interval:',
    'audioVolume.startDetection': 'Start Detection',
    'audioVolume.stopDetection': 'Stop Detection',
    'audioVolume.adjustAudioVolume': 'Adjust audio volume',
    'audioVolume.muteLocalAudio': 'Mute Local Audio',
    'audioVolume.unmuteLocalAudio': 'Unmute Local Audio',
    'audioVolume.speakingAfterMutingDetected': 'Speaking after muting microphone is detected!',

    // ---- Set Encoding Profile ----
    'encodingProfile.title': 'Set Encoding Profile',
    'encodingProfile.chooseProfile': 'Choose encoding profile',
    'encodingProfile.audioNote': 'Note: SDK does not support dynamic adjustment of audio profile during the call.',
    'encodingProfile.videoProfile': 'Video profile:',
    'encodingProfile.audioProfile': 'Audio profile:',
    'encodingProfile.update': 'Update',

    // ---- Enable Audio Mixer ----
    'audioMixer.title': 'Enable Audio Mixer',
    'audioMixer.addBgm': 'Add background music during a call',
    'audioMixer.loop': 'Loop',
    'audioMixer.volume': 'Volume:',
    'audioMixer.playFromSecond': 'Play audio from given second',
    'audioMixer.play': 'Play',
    'audioMixer.startMixer': 'Start Audio Mixer',
    'audioMixer.stopMixer': 'Stop Audio Mixer',
    'audioMixer.customMessageSent': 'Custom message sent!',
    'audioMixer.seiMessageSent': 'SEI message sent!',

    // ---- Enable Watermark ----
    'watermark.title': 'Enable Watermark',
    'watermark.startWatermarkPlugin': 'Start watermark plugin',
    'watermark.size': 'Size:',
    'watermark.watermarkUrl': 'Watermark URL:',
    'watermark.startWatermark': 'Start Watermark',
    'watermark.stopWatermark': 'Stop Watermark',
    'watermark.inviteNote': 'Copy the link to send invitation. Each link can only invite one person, and the link will be updated after being copied.',

    // ---- Data Messages ----
    'dataMessages.title': 'Data Messages',
    'dataMessages.enterAndActivate': 'Enter the room and activate remote stream',
    'dataMessages.sendCustomMessage': 'Send custom message',
    'dataMessages.send': 'Send',
    'dataMessages.startVideoAndSei': 'Start video and send SEI message',
    'dataMessages.sendSeiMessage': 'Send SEI Message',
    'dataMessages.customMessageSent': 'Custom message sent!',
    'dataMessages.seiMessageSent': 'SEI message sent!',
    'dataMessages.receivedCustomMsg': 'Received custom message from ${userId}, message: ${message}',
    'dataMessages.receivedSeiMsg': 'Received sei message from ${userId}, data: ${data}, streamType: ${streamType}',
    'dataMessages.inviteNote': 'Copy the link to send invitation. Each link can only invite one person, and the link will be updated after being copied.',
  },

  zh: {
    // ---- Header Nav ----
    'nav.basicFeatures': '基础功能',
    'nav.quickStart': '快速开始',
    'nav.screenSharing': '屏幕分享',
    'nav.liveStreaming': '直播模式',
    'nav.mediaDevice': '媒体设备',
    'nav.audioVolume': '音量控制',
    'nav.setEncodingProfile': '设置编码参数',
    'nav.advanceFeatures': '高级功能',
    'nav.enableAudioMixer': '混音',
    'nav.enableWatermark': '水印',
    'nav.dataMessages': '数据消息',
    'nav.langSwitch': 'En/中',

    // ---- Params Form ----
    'params.configuration': '配置',
    'params.getFrom': '从',
    'params.trtcConsole': 'TRTC 控制台获取 SDKAppId 和 SDKSecretKey',
    'params.trtcConsoleHref': 'https://console.cloud.tencent.com/trtc/app',
    'params.warning': '注意：此 Demo 仅用于演示。正式上线前，请将 SDKSecretKey 和 UserSig 计算代码迁移到您自己的后端服务器，以避免密钥泄露导致的流量盗用。',
    'params.learnMore': '了解更多',
    'params.learnMoreHref': 'https://cloud.tencent.com/document/product/647/17275#UserSig',
    'params.sdkAppId': 'SDKAppId',
    'params.sdkSecretKey': 'SDKSecretKey',
    'params.userId': 'UserId',
    'params.roomId': 'RoomId',
    'params.showHide': '显示/隐藏',

    // ---- Invite Section ----
    'invite.defaultTitle': '激活远端流',
    'invite.defaultNote': '使用以下链接邀请其他用户加入房间。链接包含预签名的凭证（userSig），将在复制后更新。',
    'invite.copied': '已复制！',
    'invite.sendInvite': '复制链接发送邀请。每个链接只能邀请一人，链接将在复制后更新。',

    // ---- Video Views ----
    'video.localVideo': '本地视频',
    'video.remoteVideo': '远端视频',

    // ---- Common UI ----
    'common.enterRoom': '进入房间',
    'common.exitRoom': '退出房间',
    'common.enterTheRoom': '进入房间',
    'common.startLocalAudio': '开启本地音频',
    'common.stopLocalAudio': '停止本地音频',
    'common.startLocalVideo': '开启本地视频',
    'common.stopLocalVideo': '停止本地视频',

    // ---- Utils ----
    'utils.browserNotSupported': '您的浏览器不支持 TRTC！',
    'utils.enterCorrectParams': '请输入正确的 SDKAppId、SDKSecretKey、userId、roomId',

    // ---- Quick Start ----
    'quickStart.title': '快速开始',
    'quickStart.manageLocalStream': '管理本地流',
    'quickStart.startMicrophone': '开启麦克风',
    'quickStart.stopMicrophone': '关闭麦克风',
    'quickStart.startCamera': '开启摄像头',
    'quickStart.stopCamera': '关闭摄像头',
    'quickStart.startScreenShare': '开启屏幕分享',
    'quickStart.stopScreenShare': '停止屏幕分享',
    'quickStart.inviteOthers': '邀请他人',
    'quickStart.inviteNote': '复制链接邀请其他用户加入同一房间。',
    'quickStart.localStream': '本地流',
    'quickStart.remoteStream': '远端流',
    'quickStart.localScreen': '本地屏幕',
    'quickStart.remoteScreen': '远端屏幕',
    'quickStart.notPublished': '未发布',
    'quickStart.noScreenSharing': '无屏幕分享',
    'quickStart.noRemoteUser': '无远端用户',
    'quickStart.inRoom': '已进房',
    'quickStart.enteredRoom': '进房成功',
    'quickStart.enterRoomFailed': '进房失败',
    'quickStart.remoteUserJoined': '远端用户加入',
    'quickStart.microphoneUpdated': '麦克风已更新',
    'quickStart.cameraUpdated': '摄像头已更新',
    'quickStart.updateMicFailed': '更新麦克风失败',
    'quickStart.updateCamFailed': '更新摄像头失败',
    'quickStart.microphoneStarted': '麦克风已开启',
    'quickStart.microphoneStopped': '麦克风已关闭',
    'quickStart.cameraStarted': '摄像头已开启',
    'quickStart.cameraStopped': '摄像头已关闭',
    'quickStart.toggleMicFailed': '切换麦克风失败',
    'quickStart.toggleCamFailed': '切换摄像头失败',
    'quickStart.screenSharingStarted': '屏幕分享已开启',
    'quickStart.screenSharingStopped': '屏幕分享已关闭',
    'quickStart.screenShareFailed': '屏幕分享失败',
    'quickStart.exitedRoom': '已退出房间',
    'quickStart.exitRoomFailed': '退出房间失败',
    'quickStart.noLocalStream': '无本地流',
    'quickStart.audioStoppedVideoOn': '音频已停，视频开启',
    'quickStart.audioOnVideoStopped': '音频开启，视频已停',
    'quickStart.audioVideoPublished': '音视频已发布',
    'quickStart.userJoined': '用户 ${userId} 加入',

    // ---- Screen Sharing ----
    'screenSharing.title': '屏幕分享',
    'screenSharing.startScreenSharing': '开始屏幕分享',
    'screenSharing.iframeNote': '您正在 iframe 中运行 Demo，因此不支持捕获 HTMLElement。',
    'screenSharing.useSystemAudio': '使用系统音频',
    'screenSharing.screenProfile': '屏幕参数：',
    'screenSharing.captureElement': '捕获 HTMLElement：',
    'screenSharing.displaySurface': '显示画面：',
    'screenSharing.localScreen': '本地屏幕',
    'screenSharing.remoteScreen': '远端屏幕',

    // ---- Live Streaming ----
    'liveStreaming.title': '直播模式',
    'liveStreaming.enterAsAnchor': '以主播身份进入房间',
    'liveStreaming.enterAsAudience': '以观众身份进入房间',
    'liveStreaming.copyLinkToJoin': '复制链接以观众身份加入',
    'liveStreaming.switchRoles': '切换角色',
    'liveStreaming.audience': '观众',
    'liveStreaming.anchor': '主播',

    // ---- Media Device ----
    'mediaDevice.title': '媒体设备',
    'mediaDevice.differentOptions': '开启/关闭麦克风和摄像头的不同方式',
    'mediaDevice.options': '选项：',
    'mediaDevice.useMute': '使用 mute 参数（推荐）',
    'mediaDevice.usePublish': '使用 publish 参数',
    'mediaDevice.useStop': '使用 stopLocalVideo() & stopLocalAudio()',
    'mediaDevice.muteMicrophone': '静音麦克风',
    'mediaDevice.publishMicrophone': '发布麦克风',
    'mediaDevice.unmuteMicrophone': '取消静音麦克风',
    'mediaDevice.unpublishMicrophone': '取消发布麦克风',
    'mediaDevice.muteCamera': '静音摄像头',
    'mediaDevice.publishCamera': '发布摄像头',
    'mediaDevice.unmuteCamera': '取消静音摄像头',
    'mediaDevice.unpublishCamera': '取消发布摄像头',
    'mediaDevice.switchDevices': '切换麦克风、摄像头和扬声器',
    'mediaDevice.microphones': '麦克风：',
    'mediaDevice.cameras': '摄像头：',
    'mediaDevice.speakers': '扬声器：',
    'mediaDevice.updateMicrophone': '更新麦克风',
    'mediaDevice.updateCamera': '更新摄像头',
    'mediaDevice.updateSpeaker': '更新扬声器',

    // ---- Audio Volume ----
    'audioVolume.title': '音量控制',
    'audioVolume.detectAudioVolume': '检测音量',
    'audioVolume.speakingAfterMuting': '静音后说话仍可被检测到',
    'audioVolume.localVolume': '本地音量：',
    'audioVolume.remoteVolume': '远端音量：',
    'audioVolume.enableInBackground': '后台检测',
    'audioVolume.detectInterval': '检测间隔：',
    'audioVolume.startDetection': '开始检测',
    'audioVolume.stopDetection': '停止检测',
    'audioVolume.adjustAudioVolume': '调节音量',
    'audioVolume.muteLocalAudio': '静音本地音频',
    'audioVolume.unmuteLocalAudio': '取消静音本地音频',
    'audioVolume.speakingAfterMutingDetected': '检测到静音后说话！',

    // ---- Set Encoding Profile ----
    'encodingProfile.title': '设置编码参数',
    'encodingProfile.chooseProfile': '选择编码参数',
    'encodingProfile.audioNote': '注意：SDK 不支持在通话过程中动态调整音频参数。',
    'encodingProfile.videoProfile': '视频参数：',
    'encodingProfile.audioProfile': '音频参数：',
    'encodingProfile.update': '更新',

    // ---- Enable Audio Mixer ----
    'audioMixer.title': '混音',
    'audioMixer.addBgm': '通话中添加背景音乐',
    'audioMixer.loop': '循环',
    'audioMixer.volume': '音量：',
    'audioMixer.playFromSecond': '从指定秒数播放音频',
    'audioMixer.play': '播放',
    'audioMixer.startMixer': '开启混音',
    'audioMixer.stopMixer': '停止混音',
    'audioMixer.customMessageSent': '自定义消息已发送！',
    'audioMixer.seiMessageSent': 'SEI 消息已发送！',

    // ---- Enable Watermark ----
    'watermark.title': '水印',
    'watermark.startWatermarkPlugin': '启用水印插件',
    'watermark.size': '尺寸：',
    'watermark.watermarkUrl': '水印 URL：',
    'watermark.startWatermark': '开启水印',
    'watermark.stopWatermark': '关闭水印',
    'watermark.inviteNote': '复制链接发送邀请。每个链接只能邀请一人，链接将在复制后更新。',

    // ---- Data Messages ----
    'dataMessages.title': '数据消息',
    'dataMessages.enterAndActivate': '进入房间并激活远端流',
    'dataMessages.sendCustomMessage': '发送自定义消息',
    'dataMessages.send': '发送',
    'dataMessages.startVideoAndSei': '开启视频并发送 SEI 消息',
    'dataMessages.sendSeiMessage': '发送 SEI 消息',
    'dataMessages.customMessageSent': '自定义消息已发送！',
    'dataMessages.seiMessageSent': 'SEI 消息已发送！',
    'dataMessages.receivedCustomMsg': '收到来自 ${userId} 的自定义消息：${message}',
    'dataMessages.receivedSeiMsg': '收到来自 ${userId} 的 SEI 消息，数据：${data}，流类型：${streamType}',
    'dataMessages.inviteNote': '复制链接发送邀请。每个链接只能邀请一人，链接将在复制后更新。',
  },
};

// Current language: URL param > localStorage > default 'en'
const urlLang = new URLSearchParams(window.location.search).get('lang');
let currentLang = urlLang || localStorage.getItem(I18N_LANG_KEY) || 'en';
// Persist URL-specified language
if (urlLang && (urlLang === 'en' || urlLang === 'zh')) {
  localStorage.setItem(I18N_LANG_KEY, urlLang);
}

/**
 * Get translation for a key
 * @param {string} key - Translation key
 * @param {object} params - Optional template parameters, e.g. { userId: '123' }
 * @returns {string} Translated text
 */
function t(key, params) {
  let text = translations[currentLang]?.[key] || translations['en']?.[key] || key;
  if (params) {
    Object.keys(params).forEach(k => {
      text = text.replace(new RegExp('\\$\\{' + k + '\\}', 'g'), params[k]);
    });
  }
  return text;
}

/**
 * Get current language
 * @returns {string} Current language code ('en' or 'zh')
 */
function getLang() {
  return currentLang;
}

/**
 * Set language and persist to localStorage
 * @param {string} lang - Language code ('en' or 'zh')
 */
function setLang(lang) {
  if (lang !== 'en' && lang !== 'zh') return;
  currentLang = lang;
  localStorage.setItem(I18N_LANG_KEY, lang);
}

/**
 * Toggle language between en and zh
 * @returns {string} New language code
 */
function toggleLang() {
  const newLang = currentLang === 'en' ? 'zh' : 'en';
  setLang(newLang);
  return newLang;
}

/**
 * Apply i18n to all elements with data-i18n attribute
 * Elements with data-i18n="key" will have their textContent set
 * Elements with data-i18n-placeholder="key" will have their placeholder set
 * Elements with data-i18n-title="key" will have their title set
 */
function applyI18n() {
  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  // Placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
  // Title attribute
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });
  // Href attribute
  document.querySelectorAll('[data-i18n-href]').forEach(el => {
    const key = el.getAttribute('data-i18n-href');
    el.href = t(key);
  });
}

/**
 * Get the alternate language label for the switch button
 * @returns {string} Language label
 */
function getLangSwitchLabel() {
  return t('nav.langSwitch');
}
