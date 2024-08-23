import { DeviceDetectorOptions, DeviceDetectorResult } from '../src/enums';

export { DeviceDetectorOptions };

export declare class DeviceDetector {
  start(options: DeviceDetectorOptions): Promise<DeviceDetectorResult | undefined>;
  stop():Promise<void>;
}

export default DeviceDetector;
