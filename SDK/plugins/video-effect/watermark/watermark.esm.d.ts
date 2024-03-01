import { WatermarkOptions } from '../src/enums';

export { WatermarkOptions };

export declare class Watermark {
    start(options: WatermarkOptions): Promise<void>;
    stop(): Promise<void>;
}

export default Watermark;
