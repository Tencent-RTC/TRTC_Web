/* eslint-disable*/
// -------document events--------

document.getElementById('sdkAppId').value = getQueryString('sdkAppId');
document.getElementById('secretKey').value = getQueryString('secretKey');
document.getElementById('userId').value = getQueryString('userId') || Math.floor(Math.random() * 1000000);
document.getElementById('roomId').value = getQueryString('roomId') || Math.floor(Math.random() * 1000);
const state = { url:window.location.href.split("?")[0] };
window.history.pushState(state,'', 'index.html');

// --------global variables----------
let sdkAppId;
let secretKey;
let roomId;
let trtc = TRTC.create()

let userId;
let shareUserId;

let client;
let shareClient;
let cameraId;
let microphoneId;

let cameras = [];
let microphones = [];

let audio = true;
let video = true;

TRTC.setLogLevel(1);

// init device
initDevice();

// check current environment is supported TRTC or not
TRTC.isSupported().then((checkResult) => {
	console.log('checkResult', checkResult.result, 'checkDetail', checkResult.detail);
	if (!checkResult.result) {
		alert('Your browser does not supported TRTC!');
		window.location.href = 'https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html';
	}
})


function initParams() {
	sdkAppId = parseInt(document.getElementById('sdkAppId').value);
	secretKey = document.getElementById('secretKey').value;
	roomId = parseInt(document.getElementById('roomId').value);
	userId = document.getElementById('userId').value;
	shareUserId = 'share_' + userId;
	cameraId = document.getElementById('camera-select').value;
	microphoneId = document.getElementById('microphone-select').value;

	aegis.reportEvent({
		name: 'loaded',
		ext1: 'loaded-success',
		ext2: DEMOKEY,
		ext3: sdkAppId,
	});

	if (!(sdkAppId && secretKey && roomId && userId)) {
		if (window.lang_ === 'zh-cn') {
			alert('请检查参数 SDKAppId, secretKey, userId, roomId 是否输入正确！');
		} else if (window.lang_ === 'en') {
			alert('Please enter the correct SDKAppId, secretKey, userId, roomId！');
		}

		throw new Error('Please enter the correct SDKAppId, secretKey, userId, roomId');
	}
}

async function joinRoom() {
	initParams()
	try {
		const { userSig } = genTestUserSig({ sdkAppId, userId, secretKey });
		await trtc.enterRoom({ roomId, sdkAppId, userId, userSig })
		reportSuccessEvent('enterRoom', sdkAppId)
		refreshLink()
		invite.style.display = 'flex';
		addSuccessLog(`[${userId}] enterRoom.`);
		enterBtn.disabled = true;

		handleEvent();
	} catch (error) {
		console.log('enterRoom error', error);
		reportFailedEvent({
			name: 'enterRoom', // 必填
			sdkAppId,
			roomId,
			error
		})
		addFailedLog(`[${userId}] enterRoom failed.`);
	}
}

async function leaveRoom() {
	invite.style.display = 'none';
	if (trtc) {
		try {
			await trtc.exitRoom();
			reportSuccessEvent('exitRoom', sdkAppId);
			addSuccessLog(`[${userId}] exitRoom.`);
			enterBtn.disabled = false;
			trtc.off('*');
		} catch (error) {
			reportFailedEvent({
				name: 'exitRoom', // 必填
				sdkAppId,
				roomId,
				error,
			})
			addFailedLog(`[${userId}] exitRoom failed.`);
		}
	}
}

async function startLocalAudio() {
	if (trtc) {
		try {
			await trtc.startLocalAudio({ option: { microphoneId: microphoneSelect.value } });
			reportSuccessEvent('startLocalAudio', sdkAppId);
			addSuccessLog(`[${userId}] startLocalAudio.`);
		} catch (error) {
			reportFailedEvent({ name: 'startLocalAudio', sdkAppId, roomId, error })
			addFailedLog(`[${userId}] startLocalAudio failed.`);
		}
	}
}

async function startLocalVideo() {
	if (trtc) {
		try {
			await trtc.startLocalVideo({
				view: document.getElementById('local'), // 在 DOM 中的 elementId 为 localVideo 的标签上预览视频。
				option: { cameraId: cameraSelect.value }
			});
			reportSuccessEvent('startLocalVideo', sdkAppId);
			addSuccessLog(`[${userId}] startLocalVideo.`);
			addLocalControlView();
		} catch (error) {
			reportFailedEvent({ name: 'startLocalVideo', sdkAppId, roomId, error })
			addFailedLog(`[${userId}] startLocalAudio failed.`);
		}
	}
}

async function stopLocalAudio() {
	if (trtc) {
		try {
			await trtc.stopLocalAudio();
			reportSuccessEvent('stopLocalAudio', sdkAppId)
			addSuccessLog(`[${userId}] stopLocalAudio.`);
		} catch (error) {
			reportFailedEvent({ name: 'stopLocalAudio', sdkAppId, roomId, error })
			addFailedLog(`[${userId}] startLocalAudio failed.`);
		}
	}
}

async function stopLocalVideo() {
	if (trtc) {
		try {
			await trtc.stopLocalVideo();
			reportSuccessEvent('stopLocalVideo', sdkAppId)
			addSuccessLog(`[${userId}] stopLocalVideo.`);
			const local = document.getElementById('local')
			local.removeChild(local.children[0]);
		} catch (error) {
			reportFailedEvent({ name: 'stopLocalVideo', sdkAppId, roomId, error })
			addFailedLog(`[${userId}] stopLocalVideo failed.`);
		}
	}
}


async function startShare() {
	initParams()
	try {
		await trtc.startScreenShare();
		reportSuccessEvent('startScreenShare', sdkAppId)
		addSuccessLog(`[${userId}] startScreenShare.`);
	} catch (error) {
		console.log('startShare error', error);
		reportFailedEvent({
			name: 'startScreenShare', // 必填
			sdkAppId,
			roomId,
			error,
			type: 'share'
		})
		addFailedLog(`[${userId}] startScreenShare failed.`);
	}
}

async function stopShare() {
	try {
		await trtc.stopScreenShare();
		reportSuccessEvent('stopScreenShare', sdkAppId)
		addSuccessLog(`[${userId}] stopScreenShare.`);
	} catch (error) {
		console.log('stopShare error', error);
		reportFailedEvent({
			name: 'startScreenShare', // 必填
			sdkAppId,
			roomId,
			error,
			type: 'share'
		})
		addFailedLog(`[${userId}] stopScreenShare failed.`);
	}
}


async function initDevice() {
	try {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true
			});
			stream?.getTracks().forEach(track => track.stop());
			if (!stream) {
				enterBtn.disabled = true;
			}
		} catch (error) {
			if (window.lang_ === 'en') {
				window.alert('If you do not allow the current page to access the microphone and camera permissions, you may fail when publishing a local stream.');
			} else {
				window.alert('如果不允许当前页面访问麦克风和摄像头权限，您在发布本地流的时候可能会失败。');
			}
			enterBtn.disabled = true;
		}
		const updateDevice = async () => {
			cameras = await TRTC.getCameraList();
			cameras?.forEach(camera => {
				const option = document.createElement('option');
				option.value = camera.deviceId;
				option.text = camera.label;
				cameraSelect.appendChild(option);
			});

			microphones = await TRTC.getMicrophoneList();
			microphones?.forEach(microphone => {
				const option = document.createElement('option');
				option.value = microphone.deviceId;
				option.text = microphone.label;
				microphoneSelect.appendChild(option);
			});
		}
		await updateDevice();
		// 设备更新
		navigator.mediaDevices.addEventListener('devicechange', async () => {
			await updateDevice();
		});
	} catch (e) {
		console.error('get device failed', e);
	}
}

function handleEvent() {
	trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
		// 为了播放视频画面，您需在 DOM 中放置一个 HTMLElement，可以是一个 div 标签，假设其 id 为 `${userId}_${streamType}`
		const elementId = `${userId}_${streamType}`;
		addStreamView(elementId);
		trtc.startRemoteVideo({ userId, streamType, view: elementId });
	});
	trtc.on(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, ({ userId, streamType }) => {
		const elementId = `${userId}_${streamType}`;
		removeStreamView(elementId);
		trtc.stopRemoteVideo({ userId, streamType: TRTC.TYPE.STREAM_TYPE_MAIN});
	});
	trtc.on(TRTC.EVENT.SCREEN_SHARE_STOPPED, () => {
		console.log('screen sharing was stopped');
	});

}
consoleBtn.addEventListener('click', () => {
	window.vconsole = new VConsole();
});
enterBtn.addEventListener('click', joinRoom, false);
exitBtn.addEventListener('click', leaveRoom, false);

startLocalVideoBtn.addEventListener('click', startLocalVideo, false);
startLocalAudioBtn.addEventListener('click', startLocalAudio, false);
stopLocalAudioBtn.addEventListener('click', stopLocalAudio, false);
stopLocalVideoBtn.addEventListener('click', stopLocalVideo, false);

startShareBtn.addEventListener('click', startShare, false);
stopShareBtn.addEventListener('click', stopShare, false);

microphoneSelect.onchange = async (e) => {
	if (trtc) {
		try {
			await trtc.updateLocalAudio({ option: { microphoneId: microphoneSelect.value } });
		} catch (error) {
			console.log('updateLocalAudio error', error);
		}
	}
}

cameraSelect.onchange = async (e) => {
	if (trtc) {
		try {
			await trtc.updateLocalVideo({ option: { cameraId: cameraSelect.value } });
		} catch (error) {
			console.log('updateLocalVideo error', error);
		}
	}
}

function refreshLink() {
	if (trtc) {
		inviteUrl.value = createShareLink();
	}
}

function createShareLink() {
	const userId = String(Math.floor(Math.random() * 1000000));
	const { userSig } = genTestUserSig({ sdkAppId, userId, secretKey });
	const { origin } = window.location;
	const pathname = window.location.pathname.replace('index.html', 'invite/invite.html');
	return `${origin}${pathname}?userSig=${userSig}&&SDKAppId=${sdkAppId}&&userId=${userId}&&roomId=${roomId}`;
}

let clipboard = new ClipboardJS('#inviteBtn');
clipboard.on('success', (e) => {
	refreshLink();
	showTooltip(e.trigger, 'Copied!')
});

function addLocalControlView() {
	const local = document.getElementById('local');

	const tag = document.createElement('div');
	this.tag = tag;
	tag.className = 'tag';
	const audioDiv = document.createElement('div');
	audioDiv.setAttribute('id', 'mute-audio');
	if (audio) {
		audioDiv.setAttribute('class', 'unmuteAudio');
	} else {
		audioDiv.setAttribute('class', 'muteAudio');
	}

	const videoDiv = document.createElement('div');
	videoDiv.setAttribute('id', 'mute-video');
	if (video) {
		videoDiv.setAttribute('class', 'unmuteVideo');
	} else {
		videoDiv.setAttribute('class', 'muteVideo');
	}

	tag.appendChild(audioDiv);
	tag.appendChild(videoDiv);
	local.appendChild(tag);

	audioDiv.addEventListener('click', async () => {
		if (audio) {
			try {
				await trtc.updateLocalAudio( { mute: true });
				addSuccessLog('updateLocalAudio muted=true');
				audioDiv.setAttribute('class', 'muteAudio');
				audio = false;
			} catch (e) {
				addFailedLog(`[${userId}] updateLocalAudio failed. Reason: ${e.message}`);
			}
		} else {
			try {
				await trtc.updateLocalAudio({ mute: false });
				addSuccessLog('updateLocalAudio muted=false');
				audioDiv.setAttribute('class', 'unmuteAudio');
				audio = true;
			} catch (e) {
				addFailedLog(`[${userId}] updateLocalAudio failed. Reason: ${e.message}`);
			}

		}
	});

	videoDiv.addEventListener('click', async () => {
		if (video) {
			try {
				await trtc.updateLocalVideo( { mute: true });
				addSuccessLog('updateLocalVideo muted=true');
				videoDiv.setAttribute('class', 'muteVideo');
				video = false;
			} catch (e) {
				addFailedLog(`[${userId}] updateLocalVideo failed. Reason: ${e.message}`);
			}
		} else {
			try {
				await trtc.updateLocalVideo({ mute: false });
				addSuccessLog('updateLocalVideo muted=false');
				videoDiv.setAttribute('class', 'unmuteVideo');
				video = true;
			} catch (e) {
				addFailedLog(`[${userId}] updateLocalVideo failed. Reason: ${e.message}`);
			}
		}
	});
}
