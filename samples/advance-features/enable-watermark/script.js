const trtc = TRTC.create({ plugins: [Watermark] });

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
    try {
        const { sdkAppId, sdkSecretKey, userId, roomId, userSig } = initParams();
        await trtc.enterRoom({ roomId, sdkAppId, userId, userSig });
        await trtc.startLocalVideo({ view: 'local-video-view', option: { mirror: false } });
        document.getElementById('start-watermark-btn').disabled = false;
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
        await trtc.stopLocalVideo();
        await stopWatermark();
        document.getElementById('start-watermark-btn').disabled = true;
        switchButtonStatus('enter-btn', 'exit-btn', false);
        cleanShareLink();
        reportSuccessEvent('exitRoom', 0);
    } catch (error) {
        reportFailedEvent({ name: 'exitRoom', roomId: 0, error });
        throw error;
    }
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
