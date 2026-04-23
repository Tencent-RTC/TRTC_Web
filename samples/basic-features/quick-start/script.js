const trtc = TRTC.create();

let isAudioStarted = false;
let isVideoStarted = false;
let isInRoom = false;
let isScreenSharing = false;
let remoteUserId = '';

// Detect iframe mode
if (window.self !== window.top) {
  document.body.classList.add('in-iframe');
}

// Apply i18n on page load and listen for language changes
applyI18n();
updateInviteSection();
document.addEventListener('lang-changed', () => {
  applyI18n();
  updateInviteSection();
  // Re-apply dynamic button texts based on current state
  updateDynamicButtonTexts();
});

function updateInviteSection() {
  const inviteEl = document.getElementById('invite-section-el');
  if (inviteEl) {
    inviteEl.querySelector('h3').textContent = t('quickStart.inviteOthers');
    inviteEl.querySelector('.note').textContent = t('quickStart.inviteNote');
  }
}

function updateDynamicButtonTexts() {
  const audioBtn = document.getElementById('mute-audio-btn');
  audioBtn.querySelector('.btn-text').textContent = isAudioStarted ? t('quickStart.stopMicrophone') : t('quickStart.startMicrophone');
  const videoBtn = document.getElementById('mute-video-btn');
  videoBtn.querySelector('.btn-text').textContent = isVideoStarted ? t('quickStart.stopCamera') : t('quickStart.startCamera');
  const screenBtn = document.getElementById('start-screen-btn');
  screenBtn.querySelector('.btn-text').textContent = isScreenSharing ? t('quickStart.stopScreenShare') : t('quickStart.startScreenShare');
  // Update status texts
  if (!isInRoom) {
    updateLocalStatus(false, t('quickStart.notPublished'));
    updateRemoteStatus(false, t('quickStart.noRemoteUser'));
    updateScreenStatus(false, t('quickStart.noScreenSharing'));
  } else {
    updateLocalStatus(true, getLocalStatusText());
    if (remoteUserId) {
      updateRemoteStatus(true, t('quickStart.userJoined', { userId: remoteUserId }));
    }
    if (isScreenSharing) {
      updateScreenStatus(true, t('quickStart.screenSharingStarted'));
    }
  }
}

// listen for remote video events
trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
  if (streamType === TRTC.TYPE.STREAM_TYPE_SUB) {
    // Remote screen share
    trtc.startRemoteVideo({ userId, streamType, view: 'remote-screen-view' });
    document.getElementById('remote-screen-wrapper').style.display = 'block';
  } else {
    // Remote camera
    trtc.startRemoteVideo({ userId, streamType, view: 'remote-video-view' });
  }
  remoteUserId = userId;
  updateRemoteStatus(true, t('quickStart.userJoined', { userId }));
  showToast(t('quickStart.remoteUserJoined'), 'info');
});

trtc.on(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, ({ userId, streamType }) => {
  trtc.stopRemoteVideo({ userId, streamType });
  if (streamType === TRTC.TYPE.STREAM_TYPE_SUB) {
    document.getElementById('remote-screen-wrapper').style.display = 'none';
    document.getElementById('remote-screen-view').innerHTML = '';
  }
});

trtc.on(TRTC.EVENT.REMOTE_USER_EXIT, ({ userId }) => {
  remoteUserId = '';
  updateRemoteStatus(false, t('quickStart.noRemoteUser'));
  document.getElementById('remote-screen-wrapper').style.display = 'none';
  document.getElementById('remote-screen-view').innerHTML = '';
});

trtc.on(TRTC.EVENT.SCREEN_SHARE_STOPPED, () => {
  isScreenSharing = false;
  const btn = document.getElementById('start-screen-btn');
  btn.querySelector('.btn-text').textContent = t('quickStart.startScreenShare');
  btn.classList.remove('active');
  updateScreenStatus(false, t('quickStart.noScreenSharing'));
  document.getElementById('local-screen-view').innerHTML = '';
  document.getElementById('local-screen-wrapper').style.display = 'none';
});

// -------- Device Init --------
async function initDevices() {
  try {
    await getMicrophoneList();
    await getCameraList();
  } catch (e) {
    console.error('initDevices error', e);
  }
}

async function getMicrophoneList() {
  const devices = await TRTC.getMicrophoneList();
  const select = document.getElementById('microphone-select');
  select.innerHTML = '';
  devices?.forEach(device => {
    const option = document.createElement('option');
    option.value = device.deviceId;
    option.text = device.label || `Microphone ${select.length + 1}`;
    select.appendChild(option);
  });
}

async function getCameraList() {
  const devices = await TRTC.getCameraList();
  const select = document.getElementById('camera-select');
  select.innerHTML = '';
  devices?.forEach(device => {
    const option = document.createElement('option');
    option.value = device.deviceId;
    option.text = device.label || `Camera ${select.length + 1}`;
    select.appendChild(option);
  });
}

document.getElementById('microphone-select').addEventListener('change', async () => {
  if (isAudioStarted && isInRoom) {
    try {
      await trtc.updateLocalAudio({ option: { microphoneId: document.getElementById('microphone-select').value } });
      showToast(t('quickStart.microphoneUpdated'), 'success');
    } catch (error) {
      showToast(`${t('quickStart.updateMicFailed')}: ${error.message || error}`, 'error');
    }
  }
});

document.getElementById('camera-select').addEventListener('change', async () => {
  if (isVideoStarted && isInRoom) {
    try {
      await trtc.updateLocalVideo({ option: { cameraId: document.getElementById('camera-select').value } });
      showToast(t('quickStart.cameraUpdated'), 'success');
    } catch (error) {
      showToast(`${t('quickStart.updateCamFailed')}: ${error.message || error}`, 'error');
    }
  }
});



// -------- Step Management --------
function enableStep(stepId) {
  document.getElementById(stepId).classList.remove('disabled');
}

function disableStep(stepId) {
  document.getElementById(stepId).classList.add('disabled');
}

function setButtonDisabled(id, disabled) {
  document.getElementById(id).disabled = disabled;
}

// -------- Toast --------
function removeToast(toast) {
  toast.classList.add('fade-out');
  toast.addEventListener('animationend', () => toast.remove(), { once: true });
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  if (type === 'error') {
    let timer = setTimeout(() => removeToast(toast), 3000);
    toast.addEventListener('mouseenter', () => {
      clearTimeout(timer);
    });
    toast.addEventListener('mouseleave', () => {
      timer = setTimeout(() => removeToast(toast), 3000);
    });
  } else {
    setTimeout(() => toast.remove(), 3000);
  }
}

// -------- Status Updates --------
function updateLocalStatus(online, text) {
  const dot = document.querySelector('#local-status .status-dot');
  const label = document.querySelector('#local-status .status-text');
  dot.className = 'status-dot ' + (online ? 'online' : 'offline');
  label.textContent = text;
}

function updateRemoteStatus(online, text) {
  const dot = document.querySelector('#remote-status .status-dot');
  const label = document.querySelector('#remote-status .status-text');
  dot.className = 'status-dot ' + (online ? 'online' : 'offline');
  label.textContent = text;
}

function updateScreenStatus(online, text) {
  const dot = document.querySelector('#screen-status .status-dot');
  const label = document.querySelector('#screen-status .status-text');
  dot.className = 'status-dot ' + (online ? 'online' : 'offline');
  label.textContent = text;
}

// -------- Step 2: Enter Room --------
async function enterRoom() {
  try {
    const { sdkAppId, sdkSecretKey, userId, roomId, userSig } = initParams();
    await trtc.enterRoom({ roomId, sdkAppId, userId, userSig });
    isInRoom = true;
    reportSuccessEvent('enterRoom', sdkAppId);

    updateLocalStatus(true, t('quickStart.inRoom'));
    showToast(t('quickStart.enteredRoom'), 'success');

    // Auto-collapse Configuration section after entering room
    document.querySelector('params-form').collapse();

    // Enable step 3 & invite
    enableStep('step-3');
    enableStep('step-invite');
    setButtonDisabled('mute-audio-btn', false);
    setButtonDisabled('mute-video-btn', false);
    setButtonDisabled('start-screen-btn', false);

    // Load device list when entering step 3
    initDevices();

    // Swap enter button to exit button
    document.getElementById('enter-btn').disabled = true;
    document.getElementById('exit-btn').disabled = false;

    // Generate invite link
    refreshLink({ sdkAppId, sdkSecretKey, roomId });
  } catch (error) {
    reportFailedEvent({ name: 'enterRoom', roomId: 0, error });
    showToast(`${t('quickStart.enterRoomFailed')}: ${error.message || error}`, 'error');
  }
}

// -------- Step 3: Manage Stream --------
async function toggleLocalAudio() {
  if (!isInRoom) return;
  try {
    const btn = document.getElementById('mute-audio-btn');
    if (isAudioStarted) {
      await trtc.stopLocalAudio();
      isAudioStarted = false;
      btn.querySelector('.btn-text').textContent = t('quickStart.startMicrophone');
      btn.classList.remove('active');
      showToast(t('quickStart.microphoneStopped'), 'success');
    } else {
      const microphoneId = document.getElementById('microphone-select').value;
      await trtc.startLocalAudio({ option: { microphoneId } });
      isAudioStarted = true;
      btn.querySelector('.btn-text').textContent = t('quickStart.stopMicrophone');
      btn.classList.add('active');
      showToast(t('quickStart.microphoneStarted'), 'success');
    }
    updateLocalStatus(true, getLocalStatusText());
  } catch (error) {
    showToast(`${t('quickStart.toggleMicFailed')}: ${error.message || error}`, 'error');
  }
}

async function toggleLocalVideo() {
  if (!isInRoom) return;
  try {
    const btn = document.getElementById('mute-video-btn');
    if (isVideoStarted) {
      await trtc.stopLocalVideo();
      isVideoStarted = false;
      btn.querySelector('.btn-text').textContent = t('quickStart.startCamera');
      btn.classList.remove('active');
      showToast(t('quickStart.cameraStopped'), 'success');
    } else {
      const cameraId = document.getElementById('camera-select').value;
      await trtc.startLocalVideo({ view: 'local-video-view', option: { cameraId } });
      isVideoStarted = true;
      btn.querySelector('.btn-text').textContent = t('quickStart.stopCamera');
      btn.classList.add('active');
      showToast(t('quickStart.cameraStarted'), 'success');
    }
    updateLocalStatus(true, getLocalStatusText());
  } catch (error) {
    showToast(`${t('quickStart.toggleCamFailed')}: ${error.message || error}`, 'error');
  }
}

function getLocalStatusText() {
  if (!isAudioStarted && !isVideoStarted) return t('quickStart.noLocalStream');
  if (!isAudioStarted) return t('quickStart.audioStoppedVideoOn');
  if (!isVideoStarted) return t('quickStart.audioOnVideoStopped');
  return t('quickStart.audioVideoPublished');
}

async function toggleScreenShare() {
  if (!isInRoom) return;
  try {
    const btn = document.getElementById('start-screen-btn');
    if (isScreenSharing) {
      await trtc.stopScreenShare();
      isScreenSharing = false;
      btn.querySelector('.btn-text').textContent = t('quickStart.startScreenShare');
      btn.classList.remove('active');
      updateScreenStatus(false, t('quickStart.noScreenSharing'));
      document.getElementById('local-screen-view').innerHTML = '';
      showToast(t('quickStart.screenSharingStopped'), 'success');
    } else {
      await trtc.startScreenShare({ view: 'local-screen-view' });
      isScreenSharing = true;
      btn.querySelector('.btn-text').textContent = t('quickStart.stopScreenShare');
      btn.classList.add('active');
      updateScreenStatus(true, t('quickStart.screenSharingStarted'));
      document.getElementById('local-screen-wrapper').style.display = 'block';
      showToast(t('quickStart.screenSharingStarted'), 'success');
    }
  } catch (error) {
    showToast(`${t('quickStart.screenShareFailed')}: ${error.message || error}`, 'error');
  }
}

async function exitRoom() {
  if (!isInRoom) return;
  try {
    if (isScreenSharing) {
      await trtc.stopScreenShare();
      isScreenSharing = false;
    }
    await trtc.stopLocalAudio();
    await trtc.stopLocalVideo();
    await trtc.exitRoom();
    isInRoom = false;
    isAudioStarted = false;
    isVideoStarted = false;
    isScreenSharing = false;
    remoteUserId = '';
    reportSuccessEvent('exitRoom', 0);

    // Reset UI
    disableStep('step-3');
    disableStep('step-invite');

    // Re-expand Configuration section after exiting room
    document.querySelector('params-form').expand();

    document.getElementById('enter-btn').disabled = false;
    document.getElementById('exit-btn').disabled = true;

    const muteAudioBtn = document.getElementById('mute-audio-btn');
    muteAudioBtn.querySelector('.btn-text').textContent = t('quickStart.startMicrophone');
    muteAudioBtn.classList.remove('active');
    muteAudioBtn.disabled = true;

    const muteVideoBtn = document.getElementById('mute-video-btn');
    muteVideoBtn.querySelector('.btn-text').textContent = t('quickStart.startCamera');
    muteVideoBtn.classList.remove('active');
    muteVideoBtn.disabled = true;

    const screenBtn = document.getElementById('start-screen-btn');
    screenBtn.querySelector('.btn-text').textContent = t('quickStart.startScreenShare');
    screenBtn.classList.remove('active');
    screenBtn.disabled = true;

    document.getElementById('local-video-view').innerHTML = '';
    document.getElementById('local-screen-view').innerHTML = '';
    document.getElementById('remote-video-view').innerHTML = '';
    document.getElementById('remote-screen-view').innerHTML = '';
    document.getElementById('local-screen-wrapper').style.display = 'none';
    document.getElementById('remote-screen-wrapper').style.display = 'none';
    updateLocalStatus(false, t('quickStart.notPublished'));
    updateRemoteStatus(false, t('quickStart.noRemoteUser'));
    updateScreenStatus(false, t('quickStart.noScreenSharing'));
    cleanShareLink();
    showToast(t('quickStart.exitedRoom'), 'success');
  } catch (error) {
    reportFailedEvent({ name: 'exitRoom', roomId: 0, error });
    showToast(`${t('quickStart.exitRoomFailed')}: ${error.message || error}`, 'error');
  }
}


