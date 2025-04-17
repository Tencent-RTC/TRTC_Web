export interface WatermarkOptions {
    imageUrl: string;
    x: number;
    y: number;
    size?: Size | number | 'contain' | 'cover';
}

export interface Size {
    height?: number;
    width?: number;
}

export declare class Watermark {
    start(options: WatermarkOptions): Promise<void>;
    stop(): Promise<void>;
}

export default Watermark;
