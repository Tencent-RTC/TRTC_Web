# TRTC Web SDK

English | [简体中文](./README-zh_CN.md)

> **Tencent Real-Time Communication (TRTC) Web SDK** is a professional WebRTC SDK for building real-time video calls, voice calls, live streaming, video conferencing, online education, and interactive social experiences in web applications.

[![npm version](https://img.shields.io/npm/v/trtc-sdk-v5)](https://www.npmjs.com/package/trtc-sdk-v5)
[![GitHub stars](https://img.shields.io/github/stars/Tencent-RTC/TRTC_Web?style=social)](https://github.com/Tencent-RTC/TRTC_Web)
[![Online Demo](https://img.shields.io/badge/demo-online-006eff)](https://web.sdk.qcloud.com/trtc/webrtc/v5/demo/quick-demo-js/index.html)
[![Documentation](https://img.shields.io/badge/docs-TRTC_Web_SDK-0f6fff)](https://trtc.io/document/35607?platform=web&product=rtcengine&menulabel=sdk)

## What is TRTC?

**TRTC (Tencent Real-Time Communication)** is Tencent Cloud's real-time audio and video platform. This repository contains the **Web SDK**, demo projects, and feature samples for browser-based RTC applications.

With TRTC Web SDK, you can build:

- **1-to-1 and group video calls** for social, healthcare, and customer support apps
- **Voice calls and voice rooms** for gaming, communities, and social audio products
- **Interactive live streaming** with host-audience scenarios
- **Video conferencing** with screen sharing and device control
- **Online education** and collaboration products running directly in browsers

## TRTC Product Family

TRTC offers both **core SDKs** and **ready-to-use UI kits**, so teams can start quickly or build fully custom RTC experiences.

| Product | Best for | Platforms |
| --- | --- | --- |
| [AI Real-Time Conversation](https://trtc.io/document/conversational-ai-overview?product=conversationalai) | Low-latency AI voice and conversational interaction | Web, Android, iOS, Flutter, React Native, Electron, Windows, macOS |
| [Chat](https://trtc.io/document/chat-overview?product=chat&menulabel=uikit&platform=react) | Instant messaging, one-to-one chat, group chat, and conversation capabilities | Web, Mini Program, uni-app, Android, iOS, macOS, Windows, Flutter, React Native, HarmonyOS, Unity, Unreal Engine |
| [TUICallKit](https://github.com/Tencent-RTC/TUICallKit) | 1v1 and group audio/video calling UI | Web, Android, iOS, Flutter, uni-app, WeChat Mini Program |
| [TUIRoomKit](https://github.com/Tencent-RTC/TUIRoomKit) | Video conferencing and online meetings UI | Web, Android, iOS, Flutter, uni-app (Mini Program / Client) |
| [TUILiveKit](https://github.com/Tencent-RTC/TUILiveKit) | Interactive live streaming and voice room UI | Web, Android, iOS, Flutter, uni-app, React Native (headless), Windows (Electron) |
| [TRTC SDK](https://trtc.io/document/rtc-engine-overview?product=rtcengine&menulabel=core%20sdk&platform=web) | Cross-platform real-time audio and video SDK for fully customized development | Web, Android, iOS, macOS, Windows, Flutter, Electron, React Native |

## Why developers use TRTC Web SDK

- **Built on Tencent RTC’s globally proven real-time network**: backed by Tencent’s long-standing expertise in audio/video and network technology, with **below 300 ms end-to-end latency** for calling scenarios, **below 1000 ms audience latency** for live streaming, and **over 99.99% service uptime**
- **Low-latency, production-ready communication**: optimized for video calls, voice calls, interactive live streaming, conferencing, and other scenarios that need fast join times, stable connectivity, and smooth interaction
- **Cross-browser support with cross-platform interoperability**: works on major modern desktop and mobile browsers and fits naturally into product ecosystems that also span Android, iOS, Flutter, Electron, and React Native
- **Flexible integration model**: supports vanilla JavaScript, Vue, and any web framework, so teams can prototype quickly or integrate into existing frontend architectures
- **Ready for meetings, live streaming, and richer RTC workflows**: beyond calling, it supports screen sharing, host/audience live streaming, cross-room co-hosting, and other common real-time interaction patterns
- **Strong diagnostics for devices, environments, and challenging networks**: includes browser capability checks, permission and device detection, network quality evaluation, device hot-plug handling, and debug workflows
- **Advanced media and live orchestration**: custom capture/rendering, multi-user video with small stream, cloud mixing and CDN streaming, watermarking, and video mixer workflows for more complex media pipelines
- **Plugin-based enhancement and AI capabilities**: audio mixer, beauty/basic beauty, virtual background, AI noise reduction, voice changer, face detection, small-stream auto switching, and real-time transcription/translation
- **Clear path from core SDK to faster delivery**: build deeply customized RTC experiences with the SDK, or move faster with Call, Conference, Live, Chat, and other UIKit-based solutions in the Tencent RTC ecosystem

## Quick Start

### Install

```bash
npm install trtc-sdk-v5 --save
```

or

```bash
yarn add trtc-sdk-v5
```

You can also download [`trtc.js`](https://www.unpkg.com/trtc-sdk-v5@latest/trtc.js) manually and include it in your project.

### Basic Usage

```javascript
import TRTC from 'trtc-sdk-v5';

const trtc = TRTC.create();

await trtc.enterRoom({
  sdkAppId,
  userId,
  userSig,
  strRoomId: 'room_123',
});

await trtc.startLocalVideo({
  view: document.getElementById('local-video'),
});

await trtc.startLocalAudio();
```

> **Security note**:
> Generate `userSig` on your application server for production. Do **not** expose `SDKSecretKey` in frontend code.

### Useful links

- [Demo Quick Run](https://trtc.io/document/35607)
- [Integration Quick Start](https://trtc.io/document/35096)
- [TRTC Web SDK API Reference](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/index.html)
- [Supported Browsers](https://trtc.io/document/59733)


## Common Questions This Repository Helps Answer

### How do I add video calling to my web app?

Install `trtc-sdk-v5`, create a TRTC instance, call `enterRoom()`, then start local audio and video. See the quick demos in this repository for working end-to-end examples.

### Does TRTC Web SDK work with React, Vue, or other frameworks?

Yes. TRTC Web SDK works with any JavaScript framework. This repository includes **vanilla JavaScript**, **Vue 2**, and **Vue 3 + TypeScript** demos to help you get started quickly.

### How do I implement screen sharing, live streaming, or other RTC features in browsers?

Start with the **SDK capability overview** above to understand the feature surface. If you want runnable code in this repository, focus on the `samples` directory plus the `quick-demo-js`, `quick-demo-vue2-js`, and `quick-demo-vue3-ts` quick demos.

## Repository Guide

| Directory | What it contains | Notes |
| --- | --- | --- |
| [`quick-demo-js`](./quick-demo-js) | Quick start demo built with vanilla JavaScript | Fastest way to understand the core SDK flow |
| [`quick-demo-vue2-js`](./quick-demo-vue2-js) | Vue 2 demo | Good for legacy Vue projects |
| [`quick-demo-vue3-ts`](./quick-demo-vue3-ts) | Vue 3 + TypeScript demo | Good for modern web applications |
| [`samples`](./samples) | Feature demos such as screen sharing and live streaming | Best for exploring specific capabilities |
| [`SDK`](./SDK) | TRTC Web SDK v5.x files | Recommended SDK version |
| [`v4`](./v4) | TRTC Web SDK v4.x files | Legacy version, not recommended for new projects |

## Browser Support

TRTC Web SDK supports major modern browsers.

| Browser | Version |
| --- | --- |
| Chrome | 56+ |
| Edge | 80+ |
| Firefox | 56+ |
| Safari | 11+ |
| iOS Safari | 11+ |
| Opera | 46+ |

## Other TRTC Repositories

| Platform / Product | Repository |
| --- | --- |
| Android SDK | [TRTC_Android](https://github.com/Tencent-RTC/TRTC_Android) |
| iOS SDK | [TRTC_iOS](https://github.com/Tencent-RTC/TRTC_iOS) |
| Flutter UIKit | [TUIKit_Flutter](https://github.com/Tencent-RTC/TUIKit_Flutter) |
| React Native UIKit | [TUIKit_ReactNative](https://github.com/Tencent-RTC/TUIKit_ReactNative) |
| Calling UI Kit | [TUICallKit](https://github.com/Tencent-RTC/TUICallKit) |
| Meeting UI Kit | [TUIRoomKit](https://github.com/Tencent-RTC/TUIRoomKit) |
| Live UI Kit | [TUILiveKit](https://github.com/Tencent-RTC/TUILiveKit) |

## Resources

- [Official Website](https://trtc.io)
- [Documentation Center](https://trtc.io/document)
- [Online Demo (quick-demo-js)](https://web.sdk.qcloud.com/trtc/webrtc/v5/demo/quick-demo-js/index.html)
- [Changelog](https://trtc.io/document/53626)
- [FAQ](https://trtc.io/document/37340)
- [Contact Technical Support](https://trtc.io/contact)

## Contact Us

- If you find a bug, please create an issue in this repository.
- If you need technical support for your TRTC project, see [Contact Technical Support](https://trtc.io/contact).
