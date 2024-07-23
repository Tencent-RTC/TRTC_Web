// --------global variables----------
const trtc = TRTC.create();
let sdkAppId;
let sdkSecretKey;
let userId;
let roomId;
let userSig;

// listen for event
trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
    trtc.startRemoteVideo({ userId, streamType, view: 'remote-video-view' });
});


// --------functions----------
async function enterRoom() {
    ({ sdkAppId, sdkSecretKey, userId, roomId, userSig } = initParams());
    await trtc.enterRoom({ roomId, sdkAppId, userId, userSig });
    switchButtonStatus('enter-btn', 'exit-btn', true);
    reportSuccessEvent('enterRoom', sdkAppId);
    refreshLink();
}

async function exitRoom() {
    await trtc.exitRoom();
    switchButtonStatus('enter-btn', 'exit-btn', false);
    cleanShareLink();
}

async function startLocalAudio() {
    const profile = getSelectedElement('audio-profile');
    await trtc.startLocalAudio({ option: { profile } });
    switchElementStatusOnAudioChange(true);
}

async function stopLocalAudio() {
    await trtc.stopLocalAudio();
    switchElementStatusOnAudioChange(false);
}

async function startLocalVideo() {
    const profile = getSelectedElement('video-profile');
    await trtc.startLocalVideo({ view: 'local-video-view', option: { profile } });
    switchElementStatusOnVideoChange(true);
}

async function stopLocalVideo() {
    await trtc.stopLocalVideo();
    switchElementStatusOnVideoChange(false);
}

async function updateVideoProfile() {
    const profile = getSelectedElement('video-profile');
    await trtc.updateLocalVideo({ option: { profile } });
}
