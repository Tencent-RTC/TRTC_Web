const trtc = TRTC.create();
const trtcSpeakDetect = TRTC.create();

let isMuted = false;

// --------functions----------
async function enterRoom() {
    const { sdkAppId, sdkSecretKey, userId, roomId, userSig } = initParams();
    await trtc.enterRoom({ roomId, sdkAppId, userId, userSig });
    reportSuccessEvent('enterRoom', sdkAppId);
    await trtc.startLocalAudio();
    await trtcSpeakDetect.startLocalAudio();
    switchElementStatusOnRoomStatus(true);
    refreshLink({ sdkAppId, sdkSecretKey, roomId });
}

async function exitRoom() {
    await trtc.exitRoom();
    await trtc.stopLocalAudio();
    await trtcSpeakDetect.stopLocalAudio();
    stopAudioVolumeDetection();
    switchElementStatusOnRoomStatus(false);
    cleanShareLink();
}

function startAudioVolumeDetection() {
    handleCommonDetection();
    handleAfterMuteDetection();
    switchOptionStatusOnDetectionChange(true);
}

function handleCommonDetection() {
    const interval = parseInt(getSelectedElement('detect-interval'));
    const enableInBackground = document.getElementById('enable-background').checked;
    trtc.enableAudioVolumeEvaluation(interval, enableInBackground);
    trtc.on(TRTC.EVENT.AUDIO_VOLUME, event => {
        event.result.forEach(({ userId, volume }) => {
            // when userId is an empty string, it represents the local microphone.
            const id = userId === '' ? 'local-volume-detect' : 'remote-volume-detect';
            document.getElementById(id).value = volume;
        })
    });
}

function handleAfterMuteDetection() {
    trtcSpeakDetect.enableAudioVolumeEvaluation(5000);
    trtcSpeakDetect.on(TRTC.EVENT.AUDIO_VOLUME, event => {
        event.result.forEach(({ userId, volume }) => {
            // it is generally believed that when the volume is greater than 10, the user is talking
            if (userId === '' && volume > 10 && isMuted) {
                alert('Speaking after muting microphone is detected!');
            }
        })
    });
}

function stopAudioVolumeDetection() {
    trtc.enableAudioVolumeEvaluation(-1);
    trtcSpeakDetect.enableAudioVolumeEvaluation(-1);
    switchOptionStatusOnDetectionChange(false);
}

async function handleLocalAudioVolumeChange() {
    const captureVolume = parseInt(document.getElementById('local-volume-input').value);
    document.getElementById('local-volume-display').value = captureVolume;
    await trtc.updateLocalAudio({ option: { captureVolume } });
}

async function handleRemoteAudioVolumeChange() {
    const volume = parseInt(document.getElementById('remote-volume-input').value);
    document.getElementById('remote-volume-display').value = volume;
    await trtc.setRemoteAudioVolume('*', volume);
}

async function muteLocalAudio() {
    await trtc.updateLocalAudio({ mute: !isMuted });
    switchButtonStatus('mute-btn', 'unmute-btn', !isMuted);
    isMuted = !isMuted;
}
