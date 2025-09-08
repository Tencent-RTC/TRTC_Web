export interface AuthParam {
    sdkAppId: number;
    userId: string;
    userSig: string;
}

export interface VirtualBackgroundOptions {
    sdkAppId: number;
    userId: string;
    userSig: string;
    type?: 'image' | 'blur' | 'color';
    blurLevel?: number;
    src?: string;
    onAbort?: (err:any) => void;
    enableFaceCentering?: boolean;
    enableEffectOptimization?: boolean;
    color?: string | [number, number, number];
}


export interface UpdateVirtualBackgroundOptions {
  type: 'image' | 'blur' | 'color';
  src?: string;
  blurLevel?: number;
  enableFaceCentering?: boolean;
  enableEffectOptimization?: boolean;
  color?: string | [number, number, number];
}

export declare class VirtualBackground {
    static isSupported(): boolean;
    start(options: VirtualBackgroundOptions): Promise<void>;
    update(options: UpdateVirtualBackgroundOptions): Promise<void>;
    stop(): Promise<void>;
}

export default VirtualBackground;
