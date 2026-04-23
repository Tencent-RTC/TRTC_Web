const trtc = TRTC.create();

// listen for event
handleEvents();

// check whether demo is running inside iframe
checkIsInIframe();

// --------functions----------
async function enterRoom() {
    try {
        const { sdkAppId, sdkSecretKey, userId, roomId, userSig } = initParams();
        await trtc.enterRoom({ roomId, sdkAppId, userId, userSig });
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
        await stopShare();
        switchButtonStatus('enter-btn', 'exit-btn', false);
        cleanShareLink();
        reportSuccessEvent('exitRoom', 0);
    } catch (error) {
        reportFailedEvent({ name: 'exitRoom', roomId: 0, error });
        throw error;
    }
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
        inviteEl.querySelector('.note').textContent = t('invite.defaultNote');
    }
    // Update video-views titles
    const localTitle = document.querySelector('video-views .local-title');
    const remoteTitle = document.querySelector('video-views .remote-title');
    if (localTitle) localTitle.textContent = t('screenSharing.localScreen');
    if (remoteTitle) remoteTitle.textContent = t('screenSharing.remoteScreen');
}
