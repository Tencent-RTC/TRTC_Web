/* eslint-disable*/
// -------document events--------

document.getElementById('sdkAppId').value = getQueryString('sdkAppId');
document.getElementById('sdkSecretKey').value = getQueryString('sdkSecretKey');
document.getElementById('userId').value = getQueryString('userId') || Math.floor(Math.random() * 1000000);
document.getElementById('roomId').value = getQueryString('roomId') || Math.floor(Math.random() * 1000);
const state = { url:window.location.href.split("?")[0] };
window.history.pushState(state,'', 'index.html');

window.isIframe = window.self !== window.top;

// --------global variables----------
let sdkAppId;
let sdkSecretKey;
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

let isShared = false;
let isCamOpened = false;
let isMicOpened = false;

TRTC.setLogLevel(1);

// init device
if (!window.isIframe) initDevice();
handleEvent();

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
	sdkSecretKey = document.getElementById('sdkSecretKey').value;
	roomId = parseInt(document.getElementById('roomId').value);
	userId = document.getElementById('userId').value;
	shareUserId = 'share_' + userId;
	cameraId = document.getElementById('camera-select').value;
	microphoneId = document.getElementById('microphone-select').value;

	aegis?.reportEvent({
		name: 'loaded',
		ext1: 'loaded-success',
		ext2: DEMOKEY,
		ext3: window.isIframe ? 'iframe' : '',
	});

	if (!(sdkAppId && sdkSecretKey && roomId && userId)) {
		if (window.lang_ === 'zh-cn') {
			alert('请检查参数 SDKAppId, SDKSecretKey, userId, roomId 是否输入正确！');
		} else if (window.lang_ === 'en') {
			alert('Please fill in the correct SDKAppId, SDKSecretKey, userId, roomId!');
		}

		throw new Error('Please fill in the correct SDKAppId, SDKSecretKey, userId, roomId');
	}
}

async function enterRoom() {
	if (window.isIframe) initDevice();
	initParams()
	setButtonLoading('enter', true);
	try {
		const { userSig } = genTestUserSig({ sdkAppId, userId, sdkSecretKey });
		await trtc.enterRoom({ roomId, sdkAppId, userId, userSig })
		reportSuccessEvent('enterRoom', sdkAppId)
		refreshLink()
		invite.style.display = 'flex';
		addSuccessLog(`[${userId}] enterRoom.`);
		setButtonLoading('enter', false);
		setButtonDisabled('enter', true);
	} catch (error) {
		console.log('enterRoom error', error);
		setButtonLoading('enter', false);
		reportFailedEvent({
			name: 'enterRoom',
			sdkAppId,
			roomId,
			error
		})
		addFailedLog(`[${userId}] enterRoom failed.`);
	}

	startLocalVideo();
	startLocalAudio();
}

async function exitRoom() {
	invite.style.display = 'none';
	setButtonLoading('exit', true);
	if (trtc) {
		try {
			await trtc.exitRoom();
			reportSuccessEvent('exitRoom', 0);
			addSuccessLog(`[${userId}] exitRoom.`);
			setButtonLoading('exit', false);
			setButtonDisabled('enter', false);
		} catch (error) {
			reportFailedEvent({
				name: 'exitRoom',
				sdkAppId,
				roomId,
				error,
			})
			setButtonLoading('exit', false);
			addFailedLog(`[${userId}] exitRoom failed.`);
		}
		if (isMicOpened) stopLocalAudio();
		if (isCamOpened) stopLocalVideo();
		if (isShared) stopShare();
	}
}

async function startLocalAudio() {
	setButtonLoading('startLocalAudio', true);
	if (trtc) {
		try {
			await trtc.startLocalAudio({ option: { microphoneId: microphoneSelect.value } });
			audio = true;
			isMicOpened = true;
			setButtonLoading('startLocalAudio', false);
			setButtonDisabled('startLocalAudio', true);
			reportSuccessEvent('startLocalAudio', 0);
			addSuccessLog(`${userId ? `[${userId}]` : ''} startLocalAudio.`);
		} catch (error) {
			reportFailedEvent({ name: 'startLocalAudio', sdkAppId, roomId, error })
			setButtonLoading('startLocalAudio', false);
			addFailedLog(`${userId ? `[${userId}]` : ''} startLocalAudio failed.`);
		}
	}
}

async function startLocalVideo() {
	setButtonLoading('startLocalVideo', true);
	if (trtc) {
		try {
			await trtc.startLocalVideo({
				view: document.getElementById('local'), // Preview the video on the element with the elementId "localVideo" in the DOM.
				option: { cameraId: cameraSelect.value, profile: '1080p' }
			});
			video = true;
			isCamOpened = true;
			setButtonLoading('startLocalVideo', false);
			setButtonDisabled('startLocalVideo', true);
			reportSuccessEvent('startLocalVideo', 0);
			addSuccessLog(`${userId ? `[${userId}]` : ''} startLocalVideo.`);
			addLocalControlView();
		} catch (error) {
			setButtonLoading('startLocalVideo', false);
			reportFailedEvent({ name: 'startLocalVideo', sdkAppId, roomId, error })
			addFailedLog(`${userId ? `[${userId}]` : ''} startLocalVideo failed.`);
		}
	}
}

async function stopLocalAudio() {
	if (!isMicOpened) {
		addFailedLog('The audio has not been started');
		return;
	}
	setButtonLoading('stopLocalAudio', true);
	if (trtc) {
		try {
			await trtc.stopLocalAudio();
			isMicOpened = false;
			setButtonLoading('stopLocalAudio', false);
			setButtonDisabled('startLocalAudio', false);
			reportSuccessEvent('stopLocalAudio', 0)
			addSuccessLog(`${userId ? `[${userId}]` : ''} stopLocalAudio.`);
		} catch (error) {
			setButtonLoading('stopLocalAudio', false);
			reportFailedEvent({ name: 'stopLocalAudio', sdkAppId, roomId, error })
			addFailedLog(`${userId ? `[${userId}]` : ''} startLocalAudio failed.`);
		}
	}
}

async function stopLocalVideo() {
	if (!isCamOpened) {
		addFailedLog('The video has not been started');
		return;
	}
	setButtonLoading('stopLocalVideo', true);
	if (trtc) {
		try {
			await trtc.stopLocalVideo();
			isCamOpened = false;
			setButtonLoading('stopLocalVideo', false);
			setButtonDisabled('startLocalVideo', false);
			reportSuccessEvent('stopLocalVideo', 0)
			addSuccessLog(`${userId ? `[${userId}]` : ''} stopLocalVideo.`);
			const local = document.getElementById('local')
			local.removeChild(local.children[0]);
		} catch (error) {
			setButtonLoading('stopLocalVideo', false);
			reportFailedEvent({ name: 'stopLocalVideo', sdkAppId, roomId, error })
			addFailedLog(`${userId ? `[${userId}]` : ''} stopLocalVideo failed.`);
		}
	}
}


async function startShare() {
	setButtonLoading('startShare', true);
	initParams()
	try {
		await trtc.startScreenShare();
		isShared = true;
		setButtonLoading('startShare', false);
		setButtonDisabled('startShare', true);
		reportSuccessEvent('startScreenShare', 0)
		addSuccessLog(`${userId ? `[${userId}]` : ''} startScreenShare.`);
	} catch (error) {
		console.log('startShare error', error);
		setButtonLoading('startShare', false);
		reportFailedEvent({
			name: 'startScreenShare',
			sdkAppId,
			roomId,
			error,
			type: 'share'
		})
		addFailedLog(`${userId ? `[${userId}]` : ''} startScreenShare failed.`);
	}
}

async function stopShare() {
	if (!isShared) {
		addFailedLog('The screen share has not been started');
		return;
	}
	setButtonLoading('stopShare', true);
	try {
		await trtc.stopScreenShare();
		isShared = false;
		setButtonLoading('stopShare', false);
		setButtonDisabled('startShare', false);
		reportSuccessEvent('stopScreenShare', 0)
		addSuccessLog(`${userId ? `[${userId}]` : ''} stopScreenShare.`);
	} catch (error) {
		console.log('stopShare error', error);
		setButtonLoading('stopShare', false);
		reportFailedEvent({
			name: 'startScreenShare',
			sdkAppId,
			roomId,
			error,
			type: 'share'
		})
		addFailedLog(`${userId ? `[${userId}]` : ''} stopScreenShare failed.`);
	}
}

const getDevices = async () => {
	await getCamera();
	await getMicrophone();
}

const getCamera = async () => {
	cameras = await TRTC.getCameraList();
	cameraSelect.innerHTML = '';
	cameras?.forEach(camera => {
		const option = document.createElement('option');
		option.value = camera.deviceId;
		option.text = camera.label;
		cameraSelect.appendChild(option);
	});
}

const getMicrophone = async () => {
	microphones = await TRTC.getMicrophoneList();
	microphoneSelect.innerHTML = '';
	microphones?.forEach(microphone => {
		const option = document.createElement('option');
		option.value = microphone.deviceId;
		option.text = microphone.label;
		microphoneSelect.appendChild(option);
	});
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
				window.alert('If you do not allow the current page to access the microphone and camera permissions, you may fail when publishing a local audio/video.');
			} else {
				window.alert('如果不允许当前页面访问麦克风和摄像头权限，您在发布本地音视频流的时候可能会失败。');
			}
			enterBtn.disabled = true;
		}
		await getDevices();
	} catch (e) {
		console.error('get device failed', e);
	}
}

function handleEvent() {
	trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
		// In order to display the video, you need to place an HTMLElement in the DOM, which can be a div tag with an id of `${userId}_${streamType}`.
		const elementId = `${userId}_${streamType}`;
		addStreamView(elementId);
		trtc.startRemoteVideo({ userId, streamType, view: elementId });
	});
	trtc.on(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, ({ userId, streamType }) => {
		const elementId = `${userId}_${streamType}`;
		removeStreamView(elementId);
		trtc.stopRemoteVideo({ userId, streamType });
	});
	trtc.on(TRTC.EVENT.SCREEN_SHARE_STOPPED, () => {
		console.log('screen sharing was stopped');
		stopShare();
	});
	trtc.on(TRTC.EVENT.DEVICE_CHANGED, async ({ type }) => {
		if (type === 'camera') getCamera();
		if (type === 'microphone') getMicrophone();
	});
}
consoleBtn.addEventListener('click', () => {
	window.vconsole = new VConsole();
});
enterBtn.addEventListener('click', enterRoom, false);
exitBtn.addEventListener('click', exitRoom, false);

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
	const { userSig } = genTestUserSig({ sdkAppId, userId, sdkSecretKey });
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
