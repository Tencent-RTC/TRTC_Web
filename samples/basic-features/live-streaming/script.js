const trtc = TRTC.create();

let isInvited = getQueryString('userId') ? true : false;
let isAudience = isInvited;
let isMicOn = false;
let isCameraOn = false;

// initialization
changePageDisplay();

// listen for events
trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
    trtc.startRemoteVideo({ userId, streamType, view: 'remote-video-view' });
});

// --------functions----------
async function enterRoom() {
    const { sdkAppId, sdkSecretKey, userId, roomId, userSig } = initParams();
    let role;
    if (isInvited) {
        role = TRTC.TYPE.ROLE_AUDIENCE;
        document.getElementById('role').disabled = false;
    } else {
        role = TRTC.TYPE.ROLE_ANCHOR;
        await trtc.startLocalAudio();
        await trtc.startLocalVideo({ view: 'local-video-view' });
        refreshLink({ sdkAppId, sdkSecretKey, roomId });
    }
    const scene = TRTC.TYPE.SCENE_LIVE;
    await trtc.enterRoom({ scene, role, roomId, sdkAppId, userId, userSig });
    switchButtonStatus('enter-btn', 'exit-btn', true);
    reportSuccessEvent('enterRoom', sdkAppId);
}

async function exitRoom() {
    if (isInvited) {
        if (!isAudience) {
            await switchRole();
            document.getElementById('role').checked = false;
        }
        document.getElementById('role').disabled = true;
    } else {
        cleanShareLink();
    }
    await trtc.stopLocalAudio();
    await trtc.stopLocalVideo();
    await trtc.exitRoom();
    switchButtonStatus('enter-btn', 'exit-btn', false);
}

async function switchRole() {
    if (isAudience) {
        document.getElementById('role-label').innerHTML = 'Anchor';
        document.querySelectorAll('.device-icon').forEach(icon => icon.style.display = 'inline-block');
        await trtc.switchRole(TRTC.TYPE.ROLE_ANCHOR);
    } else {
        document.getElementById('role-label').innerHTML = 'Audience';
        document.querySelectorAll('.device-icon').forEach(icon => icon.style.display = 'none');
        if (isMicOn) switchMicrophoneStatus();
        if (isCameraOn) switchCameraStatus();
        await trtc.switchRole(TRTC.TYPE.ROLE_AUDIENCE);
    }
    isAudience = !isAudience;
}

async function switchMicrophoneStatus() {
    const currentSrc = document.getElementById('mic-icon').src;
    let newSrc;
    if (isMicOn) {
        await trtc.stopLocalAudio();
        newSrc = currentSrc.replace('mic-on', 'mic-off');
    } else {
        await trtc.startLocalAudio();
        newSrc = currentSrc.replace('mic-off', 'mic-on');
    }
    document.getElementById('mic-icon').src = newSrc;
    isMicOn = !isMicOn;
}

async function switchCameraStatus() {
    const currentSrc = document.getElementById('video-icon').src;
    let newSrc;
    if (isCameraOn) {
        await trtc.stopLocalVideo();
        newSrc = currentSrc.replace('video-on', 'video-off');
    } else {
        await trtc.startLocalVideo({ view: 'local-video-view' });
        newSrc = currentSrc.replace('video-off', 'video-on');
    }
    document.getElementById('video-icon').src = newSrc;
    isCameraOn = !isCameraOn;
}
