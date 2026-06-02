/* eslint-disable no-undef */
/* global TRTC AudioPlayer demoEnterRoom demoExitRoom initPageI18n t applyI18n */

// ==================== TRTC Instance ====================
const plugins = [];
if (typeof AudioPlayer !== 'undefined') plugins.push(AudioPlayer);
const trtc = TRTC.create({ plugins });

// ==================== State ====================
let isMicOn = false;
let playerIdCounter = 0;
let statusUpdateInterval = null;
let isCreatingPlayer = false;

// Map of player id -> { instance, pcmChunks, pcmSampleRate, pcmSourceType }
const players = new Map();

// ==================== Enter / Exit Room ====================
async function enterRoom() {
  await demoEnterRoom(trtc, {
    afterEnter: async () => {
      await trtc.startLocalAudio({ mute: 'microphone' });
    },
  });
  startStatusUpdater();
}

async function exitRoom() {
  await demoExitRoom(trtc, {
    beforeExit: async () => {
      await trtc.stopLocalAudio();
      await destroyAllPlayers();
    },
  });
  resetUIState();
}

// ==================== Destroy All Players ====================
async function destroyAllPlayers() {
  if (players.size === 0) return;
  try {
    await trtc.stopPlugin('AudioPlayer', { id: '*' });
  } catch (e) {
    console.warn('stopPlugin AudioPlayer * error:', e);
  }
  // Release all instance references
  players.forEach((data) => {
    data.instance = null;
  });
  players.clear();
  // Clear DOM
  const area = document.getElementById('player-cards-area');
  if (area) area.innerHTML = '';
  playerIdCounter = 0;
  updateEmptyState();
  // Clear status updater
  if (statusUpdateInterval) {
    clearInterval(statusUpdateInterval);
    statusUpdateInterval = null;
  }
}

// ==================== Reset UI State ====================
function resetUIState() {
  isMicOn = false;
  updateMicButtonText();
}

// ==================== Microphone Toggle ====================
async function toggleMicrophone() {
  if (!isMicOn) {
    await trtc.updateLocalAudio({ mute: false });
    isMicOn = true;
  } else {
    await trtc.updateLocalAudio({ mute: 'microphone' });
    isMicOn = false;
  }
  updateMicButtonText();
}

function updateMicButtonText() {
  const btn = document.querySelector('#toggle-mic-btn .btn-text');
  if (btn) {
    btn.textContent = isMicOn ? t('audioPlayerPcm.micOn') : t('audioPlayerPcm.micOff');
  }
}

// ==================== Modal Control ====================
function openModal() {
  const modal = document.getElementById('modal-create-player');
  modal.classList.add('visible');
  // Reset form
  document.getElementById('pcm-source-select').selectedIndex = 0;
  document.getElementById('pcm-file-group').style.display = 'none';
  if (document.getElementById('pcm-file-input')) {
    document.getElementById('pcm-file-input').value = '';
  }
}

function closeModal() {
  document.getElementById('modal-create-player').classList.remove('visible');
}

function onModalOverlayClick(e) {
  if (e.target === e.currentTarget) closeModal();
}

function onSourceSelectChange() {
  const select = document.getElementById('pcm-source-select');
  const fileGroup = document.getElementById('pcm-file-group');
  fileGroup.style.display = select.value === 'local' ? 'flex' : 'none';
}

// ==================== Toggle Switch Helper ====================
function isToggleOn(elementId) {
  return document.getElementById(elementId).classList.contains('on');
}

function toggleSwitch(element) {
  element.classList.toggle('on');
}

// ==================== PCM Data Generation ====================
function generateSineWavePCM(durationMs = 1000, frequencyHz = 440, sampleRate = 48000) {
  const sampleCount = Math.floor((durationMs / 1000) * sampleRate);
  const pcmData = new Float32Array(sampleCount);
  const amplitude = 0.5;

  for (let i = 0; i < sampleCount; i++) {
    const time = i / sampleRate;
    pcmData[i] = amplitude * Math.sin(2 * Math.PI * frequencyHz * time);
  }

  return pcmData;
}

// ==================== Remote PCM Data Loading ====================
async function loadRemotePCMData() {
  try {
    const response = await fetch('https://web.sdk.qcloud.com/trtc/webrtc/v5/test/ander/audio-player/rtc/asset/data.txt');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    const lines = text.split('\n');
    const pcmChunks = [];

    for (const line of lines) {
      if (line.startsWith('data:')) {
        const base64Str = line.substring(5).trim();
        if (base64Str) {
          pcmChunks.push(base64Str);
        }
      }
    }

    if (pcmChunks.length === 0) {
      console.warn('No PCM data found in data.txt');
      return null;
    }

    console.log(`[PCM] Parsed ${pcmChunks.length} PCM chunks from data.txt`);
    return pcmChunks;
  } catch (error) {
    console.error(`Failed to load remote PCM data: ${error.message}`);
    return null;
  }
}

// Decode base64 string to Int16Array
function decodeBase64ToInt16(base64Str) {
  const binaryStr = atob(base64Str);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return new Int16Array(bytes.buffer);
}

// Feed all PCM chunks to a player instance
function feedPCMChunksToPlayer(player, pcmChunks, sampleRate) {
  let totalSamples = 0;
  pcmChunks.forEach((base64Str, index) => {
    try {
      const int16Data = decodeBase64ToInt16(base64Str);
      player.input(int16Data, sampleRate);
      totalSamples += int16Data.length;
    } catch (decodeErr) {
      console.error(`Failed to decode PCM chunk ${index}:`, decodeErr);
    }
  });
  console.log(`[PCM] Fed ${pcmChunks.length} chunks, total ${totalSamples} samples @ ${sampleRate}Hz`);
  return totalSamples;
}

// Load local PCM file as Int16Array
async function loadLocalPCMFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const int16Data = new Int16Array(arrayBuffer);
      resolve(int16Data);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

// ==================== Create PCM Player ====================
async function createPCMPlayer() {
  if (isCreatingPlayer) return;

  const sourceSelect = document.getElementById('pcm-source-select');
  const publish = isToggleOn('pcm-publish-toggle');
  const realtime = isToggleOn('pcm-realtime-toggle');

  // Close modal immediately to prevent duplicate clicks
  isCreatingPlayer = true;
  closeModal();

  const id = `pcm-player-${++playerIdCounter}`;

  // Determine channels: only applicable for local file source
  let channels = 1;
  if (sourceSelect.value === 'local') {
    const channelsInput = document.getElementById('pcm-channels-input');
    channels = parseInt(channelsInput.value, 10) || 1;
  }

  try {
    const player = await trtc.startPlugin('AudioPlayer', {
      id,
      sourceType: 'pcm',
      publish,
      realtime,
      channels,
      onEnded: () => {
        console.log(`Player ${id} ended`);
      },
    });

    let pcmChunks = null;
    let pcmSampleRate = 48000;
    let pcmSourceType = 'generate';
    let localPcmData = null;

    if (sourceSelect.value === 'remote') {
      pcmChunks = await loadRemotePCMData();
      pcmSampleRate = 16000;
      pcmSourceType = 'remote';
    } else if (sourceSelect.value === 'local') {
      const fileInput = document.getElementById('pcm-file-input');
      const sampleRateInput = document.getElementById('pcm-sample-rate-input');
      if (!fileInput.files || !fileInput.files[0]) {
        alert(t('audioPlayerPcm.selectFileFirst'));
        isCreatingPlayer = false;
        return;
      }
      localPcmData = await loadLocalPCMFile(fileInput.files[0]);
      pcmSampleRate = parseInt(sampleRateInput.value, 10) || 16000;
      pcmSourceType = 'local';
    } else {
      // generate
      pcmSampleRate = 48000;
      pcmSourceType = 'generate';
    }

    players.set(id, { instance: player, pcmChunks, pcmSampleRate, pcmSourceType, localPcmData });
    createPlayerCard(id, player, realtime);
    updateEmptyState();
    // Start status updater if not running
    if (!statusUpdateInterval) startStatusUpdater();
  } catch (error) {
    console.error('Create PCM player failed:', error);
    throw error;
  } finally {
    isCreatingPlayer = false;
  }
}

// ==================== Player Card Creation ====================
function createPlayerCard(id, player, realtime) {
  const area = document.getElementById('player-cards-area');
  const card = document.createElement('div');
  card.className = 'player-card';
  card.id = `card-${id}`;

  card.innerHTML = `
    <div class="player-card-header">
      <div class="player-card-title">
        <span class="player-id">${id}</span>
        <span class="player-type-badge pcm">${realtime ? 'Realtime ' : ''}PCM</span>
      </div>
      <button class="player-card-delete" data-delete="${id}" title="${t('audioPlayerPcm.delete')}">
        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </button>
    </div>
    <div class="player-controls">
      <button class="ctrl-btn" data-action="start">${t('audioPlayerPcm.start')}</button>
      <button class="ctrl-btn" data-action="pause">${t('audioPlayerPcm.pause')}</button>
      <button class="ctrl-btn" data-action="resume">${t('audioPlayerPcm.resume')}</button>
      <button class="ctrl-btn" data-action="stop">${t('audioPlayerPcm.stop')}</button>
      <button class="ctrl-btn" data-action="input">${t('audioPlayerPcm.inputData')}</button>
      <button class="ctrl-btn" data-action="clear">${t('audioPlayerPcm.clearInput')}</button>
    </div>
    <div class="player-props">
      <div class="prop-item">
        <label>${t('audioPlayerPcm.publish')}</label>
        <div class="toggle-switch ${player.publish ? 'on' : ''}" data-prop="publish"></div>
      </div>
    </div>
    <div class="player-status">
      <div class="status-item">${t('audioPlayerPcm.state')}: <span class="status-value" data-status="state">stopped</span></div>
      <div class="status-item">${t('audioPlayerPcm.currentTime')}: <span class="status-value" data-status="currentTime">0.00s</span></div>
      <div class="status-item">${t('audioPlayerPcm.duration')}: <span class="status-value" data-status="duration">—</span></div>
    </div>
  `;

  area.appendChild(card);
  bindCardEvents(card, id);
}

// ==================== Card Event Binding ====================
function bindCardEvents(card, id) {
  // Control buttons
  card.querySelectorAll('.ctrl-btn').forEach((btn) => {
    btn.addEventListener('click', () => handleControlAction(id, btn.dataset.action));
  });

  // Delete button
  card.querySelector('.player-card-delete').addEventListener('click', () => deletePlayer(id));

  // Publish toggle
  const publishToggle = card.querySelector('[data-prop="publish"]');
  if (publishToggle) {
    publishToggle.addEventListener('click', () => {
      toggleSwitch(publishToggle);
      const playerData = players.get(id);
      if (playerData && playerData.instance) {
        playerData.instance.publish = publishToggle.classList.contains('on');
      }
    });
  }
}

// ==================== Control Actions ====================
async function handleControlAction(id, action) {
  const playerData = players.get(id);
  if (!playerData || !playerData.instance) return;

  const player = playerData.instance;

  try {
    switch (action) {
      case 'start':
        // For PCM player, input data before start so worklet has data to play
        // if (playerData.pcmSourceType === 'remote' && playerData.pcmChunks && player.duration === 0) {
        //   feedPCMChunksToPlayer(player, playerData.pcmChunks, playerData.pcmSampleRate || 16000);
        // } else if (playerData.pcmSourceType === 'generate' && player.duration === 0) {
        //   const sineData = generateSineWavePCM(1000, 440, 48000);
        //   player.input(sineData, 48000);
        //   console.log(`[PCM] Fed ${sineData.length} chunks, total ${sineData.length * 2} samples @ 48000Hz`);
        // } else if (playerData.pcmSourceType === 'local' && playerData.localPcmData && player.duration === 0) {
        //   player.input(playerData.localPcmData, playerData.pcmSampleRate);
        //   console.log(`[PCM] Fed ${playerData.localPcmData.length} chunks, total ${playerData.localPcmData.length * 2} samples @ ${playerData.pcmSampleRate}Hz`);
        // }
        await player.start();
        break;
      case 'pause':
        player.pause();
        break;
      case 'resume':
        player.resume();
        break;
      case 'stop':
        player.stop();
        break;
      case 'input':
        handlePCMInput(id);
        break;
      case 'clear':
        player.clearInput();
        break;
    }
  } catch (error) {
    console.error(`Player ${id} action "${action}" failed:`, error);
  }
}

// ==================== PCM Input ====================
function handlePCMInput(id) {
  const playerData = players.get(id);
  if (!playerData || !playerData.instance) return;

  if (playerData.pcmSourceType === 'remote' && playerData.pcmChunks) {
    feedPCMChunksToPlayer(playerData.instance, playerData.pcmChunks, playerData.pcmSampleRate || 16000);
  } else if (playerData.pcmSourceType === 'local' && playerData.localPcmData) {
    playerData.instance.input(playerData.localPcmData, playerData.pcmSampleRate);
  } else {
    // Generate fresh sine wave data
    const data = generateSineWavePCM(1000, 440, 48000);
    playerData.instance.input(data, 48000);
  }
}

// ==================== Delete Player ====================
async function deletePlayer(id) {
  try {
    await trtc.stopPlugin('AudioPlayer', { id });
  } catch (error) {
    console.error(`Delete player ${id} failed:`, error);
  }

  const playerData = players.get(id);
  if (playerData) {
    playerData.instance = null;
  }
  players.delete(id);

  const card = document.getElementById(`card-${id}`);
  if (card) card.remove();

  updateEmptyState();
}

// ==================== Empty State ====================
function updateEmptyState() {
  const emptyState = document.getElementById('empty-state');
  if (!emptyState) return;
  emptyState.style.display = players.size === 0 ? 'block' : 'none';
}

// ==================== Status Updater ====================
function startStatusUpdater() {
  if (statusUpdateInterval) clearInterval(statusUpdateInterval);

  statusUpdateInterval = setInterval(() => {
    players.forEach((playerData, id) => {
      const card = document.getElementById(`card-${id}`);
      if (!card || !playerData.instance) return;

      const player = playerData.instance;

      // Determine state
      let state = 'playing';
      let stateClass = 'playing';
      if (player.isStop) {
        state = 'stopped';
        stateClass = 'stopped';
      } else if (player.isPause) {
        state = 'paused';
        stateClass = 'paused';
      }

      const stateEl = card.querySelector('[data-status="state"]');
      if (stateEl) {
        stateEl.textContent = state;
        stateEl.className = `status-value ${stateClass}`;
      }

      // Current time (seconds, 2 decimal places)
      const currentTimeEl = card.querySelector('[data-status="currentTime"]');
      if (currentTimeEl) {
        currentTimeEl.textContent = `${(player.currentTime || 0).toFixed(2)}s`;
      }

      // Duration (seconds, 2 decimal places)
      const durationEl = card.querySelector('[data-status="duration"]');
      if (durationEl) {
        const dur = player.duration;
        durationEl.textContent = dur ? `${dur.toFixed(2)}s` : '—';
      }
    });
  }, 200);
}

// ==================== i18n Initialization ====================
initPageI18n(updateDynamicContent);

function updateDynamicContent() {
  // Update invite section
  const inviteEl = document.getElementById('invite-section-el');
  if (inviteEl) {
    const h3 = inviteEl.querySelector('h3');
    const note = inviteEl.querySelector('.note');
    if (h3) h3.textContent = t('invite.defaultTitle');
    if (note) note.textContent = t('invite.sendInvite');
  }
  // Update microphone button dynamic text
  updateMicButtonText();
}
