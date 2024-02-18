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
    src?: string;
}


export interface UpdateVirtualBackgroundOptions {
    type: 'image' | 'blur';
    src?: string;
}

export declare class VirtualBackground {
    start(options: VirtualBackgroundOptions): Promise<void>;
    update(options: UpdateVirtualBackgroundOptions): Promise<void>;
    stop(): Promise<void>;
}

export default VirtualBackground;
