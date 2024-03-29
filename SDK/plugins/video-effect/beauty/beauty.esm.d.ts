export interface AuthParam {
    sdkAppId: number;
    userId: string;
    userSig: string;
}

export interface BeautyOptions {
    sdkAppId: number;
    userId: string;
    userSig: string;
    whiten?: number;
    dermabrasion?: number;
    lift?: number;
    shave?: number;
    eye?: number;
    chin?: number;
    onError?: () => {}
}


export interface UpdateBeautyOptions {
    whiten?: number;
    dermabrasion?: number;
    lift?: number;
    shave?: number;
    eye?: number;
    chin?: number;
}

export declare class Beauty {
    start(options: BeautyOptions): Promise<void>;
    update(options: UpdateBeautyOptions): Promise<void>;
    stop(): Promise<void>;
}

export default Beauty;
