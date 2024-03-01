export declare interface CDNStreamingOptions {
    target: Target;
    encoding?: Encoding;
    mix?: Mix;
}

export declare interface Target {
    publishMode: PublishMode;
    streamId?: string;
    appId?: number;
    bizId?: number;
    url?: string;
}

export declare interface Encoding {
    videoWidth?: number;
    videoHeight?: number;
    videoBitrate?: number;
    videoFramerate?: number;
    videoGOP?: number;
    audioSampleRate?: number;
    audioBitrate?: number;
    audioChannels?: 1 | 2;
}

export declare interface Mix {
    backgroundColor?: number;
    backgroundImage?: string;
    audioMixUserList?: User[];
    videoLayoutList?: VideoLayout[];
}

export declare interface User {
    userId: string;
    roomId?: number;
    strRoomId?: string;
}

export declare interface VideoLayout {
    fixedVideoUser: User;
    fixedVideoStreamType?: TRTCStreamType;
    fillMode?: 0 | 1 | 2;
    width?: number;
    height?: number;
    locationX?: number;
    locationY?: number;
    zOrder?: number;
}

export declare enum TRTCStreamType {
    Main = 'main',
    Sub = 'sub'
}

export declare enum PublishMode {
    PublishMainStreamToCDN = 'PublishMainStreamToCDN',
    PublishSubStreamToCDN = 'PublishSubStreamToCDN',
    PublishMixStreamToCDN = 'PublishMixStreamToCDN'
}

declare class CDNStreaming {
    static TYPE: {
        PublishMode: {
            PublishMainStreamToCDN: PublishMode.PublishMainStreamToCDN;
            PublishSubStreamToCDN: PublishMode.PublishSubStreamToCDN;
            PublishMixStreamToCDN: PublishMode.PublishMixStreamToCDN;
        };
    };

    start(options: CDNStreamingOptions): Promise<void>;
    update(options: CDNStreamingOptions): Promise<void>;
    stop(options: CDNStreamingOptions): Promise<void>;
}

export { CDNStreaming };
export default CDNStreaming;
