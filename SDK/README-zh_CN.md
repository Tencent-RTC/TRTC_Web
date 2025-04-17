<p align="center">
  <a href="https://cloud.tencent.com/document/product/647">
    <img width="200" src="https://web.sdk.qcloud.com/trtc/webrtc/assets/trtc.io-logo.png">
  </a>
</p>

<h1 align="center" style="margin-top: -40px">TRTC Web SDK</h1>

<div align="center">

一款面向对象的 WebRTC SDK。

[![NPM version](https://img.shields.io/npm/v/trtc-sdk-v5)](https://www.npmjs.com/package/trtc-sdk-v5) [![NPM downloads](https://img.shields.io/npm/dw/trtc-sdk-v5)](https://www.npmjs.com/package/trtc-sdk-v5) [![trtc.js](https://img.shields.io/bundlephobia/min/trtc-sdk-v5)](https://www.npmjs.com/package/trtc-sdk-v5) [![Typescript Supported](https://img.shields.io/badge/Typescript-Supported-blue)](https://www.npmjs.com/package/trtc-sdk-v5) [![Documents](https://img.shields.io/badge/-Documents-blue)](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/index.html) [![Stars](https://img.shields.io/github/stars/tencentyun/TRTCSDK?style=social)](https://github.com/LiteAVSDK/TRTC_Web) 

</div>

<div align="center"> 简体中文 | <a href="https://github.com/LiteAVSDK/TRTC_Web/blob/main/v5/SDK/README.md" target="_blank"> English </a> </div>

## 简介

[TRTC Web SDK](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/index.html) 是腾讯云实时音视频通讯解决方案的 Web 端 SDK，它是通过 HTML 网页加载的 JavaScript 库。Web 开发者可以使用 TRTC Web SDK 提供的 API，在您的业务网站上实现实时音视频通话、直播等功能。

- [在线 Demo](https://trtc.tencentcloud.com/demo/homepage/#/home)

## 环境支持

TRTC Web SDK 支持市面上主流浏览器，详情参考：[浏览器支持情况](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/tutorial-05-info-browser.html)。

| [<img src="https://web.sdk.qcloud.com/trtc/webrtc/assets/logo/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://web.sdk.qcloud.com/trtc/webrtc/assets/logo/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/> Edge | [<img src="https://web.sdk.qcloud.com/trtc/webrtc/assets/logo/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://web.sdk.qcloud.com/trtc/webrtc/assets/logo/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://web.sdk.qcloud.com/trtc/webrtc/assets/logo/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://web.sdk.qcloud.com/trtc/webrtc/assets/logo/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- |
| 56+ | 80+ | 56+ | 11+ | 11+ | 46+ |

## 安装

使用 npm:
```
$ npm install trtc-sdk-v5 --save
```

使用 yarn:
```
$ yarn add trtc-sdk-v5
```

手动下载 sdk 包：

1. 下载 [trtc.js](https://www.unpkg.com/trtc-sdk-v5@latest/trtc.js)
2. 将 `trtc.js` 复制到您的项目中。

## 使用

通过 import 引入或者 script 引入

```js
import TRTC from 'trtc-sdk-v5';
// or
<script src="trtc.js"></script>
```

参考下述两个教程，可快速跑通 Demo 及了解如何使用 SDK 实现基础音视频通话功能。

- [快速跑通 Demo](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/tutorial-10-basic-get-started-with-demo.html)
- [基础音视频通话](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/tutorial-11-basic-video-call.html)

## API 概要

- [TRTC](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/TRTC.html) 是整个 SDK 的主入口，提供创建 TRTC 对象 [TRTC](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/TRTC.html)、获取摄像头列表、麦克风列表、检查浏览器兼容性、控制日志等级及日志上传等功能。
- [TRTC](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/TRTC.html) TRTC对象，提供实时音视频通话的核心能力:
  - 进房 [enterRoom](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/TRTC.html#enterRoom)
  - 退房 [exitRoom](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/TRTC.html#exitRoom)
  - 发布/预览本地视频 [startLocalVideo](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/TRTC.html#startLocalVideo)
  - 发布/预览本地音频 [startLocalAudio](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/TRTC.html#startLocalAudio)
  - 取消发布/预览本地视频 [stopLocalVideo](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/TRTC.html#stopLocalVideo)
  - 取消发布/预览本地音频 [stopLocalAudio](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/TRTC.html#stopLocalAudio)
  - 观看远端视频 [startRemoteVideo](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/TRTC.html#startRemoteVideo)
  - 取消观看视频 [stopRemoteVideo](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/TRTC.html#stopRemoteVideo)
  - 静音/取消静音远端音频 [muteRemoteAudio](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/TRTC.html#muteRemoteAudio)

## 目录结构

```
├── README.md
├── package.json
├── trtc.js // npm 包入口文件（umd 格式）
├── trtc.esm.js // 基于 es 模块的 sdk 包（esm 格式）
├── index.d.ts // 类型声明文件
├── plugins // 插件目录
└── assets // 静态资源目录（如使用虚拟背景、AI 降噪等功能需要部署到服务器供 SDK 动态加载资源）
```

## Changelog

- [变更日志](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/tutorial-01-info-changelog.html)
