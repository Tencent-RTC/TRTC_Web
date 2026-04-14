# 腾讯云实时音视频 TRTC Web SDK

简体中文 | [English](./README.md)

> **腾讯实时音视频（Tencent Real-Time Communication，TRTC）Web SDK** 是一套面向浏览器场景的专业 WebRTC SDK，可用于快速构建视频通话、语音通话、互动直播、视频会议、在线教育和社交互动等实时音视频应用。

[![npm version](https://img.shields.io/npm/v/trtc-sdk-v5)](https://www.npmjs.com/package/trtc-sdk-v5)
[![GitHub stars](https://img.shields.io/github/stars/Tencent-RTC/TRTC_Web?style=social)](https://github.com/Tencent-RTC/TRTC_Web)
[![在线 Demo](https://img.shields.io/badge/demo-online-006eff)](https://web.sdk.qcloud.com/trtc/webrtc/v5/demo/quick-demo-js/index.html)
[![文档中心](https://img.shields.io/badge/docs-TRTC_Web_SDK-0f6fff)](https://cloud.tencent.com/document/product/647/116544)

## TRTC 是什么？

**TRTC（Tencent Real-Time Communication）** 是腾讯云的实时音视频产品。本仓库提供的是 **TRTC Web SDK**、快速跑通 Demo 以及面向具体能力的功能示例，帮助开发者在浏览器中搭建实时音视频应用。

基于 TRTC Web SDK，你可以构建：

- **1v1 与多人视频通话**：适用于社交、医疗、客服、远程协作等场景
- **语音通话与语音房**：适用于游戏开黑、社区语聊、泛娱乐社交等产品
- **互动直播**：支持主播与观众等典型直播场景
- **视频会议**：支持屏幕分享、设备控制等会议能力
- **在线教育与协作**：适合浏览器内直接运行的课堂与协同产品

## TRTC 产品矩阵

TRTC 同时提供 **底层 SDK** 与 **开箱即用 UIKit**，既适合快速集成，也适合深度自定义开发。

| 产品 | 适用场景 | 支持平台 |
| --- | --- | --- |
| [AI 实时对话](https://cloud.tencent.com/document/product/647/110584) | 低延时 AI 语音/对话交互场景接入 | Web、Android、iOS、Flutter、React Native、Electron、Windows、macOS |
| [IM SDK](https://cloud.tencent.com/document/product/269/105570) | 即时消息、单聊群聊与会话能力接入 | Web、小程序、uni-app、Android、iOS、macOS、Windows、Flutter、React Native、HarmonyOS、Unity、Unreal Engine |
| [TUICallKit](https://github.com/Tencent-RTC/TUICallKit) | 1v1 与多人音视频通话 UI 组件 | Web、Android、iOS、Flutter、uni-app、微信小程序 |
| [TUIRoomKit](https://github.com/Tencent-RTC/TUIRoomKit) | 视频会议与在线会议 UI 组件 | Web、Android、iOS、Flutter、uni-app（小程序 / 客户端） |
| [TUILiveKit](https://github.com/Tencent-RTC/TUILiveKit) | 互动直播与语音房 UI 组件 | Web、Android、iOS、Flutter、uni-app、React Native（无 UI）、Windows（Electron） |
| [TRTC SDK](https://trtc.io/document/rtc-engine-overview?product=rtcengine&menulabel=core%20sdk&platform=web) | 全平台实时音视频 SDK，适合深度自定义开发 | Web、Android、iOS、macOS、Windows、Flutter、Electron、React Native |

## 为什么选择 TRTC Web SDK

- **依托 Tencent RTC 的全球实时网络与性能表现**：基于腾讯长期积累的网络与音视频技术能力，通话场景**端到端延迟低于 300 ms**、直播场景**观众延迟低于 1000 ms**、**服务可用性超过 99.99%**，适合对稳定性和全球互通有要求的业务
- **低延时与高可用表现**：面向视频通话、语音通话、互动直播、在线会议等高实时性场景优化，适合构建需要稳定连通、快速入会和流畅互动体验的 Web 应用
- **主流浏览器兼容与跨端协同**：覆盖桌面端与移动端主流现代浏览器，并可与 Android、iOS、Flutter、Electron、React Native 等端侧产品协同互通
- **集成方式灵活**：支持原生 JavaScript、Vue 以及任意 Web 框架，既可以快速搭建 Demo，也适合接入现有前端工程体系
- **适合会议、直播与复杂互动场景**：不仅支持音视频通话，还支持屏幕分享、互动直播、主播 / 观众模式、跨房连麦等典型实时音视频业务形态
- **设备、环境与弱网诊断能力完善**：覆盖浏览器兼容性、设备权限、设备检测、网络质量评估、设备插拔处理与调试模式，方便在复杂终端环境中做接入与排障
- **高级媒体与直播编排能力丰富**：支持自定义采集与渲染、多人视频 / 小流、云端混流与 CDN 转推、视频水印与视频合流，便于构建更复杂的媒体链路
- **插件与 AI 能力完整**：支持音频混音、美颜 / 基础美颜、虚拟背景、AI 降噪、美声变声、人脸检测、大小流自动切换、实时语音转录与翻译
- **从底层 SDK 到场景化 UIKit 的演进路径清晰**：既可基于 SDK 深度定制，也可结合 Call、Conference、Live、Chat 等产品能力与 UIKit 方案加速交付

## 快速开始

### 安装

```bash
npm install trtc-sdk-v5 --save
```

或

```bash
yarn add trtc-sdk-v5
```

你也可以手动下载 [`trtc.js`](https://www.unpkg.com/trtc-sdk-v5@latest/trtc.js) 并引入到项目中。

### 基础用法

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

> **安全提示**：
> 正式环境请在业务服务端生成 `userSig`，不要在前端暴露 `SDKSecretKey`。

### 常用链接

- [Demo 快速跑通](https://cloud.tencent.com/document/product/647/32398)
- [快速接入指引](https://cloud.tencent.com/document/product/647/116544)
- [TRTC Web SDK 文档概览](https://cloud.tencent.com/document/product/647/17249)
- [支持平台与环境要求](https://cloud.tencent.com/document/product/647/32398)

## 这个仓库可以帮你解决哪些常见问题？

### 如何在 Web 应用里快速接入视频通话？

安装 `trtc-sdk-v5`，创建 TRTC 实例，调用 `enterRoom()` 进入房间，然后启动本地音频与视频即可。如果你想直接从一个更完整的现代前端示例开始，建议优先查看 [`quick-demo-react`](./quick-demo-react)，其余 quick demo 可作为不同框架风格的补充参考。

### TRTC Web SDK 是否支持 React、Vue 等前端框架？

支持。TRTC Web SDK 可以运行在任意 JavaScript 框架中。本仓库现在提供 **React + TypeScript** 作为主推荐示例，同时保留 **原生 JavaScript**、**Vue 2**、**Vue 3 + TypeScript** 三类 Demo，便于你按项目技术栈选择。

### 如何实现屏幕分享、直播、水印等浏览器端实时音视频能力？

如果你想直接参考仓库内可运行示例，建议先从 [`quick-demo-react`](./quick-demo-react) 开始，作为现代 React 工程接入参考；再结合 `samples` 查看具体能力示例；如果你需要更轻量或指定框架的示例，再看 `quick-demo-js`、`quick-demo-vue2-js`、`quick-demo-vue3-ts`。

## 仓库内容说明

| 目录 | 内容 | 说明 |
| --- | --- | --- |
| [`quick-demo-react`](./quick-demo-react) | React 18 + TypeScript + Vite 快速 Demo | **推荐优先查看**，适合现代 Web 项目快速接入 |
| [`quick-demo-js`](./quick-demo-js) | 原生 JavaScript 快速 Demo | 适合快速理解 SDK 最基础调用流程 |
| [`quick-demo-vue2-js`](./quick-demo-vue2-js) | Vue 2 Demo | 适合已有 Vue 2 项目参考 |
| [`quick-demo-vue3-ts`](./quick-demo-vue3-ts) | Vue 3 + TypeScript Demo | 适合 Vue 3 + TypeScript 项目接入 |
| [`samples`](./samples) | 面向具体能力的功能示例 | 最适合按功能查看接入方式 |
| [`SDK`](./SDK) | TRTC Web SDK 5.x 文件 | 推荐使用版本 |
| [`v4`](./v4) | TRTC Web SDK 4.x 文件 | 历史版本，新项目不推荐使用 |

## 支持的浏览器

TRTC Web SDK 支持主流现代浏览器。

| 浏览器 | 版本 |
| --- | --- |
| Chrome | 56+ |
| Edge | 80+ |
| Firefox | 56+ |
| Safari | 11+ |
| iOS Safari | 11+ |
| Opera | 46+ |

## 相关仓库

| 平台 / 产品 | 仓库 |
| --- | --- |
| 音视频通话 UI Kit | [TUICallKit](https://github.com/Tencent-RTC/TUICallKit) |
| 视频会议 UI Kit | [TUIRoomKit](https://github.com/Tencent-RTC/TUIRoomKit) |
| 互动直播 UI Kit | [TUILiveKit](https://github.com/Tencent-RTC/TUILiveKit) |
| Android SDK | [TRTC_Android](https://github.com/Tencent-RTC/TRTC_Android) |
| iOS SDK | [TRTC_iOS](https://github.com/Tencent-RTC/TRTC_iOS) |
| Flutter UIKit | [TUIKit_Flutter](https://github.com/Tencent-RTC/TUIKit_Flutter) |
| 互动直播 RN UIKit | [TUIKit_ReactNative](https://github.com/Tencent-RTC/TUIKit_ReactNative) |

## 资源与支持

- [TRTC 产品页](https://cloud.tencent.com/product/trtc)
- [文档中心](https://cloud.tencent.com/document/product/647)
- [在线 Demo（quick-demo-js）](https://web.sdk.qcloud.com/trtc/webrtc/v5/demo/quick-demo-js/index.html)
- [SDK 发布日志（Web&H5）](https://cloud.tencent.com/document/product/647/38958)
- [技术支持](https://cloud.tencent.com/document/product/647/19906)

## 联系我们

- 如果你发现问题，欢迎在本仓库提交 issue。
- 如果你需要项目级技术支持，可以访问 [技术支持](https://cloud.tencent.com/document/product/647/19906)。
