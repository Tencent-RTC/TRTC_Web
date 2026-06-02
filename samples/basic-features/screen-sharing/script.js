const trtc = TRTC.create();

// listen for event
handleEvents();

// check whether demo is running inside iframe
checkIsInIframe();

// --------functions----------
async function enterRoom() {
    await demoEnterRoom(trtc);
}

async function exitRoom() {
    await demoExitRoom(trtc, {
        afterExit: async () => { await stopShare(); }
    });
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
initPageI18n(updateInviteSection);

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
