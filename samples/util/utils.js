// initialization
checkEnvironment();
stopMediaTracks();
handleError();
fillParamsFromUrl();


// check current environment is supported TRTC or not
function checkEnvironment() {
    TRTC.isSupported().then((checkResult) => {
        console.log('checkResult', checkResult.result, 'checkDetail', checkResult.detail);
        if (!checkResult.result) {
            alert('Your browser does not supported TRTC!');
            window.location.href = 'https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html';
        }
    });
}

async function stopMediaTracks() {
    const currentFeature = document.querySelector('h1').innerHTML;
    const featuresUseVideoAndAuido = ['Live Streaming', 'Media Device', 'Set Encoding Profile', 'Detect Capabilities', 'Custom Capturing and Rendering'];
    const featureUseVideoOnly = ['Enable Watermark'];
    const featureUseAudioOnly = ['Audio Volume', 'Enable Audio Mixer'];
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
    document.getElementById('user-id').value = getQueryString('userId') || Math.floor(Math.random() * 1000000);
    document.getElementById('room-id').value = getQueryString('roomId') || Math.floor(Math.random() * 1000);
    document.getElementById('sdk-app-id').value = getQueryString('sdkAppId') || localStorage.getItem('sdkAppId');
    document.getElementById('sdk-secret-key').value = getQueryString('sdkSecretKey') || localStorage.getItem('sdkSecretKey');
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
    localStorage.setItem('sdkAppId', sdkAppId);
    localStorage.setItem('sdkSecretKey', sdkSecretKey);
    if (!(sdkAppId && sdkSecretKey && roomId && userId)) {
        throw new Error('Please enter the correct SDKAppId, SDKSecretKey, userId, roomId');
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

// generate invite url 
function refreshLink({ sdkAppId, sdkSecretKey, roomId }) {
    const basicFeatures = ['screen-sharing', 'live-streaming', 'media-device', 'audio-volume', 'set-encoding-profile'];
    const currentFeature = toLowerCaseAndReplaceSpaces(document.querySelector('h1').innerHTML);
    const path = basicFeatures.includes(currentFeature) ? `basic-features/${currentFeature}/index.html` : `advance-features/${currentFeature}/index.html`;
    const userId = String(Math.floor(Math.random() * 1000000));
    const linkTail = `${path}?sdkSecretKey=${sdkSecretKey}&&sdkAppId=${sdkAppId}&&userId=${userId}&&roomId=${roomId}`;
    const link = window.location.href.indexOf('127.0.0.1') > -1 ? `http://127.0.0.1:5500/${linkTail}` : `https://web.sdk.qcloud.com/trtc/webrtc/v5/demo/samples/${linkTail}`;
    document.getElementById('invite-url').value = link;
}

function toLowerCaseAndReplaceSpaces(str) {
    return str
        .toLowerCase()
        .split(' ')
        .join('-');
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
        document.getElementById('enter-room-title').innerHTML = 'Step-2: Enter the room as audience';
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
let clipboard = new ClipboardJS('#invite-btn');
clipboard.on('success', (e) => {
    refreshLink({ sdkAppId, sdkSecretKey, roomId });
    showTooltip(e.trigger, 'Copied!');
});
const inviteBtn = document.getElementById('invite-btn');
inviteBtn.addEventListener('mouseleave', clearTooltip);
inviteBtn.addEventListener('blur', clearTooltip);

function clearTooltip(e) {
    e.currentTarget.setAttribute('class', 'invite-btn');
    e.currentTarget.removeAttribute('aria-label');
}

function showTooltip(elem, msg) {
    elem.setAttribute('class', 'invite-btn tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
}

// handle the logic of report
const isProd = ['https://web.sdk.qcloud.com', 'https://cdpn.io'].includes(location.origin);
const DEMONAME = document.querySelector('h1').innerHTML;
const AEGIS_ID = 'iHWefAYqfabTMlEOzl';
const aegis = new Aegis({
    id: AEGIS_ID,
    uin: '',
    reportApiSpeed: false,
    reportAssetSpeed: false
})

function reportSuccessEvent(name, sdkAppId) {
    if (!isProd) return;
    aegis.reportEvent({
        name,
        ext1: `${name}-success`,
        ext2: DEMONAME,
        ext3: sdkAppId,
    });
}
