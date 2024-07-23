// --------global variables----------
const trtc = TRTC.create();
let sdkAppId;
let sdkSecretKey;
let userId;
let roomId;
let userSig;

// listen for event
handleEvent();

// step 3.1: different options to turn on/off mic & camera
document.getElementById('option').addEventListener('change', async () => {
    await stopLocalAudio();
    await stopLocalVideo();
    changeButtonDisplay();
});
document.getElementById('mute-mic-btn').addEventListener('click', async () => { await muteMicrophone(true) });
document.getElementById('unmute-mic-btn').addEventListener('click', async () => { await muteMicrophone(false) });
document.getElementById('mute-camera-btn').addEventListener('click', async () => { await muteCamera(true) });
document.getElementById('unmute-camera-btn').addEventListener('click', async () => { await muteCamera(false) });
document.getElementById('publish-mic-btn').addEventListener('click', async () => { await publishMicrophone(true) });
document.getElementById('unpublish-mic-btn').addEventListener('click', async () => { await publishMicrophone(false) });
document.getElementById('publish-camera-btn').addEventListener('click', async () => { await publishCamera(true) });
document.getElementById('unpublish-camera-btn').addEventListener('click', async () => { await publishCamera(false) });

// step 3.2: switch devices
document.getElementById('update-mic-btn').addEventListener('click', async () => { await trtc.updateLocalAudio({ option: { microphoneId: getSelectedElement('microphone-select') } }) });
document.getElementById('update-camera-btn').addEventListener('click', async () => { await trtc.updateLocalVideo({ option: { cameraId: getSelectedElement('camera-select') } }) });
document.getElementById('update-speaker-btn').addEventListener('click', async () => { await TRTC.setCurrentSpeaker(getSelectedElement('speaker-select')) });

// --------functions----------
async function enterRoom() {
    ({ sdkAppId, sdkSecretKey, userId, roomId, userSig } = initParams());
    await trtc.enterRoom({ roomId, sdkAppId, userId, userSig });
    switchButtonStatus('enter-btn', 'exit-btn', true);
    refreshLink();
    reportSuccessEvent('enterRoom', sdkAppId);
}

async function exitRoom() {
    await trtc.exitRoom();
    await stopLocalAudio();
    await stopLocalVideo();
    cleanShareLink();
    switchButtonStatus('enter-btn', 'exit-btn', false);
}

async function startLocalAudio() {
    await trtc.startLocalAudio();
    switchButtonStatusOnAudioChange(true);
}

async function stopLocalAudio() {
    await trtc.stopLocalAudio();
    switchButtonStatusOnAudioChange(false);
}

async function startLocalVideo() {
    await trtc.startLocalVideo({ view: 'local-video-view' });
    switchButtonStatusOnVideoChange(true);
}

async function stopLocalVideo() {
    await trtc.stopLocalVideo();
    switchButtonStatusOnVideoChange(false);
}

async function muteMicrophone(toMute) {
    await trtc.updateLocalAudio({ mute: toMute });
    switchButtonStatus('mute-mic-btn', 'unmute-mic-btn', toMute);
}

async function muteCamera(toMute) {
    await trtc.updateLocalVideo({ mute: toMute });
    switchButtonStatus('mute-camera-btn', 'unmute-camera-btn', toMute);
}

async function publishMicrophone(toPublish) {
    await trtc.updateLocalAudio({ publish: toPublish });
    switchButtonStatus('publish-mic-btn', 'unpublish-mic-btn', toPublish);
}

async function publishCamera(toPublish) {
    await trtc.updateLocalVideo({ publish: toPublish });
    switchButtonStatus('publish-camera-btn', 'unpublish-camera-btn', toPublish);
}

function handleEvent() {
    trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
        trtc.startRemoteVideo({ userId, streamType, view: 'remote-video-view' });
    });
    trtc.on(TRTC.EVENT.DEVICE_CHANGED, async (event) => {
        await handleDeviceChange(event.type);
    });
}
