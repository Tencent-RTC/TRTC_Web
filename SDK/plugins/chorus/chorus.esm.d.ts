export interface StartChorusOption {
  useOriginalSong?: boolean;
}

export interface UpdateChorusOption {
  useOriginalSong?: boolean;
	bgmAction?: 'pause' | 'resume'
}
export declare class Chorus {
  start(option: any): Promise<void>;
  update(option: any): Promise<void>;
  stop(option?: any): Promise<void>;
}

export default Chorus;
