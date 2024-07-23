// --------global variables----------
const trtc = TRTC.create({ enableSEI: true });
let sdkAppId;
let sdkSecretKey;
let userId;
let roomId;
let userSig;

let size;
let imageUrl;

// listen for events
handleEvent();

// --------functions----------
function initOptions() {
    size = document.getElementById('size').checked;
    imageUrl = document.getElementById('image-url').value;
}

async function enterRoom() {
    ({ sdkAppId, sdkSecretKey, userId, roomId, userSig } = initParams());
    await trtc.enterRoom({ roomId, sdkAppId, userId, userSig });
    document.getElementById('send-custom-message-btn').disabled = false;
    document.getElementById('start-video-btn').disabled = false;
    switchButtonStatus('enter-btn', 'exit-btn', true);
    reportSuccessEvent('enterRoom', sdkAppId);
    refreshLink();
}

async function exitRoom() {
    await trtc.exitRoom();
    await stopLocalVideo();
    document.getElementById('send-custom-message-btn').disabled = true;
    document.getElementById('start-video-btn').disabled = true;
    switchButtonStatus('enter-btn', 'exit-btn', false);
    cleanShareLink();
}

function sendCustomMessage() {
    const message = document.getElementById('custom-message').value;
    const data = new TextEncoder().encode(message).buffer;
    trtc.sendCustomMessage({ cmdId: 1, data });
    document.getElementById('custom-message').value = '';
    toastify('Custom message sent!');
}

async function startLocalVideo() {
    await trtc.startLocalVideo({ view: 'local-video-view' });
    document.getElementById('send-SEI-message-btn').disabled = false;
    switchButtonStatus('start-video-btn', 'stop-video-btn', true);
}

async function stopLocalVideo() {
    await trtc.stopLocalVideo();
    document.getElementById('send-SEI-message-btn').disabled = true;
    switchButtonStatus('start-video-btn', 'stop-video-btn', false);
}

function sendSEIMessage() {
    const unit8Array = new Uint8Array([1, 2, 3]);
    trtc.sendSEIMessage(unit8Array.buffer);
    toastify('SEI message sent!');
}

function handleEvent() {
    // listen for remote video event
    trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
        trtc.startRemoteVideo({ userId, streamType, view: 'remote-video-view' });
    });
    // receive custom message
    trtc.on(TRTC.EVENT.CUSTOM_MESSAGE, event => {
        toastify(`Received custom message from ${event.userId}, message: ${new TextDecoder().decode(event.data)}`);
    });
    // receive SEI message
    trtc.on(TRTC.EVENT.SEI_MESSAGE, event => {
        toastify(`Received sei message from ${event.userId}, data: ${event.data}, streamType: ${event.streamType}`);
        console.log(event.data)
    });
}
