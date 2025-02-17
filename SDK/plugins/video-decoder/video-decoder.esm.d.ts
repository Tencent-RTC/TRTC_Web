import { type ValidateRule } from 'trtc-js-sdk-core';
import type { RemoteVideoTrack } from 'trtc-js-sdk-core/src/track/remote-video-track';
import type { VideoDecodeProcessor, VideoDecodeProcessorParam } from 'trtc-js-sdk-core/src/manager/video-manager';
import { type DecodeContextOption, type DecodeContext } from 'trtc-js-sdk-core/src/manager/video-decoder';
import type { Core, IPlugin } from 'trtc-js-sdk-core/src/plugin';
export type HardwareAcceleration = 'prefer-hardware' | 'prefer-software' | 'no-preference';
export interface VideoDecoderConfig {
    codec: string;
    hardwareAcceleration?: HardwareAcceleration;
}
type StartOption = Omit<DecodeContextOption, 'createDecoder'>;
interface UpdateOption extends Omit<StartOption, 'type'> {
    type: 'webCodecs' | 'wasm' | 'mse' | 'auto' | 'mock';
}
interface StopOption {
    track: RemoteVideoTrack;
}
export declare class VideoDecoderPlugin implements IPlugin {
    core: Core;
    static Name: string;
    contextMap: Map<RemoteVideoTrack, DecodeContext>;
    decodeProcessorMap: WeakMap<RemoteVideoTrack, VideoDecodeProcessor>;
    constructor(core: Core);
    getAlias(): string;
    getGroup(option: StartOption): string;
    getName(): string;
    getValidateRule(method: 'start' | 'update' | 'stop'): ValidateRule | ValidateRule[];
    private createDecoder;
    start(option: StartOption): void;
    decode(option: StartOption): ({ frame, track }: VideoDecodeProcessorParam) => RTCEncodedVideoFrame | undefined;
    stop(option: StopOption): void;
    update(option: UpdateOption): void;
}
export {};
