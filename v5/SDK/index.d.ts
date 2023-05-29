/// <reference path="./core.d.ts" />

	declare interface LocalVideoConfig {
	    view: string | HTMLElement | null;
	    publish?: boolean;
	    option?: {
	        cameraId?: string;
	        useFrontCamera?: boolean;
	        profile?: keyof typeof videoProfileMap | VideoProfile;
	        fillMode?: 'contain' | 'cover' | 'fill';
	        mirror?: boolean;
	        small?: keyof typeof videoProfileMap | VideoProfile;
	        qosPreference?: typeof TRTCType.QOS_PREFERENCE_SMOOTH | typeof TRTCType.QOS_PREFERENCE_CLEAR;
	        videoTrack?: MediaStreamTrack;
	    };
	}
	declare interface UpdateLocalVideoConfig extends Partial<LocalVideoConfig> {
	    mute?: boolean;
	}
	declare interface ProxyServer {
	    websocketProxy?: string;
	    loggerProxy?: string;
	    turnServer?: TurnServerOptions | TurnServerOptions[];
	    iceTransportPolicy?: RTCIceTransportPolicy;
	    webtransportProxy?: string;
	}
	declare interface EnterRoomConfig {
	    sdkAppId: number;
	    userId: string;
	    userSig: string;
	    roomId: number | string;
	    role?: UserRole;
	    autoReceiveAudio?: boolean;
	    autoReceiveVideo?: boolean;
	    privateMapKey?: string;
	    businessInfo?: string;
	    enableAutoPlayDialog?: boolean;
	    proxy?: ProxyServer | string;
	    scene?: Scene;
	    streamId?: string;
	    userDefineRecordId?: string;
	}
	declare interface ScreenShareConfig {
	    view?: string | HTMLElement | null;
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
	    view: string | HTMLElement | null;
	    userId: string;
	    streamType: TRTCStreamType;
	    option?: {
	        fillMode?: 'contain' | 'cover' | 'fill';
	        mirror?: boolean;
	        small?: boolean;
	    };
	}
	declare interface UpdateRemoteVideoConfig extends Omit<RemoteVideoConfig, 'view'> {
	    view?: string | HTMLElement | null;
	}
	declare interface StopRemoteVideoConfig {
	    userId: string;
	    streamType?: TRTCStreamType;
	}
	declare interface LocalAudioConfig {
	    publish?: boolean;
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
	declare interface TRTCMixUser extends Omit<MixUser, 'streamType'> {
	    streamType?: TRTCStreamType;
	}
	declare interface TRTCMixTranscodeConfig extends Omit<MixTranscodeConfig, 'mixUsers'> {
	    mixUsers: TRTCMixUser[];
	}
	declare interface TRTCPublishCDNParam extends Omit<PublishCDNStreamOptions, 'streamType'> {
	    streamType?: TRTCStreamType;
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
	 * **TRTC 常量**<br>
	 * @module TYPE
	 * @example
	 * // 使用方式：
	 * TRTC.TYPE.SCENE_LIVE
	 */
	declare const TRTCType: {
	    /**
	     * 直播场景
	     * @default 'live'
	     * @memberof module:TYPE
	     */
	    readonly SCENE_LIVE: Scene.LIVE;
	    /**
	     * 通话场景
	     * @default 'rtc'
	     * @memberof module:TYPE
	    */
	    readonly SCENE_RTC: Scene.RTC;
	    /**
	     * 主播角色
	     * @default 'anchor'
	     * @memberof module:TYPE
	     */
	    readonly ROLE_ANCHOR: UserRole.ANCHOR;
	    /**
	     * 观众角色
	     * @default 'audience'
	     * @memberof module:TYPE
	     */
	    readonly ROLE_AUDIENCE: UserRole.AUDIENCE;
	    /**
	     * 主流
	     *
	     * - TRTC 有主路视频流（主流）和辅路视频流（辅流）
	     * - 摄像头通过主流发布，屏幕分享通过辅流发布，一个房间内只能有一路辅流。
	     * - 主路视频流包括：高清大画面和低清小画面两种，默认情况下，{@link TRTC#startRemoteVideo TRTC.startRemoteVideo} 播放的是高清大画面，可以通过 small 参数播放低清小画面，参考：[开启大小流功能](./tutorial-27-advanced-small-stream.html)。
	     * @default 'main'
	     * @memberof module:TYPE
	     */
	    readonly STREAM_TYPE_MAIN: TRTCStreamType.Main;
	    /**
	     * 辅流
	     * @default 'sub'
	     * @memberof module:TYPE
	     */
	    readonly STREAM_TYPE_SUB: TRTCStreamType.Sub;
	    /**
	     * 标准音质
	    * | 音频 Profile | 采样率 | 声道 | 码率 (kbps) |
	    * | :---        | :---  | :--- | :---       |
	    * | TRTC.TYPE.AUDIO_PROFILE_STANDARD    | 48000 | 单声道| 40         |
	    * | TRTC.TYPE.AUDIO_PROFILE_HIGH        | 48000 | 单声道| 128        |
	    * | TRTC.TYPE.AUDIO_PROFILE_STANDARD_STEREO | 48000 | 双声道| 64        |
	    * | TRTC.TYPE.AUDIO_PROFILE_HIGH_STEREO | 48000 | 双声道| 192        |
	    * @default 'standard'
	    * @memberof module:TYPE
	    */
	    readonly AUDIO_PROFILE_STANDARD: "standard";
	    /**
	     * 标准音质立体声
	   * | 音频 Profile | 采样率 | 声道 | 码率 (kbps) |
	    * | :---        | :---  | :--- | :---       |
	    * | TRTC.TYPE.AUDIO_PROFILE_STANDARD    | 48000 | 单声道| 40         |
	    * | TRTC.TYPE.AUDIO_PROFILE_HIGH        | 48000 | 单声道| 128        |
	    * | TRTC.TYPE.AUDIO_PROFILE_STANDARD_STEREO | 48000 | 双声道| 64        |
	    * | TRTC.TYPE.AUDIO_PROFILE_HIGH_STEREO | 48000 | 双声道| 192        |
	    * @default 'standard-stereo'
	    * @memberof module:TYPE
	    */
	    readonly AUDIO_PROFILE_STANDARD_STEREO: "standard-stereo";
	    /**
	     * 高音质
	     * | 音频 Profile | 采样率 | 声道 | 码率 (kbps) |
	     * | :---        | :---  | :--- | :---       |
	     * | TRTC.TYPE.AUDIO_PROFILE_STANDARD    | 48000 | 单声道| 40         |
	     * | TRTC.TYPE.AUDIO_PROFILE_HIGH        | 48000 | 单声道| 128        |
	     * | TRTC.TYPE.AUDIO_PROFILE_STANDARD_STEREO | 48000 | 双声道| 64        |
	     * | TRTC.TYPE.AUDIO_PROFILE_HIGH_STEREO | 48000 | 双声道| 192        |
	    * @default 'high'
	    * @memberof module:TYPE
	    */
	    readonly AUDIO_PROFILE_HIGH: "high";
	    /**
	     * 高音质立体声
	     * | 音频 Profile | 采样率 | 声道 | 码率 (kbps) |
	     * | :---        | :---  | :--- | :---       |
	     * | TRTC.TYPE.AUDIO_PROFILE_STANDARD    | 48000 | 单声道| 40         |
	    * | TRTC.TYPE.AUDIO_PROFILE_HIGH        | 48000 | 单声道| 128        |
	    * | TRTC.TYPE.AUDIO_PROFILE_STANDARD_STEREO | 48000 | 双声道| 64        |
	    * | TRTC.TYPE.AUDIO_PROFILE_HIGH_STEREO | 48000 | 双声道| 192        |
	    * @default 'high-stereo'
	    * @memberof module:TYPE
	    */
	    readonly AUDIO_PROFILE_HIGH_STEREO: "high-stereo";
	    /**
	     * 弱网时，视频编码策略以流畅度优先，即优先保帧率。
	     * 摄像头默认流畅度优先，屏幕分享默认清晰度优先。
	    * @default 'smooth'
	    * @memberof module:TYPE
	    */
	    readonly QOS_PREFERENCE_SMOOTH: "smooth";
	    /**
	     * 弱网时，视频编码策略以清晰度优先，即优先保分辨率。
	     * 摄像头默认流畅度优先，屏幕分享默认清晰度优先。
	    * @default 'clear'
	    * @memberof module:TYPE
	    */
	    readonly QOS_PREFERENCE_CLEAR: "clear";
	};

	/**
	 * **TRTC事件列表**<br>
	 * <br>
	 * 通过 {@link TRTC#on trtc.on(TRTC.EVENT.XXX)} 监听指定的事件。您可以通过这些事件实现管理房间用户列表，以及管理用户的流状态，感知网络状态等功能，下面是事件的详细介绍。
	 * > !
	 * > - 事件需要在事件触发之前监听，这样才能收到相应的事件通知，因此建议在 trtc 进房前完成事件监听，这样才能确保不会漏掉事件通知。
	 * @module EVENT
	 * @example
	 * // 使用方式：
	 * trtc.on(TRTC.EVENT.ERROR, () => {});
	 */
	declare const TRTCEvent: {
	    /**
	     * 错误事件，非 API 调用错误，SDK 在运行过程中出现了不可恢复的错误时抛出。
	     *
	     * - 错误码(error.code)为：{@link module:ERROR_CODE.OPERATION_FAILED ErrorCode.OPERATION_FAILED}
	     * - 可能的扩展错误码(error.extraCode)：5501, 5502
	     * @default 'error'
	     * @memberof module:EVENT
	     * @see {@link RtcError RtcError}
	     * @e
	     * @example
	     *
	     * trtc.on(TRTC.EVENT.ERROR, error => {
	     *   console.error('client error observed: ' + error);
	     *   const errorCode = error.code;
	     *   const extraCode = error.extraCode;
	     * });
	     */
	    readonly ERROR: "error";
	    /**
	     * @description 自动播放失败，参考 [自动播放处理建议](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/tutorial-21-advanced-auto-play-policy.html)
	     * @default 'autoplay-failed'
	     * @memberof module:EVENT
	     * @example
	     * trtc.on(TRTC.EVENT.AUTOPLAY_FAILED, event => {
	     *   // 引导用户进行页面交互
	     * });
	     */
	    readonly AUTOPLAY_FAILED: "autoplay-failed";
	    /**
	     * @description 由于某种原因被踢出房间,包括kick:相同用户进房，banned:被管理员踢出,room_disband:房间被解散。
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
	     * 远端用户进房事件。
	     *
	     * - `live` 模式下，只有主播才有进退房通知，观众没有进退房通知，观众可以收到主播的进退房通知。
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
	     * 远端用户退房事件。
	     *
	     * - `live` 模式下，只有主播才有进退房通知，观众没有进退房通知，观众可以收到主播的进退房通知。
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
	     * 远端用户发布了音频。当远端用户打开麦克风后，您会收到该通知。参考：[开关摄像头、麦克风](./tutorial-15-basic-dynamic-add-video.html)
	     *
	     * - 默认情况下，SDK 会自动播放远端音频，您无需调用 API 来播放远端音频。可以监听该事件及 {@link module:EVENT.REMOTE_AUDIO_UNAVAILABLE REMOTE_AUDIO_UNAVAILABLE} 来更新“远端是否开启麦克风”的 UI icon。
	     * - 需要注意的是：如果用户在进房前没有与页面产生过交互，自动播放音频可能会因为【浏览器的自动播放策略限制】而失败，您需参考[自动播放受限处理建议](./tutorial-21-advanced-auto-play-policy.html)进行处理。
	     * - 若您不希望 SDK 自动播放音频，您可以在 {@link TRTC#enterRoom trtc.enterRoom()} 时设置 receiveMode = {@link module:TYPE.RECEIVE_MODE_MANUAL TRTC.TYPE.RECEIVE_MODE_MANUAL} 关闭自动播放音频。
	     * - 监听 {@link module:EVENT.REMOTE_AUDIO_AVAILABLE TRTC.EVENT.REMOTE_AUDIO_AVAILABLE} 事件，记录有远端音频的 userId，在需要播放音频时，调用 {@link TRTC#muteRemoteAudio trtc.muteRemoteAudio(userId, false)} 方法。
	     * @default 'remote-audio-available'
	     * @memberof module:EVENT
	     * @example
	     * // 在进房前监听
	     * trtc.on(TRTC.EVENT.REMOTE_AUDIO_AVAILABLE, event => {
	     *   const userId = event.userId;
	     * });
	     */
	    readonly REMOTE_AUDIO_AVAILABLE: "remote-audio-available";
	    /**
	     * 远端停止发布了音频。当远端用户关闭麦克风后，您会收到该通知。
	     *
	     * @default 'remote-audio-unavailable'
	     * @memberof module:EVENT
	     * @example
	     * // 在进房前监听
	     * trtc.on(TRTC.EVENT.REMOTE_AUDIO_UNAVAILABLE, event => {
	     *   const userId = event.userId;
	     *
	     * });
	     */
	    readonly REMOTE_AUDIO_UNAVAILABLE: "remote-audio-unavailable";
	    /**
	     * 远端用户发布了视频，当远端用户开启摄像头后，您会收到该通知。参考：[开关摄像头、麦克风](./tutorial-15-basic-dynamic-add-video.html)
	     *
	     * - 可以监听该事件及 {@link module:EVENT.REMOTE_VIDEO_UNAVAILABLE REMOTE_VIDEO_UNAVAILABLE} 来更新“远端是否开启摄像头”的 UI icon。
	     * @see {@link module:TYPE.STREAM_TYPE_MAIN STREAM_TYPE_MAIN}
	     * @see {@link module:TYPE.STREAM_TYPE_SUB STREAM_TYPE_SUB}
	     * @default 'remote-video-available'
	     * @memberof module:EVENT
	     * @example
	     * // 在进房前监听
	     * trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, event => {
	     *   const userId = event.userId;
	     *   const streamType = event.streamType;
	     *   trtc.startRemoteVideo({userId, streamType, view});
	     * });
	     */
	    readonly REMOTE_VIDEO_AVAILABLE: "remote-video-available";
	    /**
	     * 远端用户停止发布视频，当远端用户关闭摄像头后，您会收到该通知。
	     * @default 'remote-video-unavailable'
	     * @memberof module:EVENT
	     * @example
	     * // 在进房前监听
	     * trtc.on(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, event => {
	     *   const userId = event.userId;
	     *   const streamType = event.streamType;
	     *   // 此时 SDK 会自动停止播放，无需调用 stopRemoteVideo。
	     * });
	     */
	    readonly REMOTE_VIDEO_UNAVAILABLE: "remote-video-unavailable";
	    /**
	     * @description 音量大小事件<br>
	     * 调用 {@link Client#enableAudioVolumeEvaluation enableAudioVolumeEvaluation} 接口开启音量大小回调后，SDK 会定时抛出该事件，通知每个 userId 的音量大小。<br>
	     * **Note**
	     * - 回调中包含本地麦克风音量及远端用户的音量，无论是否有人说话，都会触发该回调。
	     * - 回调 event.result 会根据音量大小，按大到小进行排序。
	     * - 当 userId 为空串时，代表本地麦克风音量。
	     * - volume 取值为0-100的正整数
	     * @default 'audio-volume'
	     * @memberof module:EVENT
	     * @example
	     * trtc.on(TRTC.EVENT.AUDIO_VOLUME, event => {
	     *    event.result.forEach(({ userId, volume }) => {
	     *        const isMe = userId === ''; // 当 userId 为空串时，代表本地麦克风音量。
	     *        if (isMe) {
	     *            console.log(`my volume: ${volume}`);
	     *        } else {
	     *            console.log(`user: ${userId} volume: ${volume}`);
	     *        }
	     *    })
	     * });
	     *
	     * // 开启音量回调，并设置每 1000ms 触发一次事件
	     * trtc.enableAudioVolumeEvaluation(1000);
	     */
	    readonly AUDIO_VOLUME: "audio-volume";
	    /**
	     * @description 网络质量统计数据事件，进房后开始统计，每两秒触发一次，该数据反映的是您本地的上、下行的网络质量。
	     * - 上行网络质量（uplinkNetworkQuality）指的是您上传本地流的网络情况（SDK 到腾讯云的上行连接网络质量）
	     * - 下行网络质量（downlinkNetworkQuality）指的是您下载所有流的平均网络情况（腾讯云到 SDK 的所有下行连接的平均网络质量）
	     *
	     *    其枚举值及含义如下表所示：
	     *    | 数值 | 含义 |
	     *    | :--- | :---- |
	     *    | 0 | 网络状况未知，表示当前 client 实例还没有建立上行/下行连接 |
	     *    | 1 | 网络状况极佳 |
	     *    | 2 | 网络状况较好|
	     *    | 3 | 网络状况一般 |
	     *    | 4 | 网络状况差 |
	     *    | 5 | 网络状况极差 |
	     *    | 6 | 网络连接已断开<br/>注意：若下行网络质量为此值，则表示所有下行连接都断开了 |
	     * - uplinkRTT，uplinkLoss 为上行 RTT(ms) 及上行丢包率。
	     * - downlinkRTT，downlinkLoss 为所有下行连接的平均 RTT(ms) 及平均丢包率。
	     *
	     * **Note**
	     * - 如果您想知道对方的上下行网络情况，需要把对方的网络质量情况通过 IM 广播出去。
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
	     * @description SDK 和腾讯云的连接状态变更事件，您可以利用该事件从总体上监听 SDK 与腾讯云的连接状态。<br>
	     * - 'DISCONNECTED'：连接断开
	     * - 'CONNECTING'：正在连接中
	     * - 'CONNECTED'：已连接
	     *
	     * 不同状态变更的含义：
	     *
	     * - DISCONNECTED -> CONNECTING: 正在尝试建立连接，调用进房接口或者 SDK 自动重连时触发。
	     * - CONNECTING -> DISCONNECTED: 连接建立失败，当正在连接时调用退房接口中断连接或者经过 SDK 重试后任然连接失败时触发。
	     * - CONNECTING -> CONNECTED: 连接建立成功，连接成功时触发。
	     * - CONNECTED -> DISCONNECTED: 连接中断，调用退房接口或者当网络异常导致连接断开时触发。
	     *
	     * 处理建议：可以监听该事件，在不同状态显示不同的 UI，提醒用户当前的连接状态。
	     *
	     * @default 'connection-state-changed'
	     * @memberof module:EVENT
	     * @example
	     * client.on(TRTC.CONNECTION_STATE_CHANGED, event => {
	     *   const prevState = event.prevState;
	     *   const curState = event.state;
	     * });
	     */
	    readonly CONNECTION_STATE_CHANGED: "connection-state-changed";
	    /**
	     * @description 音频播放状态变更事件
	     *
	     * event.userId 当 userId 为空串时，代表本地用户，非空串代表远端用户。
	     *
	     * event.state 取值如下：
	     * - 'PLAYING'：开始播放
	     *   - event.reason 为 'playing' 或者 'unmute'。
	     * - 'PAUSED'：暂停播放
	     *   - event.reason 为 'pause' 时，由 \<audio\> element 的 pause 事件触发，如下几种情况会触发：
	     *      - 调用 HTMLMediaElement.pause 接口。
	     *   - event.reason 为 'mute' 时。详见事件 {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/mute_event | MediaStreamTrack.mute_event}
	     *      - 若 userId 为自己时 触发该事件，表明音频采集暂停，通常是设备异常引起，如设备被其他应用抢占，此时需引导用户重新采集。
	     *      - 若 userId 为他人时 触发该事件，表明收到的音频数据不足以播放。通常是网络抖动引起，接入侧无需做任何处理。当收到的数据足以播放时，会自动恢复。
	     * - 'STOPPED'：停止播放
	     *   - event.reason 为 'ended'。
	     *
	     * event.reason 状态变化的原因，取值如下：
	     * - 'playing'：开始播放，详见事件 {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event | HTMLMediaElement.playing_event}
	     * - 'mute'：音频轨道暂时未能提供数据，详见事件 {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/mute_event | MediaStreamTrack.mute_event}
	     * - 'unmute'：音频轨道恢复提供数据，详见事件 {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/unmute_event | MediaStreamTrack.unmute_event}
	     * - 'ended'：音频轨道已被关闭
	     * - 'pause'：播放暂停
	     * @default 'audio-play-state-changed'
	     * @memberof module:EVENT
	     * @example
	     * trtc.on(TRTC.EVENT.AUDIO_PLAY_STATE_CHANGED, event => {
	     *   console.log(`${event.userId} player is ${event.state} because of ${event.reason}`);
	     * });
	     */
	    readonly AUDIO_PLAY_STATE_CHANGED: "audio-play-state-changed";
	    /**
	     * @description 视频播放状态变更事件
	     *
	     * event.userId 当 userId 为空串时，代表本地用户，非空串代表远端用户。
	     *
	     * event.streamType 流类型，取值：{@link module:TYPE.STREAM_TYPE_MAIN TRTC.TYPE.STREAM_TYPE_MAIN} {@link module:TYPE.STREAM_TYPE_SUB TRTC.TYPE.STREAM_TYPE_SUB}
	     *
	     * event.state 取值如下：
	     * - 'PLAYING'：开始播放
	     *   - event.reason 为 'playing' 或者 'unmute'。
	     * - 'PAUSED'：暂停播放
	     *   - event.reason 为 'pause' 时，由 \<video\> element 的 pause 事件触发，如下几种情况会触发：
	     *      - 调用 HTMLMediaElement.pause 接口。
	     *      - 在播放成功后，从 DOM 中移除了播放视频的 view 容器。
	     *   - event.reason 为 'mute' 时。详见事件 {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/mute_event | MediaStreamTrack.mute_event}
	     *      - 若 userId 为自己时 触发该事件，表明视频采集暂停，通常是设备异常引起，如设备被其他应用抢占，此时需引导用户重新采集。
	     *      - 若 userId 为他人时 触发该事件，表明收到的视频数据不足以播放。通常是网络抖动引起，接入侧无需做任何处理。当收到的数据足以播放时，会自动恢复。
	     * - 'STOPPED'：停止播放
	     *   - event.reason 为 'ended'。
	     *
	     * event.reason 状态变化的原因，取值如下：
	     * - 'playing'：开始播放，详见事件 {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event | HTMLMediaElement.playing_event}
	     * - 'mute'：视频轨道暂时未能提供数据，详见事件 {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/mute_event | MediaStreamTrack.mute_event}
	     * - 'unmute'：视频轨道恢复提供数据，详见事件 {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/unmute_event | MediaStreamTrack.unmute_event}
	     * - 'ended'：视频轨道已被关闭
	     * - 'pause'：播放暂停
	     * @default 'video-play-state-changed'
	     * @memberof module:EVENT
	     * @example
	     * trtc.on(TRTC.EVENT.VIDEO_PLAY_STATE_CHANGED, event => {
	     *   console.log(`${event.userId} ${event.streamType} video player is ${event.state} because of ${event.reason}`);
	     * });
	     */
	    readonly VIDEO_PLAY_STATE_CHANGED: "video-play-state-changed";
	    /**
	     * @description 本地屏幕分享停止事件通知，仅对本地屏幕分享流有效。
	     * @default 'screen-sharing-stopped'
	     * @memberof module:EVENT
	     * @example
	     * trtc.on(TRTC.EVENT.SCREEN_SHARE_STOPPED, () => {
	     *   console.log('screen sharing was stopped');
	     * });
	     */
	    readonly SCREEN_SHARE_STOPPED: "screen-share-stopped";
	    /**
	     * @description 摄像头、麦克风等设备变化的通知事件。
	     * - event.device 是一个 [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) 对象，属性：
	     *    - deviceId：设备 Id
	     *    - label：设备描述信息
	     *    - groupId：设备 groupId
	     * - event.type 值：`'camera'|'microphone'|'speaker'`
	     * - event.action 值：
	     *    - 'add' 设备已添加。
	     *    - 'remove' 设备已被移除。
	     *    - 'active' 设备已启动，例如：startLocalVideo 成功后，会触发该事件。
	     * @default 'device-changed'
	     * @memberof module:EVENT
	     * @example
	     * trtc.on(TRTC.EVENT.DEVICE_CHANGED, (event) => {
	     *   console.log(`${event.type}(${event.device.label}) ${event.action}`);
	     * });
	     */
	    readonly DEVICE_CHANGED: "device-changed";
	    /**
	     * @description 推流状态变更事件。
	     * - event.mediaType 媒体类型，值：`'audio'|'video'|'screen'`。
	     * - event.state 当前的推流状态，值：
	     *    - `'starting'` 正在尝试推流
	     *    - `'started'` 推流成功
	     *    - `'stopped'` 推流停止，原因见 event.reason 字段
	     * - event.prevState 上一次事件触发时的推流状态，值和 event.state 相同。
	     * - event.reason 推流状态变为 `'stopped'` 的原因，值：
	     *    - `'timeout'` 推流超时，一般是由于网络抖动、防火墙拦截导致。SDK 会不断进行重试，业务侧可以在此时引导用户检查网络、更换网络。
	     *    - `'error'` 推流出错，此时可从 event.error 中获取到具体错误信息，一般是由于浏览器不支持 H264 编码导致。
	     *    - `'api-call'` 业务侧 api 调用导致推流停止，例如在 startLocalVideo 推流成功前，调用了 stopLocalVideo 停止了推流，属于正常行为，业务侧无需关注。
	     * - event.error event.reason 为 `'error'` 时的错误信息。
	     * @default 'publish-state-changed'
	     * @memberof module:EVENT
	     * @example
	     * trtc.on(TRTC.EVENT.PUBLISH_STATE_CHANGED, (event) => {
	     *   console.log(`${event.mediaType} ${event.state} ${event.reason}`);
	     * });
	     */
	    readonly PUBLISH_STATE_CHANGED: "publish-state-changed";
	};
	declare interface TRTCEventTypes {
	    [TRTCEvent.ERROR]: [RtcError];
	    [TRTCEvent.AUTOPLAY_FAILED]: [];
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
	}
 class TRTC extends EventEmitter<TRTCEventTypes> {
	    /**
	     * 创建一个 TRTC 对象，用于实现进房、预览、推流、拉流等功能。<br>
	     *
	     * **注意：**
	     * - 您必须先创建 TRTC 对象，通过调用此对象方法和监听此对象事件才能实现业务所需要的各种功能。
	     * @example
	     * // 创建trtc对象
	     * const trtc = TRTC.create();
	     *
	     * @returns {TRTC} trtc对象
	     */
	    static create(): TRTC;
	    /**
	     * @typedef TurnServer
	     * @property {string} url TURN 服务器 url
	     * @property {string=} username TURN 服务器验证用户名
	     * @property {string=} credential TURN 服务器验证密码
	     * @property {string=} [credentialType=password] TURN 服务器验证密码类型
	     */
	    /**
	     * @typedef ProxyServer
	     * @property {string} [websocketProxy] websocket 信令服务代理
	     * @property {string} [loggerProxy] 日志上报服务代理
	     * @property {TurnServer[]} [turnServer] 音视频数据传输代理
	     * @property {'all'|'relay'} [iceTransportPolicy='all'] 'all' 优先直连 TRTC，连不通时尝试走 turn server。<br>
	     * 'relay' 强制走 turn server。
	     */
	    /**
	     * 进入一个音视频通话房间（以下简称"进房"）。<br>
	     * - 进房代表开始一个音视频通话会话，只有进房成功后才能和房间内的其他用户进行音视频通话。
	     * - 可以通过 {@link TRTC#startLocalVideo startLocalVideo()} 和  {@link TRTC#startLocalAudio startLocalAudio()}发布本地音视频流，发布成功后，房间内其他用户会收到
	     * {@link module:EVENT.REMOTE_AUDIO_AVAILABLE REMOTE_AUDIO_AVAILABLE} 和 {@link module:EVENT.REMOTE_VIDEO_AVAILABLE REMOTE_VIDEO_AVAILABLE} 事件通知。
	     * - 默认情况下 SDK 会自动播放远端音频，您需要在调用 {@link TRTC#startRemoteVideo startRemoteVideo()} 来播放远端视频画面。
	     *
	     * @param {object} options 进房参数
	     * @param {number} options.sdkAppId sdkAppId <br>
	     * 在 [实时音视频控制台](https://console.cloud.tencent.com/trtc) 单击 **应用管理** > **创建应用** 创建新应用之后，即可在 **应用信息** 中获取 sdkAppId 信息。
	     * @param {string} options.userId 用户ID <br>
	     * 建议限制长度为32字节，只允许包含大小写英文字母(a-zA-Z)、数字(0-9)及下划线和连词符。
	     * @param {string} options.userSig userSig 签名 <br>
	     * 计算 userSig 的方式请参考 [UserSig 相关](https://cloud.tencent.com/document/product/647/17275)。
	     * @param {number|string} options.roomId
	     * roomId 为 number 类型时，取值要求为 [1, 4294967294] 的整数;<br>
	     * roomId 为 string 类型时，限制长度为64字节，且仅支持以下范围的字符集：
	     * - 大小写英文字母（a-zA-Z）
	     * - 数字（0-9）
	     * - 空格 ! # $ % & ( ) + - : ; < = . > ? @ [ ] ^ _ { } | ~ ,
	      *
	      * <font color="red">注意：建议采用数字类型的 roomId，字符串类型的房间号 "123" 与 数字类型的房间号 123 不互通。</font>
	      * @param {string} [options.scene] 应用场景，目前支持以下两种场景：
	      * - {@link module:TYPE.SCENE_RTC TRTC.TYPE.SCENE_RTC}（默认）实时通话场景，该模式适合 1对1 的音视频通话，或者参会人数在 300 人以内的在线会议。[支持最大50人同时开麦](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/tutorial-04-info-uplink-limits.html)。
	      * - {@link module:TYPE.SCENE_LIVE TRTC.TYPE.SCENE_LIVE} 互动直播场景，该模式适合十万人以内的在线直播场景，但需要您在接下来介绍的 options 参数中指定 角色(role) 这个字段
	     * @param {string=} [options.role] 用户角色，仅在 {@link module:TYPE.SCENE_LIVE TRTC.TYPE.SCENE_LIVE} 场景下有意义，{@link module:TYPE.SCENE_RTC TRTC.TYPE.SCENE_RTC} 场景无需指定 role，目前支持两种角色：
	     * - {@link module:TYPE.ROLE_ANCHOR TRTC.TYPE.ROLE_ANCHOR}（默认） 主播
	     * - {@link module:TYPE.ROLE_AUDIENCE TRTC.TYPE.ROLE_AUDIENCE} 观众
	     * <br>
	     * 注意：观众角色没有发布本地音视频的权限，只有收看远端流的权限。如果观众想要连麦跟主播互动，
	     * 请先通过 {@link TRTC#switchRole switchRole()} 切换角色到主播后再发布本地音视频。
	     * @param {boolean} [options.autoReceiveAudio=true] 是否自动接收音频。当远端用户发布音频后，SDK 自动播放远端用户的音频。
	     * @param {boolean} [options.autoReceiveVideo=true] 是否自动接收视频。当远端用户发布视频后，SDK 自动拉流并解码远端视频，您需要调用 {@link TRTC#startRemoteVideo startRemoteVideo} 播放远端视频。
	     * @param {boolean} [options.enableAutoPlayDialog] 是否开启 SDK 自动播放失败弹窗，默认：true。
	     * - 默认开启，当出现自动播放失败时，SDK 会弹窗引导用户点击页面，来恢复音视频播放。
	     * - 可设置为 false 关闭，建议接入侧参考 [自动播放受限处理建议](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-21-advanced-auto-play-policy.html) 来处理自动播放失败相关问题。
	     * @param {string=} options.streamId 用于设置在腾讯云直播平台上的 streamId（选填）。
	     * - 【推荐取值】限制长度为64字节，可以不填写。一种推荐的方案是使用 sdkappid_roomid_userid_main 作为 streamid，这种命名方式容易辨认且不会在您的多个应用中发生冲突。
	     * - 【参考文档】[CDN 旁路直播](https://cloud.tencent.com/document/product/647/16826)。
	     * @param {string=} options.userDefineRecordId 用于设置云端录制的 userDefineRecordId(选填）。
	     * - 【推荐取值】限制长度为64字节，只允许包含大小写英文字母（a-zA-Z）、数字（0-9）及下划线和连词符。
	     * - 【参考文档】[云端录制](https://cloud.tencent.com/document/product/647/16823)。
	     * @param {string|ProxyServer} [options.proxy] 设置代理服务器
	     * @throws
	     * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	     * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	     * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	     * - {@link module:ERROR_CODE.ENV_NOT_SUPPORTED ENV_NOT_SUPPORTED}
	     * - {@link module:ERROR_CODE.SERVER_ERROR SERVER_ERROR}
	     * @example
	     * const trtc = TRTC.create();
	     * await trtc.enterRoom({ roomId: 8888, sdkAppId, userId, userSig });
	     */
	    enterRoom(params: EnterRoomConfig): Promise<void>;
	    /**
	     * 退出当前音视频通话房间。
	     * - 退房后将会关闭和远端用户的连接，不再接收和播放远端用户音视频，并且停止本地音视频的发布。
	     * - 本地摄像头和麦克风的采集和预览不会因此而停止。您可以调用 {@link TRTC#stopLocalVideo stopLocalVideo()} 和 {@link TRTC#stopLocalAudio stopLocalAudio()} 停止本地音视频采集。
	     * @throws {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	     * @memberof TRTC
	     * @example
	     * await trtc.exitRoom();
	     */
	    exitRoom(): Promise<void>;
	    /**
	   * 切换用户角色，仅在 TRTC.TYPE.SCENE_LIVE 互动直播模式下生效。
	   *
	   * 互动直播模式下，一个用户可能需要在“观众”和“主播”之间来回切换。
	   * 您可以通过 {@link TRTC#enterRoom enterRoom()} 中的 role 字段确定角色，也可以通过 switchRole 在进房后切换角色。
	   * - 观众切换为主播，调用 trtc.switchRole(TRTC.TYPE.ROLE_ANCHOR) 将用户角色转换为 TRTC.TYPE.ROLE_ANCHOR 主播角色，之后按需调用 {@link TRTC#startLocalVideo startLocalVideo()} 和 {@link TRTC#startLocalAudio startLocalAudio()} 发布本地音视频。
	   * - 主播切换为观众，调用 trtc.switchRole(TRTC.TYPE.ROLE_AUDIENCE) 将用户角色转换为 TRTC.TYPE.ROLE_AUDIENCE 观众角色，此时如果有已发布的本地音视频，SDK 会取消发布本地音视频。
	   * > !
	   * > - 该接口需要在进房成功后才可以调用。
	   * > - 关闭摄像头和麦克风后，建议及时切换成观众角色，避免主播角色占用 50路上行的资源。
	   * @param {string} role 用户角色
	   * - TRTC.TYPE.ROLE_ANCHOR 主播，可以发布本地音视频，单个房间里最多支持 50 个主播同时发布本地音视频。
	   * - TRTC.TYPE.ROLE_AUDIENCE 观众，不能发布本地音视频，只能观看远端流，单个房间里的观众人数没有上限。
	   * @throws
	   * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	   * - {@link module:ERROR_CODE.INVALID_OPERATION INVALID_OPERATION}
	   * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	   * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	   * - {@link module:ERROR_CODE.SERVER_ERROR SERVER_ERROR}
	   * @memberof TRTC
	   * @example
	   * // 进房成功后
	   * // TRTC.TYPE.SCENE_LIVE 互动直播模式下，观众切换为主播
	   * await trtc.switchRole(TRTC.TYPE.ROLE_ANCHOR);
	   * // 观众角色切换为主播，开始推流
	   * await trtc.startLocalVideo();
	   *
	   * // TRTC.TYPE.SCENE_LIVE 互动直播模式下，主播切换为观众
	   * await trtc.switchRole(TRTC.TYPE.ROLE_AUDIENCE);
	   */
	    switchRole(role: UserRole): Promise<void>;
	    /**
	     * 销毁 TRTC 实例 <br/>
	     *
	     * 在退房之后，若业务侧无需再使用 trtc 时，需调用该接口及时销毁 trtc 实例，释放相关资源。
	     *
	     * 注意：
	     *  - 销毁后的 trtc 实例不可再继续使用。
	     *  - 已进房的情况下，需先调用 {@link TRTC#exitRoom TRTC.exitRoom} 接口退房成功后，才能调用该接口销毁 trtc。
	     *
	     * @example
	     * // 通话结束时
	     * await trtc.exitRoom();
	     * // 若后续无需再使用该 trtc，则销毁 trtc，并释放引用。
	     * trtc.destroy();
	     * trtc = null;
	     * @throws {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	     * @memberof TRTC
	     */
	    destroy(): void;
	    /**
	    * 开启本地麦克风采集，并发布到当前的房间中。
	    * - 调用时机：进房前后均可调用，不可重复调用。
	    * - 一个 trtc 实例只能开启一路麦克风，若您需要在已经开启一路麦克风的情况下，再开启一路麦克风用于测试，可以创建多个 trtc 实例实现。
	    *
	    * @param {object} [config] - 配置项
	    * @param {boolean} [config.publish] - 是否将本地音频发布到房间中，默认为true。若在进房前调用该接口，并且 publish = true，则在进房后 SDK 会自动发布。
	    * @param {object} [config.option] - 本地音频选项
	    * @param {string} [config.option.microphoneId]- 指定使用哪个麦克风
	    * @param {MediaStreamTrack} [config.option.audioTrack] - 自定义采集的 audioTrack。若同时设置 microphoneId，audioTrack，则按优先级（microphoneId>audioTrack）进行采集。
	    * @param {number} [config.option.earMonitorVolume] - 设置耳返音量，取值[0, 100]，本地麦克风默认静音播放。
	    * @param {string} [config.option.profile] - 音频编码配置, 默认{@link module:TYPE.AUDIO_PROFILE_STANDARD TRTC.TYPE.AUDIO_PROFILE_STANDARD}
	    * @throws
	    * - {@link module:ERROR_CODE.ENV_NOT_SUPPORTED ENV_NOT_SUPPORTED}
	    * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	    * - {@link module:ERROR_CODE.DEVICE_ERROR DEVICE_ERROR}
	    * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	    * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	    * - {@link module:ERROR_CODE.SERVER_ERROR SERVER_ERROR}
	    * @example
	    * // 采集默认麦克风并发布
	    * await trtc.startLocalAudio();
	    * @example
	    * // 如下是测试麦克风音量的代码示例，可用于麦克风音量检测。
	    * trtc.enableAudioVolumeEvaluation();
	    * trtc.on(TRTC.EVENT.AUDIO_VOLUME, event => { });
	    * // 测试麦克风无需发布音频
	    * await trtc.startLocalAudio({ publish: false });
	    * // 测试完毕后，关闭麦克风
	    * await trtc.stopLocalAudio();
	    * @memberof TRTC
	    */
	    startLocalAudio(config?: LocalAudioConfig): Promise<void>;
	    /**
	    * 更新本地麦克风配置。
	    * - 调用时机：该接口需在 {@link TRTC#startLocalAudio startLocalAudio()} 成功后调用，可以多次调用。
	    * - 本方法采用增量更新方式：只更新传入的参数，不传入的参数保持不变。
	    * @param {object} [config]
	    * @param {boolean} [config.publish] - 是否将本地音频发布到房间中，默认为 true
	    * @param {boolean} [config.mute] - 静音麦克风。参考：[开关麦克风、摄像头](./tutorial-15-basic-dynamic-add-video.html)。
	    * @param {object} [config.option] - 本地音频配置
	    * @param {string} [config.option.microphoneId] - 指定使用哪个麦克风，用来切换麦克风。
	    * @param {MediaStreamTrack} [config.option.audioSource] - 自定义采集的 audioTrack，具体参考自定义采集指引
	    * @throws
	    * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	    * - {@link module:ERROR_CODE.DEVICE_ERROR DEVICE_ERROR}
	    * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	    * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	    * @example
	    * // 切换麦克风
	    * const microphoneList = await TRTC.getMicrophoneList();
	    * if (microphoneList[1]) {
	    *   await trtc.updateLocalAudio({ option: { microphoneId: microphoneList[1].deviceId }});
	    * }
	    * @memberof TRTC
	    */
	    updateLocalAudio(config: UpdateLocalAudioConfig): Promise<void>;
	    /**
	    * 停止本地麦克风的采集及发布。
	    * - 如果您只是想静音麦克风，请使用 updateLocalAudio({ mute: true })。参考：[开关麦克风、摄像头](./tutorial-15-basic-dynamic-add-video.html)。
	    * @throws {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	    * @example
	    * await trtc.stopLocalAudio();
	    * */
	    stopLocalAudio(): Promise<void>;
	    /**
	     * @typedef {object|string} VideoProfile - 本地视频流配置
	     *
	     * 视频配置参数,可以用字符串预设值或者自定义分辨率等参数
	    * | 视频 Profile | 分辨率（宽 x 高）| 帧率（fps）| 码率（kbps）| 备注 |
	    * | :---       | :---           | :---      | :---      | :--- |
	    * | 120p       | 160 x 120      | 15        | 200        ||
	    * | 180p       | 320 x 180      | 15        | 350       ||
	    * | 240p       | 320 x 240      | 15        | 400       ||
	    * | 360p       | 640 x 360      | 15        | 800       ||
	    * | 480p       | 640 x 480      | 15        | 900       ||
	    * | 720p       | 1280 x 720     | 15        | 1500      ||
	    * | 1080p      | 1920 x 1080    | 15        | 2000      ||
	    * | 1440p      | 2560 x 1440    | 30        | 4860      ||
	    * | 4K         | 3840 x 2160    | 30        | 9000      ||
	     * @property {number} width - 视频宽度
	     * @property {number} height - 视频高度
	     * @property {number} frameRate - 视频帧率
	     * @property {number} bitrate - 视频码率
	    * @example
	    * const config = {
	    *  option: {
	    *   profile: '480p',
	    *  },
	    * }
	    * await trtc.startLocalVideo(config);
	    * @example
	    * const config = {
	    *  option: {
	    *    profile: {
	    *      width: 640,
	    *      height: 480,
	    *      frameRate: 15,
	    *      bitrate: 900,
	    *    }
	    *  }
	    * }
	    * await trtc.startLocalVideo(config);
	    */
	    /**
	    * 开启本地摄像头采集，在您指定的 HTMLElement 标签下播放摄像头画面，并将摄像头画面发布到当前所在房间中。
	    * - 调用时机：进房前后均可调用，不可重复调用。
	    * - 一个 trtc 实例只能开启一路摄像头。若您需要在已经开启一路摄像头的情况下，再开启一路摄像头用于测试，可以创建多个 trtc 实例实现。
	    *
	    * @param {object} [config]
	    * @param {string | HTMLElement | null} [config.view] - 本地视频预览的 HTMLElement 实例或者 Id， 如果不传或传入 null， 则不会播放视频。
	    * @param {boolean} [config.publish] - 是否将本地视频发布到房间中。默认为 true，若在进房前调用该接口，SDK 会在进房成功后自动发布（若 publish=true）。
	    * @param {object} [config.option] - 本地视频配置
	    * @param {string} [config.option.cameraId] - 指定使用哪个摄像头，用于切换摄像头。
	    * @param {boolean} [config.option.useFrontCamera] - 是否使用前置摄像头
	    * @param {MediaStreamTrack} [config.option.videoTrack] - 自定义采集的 videoTrack。若同时设置 cameraId，useFrontCamera，videoTrack，则按优先级（cameraId>useFrontCamera>videoTrack）进行采集。
	    * @param {boolean} [config.option.mirror] - 是否开启本地预览镜像，默认为 true。
	    * @param {'contain' | 'cover' | 'fill'} [config.option.fillMode] - 视频填充模式。默认为 `cover`。参考 {@link https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit CSS object-fit} 属性。
	    * @param {VideoProfile} [config.option.profile] - 视频大流编码参数。
	    * @param {VideoProfile} [config.option.small] - 视频小流编码参数。
	    * @param {QOS_PREFERENCE_SMOOTH|QOS_PREFERENCE_CLEAR} [config.option.qosPreference] - 设置弱网时，视频编码策略。（默认）流畅度优先（{@link module:TYPE.QOS_PREFERENCE_SMOOTH QOS_PREFERENCE_SMOOTH}）或 清晰度优先（{@link module:TYPE.QOS_PREFERENCE_CLEAR QOS_PREFERENCE_CLEAR}）
	    * @throws
	    * - {@link module:ERROR_CODE.ENV_NOT_SUPPORTED ENV_NOT_SUPPORTED}
	    * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	    * - {@link module:ERROR_CODE.DEVICE_ERROR DEVICE_ERROR}
	    * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	    * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	    * - {@link module:ERROR_CODE.SERVER_ERROR SERVER_ERROR}
	    * @example <caption>示例 1：预览及发布摄像头</caption>
	    * // 预览及发布摄像头
	    * await trtc.startLocalVideo({
	    *   view: document.getElementById('localVideo'), // 在 DOM 中的 elementId 为 localVideo 的标签上预览视频。
	    * });
	    * @example <caption>示例 2：测试摄像头——只预览不发布</caption>
	    * // 只预览摄像头画面、不发布。可用于做摄像头测试。
	    * const config = {
	    *   view: document.getElementById('localVideo'), // 在 DOM 中的 elementId 为 localVideo 的标签上预览视频。
	    *   publish: false // 不发布摄像头
	    * }
	    * await trtc.startLocalVideo(config);
	    * // 当需要发布视频时调用 updateLocalVideo
	    * await trtc.updateLocalVideo({ publish:true });
	    * @example <caption>示例 3：预览及发布指定的摄像头</caption>
	    * // 使用指定的摄像头。
	    * const cameraList = await TRTC.getCameraList();
	    * if (cameraList[0]) {
	    *   await trtc.startLocalVideo({
	    *     view: document.getElementById('localVideo'), // 在 DOM 中的 elementId 为 localVideo 的标签上预览视频。
	    *     option: {
	    *       cameraId: cameraList[0].deviceId,
	    *     }
	    *   });
	    * }
	    * @memberof TRTC
	    */
	    startLocalVideo(config?: LocalVideoConfig): Promise<void>;
	    /**
	    * 更新本地摄像头配置。
	    * - 该接口需在 {@link TRTC#startLocalVideo startLocalVideo()} 成功后调用。
	    * - 该接口可以多次调用。
	    * - 本方法采用增量更新方式：只更新传入的参数，不传入的参数保持不变。
	    * @param {object} [config]
	    * @param {string | HTMLElement | null} [config.view] - 预览摄像头的 HTMLElement 实例或者 Id， 如果不传或传入null， 则不会渲染视频， 但会仍然会推流消耗带宽的容器
	    * @param {boolean} [config.publish] - 是否将本地视频发布到房间中。默认为 true，若在进房前调用该接口，SDK 会在进房成功后自动发布。
	    * @param {boolean} [config.mute] - 是否暂停摄像头采集，参考：[开关麦克风、摄像头](./tutorial-15-basic-dynamic-add-video.html)
	    * @param {object} [config.option] - 本地视频配置
	    * @param {string} [config.option.cameraId] - 指定使用哪个摄像头，
	    * @param {boolean} [config.option.useFrontCamera] - 是否使用前置摄像头
	    * @param {MediaStreamTrack} [config.option.videoTrack] - 自定义采集的 videoTrack
	    * @param {boolean} [config.option.mirror] - 是否开启镜像
	    * @param {'contain' | 'cover' | 'fill'} [config.option.fillMode] - 视频填充模式。参考 {@link https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit| CSS object-fit} 属性
	    * @param {VideoProfile} [config.option.profile] - 视频大流编码参数
	    * @param {VideoProfile} [config.option.small] - 视频小流编码参数
	    * @param {QOS_PREFERENCE_SMOOTH|QOS_PREFERENCE_CLEAR} [config.option.qosPreference] - 设置弱网时，视频编码策略。（默认）流畅度优先（{@link module:TYPE.QOS_PREFERENCE_SMOOTH QOS_PREFERENCE_SMOOTH}）或 清晰度优先（{@link module:TYPE.QOS_PREFERENCE_CLEAR QOS_PREFERENCE_SMOOTH}）
	    * @throws
	    * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	    * - {@link module:ERROR_CODE.DEVICE_ERROR DEVICE_ERROR}
	    * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	    * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	    * @example <caption>示例 1：动态切换摄像头</caption>
	    * // 切换摄像头
	    * const cameraList = await TRTC.getCameraList();
	    * if (cameraList[1]) {
	    *   await trtc.updateLocalVideo({ option: { cameraId: cameraList[1].deviceId }});
	    * }
	    * @example <caption>示例 2：停止发布视频，但保持本地预览</caption>
	    * // 停止发布视频，但保持本地预览
	    * await trtc.updateLocalVideo({ publish:false });
	    * @memberof TRTC
	    */
	    updateLocalVideo(config: UpdateLocalVideoConfig): Promise<void>;
	    /**
	    * 停止本地摄像头的采集、预览及发布。
	    * - 如果希望仅停止发布视频但保留本地摄像头预览，可以使用{@link TRTC#updateLocalVideo updateLocalVideo({ publish:false })}方法。<br>
	    * @throws {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	    * @example
	    * await trtc.stopLocalVideo();
	    * */
	    stopLocalVideo(): Promise<void>;
	    /**
	     * @typedef {object|string} ScreenShareProfile - 屏幕分享分辨率码率帧率配置
	   * 屏幕分享配置参数,可以用字符串预设值或者自定义分辨率等参数
	   * | 屏幕 Profile | 分辨率（宽 x 高）| 帧率（fps）| 码率 (kbps) |
	    * | :---       | :---           | :---      | :---        |
	    * | 480p       | 640 x 480      | 5         | 900         |
	    * | 480p_2     | 640 x 480      | 30        | 1000        |
	    * | 720p       | 1280 x 720     | 5         | 1200        |
	    * | 720p_2     | 1280 x 720     | 30        | 3000        |
	    * | 1080p      | 1920 x 1080    | 5         | 1600        |
	    * | 1080p_2    | 1920 x 1080    | 30        | 4000        |
	    * - 屏幕分享默认使用 `1080p`。
	    * - 若以上 Profile 不能满足您的业务需求，您也可以指定自定义的分辨率、帧率和码率。
	    *
	     * @property {number} width - 屏幕分享宽度
	     * @property {number} height - 屏幕分享高度
	     * @property {number} frameRate - 屏幕分享帧率
	     * @property {number} bitrate - 屏幕分享码率
	    * @example
	    * const config = {
	    *  option: {
	    *   profile: '720p',
	    *  },
	    * }
	    * await trtc.startScreenShare(config);
	   */
	    /**
	    * 开启屏幕分享。
	    *
	    * - 开启屏幕分享后，房间内其他用户会收到 {@link module:EVENT.REMOTE_VIDEO_AVAILABLE REMOTE_VIDEO_AVAILABLE} 事件，streamType 为 {@link module:TYPE.STREAM_TYPE_SUB STREAM_TYPE_SUB}，其他用户可以通过 {@link TRTC#startRemoteVideo startRemoteVideo} 播放屏幕分享。
	    * @param {object} [config]
	    * @param {string | HTMLElement | null} [config.view] - 预览本地屏幕分享的 HTMLElement 实例或 Id， 如果不传或传入 null， 则不会渲染本地屏幕分享。
	    * @param {boolean} [config.publish] - 是否将屏幕分享发布到房间中。默认为 true，若在进房前调用该接口，SDK 会在进房成功后自动发布。
	    * @param {object} [config.option] - 屏幕分享配置
	    * @param {boolean} [config.option.systemAudio] - 是否采集系统声音，默认为 false。
	    * @param {'contain' | 'cover' | 'fill'} [config.option.fillMode] - 视频填充模式。默认为 `contain`，参考 {@link https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit CSS object-fit} 属性。
	    * @param {ScreenShareProfile} [config.option.profile] - 屏幕分享编码配置。
	    * @param {QOS_PREFERENCE_SMOOTH|QOS_PREFERENCE_CLEAR} [config.option.qosPreference] - 设置弱网时，视频编码策略。流畅度优先（{@link module:TYPE.QOS_PREFERENCE_SMOOTH QOS_PREFERENCE_SMOOTH}）或 （默认）清晰度优先（{@link module:TYPE.QOS_PREFERENCE_CLEAR QOS_PREFERENCE_CLEAR}）
	    * @throws
	    * - {@link module:ERROR_CODE.ENV_NOT_SUPPORTED ENV_NOT_SUPPORTED}
	    * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	    * - {@link module:ERROR_CODE.DEVICE_ERROR DEVICE_ERROR}
	    * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	    * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	    * - {@link module:ERROR_CODE.SERVER_ERROR SERVER_ERROR}
	    * @example
	    * // 开始屏幕分享
	    * await trtc.startScreenShare();
	    * @memberof TRTC
	    */
	    startScreenShare(config?: ScreenShareConfig): Promise<void>;
	    /**
	    * 更新屏幕分享配置
	    * - 该接口需在 {@link TRTC#startScreenShare startScreenShare()} 成功后调用。
	    * - 该接口可以多次调用。
	    * - 本方法采用增量更新方式：只更新传入的参数，不传入的参数保持不变。
	    * @param {object} [config]
	    * @param {string | HTMLElement | null} [config.view] - 屏幕分享预览的 HTMLElement 实例或 Id， 如果不传或传入 null， 则不会渲染屏幕分享。
	    * @param {boolean} [config.publish] - 是否将屏幕分享发布到房间中
	    * @param {object} [config.option] - 屏幕分享配置
	    * @param {'contain' | 'cover' | 'fill'} [config.option.fillMode] - 视频填充模式。默认为 `contain`，参考 {@link https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit CSS object-fit} 属性。
	    * @param {QOS_PREFERENCE_SMOOTH|QOS_PREFERENCE_CLEAR} [config.option.qosPreference] - 设置弱网时，视频编码策略。流畅度优先（{@link module:TYPE.QOS_PREFERENCE_SMOOTH QOS_PREFERENCE_SMOOTH}）或 （默认）清晰度优先（{@link module:TYPE.QOS_PREFERENCE_CLEAR QOS_PREFERENCE_CLEAR}）
	    * @throws
	    * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	    * - {@link module:ERROR_CODE.DEVICE_ERROR DEVICE_ERROR}
	    * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	    * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	    * - {@link module:ERROR_CODE.SERVER_ERROR SERVER_ERROR}
	    * @example
	    * // 停止屏幕分享，但保持屏幕分享本地预览
	    * await trtc.updateScreenShare({publish:false});
	    * @memberof TRTC
	    */
	    updateScreenShare(config: UpdateScreenShareConfig): Promise<void>;
	    /**
	    * 停止屏幕分享。
	    * @throws {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	    * @example
	    * await trtc.stopScreenShare();
	    * */
	    stopScreenShare(): Promise<void>;
	    usePlugin(): void;
	    startPlugin(name: string, options: AudioSourceOptions): Promise<void>;
	    updatePlugin(name: string, option: any): void;
	    stopPlugin(name: string, options: any): Promise<void>;
	    /**
	    * 播放远端视频
	    *
	    * - 调用时机：在收到 {@link module:EVENT.REMOTE_VIDEO_AVAILABLE TRTC.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE)} 事件后调用。
	    * @param {object} [config]
	    * @param {string | HTMLElement | null} [config.view] - 用于播放远端视频的 HTMLElement 实例或者 Id， 如果不传或传入null， 则不会渲染视频， 但会仍然会拉流消耗带宽
	    * @param {string} config.userId - 远端用户Id
	    * @param {TRTC.TYPE.STREAM_TYPE_MAIN|TRTC.TYPE.STREAM_TYPE_SUB} config.streamType - 远端流类型
	    * - {@link module:TYPE.STREAM_TYPE_MAIN TRTC.TYPE.STREAM_TYPE_MAIN}: 主流（远端用户的摄像头）（远端用户的摄像头）
	    * - {@link module:TYPE.STREAM_TYPE_SUB TRTC.TYPE.STREAM_TYPE_SUB}: 辅流（远端用户的屏幕分享）
	    * @param {object} [config.option] - 远端视频配置
	    * @param {boolean} [config.option.small] - 是否拉小流
	    * @param {boolean} [config.option.mirror] - 是否开启镜像
	    * @param {'contain' | 'cover' | 'fill'} [config.option.fillMode] - 视频填充模式。参考 {@link https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit CSS object-fit} 属性。
	    * @throws
	    * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	    * - {@link module:ERROR_CODE.INVALID_OPERATION INVALID_OPERATION}
	    * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	    * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	    * - {@link module:ERROR_CODE.SERVER_ERROR SERVER_ERROR}
	    * @example
	    * trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
	    *   // 您需在 DOM 中提前放置视频容器，建议以 `${userId}_${streamType}` 作为 element id。
	    *   trtc.startRemoteVideo({ userId, streamType, view: `${userId}_${streamType}` });
	    * })
	    * @memberof TRTC
	    */
	    startRemoteVideo(config: RemoteVideoConfig): Promise<void>;
	    /**
	    * 更新远端视频播放配置<br>
	    * - 该方法需 {@link TRTC#startRemoteVideo startRemoteVideo} 成功后调用。
	    * - 该方法可多次调用。
	    * - 该方法采用增量更新的方式，只需要传入需要更新的配置项即可。
	    * @param {object} [config]
	    * @param {string | HTMLElement | null} [config.view] - 用于播放远端视频的 HTMLElement 实例或者 Id， 如果不传或传入null， 则不会渲染视频， 但会仍然会拉流消耗带宽
	    * @param {string} config.userId - 远端用户Id
	    * @param {TRTC.TYPE.STREAM_TYPE_MAIN|TRTC.TYPE.STREAM_TYPE_SUB} config.streamType - 远端流类型：
	    * - {@link module:TYPE.STREAM_TYPE_MAIN TRTC.TYPE.STREAM_TYPE_MAIN}: 主流（远端用户的摄像头）
	    * - {@link module:TYPE.STREAM_TYPE_SUB TRTC.TYPE.STREAM_TYPE_SUB}: 辅流（远端用户的屏幕分享）
	    * @param {object} [config.option] - 远端视频配置
	    * @param {boolean} [config.option.small] - 是否拉小流，参考：[开启大小流](./tutorial-27-advanced-small-stream.html)
	    * @param {boolean} [config.option.mirror] - 是否开启镜像
	    * @param {'contain' | 'cover' | 'fill'} [config.option.fillMode] - 视频填充模式。参考 {@link https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit CSS object-fit} 属性。
	    * @throws
	    * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	    * - {@link module:ERROR_CODE.INVALID_OPERATION INVALID_OPERATION}
	    * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	    * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	    * @example
	    * const config = {
	    *  view: document.getElementById(userId),
	    *  userId,
	    * }
	    * await trtc.updateRemoteVideo(config);
	    * @memberof TRTC
	    */
	    updateRemoteVideo(config: UpdateRemoteVideoConfig): Promise<void>;
	    /**
	    * 用于停止远端视频播放。<br>
	    * @param {object} config - 远端视频配置
	    * @param {string} config.userId - 远端用户 userId，'*' 代表所有用户。
	    * @param {TRTC.TYPE.STREAM_TYPE_MAIN|TRTC.TYPE.STREAM_TYPE_SUB} [config.streamType] - 远端流类型，当 userId 不为 '*' 时，该字段必填。
	    * - {@link module:TYPE.STREAM_TYPE_MAIN TRTC.TYPE.STREAM_TYPE_MAIN}: 主流（远端用户的摄像头）
	    * - {@link module:TYPE.STREAM_TYPE_SUB TRTC.TYPE.STREAM_TYPE_SUB}: 辅流（远端用户的屏幕分享）
	    * @throws {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	    * @example
	    * // 停止播放所有远端用户
	    * await trtc.stopRemoteVideo({ userId: '*' });
	    * */
	    stopRemoteVideo(config: StopRemoteVideoConfig): Promise<void>;
	    /**
	    * 静音某个远端用户，并且不再拉取该用户的音频数据。仅对当前用户有效，房间内的其他用户依然可以听到被静音用户的声音。<br>
	    *
	    * 注意：
	    * - 默认情况下，在进房后，SDK 会自动播放远端音频。您可以调用该接口将远端用户静音及取消静音。
	    * - 进房时如果传入参数 autoReceiveAudio = false，则不会自动播放远端音频。当需要播放音频时，需要调用该方法（mute 传入 false）播放远端音频。
	    * - 在进入房间（enterRoom）之前或之后调用本接口均生效，静音状态在退出房间（exitRoom）之后会被重置为 false。
	    * - 如果您希望继续拉取该用户的音频数据，仅仅是不播放，可以调用 setRemoteAudioVolume(userId, 0)
	    * @param {string} userId - 远端用户 userId，'*' 代表所有用户。
	    * @param {boolean} mute - 是否静音
	    * @throws
	    * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	    * - {@link module:ERROR_CODE.INVALID_OPERATION INVALID_OPERATION}
	    * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	    * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	    * @example
	    * // 静音所有远端用户
	    * await trtc.muteRemoteAudio('*', true);
	    * */
	    muteRemoteAudio(userId: string, mute: boolean): Promise<void>;
	    /**
	    * 用于控制远端音频的播放音量。<br>
	    *
	    * - 不支持 iOS Safari
	    * @param {string} userId - 远端用户 userId
	    * @param {number} volume - 音量大小，取值范围为0 - 100
	    * @example
	    * await trtc.setRemoteAudioVolume('123', 90);
	    * */
	    setRemoteAudioVolume(userId: string, volume: number): void;
	    /**
	   * 开启或关闭音量大小回调<br>
	   *
	   * - 开启此功能后，无论房间内是否有人说话，SDK 会定时抛出 {@link module:EVENT.AUDIO_VOLUME TRTC.on(TRTC.EVENT.AUDIO_VOLUME)} 事件，反馈每一个用户的的音量大小评估值。<br>
	   *
	   * @param {number} [interval=2000] 用于设置音量回调事件定时触发的时间间隔。默认为 2000(ms)，最小值为100(ms)。若设置小于等于0时，则关闭音量大小回调。
	   * @param {boolean} [enableInBackground=false] 出于性能的考虑，当页面切换到后台时，SDK 不会抛出音量回调事件。如需在页面切后台时接收音量回调事件，可设置该参数为 true。
	   * @memberof TRTC
	   * @example
	   * trtc.on(TRTC.EVENT.AUDIO_VOLUME, event => {
	   *    event.result.forEach(({ userId, volume }) => {
	   *        const isMe = userId === ''; // 当 userId 为空串时，代表本地麦克风音量。
	   *        if (isMe) {
	   *            console.log(`my volume: ${volume}`);
	   *        } else {
	   *            console.log(`user: ${userId} volume: ${volume}`);
	   *        }
	   *    })
	   * });
	   *
	   * // 开启音量回调，并设置每 1000ms 触发一次事件
	   * trtc.enableAudioVolumeEvaluation(1000);
	   *
	   * // 如需关闭音量回调，传入 interval 值小于等于0即可
	   * trtc.enableAudioVolumeEvaluation(-1);
	   */
	    enableAudioVolumeEvaluation(interval?: number, enableInBackground?: boolean): void;
	    /**
	    * 监听 TRTC 事件<br><br>
	    * 详细事件列表请参见：{@link module:EVENT TRTC.EVENT}
	    *
	    * @param {string} eventName 事件名
	    * @param {function} handler 事件回调函数
	    * @param {context} context 上下文
	    * @memberof TRTC
	    * @example
	    * trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, event => {
	    *   // REMOTE_VIDEO_AVAILABLE event handler
	    * });
	    */
	    on<T extends keyof TRTCEventTypes>(event: T, handler: (...args: TRTCEventTypes[T]) => void, context?: any): this;
	    /**
	     * 取消事件监听<br>
	     *
	     * @param {string} eventName 事件名，传入通配符 '*' 会解除所有事件监听。
	     * @param {function} handler 事件回调函数
	     * @param {context} context 上下文
	     * @memberof TRTC
	     * @example
	     * trtc.on(TRTC.EVENT.REMOTE_USER_ENTER, function peerJoinHandler(event) {
	     *   // REMOTE_USER_ENTER event handler
	     *   console.log('remote user enter');
	     *
	     *   trtc.off(TRTC.EVENT.REMOTE_USER_ENTER, peerJoinHandler);
	     * });
	     *
	     * // 解除所有事件绑定
	     * trtc.off('*');
	     */
	    off<T extends keyof TRTCEventTypes>(event: T | '*', handler: T extends '*' ? never : (...args: TRTCEventTypes[T]) => void, context?: any): this;
	    /**
	     * 获取视频轨道
	     *
	     * @param {string} [config] 不传则获取本地摄像头 videoTrack
	     * @param {string} [config.userId] 不传或传空串，代表获取本地的 videoTrack。传远端用户的 userId，代表获取远端用户的 videoTrack。
	     * @param {STREAM_TYPE_MAIN|STREAM_TYPE_SUB} [config.streamType] - 远端流类型：
	     * - {@link module:TYPE.STREAM_TYPE_MAIN TRTC.TYPE.STREAM_TYPE_MAIN}: 主流（远端用户的摄像头）（默认值）
	     * - {@link module:TYPE.STREAM_TYPE_SUB TRTC.TYPE.STREAM_TYPE_SUB}: 辅流（远端用户的屏幕分享）
	     * @returns {MediaStreamTrack|null} 视频轨道
	     * @memberof TRTC
	     * @example
	     * // 获取本地摄像头 videoTrack
	     * const videoTrack = trtc.getVideoTrack();
	     * // 获取本地屏幕分享 videoTrack
	     * const screenVideoTrack = trtc.getVideoTrack({ streamType: TRTC.TYPE.STREAM_TYPE_SUB });
	     * // 获取远端用户的主流 videoTrack
	     * const remoteMainVideoTrack = trtc.getVideoTrack({ userId: 'test', streamType: TRTC.TYPE.STREAM_TYPE_MAIN });
	     * // 获取远端用户的辅流 videoTrack
	     * const remoteSubVideoTrack = trtc.getVideoTrack({ userId: 'test', streamType: TRTC.TYPE.STREAM_TYPE_SUB });
	    */
	    getVideoTrack(config?: {
	        userId?: string;
	        streamType?: TRTCStreamType;
	    }): MediaStreamTrack | null;
	    /**
	     * 获取音频轨道
	     *
	     * @returns {MediaStreamTrack?} 音频轨道
	     * @param {string} [userId] 不传则获取本地的 audioTrack
	     * @memberof TRTC
	     */
	    getAudioTrack(userId?: string): MediaStreamTrack | null;
	    setCurrentSpeaker(speakerId: string): void;
	    static EVENT: {
	        readonly ERROR: "error";
	        readonly AUTOPLAY_FAILED: "autoplay-failed";
	        readonly KICKED_OUT: "kicked-out";
	        readonly REMOTE_USER_ENTER: "remote-user-enter";
	        readonly REMOTE_USER_EXIT: "remote-user-exit";
	        readonly REMOTE_AUDIO_AVAILABLE: "remote-audio-available";
	        readonly REMOTE_AUDIO_UNAVAILABLE: "remote-audio-unavailable";
	        readonly REMOTE_VIDEO_AVAILABLE: "remote-video-available";
	        readonly REMOTE_VIDEO_UNAVAILABLE: "remote-video-unavailable";
	        readonly AUDIO_VOLUME: "audio-volume";
	        readonly NETWORK_QUALITY: "network-quality";
	        readonly CONNECTION_STATE_CHANGED: "connection-state-changed";
	        readonly AUDIO_PLAY_STATE_CHANGED: "audio-play-state-changed";
	        readonly VIDEO_PLAY_STATE_CHANGED: "video-play-state-changed";
	        readonly SCREEN_SHARE_STOPPED: "screen-share-stopped";
	        readonly DEVICE_CHANGED: "device-changed";
	        readonly PUBLISH_STATE_CHANGED: "publish-state-changed";
	    };
	    static ERROR_CODE: {
	        INVALID_PARAMETER: number;
	        INVALID_OPERATION: number;
	        ENV_NOT_SUPPORTED: number;
	        DEVICE_ERROR: number;
	        SERVER_ERROR: number;
	        OPERATION_FAILED: number;
	        OPERATION_ABORT: number;
	        UNKNOWN_ERROR: number;
	    };
	    static TYPE: {
	        readonly SCENE_LIVE: Scene.LIVE;
	        readonly SCENE_RTC: Scene.RTC;
	        readonly ROLE_ANCHOR: UserRole.ANCHOR;
	        readonly ROLE_AUDIENCE: UserRole.AUDIENCE;
	        readonly STREAM_TYPE_MAIN: TRTCStreamType.Main;
	        readonly STREAM_TYPE_SUB: TRTCStreamType.Sub;
	        readonly AUDIO_PROFILE_STANDARD: "standard";
	        readonly AUDIO_PROFILE_STANDARD_STEREO: "standard-stereo";
	        readonly AUDIO_PROFILE_HIGH: "high";
	        readonly AUDIO_PROFILE_HIGH_STEREO: "high-stereo";
	        readonly QOS_PREFERENCE_SMOOTH: "smooth";
	        readonly QOS_PREFERENCE_CLEAR: "clear";
	    };
	    static frameWorkType: number;
	    /**
	     * 设置日志输出等级
	     * <br>
	     * 建议在开发测试阶段设置为 DEBUG 等级，该日志等级包含详细的提示信息。
	     * 默认输出 INFO 日志等级，该日志等级包含 SDK 主要功能的日志信息。
	     *
	     * @param {0-5} [level] 日志输出等级 0: TRACE 1: DEBUG 2: INFO 3: WARN 4: ERROR 5: NONE
	     * @param {boolean} [enableUploadLog=true] 是否开启日志上传，默认开启。不建议关闭，关闭后将影响问题排障。
	     * @example
	     * // 输出 DEBUG 以上日志等级
	     * TRTC.setLogLevel(1);
	     */
	    static setLogLevel(level: LOG_LEVEL, enableUploadLog?: boolean): void;
	    /**
	     * 检测 TRTC Web SDK 是否支持当前浏览器
	     *
	     * - 参考：[浏览器兼容情况](tutorial-05-info-browser.html)。
	     * @example
	     * TRTC.isSupported().then((checkResult) => {
	     *   if(!checkResult.result) {
	     *      console.log('checkResult', checkResult.result, 'checkDetail', checkResult.detail);
	     *      // SDK 不支持当前浏览器，引导用户使用最新版的 Chrome 浏览器。
	     *   }
	     * });
	     *
	     * @returns {Promise.<object>} Promise 返回检测结果
	     * | Property                                   | Type    | Description                         |
	     * |--------------------------------------------|---------|-------------------------------------|
	     * | checkResult.result                         | boolean | 检测结果                             |
	     * | checkResult.detail.isBrowserSupported      | boolean | 当前浏览器是否是 SDK 支持的浏览器        |
	     * | checkResult.detail.isWebRTCSupported       | boolean | 当前浏览器是否支持 WebRTC               |
	     * | checkResult.detail.isWebCodecsSupported    | boolean | 当前浏览器是否支持 WebCodecs            |
	     * | checkResult.detail.isMediaDevicesSupported | boolean | 当前浏览器是否支持获取媒体设备及媒体流     |
	     * | checkResult.detail.isScreenShareSupported | boolean | 当前浏览器是否支持屏幕分享    |
	     * | checkResult.detail.isSmallStreamSupported | boolean | 当前浏览器是否支持小流     |
	     * | checkResult.detail.isH264EncodeSupported   | boolean | 当前浏览器上行是否支持 H264 编码         |
	     * | checkResult.detail.isH264DecodeSupported   | boolean | 当前浏览器下行是否支持 H264 编码         |
	     * | checkResult.detail.isVp8EncodeSupported    | boolean | 当前浏览器上行是否支持 VP8 编码          |
	     * | checkResult.detail.isVp8DecodeSupported    | boolean | 当前浏览器下行是否支持 VP8 编码          |
	     */
	    static isSupported(): Promise<{
	        result: boolean;
	        detail: {
	            isBrowserSupported: boolean;
	            isWebRTCSupported: boolean;
	            isWebCodecsSupported: boolean;
	            isMediaDevicesSupported: boolean;
	            isScreenShareSupported: boolean;
	            isSmallStreamSupported: boolean;
	            isH264EncodeSupported: boolean;
	            isVp8EncodeSupported: boolean;
	            isH264DecodeSupported: boolean;
	            isVp8DecodeSupported: boolean;
	        };
	    }>;
	    /**
	    * 返回摄像头设备列表
	    * <br>
	    * **Note**
	    * - 该接口不支持在 http 协议下使用，请使用 https 协议部署您的网站。{@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Privacy_and_security Privacy and security}
	    * - 出于安全的考虑，在用户未授权摄像头或麦克风访问权限前，label 及 deviceId 字段可能都是空的。因此建议在用户授权访问后，
	    * 再调用该接口获取设备详情。
	    * @returns {Promise.<MediaDeviceInfo[]>} Promise 返回 {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo|MediaDeviceInfo} 数组
	    */
	    static getCameraList(): Promise<DeviceInfo[]>;
	    /**
	    * 返回麦克风设备列表
	    * <br>
	    * **Note**
	    * - 该接口不支持在 http 协议下使用，请使用 https 协议部署您的网站。{@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Privacy_and_security Privacy and security}
	    * - 出于安全的考虑，在用户未授权摄像头或麦克风访问权限前，label 及 deviceId 字段可能都是空的。因此建议在用户授权访问后，
	    * 再调用该接口获取设备详情。
	    * @returns {Promise.<MediaDeviceInfo[]>} Promise 返回 {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo|MediaDeviceInfo} 数组
	    */
	    static getMicrophoneList(): Promise<DeviceInfo[]>;
	    /**
	    * 返回扬声器设备列表
	    * <br>
	    * 出于安全的考虑，在用户未授权摄像头或麦克风访问权限前，label 及 deviceId 字段可能都是空的。因此建议在用户授权访问后
	    * 再调用该接口获取设备详情。
	    *
	    * @returns {Promise.<MediaDeviceInfo[]>} Promise 返回 {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo|MediaDeviceInfo} 数组
	    */
	    static getSpeakerList(): Promise<DeviceInfo[]>;
	    /**
	     *  设置当前音频播放的扬声器
	     *
	     * @param {string} speakerId 扬声器 ID
	     */
	    static setCurrentSpeaker(speakerId: string): Promise<void>;
	}
export default TRTC