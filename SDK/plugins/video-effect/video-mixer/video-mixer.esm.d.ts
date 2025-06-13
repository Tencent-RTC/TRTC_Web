export interface VideoMixerOptions {
  camera?: LayerOption;
  screen?: LayerOption;
  container?: {
    width: number,
    height: number
  }
}

export interface LayerOption {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  // hidden?: boolean
}

export declare class VideoMixer {
  start(options: VideoMixerOptions): void;
  update(options: VideoMixerOptions): void;
  stop(): void;
}

export default VideoMixer;
