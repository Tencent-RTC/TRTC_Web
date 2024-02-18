This document describes how to quickly run the demo for the TRTC web SDK.

English | [简体中文](./README-zh_CN.md)

### Supported platforms

The TRTC web SDK is implemented based on WebRTC and supports mainstream desktop and mobile browsers. For more information, see [Supported Platforms](https://cloud.tencent.com/document/product/647/17249#.E6.94.AF.E6.8C.81.E7.9A.84.E5.B9.B3.E5.8F.B0).
If your browser, for example, WebView, is not in the list, you can run a [TRTC Web SDK Support Level Test](https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html) in the browser to test whether it fully supports WebRTC.

### URL protocol support

Because of the security policies of browsers, when you use WebRTC, there are requirements on the protocol used for access. For details, see the table below.

| Scenario          | Protocol                  | Receive (Playback) | Send (Publish) | Share Screen  | Remarks         |
| ----------------- | :------------------------ | :----------------- | -------------- | ------------- | --------------- |
| Production        | HTTPS                     | Supported          | Supported      | Supported     | **Recommended** |
| Production        | HTTP                      | Supported          | Not supported  | Not supported |                 |
| Local development | http://localhost          | Supported          | Supported      | Supported     | **Recommended** |
| Local development | http://127.0.0.1          | Supported          | Supported      | Supported     |                 |
| Local development | http://[local IP address] | Supported          | Not supported  | Not supported |                 |
| Local development | file:///                  | Supported          | Supported      | Supported     |                 |

### Firewall configuration

The TRTC web SDK uses the following ports and domain names for data transfer, which should be added to the allowlist of your firewall. You can use our [demo](https://web.sdk.qcloud.com/trtc/webrtc/demo/api-sample/basic-rtc.html) to check whether the configuration has taken effect. For details, see [Dealing with Firewall Restrictions](https://cloud.tencent.com/document/product/647/34399).

- TCP port: 8687
- UDP ports: 8000, 8080, 8800, 843, 443, 16285
- Domain names: `*.rtc.qq.com`, `yun.tim.qq.com` 

## Prerequisites

You have [signed up for a Tencent Cloud account](https://intl.cloud.tencent.com/document/product/378/17985) and completed [identity verification](https://intl.cloud.tencent.com/document/product/378/3629).

## Directions

### Step 1. Create an application

1. Log in to the TRTC console and select **Development Assistance** > **[Demo Quick Run](https://console.cloud.tencent.com/trtc/quickstart)**.
2. Click **Start Now**, enter an application name such as `TestTRTC`, and click **Create Application**.

### Step 2. Download the SDK and demo source code

1. Click **[GitHub](https://github.com/LiteAVSDK/TRTC_Web)** (or **[ZIP](https://web.sdk.qcloud.com/trtc/webrtc/download/webrtc_latest.zip)**) to download the SDK and demo source code.

2. After the download, return to the TRTC console and click **Next** to view your `SDKAppID` and key.

### Step 3. Configure the demo project file

1. Decompress the source package downloaded in [step 2](#step2).
2. Find and open the `TRTC_Web/base-js/js/debug/GenerateTestUserSig.js` file.
3. Set parameters in the `GenerateTestUserSig.js` file:

  <ul><li>SDKAPPID: `0` by default. Set it to the actual `SDKAppID`.</li>
  <li>SECRETKEY: Left empty by default. Set it to the actual key.</li></ul> 
	<img src="https://main.qcloudimg.com/raw/87dc814a675692e76145d76aab91b414.png">

4. Return to the TRTC console and click **Next**.
5. Click **Return to Overview Page**.

>!The method for generating `UserSig` described in this document involves configuring `SECRETKEY` in client code. In this method, `SECRETKEY` may be easily decompiled and reversed, and if your key is disclosed, attackers can steal your Tencent Cloud traffic. Therefore, **this method is suitable only for the local execution and debugging of the demo**.
>The correct `UserSig` distribution method is to integrate the calculation code of `UserSig` into your server and provide an application-oriented API. When `UserSig` is needed, your application can send a request to the business server for a dynamic `UserSig`. For more information, see [How do I calculate `UserSig` during production?](https://intl.cloud.tencent.com/document/product/647/35166).

### Step 4. Run the demo

Open `index.html` in the root directory of the demo with Chrome to run the demo.

>!
>
>- Generally, the demo needs to be deployed on your server and then accessed through `https://domain name/xxx`. You can also build a server locally and access the demo through `localhost:port`.
>- Currently, the desktop version of Chrome offers better support for the features of the TRTC web SDK; therefore, Chrome is recommended.

You will see the page below:  
![](https://main.qcloudimg.com/raw/e989c968446e6e3bdcc19c58e40e2b86.png)

- Click **Enter Room** to enter a TRTC room and publish local audio/video streams.
  You can open multiple pages and click **Join Room** on each of them. You should be able to see multiple videos, which simulate a real-time audio/video call.
- Click the camera icon to select a camera.
- Click the mic icon to select a mic.

>?WebRTC uses the camera and mic of your device to capture audio and video. During the demo run, when prompted by Chrome, you should click **Allow**.  
>![](https://qcloudimg.tencent-cloud.cn/raw/181fd08dc0bd5ffe87a0212b52f3f08e.png)

## FAQs

### 1. Basics

#### What browsers does the TRTC Web SDK support?

For details about browser support, see [Browsers Supported](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/tutorial-05-info-browser.html).
If your browser is not listed in the above document, you can open the [TRTC compatibility check](https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html) page with the browser to test whether it fully supports WebRTC.

#### How do I test my audio/video devices before making a call?

See [Environment and Device Check Before Calls](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/tutorial-23-advanced-support-detection.html) for directions.

#### How do I test my current network quality?

See [Network Quality Check Before Calls](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/tutorial-24-advanced-network-quality.html) for detailed directions.

#### Does the SDK support dual-stream mode or beauty filters?

You can refer to [Enabling Dual-Stream Mode](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/tutorial-27-advanced-small-stream.html), and [Enabling Beauty Filters](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/tutorial-28-advanced-beauty.html) to enable the advanced features.

### 2. Publishing and playback

#### What do the errors `NotFoundError`, `NotAllowedError`, `NotReadableError`, `OverConstrainedError`, and `AbortError` found in the log of TRTC web SDK mean?

| Error                | Description                                                  | Suggested Solution                                           |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| NotFoundError        | The media (audio, video, or screen sharing) specified by the request parameter are not found. This error occurs if, for example, the PC has no cameras but the browser is asked to obtain a video stream. | Remind users to check devices such as cameras and mics before making a call. If a user does not have a camera and wants to make an audio call, use [TRTC.createStream({ audio: true, video: false})](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/TRTC.html#.createStream) to make the SDK capture audio only. |
| NotAllowedError      | The user has rejected the request of the current browser instance to access the camera/mic or share screens. | Remind the user that audio/video calls are not possible without camera/mic access. |
| NotReadableError     | The user has granted access to the requested device, but it is still inaccessible due to a hardware, browser, or webpage error. | Handle the error according to the error message returned, and send this message to the user: "The camera/mic cannot be accessed. Please make sure that no other applications are requesting access and try again." |
| OverConstrainedError | The `cameraId`/`microphoneId` value is invalid.              | Make sure that a valid `cameraId`/`microphoneId` value is passed in. |
| AbortError           | The device cannot be accessed due to an unknown reason.      | -                                                            |

For more information, see [initialize](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html?#initialize).

#### Why am I unable to publish or play streams on some mobile browsers?

For details about browser support, see [Browsers Supported](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/tutorial-05-info-browser.html).
If your browser is not listed in the above document, you can open the [TRTC compatibility check](https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html) page with the browser to test whether it fully supports WebRTC.

#### In the TRTC web SDK, are resolution settings for stream publishing applicable to all browsers?

The resolution set may be unattainable due to device and browser restrictions, in which case the browser will adjust the resolution to make it as close as possible to the target. For details, see [setVideoProfile](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html?#setVideoProfile).

#### Can I modify the style of screen sharing in the TRTC web SDK?

No. The style of screen sharing is controlled by browsers and cannot be modified.

#### In the TRTC web SDK, how do I remove a camera from the camera list after it is disconnected?

You can call [TRTC.getCameras](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/TRTC.html#.getCameras) to see if you can get the new device list. If there is still information of the disconnected camera, it indicates that the browser has not refreshed the list and the SDK cannot get the new device list.


### Why am I unable to publish streams from WeChat’s built-in browser on iOS?

Click [here](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/tutorial-05-info-browser.html) to learn whether the built-in browser of WeChat for iOS supports publishing or playback.

### 3. Playback

#### Why is there video but no audio during a call?

It may be because of the browser’s autoplay policy, which causes the "PLAY_NOT_ALLOWED" error. To solve the problem, display a window on the UI and, in the callback for the window’s clicking event, call `Stream.resume()` to resume audio playback. For details, see [Suggested Solutions for Autoplay Restrictions](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/tutorial-21-advanced-auto-play-policy.html).
This problem may also be caused by an unknown error. Check the `audioLevel` and `audioEnergy` of the sender and recipient in the dashboard.


#### What should I do if video is not displayed during a call?

Check whether the webpage has obtained any data. If data can be sent and received successfully, check whether the correct `mediaStream` object is assigned to the `srcObject` property of `<video>`. Video will not be displayed if `srcObject` is incorrect.


#### What should I do if there is echo or noise during a call or the volume of a call is small?

These issues are common if the call participants are close to each other. Please ensure a certain distance between call participants when testing. If a non-web client hears echo or noise from a web client, it indicates that 3A is not working on the web end.
If you use the browser’s built-in API [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) for custom capturing, you need to enable 3A manually using the parameters below:

- `echoCancellation`: Echo cancellation
- `noiseSuppression`: Noise suppression
- `autoGainControl`: Automatic gain control. For detailed directions, see [MediaTrackConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints).

If you use the [TRTC.createStream](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/TRTC.html#createStream) API for capturing, you don’t need to set the 3A parameters manually. The TRTC SDK enables 3A by default.

### 4. Others

#### What should I do if the error "RtcError: no valid ice candidate found" occurs when I run the TRTC web SDK?

It indicates that TRTC web SDK failed to establish a media transport connection. Please check your firewall policy. The SDK uses the following ports and domain name for data transfer, which should be added to the allowlist of the firewall. After configuration, use the [official demo](https://web.sdk.qcloud.com/trtc/webrtc/demo/latest/official-demo/index.html) to check whether the configuration has taken effect.
See [FAQs about firewall restrictions](https://cloud.tencent.com/document/product/647/34399).


#### What should I do if the client error "RtcError: ICE/DTLS Transport connection failed" or "RtcError: DTLS Transport connection timeout" occurs?

It indicates that TRTC web SDK failed to establish a media transport connection. Please check your firewall policy. The SDK uses the following ports and domain name for data transfer, which should be added to the allowlist of the firewall. After configuration, use the [official demo](https://web.sdk.qcloud.com/trtc/webrtc/demo/latest/official-demo/index.html) to check whether the configuration has taken effect.
See [FAQs about firewall restrictions](https://cloud.tencent.com/document/product/647/34399).

### Does the TRTC web SDK support getting the current volume?

Yes, it can get the current volume level through [getAudioLevel](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html#getAudioLevel). Click [here](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/tutorial-13-basic-switch-camera-mic.html) to view the tutorial.

#### What triggers the `Client.on(‘client-banned’)` event?

Calling the RESTful API [RemoveUser](https://cloud.tencent.com/document/product/647/40496?from=10680) will trigger the event. Note that repeated login causes a business logic error and should be avoided logically, but it will not trigger the `Client.on(‘client-banned’)` event. If you want to manage forced logout in a room, please use the IM web SDK.


#### Can I listen for room exit by remote users in the TRTC web SDK?

Yes. You can use the [client.on('peer-leave')](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-Event.html) event to receive notifications when a remote user exits the room.


#### Is data synced across the TRTC SDKs for web, WeChat Mini Program, and PC?

Yes. TRTC supports communication across all platforms.


#### How do I enable the screenshot feature in the TRTC web SDK?

See the [Stream.getVideoFrame()](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Stream.html#getVideoFrame) API.


#### How do I record audio-only streams in the TRTC web SDK? Why does the recording fail after I enable auto relayed push and auto recording in the console?

You need to set the `pureAudioPushMode` parameter of [createClient](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/TRTC.html#.createClient).


#### What should I do with `Client.on(‘error’)`?

It indicates that the SDK encountered an unrecoverable error. You can refresh the page or call `Client.leave` to leave the room and then call `Client.join` to try again.

#### Does the TRTC web SDK or WeChat Mini Program support custom stream ID?

The TRTC web SDK has supported custom stream ID since v4.3.8. You can update your SDK to use the feature. The TRTC SDK for Mini Program does not support custom stream ID currently.


#### How do I capture system audio during screen sharing in the TRTC web SDK?

Click [here](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/tutorial-16-basic-screencast.html#h2-6) to view the tutorial. The system sound can be captured only with Chrome 74+. On Windows and Chrome OS, the sound of the entire system can be captured. On Linux and macOS, only the sound of the active tab can be captured.


#### How do I switch the camera/mic in the TRTC web SDK?

Click [here](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/tutorial-13-basic-switch-camera-mic.html) to view the tutorial. You can first get the system’s cameras and mics and call [switchDevice](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html#switchDevice) to switch the camera/mic.