本文主要介绍如何快速跑通腾讯云 TRTC Web quick demo(vue2）。


## 在线体验

为了方便快速体验，TRTC 提供了 [Web quick demo(vue2) 在线体验地址](https://web.sdk.qcloud.com/trtc/webrtc/demo/quick-demo-vue2-js/index.html) 。

在该页面下，输入您应用的 SDKAppId, SecretKey 即可加入房间。加入房间之后可以通过分享邀请链接与其他人加入同一个房间进行视频互通。


## 本地运行

### 下载 Demo 源码

通过 [github](https://github.com/LiteAVSDK/TRTC_Web) 下载 TRTCSDK 源码包，TRTC Web quick demo(vue2）源码在目录 `TRTC_Web/quick-demo-vue2-js`下。

### 运行 Demo

+ 安装依赖

  ```shell
  npm install
  ```

+ 本地运行 Demo

  ```shell
  npm run serve
  ```

+ 在浏览器中打开 http://localhost:8080/ 链接

  > !
  >
  > 端口号以 npm run serve 运行之后的实际端口号为准，默认为 8080；
  >
  > TRTC Web SDK 支持的浏览器请参考：[TRTC Web SDK 支持的平台](https://cloud.tencent.com/document/product/647/17249#.E6.94.AF.E6.8C.81.E7.9A.84.E5.B9.B3.E5.8F.B0);
  >
  > TRTC Web SDK 域名协议限制请参考：[TRTC Web SDK 域名协议限制](https://cloud.tencent.com/document/product/647/17249#url-.E5.9F.9F.E5.90.8D.E5.8D.8F.E8.AE.AE.E9.99.90.E5.88.B6);
  >
  > TRTC Web SDK 域名及端口白名单配置请参考：[TRTC Web SDK 域名及端口白名单配置](https://cloud.tencent.com/document/product/647/34399#webrtc-.E9.9C.80.E8.A6.81.E9.85.8D.E7.BD.AE.E5.93.AA.E4.BA.9B.E7.AB.AF.E5.8F.A3.E6.88.96.E5.9F.9F.E5.90.8D.E4.B8.BA.E7.99.BD.E5.90.8D.E5.8D.95.EF.BC.9F);

### 通过控制台创建应用

- 登录 [腾讯云实时音视频控制台](https://console.cloud.tencent.com/trtc) ，选择【开发辅助】> 【[快速跑通 Demo](https://console.cloud.tencent.com/trtc/quickstart)】。

- 单击【新建应用】输入应用名称，例如 TestTRTC；若您已创建应用可单击选择已有应用。

- 根据实际业务需求添加或编辑标签，单击【创建】。

   ![img](https://qcloudimg.tencent-cloud.cn/raw/7a75d25ff107b1bcc32fa67db9348442.png)

### 输入 sdkAppId 和 userSig

+ 复制 SDKAppId 和密钥（secretKey）填入输入框。

  ![img](https://qcloudimg.tencent-cloud.cn/raw/fae7429a873a5d42df3f9dd701db2685.png)

### 体验 Demo

+ 点击【进入房间】按钮进入房间

+ 点击【发布流】按钮发布本地流

+ 点击【取消发布流】按钮取消发布本地流

+ 点击【离开房间】按钮离开房间

+ 点击【开始共享屏幕】按钮布屏幕分享流

+ 点击【停止共享屏幕】按钮取消发布屏幕分享流


## 其他

### 本地打包

```shell
npm run build
```

### eslint 修复

```shell
npm run lint:fix
```