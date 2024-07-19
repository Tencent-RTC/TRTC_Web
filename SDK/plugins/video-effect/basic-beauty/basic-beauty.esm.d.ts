export interface BasicBeautyOptions {
    beauty?: number;
    brightness?: number;
    ruddy?: number;
  }
  
export declare class BasicBeauty {
    start(options: BasicBeautyOptions): Promise<void>;
    update(options: BasicBeautyOptions): Promise<void>;
    stop(): Promise<void>;
}

export default BasicBeauty;
