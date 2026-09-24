import type { screenProfileMap, VideoProfile, videoProfileMap } from 'trtc-sdk-v5';

export interface VideoMixerOptions {
  view?: string | HTMLElement | null;
  canvasInfo: CanvasInfo;
  camera?: CameraSource[];
  screen?: ScreenSource[];
  text?: TextSource[];
  image?: ImageSource[];
  video?: VideoSource[];
  canvas?: CanvasSource[];
  onScreenShareStop?: (id: string) => void;
}
// 更新时画布配置变为可选
export type UpdateVideoMixerOptions = {
  view?: VideoMixerOptions['view'];
  canvasInfo?: VideoMixerOptions['canvasInfo'];
  camera?: VideoMixerOptions['camera'];
  screen?: VideoMixerOptions['screen'];
  text?: VideoMixerOptions['text'];
  image?: VideoMixerOptions['image'];
  video?: VideoMixerOptions['video'];
  canvas?: VideoMixerOptions['canvas'];
};

export interface CanvasInfo {
  canvasColor?: string | CanvasGradient | CanvasPattern; // 合流背景色
  // 合流画布分辨率
  width: number;
  height: number;
  frameRate?: number; // 合流帧率
}
export interface CameraSource {
  // 参数与 startLocalVideo 对齐
  id: string;
  cameraId?: string;
  videoTrack?: MediaStreamTrack;
  profile?: keyof typeof videoProfileMap | VideoProfile;
  layout: LayerOption;
  useInternalTrack?: boolean;
}
export interface ScreenSource {
  // 参数与 startScreenShare 对齐
  id: string;
  profile?: keyof typeof screenProfileMap | VideoProfile;
  captureElement?: HTMLElement;
  preferDisplaySurface?: 'current-tab' | 'tab' | 'window' | 'monitor';
  layout: LayerOption;
  systemAudio?: boolean;
  videoTrack?: MediaStreamTrack;
  audioTrack?: MediaStreamTrack;
  useInternalTrack?: boolean;
  // 是否在屏幕采集开始时将浏览器焦点切换到被采集的标签页/窗口（Chrome 109+）。
  // true：focus-captured-surface；false：no-focus-change；不设置则不调用 setFocusBehavior
  enableFocusTarget?: boolean;
}
export interface TextSource {
  id: string;
  content: string;
  font?: string;
  color?: string | CanvasGradient | CanvasPattern;
  layout: LayerOption;
}
export interface ImageSource {
  id: string;
  url: string;
  layout: LayerOption;
}
export interface VideoSource {
  id: string;
  url: string;
  layout: LayerOption;
}
export interface CanvasSource {
  id: string;
  canvas: HTMLCanvasElement | OffscreenCanvas;
  layout: LayerOption;
}

export interface LayerOption {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  fillMode?: 'contain' | 'cover' | 'fill';
  mirror?: boolean;
  rotation?: 0 | 90 | 180 | 270;
  hidden?: boolean;
}

export interface MixFailedDetail {
  id: string;
  error: Error;
}

export interface MixParseResult {
  track: MediaStreamVideoTrack;
  systemAudioTrackList: Record<string, MediaStreamAudioTrack>;
  result: {
    successOptions: VideoMixerOptions | UpdateVideoMixerOptions;
    failedDetails: MixFailedDetail[];
  };
}

export declare class VideoMixer {
  start(options: VideoMixerOptions): Promise<MixParseResult>;
  update(options: UpdateVideoMixerOptions): Promise<MixParseResult>;
  stop(): void;
}

export default VideoMixer;
