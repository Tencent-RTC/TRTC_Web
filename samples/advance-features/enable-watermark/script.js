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
    await demoEnterRoom(trtc, {
        afterEnter: async () => {
            await trtc.startLocalVideo({ view: 'local-video-view', option: { mirror: false } });
            document.getElementById('start-watermark-btn').disabled = false;
        }
    });
}

async function exitRoom() {
    await demoExitRoom(trtc, {
        afterExit: async () => {
            await trtc.stopLocalVideo();
            await stopWatermark();
            document.getElementById('start-watermark-btn').disabled = true;
        }
    });
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
initPageI18n(updateInviteSection);

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
