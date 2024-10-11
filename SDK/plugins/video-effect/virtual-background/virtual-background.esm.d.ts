export interface AuthParam {
    sdkAppId: number;
    userId: string;
    userSig: string;
}

export interface VirtualBackgroundOptions {
    sdkAppId: number;
    userId: string;
    userSig: string;
    type?: 'image' | 'blur';
    blurLevel?: number;
    src?: string;
    onAbort?: (err:any) => void;
}


export interface UpdateVirtualBackgroundOptions {
    type: 'image' | 'blur';
    blurLevel?: number;
    src?: string;
}

export declare class VirtualBackground {
    static isSupported(): boolean;
    start(options: VirtualBackgroundOptions): Promise<void>;
    update(options: UpdateVirtualBackgroundOptions): Promise<void>;
    stop(): Promise<void>;
}

export default VirtualBackground;
