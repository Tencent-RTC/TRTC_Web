export interface StartRealtimeTranscriberOption {
  roomId?: number,
  strRoomId?: string,
  userId?: string
}

export interface StopRealtimeTranscriberOption {
  roomId?: number,
  strRoomId?: string,
}


export declare class RealtimeTranscriber {
  start(option: StartRealtimeTranscriberOption): Promise<void>;
  stop(option?: StopRealtimeTranscriberOption): Promise<void>;
}
