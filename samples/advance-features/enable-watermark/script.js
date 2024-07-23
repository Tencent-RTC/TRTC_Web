// --------global variables----------
const trtc = TRTC.create({ plugins: [Watermark] });
let sdkAppId;
let sdkSecretKey;
let userId;
let roomId;
let userSig;

let size;
let imageUrl;


// listen for event
trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
    trtc.startRemoteVideo({ userId, streamType, view: 'remote-video-view' });
});

// --------functions----------
function initOptions() {
    size = document.getElementById('size').checked;
    imageUrl = document.getElementById('image-url').value;
}

async function enterRoom() {
    ({ sdkAppId, sdkSecretKey, userId, roomId, userSig } = initParams());
    await trtc.enterRoom({ roomId, sdkAppId, userId, userSig });
    await trtc.startLocalVideo({ view: 'local-video-view', option: { mirror: false } });
    document.getElementById('start-watermark-btn').disabled = false;
    switchButtonStatus('enter-btn', 'exit-btn', true);
    reportSuccessEvent('enterRoom', sdkAppId);
    refreshLink();
}

async function exitRoom() {
    await trtc.exitRoom();
    await trtc.stopLocalVideo();
    await stopWatermark();
    document.getElementById('start-watermark-btn').disabled = true;
    switchButtonStatus('enter-btn', 'exit-btn', false);
    cleanShareLink();
}

async function startWatermark() {
    initOptions();
    await trtc.startPlugin('Watermark', { imageUrl, size });
    switchButtonStatus('start-watermark-btn', 'stop-watermark-btn', true);
}

async function stopWatermark() {
    await trtc.stopPlugin('Watermark');
    switchButtonStatus('start-watermark-btn', 'stop-watermark-btn', false);
}
