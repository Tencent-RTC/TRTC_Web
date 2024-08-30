# TRTC Web SDK

English | [简体中文](./README-zh_CN.md)

## Introduction

TRTC Web SDK is an object-oriented WebRTC SDK of Tencent Cloud's real-time communication solution. Web developers can use TRTC Web SDK to establish an audio/video calls or live streaming services on your website.

- [Online Demo](https://trtc.io/demo).
- [Changelog](https://trtc.io/document/53626).
- We offer SDKs for Web, Android, iOS, Windows, Flutter, explore more in [trtc.io](https://trtc.io/).

## Supported Browsers

TRTC Web SDK supports major modern browsers. For details, please refer to [Browsers Supported](https://trtc.io/document/59733).

| [<img src="https://web.sdk.qcloud.com/trtc/webrtc/assets/logo/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://web.sdk.qcloud.com/trtc/webrtc/assets/logo/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/> Edge | [<img src="https://web.sdk.qcloud.com/trtc/webrtc/assets/logo/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://web.sdk.qcloud.com/trtc/webrtc/assets/logo/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://web.sdk.qcloud.com/trtc/webrtc/assets/logo/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://web.sdk.qcloud.com/trtc/webrtc/assets/logo/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- |
| 56+ | 80+ | 56+ | 11+ | 11+ | 46+ |

## Install

npm:
```
$ npm install trtc-sdk-v5 --save
```

yarn:
```
$ yarn add trtc-sdk-v5
```

Download manually：

1. download [trtc.js](https://www.unpkg.com/trtc-sdk-v5@latest/trtc.js).
2. copy `trtc.js` to your project.

## Usage

Refer to the following two tutorials for a quick run-through of the demo and how to use the SDK to implement basic audio and video calling functionality.

- [Demo Quick Run](https://trtc.io/document/35607).
- [Integration Quick Start](https://trtc.io/document/35096).

Explore SDK API documents：[TRTC Web SDK](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/index.html).

## API Overview

- [TRTC](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html) is the main entry for TRTC SDK, providing APIs such as create trtc instance([TRTC.create](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html#.create)), [TRTC.getCameraList](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html#.getCameraList), [TRTC.getMicrophoneList](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html#.getMicrophoneList),  [TRTC.isSupported](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html#.isSupported).
- [trtc](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html) instance, provides the core capability for real-time audio and video calls.
  - Enter room [trtc.enterRoom](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html#enterRoom)
  - Exit room [trtc.exitRoom](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html#exitRoom)
  - Turn on camera [trtc.startLocalVideo](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html#startLocalVideo)
  - Turn on microphone [trtc.startLocalAudio](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html#startLocalAudio)
  - Turn off camera [trtc.stopLocalVideo](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html#stopLocalVideo)
  - Turn off microphone [trtc.stopLocalAudio](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html#stopLocalAudio)
  - Play remote video [trtc.startRemoteVideo](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html#startRemoteVideo)
  - Stop playing remote video [trtc.stopRemoteVideo](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html#stopRemoteVideo)
  - Mute/unmute remote audio [trtc.muteRemoteAudio](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/TRTC.html#muteRemoteAudio)

## Directory
```
.
├── README.md
├── quick-demo-js           -- TRTC Web quick demo (JavaScript edition).
├── quick-demo-vue2-js      -- TRTC Web quick demo (Vue.js 2 edition).
├── quick-demo-vue3-ts      -- TRTC Web quick demo (Vue.js 3 edition).
├── samples                 -- TRTC Web feature samples (v5 SDK).
├── SDK                     -- TRTC Web SDK v5.x (Recommended).
└── v4                      -- TRTC Web SDK v4.x (Not recommended).

```

**SDK**

- You can find the latest version of the [TRTC web SDK 5.x](https://www.npmjs.com/package/trtc-sdk-v5) in the `SDK` directory.

**quick-demo-js**

- Description: `quick-demo-js` is a TRTC Web quick running demo (native JS version), integrating the basic audio and video communication and device selection functions of TRTC Web SDK. It is developed in native JS and can be directly run in the browser.
- Running: Refer to the README in the folder.
- Online experience: [Quick-demo-js online experience address](https://web.sdk.qcloud.com/trtc/webrtc/v5/demo/quick-demo-js/index.html).

**quick-demo-vue2-js**

- Description: `quick-demo-vue2-js` is a TRTC Web quick running demo (Vue2 version), integrating the basic audio and video communication and device selection functions of TRTC Web SDK. It is developed in Vue2 + JavaScript and requires you to install the Node environment to run the experience according to the instructions below.
- Running: Refer to the README in the folder.
- Online experience: [Quick-demo-vue2-js online experience address](https://web.sdk.qcloud.com/trtc/webrtc/v5/demo/quick-demo-vue2-js/index.html).

**quick-demo-vue3-ts**

- Description: `quick-demo-vue3-ts` is a TRTC Web quick running demo (Vue3 version), integrating the basic audio and video communication and device selection functions of TRTC Web SDK. It is developed in Vue3 + TypeScript and requires you to install the Node environment.
- Running: Refer to the README in the folder.
- Online experience: [Quick-demo-vue3-ts online experience address](https://web.sdk.qcloud.com/trtc/webrtc/v5/demo/quick-demo-vue3-ts/index.html).

**samples**

- Description: `samples` contain a variety of specific feature demos of TRTC Web SDK including screen sharing, live streaming, set encoding profile, etc. They are developed in native HTML, CSS and JavaScript. 
- Running: Refer to the README in the folder.
- Online experience: [samples online experience address](https://web.sdk.qcloud.com/trtc/webrtc/v5/demo/samples/basic-features/screen-sharing/index.html).

## Contact Us

- If you have questions, see [FAQs](https://trtc.io/document/37340).
- [Contact us](https://trtc.io/contact) for technical support.
- To report bugs, please create an issue.
