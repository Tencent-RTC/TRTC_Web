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

// Map of player id -> { instance, url }
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
    btn.textContent = isMicOn ? t('audioPlayerBgm.micOn') : t('audioPlayerBgm.micOff');
  }
}

// ==================== Modal Control ====================
function openModal() {
  const modal = document.getElementById('modal-create-player');
  modal.classList.add('visible');
  // Reset form
  document.getElementById('url-source-select').selectedIndex = 0;
  document.getElementById('url-file-group').style.display = 'none';
  if (document.getElementById('url-file-input')) {
    document.getElementById('url-file-input').value = '';
  }
}

function closeModal() {
  document.getElementById('modal-create-player').classList.remove('visible');
}

function onModalOverlayClick(e) {
  if (e.target === e.currentTarget) closeModal();
}

function onSourceSelectChange() {
  const select = document.getElementById('url-source-select');
  const fileGroup = document.getElementById('url-file-group');
  fileGroup.style.display = select.value === 'local' ? 'flex' : 'none';
}

// ==================== Toggle Switch Helper ====================
function isToggleOn(elementId) {
  return document.getElementById(elementId).classList.contains('on');
}

function toggleSwitch(element) {
  element.classList.toggle('on');
}

// ==================== Create URL Player ====================
async function createURLPlayer() {
  if (isCreatingPlayer) return;

  const sourceSelect = document.getElementById('url-source-select');
  const fileInput = document.getElementById('url-file-input');
  const publish = isToggleOn('url-publish-toggle');
  const loop = isToggleOn('url-loop-toggle');

  let url = '';
  if (sourceSelect.value === 'local') {
    if (!fileInput.files || !fileInput.files[0]) {
      alert(t('audioPlayerBgm.selectFileFirst'));
      return;
    }
    url = URL.createObjectURL(fileInput.files[0]);
  } else {
    url = sourceSelect.value;
  }

  // Close modal immediately to prevent duplicate clicks during preload
  isCreatingPlayer = true;
  closeModal();

  const id = `url-player-${++playerIdCounter}`;

  try {
    const player = await trtc.startPlugin('AudioPlayer', {
      id,
      sourceType: 'url',
      url,
      publish,
      loop,
      onEnded: () => {
        console.log(`Player ${id} ended`);
      },
    });

    players.set(id, { instance: player, url });
    createPlayerCard(id, player);
    updateEmptyState();
    // Start status updater if not running
    if (!statusUpdateInterval) startStatusUpdater();
  } catch (error) {
    console.error('Create player failed:', error);
    throw error;
  } finally {
    isCreatingPlayer = false;
  }
}

// ==================== Player Card Creation ====================
function createPlayerCard(id, player) {
  const area = document.getElementById('player-cards-area');
  const card = document.createElement('div');
  card.className = 'player-card';
  card.id = `card-${id}`;

  card.innerHTML = `
    <div class="player-card-header">
      <div class="player-card-title">
        <span class="player-id">${id}</span>
        <span class="player-type-badge url">URL</span>
      </div>
      <button class="player-card-delete" data-delete="${id}" title="${t('audioPlayerBgm.delete')}">
        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </button>
    </div>
    <div class="player-controls">
      <button class="ctrl-btn" data-action="start">${t('audioPlayerBgm.start')}</button>
      <button class="ctrl-btn" data-action="pause">${t('audioPlayerBgm.pause')}</button>
      <button class="ctrl-btn" data-action="resume">${t('audioPlayerBgm.resume')}</button>
      <button class="ctrl-btn" data-action="stop">${t('audioPlayerBgm.stop')}</button>
    </div>
    <div class="player-props">
      <div class="prop-item">
        <label>${t('audioPlayerBgm.volume')}</label>
        <input type="range" min="0" max="100" value="100" data-prop="volume">
        <span class="prop-value" data-prop-display="volume">1.00</span>
      </div>
      <div class="prop-item">
        <label>${t('audioPlayerBgm.playbackRate')}</label>
        <input type="range" min="50" max="200" value="100" data-prop="playbackRate">
        <span class="prop-value" data-prop-display="playbackRate">1.0</span>
      </div>
      <div class="prop-item">
        <label>${t('audioPlayerBgm.loop')}</label>
        <div class="toggle-switch ${player.loop ? 'on' : ''}" data-prop="loop"></div>
      </div>
      <div class="prop-item">
        <label>${t('audioPlayerBgm.publish')}</label>
        <div class="toggle-switch ${player.publish ? 'on' : ''}" data-prop="publish"></div>
      </div>
    </div>
    <div class="player-status">
      <div class="status-item">${t('audioPlayerBgm.state')}: <span class="status-value" data-status="state">stopped</span></div>
      <div class="status-item">${t('audioPlayerBgm.currentTime')}: <span class="status-value" data-status="currentTime">0.0s</span></div>
      <div class="status-item">${t('audioPlayerBgm.duration')}: <span class="status-value" data-status="duration">—</span></div>
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

  // Volume slider
  const volumeSlider = card.querySelector('[data-prop="volume"]');
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      const val = e.target.value / 100;
      const playerData = players.get(id);
      if (playerData && playerData.instance) {
        playerData.instance.volume = val;
      }
      card.querySelector('[data-prop-display="volume"]').textContent = val.toFixed(2);
    });
  }

  // PlaybackRate slider
  const rateSlider = card.querySelector('[data-prop="playbackRate"]');
  if (rateSlider) {
    rateSlider.addEventListener('input', (e) => {
      const val = e.target.value / 100;
      const playerData = players.get(id);
      if (playerData && playerData.instance) {
        playerData.instance.playbackRate = val;
      }
      card.querySelector('[data-prop-display="playbackRate"]').textContent = val.toFixed(1);
    });
  }

  // Loop toggle
  const loopToggle = card.querySelector('[data-prop="loop"]');
  if (loopToggle) {
    loopToggle.addEventListener('click', () => {
      toggleSwitch(loopToggle);
      const playerData = players.get(id);
      if (playerData && playerData.instance) {
        playerData.instance.loop = loopToggle.classList.contains('on');
      }
    });
  }

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
    }
  } catch (error) {
    console.error(`Player ${id} action "${action}" failed:`, error);
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
