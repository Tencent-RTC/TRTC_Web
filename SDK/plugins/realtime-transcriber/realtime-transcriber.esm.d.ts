export interface StartRealtimeTranscriberOption {
  sourceLanguage: string;
  translationLanguages?: string | string[];
  userIdsToTranscribe?: string | string[]; // 默认: 'all'
  transcriberRobotId?: string;
}

export interface StopRealtimeTranscriberOption {
  transcriberRobotId: string;
}


export declare class RealtimeTranscriber {
  start(option: StartRealtimeTranscriberOption): Promise<void>;
  stop(option?: StopRealtimeTranscriberOption): Promise<void>;
}
