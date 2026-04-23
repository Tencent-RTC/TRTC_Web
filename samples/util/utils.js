// initialization
checkEnvironment();
handleError();
fillParamsFromUrl();


// check current environment is supported TRTC or not
function checkEnvironment() {
    TRTC.isSupported().then((checkResult) => {
        console.log('checkResult', checkResult.result, 'checkDetail', checkResult.detail);
        if (!checkResult.result) {
            alert(t('utils.browserNotSupported'));
            window.location.href = 'https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html';
        }
    });
}

async function stopMediaTracks() {
    const currentFeature = document.querySelector('h1').innerHTML;
    const featuresUseVideoAndAuido = [t('quickStart.title'), t('liveStreaming.title'), t('mediaDevice.title'), t('encodingProfile.title'), 'Detect Capabilities', 'Custom Capturing and Rendering'];
    const featureUseVideoOnly = [t('watermark.title')];
    const featureUseAudioOnly = [t('audioVolume.title'), t('audioMixer.title')];
    let stream;
    try {
        if (featuresUseVideoAndAuido.includes(currentFeature)) {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        } else if (featureUseVideoOnly.includes(currentFeature)) {
            stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
        } else if (featureUseAudioOnly.includes(currentFeature)) {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        } else {
            return;
        }
        stream?.getTracks().forEach(track => track.stop());
    } catch (error) {
        document.getElementById('enter-btn').disabled = true;
        throw new Error(error);
    }
}

function handleError() {
    window.onunhandledrejection = message => {
        alert(message.reason);
        console.error('ERROR: ', message);
    }
}

// extract params from url and fill them in the blanks
function fillParamsFromUrl() {
    const urlUserId = getQueryString('userId');
    const urlRoomId = getQueryString('roomId');
    const urlSdkAppId = getQueryString('sdkAppId');
    const urlUserSig = getQueryString('userSig');

    // If userSig is present in URL, this is an invited user
    if (urlUserSig && urlSdkAppId && urlUserId && urlRoomId) {
        document.getElementById('user-id').value = urlUserId;
        document.getElementById('room-id').value = urlRoomId;
        document.getElementById('sdk-app-id').value = urlSdkAppId;
        // Invited users cannot edit sdkAppId, userId, roomId
        document.getElementById('user-id').readOnly = true;
        document.getElementById('room-id').readOnly = true;
        document.getElementById('sdk-app-id').readOnly = true;
        // Hide SDKSecretKey field for invited users (they use userSig directly)
        const secretKeyGroup = document.getElementById('sdk-secret-key')?.closest('.input-group');
        if (secretKeyGroup) {
            secretKeyGroup.style.display = 'none';
        }
        // Store userSig for later use
        window.inviteUserSig = urlUserSig;
    } else {
        document.getElementById('user-id').value = urlUserId || Math.floor(Math.random() * 1000000);
        document.getElementById('room-id').value = urlRoomId || Math.floor(Math.random() * 1000);
        const storedSdkAppId = localStorage.getItem('sdkAppId');
        document.getElementById('sdk-app-id').value = urlSdkAppId || (storedSdkAppId && storedSdkAppId !== 'NaN' ? storedSdkAppId : '');
        const storedSdkSecretKey = localStorage.getItem('sdkSecretKey');
        document.getElementById('sdk-secret-key').value = storedSdkSecretKey || '';
    }
}

function getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const queryString = window.location.search.substring(1);
    const r = queryString.match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

// check whether demo is running in iframe or not. If yes, captureHTMLElement function should be disabled
function checkIsInIframe() {
    if (self != top) {
        document.getElementById('iframe-note').style.display = 'inline';
        document.getElementById('capture-element').disabled = true;
    } else {
        document.getElementById('capture-element').addEventListener('change', () => {
            if (document.getElementById('capture-element').value) {
                document.getElementById('display-surface').value = 'current-tab';
                document.getElementById('display-surface').disabled = true;
            } else {
                document.getElementById('display-surface').disabled = false;
            }
        })
    }
}

function switchButtonStatus(startBtnId, endBtnId, toStart) {
    document.getElementById(startBtnId).disabled = toStart;
    document.getElementById(endBtnId).disabled = !toStart;
}

// get params from input blanks
function initParams() {
    const sdkAppId = parseInt(document.getElementById('sdk-app-id').value);
    const sdkSecretKey = document.getElementById('sdk-secret-key').value;
    const userId = document.getElementById('user-id').value;
    const roomId = parseInt(document.getElementById('room-id').value);

    // If userSig is provided via invite link, use it directly
    if (window.inviteUserSig) {
        if (!(sdkAppId && roomId && userId)) {
            throw new Error(t('utils.enterCorrectParams'));
        }
        return { sdkAppId, userId, roomId, userSig: window.inviteUserSig };
    }

    if (!isNaN(sdkAppId)) localStorage.setItem('sdkAppId', sdkAppId);
    if (sdkSecretKey) localStorage.setItem('sdkSecretKey', sdkSecretKey);
    if (!(sdkAppId && sdkSecretKey && roomId && userId)) {
        throw new Error(t('utils.enterCorrectParams'));
    }
    const { userSig } = genTestUserSig({ sdkAppId, userId, sdkSecretKey });
    return { sdkAppId, sdkSecretKey, userId, roomId, userSig };
}

function genTestUserSig({ sdkAppId, userId, sdkSecretKey }) {
    const EXPIRETIME = 604800;
    const generator = new LibGenerateTestUserSig(sdkAppId, sdkSecretKey, EXPIRETIME);
    const userSig = generator.genTestUserSig(userId);
    return { sdkAppId, userSig };
}

// get selected value from select input
function getSelectedElement(id) {
    const selector = document.getElementById(id);
    const index = selector.selectedIndex;
    const selected = selector.options[index].value;
    return selected;
}

// generate invite url - uses userSig instead of sdkSecretKey for security
function refreshLink({ sdkAppId, sdkSecretKey, roomId }) {
    const userId = String(Math.floor(Math.random() * 1000000));
    const { userSig } = genTestUserSig({ sdkAppId, userId, sdkSecretKey });
    const url = new URL(window.location.href);
    url.searchParams.set('sdkAppId', sdkAppId);
    url.searchParams.set('userId', userId);
    url.searchParams.set('roomId', roomId);
    url.searchParams.set('userSig', userSig);
    // Remove sdkSecretKey from URL to prevent key leakage
    url.searchParams.delete('sdkSecretKey');
    document.getElementById('invite-url').value = url.toString();
}

function cleanShareLink() {
    document.getElementById('invite-url').value = '';
}

async function handleDeviceChange(deviceType) {
    let devices;
    if (deviceType === 'microphone') {
        devices = await TRTC.getMicrophoneList();
    } else if (deviceType === 'camera') {
        devices = await TRTC.getCameraList();
    } else if (deviceType === 'speaker') {
        devices = await TRTC.getSpeakerList();
    } else {
        return;
    }
    const deviceSelect = document.getElementById(`${deviceType}-select`);
    deviceSelect.innerHTML = '';
    devices?.forEach(device => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label;
        deviceSelect.appendChild(option);
    });
}

// called in Live Streaming
function changePageDisplay() {
    if (isInvited) {
        document.getElementById('enter-room-title').innerHTML = `<span class="step-badge">2</span>${t('liveStreaming.enterAsAudience')}`;
        document.getElementById('invite-container').style.display = 'none';
        document.getElementById('role-switch-container').style.display = 'block';
    }
}

// called in Media Device
function changeButtonDisplay() {
    document.querySelectorAll('.mute-btn, .publish-btn').forEach(button => { button.style.display = 'none' });
    let currentOption = document.getElementById('option').value;
    if (currentOption === 'mute') {
        document.querySelectorAll('.mute-btn').forEach(button => { button.style.display = 'inline-block' });
    } else if (currentOption === 'publish') {
        document.querySelectorAll('.publish-btn').forEach(button => { button.style.display = 'inline-block' });
    }
}

// called in Media Device
function switchButtonStatusOnAudioChange(toStart) {
    const buttonIds = ['unmute-mic-btn', 'publish-mic-btn', 'mute-mic-btn', 'unpublish-mic-btn', 'update-mic-btn', 'update-speaker-btn'];
    const buttonIdOnChange = toStart ? buttonIds.slice(2) : buttonIds;
    buttonIdOnChange.forEach(id => { document.getElementById(id).disabled = !toStart });
    switchButtonStatus('start-audio-btn', 'stop-audio-btn', toStart);
}

// called in Media Device
function switchButtonStatusOnVideoChange(toStart) {
    const buttonIds = ['unmute-camera-btn', 'publish-camera-btn', 'mute-camera-btn', 'unpublish-camera-btn', 'update-camera-btn'];
    const buttonIdOnChange = toStart ? buttonIds.slice(2) : buttonIds;
    buttonIdOnChange.forEach(id => { document.getElementById(id).disabled = !toStart });
    switchButtonStatus('start-video-btn', 'stop-video-btn', toStart);
}

// called in Audio Volume
function switchOptionStatusOnDetectionChange(toDetect) {
    switchButtonStatus('start-detect-btn', 'stop-detect-btn', toDetect);
    document.getElementById('enable-background').disabled = toDetect;
    document.getElementById('detect-interval').disabled = toDetect;
    if (!toDetect) {
        document.getElementById('local-volume-detect').value = '';
        document.getElementById('remote-volume-detect').value = '';
    }
}

// called in Audio Volume
function switchElementStatusOnRoomStatus(toEnter) {
    const elementIds = ['unmute-btn', 'mute-btn', 'start-detect-btn', 'local-volume-input', 'remote-volume-input'];
    const elementIdOnChange = toEnter ? elementIds.slice(1) : elementIds;
    elementIdOnChange.forEach(id => { document.getElementById(id).disabled = !toEnter });
    switchButtonStatus('enter-btn', 'exit-btn', toEnter);
}

// called in Set Encoding Profile
function switchElementStatusOnAudioChange(toStart) {
    switchButtonStatus('start-audio-btn', 'stop-audio-btn', toStart);
    document.getElementById('audio-profile').disabled = toStart;
}

function switchElementStatusOnVideoChange(toStart) {
    switchButtonStatus('start-video-btn', 'stop-video-btn', toStart);
    document.getElementById('update-video-btn').disabled = !toStart;
}

// called in Enable Audio Mixer
function switchElementStatusOnAudioMixer(toStart) {
    switchButtonStatus('start-mixer-btn', 'stop-mixer-btn', toStart);
    document.getElementById('play-btn').disabled = !toStart;
    if (!toStart) document.getElementById('play-icon').src = pauseIconUrl;
}

// handle the logic of toastify-js
function toastify(text) {
    Toastify({
        text,
        gravity: 'top',
        position: 'center',
        style: { background: '#0D6EFD' }
    }).showToast();
}

// handle the logic of clipboard
let clipboard;
const inviteBtn = document.getElementById('invite-btn');
if (inviteBtn) {
    clipboard = new ClipboardJS('#invite-btn');
    clipboard.on('success', (e) => {
        const sdkAppId = parseInt(document.getElementById('sdk-app-id').value);
        const sdkSecretKey = document.getElementById('sdk-secret-key').value;
        const roomId = parseInt(document.getElementById('room-id').value);
        refreshLink({ sdkAppId, sdkSecretKey, roomId });
        showTooltip(e.trigger, t('invite.copied'));
    });
    inviteBtn.addEventListener('mouseleave', clearTooltip);
    inviteBtn.addEventListener('blur', clearTooltip);
}

// handle the logic of open invite link
const inviteOpenBtn = document.getElementById('invite-open-btn');
if (inviteOpenBtn) {
    inviteOpenBtn.addEventListener('click', () => {
        const inviteUrl = document.getElementById('invite-url').value;
        if (inviteUrl) {
            window.open(inviteUrl, '_blank');
        }
        const sdkAppId = parseInt(document.getElementById('sdk-app-id').value);
        const sdkSecretKey = document.getElementById('sdk-secret-key').value;
        const roomId = parseInt(document.getElementById('room-id').value);
        refreshLink({ sdkAppId, sdkSecretKey, roomId });
    });
}

function clearTooltip(e) {
    e.currentTarget.setAttribute('class', 'invite-action-btn');
    e.currentTarget.removeAttribute('aria-label');
}

function showTooltip(elem, msg) {
    elem.setAttribute('class', 'invite-action-btn tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
}

// handle the logic of report
const isProd = location.origin === 'https://web.sdk.qcloud.com';
const isDev = location.origin.includes('localhost') || location.origin.includes('127.0.0.1');
const DEMOKEY = isProd ? 'v5SamplesV5' : 'v5SamplesV5Dev';
const AEGIS_ID = {
    dev: 'iHWefAYqBEHVFrSxnV',
    prod: 'iHWefAYqVGQzlNLveU',
};

let aegis;

if (isProd || isDev) {
    try {
        aegis = new Aegis({
            id: isProd ? AEGIS_ID.prod : AEGIS_ID.dev,
            uin: '',
            reportApiSpeed: false,
            reportAssetSpeed: false
        });
    } catch (e) {
        console.warn('Aegis initialization failed:', e);
    }
}

function reportSuccessEvent(name, sdkAppId) {
    aegis?.reportEvent({
        name,
        ext1: `${name}-success${window.self !== window.top ? '-iframe' : ''}`,
        ext2: DEMOKEY,
        ext3: sdkAppId,
    });
}

function reportFailedEvent({ name, error, type = 'rtc', roomId }) {
    aegis?.reportEvent({
        name,
        ext1: `${name}-failed#${roomId}*${type}*${error.message}`,
        ext2: DEMOKEY,
        ext3: 0,
    });
}

// report loaded event
try {
    reportSuccessEvent('loaded', 0);
} catch (e) {
    console.warn('Failed to report loaded event:', e);
}

// When running inside an iframe, report the content height to the parent window
(function autoResizeIframe() {
    if (window.self === window.top) return;
    function postHeight() {
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage({ type: 'trtc-demo-resize', height }, '*');
    }
    window.addEventListener('load', postHeight);
    window.addEventListener('resize', postHeight);
    const observer = new MutationObserver(postHeight);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
})();
