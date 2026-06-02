/**
 * TRTC Web SDK AudioPlayer plugin
 *
 * Unified audio player supporting PCM data, audio URLs, and MediaStreamTracks.
 * Optionally mixes audio into the published stream.
 *
 * @packageDocumentation
 */

/**
 * Audio source type
 */
export enum AudioSourceType {
  /** Raw PCM data input via input() method */
  PCM = 'pcm',
  /** Audio file URL (mp3, ogg, wav, flac) */
  URL = 'url',
  /** MediaStreamTrack from external source */
  Track = 'track',
}

/**
 * AudioPlayer start options
 */
export interface AudioPlayerOptions {
  /**
   * Unique identifier for this player instance.
   */
  id: string;

  /**
   * Audio source type: 'pcm' | 'url' | 'track'
   */
  sourceType: AudioSourceType | 'pcm' | 'url' | 'track';

  /**
   * Audio file URL. Required when sourceType is 'url'.
   * Supported formats: mp3, ogg, wav, flac, blob URLs, data URLs.
   */
  url?: string;

  /**
   * MediaStreamTrack. Required when sourceType is 'track'.
   */
  track?: MediaStreamTrack;

  /**
   * Whether to publish audio to remote users (in addition to local playback).
   * - false (default): local playback only
   * - true: local playback + publish audio to remote users
   */
  publish?: boolean;

  /**
   * PCM realtime mode, default true.
   * In realtime mode, pause discards buffered data; in non-realtime mode, buffers are preserved.
   * Set to object to configure maxDelay and discardAll behavior.
   * Only applicable when sourceType is 'pcm'.
   */
  realtime?: boolean | { maxDelay?: number; discardAll?: boolean };

  /**
   * Whether to loop playback. Only applicable when sourceType is 'url'.
   */
  loop?: boolean;

  /**
   * Playback volume (0 to 1). Applicable for 'url' and 'track' sources.
   */
  volume?: number;

  /**
   * Playback rate. Only applicable when sourceType is 'url'.
   */
  playbackRate?: number;

  /**
   * Callback when PCM input error occurs. Only for sourceType 'pcm'.
   */
  onInputError?: (errMsg: string, inputIndex: number) => void;

  /**
   * Callback when duration changes. Duration is in seconds (rounded to 2 decimal places).
   * - For sourceType 'url': triggered when audio metadata is loaded.
   * - For sourceType 'pcm': triggered when buffer length changes (e.g. after input() or clear).
   */
  onDurationChange?: (duration: number) => void;

  /**
   * Callback for time update. Time values are in seconds (rounded to 2 decimal places).
   * - For sourceType 'url': (currentTime: number, durationTime: number)
   * - For sourceType 'pcm': (currentTime: number, bufferedDuration: number)
   */
  onTimeUpdate?: (currentTime: number, durationTime: number) => void;

  /**
   * Callback when audio playback ended.
   * - For sourceType 'url': triggered when audio element ends.
   * - For sourceType 'pcm': triggered when buffer is exhausted or stop() is called.
   */
  onEnded?: () => void;
}

/**
 * AudioPlayer update options
 */
export interface AudioPlayerUpdateOptions {
  /**
   * Player instance ID to update
   */
  id: string;

  /**
   * Whether to publish audio to remote users
   */
  publish?: boolean;

  /** PCM realtime mode. Set to object to configure maxDelay and discardAll behavior. */
  realtime?: boolean | { maxDelay?: number; discardAll?: boolean };

  /** Loop playback (URL only) */
  loop?: boolean;

  /** Playback volume */
  volume?: number;

  /** Playback rate (URL only) */
  playbackRate?: number;

  /** Seek to time in seconds (URL only) */
  seekFrom?: number;

  /**
   * Playback operation (URL only).
   * @deprecated Use instance methods (pause/resume/stop) instead.
   */
  operation?: 'pause' | 'resume' | 'stop';

  /** Callback when PCM input error occurs */
  onInputError?: (errMsg: string, inputIndex: number) => void;

  /** Callback when duration changes (URL and PCM) */
  onDurationChange?: (duration: number) => void;

  /** Callback for time update (URL and PCM) */
  onTimeUpdate?: (currentTime: number, durationTime: number) => void;

  /** Callback when audio ended (URL and PCM) */
  onEnded?: () => void;
}

/**
 * AudioPlayer stop options
 */
export interface AudioPlayerStopOptions {
  /**
   * Player instance ID to stop. Use '*' to stop all instances.
   */
  id: string;
}

/**
 * Unified audio player instance returned by startPlugin('AudioPlayer', options).
 * Supports PCM data, audio URLs, and MediaStreamTracks with optional mix-to-stream.
 *
 * Usage:
 * ```ts
 * import TRTC from 'trtc-sdk-v5';
 * import AudioPlayer from 'trtc-sdk-v5/plugins/audio-player';
 *
 * const trtc = TRTC.create();
 * trtc.registerPlugin(AudioPlayer);
 *
 * // PCM source - for AI dialogue, prompt audio
 * const pcmPlayer = await trtc.startPlugin('AudioPlayer', {
 *   id: 'ai-voice',
 *   sourceType: 'pcm',
 *   realtime: true,
 * });
 * pcmPlayer.input(pcmData, 16000);
 * pcmPlayer.start();
 *
 * // URL source - for background music, with publish to stream
 * const bgm = await trtc.startPlugin('AudioPlayer', {
 *   id: 'bgm',
 *   sourceType: 'url',
 *   url: 'https://example.com/music.mp3',
 *   loop: true,
 *   volume: 0.5,
 *   publish: true,
 * });
 * bgm.start();
 *
 * // Track source - for external audio
 * const trackPlayer = await trtc.startPlugin('AudioPlayer', {
 *   id: 'external',
 *   sourceType: 'track',
 *   track: audioTrack,
 *   publish: true,
 * });
 * trackPlayer.start();
 *
 * // Update a player
 * await trtc.updatePlugin('AudioPlayer', { id: 'bgm', volume: 0.8 });
 *
 * // Stop a specific player
 * await trtc.stopPlugin('AudioPlayer', { id: 'bgm' });
 *
 * // Stop all players
 * await trtc.stopPlugin('AudioPlayer', { id: '*' });
 * ```
 */
export class AudioPlayerContext {
  /** Player instance ID */
  readonly id: string;

  /** Audio source type */
  readonly sourceType: AudioSourceType;

  /** Current played time in seconds (rounded to 2 decimal places) */
  readonly currentTime: number;

  /** Total duration in seconds (rounded to 2 decimal places) */
  readonly duration: number;

  /** Whether the player is stopped */
  readonly isStop: boolean;

  /** Whether the player is paused */
  readonly isPause: boolean;

  /** Whether playback has ended */
  readonly isPlayEnd: boolean;

  /**
   * Playback volume (0 to 1). Applicable for 'url' and 'track' sources.
   */
  volume: number;

  /**
   * Whether to loop playback. Only applicable for 'url' source.
   */
  loop: boolean;

  /**
   * Playback rate. Only applicable for 'url' source.
   */
  playbackRate: number;

  /**
   * Whether to publish audio to remote users (mix into published stream).
   * Setting this property dynamically connects/disconnects the mix pipeline.
   */
  publish: boolean;

  /**
   * Input PCM data for playback. Only for sourceType 'pcm'.
   * Can be called before start() (will be queued).
   * @param pcmData - PCM audio data (Float32Array or Int16Array)
   * @param sampleRate - Sample rate of the input PCM data
   */
  input(pcmData: Float32Array | Int16Array, sampleRate: number): void;

  /**
   * Clear all buffered but not yet played PCM data. Only for sourceType 'pcm'.
   */
  clearInput(): void;

  /**
   * Start playback.
   */
  start(): Promise<void>;

  /**
   * Pause playback.
   */
  pause(): void;

  /**
   * Resume playback after pause.
   */
  resume(): void;

  /**
   * Stop playback. Can call start() again to restart.
   */
  stop(): void;

  /**
   * Seek to a specific time in seconds. Only for sourceType 'url'.
   */
  seek(time: number): void;
}

/**
 * AudioPlayer Plugin Class (instance manager).
 * Register with trtc.registerPlugin(AudioPlayer).
 */
export default class AudioPlayer {
  static Name: string;
}
