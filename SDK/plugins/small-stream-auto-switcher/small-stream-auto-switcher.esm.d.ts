
export interface SmallStreamAutoSwitcherOptions {
  rttPoorLimit?: number;
  lossPoorLimit?: number;
  poorDuration?: number;
  rttGoodLimit?: number;
  lossGoodLimit?: number;
  goodDuration?: number;
  sleepTime?: number;
  maxAutoSwitchToSmallCount?: number;
}

export declare class SmallStreamAutoSwitcher {
  start(options: SmallStreamAutoSwitcherOptions): Promise<void>;
  update(options: SmallStreamAutoSwitcherOptions): Promise<void>;
  stop(): Promise<void>;
}

export default SmallStreamAutoSwitcher;
