const trtc = TRTC.create();

// listen for event
handleEvents();

// check whether demo is running inside iframe
checkIsInIframe();

// --------functions----------
async function enterRoom() {
    const { sdkAppId, sdkSecretKey, userId, roomId, userSig } = initParams();
    await trtc.enterRoom({ roomId, sdkAppId, userId, userSig });
    switchButtonStatus('enter-btn', 'exit-btn', true);
    reportSuccessEvent('enterRoom', sdkAppId);
    refreshLink({ sdkAppId, sdkSecretKey, roomId });
}

async function exitRoom() {
    await trtc.exitRoom();
    await stopShare();
    switchButtonStatus('enter-btn', 'exit-btn', false);
    cleanShareLink();
}

async function startShare() {
    const systemAudio = document.getElementById('system-audio').checked;
    const profile = getSelectedElement('profile');
    const preferDisplaySurface = getSelectedElement('display-surface');
    const captureElement = document.getElementById(getSelectedElement('capture-element'));
    await trtc.startScreenShare({ view: 'local-screen-view', option: { systemAudio, profile, preferDisplaySurface, captureElement } });
    switchButtonStatus('start-share-btn', 'stop-share-btn', true);
}

async function stopShare() {
    await trtc.stopScreenShare();
    switchButtonStatus('start-share-btn', 'stop-share-btn', false);
}

function handleEvents() {
    trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
        trtc.startRemoteVideo({ userId, streamType, view: 'remote-screen-view' });
    });
    trtc.on(TRTC.EVENT.SCREEN_SHARE_STOPPED, () => {
        switchButtonStatus('start-share-btn', 'stop-share-btn', false);
    });
}
