
	declare enum LOG_LEVEL {
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
	declare const audioProfileMap: {
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
	declare const videoProfileMap: {
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
	declare const screenProfileMap: {
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
	declare const enum Scene {
	    LIVE = "live",
	    RTC = "rtc"
	}














	declare interface DeviceInfo {
	    readonly deviceId: string;
	    readonly groupId: string;
	    readonly kind: MediaDeviceKind;
	    readonly label: string;
	}



































  declare const enum NetworkQualityValue {
    UNKNOWN,
    EXCELLENT,
    GOOD,
    POOR,
    BAD,
    VERY_BAD,
    DISCONNECTED
  }

  declare const enum RemoteStreamType {
    Main = 'main',
    Aux = 'auxiliary',
  }

	declare interface MixTranscodeConfig {
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
	declare interface MixUser {
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
	    streamType?: RemoteStreamType;
	    renderMode?: 0 | 1 | 2;
	}

	declare interface PublishCDNStreamOptions {
	    /** Custom stream ID. Default value: ${sdkAppId}_${roomId}_${userId}_main */
	    streamId?: string;
	    streamType?: RemoteStreamType;
	    /** Tencent Cloud live streaming `appId` */
	    appId?: number;
	    /** Tencent Cloud live streaming `bizId` */
	    bizId?: number;
	    /** Specified CDN address for stream publishing */
	    url?: string;
	}

	declare const enum PlayerState {
	    PAUSED = "PAUSED",
	    PLAYING = "PLAYING",
	    STOPPED = "STOPPED"
	}
	declare const enum UserRole {
	    ANCHOR = "anchor",
	    AUDIENCE = "audience"
	}
	declare const enum ConnectionState {
	    CONNECTED = "CONNECTED",
	    DISCONNECTED = "DISCONNECTED",
	    CONNECTING = "CONNECTING",
	    RECONNECTED = "RECONNECTED",
	    RECONNECTING = "RECONNECTING"
	}
	declare interface NetworkQuality {
	    uplinkNetworkQuality: NetworkQualityValue;
	    downlinkNetworkQuality: NetworkQualityValue;
	    uplinkRTT: number;
	    uplinkLoss: number;
	    downlinkRTT: number;
	    downlinkLoss: number;
	    downlinkInfo: {
	        rtt: number;
	        loss: number;
	        userId: string;
	    }[];
	}
	declare const enum BannedReason {
	    BANNED = "banned",
	    KICK = "kick",
	    USER_TIME_OUT = "user_time_out",
	    ROOM_DISBAND = "room_disband"
	}
	declare interface AudioSourceOptions {
	    id: string;
	    url: string;
	    loop?: boolean;
	    volume?: number;
	    operation?: string;
	}













