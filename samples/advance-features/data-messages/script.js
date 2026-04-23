const trtc = TRTC.create({ enableSEI: true });

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
    try {
        const { sdkAppId, sdkSecretKey, userId, roomId, userSig } = initParams();
        await trtc.enterRoom({ roomId, sdkAppId, userId, userSig });
        document.getElementById('send-custom-message-btn').disabled = false;
        document.getElementById('start-video-btn').disabled = false;
        switchButtonStatus('enter-btn', 'exit-btn', true);
        reportSuccessEvent('enterRoom', sdkAppId);
        refreshLink({ sdkAppId, sdkSecretKey, roomId });
    } catch (error) {
        reportFailedEvent({ name: 'enterRoom', roomId: 0, error });
        throw error;
    }
}

async function exitRoom() {
    try {
        await trtc.exitRoom();
        await stopLocalVideo();
        document.getElementById('send-custom-message-btn').disabled = true;
        document.getElementById('start-video-btn').disabled = true;
        switchButtonStatus('enter-btn', 'exit-btn', false);
        cleanShareLink();
        reportSuccessEvent('exitRoom', 0);
    } catch (error) {
        reportFailedEvent({ name: 'exitRoom', roomId: 0, error });
        throw error;
    }
}

function sendCustomMessage() {
    const message = document.getElementById('custom-message').value;
    const data = new TextEncoder().encode(message).buffer;
    trtc.sendCustomMessage({ cmdId: 1, data });
    document.getElementById('custom-message').value = '';
    toastify(t('dataMessages.customMessageSent'));
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
    toastify(t('dataMessages.seiMessageSent'));
}

function handleEvent() {
    // listen for remote video event
    trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
        trtc.startRemoteVideo({ userId, streamType, view: 'remote-video-view' });
    });
    // receive custom message
    trtc.on(TRTC.EVENT.CUSTOM_MESSAGE, event => {
        toastify(t('dataMessages.receivedCustomMsg', { userId: event.userId, message: new TextDecoder().decode(event.data) }));
    });
    // receive SEI message
    trtc.on(TRTC.EVENT.SEI_MESSAGE, event => {
        toastify(t('dataMessages.receivedSeiMsg', { userId: event.userId, data: event.data, streamType: event.streamType }));
        console.log(event.data)
    });
}

// i18n initialization
applyI18n();
updateInviteSection();
document.addEventListener('lang-changed', () => {
    applyI18n();
    updateInviteSection();
});

function updateInviteSection() {
    const inviteEl = document.getElementById('invite-section-el');
    if (inviteEl) {
        inviteEl.querySelector('h3').textContent = t('invite.defaultTitle');
        inviteEl.querySelector('.note').textContent = t('invite.sendInvite');
    }
    const localTitle = document.querySelector('video-views .local-title');
    const remoteTitle = document.querySelector('video-views .remote-title');
    if (localTitle) localTitle.textContent = t('video.localVideo');
    if (remoteTitle) remoteTitle.textContent = t('video.remoteVideo');
}
