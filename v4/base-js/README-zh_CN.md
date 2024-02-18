本文主要介绍如何快速运行腾讯云 TRTC Web SDK Demo。

简体中文 | [English](./README.md)

### 支持的平台
TRTC Web SDK 基于 WebRTC 实现，目前支持桌面端和移动端的主流浏览器，详细支持度表格请参见 [支持的平台](https://cloud.tencent.com/document/product/647/17249#.E6.94.AF.E6.8C.81.E7.9A.84.E5.B9.B3.E5.8F.B0)。
如果您的应用场景不在支持的表格里，可以打开 [TRTC Web SDK 能力检测页面](https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html) 检测当前环境是否支持 WebRTC 所有能力，例如 WebView 等环境。

### URL 域名协议限制
由于浏览器安全策略的限制，使用 WebRTC 能力对页面的访问协议有严格的要求，请参照以下表格进行开发和部署应用。

| 应用场景     | 协议             | 接收（播放） | 发送（上麦） | 屏幕分享 | 备注     |
|----------|:-----------------|:---------|----------|--------|----------|
| 生产环境     | HTTPS 协议       | 支持       | 支持       | 支持     | **推荐** |
| 生产环境     | HTTP 协议        | 支持       | 不支持     | 不支持   |          |
| 本地开发环境 | http://localhost | 支持       | 支持       | 支持     | **推荐** |
| 本地开发环境 | http://127.0.0.1 | 支持       | 支持       | 支持     |          |
| 本地开发环境 | http://[本机IP]  | 支持       | 不支持     | 不支持   |          |
| 本地开发环境 | file:///         | 支持       | 支持       | 支持     |          |

### 防火墙限制
TRTC Web SDK 依赖以下端口及域名进行数据传输，请将其加入防火墙白名单。配置完成后，您可以通过访问并体验 [官网 Demo](https://web.sdk.qcloud.com/trtc/webrtc/demo/api-sample/basic-rtc.html) 检查配置是否生效。具体请参见 [应对防火墙限制相关](https://cloud.tencent.com/document/product/647/34399)。
- TCP 端口：8687
- UDP 端口：8000，8080，8800，843，443，16285
- 域名：`*.rtc.qq.com`，`yun.tim.qq.com` 
 
## 前提条件
您已 [注册腾讯云](https://cloud.tencent.com/document/product/378/17985) 账号，并完成 [实名认证](https://cloud.tencent.com/document/product/378/3629)。

## 操作步骤

### 步骤1：创建新的应用
1. 登录实时音视频控制台，选择【开发辅助】>【[快速跑通Demo](https://console.cloud.tencent.com/trtc/quickstart)】。
2. 单击【立即开始】，输入应用名称，例如`TestTRTC`，单击【创建应用】。

### 步骤2：下载 SDK 和 Demo 源码
1. 单击【[Github](https://github.com/LiteAVSDK/TRTC_Web)】跳转至 Github（或单击【[ZIP](https://web.sdk.qcloud.com/trtc/webrtc/download/webrtc_latest.zip)】），下载相关 SDK 及配套的 Demo 源码。

2. 下载完成后，返回实时音视频控制台，单击【我已下载，下一步】，可以查看 SDKAppID 和密钥信息。

### 步骤3：配置 Demo 工程文件
1. 解压 [步骤2](#step2) 中下载的源码包。
2. 找到并打开`TRTC_Web/base-js/js/debug/GenerateTestUserSig.js`文件。
3. 设置`GenerateTestUserSig.js`文件中的相关参数：
  <ul><li>SDKAPPID：默认为0，请设置为实际的 SDKAppID。</li>
  <li>SECRETKEY：默认为空字符串，请设置为实际的密钥信息。</li></ul> 
	<img src="https://main.qcloudimg.com/raw/1732ea2401af6111b41259a78b5330a4.png">
4. 返回实时音视频控制台，单击【粘贴完成，下一步】。
5. 单击【关闭指引，进入控制台管理应用】。

>!本文提到的生成 UserSig 的方案是在客户端代码中配置 SECRETKEY，该方法中 SECRETKEY 很容易被反编译逆向破解，一旦您的密钥泄露，攻击者就可以盗用您的腾讯云流量，因此**该方法仅适合本地跑通 Demo 和功能调试**。
>正确的 UserSig 签发方式是将 UserSig 的计算代码集成到您的服务端，并提供面向 App 的接口，在需要 UserSig 时由您的 App 向业务服务器发起请求获取动态 UserSig。更多详情请参见 [服务端生成 UserSig](https://cloud.tencent.com/document/product/647/17275#Server)。

### 步骤4：运行 Demo
使用 Chrome 浏览器打开 Demo 根目录下的`index.html`文件即可运行 Demo。

>!
> - 一般情况下体验 Demo 需要部署至服务器，通过`https://域名/xxx`访问，或者直接在本地搭建服务器，通过`localhost:端口`访问。
> - 目前桌面端 Chrome 浏览器支持 TRTC Web SDK 的相关特性比较完整，因此建议使用 Chrome 浏览器进行体验。

Demo 运行界面如图所示：  
![](https://main.qcloudimg.com/raw/e989c968446e6e3bdcc19c58e40e2b86.png)
- 单击【加入房间】加入音视频通话房间并且发布本地音视频流。
 您可以打开多个页面，每个页面都单击 【加入房间】，正常情况下可以看到多个画面并模拟实时音视频通话。
- 单击摄像头图标可以选择摄像头设备。
- 单击麦克风图表可以选择麦克风设备。

>?WebRTC 需要使用摄像头和麦克风采集音视频，在体验过程中您可能会收到来自 Chrome 浏览器的相关提示，单击【允许】。
> ![](https://main.qcloudimg.com/raw/1a2c1e7036720b11f921f8ee1829762a.png)

## 常见问题

### 一、基础环境问题
#### Web 端 SDK 支持哪些浏览器？
TRTC Web SDK 对浏览器的详细支持度，您可以查看 [TRTC Web SDK 对浏览器支持情况](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-05-info-browser.html)。
对于上述没有列出的环境，您可以在当前浏览器打开 [TRTC 能力测试](https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html) 测试是否完整的支持 WebRTC 的功能。

#### 通话前音视频设备测试？
您可以查看 [通话前环境与设备检测](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-23-advanced-support-detection.html) 。

#### 如何实时检测当前网络的情况？
[通话前的网络质量检测](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-24-advanced-network-quality.html)

#### 是否支持混流，旁路推流，大小流，美颜？
您可以查看这些文档来实现高级功能：[混流](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/Client.html#startMixTranscode), [旁路推流](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-26-advanced-publish-cdn-stream.html), [大小流](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-27-advanced-small-stream.html), [美颜](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-28-advanced-beauty.html)

### 二、推拉流问题
#### Web 端 SDK 日志中报错 NotFoundError、NotAllowedError、NotReadableError、OverConstrainedError 以及 AbortError 分别是什么意思？
| 错误名           | 描述                                                     | 处理建议                                                 |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| NotFoundError        | 找不到满足请求参数的媒体类型（包括音频、视频、屏幕分享）。 例如：PC 没有摄像头，但是请求浏览器获取视频流，则会报此错误。 | 建议在通话开始前引导用户检查通话所需的摄像头或麦克风等设备，若没有摄像头且需要进行语音通话，可在 [TRTC.createStream({ audio: true, video: false })](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/TRTC.html#.createStream) 指明仅采集麦克风。 |
| NotAllowedError      | 用户拒绝了当前的浏览器实例的访问音频、视频、屏幕分享请求。   | 提示用户不授权摄像头/麦克风访问将无法进行音视频通话。        |
| NotReadableError     | 用户已授权使用相应的设备，但由于操作系统上某个硬件、浏览器或者网页层面发生的错误导致设备无法被访问。 | 根据浏览器的报错信息处理，并提示用户“暂时无法访问摄像头/麦克风，请确保当前没有其他应用请求访问摄像头/麦克风，并重试”。 |
| OverConstrainedError | cameraId/microphoneId 参数的值无效。                         | 请确保 cameraId/microphoneId 传值正确且有效。                |
| AbortError           | 由于某些未知原因导致设备无法被使用。                         | -                                                            |
更多详情请参见 [initialize](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/LocalStream.html?#initialize) 。

#### 部分手机上的浏览器无法正常运行 TRTC 进行推拉流？
TRTC Web SDK 对浏览器的详细支持度，您可以查看 [TRTC Web SDK 对浏览器支持情况](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-05-info-browser.html)。
对于上述没有列出的环境，您可以在当前浏览器打开 [TRTC 能力测试](https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html) 测试是否完整的支持 WebRTC 的功能。

#### Web 端用宽高设置推流的分辨率是所有浏览器都适用吗？
由于设备和浏览器的限制，视频分辨率不一定能够完全匹配，在这种情况下，浏览器会自动调整分辨率使其接近 Profile 对应的分辨率。详情请参见 [setVideoProfile](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/LocalStream.html?#setVideoProfile) 。

#### Web端屏幕分享的样式支持修改吗？
屏幕分享的样式由浏览器控制，目前不能修改。

#### Web端支持混流吗？
Web端支持发起混流，[点击查看如何调用混流转码接口](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/Client.html#startMixTranscode) 。

#### Web 端 SDK 在使用的过程中拔掉摄像头，怎么清除摄像头列表里面的数据？
可以尝试调用 [TRTC.getCameras](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/TRTC.html#.getCameras) 方法是否能获取新的设备列表，如果仍然有拔掉的摄像头信息，说明浏览器底层也没有刷新这个列表，Web 端 SDK 也获取不到新的设备列表信息。


### iOS 的微信内嵌浏览器不能正常推流？
[点击查看](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-05-info-browser.html) iOS上的微信内嵌浏览器对推拉流的支持情况。

### 三、播放问题
#### 音视频互通过程中出现有画面没有声音问题？
因浏览器自动播放策略限制，音频播放会出现 PLAY_NOT_ALLOWED 异常，此时业务层需要引 导用户手动操作 Stream.resume() 来恢复音频播放，[自动播放受限处理建议](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-21-advanced-auto-play-policy.html) 。
未知异常导致，请通过监控仪表盘查询收发两端的 audioLevel & audioEnergy。


#### Web通话画面显示不了?
检查一下 Web 页面上是否有获取到数据，在确认数据收发正常时，可以检查 `<video>` 元素的 srcObject 属性是否赋值了正确的 mediaStream 对象，如果赋值错误，肯定显示不了。


#### Web 通话过程中出现回声、杂音、噪声、声音小？
通话双方的设备相距太近的时候，属于正常现象，测试时请相互距离远一点。当其他端听到 Web 端的声音存在回声、噪声、杂音等情况时，说明 Web 端的 3A 处理没有生效。
若您使用了浏览器原生 [getUserMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia) API 进行自定义采集，则需要手动设置 3A 参数：
- echoCancellation：回声消除开关
- noiseSuppression：噪声抑制开关
- autoGainControl：自动增益开关? 详细设置参考 [媒体追踪约束](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaTrackConstraints) 。

若您使用 [TRTC.createStream](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/TRTC.html#createStream) 接口进行采集，则无需手动设置 3A 参数，SDK 默认开启 3A。

### 四、其他
####  运行 Web 端 SDK 时，出现错误：“RtcError: no valid ice candidate found”该如何处理？
出现该错误说明 TRTC Web SDK 在建立媒体传输通道时失败，请检查防火墙配置。TRTC Web SDK 依赖以下端口进行数据传输，请将其加入防火墙白名单，配置完成后，您可以通过访问并体验 [官网 Demo](https://web.sdk.qcloud.com/trtc/webrtc/demo/latest/official-demo/index.html) 检查配置是否生效。
请查看 [应对防火墙限制相关](https://cloud.tencent.com/document/product/647/34399)


####  出现客户端错误："RtcError: ICE/DTLS Transport connection failed" 或 “RtcError: DTLS Transport connection timeout”该如何处理？
出现该错误说明 TRTC Web SDK 在建立媒体传输通道时失败，请检查防火墙配置。TRTC Web SDK 依赖以下端口进行数据传输，请将其加入防火墙白名单，配置完成后，您可以通过访问并体验 [官网 Demo](https://web.sdk.qcloud.com/trtc/webrtc/demo/latest/official-demo/index.html) 检查配置是否生效。
请查看 [应对防火墙限制相关](https://cloud.tencent.com/document/product/647/34399)

### Web 端 SDK 可以获取当前音量大小吗？
可以通过 [getAudioLevel](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/LocalStream.html#getAudioLevel) 获取当前音量大小，[详细教程请查看](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-13-basic-switch-camera-mic.html) 。

#### 什么情况会触发 Client.on(‘client-banned’)？
通过后台 RESTAPI [移除用户](https://cloud.tencent.com/document/product/647/40496?from=10680) 会触发这个事件。需要注意的是同名用户同时登录不会触发这个事件，这种行为是业务逻辑错误，业务应当从逻辑上避免。若客户需要房间内成员互踢管理，建议客户使用 WebIM SDK实现相关逻辑。


#### Web 端是否可以监听远端离开房间？
支持监听远端退房事件，建议使用客户端事件中的 [client.on('peer-leave')](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/module-Event.html) 事件实现远端用户退房通知。


#### 实时音视频的 Web 端、小程序端、PC 端是不是同步的？
是的，实时音视频支持全平台互通。


#### 实时音视频 Web 端的截图功能如何实现？
参考 [Stream.getVideoFrame()](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/Stream.html#getVideoFrame) 接口。


#### Web 端 SDK 怎么录制纯音频推流？为什么在控制台开启自动旁路和自动录制录制不成功呢？
需要设置 [createClient](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/TRTC.html#.createClient) 的 pureAudioPushMode 参数。


#### 出现Client.on(‘error’)问题该如何处理？
这个表示 SDK 遇到不可恢复错误，业务层要么刷新页面重试要么调用 Client.leave 退房后再调用 Client.join 重试。

#### 小程序和 Web 端支持自定义流ID吗？
Web端4.3.8以上版本已支持自定义流ID，可以更新SDK版本。 小程序当前暂不支持。


#### Web 端如何在屏幕分享的时候采集系统声音？
[点击查看教程](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-16-basic-screencast.html#h2-6)，采集系统声音只支持 Chrome M74+ ，在 Windows 和 Chrome OS 上，可以捕获整个系统的音频，在 Linux 和 Mac 上，只能捕获选项卡的音频。其它 Chrome 版本、其它系统、其它浏览器均不支持。


#### Web 端如何切换摄像头和麦克风？
[点击查看教程](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-13-basic-switch-camera-mic.html)，您可以先获取到系统的摄像头和麦克风设备后，调用 [switchDevice](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/LocalStream.html#switchDevice) 来进行切换。
