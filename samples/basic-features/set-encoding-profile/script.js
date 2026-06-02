const trtc = TRTC.create();

// listen for event
trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
    trtc.startRemoteVideo({ userId, streamType, view: 'remote-video-view' });
});


// --------functions----------
async function enterRoom() {
    await demoEnterRoom(trtc);
}

async function exitRoom() {
    await demoExitRoom(trtc);
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

// i18n initialization
initPageI18n(() => {
    const localTitle = document.querySelector('video-views .local-title');
    const remoteTitle = document.querySelector('video-views .remote-title');
    if (localTitle) localTitle.textContent = t('video.localVideo');
    if (remoteTitle) remoteTitle.textContent = t('video.remoteVideo');
});
