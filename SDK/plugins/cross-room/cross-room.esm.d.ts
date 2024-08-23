export interface StartCrossRoomOption {
    roomId?: number,
    strRoomId?: string,
    userId?: string
  }

  interface UpdateCrossRoomOptionItem extends StartCrossRoomOption {
    muteAudio: boolean,
    muteVideo: boolean,
    muteSubStream: boolean,
  }

export interface UpdateCrossRoomOption {
    updateList: UpdateCrossRoomOptionItem[]
  }

export interface StopCrossRoomOption {
    roomId?: number,
    strRoomId?: string,
  }


export declare class CrossRoom {
  start(option: StartCrossRoomOption): Promise<void>;
  update(option: UpdateCrossRoomOption): Promise<void>;
  stop(option?: StopCrossRoomOption): Promise<void>;
}
