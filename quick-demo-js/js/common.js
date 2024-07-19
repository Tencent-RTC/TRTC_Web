/* eslint-disable*/
const localStorageLangId = 'trtc-v5-quick-demo-js';
function getLanguage(localStorageLangId = 'trtc-v5-quick-demo-js') {
	let lang = getQueryString('lang') || localStorage.getItem(localStorageLangId) || window.navigator.language?.toLowerCase();
	lang = lang.indexOf('zh') > -1 ? 'zh-cn' : 'en';
	return lang;
}
window.lang_ = getLanguage(localStorageLangId);
changeLanguageTo(window.lang_);

const VISIBLE = document.visibilityState === 'visible'

let playerContainer = document.getElementById('remote-container');
let logContainer = document.getElementById('log');
let language = document.getElementById('language');

let consoleBtn = document.getElementById('console')
let enterBtn = document.getElementById('enter')
let startLocalAudioBtn = document.getElementById('startLocalAudio')
let startLocalVideoBtn = document.getElementById('startLocalVideo')
let stopLocalAudioBtn = document.getElementById('stopLocalAudio')
let stopLocalVideoBtn = document.getElementById('stopLocalVideo')
let exitBtn = document.getElementById('exit')

let startShareBtn = document.getElementById('startShare')
let stopShareBtn = document.getElementById('stopShare')
let cameraSelect = document.getElementById('camera-select');
let microphoneSelect = document.getElementById('microphone-select');
let invite = document.getElementById('invite')
let inviteUrl = document.getElementById('inviteUrl')
let github = document.getElementById('github')

language.addEventListener('click', handleChangeLanguageClick)

function handleChangeLanguageClick() {
	const currentLanguage = window.lang_;
	const nextLanguage = currentLanguage === 'en' ? 'zh-cn' : 'en';
	console.log(`language: ${currentLanguage} -> ${nextLanguage}`);

	window.lang_ = nextLanguage;
	localStorage.setItem(localStorageLangId, nextLanguage);

	changeLanguageTo(nextLanguage);
}

function changeLanguageTo(lang) {
	const currentElementList = document.querySelectorAll('.zh-cn, .en');
	for (const item of currentElementList) {
		item.style.display = 'none';
	}
	const nextElementList = document.querySelectorAll(`.${lang}`);
	for (const item of nextElementList) {
		item.style.display = 'block';
	}
	document.title = lang === 'en' ? 'Quick demo js | Tencent RTC' : 'Quick demo js | TRTC 实时音视频';
}

function addStreamView(remoteId) {
	let remoteDiv = document.getElementById(remoteId);
	if (!remoteDiv) {
		remoteDiv = document.createElement('div');
		remoteDiv.setAttribute('id', remoteId);
		remoteDiv.setAttribute('class', 'remote');
		playerContainer.appendChild(remoteDiv);
	}
}

function removeStreamView(remoteId) {
	const remoteDiv = document.getElementById(remoteId);
	if (remoteDiv) {
		playerContainer.removeChild(remoteDiv);
	}
}

function setButtonDisabled(id, status) {
	const button = document.getElementById(id);
	button.disabled = status;
}

function setButtonLoading(id, status) {
	const button = document.getElementById(id);
	const loadingElement = button.getElementsByClassName('loading-icon')[0];
	button.disabled = status;
	loadingElement.style.display = status ? 'inline-block' : 'none';
}

function addSuccessLog(log) {
	const logItem = document.createElement('div');

	const success = document.createElement('span');
	success.setAttribute('class', 'success');
	success.innerText = '🟩 ';

	const logDiv = document.createElement('span');
	logDiv.innerText = log;

	logItem.appendChild(success);
	logItem.appendChild(logDiv);

	logContainer.appendChild(logItem);
	logContainer.scrollTop = logContainer.scrollHeight;
}

function addFailedLog(log) {
	const logItem = document.createElement('div');

	const success = document.createElement('span');
	success.innerText = '🟥 '

	const logDiv = document.createElement('span');
	logDiv.innerText = log;

	logItem.appendChild(success);
	logItem.appendChild(logDiv);

	logContainer.appendChild(logItem);
	logContainer.scrollTop = logContainer.scrollHeight;
}

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}
const isProd = location.origin === 'https://web.sdk.qcloud.com';
const isDev = location.origin.includes('localhost') || location.origin.includes('127.0.0.1');
const DEMOKEY = isProd ? 'v5QuickDemoJs' : 'v5QuickDemoJsDev';
const AEGIS_ID = {
	dev: 'iHWefAYqBEHVFrSxnV',
	prod: 'iHWefAYqVGQzlNLveU',
};

github.addEventListener('click', () => {
	aegis?.reportEvent({
		name: 'jumpGithub',
		ext1: 'jumpGithub',
		ext2: DEMOKEY,
		ext3: 0,
	});
})

let aegis;

if (isProd || isDev) {
	aegis = new Aegis({
		id: isProd ? AEGIS_ID.prod : AEGIS_ID.dev,
		uin: '',
		reportApiSpeed: false,
		reportAssetSpeed: false
	})
}

function reportSuccessEvent(name, sdkAppId) {
	aegis?.reportEvent({
		name,
		ext1: `${name}-success`,
		ext2: DEMOKEY,
		ext3: sdkAppId,
	});
}

function reportFailedEvent({name, error, type = 'rtc', sdkAppId, roomId}) {
	 aegis?.reportEvent({
		name,
		ext1: `${name}-failed#${roomId}*${type}*${error.message}`,
		ext2: DEMOKEY,
		ext3: 0, // 仅 success 事件需要传 sdkAppId，原因是只有成功的 sdkAppId 有意义
	});
}
