This document describes how to run the TRTC web quick demo (Vue3.x js).

English | [简体中文](./README.zh.md)

## Online Demo

We offer an [online web demo (Vue3.x js)](https://web.sdk.qcloud.com/trtc/webrtc/v5/demo/quick-demo-vue3-ts/index.html) for you to try out TRTC features.

Enter your application’s `SDKAppID` and `SDKSecretKey` on the webpage to enter a room. For how to get the `SDKAppID` and `SDKSecretKey`, see [TRTC RTC Engine](https://console.trtc.io/engine).

When entered the room, you can use the share link to invite others to try the audio/video call feature with you.

## How to Run

#### Download the demo source code

1. Clone this repository

```bash
git clone https://github.com/LiteAVSDK/TRTC_Web.git
```

2. Enter this folder

```bash
cd ./TRTC_Web/quick-demo-vue3-ts
```

3. Run the demo

    Note: A node environment of v14.16.0 and above is recommended.

    ```shell
    npm start
    ```

    The [http://localhost:3000/](http://localhost:3000/) address will be opened in your default browser automatically.

4. Enter the `SDKAppID` and `SDKSecretKey`. For detailed directions, see [TRTC RTC Engine](https://console.trtc.io/engine).

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
