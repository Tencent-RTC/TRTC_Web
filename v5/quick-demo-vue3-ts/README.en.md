This document describes how to run the TRTC web quick demo (Vue3.x js).

English | [简体中文](./README.md)

## Tryout

We offer an [online web demo (Vue3.x js)](https://web.sdk.qcloud.com/trtc/webrtc/v5/demo/quick-demo-vue3-ts/index.html) for you to try out TRTC features.

Enter your application’s `SDKAppID` and secret key on the webpage to enter a room. For how to get the `SDKAppID` and secret key, see <a href="#getAppInfo">[Getting Application Information]</a>.

After joining a room, you can use a share link to invite others to try the audio/video call feature with you.

## Local Run

#### Download the demo source code

Download the source code of the TRTC web quick demo (Vue3.x js) at [GitHub](https://github.com/LiteAVSDK/TRTC_Web) (in `TRTC_Web/quick-demo-vue3-js`).

#### Run the demo

Note: A node environment of v14.16.0 and above is recommended.

- Run the demo locally

  ```shell
  npm start
  ```

- The [http://localhost:8080/](http://localhost:8080/) address will be opened in your default browser automatically.

  > !
  >
  > The default port number is 8080. Please use the number of the actual port used to run the demo locally.
  >
  > For the browsers supported by the TRTC web SDK, see [Supported Platforms](https://intl.cloud.tencent.com/document/product/647/41664#supported-platforms).
  >
  > For the URL protocols supported by the TRTC web SDK, see [URL Protocol Support](https://intl.cloud.tencent.com/document/product/647/41664#url-protocol-support).
  >
  > For information about the ports and domain names used by the TRTC web SDK, see [Dealing with Firewall Restrictions](https://intl.cloud.tencent.com/document/product/647/35164#what-ports-and-domain-names-should-i-add-to-the-allowlist-of-my-firewall-for-webrtc.3F).

+ Enter the `SDKAppID` and secret key. For detailed directions, see <a href="#getAppInfo">[Getting Application Information]</a>.

#### Try the demo

- Input userId and roomId
- Click the "Enter Room" button to enter the room
- Click the "Start Local Audio/Video" button to capture microphone or camera
- Click the "Stop Local Audio/Video" button to stop capturing microphone or camera
- Click the "Start Share Screen" button to start screen sharing
- Click the "Stop Share Screen" button to stop screen sharing

#### Others

- To package the code to deploy to production, run the command below:

  ```shell
  npm run build
  ```

- If an "eslint" error occurs when you modify the code, run the command below to troubleshoot the issue:

  ```shell
  npm run lint:fix
  ```

<span id="getAppInfo"></span>

## Getting Application Information

#### Create an application

- Log in to the [TRTC console](https://console.cloud.tencent.com/trtc), and select **Development Assistance > [Demo Quick Run](https://console.cloud.tencent.com/trtc/quickstart)** on the left sidebar.

- Select **New** and enter an application name such as `TestTRTC`. If you have already created an application, select **Existing**.

- Add or edit tags according to your actual needs and click **Create**.

  ![img](https://qcloudimg.tencent-cloud.cn/raw/7805a202a8e0c96b748116f17aa8524c.png)

#### Get the `SDKAppID` and `userSig`

- Copy the `SDKApppID` and secret key.

  ![img](https://qcloudimg.tencent-cloud.cn/raw/85489ab5999afbd64604a4e3c76f2249.png)

