declare interface CDNStreamingOptions {
    target: Target;
    encoding?: Encoding;
    mix?: Mix;
}

declare interface Target {
    publishMode: PublishMode;
    streamId?: string;
    appId?: number;
    bizId?: number;
    url?: string;
}

declare interface Encoding {
    videoWidth?: number;
    videoHeight?: number;
    videoBitrate?: number;
    videoFramerate?: number;
    videoGOP?: number;
    audioSampleRate?: number;
    audioBitrate?: number;
    audioChannels?: 1 | 2;
}

declare interface Mix {
    backgroundColor?: number;
    backgroundImage?: string;
    audioMixUserList?: User[];
    videoLayoutList?: VideoLayout[];
}

declare interface User {
    userId: string;
    roomId: number;
    strRoomId: string;
}

declare interface VideoLayout {
    fixedVideoUser: User;
    fixedVideoStreamType?: TRTCStreamType;
    fillMode?: 0 | 1 | 2;
    width?: number;
    height?: number;
    locationX?: number;
    locationY?: number;
    zOrder?: number;
}

declare enum TRTCStreamType {
    Main = 'main',
    Sub = 'sub'
}

declare enum PublishMode {
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

export { PublishMode, TRTCStreamType };
export { CDNStreaming };
export default CDNStreaming;
