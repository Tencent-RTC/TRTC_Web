/**
 * LEBPlayer Type Definitions
 * 快直播拉流播放器类型声明
 */

/**
 * License 配置
 */
export interface LicenseConfig {
  /** 密钥 */
  secretKey: string;
  /** 加密数据 */
  encrypted: string;
  /** 签名 */
  signature: string;
}

/**
 * 音频统计信息
 */
export interface AudioStat {
  /** 接收码率 (kbps) */
  bitrate: number;
  /** 音量 (0-1) */
  volume: number;
  /** 丢包率 (0-100) */
  packetLossRate: number;
  /** jitter buffer 缓冲延迟 (ms) */
  jitterBufferDelay: number;
  /** 总接收字节数 */
  bytesReceived: number;
  /** 总接收包数 */
  packetsReceived: number;
  /** 总丢包数 */
  packetsLost: number;
}

/**
 * 视频统计信息
 */
export interface VideoStat {
  /** 接收码率 (kbps) */
  bitrate: number;
  /** 解码帧率 (fps) */
  frameRate: number;
  /** 分辨率宽度 */
  width: number;
  /** 分辨率高度 */
  height: number;
  /** 丢包率 (0-100) */
  packetLossRate: number;
  /** jitter buffer 缓冲延迟 (ms) */
  jitterBufferDelay: number;
  /** 总接收字节数 */
  bytesReceived: number;
  /** 总接收包数 */
  packetsReceived: number;
  /** 总丢包数 */
  packetsLost: number;
  /** 总解码帧数 */
  framesDecoded: number;
}

/**
 * 网络统计信息
 */
export interface NetworkStat {
  /** 往返时延 (ms) */
  rtt: number;
}

/**
 * 媒体统计数据
 */
export interface MediaStats {
  /** 音频统计 */
  audio: AudioStat;
  /** 视频统计 */
  video: VideoStat;
  /** 网络统计 */
  network: NetworkStat;
}

/**
 * 播放状态
 */
export type PlayState = 'PLAYING' | 'PAUSED' | 'STOPPED';

/**
 * 媒体类型
 */
export type MediaType = 'audio' | 'video';

/**
 * 填充模式
 */
export type FillMode = 'contain' | 'cover' | 'fill';

/**
 * 播放器动作
 */
export type PlayerAction = 'pause' | 'resume';

/**
 * 事件回调接口
 */
export interface CallBack {
  /**
   * 加载开始回调
   * @param type 媒体类型
   */
  onLoadStart?: (type: MediaType) => void;

  /**
   * 播放状态变更回调
   * @param event 状态变更事件
   */
  onPlayStateChanged?: (event: {
    /** 媒体类型 */
    type: MediaType;
    /** 播放状态 */
    state: PlayState;
    /** 变更原因 */
    reason?: string;
  }) => void;

  /**
   * 自动播放失败回调
   * @param event 自动播放失败事件
   */
  onAutoPlayFailed?: (event: {
    /** 媒体类型 */
    type: MediaType;
    /** 恢复播放函数 */
    resume: () => Promise<void>;
  }) => void;

  /**
   * 错误回调
   * @param error 错误对象
   */
  onError?: (error: any) => void;

  /**
   * SEI 消息回调
   * @param event SEI 消息事件
   */
  onSEIMessage?: (event: {
    /** SEI 消息数据 */
    data: ArrayBuffer;
    /** SEI payload 类型 */
    seiPayloadType: number;
  }) => void;

  /**
   * 统计信息回调
   * @param stats 媒体统计数据
   */
  onStats?: (stats: MediaStats) => void;
  onPictureInPictureStateChanged?: (event: {
    isPictureInPicture: boolean;
    pictureInPictureWindow?: PictureInPictureWindow;
  }) => void,
  onFullScreenStateChanged?: (event: {
    isFullScreen: boolean;
  }) => void,
}

/**
 * 启动 LEBPlayer 配置选项
 */
export interface StartLEBPlayerOption {
  /** 播放容器，可以是容器 ID 或 HTMLElement */
  view: string | HTMLElement;

  /** 快直播拉流地址 */
  url: string;

  /** License 配置（可选） */
  licenseConfig?: LicenseConfig;

  /** 是否静音，默认 false */
  muted?: boolean;

  /** 音量大小，范围 0-500，默认 100 */
  volume?: number;

  /** 填充模式，默认 'contain' */
  fillMode?: FillMode;

  /** 日志配置 */
  loggerConfig: {
    /** SDK 应用 ID */
    sdkAppId: number;
    /** 用户 ID */
    userId: string;
  };

  /** 事件回调 */
  callback?: CallBack;
}

/**
 * 更新 LEBPlayer 配置选项
 */
export interface UpdateLEBPlayerOption {
  /** 播放容器 */
  view?: string | HTMLElement;

  /** 音量大小，范围 0-500 */
  volume?: number;

  /** 是否静音 */
  muted?: boolean;

  /** 填充模式 */
  fillMode?: FillMode;

  /** 播放器动作 */
  action?: PlayerAction;

  /** 是否全屏 */
  fullScreen?: boolean;

  /** 是否画中画 */
  pictureInPicture?: boolean;
}

/**
 * 停止 LEBPlayer 配置选项
 */
// export interface StopLEBPlayerOption {}

/**
 * LEBPlayer 类
 * 快直播拉流播放器
 */
export declare class LEBPlayer {
  /** 插件名称 */
  static Name: string;

  /**
   * 启动快直播拉流
   * @param option 启动配置选项
   * @returns Promise
   */
  start(option: StartLEBPlayerOption): Promise<void>;

  /**
   * 更新播放器配置
   * @param option 更新配置选项
   * @returns Promise
   */
  update(option: UpdateLEBPlayerOption): Promise<void>;

  /**
   * 停止快直播拉流
   * @param option 停止配置选项
   * @returns Promise
   */
  stop(): Promise<void>;
}

/**
 * 默认导出
 */
export default LEBPlayer;
