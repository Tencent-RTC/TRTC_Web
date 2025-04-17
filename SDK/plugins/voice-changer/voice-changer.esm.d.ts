export interface VoiceChangerStartOptions {
  sdkAppId: number;
  userId: string;
  userSig: string;
  voiceType: number;
  pitch?: number;
}

export interface VoiceChangerUpdateOptions {
  voiceType: number;
  pitch?: number;
}

export declare class VoiceChanger {
  start(options: VoiceChangerStartOptions): Promise<void>;
  update(options: VoiceChangerUpdateOptions): Promise<void>;
  stop(): Promise<void>;
}

export default VoiceChanger;
