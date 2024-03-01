/// <reference path="./core.d.ts" />

declare interface TRTCOptions {
    plugins?: Array<{
        new (core: Core): IPlugin;
    }>;
    enableSEI?: boolean;
    assetsPath?: string;
}
declare interface LocalVideoConfig {
    view?: string | HTMLElement | HTMLElement[] | null;
    publish?: boolean;
    mute?: boolean | string;
    option?: {
        cameraId?: string;
        useFrontCamera?: boolean;
        profile?: keyof typeof videoProfileMap | VideoProfile;
        fillMode?: 'contain' | 'cover' | 'fill';
        mirror?: boolean | string;
        small?: keyof typeof videoProfileMap | VideoProfile | boolean;
        qosPreference?: typeof TRTCType.QOS_PREFERENCE_SMOOTH | typeof TRTCType.QOS_PREFERENCE_CLEAR;
        videoTrack?: MediaStreamTrack;
    };
}
declare interface ProxyServer {
    websocketProxy?: string;
    loggerProxy?: string;
    turnServer?: TurnServerOptions | TurnServerOptions[];
    iceTransportPolicy?: RTCIceTransportPolicy;
    webtransportProxy?: string;
    scheduleProxy?: string;
    unifiedProxy?: string;
}
declare interface EnterRoomConfig {
    sdkAppId: number;
    userId: string;
    userSig: string;
    roomId?: number;
    strRoomId?: string;
    role?: UserRole;
    autoReceiveAudio?: boolean;
    autoReceiveVideo?: boolean;
    privateMapKey?: string;
    businessInfo?: string;
    enableAutoPlayDialog?: boolean;
    proxy?: ProxyServer | string;
    scene?: Scene;
    userDefineRecordId?: string;
}
declare interface ScreenShareConfig {
    view?: string | HTMLElement | HTMLElement[] | null;
    publish?: boolean;
    option?: {
        profile?: keyof typeof screenProfileMap | VideoProfile;
        fillMode?: 'contain' | 'cover' | 'fill';
        systemAudio?: boolean;
        echoCancellation?: boolean;
        autoGainControl?: boolean;
        noiseSuppression?: boolean;
        audioTrack?: MediaStreamTrack;
        videoTrack?: MediaStreamTrack;
        captureElement?: HTMLElement;
        preferDisplaySurface?: 'current-tab' | 'tab' | 'window' | 'monitor';
        qosPreference?: typeof TRTCType.QOS_PREFERENCE_SMOOTH | typeof TRTCType.QOS_PREFERENCE_CLEAR;
    };
}
declare interface UpdateScreenShareConfig extends ScreenShareConfig {
    option?: {
        fillMode?: 'contain' | 'cover' | 'fill';
        qosPreference?: typeof TRTCType.QOS_PREFERENCE_SMOOTH | typeof TRTCType.QOS_PREFERENCE_CLEAR;
    };
}
declare interface RemoteVideoConfig {
    view?: string | HTMLElement | HTMLElement[] | null;
    userId: string;
    streamType: TRTCStreamType;
    option?: {
        fillMode?: 'contain' | 'cover' | 'fill';
        mirror?: boolean;
        small?: boolean;
        receiveWhenViewVisible?: boolean;
        viewRoot?: HTMLElement;
    };
}
declare interface StopRemoteVideoConfig {
    userId: string;
    streamType?: TRTCStreamType;
}
declare interface LocalAudioConfig {
    publish?: boolean;
    mute?: boolean;
    option?: {
        microphoneId?: string;
        profile?: keyof typeof audioProfileMap;
        audioTrack?: MediaStreamTrack;
        captureVolume?: number;
        earMonitorVolume?: number;
        echoCancellation?: boolean;
        autoGainControl?: boolean;
        noiseSuppression?: boolean;
    };
}
declare interface UpdateLocalAudioConfig extends LocalAudioConfig {
    mute?: boolean;
    option?: {
        microphoneId?: string;
        audioTrack?: MediaStreamTrack;
        captureVolume?: number;
        earMonitorVolume?: number;
        echoCancellation?: boolean;
        autoGainControl?: boolean;
        noiseSuppression?: boolean;
    };
}
declare interface RemoteAudioConfig {
    userId: string;
    option?: {
        volume?: number;
    };
}
declare interface StopRemoteAudioConfig {
    userId: string;
}
declare const enum TRTCStreamType {
    Main = "main",
    Sub = "sub"
}
declare enum TRTCDeviceType {
    Camera = "camera",
    Microphone = "microphone",
    Speaker = "speaker"
}
declare enum TRTCDeviceAction {
    Remove = "remove",
    Add = "add",
    Active = "active"
}
declare interface RTCErrorParams {
    code: number;
    extraCode?: number;
    functionName?: string;
    fnName?: string;
    message?: string;
    messageParams?: any;
    originError?: Error | DOMException;
}
declare interface RTCErrorInterface {
    readonly name: string;
    readonly code: number;
    readonly extraCode?: number;
    readonly functionName?: string;
    readonly message?: string;
    readonly originError?: Error | DOMException;
}
declare interface ErrorMessageParams {
    key?: string;
    rule?: any;
    fnName?: string;
    fnParams?: any;
    value?: string | number | any;
    type?: string;
    deviceType?: string;
    error?: Error | DOMException | CoreError;
}
/**
 * **TRTC Constants**<br>
 * @module TYPE
 * @example
 * // Usage:
 * TRTC.TYPE.SCENE_LIVE
 */
declare const TRTCType: {
    /**
       * Live streaming scene
       * @default 'live'
       * @memberof module:TYPE
       */
    readonly SCENE_LIVE: Scene.LIVE;
    /**
       * RTC scene
       * @default 'rtc'
       * @memberof module:TYPE
      */
    readonly SCENE_RTC: Scene.RTC;
    /**
       * Anchor role
       * @default 'anchor'
       * @memberof module:TYPE
       */
    readonly ROLE_ANCHOR: UserRole.ANCHOR;
    /**
       * Audience role
       * @default 'audience'
       * @memberof module:TYPE
       */
    readonly ROLE_AUDIENCE: UserRole.AUDIENCE;
    /**
       * Main stream
       *
       * - TRTC has a main video stream (main stream) and an sub video stream (sub stream)
       * - The camera is published through the main stream, and the screen sharing is published through the sub stream.
       * - The main video stream includes: high-definition large picture and low-definition small picture. By default, {@link TRTC#startRemoteVideo TRTC.startRemoteVideo} plays the high-definition large picture, and the low-definition small picture can be played through the small parameter. Refer to: [Enable small stream function](./tutorial-27-advanced-small-stream.html).
       * @default 'main'
       * @memberof module:TYPE
       */
    readonly STREAM_TYPE_MAIN: TRTCStreamType.Main;
    /**
       * Sub stream
       * @default 'sub'
       * @memberof module:TYPE
       */
    readonly STREAM_TYPE_SUB: TRTCStreamType.Sub;
    /**
       * Standard audio quality
      * | Audio Profile | Sampling Rate | Channel | Bitrate (kbps) |
      * | :---        | :---  | :--- | :---       |
      * | TRTC.TYPE.AUDIO_PROFILE_STANDARD    | 48000 | Mono| 40         |
      * | TRTC.TYPE.AUDIO_PROFILE_HIGH        | 48000 | Mono| 128        |
      * | TRTC.TYPE.AUDIO_PROFILE_STANDARD_STEREO | 48000 | Stereo| 64        |
      * | TRTC.TYPE.AUDIO_PROFILE_HIGH_STEREO | 48000 | Stereo| 192        |
      * @default 'standard'
      * @memberof module:TYPE
      */
    readonly AUDIO_PROFILE_STANDARD: "standard";
    /**
       * Standard stereo audio quality
     * | Audio Profile | Sampling Rate | Channel | Bitrate (kbps) |
      * | :---        | :---  | :--- | :---       |
      * | TRTC.TYPE.AUDIO_PROFILE_STANDARD    | 48000 | Mono| 40         |
      * | TRTC.TYPE.AUDIO_PROFILE_HIGH        | 48000 | Mono| 128        |
      * | TRTC.TYPE.AUDIO_PROFILE_STANDARD_STEREO | 48000 | Stereo| 64        |
      * | TRTC.TYPE.AUDIO_PROFILE_HIGH_STEREO | 48000 | Stereo| 192        |
      * @default 'standard-stereo'
      * @memberof module:TYPE
      */
    readonly AUDIO_PROFILE_STANDARD_STEREO: "standard-stereo";
    /**
       * High audio quality
       * | Audio Profile | Sampling Rate | Channel | Bitrate (kbps) |
       * | :---        | :---  | :--- | :---       |
       * | TRTC.TYPE.AUDIO_PROFILE_STANDARD    | 48000 | Mono| 40         |
       * | TRTC.TYPE.AUDIO_PROFILE_HIGH        | 48000 | Mono| 128        |
       * | TRTC.TYPE.AUDIO_PROFILE_STANDARD_STEREO | 48000 | Stereo| 64        |
       * | TRTC.TYPE.AUDIO_PROFILE_HIGH_STEREO | 48000 | Stereo| 192        |
      * @default 'high'
      * @memberof module:TYPE
      */
    readonly AUDIO_PROFILE_HIGH: "high";
    /**
       * High-quality stereo audio
       * | Audio Profile | Sampling Rate | Channel | Bitrate (kbps) |
       * | :---        | :---  | :--- | :---       |
       * | TRTC.TYPE.AUDIO_PROFILE_STANDARD    | 48000 | Mono| 40         |
       * | TRTC.TYPE.AUDIO_PROFILE_HIGH        | 48000 | Mono| 128        |
       * | TRTC.TYPE.AUDIO_PROFILE_STANDARD_STEREO | 48000 | Stereo| 64        |
       * | TRTC.TYPE.AUDIO_PROFILE_HIGH_STEREO | 48000 | Stereo| 192        |
       * @default 'high-stereo'
  
      * @memberof module:TYPE
      */
    readonly AUDIO_PROFILE_HIGH_STEREO: "high-stereo";
    /**
     * When the network is weak, the video encoding strategy takes 'smooth' first, i.e., the priority is to preserve frame rate.
     * <br>
     * Default 'smooth' first for camera, 'default' clear first for screen sharing
    * @default 'smooth'
    * @memberof module:TYPE
    */
    readonly QOS_PREFERENCE_SMOOTH: "smooth";
    /**
     * When the network is weak, the video encoding strategy takes 'clear' first, i.e., the priority is to preserve resolution.
     * <br>
     * Default 'smooth' first for camera, 'default' clear first for screen sharing
    * @default 'clear'
    * @memberof module:TYPE
    */
    readonly QOS_PREFERENCE_CLEAR: "clear";
};
declare interface AudioMixerOptions {
    id: string;
    url: string;
    loop?: boolean;
    volume?: number;
}
declare interface UpdateAudioMixerOptions {
    id: string;
    loop?: boolean;
    volume?: number;
    seekFrom?: number;
    operation?: 'pause' | 'resume' | 'stop';
}
declare interface StopAudioMixerOptions {
    id: string;
}
declare interface AIDenoiserOptions {
    assetsPath: string;
    sdkAppId: number;
    userId: string;
    userSig: string;
}
declare type PluginStartOptionsMap = {
    'AudioMixer': AudioMixerOptions;
    'AIDenoiser': AIDenoiserOptions;
    'CDNStreaming': CDNStreamingOptions;
    'VirtualBackground': VirtualBackgroundOptions;
    'Watermark': WatermarkOptions;
};
declare type PluginUpdateOptionsMap = {
    'AudioMixer': UpdateAudioMixerOptions;
    'CDNStreaming': CDNStreamingOptions;
    'VirtualBackground': UpdateVirtualBackgroundOptions;
};
declare type PluginStopOptionsMap = {
    'AudioMixer': StopAudioMixerOptions;
    'AIDenoiser': undefined;
    'CDNStreaming': CDNStreamingOptions;
    'VirtualBackground': undefined;
    'Watermark': undefined;
};
declare interface TRTCStatistics {
    rtt: number;
    downLoss: number;
    upLoss: number;
    bytesSent: number;
    bytesReceived: number;
    localStatistics: LocalStatistic;
    remoteStatistics: RemoteStatistic[];
}
interface LocalStatistic {
    audio: {
        bitrate: number;
        audioLevel: number;
    };
    video: {
        width: number;
        height: number;
        frameRate: number;
        bitrate: number;
        videoType: TRTCVideoType;
    }[];
}
declare enum TRTCVideoType {
    Big = "big",
    Small = "small",
    Sub = "sub"
}
interface RemoteStatistic {
    audio: {
        bitrate: number;
        audioLevel: number;
    };
    video: {
        width: number;
        height: number;
        frameRate: number;
        bitrate: number;
        videoType: TRTCVideoType;
    }[];
    userId: string;
}
declare interface VideoFrameConfig {
    userId?: string;
    streamType?: TRTCStreamType;
}

/**
 * @typedef TRTCStatistics TRTC statistics
 * @property {number} rtt The round-trip time from SDK to TRTC server(SDK -> TRTC server -> SDK). Unit: ms.
 * @property {number} upLoss Uplink loss rate from SDK to TRTC server. Unit: %
 * @property {number} downLoss Downlink loss rate from TRTC server to SDK. Unit: %
 * @property {number} bytesSent Total bytes sent, including signaling data and media data. Unit: bytes.
 * @property {number} bytesReceived Total bytes received, including signaling data and media data. Unit: bytes.
 * @property {TRTCLocalStatistics} localStatistics Local statistics.
 * @property {TRTCRemoteStatistics[]} remoteStatistics Remote statistics.
 */
/**
 * Local statistics
 * @typedef TRTCLocalStatistics
 * @property {TRTCAudioStatistic} audio Local audio statistics
 * @property {TRTCVideoStatistic[]} video Local video statistics
 */
/**
 * Remote statistics.
 * @typedef TRTCRemoteStatistics
 * @property {string} userId The userId of remote user
 * @property {TRTCAudioStatistic} audio Remote audio statistics
 * @property {TRTCVideoStatistic[]} video Remote video statistics
 */
/**
 * Audio statistics
 * @typedef TRTCAudioStatistic
 * @property {number} bitrate Audio bitrate. Unit: kbps
 * @property {number} audioLevel Audio level. Value: float from 0 to 1.
 */
/** Video statistics
 * @typedef TRTCVideoStatistic
 * @property {number} bitrate Video bitrate. Unit: kbps
 * @property {number} width Video width
 * @property {number} height Video height
 * @property {number} frameRate Video frameRate
 * @property {'big'|'small'|'sub'} videoType Video type: big, small, sub.
 */
/**
 * **TRTC Event List**<br>
 * <br>
 * Listen to specific events through {@link TRTC#on trtc.on(TRTC.EVENT.XXX)}. You can use these events to manage the room user list, manage user stream state, and perceive network state. The following is a detailed introduction to the events.
 * > !
 * > - Events need to be listened to before they are triggered, so that you can receive the corresponding event notifications. Therefore, it is recommended to complete event listening before entering the room, so as to ensure that no event notifications are missed.
 * @module EVENT
 * @example
 * // Usage:
 * trtc.on(TRTC.EVENT.ERROR, () => {});
 */
declare const TRTCEvent: {
    /**
     * Error event, non-API call error, SDK throws when an unrecoverable error occurs during operation.
     *
     * - Error code (error.code): {@link module:ERROR_CODE.OPERATION_FAILED ErrorCode.OPERATION_FAILED}
     * - Possible extended error codes (error.extraCode): 5501, 5502
     * @default 'error'
     * @memberof module:EVENT
     * @see {@link RtcError RtcError}
     * @e
     * @example
     *
     * trtc.on(TRTC.EVENT.ERROR, error => {
     *   console.error('trtc error observed: ' + error);
     *   const errorCode = error.code;
     *   const extraCode = error.extraCode;
     * });
     */
    readonly ERROR: "error";
    /**
       * @description Automatic playback failed, refer to {@tutorial 21-advanced-auto-play-policy}
       * @default 'autoplay-failed'
       * @memberof module:EVENT
       * @example
       * trtc.on(TRTC.EVENT.AUTOPLAY_FAILED, event => {
       *   // Guide user to click the page, SDK will resume playback automatically when user click the page.
       *   // Since v5.1.3+, you can get userId on this event.
       *   console.log(event.userId);
       * });
       */
    readonly AUTOPLAY_FAILED: "autoplay-failed";
    /**
     * @description Kicked out of the room for some reason, including:<br>
     * - kick: The same user with same userId enters same room. The user who enters the room first will be kicked out of the room by the user who enters later.
     *   - Entering a room with the same userId is not allowed behavior, which may lead to abnormal audio/video calls between the two parties, and should be avoided on the business side.
     *   - Users with the same userId who enter the same room with the same audience role may not receive this event.
     * - banned: kicked out by the administrator using [Server API - RemoveUser](https://trtc.io/document/34267/34268).
     * - room_disband: kicked out by the administrator using [Server API - DismissRoom](https://trtc.io/document/34267/34269).
     * @default 'kicked-out'
     * @memberof module:EVENT
     * @example
     *
     * trtc.on(TRTC.EVENT.KICKED_OUT, event => {
     *   console.log(event.reason)
     * });
     */
    readonly KICKED_OUT: "kicked-out";
    /**
     * Remote user enters the room event.
     *
     * - In `live` mode, only the anchor has the notification of entering and leaving the room, and the audience does not have the notification of entering and leaving the room. The audience can receive the notification of entering and leaving the room of the anchor.
     * @default 'remote-user-enter'
     * @memberof module:EVENT
     * @example
     *
     * trtc.on(TRTC.EVENT.REMOTE_USER_ENTER, event => {
     *   const userId = event.userId;
     * });
     */
    readonly REMOTE_USER_ENTER: "remote-user-enter";
    /**
     * Remote user exits the room event.
     *
     * - In `live` mode, only the anchor has the notification of entering and leaving the room, and the audience does not have the notification of entering and leaving the room. The audience can receive the notification of entering and leaving the room of the anchor.
     * @default 'remote-user-exit'
     * @memberof module:EVENT
     * @example
     *
     * trtc.on(TRTC.EVENT.REMOTE_USER_EXIT, event => {
     *   const userId = event.userId;
     * });
     */
    readonly REMOTE_USER_EXIT: "remote-user-exit";
    /**
     * Remote user publishes audio. You will receive this notification when the remote user turns on the microphone. Refer to: [Turn on/off camera and microphone](./tutorial-15-basic-dynamic-add-video.html)
     *
     * - By default, the SDK automatically plays remote audio, and you do not need to call the API to play remote audio. You can listen for this event and {@link module:EVENT.REMOTE_AUDIO_UNAVAILABLE REMOTE_AUDIO_UNAVAILABLE} to update the UI icon for "whether the remote microphone is turned on".
     * - Note: If the user has not interacted with the page before entering the room, automatic audio playback may fail due to the [browser's automatic playback policy restrictions](./tutorial-21-advanced-auto-play-policy.html). You need to refer to the [suggestions for handling automatic playback restrictions](./tutorial-21-advanced-auto-play-policy.html) for processing.
     * - If you do not want the SDK to automatically play audio, you can set receiveMode = {@link module:TYPE.RECEIVE_MODE_MANUAL TRTC.TYPE.RECEIVE_MODE_MANUAL} to turn off automatic audio playback when {@link TRTC#enterRoom trtc.enterRoom()}.
     * - Listen for the {@link module:EVENT.REMOTE_AUDIO_AVAILABLE TRTC.EVENT.REMOTE_AUDIO_AVAILABLE} event, record the userId with remote audio, and call the {@link TRTC#muteRemoteAudio trtc.muteRemoteAudio(userId, false)} method when you need to play audio.
     * @default 'remote-audio-available'
     * @memberof module:EVENT
     * @example
     * // Listen before entering the room
     * trtc.on(TRTC.EVENT.REMOTE_AUDIO_AVAILABLE, event => {
     *   const userId = event.userId;
     * });
     */
    readonly REMOTE_AUDIO_AVAILABLE: "remote-audio-available";
    /**
     * Remote user stops publishing audio. You will receive this notification when the remote user turns off the microphone.
     *
     * @default 'remote-audio-unavailable'
     * @memberof module:EVENT
     * @example
     * // Listen before entering the room
     * trtc.on(TRTC.EVENT.REMOTE_AUDIO_UNAVAILABLE, event => {
     *   const userId = event.userId;
     *
     * });
     */
    readonly REMOTE_AUDIO_UNAVAILABLE: "remote-audio-unavailable";
    /**
     * Remote user publishes video. You will receive this notification when the remote user turns on the camera. Refer to: [Turn on/off camera and microphone](./tutorial-15-basic-dynamic-add-video.html)
     *
     * - You can listen for this event and {@link module:EVENT.REMOTE_VIDEO_UNAVAILABLE REMOTE_VIDEO_UNAVAILABLE} to update the UI icon for "whether the remote camera is turned on".
     * @see {@link module:TYPE.STREAM_TYPE_MAIN STREAM_TYPE_MAIN}
     * @see {@link module:TYPE.STREAM_TYPE_SUB STREAM_TYPE_SUB}
     * @default 'remote-video-available'
     * @memberof module:EVENT
     * @example
     * // Listen before entering the room
     * trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, event => {
     *   const userId = event.userId;
     *   const streamType = event.streamType;
     *   trtc.startRemoteVideo({userId, streamType, view});
     * });
     */
    readonly REMOTE_VIDEO_AVAILABLE: "remote-video-available";
    /**
     * Remote user stops publishing video. You will receive this notification when the remote user turns off the camera.
     * @default 'remote-video-unavailable'
     * @memberof module:EVENT
     * @example
     * // Listen before entering the room
     * trtc.on(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, event => {
     *   const userId = event.userId;
     *   const streamType = event.streamType;
     *   // At this point, the SDK will automatically stop playing, and there is no need to call stopRemoteVideo.
     * });
     */
    readonly REMOTE_VIDEO_UNAVAILABLE: "remote-video-unavailable";
    /**
     * @description Volume event<br>
     * After calling the {@link TRTC#enableAudioVolumeEvaluation enableAudioVolumeEvaluation} interface to enable the volume callback, the SDK will throw this event regularly to notify the volume of each userId.<br>
     * **Note**
     * - The callback contains the volume of the local microphone and the volume of the remote user. The callback will be triggered regardless of whether anyone is speaking.
     * - The event.result will be sorted from large to small according to the volume size.
     * - When userId is an empty string, it represents the volume of the local microphone.
     * - volume is a positive integer with a value of 0-100.
     * @default 'audio-volume'
     * @memberof module:EVENT
     * @example
     * trtc.on(TRTC.EVENT.AUDIO_VOLUME, event => {
     *    event.result.forEach(({ userId, volume }) => {
     *        const isMe = userId === ''; // When userId is an empty string, it represents the volume of the local microphone.
     *        if (isMe) {
     *            console.log(`my volume: ${volume}`);
     *        } else {
     *            console.log(`user: ${userId} volume: ${volume}`);
     *        }
     *    })
     * });
     *
     * // Enable volume callback and trigger the event every 1000ms
     * trtc.enableAudioVolumeEvaluation(1000);
     */
    readonly AUDIO_VOLUME: "audio-volume";
    /**
     * @description Network quality statistics data event, which starts to be counted after entering the room and triggers every two seconds. This data reflects the network quality of your local uplink and downlink.
     * - The uplink network quality (uplinkNetworkQuality) refers to the network situation of uploading local streams (uplink connection network quality from SDK to Tencent Cloud)
     * - The downlink network quality (downlinkNetworkQuality) refers to the average network situation of downloading all streams (average network quality of all downlink connections from Tencent Cloud to SDK)
     *
     *    The enumeration values and meanings are shown in the following table:
     *    | Value | Meaning |
     *    | :--- | :---- |
     *    | 0 | Network state is unknown, indicating that the current trtc instance has not established an uplink/downlink connection |
     *    | 1 | Network state is excellent |
     *    | 2 | Network state is good |
     *    | 3 | Network state is average |
     *    | 4 | Network state is poor |
     *    | 5 | Network state is very poor |
     *    | 6 | Network connection is disconnected<br/>Note: If the downlink network quality is this value, it means that all downlink connections have been disconnected |
     * - uplinkRTT, uplinkLoss are the uplink RTT (ms) and uplink packet loss rate.
     * - downlinkRTT, downlinkLoss are the average RTT (ms) and average packet loss rate of all downlink connections.
     *
     * **Note**
     * - If you want to know the uplink and downlink network conditions of the other party, you need to broadcast the other party's network quality through IM.
     *
     * @default 'network-quality'
     * @memberof module:EVENT
     * @example
     * trtc.on(TRTC.EVENT.NETWORK_QUALITY, event => {
     *    console.log(`network-quality, uplinkNetworkQuality:${event.uplinkNetworkQuality}, downlinkNetworkQuality: ${event.downlinkNetworkQuality}`)
     *    console.log(`uplink rtt:${event.uplinkRTT} loss:${event.uplinkLoss}`)
     *    console.log(`downlink rtt:${event.downlinkRTT} loss:${event.downlinkLoss}`)
     * })
     */
    readonly NETWORK_QUALITY: "network-quality";
    /**
     * @description SDK and Tencent Cloud connection state change event, you can use this event to listen to the overall connection state of the SDK and Tencent Cloud.<br>
     * - 'DISCONNECTED': Connection disconnected
     * - 'CONNECTING': Connecting
     * - 'CONNECTED': Connected
     *
     * Meanings of different state changes:
     *
     * - DISCONNECTED -> CONNECTING: Trying to establish a connection, triggered when calling the enter room interface or when the SDK automatically reconnects.
     * - CONNECTING -> DISCONNECTED: Connection establishment failed, triggered when calling the exit room interface to interrupt the connection or when the connection fails after SDK retries.
     * - CONNECTING -> CONNECTED: Connection established successfully, triggered when the connection is successful.
     * - CONNECTED -> DISCONNECTED: Connection interrupted, triggered when calling the exit room interface or when the connection is disconnected due to network anomalies.
     *
     * Suggestion: You can listen to this event and display different UIs in different states to remind users of the current connection state.
     *
     * @default 'connection-state-changed'
     * @memberof module:EVENT
     * @example
     * trtc.on(TRTC.CONNECTION_STATE_CHANGED, event => {
     *   const prevState = event.prevState;
     *   const curState = event.state;
     * });
     */
    readonly CONNECTION_STATE_CHANGED: "connection-state-changed";
    /**
     * @description Audio playback state change event
     *
     * event.userId When userId is an empty string, it represents the local user, and when it is a non-empty string, it represents a remote user.
     *
     * event.state The value is as follows:
     * - 'PLAYING': start playing
     *   - event.reason is 'playing' or 'unmute'.
     * - 'PAUSED': pause playback
     *   - When event.reason is 'pause', it is triggered by the pause event of the \<audio\> element. The following situations will trigger:
     *      - Call the HTMLMediaElement.pause interface.
     *   - When event.reason is 'mute'. See event {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/mute_event | MediaStreamTrack.mute_event}
     *      - When userId is oneself, this event is triggered, indicating that audio collection is paused, usually caused by device abnormalities, such as being preempted by other applications on the device, at this time, the user needs to be guided to recollect.
     *      - When userId is others, this event is triggered, indicating that the received audio data is not enough to play. Usually caused by network jitter, no processing is required on the access side. When the received data is sufficient to play, it will automatically resume.
     * - 'STOPPED': stop playing
     *   - event.reason is 'ended'.
     *
     * event.reason The reason for the state change, the value is as follows:
     * - 'playing': start playing, see event {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event | HTMLMediaElement.playing_event}
     * - 'mute': The audio track cannot provide data temporarily, see event {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/mute_event | MediaStreamTrack.mute_event}
     * - 'unmute': The audio track resumes providing data, see event {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/unmute_event | MediaStreamTrack.unmute_event}
     * - 'ended': The audio track has been closed
     * - 'pause': Playback paused
     * @default 'audio-play-state-changed'
     * @memberof module:EVENT
     * @example
     * trtc.on(TRTC.EVENT.AUDIO_PLAY_STATE_CHANGED, event => {
     *   console.log(`${event.userId} player is ${event.state} because of ${event.reason}`);
     * });
     */
    readonly AUDIO_PLAY_STATE_CHANGED: "audio-play-state-changed";
    /**
     * @description Video playback state change event
     *
     * event.userId When userId is an empty string, it represents the local user, and when it is a non-empty string, it represents a remote user.
     *
     * event.streamType Stream type, value: {@link module:TYPE.STREAM_TYPE_MAIN TRTC.TYPE.STREAM_TYPE_MAIN} {@link module:TYPE.STREAM_TYPE_SUB TRTC.TYPE.STREAM_TYPE_SUB}
     *
     * event.state The value is as follows:
     * - 'PLAYING': start playing
     *   - event.reason is 'playing' or 'unmute'.
     * - 'PAUSED': pause playback
     *   - When event.reason is 'pause', it is triggered by the pause event of the \<video\> element. The following situations will trigger:
     *      - Call the HTMLMediaElement.pause interface.
     *      - After successful playback, the view container for playing the video is removed from the DOM.
     *   - When event.reason is 'mute'. See event {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/mute_event | MediaStreamTrack.mute_event}
     *      - When userId is oneself, this event is triggered, indicating that video collection is paused, usually caused by device abnormalities, such as being preempted by other applications on the device, at this time, the user needs to be guided to recollect.
     *      - When userId is others, this event is triggered, indicating that the received video data is not enough to play. Usually caused by network jitter, no processing is required on the access side. When the received data is sufficient to play, it will automatically resume.
     * - 'STOPPED': stop playing
     *   - event.reason is 'ended'.
     *
     * event.reason The reason for the state change, the value is as follows:
     * - 'playing': start playing, see event {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event | HTMLMediaElement.playing_event}
     * - 'mute': The video track cannot provide data temporarily, see event {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/mute_event | MediaStreamTrack.mute_event}
     * - 'unmute': The video track resumes providing data, see event {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/unmute_event | MediaStreamTrack.unmute_event}
     * - 'ended': The video track has been closed
     * - 'pause': Playback paused
     * @default 'video-play-state-changed'
     * @memberof module:EVENT
     * @example
     * trtc.on(TRTC.EVENT.VIDEO_PLAY_STATE_CHANGED, event => {
     *   console.log(`${event.userId} ${event.streamType} video player is ${event.state} because of ${event.reason}`);
     * });
     */
    readonly VIDEO_PLAY_STATE_CHANGED: "video-play-state-changed";
    /**
     * @description Notification event for local screen sharing stop, only valid for local screen sharing streams.
     * @default 'screen-share-stopped'
     * @memberof module:EVENT
     * @example
     * trtc.on(TRTC.EVENT.SCREEN_SHARE_STOPPED, () => {
     *   console.log('screen sharing was stopped');
     * });
     */
    readonly SCREEN_SHARE_STOPPED: "screen-share-stopped";
    /**
     * @description Notification event for device changes such as camera and microphone.
     * - event.device is a [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) object with properties:
     *    - deviceId: device ID
     *    - label: device description information
     *    - groupId: device group ID
     * - event.type value: `'camera'|'microphone'|'speaker'`
     * - event.action value:
     *    - 'add' device has been added.
     *    - 'remove' device has been removed.
     *    - 'active' device has been activated, for example: after startLocalVideo is successful, this event will be triggered.
     * @default 'device-changed'
     * @memberof module:EVENT
     * @example
     * trtc.on(TRTC.EVENT.DEVICE_CHANGED, (event) => {
     *   console.log(`${event.type}(${event.device.label}) ${event.action}`);
     * });
     */
    readonly DEVICE_CHANGED: "device-changed";
    /**
     * @description Publish state change event.
     * - event.mediaType media type, value: `'audio'|'video'|'screen'`.
     * - event.state current publish state, value:
     *    - `'starting'` trying to publish stream
     *    - `'started'` publish stream succeeded
     *    - `'stopped'` publish stream stopped, see event.reason field for the reason
     * - event.prevState the publish state at the last event trigger, with the same type as event.state.
     * - event.reason the reason for the publish state to become `'stopped'`, value:
     *    - `'timeout'` publish stream timeout, usually caused by network jitter or firewall interception. The SDK will keep retrying, and the business side can guide the user to check the network or change the network at this time.
     *    - `'error'` publish stream error, at this time, you can get the specific error information from event.error, usually caused by the browser not supporting H264 encoding.
     *    - `'api-call'` publish stream stopped due to business side API call, for example, stopLocalVideo was called to stop the publish stream before startLocalVideo was successful, which is a normal behavior and the business side does not need to pay attention to it.
     * - event.error error information when event.reason is `'error'`.
     * @default 'publish-state-changed'
     * @memberof module:EVENT
     * @example
     * trtc.on(TRTC.EVENT.PUBLISH_STATE_CHANGED, (event) => {
     *   console.log(`${event.mediaType} ${event.state} ${event.reason}`);
     * });
     */
    readonly PUBLISH_STATE_CHANGED: "publish-state-changed";
    /**
     * @description TRTC statistics.<br>
     *
     * - SDK will fires this event once every 2s.
     * - You can get the network quality, statistics of audio and video from this event. For detailed parameter description, please refer to {@link TRTCStatistics}.
     * @default 'statistics'
     * @since v5.2.0
     * @memberof module:EVENT
     * @example
     * trtc.on(TRTC.EVENT.STATISTICS, statistics => {
     *    console.warn(statistics.rtt, statistics.upLoss, statistics.downLoss);
     * })
     */
    readonly STATISTICS: "statistics";
    /**
     * @since v5.3.0
     * @description SEI message received<br>
     * @default 'sei-message'
     * @memberof module:EVENT
     * @example
     * trtc.on(TRTC.EVENT.SEI_MESSAGE, event => {
     *    console.log(`received sei message from ${event.userId}, data: ${event.data}, streamType: ${event.streamType}`)
     * })
     */
    readonly SEI_MESSAGE: "sei-message";
    /**
     * @since v5.3.0
     * @description a new MediaStreamTrack object received.
     * @default 'track'
     * @memberof module:EVENT
     * @example
     * trtc.on(TRTC.EVENT.TRACK, event => {
     *   // userId === '' means event.track is a local track, otherwise it's a remote track
     *   const isLocal = event.userId === '';
     *   // Usually the sub stream is a screen-sharing video stream.
     *   const isSubStream = event.streamType === TRTC.TYPE.STREAM_TYPE_SUB;
     *   const mediaStreamTrack = event.track;
     *   const kind = event.track.kind; // audio or video
     * })
     */
    readonly TRACK: "track";
};
declare interface TRTCEventTypes {
    [TRTCEvent.ERROR]: [RtcError];
    [TRTCEvent.AUTOPLAY_FAILED]: [{
        userId: string;
    }];
    [TRTCEvent.KICKED_OUT]: [{
        reason: Exclude<BannedReason, 'user_time_out'>;
    }];
    [TRTCEvent.REMOTE_USER_ENTER]: [{
        userId: string;
    }];
    [TRTCEvent.REMOTE_USER_EXIT]: [{
        userId: string;
    }];
    [TRTCEvent.REMOTE_AUDIO_AVAILABLE]: [{
        userId: string;
    }];
    [TRTCEvent.REMOTE_AUDIO_UNAVAILABLE]: [{
        userId: string;
    }];
    [TRTCEvent.REMOTE_VIDEO_AVAILABLE]: [{
        userId: string;
        streamType: TRTCStreamType;
    }];
    [TRTCEvent.REMOTE_VIDEO_UNAVAILABLE]: [{
        userId: string;
        streamType: TRTCStreamType;
    }];
    [TRTCEvent.AUDIO_VOLUME]: [{
        result: {
            userId: string;
            volume: number;
        }[];
    }];
    [TRTCEvent.NETWORK_QUALITY]: [NetworkQuality];
    [TRTCEvent.CONNECTION_STATE_CHANGED]: [{
        prevState: ConnectionState;
        state: ConnectionState;
    }];
    [TRTCEvent.AUDIO_PLAY_STATE_CHANGED]: [{
        userId: string;
        state: PlayerState;
        reason: string;
    }];
    [TRTCEvent.VIDEO_PLAY_STATE_CHANGED]: [{
        userId: string;
        streamType: TRTCStreamType;
        state: PlayerState;
        reason: string;
    }];
    [TRTCEvent.SCREEN_SHARE_STOPPED]: [];
    [TRTCEvent.DEVICE_CHANGED]: [{
        type: TRTCDeviceType;
        action: TRTCDeviceAction;
        device: DeviceInfo;
    }];
    [TRTCEvent.PUBLISH_STATE_CHANGED]: [
        {
            mediaType: 'audio' | 'video' | 'screen';
            state: 'started' | 'stopped' | 'starting';
            prevState: 'started' | 'stopped' | 'starting';
            reason?: 'timeout' | 'error' | 'api-call';
            error?: RtcError;
        }
    ];
    [TRTCEvent.SEI_MESSAGE]: [{
        data: Uint8Array;
        userId: string;
        streamType: TRTCStreamType;
    }];
    [TRTCEvent.STATISTICS]: [statistics: TRTCStatistics];
    [TRTCEvent.TRACK]: [{
        userId: string;
        streamType?: TRTCStreamType;
        track: MediaStreamTrack;
    }];
}
export default TRTC