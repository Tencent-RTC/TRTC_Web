import { CDNStreaming, CDNStreamingOptions } from './plugins/cdn-streaming';
import { DeviceDetector, DeviceDetectorOptions } from './plugins/device-detector';
import { VirtualBackground, VirtualBackgroundOptions, UpdateVirtualBackgroundOptions } from './plugins/video-effect/virtual-background';
import { Watermark, WatermarkOptions } from './plugins/video-effect/watermark';
import { Beauty, BeautyOptions, UpdateBeautyOptions } from './plugins/video-effect/beauty';
import { BasicBeauty, BasicBeautyOptions } from './plugins/video-effect/basic-beauty';
import { CrossRoom, StartCrossRoomOption, UpdateCrossRoomOption, StopCrossRoomOption } from './plugins/cross-room';
import { Debug, DebugOptions } from './plugins/debug';

export { CDNStreamingOptions, DeviceDetectorOptions, VirtualBackgroundOptions, UpdateVirtualBackgroundOptions, WatermarkOptions, BeautyOptions, UpdateBeautyOptions, BasicBeautyOptions, StartCrossRoomOption, UpdateCrossRoomOption, StopCrossRoomOption, DebugOptions };
type TRTCPlugin = typeof CrossRoom | typeof CDNStreaming | typeof DeviceDetector | typeof VirtualBackground | typeof Watermark | typeof Beauty | typeof BasicBeauty | typeof Debug;

export declare type PluginStartOptionsMap = {
	'AudioMixer': AudioMixerOptions;
	'AIDenoiser': AIDenoiserOptions;
	'CDNStreaming': CDNStreamingOptions;
	'VirtualBackground': VirtualBackgroundOptions;
	'Watermark': WatermarkOptions;
	'Beauty': BeautyOptions;
	'BasicBeauty': BasicBeautyOptions;
	'DeviceDetector': DeviceDetectorOptions;
	'Debug': undefined;
	'CrossRoom': StartCrossRoomOption;
};
export declare type PluginUpdateOptionsMap = {
	'AudioMixer': UpdateAudioMixerOptions;
	'CDNStreaming': CDNStreamingOptions;
	'VirtualBackground': UpdateVirtualBackgroundOptions;
	'Beauty': UpdateBeautyOptions;
	'BasicBeauty': BasicBeautyOptions;
	'CrossRoom': UpdateCrossRoomOption;
};

export declare type PluginStopOptionsMap = {
	'AudioMixer': StopAudioMixerOptions;
	'AIDenoiser': undefined;
	'CDNStreaming': CDNStreamingOptions;
	'VirtualBackground': undefined;
	'Watermark': undefined;
	'Beauty': undefined;
	'BasicBeauty': undefined;
	'DeviceDetector': undefined;
	'Debug': undefined;
	'CrossRoom': StopCrossRoomOption | undefined;
};

export declare class RtcError extends Error implements RTCErrorInterface {
  name: string;
  /**
	 *
	 * Error code
	 * @see Detailed error code list: {@link module:ERROR_CODE ErrorCode}
	 * @readonly
	 * @memberof RtcError
	 */
  code: number;
  /**
	 *
	 * Extended error code
	 * @see Detailed error code list: {@link module:ERROR_CODE ErrorCode}
	 * @readonly
	 * @memberof RtcError
	 */
  extraCode?: number;
  /**
	 *
	 * The name of the function that throws the error
	 * @readonly
	 * @memberof RtcError
	 */
  functionName: string;
  /**
	 *
	 * Error message
	 * @readonly
	 * @memberof RtcError
	 */
  message: string;
  /**
	 * Error handler. For the following errors, you can call error.handler() for recovering.
	 *
	 * - {@link module:ERROR_CODE.DEVICE_ERROR ErrorCode.DEVICE_ERROR} extraCode: 5302
	 *   ```js
	 *    trtc.startLocalAudio().catch(error => {
	 *     if (error.extraCode === 5302 && typeof error.handler === 'function') {
	 *       // Prompt the user the browser permission(camera/microphone/screen sharing) has been denied by system. The browser will jump to the System Settings APP, please enable the relevant permissions!
	 *       // Available in Windows and MacOS.
	 *       error.handler();
	 *     }
	 *    })
	 *   ```
	 * @since v5.2.0
	 * @readonly
	 * @memberof RtcError
	 */
  handler?: () => void;
  originError?: Error | DOMException | RtcError;
  constructor({ code, extraCode, message, messageParams, fnName, originError }: RTCErrorParams);
  static convertFrom(originError: Error, fnName?: string, fnParams?: any): RtcError;
}

export declare enum LOG_LEVEL {
	/**
	 * 输出所有日志
	 */
	TRACE = 0,
	/**
	 * 输出 DEBUG、INFO、WARN、ERROR 等级日志
	 */
	DEBUG = 1,
	/**
	 * 输出 INFO、WARN、ERROR 等级日志
	 */
	INFO = 2,
	/**
	 * 输出 WARN、ERROR 等级日志
	 */
	WARN = 3,
	/**
	 * 输出 ERROR 等级日志
	 */
	ERROR = 4,
	/**
	 * 不输出任何日志
	 */
	NONE = 5
}
export declare const audioProfileMap: {
	readonly standard: {
		readonly sampleRate: 48000;
		readonly channelCount: 1;
		readonly bitrate: 40;
	};
	readonly 'standard-stereo': {
		readonly sampleRate: 48000;
		readonly channelCount: 2;
		readonly bitrate: 64;
	};
	readonly high: {
		readonly sampleRate: 48000;
		readonly channelCount: 1;
		readonly bitrate: 192;
	};
	readonly 'high-stereo': {
		readonly sampleRate: 48000;
		readonly channelCount: 2;
		readonly bitrate: 192;
	};
};
export declare const videoProfileMap: {
	readonly '120p': {
		readonly width: 160;
		readonly height: 120;
		readonly frameRate: 15;
		readonly bitrate: 200;
	};
	readonly '180p': {
		readonly width: 320;
		readonly height: 180;
		readonly frameRate: 15;
		readonly bitrate: 350;
	};
	readonly '240p': {
		readonly width: 320;
		readonly height: 240;
		readonly frameRate: 15;
		readonly bitrate: 400;
	};
	readonly '360p': {
		readonly width: 640;
		readonly height: 360;
		readonly frameRate: 15;
		readonly bitrate: 800;
	};
	readonly '480p': {
		readonly width: 640;
		readonly height: 480;
		readonly frameRate: 15;
		readonly bitrate: 900;
	};
	readonly '720p': {
		readonly width: 1280;
		readonly height: 720;
		readonly frameRate: 15;
		readonly bitrate: 1500;
	};
	readonly '1080p': {
		readonly width: 1920;
		readonly height: 1080;
		readonly frameRate: 15;
		readonly bitrate: 2000;
	};
	readonly '1440p': {
		readonly width: 2560;
		readonly height: 1440;
		readonly frameRate: 30;
		readonly bitrate: 4860;
	};
	readonly '4K': {
		readonly width: 3840;
		readonly height: 2160;
		readonly frameRate: 30;
		readonly bitrate: 9000;
	};
};
export declare const screenProfileMap: {
	readonly '480p': {
		readonly width: 640;
		readonly height: 480;
		readonly frameRate: 5;
		readonly bitrate: 900;
	};
	readonly '480p_2': {
		readonly width: 640;
		readonly height: 480;
		readonly frameRate: 30;
		readonly bitrate: 1000;
	};
	readonly '720p': {
		readonly width: 1280;
		readonly height: 720;
		readonly frameRate: 5;
		readonly bitrate: 1200;
	};
	readonly '720p_2': {
		readonly width: 1280;
		readonly height: 720;
		readonly frameRate: 30;
		readonly bitrate: 3000;
	};
	readonly '1080p': {
		readonly width: 1920;
		readonly height: 1080;
		readonly frameRate: 5;
		readonly bitrate: 1600;
	};
	readonly '1080p_2': {
		readonly width: 1920;
		readonly height: 1080;
		readonly frameRate: 30;
		readonly bitrate: 4000;
	};
};
export declare const enum Scene {
	LIVE = 'live',
	RTC = 'rtc'
}

export declare const enum NetworkQualityValue {
	UNKNOWN,
	EXCELLENT,
	GOOD,
	POOR,
	BAD,
	VERY_BAD,
	DISCONNECTED
}

export declare const enum PlayerState {
	PAUSED = 'PAUSED',
	PLAYING = 'PLAYING',
	STOPPED = 'STOPPED'
}
export declare const enum UserRole {
	ANCHOR = 'anchor',
	AUDIENCE = 'audience'
}
export declare const enum ConnectionState {
	CONNECTED = 'CONNECTED',
	DISCONNECTED = 'DISCONNECTED',
	CONNECTING = 'CONNECTING',
	RECONNECTED = 'RECONNECTED',
	RECONNECTING = 'RECONNECTING'
}
export declare interface PingResult {
  domain: string;
  cost: number;
}
export declare interface PingResults {
  isPoorNetwork?: boolean;
  timestamp?: number;
  data?: PingResult[];
}
export declare interface NetworkQuality {
	uplinkNetworkQuality: NetworkQualityValue;
	downlinkNetworkQuality: NetworkQualityValue;
	uplinkRTT: number;
	uplinkLoss: number;
	downlinkRTT: number;
	downlinkLoss: number;
	pingResults?: PingResults;
}
export declare const enum BannedReason {
	BANNED = 'banned',
	KICK = 'kick',
	USER_TIME_OUT = 'user_time_out',
	ROOM_DISBAND = 'room_disband'
}

export declare type PluginWithAssets = {
	plugin: TRTCPlugin;
	assetsPath?: string;
};
export declare interface TRTCOptions {
	plugins?: Array<TRTCPlugin>;
	enableSEI?: boolean;
	assetsPath?: string;
}
export interface VideoProfile { width: number, height: number, frameRate: number, bitrate: number; }
export interface AudioProfile { sampleRate: number, channelCount: number, bitrate: number; }
export declare interface LocalVideoConfig {
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
export interface TurnServerOptions {
  url: string;
  username?: string;
  credential?: string;
  credentialType?: 'password';
}
export declare interface ProxyServer {
	websocketProxy?: string;
	loggerProxy?: string;
	turnServer?: TurnServerOptions | TurnServerOptions[];
	iceTransportPolicy?: RTCIceTransportPolicy;
	webtransportProxy?: string;
	scheduleProxy?: string;
	unifiedProxy?: string;
}
export declare interface EnterRoomConfig {
	sdkAppId: number;
	userId: string;
	userSig: string;
	roomId?: number;
	strRoomId?: string;
	role?: UserRole;
	autoReceiveAudio?: boolean;
	autoReceiveVideo?: boolean;
	privateMapKey?: string;
	latencyLevel?: number;
	businessInfo?: string;
	enableAutoPlayDialog?: boolean;
	proxy?: ProxyServer | string;
	scene?: Scene;
	userDefineRecordId?: string;
}
export declare interface ScreenShareConfig {
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
export declare interface UpdateScreenShareConfig extends ScreenShareConfig {
	option?: {
		fillMode?: 'contain' | 'cover' | 'fill';
		qosPreference?: typeof TRTCType.QOS_PREFERENCE_SMOOTH | typeof TRTCType.QOS_PREFERENCE_CLEAR;
	};
}
export declare interface RemoteVideoConfig {
	view?: string | HTMLElement | HTMLElement[] | null;
	userId: string;
	streamType: TRTCStreamType;
	option?: {
		fillMode?: 'contain' | 'cover' | 'fill';
		mirror?: boolean;
		small?: boolean;
		receiveWhenViewVisible?: boolean;
		viewRoot?: HTMLElement;
		canvasRender?: boolean;
	};
}
export declare interface StopRemoteVideoConfig {
	userId: string;
	streamType?: TRTCStreamType;
}
export declare interface LocalAudioConfig {
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
export declare interface UpdateLocalAudioConfig extends LocalAudioConfig {
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
export declare interface RemoteAudioConfig {
	userId: string;
	option?: {
		volume?: number;
	};
}
export declare interface StopRemoteAudioConfig {
	userId: string;
}
export declare const enum TRTCStreamType {
	Main = 'main',
	Sub = 'sub'
}
export declare enum TRTCDeviceType {
	Camera = 'camera',
	Microphone = 'microphone',
	Speaker = 'speaker'
}
export declare enum TRTCDeviceAction {
	Remove = 'remove',
	Add = 'add',
	Active = 'active'
}
export declare interface RTCErrorParams {
	code: number;
	extraCode?: number;
	functionName?: string;
	fnName?: string;
	message?: string;
	messageParams?: any;
	originError?: Error | DOMException;
}
export declare interface RTCErrorInterface {
	readonly name: string;
	readonly code: number;
	readonly extraCode?: number;
	readonly functionName?: string;
	readonly message?: string;
	readonly originError?: Error | DOMException;
}
/**
 * **TRTC Constants**<br>
 * @module TYPE
 * @example
 * // Usage:
 * TRTC.TYPE.SCENE_LIVE
 */
export declare const TRTCType: {
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
	readonly AUDIO_PROFILE_STANDARD: 'standard';
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
	readonly AUDIO_PROFILE_STANDARD_STEREO: 'standard-stereo';
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
	readonly AUDIO_PROFILE_HIGH: 'high';
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
	readonly AUDIO_PROFILE_HIGH_STEREO: 'high-stereo';
	/**
	 * When the network is weak, the video encoding strategy takes 'smooth' first, i.e., the priority is to preserve frame rate.
	 * <br>
	 * Default 'smooth' first for camera, 'default' clear first for screen sharing
	* @default 'smooth'
	* @memberof module:TYPE
	*/
	readonly QOS_PREFERENCE_SMOOTH: 'smooth';
	/**
	 * When the network is weak, the video encoding strategy takes 'clear' first, i.e., the priority is to preserve resolution.
	 * <br>
	 * Default 'smooth' first for camera, 'default' clear first for screen sharing
	* @default 'clear'
	* @memberof module:TYPE
	*/
	readonly QOS_PREFERENCE_CLEAR: 'clear';
};
export declare interface AudioMixerOptions {
	id: string;
	url: string;
	loop?: boolean;
	volume?: number;
}
export declare interface UpdateAudioMixerOptions {
	id: string;
	loop?: boolean;
	volume?: number;
	seekFrom?: number;
	operation?: 'pause' | 'resume' | 'stop';
}
export declare interface StopAudioMixerOptions {
	id: string;
}
export declare interface AIDenoiserOptions {
	assetsPath: string;
	sdkAppId: number;
	userId: string;
	userSig: string;
}

export declare interface TRTCStatistics {
	rtt: number;
	downLoss: number;
	upLoss: number;
	bytesSent: number;
	bytesReceived: number;
	localStatistics: LocalStatistic;
	remoteStatistics: RemoteStatistic[];
}
export declare interface LocalStatistic {
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
export declare enum TRTCVideoType {
	Big = 'big',
	Small = 'small',
	Sub = 'sub'
}
export declare interface RemoteStatistic {
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
export declare interface VideoFrameConfig {
	userId?: string;
	streamType?: TRTCStreamType;
}
export declare enum AutoStartPluginName {
	Debug = 'Debug'
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
export declare const TRTCEvent: {
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
	readonly ERROR: 'error';
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
	readonly AUTOPLAY_FAILED: 'autoplay-failed';
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
	readonly KICKED_OUT: 'kicked-out';
	/**
	 * Remote user enters the room event.
	 *
	 * - In `rtc` mode, all users will receive the notification of entering and exiting the room of the other user.
	 * - In `live` mode, only the anchor has the notification of entering and exiting the room, and the audience does not have the notification of entering and exiting the room. The audience can receive the notification of entering and exiting the room of the anchor.
	 * @default 'remote-user-enter'
	 * @memberof module:EVENT
	 * @example
	 *
	 * trtc.on(TRTC.EVENT.REMOTE_USER_ENTER, event => {
	 *   const userId = event.userId;
	 * });
	 */
	readonly REMOTE_USER_ENTER: 'remote-user-enter';
	/**
	 * Remote user exits the room event.
	 *
	 * - In `rtc` mode, all users will receive the notification of entering and exiting the room of the other user.
	 * - In `live` mode, only the anchor has the notification of entering and exiting the room, and the audience does not have the notification of entering and exiting the room. The audience can receive the notification of entering and exiting the room of the anchor.
	 * @default 'remote-user-exit'
	 * @memberof module:EVENT
	 * @example
	 *
	 * trtc.on(TRTC.EVENT.REMOTE_USER_EXIT, event => {
	 *   const userId = event.userId;
	 * });
	 */
	readonly REMOTE_USER_EXIT: 'remote-user-exit';
	/**
	 * Remote user publishes audio. You will receive this notification when the remote user turns on the microphone. Refer to: [Turn on/off camera and microphone](./tutorial-15-basic-dynamic-add-video.html)
	 *
	 * - By default, the SDK automatically plays remote audio, and you do not need to call the API to play remote audio. You can listen for this event and {@link module:EVENT.REMOTE_AUDIO_UNAVAILABLE REMOTE_AUDIO_UNAVAILABLE} to update the UI icon for "whether the remote microphone is turned on".
	 * - Note: If the user has not interacted with the page before entering the room, automatic audio playback may fail due to the [browser's automatic playback policy restrictions](./tutorial-21-advanced-auto-play-policy.html). You need to refer to the [suggestions for handling automatic playback restrictions](./tutorial-21-advanced-auto-play-policy.html) for processing.
	 * - If you do not want the SDK to automatically play audio, you can set `autoReceiveAudio` to `false` to turn off automatic audio playback when calling {@link TRTC#enterRoom trtc.enterRoom()}.
	 * - Listen for the {@link module:EVENT.REMOTE_AUDIO_AVAILABLE TRTC.EVENT.REMOTE_AUDIO_AVAILABLE} event, record the userId with remote audio, and call the {@link TRTC#muteRemoteAudio trtc.muteRemoteAudio(userId, false)} method when you need to play audio.
	 * @default 'remote-audio-available'
	 * @memberof module:EVENT
	 * @example
	 * // Listen before entering the room
	 * trtc.on(TRTC.EVENT.REMOTE_AUDIO_AVAILABLE, event => {
	 *   const userId = event.userId;
	 * });
	 */
	readonly REMOTE_AUDIO_AVAILABLE: 'remote-audio-available';
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
	readonly REMOTE_AUDIO_UNAVAILABLE: 'remote-audio-unavailable';
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
	readonly REMOTE_VIDEO_AVAILABLE: 'remote-video-available';
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
	readonly REMOTE_VIDEO_UNAVAILABLE: 'remote-video-unavailable';
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
	readonly AUDIO_VOLUME: 'audio-volume';
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
	readonly NETWORK_QUALITY: 'network-quality';
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
	 * trtc.on(TRTC.EVENT.CONNECTION_STATE_CHANGED, event => {
	 *   const prevState = event.prevState;
	 *   const curState = event.state;
	 * });
	 */
	readonly CONNECTION_STATE_CHANGED: 'connection-state-changed';
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
	readonly AUDIO_PLAY_STATE_CHANGED: 'audio-play-state-changed';
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
	readonly VIDEO_PLAY_STATE_CHANGED: 'video-play-state-changed';
	/**
	 * @description Notification event for local screen sharing stop, only valid for local screen sharing streams.
	 * @default 'screen-share-stopped'
	 * @memberof module:EVENT
	 * @example
	 * trtc.on(TRTC.EVENT.SCREEN_SHARE_STOPPED, () => {
	 *   console.log('screen sharing was stopped');
	 * });
	 */
	readonly SCREEN_SHARE_STOPPED: 'screen-share-stopped';
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
	readonly DEVICE_CHANGED: 'device-changed';
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
	readonly PUBLISH_STATE_CHANGED: 'publish-state-changed';
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
	readonly TRACK: 'track';
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
	readonly STATISTICS: 'statistics';
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
	readonly SEI_MESSAGE: 'sei-message';
	/**
	 * @since v5.6.0
	 * @description received a new custom message.
	 * @default 'custom-message'
	 * @memberof module:EVENT
	 * @example
	 * trtc.on(TRTC.EVENT.CUSTOM_MESSAGE, event => {
	 *    // event.userId: remote userId.
	 *    // event.cmdId: message cmdId.
	 *    // event.seq: message sequence number.
	 *    // event.data: custom message data, type is ArrayBuffer.
	 * })
	 */
	readonly CUSTOM_MESSAGE: 'custom-message';
};
export declare interface TRTCEventTypes {
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
		device: MediaDeviceInfo;
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
		data: ArrayBuffer;
		userId: string;
		streamType: TRTCStreamType;
		seiPayloadType: number;
	}];
	[TRTCEvent.STATISTICS]: [statistics: TRTCStatistics];
	[TRTCEvent.TRACK]: [{
		userId: string;
		streamType?: TRTCStreamType;
		track: MediaStreamTrack;
	}];
	[TRTCEvent.CUSTOM_MESSAGE]: [CustomMessage];
}

export declare interface CustomMessageData {
  cmdId: number;
  data: ArrayBuffer;
}
export declare interface CustomMessage extends CustomMessageData {
  userId: string;
  seq: number;
}
export declare class TRTC {
  /**
	 * Create a TRTC object for implementing functions such as entering a room, previewing, publishing, and subscribing streams.<br>
	 *
	 * **Note:**
	 * - You must create a TRTC object first and call its methods and listen to its events to implement various functions required by the business.
	 * @example
	 * // Create a TRTC object
	 * const trtc = TRTC.create();
	 *
	 * @returns {TRTC} TRTC object
	 */
  static create(options?: TRTCOptions): TRTC;
  /**
	 * @private
	 * regi <br>
	 *
	 * @example
	 * import { VirtualBackground } from 'trtc-sdk-v5/plugins/video-effect/virtual-background';
	 * trtc.use({ plugin: VirtualBackground });
	 *
	 * @example
	 * import { VirtualBackground } from 'trtc-sdk-v5/plugins/video-effect/virtual-background';
	 * trtc.use({ plugin: VirtualBackground, assetsPath: './js/assets/' });
	 *
	 * @example
	 * // 简写使用
	 * import { VirtualBackground } from 'trtc-sdk-v5/plugins/video-effect/virtual-background';
	 * trtc.use(VirtualBackground);
	 */
  use(pluginObject: PluginWithAssets | TRTCPlugin): void;
  /**
	 * @typedef TurnServer
	 * @property {string} url TURN server url
	 * @property {string=} username TURN server auth user name
	 * @property {string=} credential TURN server password
	 * @property {string=} [credentialType=password] TURN server verify password type
	 */
  /**
	 * @typedef ProxyServer
	 * @property {string} [websocketProxy] websocket service proxy
	 * @property {string} [loggerProxy] log service agent
	 * @property {TurnServer[]} [turnServer] media data transmission agent
	 * @property {'all'|'relay'} [iceTransportPolicy='all'] 'all' gives priority to directly connecting to TRTC, and tries to go to the turn server if the connection fails.<br>
	 * 'relay' forces the connection through the TURN server.
	 */
  /**
	 * Enter a video call room.<br>
	 * - Entering a room means starting a video call session. Only after entering the room successfully can you make audio and video calls with other users in the room.
	 * - You can publish local audio and video streams through {@link TRTC#startLocalVideo startLocalVideo()} and {@link TRTC#startLocalAudio startLocalAudio()} respectively. After successful publishing, other users in the room will receive the {@link module:EVENT.REMOTE_AUDIO_AVAILABLE REMOTE_AUDIO_AVAILABLE} and {@link module:EVENT.REMOTE_VIDEO_AVAILABLE REMOTE_VIDEO_AVAILABLE} event notifications.
	 * - By default, the SDK automatically plays remote audio. You need to call {@link TRTC#startRemoteVideo startRemoteVideo()} to play remote video.
	 *
	 * @param {object} options Enter room parameters
	 * @param {number} options.sdkAppId sdkAppId <br>
	 * You can obtain the sdkAppId information in the **Application Information** section after creating a new application by clicking **Application Management** > **Create Application** in the [TRTC Console](https://console.intl.cloud.tencent.com/trtc).
	 * @param {string} options.userId User ID <br>
	 * It is recommended to limit the length to 32 bytes, and only allow uppercase and lowercase English letters (a-zA-Z), numbers (0-9), underscores, and hyphens.
	 * @param {string} options.userSig UserSig signature <br>
	 * Please refer to [UserSig related](https://www.tencentcloud.com/document/product/647/35166) for the calculation method of userSig.
	 * @param {number=} options.roomId
	 * the value must be an integer between 1 and 4294967294<br>
	 * <font color="red">If you need to use a string type room id, please use the strRoomId parameter. One of roomId and strRoomId must be passed in. If both are passed in, the roomId will be selected first.</font>
	 * @param {string=} options.strRoomId
	 * String type room id, the length is limited to 64 bytes, and only supports the following characters:
	 * - Uppercase and lowercase English letters (a-zA-Z)
	 * - Numbers (0-9)
	 * - Space ! # $ % & ( ) + - : ; < = . > ? @ [ ] ^ _ { } | ~ ,
	 * <font color="red">Note: It is recommended to use a numeric type roomId. The string type room id "123" is not the same room as the numeric type room id 123.</font>
	 * @param {string} [options.scene] Application scene, currently supports the following two scenes:
	 * - {@link module:TYPE.SCENE_RTC TRTC.TYPE.SCENE_RTC} (default) Real-time call scene, which is suitable for 1-to-1 audio and video calls, or online meetings with up to 300 participants. {@tutorial 04-info-uplink-limits}.
	 * - {@link module:TYPE.SCENE_LIVE TRTC.TYPE.SCENE_LIVE} Interactive live streaming scene, which is suitable for online live streaming scenes with up to 100,000 people, but you need to specify the role field in the options parameter introduced next.
	 * @param {string=} [options.role] User role, only meaningful in the {@link module:TYPE.SCENE_LIVE TRTC.TYPE.SCENE_LIVE} scene, and the {@link module:TYPE.SCENE_RTC TRTC.TYPE.SCENE_RTC} scene does not need to specify the role. Currently supports two roles:
	 * - {@link module:TYPE.ROLE_ANCHOR TRTC.TYPE.ROLE_ANCHOR} (default) Anchor
	 * - {@link module:TYPE.ROLE_AUDIENCE TRTC.TYPE.ROLE_AUDIENCE} Audience
	 * Note: The audience role does not have the permission to publish local audio and video, only the permission to watch remote streams. If the audience wants to interact with the anchor by connecting to the microphone, please switch the role to the anchor through {@link TRTC#switchRole switchRole()} before publishing local audio and video.
	 * @param {boolean} [options.autoReceiveAudio=true] Whether to automatically receive audio. When a remote user publishes audio, the SDK automatically plays the remote user's audio.
	 * @param {boolean} [options.autoReceiveVideo=false] Whether to automatically receive video. When a remote user publishes video, the SDK automatically subscribes and decodes the remote video. You need to call {@link TRTC#startRemoteVideo startRemoteVideo} to play the remote video.
	 * - The default value was changed to `false` since v5.6.0. Refer to [Breaking Changed for v5.6.0](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/tutorial-00-info-update-guideline.html).
	 * @param {boolean} [options.enableAutoPlayDialog] Whether to enable the SDK's automatic playback failure dialog box, default: true.
	 * - Enabled by default. When automatic playback fails, the SDK will pop up a dialog box to guide the user to click the page to restore audio and video playback.
	 * - Can be set to false in order to turn off. Refer to {@tutorial 21-advanced-auto-play-policy}.
	 * @param {string|ProxyServer} [options.proxy] proxy config. Refer to {@tutorial 34-advanced-proxy}.
	 * @param {boolean} [options.privateMapKey] Key for entering a room. If permission control is required, please carry this parameter (empty or incorrect value will cause a failure in entering the room).<br>[privateMapKey permission configuration](https://www.tencentcloud.com/document/product/647/35157?lang=en&pg=).
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
	 * Exit the current audio and video call room.
	 * - After exiting the room, the connection with remote users will be closed, and remote audio and video will no longer be received and played, and the publishing of local audio and video will be stopped.
	 * - The capture and preview of the local camera and microphone will not stop. You can call {@link TRTC#stopLocalVideo stopLocalVideo()} and {@link TRTC#stopLocalAudio stopLocalAudio()} to stop capturing local microphone and camera.
	 * @throws {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * @memberof TRTC
	 * @example
	 * await trtc.exitRoom();
	 */
  exitRoom(): Promise<void>;
  /**
	 * Switches the user role, only effective in TRTC.TYPE.SCENE_LIVE interactive live streaming mode.
	 *
	 * In interactive live streaming mode, a user may need to switch between "audience" and "anchor".
	 * You can determine the role through the role field in {@link TRTC#enterRoom enterRoom()}, or switch roles after entering the room through switchRole.
	 * - Audience switches to anchor, call trtc.switchRole(TRTC.TYPE.ROLE_ANCHOR) to convert the user role to TRTC.TYPE.ROLE_ANCHOR anchor role, and then call {@link TRTC#startLocalVideo startLocalVideo()} and {@link TRTC#startLocalAudio startLocalAudio()} to publish local audio and video as needed.
	 * - Anchor switches to audience, call trtc.switchRole(TRTC.TYPE.ROLE_AUDIENCE) to convert the user role to TRTC.TYPE.ROLE_AUDIENCE audience role. If there is already published local audio and video, the SDK will cancel the publishing of local audio and video.
	 * > !
	 * > - This interface can only be called after entering the room successfully.
	 * > - After closing the camera and microphone, it is recommended to switch to the audience role in time to avoid the anchor role occupying the resources of 50 upstreams.
	 * @param {string} role User role
	 * - TRTC.TYPE.ROLE_ANCHOR anchor, can publish local audio and video, up to 50 anchors can publish local audio and video in a single room at the same time.
	 * - TRTC.TYPE.ROLE_AUDIENCE audience, cannot publish local audio and video, can only watch remote streams, and there is no upper limit on the number of audience members in a single room.
	 * @param {object} [option]
	 * @param {string} [option.privateMapKey] `Since v5.3.0+` <br>
	 * The privateMapKey may expire after a timeout, so you can use this parameter to update the privateMapKey.
	 * @throws
	 * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	 * - {@link module:ERROR_CODE.INVALID_OPERATION INVALID_OPERATION}
	 * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	 * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * - {@link module:ERROR_CODE.SERVER_ERROR SERVER_ERROR}
	 * @memberof TRTC
	 * @example
	 * // After entering the room successfully
	 * // TRTC.TYPE.SCENE_LIVE interactive live streaming mode, audience switches to anchor
	 * await trtc.switchRole(TRTC.TYPE.ROLE_ANCHOR);
	 * // Switch from audience role to anchor role and start streaming
	 * await trtc.startLocalVideo();
	 *
	 * // TRTC.TYPE.SCENE_LIVE interactive live streaming mode, anchor switches to audience
	 * await trtc.switchRole(TRTC.TYPE.ROLE_AUDIENCE);
	 * @example
	 * // Since v5.3.0+
	 * await trtc.switchRole(TRTC.TYPE.ROLE_ANCHOR, { privateMapKey: 'your new privateMapKey' });
	 */
  switchRole(role: UserRole, option?: {
		privateMapKey?: string;
		latencyLevel?: number;
	}): Promise<void>;
	/**
	 * Destroy the TRTC instance <br/>
	 *
	 * After exiting the room, if the business side no longer needs to use trtc, you need to call this interface to destroy the trtc instance in time and release related resources.
	 *
	 * Note:
	 *  - The trtc instance after destruction cannot be used again.
	 *  - If you have entered the room, you need to call the {@link TRTC#exitRoom TRTC.exitRoom} interface to exit the room successfully before calling this interface to destroy trtc.
	 *
	 * @example
	 * // When the call is over
	 * await trtc.exitRoom();
	 * // If the trtc is no longer needed, destroy the trtc and release the reference.
	 * trtc.destroy();
	 * trtc = null;
	 * @throws {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	 * @memberof TRTC
	 */
  destroy(): void;
  /**
	 * Start collecting audio from the local microphone and publish it to the current room.
	 * - When to call: can be called before or after entering the room, cannot be called repeatedly.
	 * - Only one microphone can be opened for a trtc instance. If you need to open another microphone for testing in the case of already opening one microphone, you can create multiple trtc instances to achieve it.
	 *
	 * @param {object} [config] - Configuration item
	 * @param {boolean} [config.publish] - Whether to publish local audio to the room, default is true. If you call this interface before entering the room and publish = true, the SDK will automatically publish after entering the room. You can get the publish state by listening this event {@link module:EVENT.PUBLISH_STATE_CHANGED PUBLISH_STATE_CHANGED}.
	 * @param {boolean} [config.mute] - Whether to mute microphone. Refer to: {@tutorial 15-basic-dynamic-add-video}.
	 * @param {object} [config.option] - Local audio options
	 * @param {string} [config.option.microphoneId]- Specify which microphone to use
	 * @param {MediaStreamTrack} [config.option.audioTrack] - Custom audioTrack. {@tutorial 20-advanced-customized-capture-rendering}.
	 * @param {number} [config.option.captureVolume] - Set the capture volume of microphone. The default value is 100. Setting above 100 enlarges the capture volume. Since v5.2.1+.
	 * @param {number} [config.option.earMonitorVolume] - Set the ear return volume, value range [0, 100], the local microphone is muted by default.
	 * @param {string} [config.option.profile] - Audio encoding configuration, default {@link module:TYPE.AUDIO_PROFILE_STANDARD TRTC.TYPE.AUDIO_PROFILE_STANDARD}
	 * @throws
	 * - {@link module:ERROR_CODE.ENV_NOT_SUPPORTED ENV_NOT_SUPPORTED}
	 * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	 * - {@link module:ERROR_CODE.DEVICE_ERROR DEVICE_ERROR}
	 * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	 * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * - {@link module:ERROR_CODE.SERVER_ERROR SERVER_ERROR}
	 * @example
	 * // Collect the default microphone and publish
	 * await trtc.startLocalAudio();
	 * @example
	 * // The following is a code example for testing microphone volume, which can be used for microphone volume detection.
	 * trtc.enableAudioVolumeEvaluation();
	 * trtc.on(TRTC.EVENT.AUDIO_VOLUME, event => { });
	 * // No need to publish audio for testing microphone
	 * await trtc.startLocalAudio({ publish: false });
	 * // After the test is completed, turn off the microphone
	 * await trtc.stopLocalAudio();
	 * @memberof TRTC
	 */
  startLocalAudio(config?: LocalAudioConfig): Promise<void>;
  /**
	 * Update the configuration of the local microphone.
	 * - When to call: This interface needs to be called after {@link TRTC#startLocalAudio startLocalAudio()} is successful and can be called multiple times.
	 * - This method uses incremental update: only update the passed parameters, and keep the parameters that are not passed unchanged.
	 * @param {object} [config]
	 * @param {boolean} [config.publish] - Whether to publish local audio to the room. You can get the publish state by listening this event {@link module:EVENT.PUBLISH_STATE_CHANGED PUBLISH_STATE_CHANGED}.
	 * @param {boolean} [config.mute] - Whether to mute microphone. Refer to: {@tutorial 15-basic-dynamic-add-video}.
	 * @param {object} [config.option] - Local audio configuration
	 * @param {string} [config.option.microphoneId] - Specify which microphone to use to switch microphones.
	 * @param {MediaStreamTrack} [config.option.audioTrack] - Custom audioTrack. {@tutorial 20-advanced-customized-capture-rendering}.
	 * @param {number} [config.option.captureVolume] - Set the capture volume of microphone. The default value is 100. Setting above 100 enlarges the capture volume. Since v5.2.1+.
	 * @param {number} [config.option.earMonitorVolume] - Set the ear return volume, value range [0, 100], the local microphone is muted by default.
	 * @throws
	 * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	 * - {@link module:ERROR_CODE.DEVICE_ERROR DEVICE_ERROR}
	 * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	 * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * @example
	 * // Switch microphone
	 * const microphoneList = await TRTC.getMicrophoneList();
	 * if (microphoneList[1]) {
	 *   await trtc.updateLocalAudio({ option: { microphoneId: microphoneList[1].deviceId }});
	 * }
	 * @memberof TRTC
	 */
  updateLocalAudio(config: UpdateLocalAudioConfig): Promise<void>;
  /**
	 * Stop collecting and publishing the local microphone.
	 * - If you just want to mute the microphone, please use updateLocalAudio({ mute: true }). Refer to: {@tutorial 15-basic-dynamic-add-video}.
	 * @throws {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * @example
	 * await trtc.stopLocalAudio();
	 */
  stopLocalAudio(): Promise<void>;
  /**
	 * @typedef {object|string} VideoProfile - Configuration for local video stream
	 *
	 * Video configuration parameters, can use preset values in string format or custom resolution and other parameters
	 * | Video Profile | Resolution (Width x Height) | Frame Rate (fps) | Bitrate (kbps) | Remarks |
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
		* @property {number} width - Video width
		* @property {number} height - Video height
		* @property {number} frameRate - Video frame rate
		* @property {number} bitrate - Video bitrate
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
	 * Start collecting video from the local camera, play the camera's video on the specified HTMLElement tag, and publish the camera's video to the current room.
	 * - When to call: can be called before or after entering the room, but cannot be called repeatedly.
	 * - Only one camera can be started per trtc instance. If you need to start another camera for testing while one camera is already started, you can create multiple trtc instances to achieve this.

	 * @param {object} [config]
	 * @param {string | HTMLElement | HTMLElement[] | null} [config.view] - The HTMLElement instance or ID for local video preview. If not passed or passed as null, the video will not be played.
	 * @param {boolean} [config.publish] - Whether to publish the local video to the room. If you call this interface before entering the room and publish = true, the SDK will automatically publish after entering the room. You can get the publish state by listening this event {@link module:EVENT.PUBLISH_STATE_CHANGED PUBLISH_STATE_CHANGED}.
	 * @param {boolean | string} [config.mute] - Whether to mute camera. Supports passing in image url string, the image will be published instead of origin camera stream, Other users in the room will receive the REMOTE_AUDIO_AVAILABLE event. It does not support calling when the camera is turned off. More information: {@tutorial 15-basic-dynamic-add-video}.
	 * @param {object} [config.option] - Local video configuration
	 * @param {string} [config.option.cameraId] - Specify which camera to use for switching cameras.
	 * @param {boolean} [config.option.useFrontCamera] - Whether to use the front camera.
	 * @param {MediaStreamTrack} [config.option.videoTrack] - Custom videoTrack. {@tutorial 20-advanced-customized-capture-rendering}.
	 * @param {'view' | 'publish' | 'both' | boolean} [config.option.mirror] - Video mirroring mode, default is 'view'.
	 * - 'view': You see yourself as a mirror image, and the other person sees you as a non-mirror image.
	 * - 'publish': The other person sees you as a mirror image, and you see yourself as a non-mirror image.
	 * - 'both': You see yourself as a mirror image, and the other person sees you as a mirror image.
	 * - false: Boolean value, represents no mirroring.
	 *
	 * <font color="orange"> Note: Before version 5.3.2, only boolean can be passed, where true represents local preview mirroring, and false represents no mirroring.</font>
	 * @param {'contain' | 'cover' | 'fill'} [config.option.fillMode] - Video fill mode. The default is `cover`. Refer to the {@link https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit CSS object-fit} property.
	 * @param {string | VideoProfile} [config.option.profile] - Video encoding parameters for the main video.
	 * @param {string | boolean | VideoProfile} [config.option.small] - Video encoding parameters for the small video. Refer to {@tutorial 27-advanced-small-stream}
	 * @param {QOS_PREFERENCE_SMOOTH|QOS_PREFERENCE_CLEAR} [config.option.qosPreference] - Set the video encoding strategy for weak networks. Smooth first(default) ({@link module:TYPE.QOS_PREFERENCE_SMOOTH QOS_PREFERENCE_SMOOTH}) or Clear first ({@link module:TYPE.QOS_PREFERENCE_CLEAR QOS_ PREFERENCE_SMOOTH})
	 * @throws
	 * - {@link module:ERROR_CODE.ENV_NOT_SUPPORTED ENV_NOT_SUPPORTED}
	 * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	 * - {@link module:ERROR_CODE.DEVICE_ERROR DEVICE_ERROR}
	 * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	 * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * - {@link module:ERROR_CODE.SERVER_ERROR SERVER_ERROR}
	 * @example
	 * // Preview and publish the camera
	 * await trtc.startLocalVideo({
	 *   view: document.getElementById('localVideo'), // Preview the video on the element with the DOM elementId of localVideo.
	 * });
	 * @example
	 * // Preview the camera without publishing. Can be used for camera testing.
	 * const config = {
	 *   view: document.getElementById('localVideo'), // Preview the video on the element with the DOM elementId of localVideo.
	 *   publish: false // Do not publish the camera
	 * }
	 * await trtc.startLocalVideo(config);
	 * // Call updateLocalVideo when you need to publish the video
	 * await trtc.updateLocalVideo({ publish:true });
	 * @example
	 * // Use a specified camera.
	 * const cameraList = await TRTC.getCameraList();
	 * if (cameraList[0]) {
	 *   await trtc.startLocalVideo({
	 *     view: document.getElementById('localVideo'), // Preview the video on the element with the DOM elementId of localVideo.
	 *     option: {
	 *       cameraId: cameraList[0].deviceId,
	 *     }
	 *   });
	 * }
	 *
	 * // use front camera on mobile device.
	 * await trtc.startLocalVideo({ view, option: { useFrontCamera: true }});
	 * // use rear camera on mobile device.
	 * await trtc.startLocalVideo({ view, option: { useFrontCamera: false }});
	 * @memberof TRTC
	 */
  startLocalVideo(config?: LocalVideoConfig): Promise<void>;
  /**
	 * Update the local camera configuration.
	 * - This interface needs to be called after {@link TRTC#startLocalVideo startLocalVideo()} is successful.
	 * - This interface can be called multiple times.
	 * - This method uses incremental update: only updates the passed-in parameters, and keeps the parameters that are not passed in unchanged.
	 * @param {object} [config]
	 * @param {string | HTMLElement | HTMLElement[] | null} [config.view] - The HTMLElement instance or Id of the preview camera. If not passed in or passed in null, the video will not be rendered, but the container that consumes bandwidth will still be pushed.
	 * @param {boolean} [config.publish] - Whether to publish the local video to the room. You can get the publish state by listening this event {@link module:EVENT.PUBLISH_STATE_CHANGED PUBLISH_STATE_CHANGED}.
	 * @param {boolean | string} [config.mute] - Whether to mute camera. Supports passing in image url string, the image will be published instead of origin camera stream, Other users in the room will receive the REMOTE_AUDIO_AVAILABLE event. It does not support calling when the camera is turned off. More information: {@tutorial 15-basic-dynamic-add-video}.
	 * @param {object} [config.option] - Local video configuration
	 * @param {string} [config.option.cameraId] - Specify which camera to use
	 * @param {boolean} [config.option.useFrontCamera] - Whether to use the front camera
	 * @param {MediaStreamTrack} [config.option.videoTrack] - Custom videoTrack. {@tutorial 20-advanced-customized-capture-rendering}.
	 * @param {'view' | 'publish' | 'both' | boolean} [config.option.mirror] - Video mirroring mode, default is 'view'.
	 * - 'view': You see yourself as a mirror image, and the other person sees you as a non-mirror image.
	 * - 'publish': The other person sees you as a mirror image, and you see yourself as a non-mirror image.
	 * - 'both': You see yourself as a mirror image, and the other person sees you as a mirror image.
	 * - false: Boolean value, represents no mirroring.
	 * @param {'contain' | 'cover' | 'fill'} [config.option.fillMode] - Video fill mode. Refer to the {@link https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit| CSS object-fit} property
	 * @param {string | VideoProfile} [config.option.profile] - Video encoding parameters for the main stream
	 * @param {string | boolean | VideoProfile} [config.option.small] - Video encoding parameters for the small video. Refer to {@tutorial 27-advanced-small-stream}
	 * @param {QOS_PREFERENCE_SMOOTH|QOS_PREFERENCE_CLEAR} [config.option.qosPreference] - Set the video encoding strategy for weak networks. Smooth first ({@link module:TYPE.QOS_PREFERENCE_SMOOTH QOS_PREFERENCE_SMOOTH}) or Clear first ({@link module:TYPE.QOS_PREFERENCE_CLEAR QOS_ PREFERENCE_SMOOTH})
	 * @throws
	 * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	 * - {@link module:ERROR_CODE.DEVICE_ERROR DEVICE_ERROR}
	 * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	 * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * @example
	 * // Switch camera
	 * const cameraList = await TRTC.getCameraList();
	 * if (cameraList[1]) {
	 *   await trtc.updateLocalVideo({ option: { cameraId: cameraList[1].deviceId }});
	 * }
	 * @example
	 * // Stop publishing video, but keep local preview
	 * await trtc.updateLocalVideo({ publish:false });
	 * @memberof TRTC
	 */
  updateLocalVideo(config: LocalVideoConfig): Promise<void>;
  /**
	 * Stop capturing, previewing, and publishing the local camera.
	 * - If you only want to stop publishing video but keep the local camera preview, you can use the {@link TRTC#updateLocalVideo updateLocalVideo({ publish:false })} method.<br>
	 * @throws {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * @example
	 * await trtc.stopLocalVideo();
	 */
  stopLocalVideo(): Promise<void>;
  /**
	 * @typedef {object|string} ScreenShareProfile - Screen sharing resolution, bit rate, and frame rate configuration
	 * Screen sharing configuration parameters, can use preset values or custom resolution and other parameters
	 * | Screen Profile | Resolution (width x height) | Frame Rate (fps) | Bitrate (kbps) |
	 * | :---       | :---           | :---      | :---        |
	 * | 480p       | 640 x 480      | 5         | 900         |
	 * | 480p_2     | 640 x 480      | 30        | 1000        |
	 * | 720p       | 1280 x 720     | 5         | 1200        |
	 * | 720p_2     | 1280 x 720     | 30        | 3000        |
	 * | 1080p      | 1920 x 1080    | 5         | 1600        |
	 * | 1080p_2    | 1920 x 1080    | 30        | 4000        |
	 * - The default resolution for screen sharing is `1080p`.
	 * - If the above profiles do not meet your business needs, you can also specify custom resolution, frame rate, and bitrate.

	 * @property {number} width - Screen sharing width
	 * @property {number} height - Screen sharing height
	 * @property {number} frameRate - Screen sharing frame rate
	 * @property {number} bitrate - Screen sharing bitrate
	 * @example
	 * const config = {
	 *  option: {
	 *   profile: '720p',
	 *  },
	 * }
	 * await trtc.startScreenShare(config);
	 */
  /**
	 * Start screen sharing.
	 *
	 * - After starting screen sharing, other users in the room will receive the {@link module:EVENT.REMOTE_VIDEO_AVAILABLE REMOTE_VIDEO_AVAILABLE} event, with streamType as {@link module:TYPE.STREAM_TYPE_SUB STREAM_TYPE_SUB}, and other users can play screen sharing through {@link TRTC#startRemoteVideo startRemoteVideo}.
	 * @param {object} [config]
	 * @param {string | HTMLElement | HTMLElement[] | null} [config.view] - The HTMLElement instance or Id for previewing local screen sharing. If not passed or passed as null, local screen sharing will not be rendered.
	 * @param {boolean} [config.publish] - Whether to publish screen sharing to the room. The default is true. If you call this interface before entering the room and publish = true, the SDK will automatically publish after entering the room. You can get the publish state by listening this event {@link module:EVENT.PUBLISH_STATE_CHANGED PUBLISH_STATE_CHANGED}.
	 * @param {object} [config.option] - Screen sharing configuration
	 * @param {boolean} [config.option.systemAudio] - Whether to capture system audio. The default is false.
	 * @param {'contain' | 'cover' | 'fill'} [config.option.fillMode] - Video fill mode. The default is `contain`, refer to {@link https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit CSS object-fit} property.
	 * @param {ScreenShareProfile} [config.option.profile] - Screen sharing encoding configuration.
	 * @param {QOS_PREFERENCE_SMOOTH|QOS_PREFERENCE_CLEAR} [config.option.qosPreference] - Set the video encoding strategy for weak networks. Smooth first ({@link module:TYPE.QOS_PREFERENCE_SMOOTH QOS_PREFERENCE_SMOOTH}) or Clear first(default) ({@link module:TYPE.QOS_PREFERENCE_CLEAR QOS_ PREFERENCE_SMOOTH})
	 * @param {HTMLElement} [config.option.captureElement] - Capture screen from the specified element of current tab. Available on Chrome 104+.
	 * @param {'current-tab' | 'tab' | 'window' | 'monitor'} [config.option.preferDisplaySurface='monitor'] - The prefer display surface for screen sharing. Available on Chrome 94+.
	 * - The default is monitor, which means that monitor capture will be displayed first in the Screen Sharing Capture pre-checkbox。
	 * - If you fill in 'current-tab', the pre-checkbox will only show the current page.
	 * @throws
	 * - {@link module:ERROR_CODE.ENV_NOT_SUPPORTED ENV_NOT_SUPPORTED}
	 * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	 * - {@link module:ERROR_CODE.DEVICE_ERROR DEVICE_ERROR}
	 * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	 * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * - {@link module:ERROR_CODE.SERVER_ERROR SERVER_ERROR}
	 * @example
	 * // Start screen sharing
	 * await trtc.startScreenShare();
	 * @memberof TRTC
	 */
  startScreenShare(config?: ScreenShareConfig): Promise<void>;
  /**
	 * Update screen sharing configuration
	 * - This interface needs to be called after {@link TRTC#startScreenShare startScreenShare()} is successful.
	 * - This interface can be called multiple times.
	 * - This method uses incremental update: only update the passed-in parameters, and keep the parameters that are not passed-in unchanged.
	 * @param {object} [config]
	 * @param {string | HTMLElement | HTMLElement[] | null} [config.view] - The HTMLElement instance or Id for screen sharing preview. If not passed in or passed in null, the screen sharing will not be rendered.
	 * @param {boolean} [config.publish=true] - Whether to publish screen sharing to the room
	 * @param {object} [config.option] - Screen sharing configuration
	 * @param {'contain' | 'cover' | 'fill'} [config.option.fillMode] - Video fill mode. The default is `contain`, refer to {@link https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit CSS object-fit} property.
	 * @param {QOS_PREFERENCE_SMOOTH|QOS_PREFERENCE_CLEAR} [config.option.qosPreference] - Set the video encoding strategy for weak networks. Smooth first ({@link module:TYPE.QOS_PREFERENCE_SMOOTH QOS_PREFERENCE_SMOOTH}) or Clear first ({@link module:TYPE.QOS_PREFERENCE_CLEAR QOS_ PREFERENCE_SMOOTH})
	 * @throws
	 * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	 * - {@link module:ERROR_CODE.DEVICE_ERROR DEVICE_ERROR}
	 * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	 * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * - {@link module:ERROR_CODE.SERVER_ERROR SERVER_ERROR}
	 * @example
	 * // Stop screen sharing, but keep the local preview of screen sharing
	 * await trtc.updateScreenShare({ publish:false });
	 * @memberof TRTC
	 */
  updateScreenShare(config: UpdateScreenShareConfig): Promise<void>;
  /**
	 * Stop screen sharing.

	 * @throws {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * @example
	 * await trtc.stopScreenShare();
	 */
  stopScreenShare(): Promise<void>;
  /**
	 * Play remote video
	 *
	 * - When to call: Call after receiving the {@link module:EVENT.REMOTE_VIDEO_AVAILABLE TRTC.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE)} event.
	 * @param {object} [config]
	 * @param {string | HTMLElement | HTMLElement[] | null} [config.view] - The HTMLElement instance or Id used to play remote video. If not passed or passed null, the video will not be rendered, but the bandwidth will still be consumed.
	 * @param {string} config.userId - Remote user ID
	 * @param {TRTC.TYPE.STREAM_TYPE_MAIN|TRTC.TYPE.STREAM_TYPE_SUB} config.streamType - Remote stream type
	 * - {@link module:TYPE.STREAM_TYPE_MAIN TRTC.TYPE.STREAM_TYPE_MAIN}: Main stream (remote user's camera)
	 * - {@link module:TYPE.STREAM_TYPE_SUB TRTC.TYPE.STREAM_TYPE_SUB}: Sub stream (remote user's screen sharing)
	 * @param {object} [config.option] - Remote video configuration
	 * @param {boolean} [config.option.small] - Whether to subscribe small streams
	 * @param {boolean} [config.option.mirror] - Whether to enable mirror
	 * @param {'contain' | 'cover' | 'fill'} [config.option.fillMode] - Video fill mode. Refer to the {@link https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit CSS object-fit} property.
	 * @param {boolean} [config.option.receiveWhenViewVisible] - Since v5.4.0 <br>Subscribe video only when view is visible. Refer to: {@tutorial 27-advanced-small-stream}.
	 * @param {HTMLElement} [config.option.viewRoot=document.body] - Since v5.4.0 <br>The root element is the parent element of the view and is used to calculate whether the view is visible relative to the root. The default value is document.body, and it is recommended that you use the first-level parent of the video view list. Refer to: {@tutorial 27-advanced-small-stream}.
	 * @throws
	 * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	 * - {@link module:ERROR_CODE.INVALID_OPERATION INVALID_OPERATION}
	 * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	 * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * - {@link module:ERROR_CODE.SERVER_ERROR SERVER_ERROR}
	 * @example
	 * trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
	 *   // You need to place the video container in the DOM in advance, and it is recommended to use `${userId}_${streamType}` as the element id.
	 *   trtc.startRemoteVideo({ userId, streamType, view: `${userId}_${streamType}` });
	 * })
	 * @memberof TRTC
	 */
  startRemoteVideo(config: RemoteVideoConfig): Promise<void>;
  /**
	 * Update remote video playback configuration<br>
	 * - This method should be called after {@link TRTC#startRemoteVideo startRemoteVideo} is successful.
	 * - This method can be called multiple times.
	 * - This method uses incremental updates, so only the configuration items that need to be updated need to be passed in.
	 * @param {object} [config]
	 * @param {string | HTMLElement | HTMLElement[] | null} [config.view] - The HTMLElement instance or Id used to play remote video. If not passed or passed null, the video will not be rendered, but the bandwidth will still be consumed.
	 * @param {string} config.userId - Remote user ID
	 * @param {TRTC.TYPE.STREAM_TYPE_MAIN|TRTC.TYPE.STREAM_TYPE_SUB} config.streamType - Remote stream type
	 * - {@link module:TYPE.STREAM_TYPE_MAIN TRTC.TYPE.STREAM_TYPE_MAIN}: Main stream (remote user's camera)
	 * - {@link module:TYPE.STREAM_TYPE_SUB TRTC.TYPE.STREAM_TYPE_SUB}: Sub stream (remote user's screen sharing)
	 * @param {object} [config.option] - Remote video configuration
	 * @param {boolean} [config.option.small] - Whether to subscribe small streams. Refer to: {@tutorial 27-advanced-small-stream}.
	 * @param {boolean} [config.option.mirror] - Whether to enable mirror
	 * @param {'contain' | 'cover' | 'fill'} [config.option.fillMode] - Video fill mode. Refer to the {@link https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit CSS object-fit} property.
	 * @param {boolean} [config.option.receiveWhenViewVisible] - Since v5.4.0 <br>Subscribe video only when view is visible. Refer to: {@tutorial 27-advanced-small-stream}.
	 * @param {HTMLElement} [config.option.viewRoot=document.body] - Since v5.4.0 <br>The root element is the parent element of the view and is used to calculate whether the view is visible relative to the root. The default value is document.body, and it is recommended that you use the first-level parent of the video view list. Refer to: {@tutorial 27-advanced-small-stream}.
	 * @throws
	 * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	 * - {@link module:ERROR_CODE.INVALID_OPERATION INVALID_OPERATION}
	 * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	 * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * @example
	 * const config = {
	 *  view: document.getElementById(userId), // you can use a new view to update the position of video.
	 *  userId,
	 *  streamType: TRTC.TYPE.STREAM_TYPE_MAIN
	 * }
	 * await trtc.updateRemoteVideo(config);
	 * @memberof TRTC
	 */
  updateRemoteVideo(config: RemoteVideoConfig): Promise<void>;
  /**
	 * Used to stop remote video playback.<br>
	 * @param {object} config - Remote video configuration
	 * @param {string} config.userId - Remote user ID, '*' represents all users.
	 * @param {TRTC.TYPE.STREAM_TYPE_MAIN|TRTC.TYPE.STREAM_TYPE_SUB} [config.streamType] - Remote stream type. This field is required when userId is not '*'.
	 * - {@link module:TYPE.STREAM_TYPE_MAIN TRTC.TYPE.STREAM_TYPE_MAIN}: Main stream (remote user's camera)
	 * - {@link module:TYPE.STREAM_TYPE_SUB TRTC.TYPE.STREAM_TYPE_SUB}: Sub stream (remote user's screen sharing)
	 * @throws {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * @example
	 * // Stop playing all remote users
	 * await trtc.stopRemoteVideo({ userId: '*' });
	 */
  stopRemoteVideo(config: StopRemoteVideoConfig): Promise<void>;
  /**
	 * Mute a remote user and stop subscribing audio data from that user. Only effective for the current user, other users in the room can still hear the muted user's voice.<br>
	 *
	 * Note:
	 * - By default, after entering the room, the SDK will automatically play remote audio. You can call this interface to mute or unmute remote users.
	 * - If the parameter autoReceiveAudio = false is passed in when entering the room, remote audio will not be played automatically. When audio playback is required, you need to call this method (mute is passed in false) to play remote audio.
	 * - This interface is effective before or after entering the room (enterRoom), and the mute state will be reset to false after exiting the room (exitRoom).
	 * - If you want to continue subscribing audio data from the user but not play it, you can call setRemoteAudioVolume(userId, 0)
	 * @param {string} userId - Remote user ID, '*' represents all users.
	 * @param {boolean} mute - Whether to mute
	 * @throws
	 * - {@link module:ERROR_CODE.INVALID_PARAMETER INVALID_PARAMETER}
	 * - {@link module:ERROR_CODE.INVALID_OPERATION INVALID_OPERATION}
	 * - {@link module:ERROR_CODE.OPERATION_FAILED OPERATION_FAILED}
	 * - {@link module:ERROR_CODE.OPERATION_ABORT OPERATION_ABORT}
	 * @example
	 * // Mute all remote users
	 * await trtc.muteRemoteAudio('*', true);
	 */
  muteRemoteAudio(userId: string, mute: boolean): Promise<void>;
  /**
	 * Used to control the playback volume of remote audio.<br>
	 *
	 * - Not supported by iOS Safari
	 * @param {string} userId - Remote user ID。'*' represents all remote users.
	 * @param {number} volume - Volume, ranging from 0 to 100. The default value is 100.<br>
	 * Since `v5.1.3+`, the volume can be set higher than 100.
	 * @example
	 * await trtc.setRemoteAudioVolume('123', 90);
	 */
  setRemoteAudioVolume(userId: string, volume: number): void;
  startPlugin<T extends keyof PluginStartOptionsMap, O extends PluginStartOptionsMap[T]>(plugin: O extends undefined ? never : T, options: O): Promise<any>;
  startPlugin<T extends keyof PluginStartOptionsMap, O extends PluginStartOptionsMap[T]>(plugin: O extends undefined ? T : never): Promise<any>;
  updatePlugin<T extends keyof PluginUpdateOptionsMap, O extends PluginUpdateOptionsMap[T]>(plugin: O extends undefined ? never : T, options: O): Promise<any>;
  updatePlugin<T extends keyof PluginUpdateOptionsMap, O extends PluginUpdateOptionsMap[T]>(plugin: O extends undefined ? T : never): Promise<any>;
  stopPlugin<T extends keyof PluginStopOptionsMap, O extends PluginStopOptionsMap[T]>(plugin: O extends undefined ? never : T, options: O): Promise<any>;
  stopPlugin<T extends keyof PluginStopOptionsMap, O extends PluginStopOptionsMap[T]>(plugin: O extends undefined ? T : never): Promise<any>;
  /**
	 * Enables or disables the volume callback.<br>
	 *
	 * - After enabling this function, whether someone is speaking in the room or not, the SDK will regularly throw the {@link module:EVENT.AUDIO_VOLUME TRTC.on(TRTC.EVENT.AUDIO_VOLUME)} event, which feedbacks the volume evaluation value of each user.<br>
	 *
	 * @param {number} [interval=2000] Used to set the time interval for triggering the volume callback event. The default is 2000(ms), and the minimum value is 100(ms). If set to less than or equal to 0, the volume callback will be turned off.
	 * @param {boolean} [enableInBackground=false] For performance reasons, when the page switches to the background, the SDK will not throw volume callback events. If you need to receive volume callback events when the page is switched to the background, you can set this parameter to true.
	 * @memberof TRTC
	 * @example
	 * trtc.on(TRTC.EVENT.AUDIO_VOLUME, event => {
	 *    event.result.forEach(({ userId, volume }) => {
	 *        const isMe = userId === ''; // When userId is an empty string, it represents the local microphone volume.
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
	 *
	 * // To turn off the volume callback, pass in an interval value less than or equal to 0
	 * trtc.enableAudioVolumeEvaluation(-1);
	 */
  enableAudioVolumeEvaluation(interval?: number, enableInBackground?: boolean): void;
  /**
	 * Listen to TRTC events<br><br>
	 * For a detailed list of events, please refer to: {@link module:EVENT TRTC.EVENT}
	 *
	 * @param {string} eventName Event name
	 * @param {function} handler Event callback function
	 * @param {context} context Context
	 * @memberof TRTC
	 * @example
	 * trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, event => {
	 *   // REMOTE_VIDEO_AVAILABLE event handler
	 * });
	 */
  on<T extends keyof TRTCEventTypes>(event: T, handler: (...args: TRTCEventTypes[T]) => void, context?: any): this;
  /**
	 * Remove event listener<br>
	 *
	 * @param {string} eventName Event name. Passing in the wildcard '*' will remove all event listeners.
	 * @param {function} handler Event callback function
	 * @param {context} context Context
	 * @memberof TRTC
	 * @example
	 * trtc.on(TRTC.EVENT.REMOTE_USER_ENTER, function peerJoinHandler(event) {
	 *   // REMOTE_USER_ENTER event handler
	 *   console.log('remote user enter');
	 *
	 *   trtc.off(TRTC.EVENT.REMOTE_USER_ENTER, peerJoinHandler);
	 * });
	 *
	 * // Remove all event listeners
	 * trtc.off('*');
	 */
  off<T extends keyof TRTCEventTypes>(event: T | '*', handler: T extends '*' ? never : (...args: TRTCEventTypes[T]) => void, context?: any): this;
  /**
	 * Get audio track
	 *
	 * @returns {MediaStreamTrack?} Audio track
	 * @param {Object|string} [config] If not passed, get the local microphone audioTrack
	 * @param {string} [config.userId] If not passed or passed an empty string, get the local audioTrack. Pass the userId of the remote user to get the remote user's audioTrack.
	 * @param {STREAM_TYPE_MAIN|STREAM_TYPE_SUB} [config.streamType] - stream type:
	 * - {@link module:TYPE.STREAM_TYPE_MAIN TRTC.TYPE.STREAM_TYPE_MAIN}: Main stream (user's microphone)(default)
	 * - {@link module:TYPE.STREAM_TYPE_SUB TRTC.TYPE.STREAM_TYPE_SUB}: Sub stream (user's screen sharing audio). Only works for local screen sharing audio because there is only one remote audioTrack, and there is no distinction between Main and Sub for remote audioTrack.
   * @param {boolean} [config.processed=false] - Whether to get the processed audioTrack. The processed audioTrack is the audioTrack after the SDK processes the audio frame, such as ai-denose, gain, mix. The default value is false.
	 * @memberof TRTC
	 * @example
	 * // Version before v5.4.3
	 * trtc.getAudioTrack(); // Get local microphone audioTrack, captured by trtc.startLocalAudio()
	 * trtc.getAudioTrack('remoteUserId'); // Get remote audioTrack
	 *
	 * // Since v5.4.3+, you can get local screen audioTrack by passing the streamType = TRTC.STREAM_TYPE_SUB
	 * trtc.getAudioTrack({ streamType: TRTC.STREAM_TYPE_SUB });
   *
   * // Since v5.8.2+, you can get the processed audioTrack by passing processed = true
   * trtc.getAudioTrack({ processed: true });
	 */
  getAudioTrack(configOrUserId?: {
		userId?: string;
		streamType?: TRTCStreamType;
    	processed?: boolean;
	} | string): MediaStreamTrack | null;
	/**
	 * Get video track
	 *
	 * @param {string} [config] If not passed, get the local camera videoTrack
	 * @param {string} [config.userId] If not passed or passed an empty string, get the local videoTrack. Pass the userId of the remote user to get the remote user's videoTrack.
	 * @param {STREAM_TYPE_MAIN|STREAM_TYPE_SUB} [config.streamType] - stream type:
	 * - {@link module:TYPE.STREAM_TYPE_MAIN TRTC.TYPE.STREAM_TYPE_MAIN}: Main stream (user's camera)(default)
	 * - {@link module:TYPE.STREAM_TYPE_SUB TRTC.TYPE.STREAM_TYPE_SUB}: Sub stream (user's screen sharing)
   * @param {boolean} [config.processed=false] - Whether to get the processed videoTrack. The processed videoTrack is the videoTrack after the SDK processes the video frame, such as visualbackground, mirror, watermark. The default value is false.
	 * @returns {MediaStreamTrack|null} Video track
	 * @memberof TRTC
	 * @example
	 * // Get local camera videoTrack
	 * const videoTrack = trtc.getVideoTrack();
	 * // Get local screen sharing videoTrack
	 * const screenVideoTrack = trtc.getVideoTrack({ streamType: TRTC.TYPE.STREAM_TYPE_SUB });
	 * // Get remote user's main stream videoTrack
	 * const remoteMainVideoTrack = trtc.getVideoTrack({ userId: 'test', streamType: TRTC.TYPE.STREAM_TYPE_MAIN });
	 * // Get remote user's sub stream videoTrack
	 * const remoteSubVideoTrack = trtc.getVideoTrack({ userId: 'test', streamType: TRTC.TYPE.STREAM_TYPE_SUB });
   * // Since v5.8.2+, you can get the processed videoTrack by passing processed = true
   * const processedVideoTrack = trtc.getVideoTrack({ processed: true });
	*/
  getVideoTrack(config?: {
		userId?: string;
		streamType?: TRTCStreamType;
		processed?: boolean;
	}): MediaStreamTrack | null;
	/**
	 * Get video snapshot <br>
	 * Notice: must play the video before it can obtain the snapshot. If there is no playback, an empty string will be returned.
	 * @param {string} config.userId - Remote user ID
	 * @param {TRTC.TYPE.STREAM_TYPE_MAIN|TRTC.TYPE.STREAM_TYPE_SUB} config.streamType
	 * - {@link module:TYPE.STREAM_TYPE_MAIN TRTC.TYPE.STREAM_TYPE_MAIN}: Main stream
	 * - {@link module:TYPE.STREAM_TYPE_SUB TRTC.TYPE.STREAM_TYPE_SUB}: Sub stream
	 * @since 5.4.0
	 * @example
	 * // get self main stream video frame
	 * trtc.getVideoSnapshot()
	 * // get self sub stream video frame
	 * trtc.getVideoSnapshot({streamType:TRTC.TYPE.STREAM_TYPE_SUB})
	 * // get remote user main stream video frame
	 * trtc.getVideoSnapshot({userId: 'remote userId', streamType:TRTC.TYPE.STREAM_TYPE_MAIN})
	 * @memberof TRTC
	 */
  getVideoSnapshot(config?: VideoFrameConfig): string;
  setCurrentSpeaker(speakerId: string): void;
  /**
	 * Send SEI Message <br>
	 *
	 * > The header of a video frame has a header block called SEI.
	 * > The principle of this interface is to use the SEI to embed the custom data you want to send along with the video frame.
	 * > SEI messages can accompany video frames all the way to the live CDN.
	 *
	 * Applicable scenarios: synchronization of lyrics, live answering questions, etc.
	 *
	 * When to call: call after {@link TRTC#startLocalVideo trtc.startLocalVideo} or {@link TRTC#startLocalScreen trtc.startLocalScreen} when set 'toSubStream' option to true successfully.
	 *
	 * Note:
	 * 1. Maximum 1KB(Byte) sent in a single call, maximum 30 calls per second, maximum 8KB sent per second.
	 * 2. Currently only support Chrome 86+, Edge 86+, Opera 72+ browsers.
	 * 3. Since SEI is sent along with video frames, there is a possibility that video frames may be lost, and therefore SEI may be lost as well. The number of times it can be sent can be increased within the frequency limit, and the business side needs to do message de-duplication on the receiving side.
	 * 4. SEI cannot be sent without trtc.startLocalVideo(or trtc.startLocalScreen when set 'toSubStream' option to true); SEI cannot be received without startRemoteVideo.
	 * 5. Only H264 encoder is supported to send SEI.
	 * 6. SEI sending and receiving is not supported for small streams for the time being.
	 * @see {@link module:EVENT.SEI_MESSAGE TRTC.EVENT.SEI_MESSAGE}
	 * @since v5.3.0
	 * @param {ArrayBuffer} buffer SEI data to be sent
	 * @param {Object=} options
	 * @param {Number} options.seiPayloadType Set the SEI payload type. SDK uses the custom payloadType 243 by default, the business side can use this parameter to set the payloadType to the standard 5. When the business side uses the 5 payloadType, you need to follow the specification to make sure that the first 16 bytes of the `buffer` are the business side's customized uuid.
	 * @param {Boolean} [options.toSubStream=false] Send SEI data to substream. Need call trtc.startLocalScreen first. Since v5.7.0+.
	 * @example
	 * // 1. enable SEI
	 * const trtc = TRTC.create({
	 *    enableSEI: true
	 * })
	 *
	 * // 2. send SEI
	 * try {
	 *  await trtc.enterRoom({
	 *   userId: 'user_1',
	 *   roomId: 12345,
	 * })
	 *  await trtc.startLocalVideo();
	 *  const unit8Array = new Uint8Array([1, 2, 3]);
	 *  trtc.sendSEIMessage(unit8Array.buffer);
	 * } catch(error) {
	 *  console.warn(error);
	 * }
	 *
	 * // 3. receive SEI
	 * trtc.on(TRTC.EVENT.SEI_MESSAGE, event => {
	 *  console.warn(`sei ${event.data} from ${event.userId}`);
	 * })
	 */
  sendSEIMessage(buffer: ArrayBuffer, options?: {
		seiPayloadType?: number;
		toSubStream?: boolean;
	}): void;
	/**
	 * Send Custom Message to all remote users in the room. <br>
	 *
	 * Note:
	 *
	 * 1. Only {@link module:TYPE.ROLE_ANCHOR TRTC.TYPE.ROLE_ANCHOR} can call sendCustomMessage.
	 * 2. You should call this api after {@link TRTC#enterRoom TRTC.enterRoom} successfully.
	 * 3. The custom message will be sent in order and as reliably as possible, but it's possible to loss messages in a very bad network. The receiver will also receive the message in order.
	 * @since v5.6.0
	 * @see Listen for the event {@link module:EVENT.CUSTOM_MESSAGE TRTC.EVENT.CUSTOM_MESSAGE} to receive custom message.
	 * @param {object} message
	 * @param {number} message.cmdId message Id. Integer, range [1, 10]. You can set different cmdId for different types of messages to reduce the delay of transferring message.
	 * @param {ArrayBuffer} message.data - message content. <br/>
	 * - Maximum 1KB(Byte) sent in a single call.
	 * - Maximum 30 calls per second
	 * - Maximum 8KB sent per second.
	 * @example
	 * // send custom message
	 * trtc.sendCustomMessage({
	 *   cmdId: 1,
	 *   data: new TextEncoder().encode('hello').buffer
	 * });
	 *
	 * // receive custom message
	 * trtc.on(TRTC.EVENT.CUSTOM_MESSAGE, event => {
	 *    // event.userId: remote userId.
	 *    // event.cmdId: message cmdId.
	 *    // event.seq: message sequence number.
	 *    // event.data: custom message data, type is ArrayBuffer.
	 *    console.log(`received custom msg from ${event.userId}, message: ${new TextDecoder().decode(event.data)}`)
	 * })
	 */
  sendCustomMessage(message: CustomMessageData): void;
  static EVENT: {
		readonly ERROR: 'error';
		readonly AUTOPLAY_FAILED: 'autoplay-failed';
		readonly KICKED_OUT: 'kicked-out';
		readonly REMOTE_USER_ENTER: 'remote-user-enter';
		readonly REMOTE_USER_EXIT: 'remote-user-exit';
		readonly REMOTE_AUDIO_AVAILABLE: 'remote-audio-available';
		readonly REMOTE_AUDIO_UNAVAILABLE: 'remote-audio-unavailable';
		readonly REMOTE_VIDEO_AVAILABLE: 'remote-video-available';
		readonly REMOTE_VIDEO_UNAVAILABLE: 'remote-video-unavailable';
		readonly AUDIO_VOLUME: 'audio-volume';
		readonly NETWORK_QUALITY: 'network-quality';
		readonly CONNECTION_STATE_CHANGED: 'connection-state-changed';
		readonly AUDIO_PLAY_STATE_CHANGED: 'audio-play-state-changed';
		readonly VIDEO_PLAY_STATE_CHANGED: 'video-play-state-changed';
		readonly SCREEN_SHARE_STOPPED: 'screen-share-stopped';
		readonly DEVICE_CHANGED: 'device-changed';
		readonly PUBLISH_STATE_CHANGED: 'publish-state-changed';
		readonly TRACK: 'track';
		readonly STATISTICS: 'statistics';
		readonly SEI_MESSAGE: 'sei-message';
		readonly CUSTOM_MESSAGE: 'custom-message';
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
		readonly AUDIO_PROFILE_STANDARD: 'standard';
		readonly AUDIO_PROFILE_STANDARD_STEREO: 'standard-stereo';
		readonly AUDIO_PROFILE_HIGH: 'high';
		readonly AUDIO_PROFILE_HIGH_STEREO: 'high-stereo';
		readonly QOS_PREFERENCE_SMOOTH: 'smooth';
		readonly QOS_PREFERENCE_CLEAR: 'clear';
	};
  static frameWorkType: number;
  /**
	 * Set the log output level
	 * <br>
	 * It is recommended to set the DEBUG level during development and testing, which includes detailed prompt information.
	 * The default output level is INFO, which includes the log information of the main functions of the SDK.
	 *
	 * @param {0-5} [level] Log output level 0: TRACE 1: DEBUG 2: INFO 3: WARN 4: ERROR 5: NONE
	 * @param {boolean} [enableUploadLog=true] Whether to enable log upload, which is enabled by default. It is not recommended to turn it off, which will affect problem troubleshooting.
	 * @example
	 * // Output log levels above DEBUG
	 * TRTC.setLogLevel(1);
	 */
  static setLogLevel(level: LOG_LEVEL, enableUploadLog?: boolean): void;
  /**
	 * Check if the TRTC Web SDK is supported by the current browser
	 *
	 * - Reference: {@tutorial 05-info-browser}.
	 * @example
	 * TRTC.isSupported().then((checkResult) => {
	 *   if(!checkResult.result) {
	 *      console.log('checkResult', checkResult.result, 'checkDetail', checkResult.detail);
	 *      // The SDK is not supported by the current browser, guide the user to use the latest version of Chrome browser.
	 *   }
	 * });
	 *
	 * @returns {Promise.<object>} Promise returns the detection result
	 * | Property                                   | Type    | Description                         |
	 * |--------------------------------------------|---------|-------------------------------------|
	 * | checkResult.result                         | boolean | Detection result                             |
	 * | checkResult.detail.isBrowserSupported      | boolean | Whether the current browser is supported by the SDK        |
	 * | checkResult.detail.isWebRTCSupported       | boolean | Whether the current browser supports WebRTC               |
	 * | checkResult.detail.isWebCodecsSupported    | boolean | Whether the current browser supports WebCodecs            |
	 * | checkResult.detail.isMediaDevicesSupported | boolean | Whether the current browser supports obtaining media devices and media streams     |
	 * | checkResult.detail.isScreenShareSupported | boolean | Whether the current browser supports screen sharing    |
	 * | checkResult.detail.isSmallStreamSupported | boolean | Whether the current browser supports small streams     |
	 * | checkResult.detail.isH264EncodeSupported   | boolean | Whether the current browser supports H264 encoding for uplink         |
	 * | checkResult.detail.isH264DecodeSupported   | boolean | Whether the current browser supports H264 decoding for downlink         |
	 * | checkResult.detail.isVp8EncodeSupported    | boolean | Whether the current browser supports VP8 encoding for uplink          |
	 * | checkResult.detail.isVp8DecodeSupported    | boolean | Whether the current browser supports VP8 decoding for downlink          |
	 */
  static isSupported(): Promise<any>;
  /**
	 * Returns the list of camera devices
	 * <br>
	 * **Note**
	 * - This interface does not support use under the http protocol, please use the https protocol to deploy your website. {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Privacy_and_security Privacy and security}
	 * - You can call the browser's native interface [getCapabilities](https://developer.mozilla.org/en-US/docs/Web/API/InputDeviceInfo/getCapabilities) to get the maximum resolutions supported by the camera, frame rate, mobile devices to distinguish between front and rear cameras, etc. This interface supports Chrome 67+, Edge 79+, Safari 17+, Opera 54+.
	 * @param {boolean} [requestPermission=true] `Since v5.6.3`. Whether to request permission to use the camera. If requestPermission is true, calling this method may temporarily open the camera to ensure that the camera list can be normally obtained, and the SDK will automatically stop the camera capture later.
	 * @example
	 * const cameraList = await TRTC.getCameraList();
	 * if (cameraList[0] && cameraList[0].getCapabilities) {
	 *   const { width, height, frameRate, facingMode } = cameraList[0].getCapabilities();
	 *   console.log(width.max, height.max, frameRate.max);
	 *   if (facingMode) {
	 *     if (facingMode[0] === 'user') {
	 *       // front camera
	 *     } else if (facingMode[0] === 'environment') {
	 *       // rear camera
	 *     }
	 *   }
	 * }
	 * @returns {Promise.<MediaDeviceInfo[]>} Promise returns an array of {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo|MediaDeviceInfo}
	 */
  static getCameraList(requestPermission?: boolean): Promise<MediaDeviceInfo[]>;
  /**
	 * Returns the list of microphone devices
	 * <br>
	 * **Note**
	 * - This interface does not support use under the http protocol, please use the https protocol to deploy your website. {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Privacy_and_security Privacy and security}
	 * - You can call the browser's native interface [getCapabilities](https://developer.mozilla.org/en-US/docs/Web/API/InputDeviceInfo/getCapabilities) to get information about the microphone's capabilities, e.g. the maximum number of channels supported, etc. This interface supports Chrome 67+, Edge 79+, Safari 17+, Opera 54+.
	 * @param {boolean} [requestPermission=true] `Since v5.6.3`. Whether to request permission to use the microphone. If requestPermission is true, calling this method may temporarily open the microphone to ensure that the microphone list can be normally obtained, and the SDK will automatically stop the microphone capture later.
	 * @example
	 * const microphoneList = await TRTC.getMicrophoneList();
	 * if (microphoneList[0] && microphoneList[0].getCapabilities) {
	 *   const { channelCount } = microphoneList[0].getCapabilities();
	 *   console.log(channelCount.max);
	 * }
	 * @returns {Promise.<MediaDeviceInfo[]>} Promise returns an array of {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo|MediaDeviceInfo}
	 */
  static getMicrophoneList(requestPermission?: boolean): Promise<MediaDeviceInfo[]>;
  /**
	 * Returns the list of speaker devices. Only support PC browser, not support mobile browser.
	 * <br>
	 * @param {boolean} [requestPermission=true] `Since v5.6.3`. Whether to request permission to use the microphone. If requestPermission is true, calling this method may temporarily open the microphone to ensure that the microphone list can be normally obtained, and the SDK will automatically stop the microphone capture later.
	 * @returns {Promise.<MediaDeviceInfo[]>} Promise returns an array of {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo|MediaDeviceInfo}
	 */
  static getSpeakerList(requestPermission?: boolean): Promise<MediaDeviceInfo[]>;
  /**
	 *  Set the current speaker for audio playback
	 *
	 * @param {string} speakerId Speaker ID
	 */
  static setCurrentSpeaker(speakerId: string): Promise<void>;
}
export default TRTC;
