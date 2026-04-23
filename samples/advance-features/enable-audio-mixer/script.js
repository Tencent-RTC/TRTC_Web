const trtc = TRTC.create();

const id = 'demo';
const url = 'https://web.sdk.qcloud.com/trtc/webrtc/v5/demo/samples/assets/hotel-california.mp3';
const pauseIconUrl = 'https://web.sdk.qcloud.com/trtc/webrtc/v5/demo/samples/icons/pause.svg';
const playIconUrl = 'https://web.sdk.qcloud.com/trtc/webrtc/v5/demo/samples/icons/play.svg'

let isPluginStart = false;
let isPause = false;

// --------functions----------
async function enterRoom() {
    try {
        const { sdkAppId, sdkSecretKey, userId, roomId, userSig } = initParams();
        await trtc.enterRoom({ roomId, sdkAppId, userId, userSig });
        await trtc.startLocalAudio();
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
        await trtc.stopLocalAudio();
        await stopAudioMixer();
        switchButtonStatus('enter-btn', 'exit-btn', false);
        cleanShareLink();
        reportSuccessEvent('exitRoom', 0);
    } catch (error) {
        reportFailedEvent({ name: 'exitRoom', roomId: 0, error });
        throw error;
    }
}

async function startAudioMixer() {
    const loop = document.getElementById('loop').checked;
    const volume = parseFloat(document.getElementById('volume-input').value);
    await trtc.startPlugin('AudioMixer', { id, url, loop, volume });
    isPluginStart = true;
    switchElementStatusOnAudioMixer(true);
}

async function stopAudioMixer() {
    await trtc.stopPlugin('AudioMixer', { id });
    isPluginStart = false;
    isPause = false;
    switchElementStatusOnAudioMixer(false);
}

async function switchLoopStatus() {
    if (!isPluginStart) return;
    const loop = document.getElementById('loop').checked;
    await trtc.updatePlugin('AudioMixer', { id, loop });
}

async function setVolume() {
    const volume = parseFloat(document.getElementById('volume-input').value);
    document.getElementById('volume-display').value = volume;
    if (!isPluginStart) return;
    await trtc.updatePlugin('AudioMixer', { id, volume });
}

async function pauseOrResumeAudio() {
    if (!isPluginStart) return;
    const operation = isPause ? 'resume' : 'pause';
    const src = isPause ? pauseIconUrl : playIconUrl;
    document.getElementById('play-icon').src = src;
    await trtc.updatePlugin('AudioMixer', { id, operation });
    isPause = !isPause;
}

async function playFromSpecificSecond() {
    const seekFrom = parseInt(document.getElementById('time-input').value);
    await trtc.updatePlugin('AudioMixer', { id, seekFrom });
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
}
