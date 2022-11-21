// Type definitions for trtc-js-sdk
// Npm: https://www.npmjs.com/package/trtc-js-sdk
// Github: https://github.com/LiteAVSDK/TRTC_Web


type Nullable<T> = T | null;
type Callback<T = any> = (event: T) => void;
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

export interface CheckResult {
  /** Compatibility check results */
  result: boolean;
  detail: {
    /** Whether the browser is supported by the SDK */
    isBrowserSupported: boolean;
    /** Whether the browser supports WebRTC */
    isWebRTCSupported: boolean;
    /** Whether the browser supports getting media devices and media streams */
    isMediaDevicesSupported: boolean;
    /** Whether the browser supports H.264 encoding */
    isH264EncodeSupported: boolean;
    /** Whether the browser supports H.264 decoding */
    isH264DecodeSupported: boolean;
    /** Whether the browser supports VP8 encoding */
    isVp8EncodeSupported: boolean;
    /** Whether the browser supports VP8 decoding */
    isVp8DecodeSupported: boolean;
  };
}

export interface ClientConfig {
  /** sdkAppId  */
  sdkAppId: number;
  /** userId */
  userId: string;
  /** User signature */
  userSig: string;
  /**
   * Application scenario, which can be:
   * 'rtc': real-time call
   * 'live': interactive live streaming
   */
  mode: 'rtc' | 'live';
  /** Whether to use string-type `roomId`, supported on v4.3.0+ */
  useStringRoomId?: boolean;
  /**
   * Whether to receive remote streams automatically, supported on v4.8.0+
   */
  autoSubscribe?: boolean;
  /** 
   * enable autoplay dialog, since v4.11.9.
   */
  enableAutoPlayDialog?: boolean;
  /** Stream ID bound to Tencent Cloud’s live streaming CDN. */
  streamId?: string;
  /** Recording ID (`userdefinerecordid`) in the callback for on-cloud recording */
  userDefineRecordId?: string;
  /**
   * Audio-only publishing mode. Include this parameter if you need to enable relayed live streaming and record the audio.
   */
  pureAudioPushMode?: 1 | 2;
}

export interface Client {
  /**
   * Set a proxy server.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#setProxyServer
   */
  setProxyServer(url: string): void;

  /**
   * Set TURN servers.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#setTurnServer
   */
  setTurnServer(config: TurnServerConfig | TurnServerConfig[]): void;

  /**
   * Join an audio/video call room.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#join
   */
  join(options: JoinOptions): Promise<void>;

  /** 
   * Leave room.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#leave
   */
  leave(): Promise<void>;

  /** 
 * Destroy client.
 * @since 4.13.0
 * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#destroy
 */
  destroy(): void;

  /**
   * Publish localStream
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#publish
   */
  publish(localStream: LocalStream, options?: { isAuxiliary?: boolean }): Promise<void>;

  /**
   * Unpublish localStream
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#unpublish
   */
  unpublish(localStream: LocalStream): Promise<void>;

  /**
   * subscribe remoteStream
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#subscribe
   */
  subscribe(remoteStream: RemoteStream, options?: { audio?: boolean; video?: boolean }): Promise<void>;

  /**
   * unsubscribe remoteStream
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#unsubscribe
   */
  unsubscribe(remoteStream: RemoteStream): Promise<void>;

  /**
   * switch role
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#switchRole
   */
  switchRole(role: Role): Promise<void>;

  /**
   * send SEI message
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/Client.html#sendSEIMessage
   * @since 4.14.1
   */
  sendSEIMessage(buffer: ArrayBuffer): void;

  /** 
   * listen for client event.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#on
   */
  on<K extends keyof ClientEventMap>(event: K, handler: Callback<ClientEventMap[K]>, context?: any): void;

  /** 
   * stop listen for client event.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#off
   */
  off<K extends keyof ClientEventMap>(event: K, handler: Callback<ClientEventMap[K]>, context?: any): void;

  /** stop listen for all client events. */
  off(event: '*'): void;

  /** Get the list of the audio/video mute status of remote users in the current room. */
  getRemoteMutedState(): RemoteMutedState[];

  /** Get current network transfer statistics. */
  getTransportStats(): Promise<TransportStats>;

  /** Get audio statistics of published local streams. */
  getLocalAudioStats(): Promise<LocalAudioStatsMap>;

  /** Get video statistics of published local streams. */
  getLocalVideoStats(): Promise<LocalVideoStatsMap>;

  /** Get audio statistics of all current remote streams. */
  getRemoteAudioStats(): Promise<RemoteAudioStatsMap>;

  /** Get video statistics of all current remote streams. */
  getRemoteVideoStats(remoteStreamType?: RemoteStreamType): Promise<RemoteVideoStatsMap>;

  /** 
   * Start mixtranscoding
   * @since 4.8.0
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#startMixTranscode
   */
  startMixTranscode(config: MixTranscodeConfig): Promise<void>;

  /** 
   * Stop mixtranscoding.
   * @since 4.8.0
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#stopMixTranscode
   */
  stopMixTranscode(): Promise<void>;

  /**
   * Start publishing the current user's audio/video streams to CDN.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#startPublishCDNStream
   * @since 4.10.0
   */
  startPublishCDNStream(options: PublishCDNStreamOptions): Promise<void>;
  /**
   * Stop publishing the current user's audio/video streams to CDN.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#stopPublishCDNStream
   * @since 4.10.0
   */
  stopPublishCDNStream(): Promise<void>;
  /**
   * Enable/Disable the volume callback feature.
   * @param interval Time interval for triggering the client.on('audio-volume') event.
   * @param enableInBackground For performance reasons, the SDK does not throw a volume callback event after your application is switched to the background. If you want to receive the volume callback event after your application is switched to the background, set this parameter to `true`.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#enableAudioVolumeEvaluation
   * @since 4.9.0
   */
  enableAudioVolumeEvaluation(interval?: number, enableInBackground?: boolean): void
  /**
   * Enable the big/small stream mode.
   * @since 4.11.0
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#enableSmallStream
   */
  enableSmallStream(): Promise<void>;
  /**
   * Disable the big/small stream mode.
   * @since 4.11.0
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#disableSmallStream
   */
  disableSmallStream(): Promise<void>;
  /**
   * Set small stream parameters.
   * @since 4.11.0
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#setSmallStreamProfile
   */
  setSmallStreamProfile(options: SmallStreamProfile): void;
  /**
   * Switch the big/small stream attribute.
   * @param remoteStream Remote stream subscribed
   * @param status 
   * 'big': manually switch to the big stream
   * 
   * 'small': manually switch to the small stream
   * @since 4.11.0
   * 
   * This method has been changed from synchronous to asynchronous since v4.12.0
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/Client.html#setRemoteVideoStreamType
   */
  setRemoteVideoStreamType(remoteStream: RemoteStream, status: 'big' | 'small'): Promise<void>;
  /**
   * call experimental API.
   * @param name 
   * @param options 
   */
  callExperimentalAPI(name: ExperimentalAPIName, options: Object): Promise<any>;
}

type ExperimentalAPIName = 'updatePrivateMapKey'

export interface StreamConfig {
  /** userId */
  userId?: string;
  /** Whether to capture audio from the mic */
  audio?: boolean;
  /** Whether to capture video from the camera */
  video?: boolean;
  /** Audio source */
  audioSource?: MediaStreamTrack;
  /** Video source */
  videoSource?: MediaStreamTrack;
  /** Device ID of the mic, which can be obtained via getMicrophones() */
  microphoneId?: string;
  /** Device ID of the camera, which can be obtained via getCameras() */
  cameraId?: string;
  /**
   * Whether to use the front or rear camera for video capturing.
   * You can use this parameter to specify whether to use the front or rear camera on mobile devices.
   * - 'user': front camera
   * - 'environment': rear camera
   * Note: Do not use both `cameraId` and `facingMode`.
   */
  facingMode?: 'user' | 'environment';
  /** Whether to capture the screen sharing stream */
  screen?: boolean;
  /**
   * Whether to capture system audio Note
   * - Do not set both `audio` and `screenAudio` to true.
   * - System audio capturing is supported on Chrome M74+ only. On Chrome for Windows and Chrome OS, you can capture the audio of the entire system, while on Chrome for Linux and macOS, you can capture only the audio of Chrome tabs. Other Chrome versions, OS, and browsers do not support system audio capturing.
   * - For detailed directions on screen sharing, see [Screen Sharing](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/tutorial-16-basic-screencast.html).
   */
  screenAudio?: boolean;
  /** 
   * Whether to mirror the video. Default value: true. We recommend that you enable the mirror mode when using the front camera and disable it when using the rear camera.
   * Screen sharing does not support mirroring.
   * @deprecated 4.12.1
   * 
   * see [play](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html#play)
   */
  mirror?: boolean;
}

export interface RtcError extends Error {
  /** Get the error code. See [ErrorCode](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ErrorCode.html) for the error code list. */
  getCode<K extends keyof ErrorCode>(): ErrorCode[K];
}


/** Client Event */
export interface ClientEventMap {
  /** A remote stream was added. This notification will be received when a remote user publishes a stream. */
  'stream-added': RemoteStreamInfo;
  /** A remote stream was removed. This notification will be received when a remote user unpublishes a stream.  */
  'stream-removed': RemoteStreamInfo;
  /** A remote stream was updated. This notification will be received when a remote user adds, removes, or replaces an audio/video track. */
  'stream-updated': RemoteStreamInfo;
  /** A remote stream was successfully subscribed. This event will be triggered after [client.subscribe()](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#subscribe) is successfully called. */
  'stream-subscribed': RemoteStreamInfo;
  /** 
   * The connection status between the SDK and Tencent Cloud changed.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ClientEvent.html#.CONNECTION_STATE_CHANGED
   */
  'connection-state-changed': {
    prevState: ConnectionState;
    state: ConnectionState;
  };
  /** A remote user entered a room. */
  'peer-join': RemoteUserInfo;
  /** A remote user left the room. */
  'peer-leave': RemoteUserInfo;
  /** A remote user mute audio. */
  'mute-audio': RemoteUserInfo;
  /** A remote user mute video. */
  'mute-video': RemoteUserInfo;
  /** A remote user unmute audio. */
  'unmute-audio': RemoteUserInfo;
  /** A remote user unmute video. */
  'unmute-video': RemoteUserInfo;
  /**
   * A user was kicked out of the room. Possible reasons:
   *  - A user with the same username has already logged in. Note that users with the same name are not allowed to log in at the same time, which may cause abnormal audio/video calls between the two parties. This is an application business logic error.
   *  - The user was kicked out of the room by the account admin.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ClientEvent.html#.CLIENT_BANNED
   */
  'client-banned': {
    reason: 'kick' | 'banned' | 'room-disband';
    message: string;
  };
  /** 
   * Network quality statistics.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ClientEvent.html#.NETWORK_QUALITY
   */
  'network-quality': NetworkQuality;
  /** 
   * Volume event
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ClientEvent.html#.AUDIO_VOLUME
   */
  'audio-volume': {
    result: UserAudioVolume[]
  };
  /**
   * SEI message received
   * @since 4.14.1
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ClientEvent.html#.SEI_MESSAGE
   */
  'sei-message': SEIMessageEvent;
  /** Error event. This event is thrown when an unrecoverable error occurs. */
  'error': RtcError;
}

/**
 * Audio/Video stream. A stream can contain at most one audio track and one video track.
 * The `Stream` class is the base class of `LocalStream` and `RemoteStream`. It includes APIs applicable to both  * local and remote streams.
 * 
 * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Stream.html
 */
export interface Stream {
  /**
   * Play the audio/video stream
   * @param elementId HTML tag ID or `HTMLDivElement` object. The audio and video tags created internally by the API are added to this container.
   * @param options Playback options
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Stream.html#play
   */
  play(elementId: HTMLDivElement['id'] | HTMLDivElement, options?: PlaybackOptions): Promise<void>;

  /** Stop playing an audio/video stream */
  stop(): void;

  /**
   * Resume playback
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Stream.html#resume
   */
  resume(): Promise<void>;

  /** 
   * Close an audio/video stream
   * 
   * For local streams, this API will turn the camera off and release the camera and mic. 
   */
  close(): void;

  /**
   * mute local audioTrack
   * @returns `true`: The video track is disabled successfully. `false`: Failed to disable the video track as it does not exist.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Stream.html#muteAudio
   */
  muteAudio(): boolean;

  /**
   * mute local videoTrack
   * @returns `true`: The video track is disabled successfully. `false`: Failed to disable the video track as it does not exist.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Stream.html#muteVideo
   */
  muteVideo(): boolean;

  /**
   * unmute local audioTrack
   */
  unmuteAudio(): boolean;

  /**
   * unmute local videoTrack
   */
  unmuteVideo(): boolean;

  /** Get the unique ID of a stream */
  getId(): string;

  /** Get the userId of stream */
  getUserId(): string;

  /**
   * Set the audio output device
   * @param deviceId Device ID, which can be obtained via `TRTC.getSpeakers()`
   */
  setAudioOutput(deviceId: string): Promise<void>;

  /**
   * Set the playback volume
   * @param volume Value range: 0.0-1.0
   */
  setAudioVolume(volume: number): void;

  /**
   * Get the current audio level
   */
  getAudioLevel(): number;

  /** whether a stream has an audio track */
  hasAudio(): boolean;

  /** whether a stream has a video track */
  hasVideo(): boolean;

  /** Get the audio track of a stream */
  getAudioTrack(): Nullable<MediaStreamTrack>;

  /** Get the video track of a stream */
  getVideoTrack(): Nullable<MediaStreamTrack>;

  /**
   * Get the current video frame
   */
  getVideoFrame(): Nullable<string>;

  /** 
   * Listen for stream events 
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Stream.html#on
   */
  on<K extends keyof StreamEventMap>(event: K, handler: Callback<StreamEventMap[K]>, context?: any): void;
  /** 
   * Stop listen for stream events 
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Stream.html#off
   */
  off<K extends keyof StreamEventMap>(event: K, handler: Callback<StreamEventMap[K]>, context?: any): void;
  /** stop listen for all stream events. */
  off(event: '*'): void;
}

export interface LocalStream extends Stream {
  /** 
   * Initialize local audio/video stream objects.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html#initialize
   */
  initialize(): Promise<void>;

  /**
   * Set audio profile
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html#setAudioProfile
   */
  setAudioProfile(profile: AudioProfileString): void;

  /**
   * Set video profile
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html#setVideoProfile
   */
  setVideoProfile(profile: VideoProfileString | VideoProfile): void;

  /** 
   * Set screen sharing profile
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html#setScreenProfile
   */
  setScreenProfile(profile: ScreenProfileString | ScreenProfile): void;

  /**
   * Set video content hint.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html#setVideoContentHint
   */
  setVideoContentHint(hint: 'motion' | 'detail' | 'text'): void;

  /**
   * Switch the media input device.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html#switchDevice
   */
  switchDevice(type: 'audio' | 'video', deviceId: string): Promise<void>;

  /** 
   * Add an audio or video track.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html#addTrack
   */
  addTrack(track: MediaStreamTrack): Promise<void>;

  /**
   * Remove video track.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html#removeTrack
   */
  removeTrack(track: MediaStreamTrack): Promise<void>;

  /**
   * Replace audio/video track.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html#replaceTrack
   */
  replaceTrack(track: MediaStreamTrack): Promise<void>;

  /**
   * Set microphone capture volume
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/LocalStream.html#setAudioCaptureVolume
   * @since 4.14.0
   */
  setAudioCaptureVolume(volume: Number): Boolean;
}

export interface RemoteStream extends Stream {
  /**
   * Get the type of a remote stream
   */
  getType(): RemoteStreamType;
}

export interface StreamEventMap {
  /** 
   * Status change of the audio/video player. You can update the UI of your application based on these callbacks
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-StreamEvent.html#.PLAYER_STATE_CHANGED
   */
  'player-state-changed': {
    type: 'audio' | 'video';
    state: 'PLAYING' | 'PAUSED' | 'STOPPED';
    reason: 'playing' | 'mute' | 'unmute' | 'ended' | 'pause';
  };
  /** local screen sharing stopped */
  'screen-sharing-stopped': undefined;
  /**
   * Stream connection status change
   * @since 4.10.1
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-StreamEvent.html#.CONNECTION_STATE_CHANGED
   */
  'connection-state-changed': {
    prevState: ConnectionState;
    state: ConnectionState;
  },
  /**
   * @since v4.13.0
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-StreamEvent.html#.DEVICE_AUTO_RECOVERED
   */
  'device-auto-recovered': {
    isCamera: boolean;
    isMicrophone: boolean;
    cameraId: string;
    microphoneId: string;
  },
  /**
   * Error event. This event is thrown when an unrecoverable error occurs.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-StreamEvent.html#.ERROR
   */
  'error': RtcError;
}

export interface TurnServerConfig extends Omit<RTCIceServer, 'urls'> {
  /** TURN server url */
  url: string;
}

/**
* User role. This parameter is valid only in `live` mode. Currently, two roles are supported:
* - `anchor`
* - `audience`
*
* Note: in live mode, users of the `audience` role do not have the permission to publish local streams. They have only the permission to view remote streams. If they want to co-anchor with the anchor for interaction, they need to use switchRole() to switch their roles to `anchor` before publishing local streams.
*/
export type Role = 'anchor' | 'audience';
export type RemoteStreamType = 'main' | 'auxiliary';

export interface JoinOptions {
  /** roomId */
  roomId: number | string;
  /** user role */
  role?: Role;
  /**
   * @deprecated Key for entering a room. If permission control is required, please carry this parameter (empty or incorrect value will cause a failure in entering the room).
   */
  privateMapKey?: string;
}

export interface RemoteMutedState {
  /** remote userId */
  userId: string;
  /** Whether there is audio */
  hasAudio: boolean;
  /** Whether there is a video */
  hasVideo: boolean;
  /** Whether there is a small-stream video */
  hasSmall: boolean;
  /** Whether audio is muted */
  audioMuted: boolean;
  /** Whether the camera is disabled */
  videoMuted: boolean;
}

export interface TransportStats {
  /** Round-trip Time (RTT) of the uplink media connection between the SDK and Tencent Video Cloud, in ms */
  rtt: number;
  /** 
   * RTT of the downlink media connection between the SDK and Tencent Video Cloud, in ms
   * @since 4.10.1
   */
  downlinksRTT: {
    [userId: string]: number;
  }
}

/** Audio statistics of local streams */
export interface LocalAudioStats {
  /** Number of bytes sent */
  bytesSent: number;
  /** Number of packets sent */
  packetsSent: number;
}

/** Video statistics of local streams */
export interface LocalVideoStats {
  /** Number of bytes sent */
  bytesSent: number;
  /** Number of packets sent */
  packetsSent: number;
  /** Number of frames encoded */
  framesEncoded: number;
  /** Number of frames sent */
  framesSent: number;
  /** width of video frame */
  frameWidth: number;
  /** height of video frame */
  frameHeight: number;
}

/** Audio statistics of remote streams */
export interface RemoteAudioStats {
  /** Number of bytes received */
  bytesReceived: number;
  /** Number of packets received */
  packetsReceived: number;
  /** Number of packets lost */
  packetsLost: number;
}

/** Remote stream video statistics */
export interface RemoteVideoStats {
  /** Number of bytes received */
  bytesReceived: number;
  /** Number of packets received */
  packetsReceived: number;
  /** Number of packets lost */
  packetsLost: number;
  /** Number of frames decoded */
  framesDecoded: number;
  /** width of video frame */
  frameWidth: number;
  /** height of video frame */
  frameHeight: number;
}

export interface LocalAudioStatsMap {
  [userId: string]: LocalAudioStats;
}

export interface LocalVideoStatsMap {
  [userId: string]: LocalVideoStats;
}

export interface RemoteAudioStatsMap {
  [userId: string]: RemoteAudioStats;
}

export interface RemoteVideoStatsMap {
  [userId: string]: RemoteVideoStats;
}

export interface RemoteStreamInfo {
  stream: RemoteStream;
}

export interface RemoteUserInfo {
  userId: string;
}

/**
* Connection State
* - `DISCONNECTED`: connection is disconnected
* - `CONNECTING`: connection is connecting
* - `RECONNECTING`: connection is reconnecting
* - `CONNECTED`: connection is connected
*/
export type ConnectionState = 'DISCONNECTED' | 'CONNECTING' | 'RECONNECTING' | 'CONNECTED';

/** Playback options */
export interface PlaybackOptions {
  /** Video fill mode. For details, see the [CSS object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit) property. */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Whether to mute audio. You may want to mute the audio of local streams so that the audio captured by the mic won’t be played locally. */
  muted?: boolean;
  /**
   * Whether to mirror the video. Default value: true. We recommend that you enable the mirror mode when using the front camera and disable it when using the rear camera.
   * Screen sharing does not support mirroring.
   * @since 4.12.1
   * 
   * This option has been supported since v4.12.1. see [play](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/LocalStream.html#play)
   */
  mirror?: boolean;
}

export interface VideoProfile {
  width?: number;
  height?: number;
  frameRate?: number;
  /** video encode bitrate(kbps) */
  bitrate?: number;
}

export interface ScreenProfile {
  width: number;
  height: number;
  frameRate: number;
  /** video encode bitrate(kbps) */
  bitrate: number;
}

export type AudioProfileString = 'standard' | 'high' | 'standard-stereo' | 'high-stereo';
export type VideoProfileString = '120p' | '180p' | '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '4K';

export type ScreenProfileString = '480p' | '480p_2' | '720p' | '720p_2' | '1080p' | '1080p_2';


export interface NetworkQuality {
  /** Uplink network quality (uplinkNetworkQuality): network quality of the upstream connection from SDK to Tencent Cloud */
  uplinkNetworkQuality: 1 | 2 | 3 | 4 | 5 | 6;
  /** Downlink network quality (downlinkNetworkQuality): average network quality of all downlink connections from Tencent Cloud to SDK Enumerated values */
  downlinkNetworkQuality: 1 | 2 | 3 | 4 | 5 | 6;
  /** 
   * uplink rtt 
   * @since v4.10.3
   */
  uplinkRTT: number;
  /** 
   * uplink loss 
   * @since v4.10.3
   */
  uplinkLoss: number;
  /** 
   * downlink rtt 
   * @since v4.10.3
   */
  downlinkRTT: number;
  /** 
   * downlink loss 
   * @since v4.10.3
   */
  downlinkLoss: number;
}

export interface UserAudioVolume {
  /** userId */
  userId: string;
  /** audio volume. value range 0 to 100 */
  audioVolume: number;
  /** Stream */
  stream: Stream;
}
export interface SEIMessageEvent {
  /** userId */
  userId: string;
  /** audio volume. value range 0 to 100 */
  data: ArrayBuffer;
  /** sei payload type */
  seiPayloadType: 5 | 243
}


export interface MixTranscodeConfig {
  /** Stream mixing mode */
  mode?: 'manual' | 'preset-layout';
  /** Stream ID after mixtranscoding. Default value: '' */
  streamId?: string;
  /** 
   * Width of the video resolution in px after transcoding. Default value: 640.
   * 
   * The value must be greater than or equal to 0 and is large enough so that all mixed video streams can be accommodated. 
   */
  videoWidth?: number;
  /** 
   * Height of the video resolution in px after transcoding. Default value: 480.
   * 
   * The value must be greater than or equal to 0 and is large enough so that all mixed video streams can be accommodated.
   */
  videoHeight?: number;
  /** Video bitrate (Kbps) after transcoding. If `0` is passed in, the bitrate value is determined by `videoWidth` and `videoHeight`. */
  videoBitrate?: number;
  /** Video frame rate (fps) after transcoding. Default value: 15. Value range: (0, 30]. */
  videoFramerate?: number;
  /** Video keyframe interval (s) after transcoding. Default value: 2. Value range: [1, 8]. */
  videoGOP?: number;
  /** Audio sample rate (Hz) after transcoding. Default value: 48000 */
  audioSampleRate?: number;
  /** Audio bitrate (Kbps) after transcoding. Default value: 64. Value range: [32, 192]. */
  audioBitrate?: number;
  /** Number of sound channels after transcoding. Valid values: 1 (default), 2 */
  audioChannels?: 1 | 2;
  /** Background color of the image after mixing. The value must be a hexadecimal number. Default value: 0x000000 (black) */
  backgroundColor?: number;
  /** Background picture of the image after mixing. Default value: '' */
  backgroundImage?: string;
  /** Information list of users' streams mixed. The list must contain API caller information. */
  mixUsers: MixUser[];
}

/**
 * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/global.html#MixUser
 */
export interface MixUser {
  /** userId */
  userId: string;
  /**
   * user's roomId. You can use this param to mix streams from diffrent rooms.
   * @since 4.11.5
   */
  roomId: number | string;
  /** Only the user's audio stream is mixed in. If the value is `true`, the following video parameters do not need to be passed in. */
  pureAudio: boolean;
  /** Width (px) of the user's stream in the mixed stream. The value must be greater than or equal to 0. The default value is 0. */
  width?: number;
  /** Height (px) of the user's stream in the mixed stream. The value must be greater than or equal to 0. The default value is 0. */
  height?: number;
  /** X coordinate (px) of the user's stream in the mixed stream, starting from the upper left corner of the mixed stream. The value must be greater than or equal to 0. The default value is 0. */
  locationX?: number;
  /** Y coordinate (px) of the user's stream in the mixed stream, starting from the upper left corner of the mixed stream. The value must be greater than or equal to 0. The default value is 0. */
  locationY?: number;
  /** Layer number of the user's stream in the mixed stream. The value range is [1, 15]. If `pureAudio` is `false`, `zOrder` must be passed in. */
  zOrder?: number;
  /** Remote stream type in manual mode. This parameter does not need to be set in preset layout mode. Valid values: `main` (primary stream), `auxiliary` (substream of screen sharing) */
  streamType?: RemoteStreamType
}

export interface PublishCDNStreamOptions {
  /** Custom stream ID. Default value: ${sdkAppId}_${roomId}_${userId}_main */
  streamId?: string;
  /** Tencent Cloud live streaming `appId` */
  appId?: number;
  /** Tencent Cloud live streaming `bizId` */
  bizId?: number;
  /** Specified CDN address for stream publishing */
  url?: string;
}

export interface SmallStreamProfile {
  /** Width of the video resolution of the small stream */
  width: number;
  /** Height of the video resolution of the small stream */
  height: number;
  /** Bitrate of the small stream */
  bitrate: number;
  /** Frame rate of the small stream */
  frameRate: number;
}

/** @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ErrorCode.html */
export interface ErrorCode {
  /** Invalid parameter. */
  INVALID_PARAMETER: 0x1000;
  /** Invalid operation. */
  INVALID_OPERATION: 0x1001;
  /** Not supported.
   * 
   * Note: this error is reported when an SDK API is called, indicating that the current browser does not support calling the API.
   *
   * Handling suggestion: use a browser supported by the SDK. Reference: [Check supported browsers](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/tutorial-23-advanced-support-detection.html)
   */
  NOT_SUPPORTED: 0x1002;
  /** 
   * User's device has not microphone or camera, but trying to capture microphone or camera.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ErrorCode.html#.DEVICE_NOT_FOUND
   */
  DEVICE_NOT_FOUND: 0x1003;
  /**
   * LocalStream.initialize() failed.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ErrorCode.html#.INITIALIZE_FAILED
   */
  INITIALIZE_FAILED: 0x1004;
  /** 
   * Failed to establish the WebSocket signaling channel. 
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ErrorCode.html#.SIGNAL_CHANNEL_SETUP_FAILED
   */
  SIGNAL_CHANNEL_SETUP_FAILED: 0x4001;
  /** 
   * WebSocket signaling channel error.
   * @deprecated on v4.6.5
   */
  SIGNAL_CHANNEL_ERROR: 0x4002;
  /**
   * ICE Transport connection error, i.e., audio/video data transmission channel error.
   * @deprecated on v4.6.6
   */
  ICE_TRANSPORT_ERROR: 0x4003;
  /**
   * join room failed
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ErrorCode.html#.JOIN_ROOM_FAILED
   */
  JOIN_ROOM_FAILED: 0x4004;
  /**
   * Failed to create SDP offer.
   */
  CREATE_OFFER_FAILED: 0x4005;
  /**
   * Failed to reconnect the WebSocket signaling channel.
   * 
   * Description: when the WebSocket is disconnected, the SDK retries the connection multiple times and throws this error if all the retries fail.
   * 
   * Handling suggestion: remind the user to check the network and enter the room again.
   */
  SIGNAL_CHANNEL_RECONNECTION_FAILED: 0x4006;
  /**
   * uplink peer connection retries failed.
   * 
   * Description: when the uplink peer connection is disconnected, the SDK retries the connection multiple times and throws this error if all the retries fail.
   * 
   * Handling suggestion: remind the user to check the network and perform push again or enter the room again.
   */
  UPLINK_RECONNECTION_FAILED: 0x4007;
  /**
   * downlink peer connection retries failed.
   * 
   * Description: when the downstream peer connection is disconnected unexpectedly, the SDK retries the connection multiple times and throws this error if all the retries fail.
   * 
   * Handling suggestion: remind the user to check the network and enter the room again.
   */
  DOWNLINK_RECONNECTION_FAILED: 0x4008;
  /**
   * Remote stream do not exist.
   * 
   * Description: When A tries to subscribe remoteStream published by B, B unpublish stream, causing A to fail to subscribe remoteStream from B.<br />
   * 
   * Handling suggestion: It is a normal interaction process and does not need to be handled.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ErrorCode.html#.REMOTE_STREAM_NOT_EXIST
   */
  REMOTE_STREAM_NOT_EXIST: 0x4010;
  /**
   * User was kicked out.
   */
  CLIENT_BANNED: 0x4040;
  /**
   * Media transmission service timed out.
   */
  SERVER_TIMEOUT: 0x4041;
  /**
   * Remote stream subscription timed out.
   */
  SUBSCRIPTION_TIMEOUT: 0x4042;
  /**
   * Autoplay failed error.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ErrorCode.html#.PLAY_NOT_ALLOWED
   */
  PLAY_NOT_ALLOWED: 0x4043;
  /**
   * Failed to resume camera/mic capturing.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ErrorCode.html#.DEVICE_AUTO_RECOVER_FAILED
   */
  DEVICE_AUTO_RECOVER_FAILED: 0x4044;
  /**
   * Failed to start publishing streams to CDN.
   */
  START_PUBLISH_CDN_FAILED: 0x4045;
  /**
   * Failed to stop publishing streams to CDN.
   */
  STOP_PUBLISH_CDN_FAILED: 0x4046;
  /**
   * Failed to start mixtranscoding.
   */
  START_MIX_TRANSCODE_FAILED: 0x4047;
  /**
   * Failed to stop mixtranscoding.
   */
  STOP_MIX_TRANSCODE_FAILED: 0x4048;
  /**
   * The current device does not support H.264.
   */
  NOT_SUPPORTED_H264: 0x4049;
  /**
   * Failed to change the role.
   */
  SWITCH_ROLE_FAILED: 0x404a;
  /**
   * API call timeout.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ErrorCode.html#.API_CALL_TIMEOUT
   */
  API_CALL_TIMEOUT: 0x404b;
  /**
   * Unknown error.
   */
  UNKNOWN: 0xffff;
}
export interface ClientEvent {
  /** A remote stream was added. This notification will be received when a remote user publishes a stream. */
  STREAM_ADDED: 'stream-added';
  /** A remote stream was removed. This notification will be received when a remote user unpublishes a stream.  */
  STREAM_REMOVED: 'stream-removed';
  /** A remote stream was updated. This notification will be received when a remote user adds, removes, or replaces an audio/video track. */
  STREAM_UPDATED: 'stream-updated';
  /** A remote stream was successfully subscribed. This event will be triggered after [client.subscribe()](https://web.sdk.qcloud.com/trtc/webrtc/doc/en/Client.html#subscribe) is successfully called. */
  STREAM_SUBSCRIBED: 'stream-subscribed';
  /** 
   * The connection status between the SDK and Tencent Cloud changed.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ClientEvent.html#.CONNECTION_STATE_CHANGED
   */
  CONNECTION_STATE_CHANGED: 'connection-state-changed';
  /** A remote user entered a room. */
  PEER_JOIN: 'peer-join';
  /** A remote user left the room. */
  PEER_LEAVE: 'peer-leave';
  /** A remote user mute audio. */
  MUTE_AUDIO: 'mute-audio';
  /** A remote user mute video. */
  MUTE_VIDEO: 'mute-video';
  /** A remote user unmute audio. */
  UNMUTE_AUDIO: 'unmute-audio';
  /** A remote user unmute video. */
  UNMUTE_VIDEO: 'unmute-video';
  /**
   * A user was kicked out of the room. Possible reasons:
   *  - A user with the same username has already logged in. Note that users with the same name are not allowed to log in at the same time, which may cause abnormal audio/video calls between the two parties. This is an application business logic error.
   *  - The user was kicked out of the room by the account admin.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ClientEvent.html#.CLIENT_BANNED
   */
  CLIENT_BANNED: 'client-banned';
  /** 
   * Network quality statistics.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ClientEvent.html#.NETWORK_QUALITY
   */
  NETWORK_QUALITY: 'network-quality';
  /** 
   * Volume event
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-ClientEvent.html#.AUDIO_VOLUME
   */
  AUDIO_VOLUME: 'audio-volume';
  /** Error event. This event is thrown when an unrecoverable error occurs. */
  ERROR: 'error';
}
export interface StreamEvent {
  /** 
   * Status change of the audio/video player. You can update the UI of your application based on these callbacks
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-StreamEvent.html#.PLAYER_STATE_CHANGED
   */
  PLAYER_STATE_CHANGED: 'player-state-changed';
  /** local screen sharing stopped */
  SCREEN_SHARING_STOPPED: 'screen-sharing-stopped';
  /**
   * Stream connection status change
   * @since 4.10.1
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-StreamEvent.html#.CONNECTION_STATE_CHANGED
   */
  CONNECTION_STATE_CHANGED: 'connection-state-changed';
  /**
   * When the camera or microphone being used has an capture exception, SDK will try to automatically recover the capture. This event will be fired when the capture is recovered successfully. 
   * @since 4.13.0
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-StreamEvent.html#.DEVICE_AUTO_RECOVERED
   */
  DEVICE_AUTO_RECOVERED: 'device-auto-recovered';
  /**
   * Error event. This event is thrown when an unrecoverable error occurs.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/module-StreamEvent.html#.ERROR
   */
  ERROR: 'error';
}

declare namespace TRTC {
  /** SDK Version */
  const VERSION: string;
  /** 
   * SDK Logger
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/TRTC.Logger.html
   */
  namespace Logger {
    /** Log output level */
    const LogLevel: {
      /** All */
      TRACE: 0;
      /** DEBUG, INFO, WARN, and ERROR */
      DEBUG: 1;
      /** INFO, WARN, and ERROR */
      INFO: 2;
      /** WARN and ERROR */
      WARN: 3;
      /** ERROR */
      ERROR: 4;
      /**
       * Off
       */
      NONE: 5;
    };
    /** Set the log output level */
    function setLogLevel(level: 0 | 1 | 2 | 3 | 4 | 5): void;
    /** Enable log upload */
    function enableUploadLog(): void;
    /** 
     * Disable log upload 
     * 
     * Note: We won’t be able to identify problems for you online if you disable log upload.
     */
    function disableUploadLog(): void;
  }

  /** Check whether the TRTC SDK for web is compatible with the browser. */
  function checkSystemRequirements(): Promise<CheckResult>;
  /** Check whether the browser supports screen sharing */
  function isScreenShareSupported(): boolean;
  /** Check whether the browser supports the dual-channel mode */
  function isSmallStreamSupported(): boolean;
  /** Get the list of media input and output devices */
  function getDevices(): Promise<MediaDeviceInfo[]>;
  /** Get the camera list */
  function getCameras(): Promise<MediaDeviceInfo[]>;
  /** Get the mic list */
  function getMicrophones(): Promise<MediaDeviceInfo[]>;
  /** Get the speaker list */
  function getSpeakers(): Promise<MediaDeviceInfo[]>;

  /** 
   * Create a client object for real-time audio/video calls. This API needs to be called only once for each call. 
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/TRTC.html#.createClient
   */
  function createClient(config: ClientConfig): Client;
  /** 
   * Create a localStream, which can use the client.publish() API to publish localStream.
   * @link https://web.sdk.qcloud.com/trtc/webrtc/doc/en/TRTC.html#.createStream
   */
  function createStream(config: StreamConfig): LocalStream;
}

export default TRTC;